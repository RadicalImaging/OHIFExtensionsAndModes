/** De-initialize the tool bar and measurement services when done. */
const onModeExit = ({ servicesManager }) => {
  const {
    ToolGroupService,
    SyncGroupService,
    MeasurementService,
    ToolBarService,
    uiCustomizationService,
  } = servicesManager.services;

  ToolBarService.reset();
  uiCustomizationService?.reset?.();
  MeasurementService.clearMeasurements();
  ToolGroupService.destroy();
  SyncGroupService.destroy();
};

export default onModeExit;