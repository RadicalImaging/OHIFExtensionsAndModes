import OHIF from '@ohif/core';

const { utils } = OHIF;

const SOP_CLASS_UIDS = {
  VL_WHOLE_SLIDE_MICROSCOPY_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.77.1.6',
};

const SOPClassHandlerId = '@radicalimaging/microscopy-dicom.sopClassHandlerModule.DicomMicroscopySRSopClassHandler';

const DicomMicroscopySopClassHandler = {
  name: 'DicomMicroscopySopClassHandler',
  sopClassUids: [SOP_CLASS_UIDS.VL_WHOLE_SLIDE_MICROSCOPY_IMAGE_STORAGE],
  getDisplaySetsFromSeries: (instances, servicesManager, extensionManager) => {
    console.log("DicomMicroscopySopClassHandler.getDisplaySetsFromSeries")
    const instance = instances[0];
    let singleFrameInstance = instance;
    let currentFrames = singleFrameInstance.NumberOfFrames || 1;
    for (const instanceI of instances) {
      const framesI = instanceI.NumberOfFrames || 1;
      if (framesI < currentFrames) {
        singleFrameInstance = instanceI;
        currentFrames = framesI;
      }
    }
    
    const {
      FrameOfReferenceUID,
      SeriesDescription,
      ContentDate,
      ContentTime,
      SeriesNumber,
      StudyInstanceUID, 
      SeriesInstanceUID,
      SOPInstanceUID,
    } = instance;

    return [{
      plugin: 'microscopy',
      Modality: 'SM',
      altImageText: 'Microscopy',
      SeriesDescription: 'Microscopy Data',
      displaySetInstanceUID: utils.guid(),
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID,
      FrameOfReferenceUID,
      SeriesDescription,
      SeriesDate: ContentDate, // Map ContentDate/Time to SeriesTime for series list sorting.
      SeriesTime: ContentTime,
      SeriesNumber,
      firstInstance: singleFrameInstance,
      instance,
      SOPClassHandlerId,
      numImageFrames: 0,
      numInstances: 1,
      others: instances,
    }];
  },
};

export default DicomMicroscopySopClassHandler;
