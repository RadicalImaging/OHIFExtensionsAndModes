import { SOPClassHandlerName, SOPClassHandlerId } from './id';
import { utils } from '@ohif/core';

// TODO: Should probably use dcmjs for this
const SOP_CLASS_UIDS = {
  BASIC_TEXT_SR: '1.2.840.10008.5.1.4.1.1.88.11',
  ENHANCED_SR: '1.2.840.10008.5.1.4.1.1.88.22',
  COMPREHENSIVE_SR: '1.2.840.10008.5.1.4.1.1.88.33',
  COMPREHENSIVE_3D_SR: '1.2.840.10008.5.1.4.1.1.88.34',
  PROCEDURE_LOG_STORAGE: '1.2.840.10008.5.1.4.1.1.88.40',
  MAMMOGRAPHY_CAD_SR: '1.2.840.10008.5.1.4.1.1.88.50',
  CHEST_CAD_SR: '1.2.840.10008.5.1.4.1.1.88.65',
  X_RAY_RADIATION_DOSE_SR: '1.2.840.10008.5.1.4.1.1.88.67',
  ACQUISITION_CONTEXT_SR_STORAGE: '1.2.840.10008.5.1.4.1.1.88.71',
};

const sopClassUids = Object.values(SOP_CLASS_UIDS);

function _getDisplaySetsFromSeries(
  instances,
  servicesManager,
  extensionManager
) {
  // If the series has no instances, stop here
  if (!instances || !instances.length) {
    throw new Error('No instances were provided');
  }

  const instance = instances[0];

  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID,
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    ConceptNameCodeSequence,
    SOPClassUID,
  } = instance;

  const srDisplaySet = {
    Modality: 'SR',
    displaySetInstanceUID: utils.guid(),
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    SOPInstanceUID,
    SeriesInstanceUID,
    StudyInstanceUID,
    SOPClassHandlerId,
    SOPClassUID,
    referencedImages: null,
    measurements: null,
    instances: [instance], // this line is important to avoid any duplicated generation of displaySets
    isDerivedDisplaySet: true,
    isLoaded: false,
    sopClassUids,
    numImageFrames: 0,
    numInstances: 1,
    instance,
  };

  return [srDisplaySet];
}

function getSopClassHandlerModule({ servicesManager, extensionManager }) {
  const getDisplaySetsFromSeries = instances => {
    return _getDisplaySetsFromSeries(
      instances,
      servicesManager,
      extensionManager
    );
  };

  return [
    {
      name: SOPClassHandlerName,
      sopClassUids,
      getDisplaySetsFromSeries,
    },
  ];
}

export default getSopClassHandlerModule;
