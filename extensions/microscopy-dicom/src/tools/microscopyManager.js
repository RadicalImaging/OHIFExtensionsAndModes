import Publisher from '../utils/Publisher';
import ViewerManager, { EVENTS as ViewerEvents } from './ViewerManager';
import RoiAnnotation, {
  EVENTS as AnnotationEvents,
} from '../utils/RoiAnnotation';
import { utils } from '@ohif/core';

const { studyMetadataManager } = utils;

const EVENTS = {
  ANNOTATION_UPDATED: 'annotationUpdated',
  ANNOTATION_SELECTED: 'annotationSelected',
  RELABEL: 'relabel',
  DELETE: 'delete',
};

/**
 * MicroscopyManager is responsible to manage multiple third-party API's
 * microscopy viewers expose methods to manage the interaction with these
 * viewers and handle their ROI graphics to create, remove and modify the
 * ROI annotations relevant to the application
 */
class MicroscopyManager extends Publisher {
  managedViewers = new Set();
  roiUids = new Set();
  annotations = {};
  selectedAnnotation = null;
  pendingFocus = false;

  constructor() {
    super();
    this._onRoiAdded = this._onRoiAdded.bind(this);
    this._onRoiModified = this._onRoiModified.bind(this);
    this._onRoiRemoved = this._onRoiRemoved.bind(this);
    this._onRoiUpdated = this._onRoiUpdated.bind(this);
    this.isROIsVisible = true;
  }

  /**
   * Cleares all the annotations and managed viewers, setting the manager state
   * to its initial state
   */
  clear() {
    this.managedViewers.forEach(managedViewer => managedViewer.destroy());
    this.managedViewers.clear();
    for (var key in this.annotations) {
      delete this.annotations[key];
    }

    this.roiUids.clear();
    this.selectedAnnotation = null;
    this.pendingFocus = false;
  }

  clearAnnotations() {
    Object.keys(this.annotations).forEach(uid => {
      this.removeAnnotation(this.annotations[uid]);
    });
  }

  /**
   * Observes when a ROI graphic is added, creating the correspondent annotation
   * with the current graphic and view state.
   * Creates a subscription for label updating for the created annotation and
   * publishes an ANNOTATION_UPDATED event when it happens.
   * Also triggers the relabel process after the graphic is placed.
   *
   * @param {Object} data The published data
   * @param {Object} data.roiGraphic The added ROI graphic object
   * @param {ViewerManager} data.managedViewer The origin viewer for the event
   */
  _onRoiAdded(data) {
    const { roiGraphic, managedViewer, label } = data;
    const { studyInstanceUID, seriesInstanceUID } = managedViewer;
    const viewState = managedViewer.getViewState();

    const roiAnnotation = new RoiAnnotation(
      roiGraphic,
      studyInstanceUID,
      seriesInstanceUID,
      '',
      viewState
    );

    this.roiUids.add(roiGraphic.uid);
    this.annotations[roiGraphic.uid] = roiAnnotation;

    roiAnnotation.subscribe(AnnotationEvents.LABEL_UPDATED, () => {
      this.publish(EVENTS.ANNOTATION_UPDATED, roiAnnotation);
    });

    if (label !== undefined) {
      roiAnnotation.setLabel(label);
    } else {
      const onRelabel = item =>
        managedViewer.updateROIProperties({
          uid: roiGraphic.uid,
          properties: { label: item.label, finding: item.finding },
        });
      this.triggerRelabel(roiAnnotation, true, onRelabel);
    }
  }

  /**
   * Observes when a ROI graphic is modified, updating the correspondent
   * annotation with the current graphic and view state.
   *
   * @param {Object} data The published data
   * @param {Object} data.roiGraphic The modified ROI graphic object
   */
  _onRoiModified(data) {
    const { roiGraphic, managedViewer } = data;
    const roiAnnotation = this.getAnnotation(roiGraphic.uid);
    if (!roiAnnotation) return;
    roiAnnotation.setRoiGraphic(roiGraphic);
    roiAnnotation.setViewState(managedViewer.getViewState());
  }

  /**
   * Observes when a ROI graphic is removed, reflecting the removal in the
   * annotations' state.
   *
   * @param {Object} data The published data
   * @param {Object} data.roiGraphic The removed ROI graphic object
   */
  _onRoiRemoved(data) {
    const { roiGraphic } = data;
    this.roiUids.delete(roiGraphic.uid);
    this.annotations[roiGraphic.uid].destroy();
    delete this.annotations[roiGraphic.uid];
  }

  /**
   * Observes any changes on ROI graphics and synchronize all the managed
   * viewers to reflect those changes.
   * Also publishes an ANNOTATION_UPDATED event to notify the subscribers.
   *
   * @param {Object} data The published data
   * @param {Object} data.roiGraphic The added ROI graphic object
   * @param {ViewerManager} data.managedViewer The origin viewer for the event
   */
  _onRoiUpdated(data) {
    const { roiGraphic, managedViewer } = data;
    this.synchronizeViewers(managedViewer);
    this.publish(EVENTS.ANNOTATION_UPDATED, this.getAnnotation(roiGraphic.uid));
  }

  /**
   * Creates the subscriptions for the managed viewer being added
   *
   * @param {ViewerManager} managedViewer The viewer being added
   */
  _addManagedViewerSubscriptions(managedViewer) {
    managedViewer.subscribe(ViewerEvents.ADDED, this._onRoiAdded);
    managedViewer.subscribe(ViewerEvents.MODIFIED, this._onRoiModified);
    managedViewer.subscribe(ViewerEvents.REMOVED, this._onRoiRemoved);
    managedViewer.subscribe(ViewerEvents.UPDATED, this._onRoiUpdated);
  }

  /**
   * Removes the subscriptions for the managed viewer being removed
   *
   * @param {ViewerManager} managedViewer The viewer being removed
   */
  _removeManagedViewerSubscriptions(managedViewer) {
    managedViewer.unsubscribe(ViewerEvents.ADDED, this._onRoiAdded);
    managedViewer.unsubscribe(ViewerEvents.MODIFIED, this._onRoiModified);
    managedViewer.unsubscribe(ViewerEvents.REMOVED, this._onRoiRemoved);
    managedViewer.unsubscribe(ViewerEvents.UPDATED, this._onRoiUpdated);
  }

  /**
   * Returns the managed viewers that are displaying the image with the given
   * study and series UIDs
   *
   * @param {String} studyInstanceUID UID for the study
   * @param {String} seriesInstanceUID UID for the series
   *
   * @returns {Array} The managed viewers for the given series UID
   */
  _getManagedViewersForSeries(studyInstanceUID, seriesInstanceUID) {
    const filter = managedViewer =>
      managedViewer.studyInstanceUID === studyInstanceUID &&
      managedViewer.seriesInstanceUID === seriesInstanceUID;
    return Array.from(this.managedViewers).filter(filter);
  }

  /**
   * Returns the managed viewers that are displaying the image with the given
   * study UID
   *
   * @param {String} studyInstanceUID UID for the study
   *
   * @returns {Array} The managed viewers for the given series UID
   */
  getManagedViewersForStudy(studyInstanceUID) {
    const filter = managedViewer =>
      managedViewer.studyInstanceUID === studyInstanceUID;
    return Array.from(this.managedViewers).filter(filter);
  }

  /**
   * Restores the created annotations for the viewer being added
   *
   * @param {ViewerManager} managedViewer The viewer being added
   */
  _restoreAnnotations(managedViewer) {
    const { studyInstanceUID, seriesInstanceUID } = managedViewer;
    const annotations = this.getAnnotationsForSeries(
      studyInstanceUID,
      seriesInstanceUID
    );
    annotations.forEach(roiAnnotation => {
      managedViewer.addRoiGraphic(roiAnnotation.roiGraphic);
    });
  }

  /**
   * Creates a managed viewer instance for the given thrid-party API's viewer.
   * Restores existing annotations for the given study/series.
   * Adds event subscriptions for the viewer being added.
   * Focuses the selected annotation when the viewer is being loaded into the
   * active viewport.
   *
   * @param {Object} viewer Third-party viewer API's object to be managed
   * @param {Number} viewportIndex The index of the viewport to load the viewer
   * @param {HTMLElement} container The DOM element where it will be renderd
   * @param {String} studyInstanceUID The study UID of the loaded image
   * @param {String} seriesInstanceUID The series UID of the loaded image
   */
  addViewer(
    viewer,
    viewportIndex,
    container,
    studyInstanceUID,
    seriesInstanceUID
  ) {
    const managedViewer = new ViewerManager(
      viewer,
      viewportIndex,
      container,
      studyInstanceUID,
      seriesInstanceUID
    );

    this._restoreAnnotations(managedViewer);
    viewer._manager = managedViewer;
    this.managedViewers.add(managedViewer);

    // this._potentiallyLoadSR(studyInstanceUID);
    this._addManagedViewerSubscriptions(managedViewer);

    if (this.pendingFocus) {
      this.pendingFocus = false;
      this.focusAnnotation(this.selectedAnnotation, viewportIndex);
    }
  }

  _potentiallyLoadSR(StudyInstanceUID) {
    const studyMetadata = studyMetadataManager.get(StudyInstanceUID);
    const displaySets = studyMetadata.getDisplaySets();
    const smDisplaySet = displaySets.find(ds => ds.Modality === 'SM');

    const { FrameOfReferenceUID } = smDisplaySet;

    if (!studyMetadata) {
      return;
    }

    let derivedDisplaySets = FrameOfReferenceUID
      ? studyMetadata.getDerivedDatasets({
          referencedFrameOfReferenceUID: FrameOfReferenceUID,
        })
      : [];

    if (!derivedDisplaySets.length) {
      return;
    }

    derivedDisplaySets = derivedDisplaySets.filter(ds => ds.Modality === 'SR');

    if (derivedDisplaySets.some(ds => ds.isLoaded === true)) {
      // Don't auto load
      return;
    }

    // find most recent and load it.
    let recentDateTime = 0;
    let recentDisplaySet = derivedDisplaySets[0];

    derivedDisplaySets.forEach(ds => {
      const dateTime = Number(`${ds.SeriesDate}${ds.SeriesTime}`);
      if (dateTime > recentDateTime) {
        recentDateTime = dateTime;
        recentDisplaySet = ds;
      }
    });

    recentDisplaySet.isLoading = true;

    recentDisplaySet.load(smDisplaySet);
  }

  /**
   * Removes the given third-party viewer API's object from the managed viewers
   * and cleares all its event subscriptions
   *
   * @param {Object} viewer Third-party viewer API's object to be removed
   */
  removeViewer(viewer) {
    const managedViewer = viewer._manager;

    this._removeManagedViewerSubscriptions(managedViewer);
    managedViewer.destroy();
    this.managedViewers.delete(managedViewer);
  }

  /**
   * Toggle ROIs visibility
   */
  toggleROIsVisibility() {
    if (!this.isROIsVisible) {
      this.showROIs();
    } else {
      this.hideROIs();
    }
    this.isROIsVisible = !this.isROIsVisible;
  }

  /**
   * Hide all ROIs
   */
  hideROIs() {
    this.managedViewers.forEach(mv => mv.hideROIs());
  }

  /** Show all ROIs */
  showROIs() {
    this.managedViewers.forEach(mv => mv.showROIs());
  }

  /**
   * Returns a RoiAnnotation instance for the given ROI UID
   *
   * @param {String} uid UID of the annotation
   *
   * @returns {RoiAnnotation} The RoiAnnotation instance found for the given UID
   */
  getAnnotation(uid) {
    return this.annotations[uid];
  }

  /**
   * Returns all the RoiAnnotation instances being managed
   *
   * @returns {Array} All RoiAnnotation instances
   */
  getAnnotations() {
    const annotations = [];
    Object.keys(this.annotations).forEach(uid => {
      annotations.push(this.getAnnotation(uid));
    });
    return annotations;
  }

  /**
   * Returns the RoiAnnotation instances registered with the given study UID
   *
   * @param {String} studyInstanceUID UID for the study
   */
  getAnnotationsForStudy(studyInstanceUID) {
    const filter = a => a.studyInstanceUID === studyInstanceUID;
    return this.getAnnotations().filter(filter);
  }

  /**
   * Returns the RoiAnnotation instances registered with the given study and
   * series UIDs
   *
   * @param {String} studyInstanceUID UID for the study
   * @param {String} seriesInstanceUID UID for the series
   */
  getAnnotationsForSeries(studyInstanceUID, seriesInstanceUID) {
    const filter = annotation =>
      annotation.studyInstanceUID === studyInstanceUID &&
      annotation.seriesInstanceUID === seriesInstanceUID;
    return this.getAnnotations().filter(filter);
  }

  /**
   * Returns the selected RoiAnnotation instance or null if none is selected
   *
   * @returns {RoiAnnotation} The selected RoiAnnotation instance
   */
  getSelectedAnnotation() {
    return this.selectedAnnotation;
  }

  /**
   * Selects the given RoiAnnotation instance, publishing an ANNOTATION_SELECTED
   * event to notify all the subscribers
   *
   * @param {RoiAnnotation} roiAnnotation The instance to be selected
   */
  selectAnnotation(roiAnnotation) {
    this.selectedAnnotation = roiAnnotation;
    this.publish(EVENTS.ANNOTATION_SELECTED, roiAnnotation);
  }

  /**
   * Toggles overview map
   *
   * @param viewportIndex The active viewport index
   * @returns {void}
   */
  toggleOverviewMap(viewportIndex) {
    const managedViewers = Array.from(this.managedViewers);
    const managedViewer = managedViewers.find(
      mv => mv.viewportIndex === viewportIndex
    );
    if (managedViewer) {
      managedViewer.toggleOverviewMap();
    }
  }

  /**
   * Removes a RoiAnnotation instance from the managed annotations and reflects
   * its removal on all third-party viewers being managed
   *
   * @param {RoiAnnotation} roiAnnotation The instance to be removed
   */
  removeAnnotation(roiAnnotation) {
    const { uid, studyInstanceUID, seriesInstanceUID } = roiAnnotation;
    const filter = managedViewer =>
      managedViewer.studyInstanceUID === studyInstanceUID &&
      managedViewer.seriesInstanceUID === seriesInstanceUID;

    const managedViewers = Array.from(this.managedViewers).filter(filter);

    managedViewers.forEach(managedViewer =>
      managedViewer.removeRoiGraphic(uid)
    );
  }

  /**
   * Focus the given RoiAnnotation instance by changing the OpenLayers' Map view
   * state of the managed viewer with the given viewport index.
   * If the image for the given annotation is not yet loaded into the viewport,
   * it will set a pendingFocus flag to true in order to perform the focus when
   * the managed viewer instance is created.
   *
   * @param {RoiAnnotation} roiAnnotation RoiAnnotation instance to be focused
   * @param {Number} viewportIndex Index of the viewport to focus
   */
  focusAnnotation(roiAnnotation, viewportIndex) {
    const filter = mv => mv.viewportIndex === viewportIndex;
    const managedViewer = Array.from(this.managedViewers).find(filter);
    if (managedViewer) {
      managedViewer.setViewStateByExtent(roiAnnotation);
    } else {
      this.pendingFocus = true;
    }
  }

  /**
   * Synchronize the ROI graphics for all the managed viewers that has the same
   * series UID of the given managed viewer
   *
   * @param {ViewerManager} baseManagedViewer Reference managed viewer
   */
  synchronizeViewers(baseManagedViewer) {
    const { studyInstanceUID, seriesInstanceUID } = baseManagedViewer;
    const managedViewers = this._getManagedViewersForSeries(
      studyInstanceUID,
      seriesInstanceUID
    );

    // Prevent infinite loops arrising from updates.
    managedViewers.forEach(managedViewer =>
      this._removeManagedViewerSubscriptions(managedViewer)
    );

    managedViewers.forEach(managedViewer => {
      if (managedViewer === baseManagedViewer) {
        return;
      }

      const annotations = this.getAnnotationsForSeries(
        studyInstanceUID,
        seriesInstanceUID
      );
      managedViewer.clearRoiGraphics();
      annotations.forEach(roiAnnotation => {
        managedViewer.addRoiGraphic(roiAnnotation.roiGraphic);
      });
    });

    managedViewers.forEach(managedViewer =>
      this._addManagedViewerSubscriptions(managedViewer)
    );
  }

  /**
   * Activates interactions across all the viewers being managed
   *
   * @param {Array} interactions interactions
   */
  activateInteractions(interactions) {
    this.managedViewers.forEach(mv => mv.activateInteractions(interactions));
    this.activeInteractions = interactions;
  }

  /**
   * Triggers the relabelling process for the given RoiAnnotation instance, by
   * publishing the RELABEL event to notify the subscribers
   *
   * @param {RoiAnnotation} roiAnnotation The instance to be relabelled
   * @param {boolean} newAnnotation Whether the annotation is newly drawn (so it deletes on cancel).
   */
  triggerRelabel(roiAnnotation, newAnnotation = false, onRelabel) {
    if (!onRelabel) {
      onRelabel = ({ label }) =>
        this.managedViewers.forEach(mv =>
          mv.updateROIProperties({
            uid: roiAnnotation.uid,
            properties: { label },
          })
        );
    }

    this.publish(EVENTS.RELABEL, {
      roiAnnotation,
      deleteCallback: () => this.removeAnnotation(roiAnnotation),
      successCallback: onRelabel,
      newAnnotation,
    });
  }

  /**
   * Triggers the deletion process for the given RoiAnnotation instance, by
   * publishing the DELETE event to notify the subscribers
   *
   * @param {RoiAnnotation} roiAnnotation The instance to be deleted
   */
  triggerDelete(roiAnnotation) {
    this.publish(EVENTS.DELETE, roiAnnotation);
  }

  /**
   * Set ROI style for all managed viewers
   *
   * @param {string} uid The ROI uid that will be styled
   * @param {object} styleOptions - Style options
   * @param {object} styleOptions.stroke - Style options for the outline of the geometry
   * @param {number[]} styleOptions.stroke.color - RGBA color of the outline
   * @param {number} styleOptions.stroke.width - Width of the outline
   * @param {object} styleOptions.fill - Style options for body the geometry
   * @param {number[]} styleOptions.fill.color - RGBA color of the body
   * @param {object} styleOptions.image - Style options for image
   */
  setROIStyle(uid, styleOptions) {
    this.managedViewers.forEach(mv => mv.setROIStyle(uid, styleOptions));
  }
}

export { EVENTS };

export default new MicroscopyManager();
