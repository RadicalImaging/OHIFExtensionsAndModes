/** De-initialize the tool bar and measurement services when done. */
const onModeExit = ({ servicesManager }) => {
  const {
    ToolGroupService,
    SyncGroupService,
    MeasurementService,
    ToolBarService,
    SegmentationService,
    CornerstoneViewportService,
    customizationService,
  } = servicesManager.services;

  try {
    ToolBarService.reset();
    customizationService.reset();
    ToolGroupService.destroy();
    SyncGroupService.destroy();
    SegmentationService.destroy();
    CornerstoneViewportService.destroy();
  } catch (e) {
    console.warn("* onModeExit failed", e);
  }
};

export default onModeExit;