import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  ScrollableArea,
  TableList,
  TableListItem,
  Icon,
  withTranslation,
} from '@ohif/ui';
import { DICOMSR } from '@ohif/core';
import DEVICE_OBSERVER_UID from '../../utils/DEVICE_OBSERVER_UID';
import { EVENTS as MicroscopyEvents } from '../../tools/microscopyManager';
import { utils, DICOMWeb, errorHandler } from '@ohif/core';
import { api } from 'dicomweb-client';
import dcmjs from 'dcmjs';
import styles from '../../utils/styles';
import './MicroscopyPanel.styl';

const { saveByteArray } = DICOMSR;
const { studyMetadataManager } = utils;
const { datasetToBuffer } = dcmjs.data;


const formatArea = area => {
  let mult = 1;
  let unit = 'mm';
  if (area > 1000000) {
    unit = 'm';
    mult = 1 / 1000000;
  } else if (area < 1) {
    unit = 'μm';
    mult = 1000000;
  }
  return `${(area * mult).toFixed(2)} ${unit}²`;
}

const formatLength = (length, unit) => {
  let mult = 1;
  if (unit == 'km' || !unit && length > 1000000) {
    unit = 'km';
    mult = 1 / 1000000;
  } else if (unit == 'm' || !unit && length > 1000) {
    unit = 'm';
    mult = 1 / 1000;
  } else if (unit == 'μm' || !unit && length < 1) {
    unit = 'μm';
    mult = 1000;
  } else if (unit && unit != 'mm') {
    throw new Error(`Unknown length unit ${unit}`)
  } else {
    unit = 'mm';
  }
  return `${(length * mult).toFixed(2)} ${unit}`;
}

class MicroscopyPanel extends Component {
  state = {
    roiAnnotations: [],
    selectedAnnotation: null,
  };

  constructor(props) {
    super(props);
    this.studyInstanceUID = props.viewports[0].StudyInstanceUID;
    this.microscopyManager = props.microscopyManager;
    this.onAnnotationUpdated = this.onAnnotationUpdated.bind(this);
    this.onAnnotationSelected = this.onAnnotationSelected.bind(this);
    this.saving = false;
  }

  static propTypes = {
    viewports: PropTypes.object,
    microscopyManager: PropTypes.any,
    t: PropTypes.func,
  };

  onAnnotationUpdated() {
    const roiAnnotations = this.microscopyManager.getAnnotationsForStudy(
      this.studyInstanceUID
    );
    this.setState({ roiAnnotations });
  }

  onAnnotationSelected() {
    const selectedAnnotation = this.microscopyManager.getSelectedAnnotation();
    this.setState({ selectedAnnotation });
  }

  componentDidMount() {
    this.microscopyManager.subscribe(
      MicroscopyEvents.ANNOTATION_UPDATED,
      this.onAnnotationUpdated
    );
    this.microscopyManager.subscribe(
      MicroscopyEvents.ANNOTATION_SELECTED,
      this.onAnnotationSelected
    );
    this.onAnnotationUpdated();
    this.onAnnotationSelected();
  }

  componentWillUnmount() {
    this.microscopyManager.unsubscribe(
      MicroscopyEvents.ANNOTATION_UPDATED,
      this.onAnnotationUpdated
    );
    this.microscopyManager.unsubscribe(
      MicroscopyEvents.ANNOTATION_SELECTED,
      this.onAnnotationSelected
    );
  }

  getActionButton = (btnLabel, onClickCallback) => {
    return (
      <button key={btnLabel} className="btnAction" onClick={onClickCallback}>
        <span style={{ marginRight: '4px' }}>
          <Icon name="edit" width="14px" height="14px" />
        </span>
        <span>{btnLabel}</span>
      </button>
    );
  };

  promptSave = () => {
    const { microscopyManager, studyInstanceUID } = this;
    const annotations = microscopyManager.getAnnotationsForStudy(
      studyInstanceUID
    );

    if (!annotations || this.saving) {
      return;
    }

    this.props.seriesDescriptionInputDialog(this.saveFunction);
  };

  saveFunction = async (SeriesDescription, server) => {
    const { microscopyManager, studyInstanceUID } = this;
    const { onSaveComplete } = this.props;
    const imagingMeasurements = [];
    const annotations = microscopyManager.getAnnotationsForStudy(
      studyInstanceUID
    );

    this.saving = true;

    // There is only one viewer possible for one study,
    // Since once study contains multiple resolution levels (series) of one whole
    // Slide image.

    const studyMetadata = studyMetadataManager.get(studyInstanceUID);
    const displaySets = studyMetadata.getDisplaySets();
    const smDisplaySet = displaySets.find(ds => ds.Modality === 'SM');

    // Get the next available series number after 4700.

    const dsWithMetadata = displaySets.filter(
      ds =>
        ds.metadata &&
        ds.metadata.SeriesNumber &&
        typeof ds.metadata.SeriesNumber === 'number'
    );

    const seriesNumbers = dsWithMetadata.map(ds => ds.metadata.SeriesNumber);

    const maxSeriesNumber = Math.max(...seriesNumbers, 4700);
    const SeriesNumber = maxSeriesNumber + 1;

    const { metadata } = smDisplaySet;
    // Handle malformed data
    if (!metadata.SpecimenDescriptionSequence) {
      metadata.SpecimenDescriptionSequence = {
        SpecimenUID: metadata.SeriesInstanceUID,
        SpecimenIdentifier: metadata.SeriesDescription,
      };
    }
    const { SpecimenDescriptionSequence } = metadata;

    const observationContext = new dcmjs.sr.templates.ObservationContext({
      observerPersonContext: new dcmjs.sr.templates.ObserverContext({
        observerType: new dcmjs.sr.coding.CodedConcept({
          value: '121006',
          schemeDesignator: 'DCM',
          meaning: 'Person',
        }),
        observerIdentifyingAttributes: new dcmjs.sr.templates.PersonObserverIdentifyingAttributes(
          {
            name: '@ohif/extension-dicom-microscopy',
          }
        ),
      }),
      observerDeviceContext: new dcmjs.sr.templates.ObserverContext({
        observerType: new dcmjs.sr.coding.CodedConcept({
          value: '121007',
          schemeDesignator: 'DCM',
          meaning: 'Device',
        }),
        observerIdentifyingAttributes: new dcmjs.sr.templates.DeviceObserverIdentifyingAttributes(
          {
            uid: DEVICE_OBSERVER_UID,
          }
        ),
      }),
      subjectContext: new dcmjs.sr.templates.SubjectContext({
        subjectClass: new dcmjs.sr.coding.CodedConcept({
          value: '121027',
          schemeDesignator: 'DCM',
          meaning: 'Specimen',
        }),
        subjectClassSpecificContext: new dcmjs.sr.templates.SubjectContextSpecimen(
          {
            uid: SpecimenDescriptionSequence.SpecimenUID,
            identifier: SpecimenDescriptionSequence.SpecimenIdentifier ||
              metadata.SeriesInstanceUID,
            containerIdentifier: metadata.ContainerIdentifier ||
              metadata.SeriesInstanceUID,
          }
        ),
      }),
    });

    for (let i = 0; i < annotations.length; i++) {
      const { roiGraphic: roi, label } = annotations[i];
      const {
        measurements,
        evaluations,
        marker,
        presentationState,
      } = roi.properties;

      console.debug('[SR] storing marker...', marker);
      console.debug('[SR] storing measurements...', measurements);
      console.debug('[SR] storing evaluations...', evaluations);
      console.debug('[SR] storing presentation state...', presentationState);
      presentationState.marker = marker;

      /** Avoid incompatibility with dcmjs */
      measurements = measurements.map(measurement => {
        const ConceptName = Array.isArray(measurement.ConceptNameCodeSequence)
          ? measurement.ConceptNameCodeSequence[0]
          : measurement.ConceptNameCodeSequence;

        const MeasuredValue = Array.isArray(measurement.MeasuredValueSequence)
          ? measurement.MeasuredValueSequence[0]
          : measurement.MeasuredValueSequence;

        const MeasuredValueUnits = Array.isArray(
          MeasuredValue.MeasurementUnitsCodeSequence
        )
          ? MeasuredValue.MeasurementUnitsCodeSequence[0]
          : MeasuredValue.MeasurementUnitsCodeSequence;

        return new dcmjs.sr.valueTypes.NumContentItem({
          name: new dcmjs.sr.coding.CodedConcept({
            meaning: ConceptName.CodeMeaning,
            value: ConceptName.CodeValue,
            schemeDesignator: ConceptName.CodingSchemeDesignator,
          }),
          value: MeasuredValue.NumericValue,
          unit: new dcmjs.sr.coding.CodedConcept({
            value: MeasuredValueUnits.CodeValue,
            meaning: MeasuredValueUnits.CodeMeaning,
            schemeDesignator: MeasuredValueUnits.CodingSchemeDesignator,
          }),
        });
      });

      /** Avoid incompatibility with dcmjs */
      evaluations = evaluations.map(evaluation => {
        const ConceptName = Array.isArray(evaluation.ConceptNameCodeSequence)
          ? evaluation.ConceptNameCodeSequence[0]
          : evaluation.ConceptNameCodeSequence;

        return new dcmjs.sr.valueTypes.TextContentItem({
          name: new dcmjs.sr.coding.CodedConcept({
            value: ConceptName.CodeValue,
            meaning: ConceptName.CodeMeaning,
            schemeDesignator: ConceptName.CodingSchemeDesignator,
          }),
          value: evaluation.TextValue,
          relationshipType: evaluation.RelationshipType,
        });
      });

      const identifier = `ROI #${i + 1}`;
      const group = new dcmjs.sr.templates.PlanarROIMeasurementsAndQualitativeEvaluations(
        {
          trackingIdentifier: new dcmjs.sr.templates.TrackingIdentifier({
            uid: roi.uid,
            identifier: presentationState
              ? identifier.concat(`(${JSON.stringify(presentationState)})`)
              : identifier,
          }),
          referencedRegion: new dcmjs.sr.contentItems.ImageRegion3D({
            graphicType: roi.scoord3d.graphicType,
            graphicData: roi.scoord3d.graphicData,
            frameOfReferenceUID: roi.scoord3d.frameOfReferenceUID,
          }),
          findingType: new dcmjs.sr.coding.CodedConcept({
            value: label,
            schemeDesignator: '@ohif/extension-dicom-microscopy',
            meaning: 'FREETEXT',
          }),
          /** Evaluations will conflict with current tracking identifier */
          /** qualitativeEvaluations: evaluations, */
          measurements,
        }
      );
      imagingMeasurements.push(...group);
    }

    const measurementReport = new dcmjs.sr.templates.MeasurementReport({
      languageOfContentItemAndDescendants: new dcmjs.sr.templates.LanguageOfContentItemAndDescendants(
        {}
      ),
      observationContext,
      procedureReported: new dcmjs.sr.coding.CodedConcept({
        value: '112703',
        schemeDesignator: 'DCM',
        meaning: 'Whole Slide Imaging',
      }),
      imagingMeasurements,
    });

    const dataset = new dcmjs.sr.documents.Comprehensive3DSR({
      content: measurementReport[0],
      evidence: [metadata],
      seriesInstanceUID: dcmjs.data.DicomMetaDictionary.uid(),
      seriesNumber: SeriesNumber,
      seriesDescription:
        SeriesDescription || 'Whole slide imaging structured report',
      sopInstanceUID: dcmjs.data.DicomMetaDictionary.uid(),
      instanceNumber: 1,
      manufacturer: 'dcmjs-org',
    });
    dataset.SpecificCharacterSet = 'ISO_IR 192';
    const fileMetaInformationVersionArray = new Uint8Array(2);
    fileMetaInformationVersionArray[1] = 1;

    dataset._meta = {
      FileMetaInformationVersion: {
        Value: [fileMetaInformationVersionArray.buffer], // TODO
        vr: 'OB',
      },
      MediaStorageSOPClassUID: dataset.sopClassUID,
      MediaStorageSOPInstanceUID: dataset.sopInstanceUID,
      TransferSyntaxUID: {
        Value: ['1.2.840.10008.1.2.1'],
        vr: 'UI',
      },
      ImplementationClassUID: {
        Value: [dcmjs.data.DicomMetaDictionary.uid()],
        vr: 'UI',
      },
      ImplementationVersionName: {
        Value: ['@ohif/extension-dicom-microscopy'],
        vr: 'SH',
      },
    };

    const part10Buffer = datasetToBuffer(dataset);

    if (!server) server = this.props.server;

    if (server.wadoRoot == 'saveDicom') {
      try {
        saveByteArray(part10Buffer, `sr-microscopy.dcm`);
      } catch (e) {
        console.error('Unable to save', e);
        this.saving = false;
        return;
      }
      onSaveComplete({
        title: 'SR Saved',
        meassage: 'Measurements downloaded successfully',
        type: 'success',
      });
      this.saving = false;
      return;
    }

    const config = {
      url: server.wadoRoot,
      headers: DICOMWeb.getAuthorizationHeader(),
      errorInterceptor: errorHandler.getHTTPErrorHandler(),
    };

    const dicomWeb = new api.DICOMwebClient(config);
    const options = {
      datasets: [part10Buffer],
    };

    dicomWeb
      .storeInstances(options)
      .then(() => {
        onSaveComplete({
          title: 'SR Saved',
          message: 'Measurements saved successfully',
          type: 'success',
        });

        this.saving = false;
      })
      .catch(error => {
        onSaveComplete({
          title: 'SR Save Failed',
          message: error.message,
          type: 'error',
        });

        this.saving = false;
      });
  };

  render() {
    const { microscopyManager, promptSave } = this;
    const rows = [];

    this.state.roiAnnotations.forEach((roiAnnotation, index) => {
      const label = roiAnnotation.getDetailedLabel();
      const area = roiAnnotation.getArea();
      const length = roiAnnotation.getLength();
      const shortAxisLength =
        roiAnnotation.roiGraphic.properties.shortAxisLength;
      const isSelected = this.state.selectedAnnotation === roiAnnotation;

      const onRelabel = () => microscopyManager.triggerRelabel(roiAnnotation);
      const onDelete = () => microscopyManager.triggerDelete(roiAnnotation);
      const onSelect = () => microscopyManager.selectAnnotation(roiAnnotation);

      const rowActions = [];
      rowActions.push(this.getActionButton('Relabels', onRelabel));
      rowActions.push(this.getActionButton('Delete', onDelete));

      const { uid } = roiAnnotation;
      const onMouseEnter = () =>
        microscopyManager.setROIStyle(uid, styles.active);
      const onMouseLeave = () =>
        microscopyManager.setROIStyle(uid, styles.default);

      rows.push(
        <div
          key={`list-item-${index}`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <TableListItem
            key={uid}
            itemKey={uid}
            itemIndex={index + 1}
            itemClass={classnames(
              'microscopyItem',
              isSelected ? 'selected' : ''
            )}
            onItemClick={onSelect}
          >
            <div>{label}</div>
            {area !== undefined ? (
              <div className={'measurementDisplayText'}>
                {formatArea(area)}
              </div>
            ) : length !== undefined ? (
              <div className={'measurementDisplayText'}>
                {shortAxisLength
                    ? `${formatLength(length, 'μm')} x ${formatLength(shortAxisLength, 'μm')}`
                    : `${formatLength(length, 'μm')}`}
              </div>
            ) : null}
            <div className="rowActions">{rowActions}</div>
          </TableListItem>
        </div>
      );
    });

    const onDeleteCurrentSRHandler = async () => {
      try {
        const { StudyInstanceUID } = this.props.activeViewport;
        const study = this.props.studies.find(
          s => s.StudyInstanceUID === StudyInstanceUID
        );
        const lastDerivedDisplaySet = study.derivedDisplaySets.sort(
          (ds1, ds2) => {
            const dateTime1 = Number(`${ds1.SeriesDate}${ds1.SeriesTime}`);
            const dateTime2 = Number(`${ds2.SeriesDate}${ds2.SeriesTime}`);
            return dateTime1 > dateTime2;
          }
        )[study.derivedDisplaySets.length - 1];
        await DICOMSR.rejectMeasurements(study.wadoRoot,
          lastDerivedDisplaySet.StudyInstanceUID,
          lastDerivedDisplaySet.SeriesInstanceUID
        );
        this.props.onRejectComplete({
          title: 'Report rejected',
          message: 'Latest report rejected successfully',
          type: 'success',
        });
      } catch (error) {
        this.props.onRejectComplete({
          title: 'Failed to reject report',
          message: error.message,
          type: 'error',
        });
      }
    };

    return (
      <div className="microscopyTable">
        <ScrollableArea>
          <TableList headerTitle={this.props.t('Regions of Interest')}>
            {rows}
          </TableList>
        </ScrollableArea>
        <div className="microscopyTableFooter">
          {promptSave && (
            <button
              onClick={promptSave}
              className="saveBtn"
              data-cy="save-measurements-btn"
            >
              <Icon name="save" width="14px" height="14px" />
              {this.props.t('Save Measurements')}
            </button>
          )}
          <button className="rejectBtn" onClick={onDeleteCurrentSRHandler}>
            Reject latest report
          </button>
        </div>
      </div>
    );
  }
}

const connectedMicroscopyPanel = withTranslation(['MicroscopyTable', 'Common'])(
  MicroscopyPanel
);

export default connectedMicroscopyPanel;
