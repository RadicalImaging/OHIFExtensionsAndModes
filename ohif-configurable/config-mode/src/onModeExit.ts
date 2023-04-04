/** De-initialize the tool bar and measurement services when done. */
const onModeExit = ({ servicesManager }) => {
  const {
    ToolGroupService,
    SyncGroupService,
    measurementService,
    ToolBarService,
    segmentationService,
    CornerstoneViewportService,
    customizationService,
  } = servicesManager.services;

  try {
    customizationService.reset();
    ToolGroupService.destroy();
    SyncGroupService.destroy();
    segmentationService.destroy();
    CornerstoneViewportService.destroy();
  } catch (e) {
    console.warn("* onModeExit failed", e);
  }
};

export default onModeExit;