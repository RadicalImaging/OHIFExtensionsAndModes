/** De-initialize the tool bar and measurement services when done. */
const onModeExit = ({ servicesManager }) => {
  const {
    ToolGroupService,
    SyncGroupService,
    MeasurementService,
    ToolBarService,
    SegmentationService,
    CornerstoneViewportService,
    HangingProtocolService,
    customizationService,
  } = servicesManager.services;

  ToolBarService.reset();
  MeasurementService.clearMeasurements();
  customizationService.reset();
  ToolGroupService.destroy();
  SyncGroupService.destroy();
  SegmentationService.destroy();
  CornerstoneViewportService.destroy();
  HangingProtocolService.reset();
};

export default onModeExit;