import OHIF from '@ohif/core';
import loadSR from './utils/loadSR';
import toArray from './utils/toArray';
import DCM_CODE_VALUES from './utils/dcmCodeValues';
import getSourceDisplaySet from './utils/getSourceDisplaySet';

const { utils } = OHIF;

const SOP_CLASS_UIDS = {
  COMPREHENSIVE_3D_SR: '1.2.840.10008.5.1.4.1.1.88.34',
};

const DicomMicroscopySRSopClassHandler = {
  name: 'DicomMicroscopySRSopClassHandler',
  sopClassUids: [SOP_CLASS_UIDS.COMPREHENSIVE_3D_SR],
  getDisplaySetsFromSeries(series, study, dicomWebClient) {
    const firstInstance = series.getFirstInstance();

    // TODO ! Consumption of DICOMMicroscopySRSOPClassHandler to a derived dataset or normal dataset?
    // TOOD -> Easy to swap this to a "non-derived" displaySet, but unfortunately need to put it in a different extension.
    const naturalizedDataset = firstInstance.getData().metadata;
    const ReferencedFrameOfReferenceUID = _getReferencedFrameOfReferenceUID(
      naturalizedDataset
    );

    const { ContentDate, ContentTime, SeriesDescription } = naturalizedDataset;

    const microscopySRDisplaySet = [{
      plugin: 'microscopy',
      Modality: 'SR',
      altImageText: 'Microscopy SR',
      firstInstance,
      displaySetInstanceUID: utils.guid(),
      dicomWebClient,
      SOPInstanceUID: firstInstance.getSOPInstanceUID(),
      SeriesInstanceUID: series.getSeriesInstanceUID(),
      StudyInstanceUID: study.getStudyInstanceUID(),
      ReferencedFrameOfReferenceUID,
      metadata: naturalizedDataset,
      isDerived: true,
      isLoading: false,
      isLoaded: false,
      loadError: false,
      // Map the content date/time to the series date/time, these are only used for filtering.
      SeriesDate: ContentDate,
      SeriesTime: ContentTime,
      SeriesDescription,
    }];

    microscopySRDisplaySet.load = function(referencedDisplaySet) {
      return loadSR(microscopySRDisplaySet, referencedDisplaySet).catch(
        error => {
          microscopySRDisplaySet.isLoaded = false;
          microscopySRDisplaySet.loadError = true;
          throw new Error(error);
        }
      );
    };

    microscopySRDisplaySet.getSourceDisplaySet = function(studies) {
      return getSourceDisplaySet(studies, microscopySRDisplaySet);
    };

    return microscopySRDisplaySet;
  },
};

function _getReferencedFrameOfReferenceUID(naturalizedDataset) {
  const { ContentSequence } = naturalizedDataset;

  const imagingMeasurementsContentItem = ContentSequence.find(
    ci =>
      ci.ConceptNameCodeSequence.CodeValue ===
      DCM_CODE_VALUES.IMAGING_MEASUREMENTS
  );

  const firstMeasurementGroupContentItem = toArray(
    imagingMeasurementsContentItem.ContentSequence
  ).find(
    ci =>
      ci.ConceptNameCodeSequence.CodeValue === DCM_CODE_VALUES.MEASUREMENT_GROUP
  );

  const imageRegionContentItem = toArray(
    firstMeasurementGroupContentItem.ContentSequence
  ).find(
    ci => ci.ConceptNameCodeSequence.CodeValue === DCM_CODE_VALUES.IMAGE_REGION
  );

  return imageRegionContentItem.ReferencedFrameOfReferenceUID;
}

export default DicomMicroscopySRSopClassHandler;
