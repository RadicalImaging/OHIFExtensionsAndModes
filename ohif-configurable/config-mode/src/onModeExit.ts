/** De-initialize the tool bar and measurement services when done. */
const onModeExit = ({ servicesManager }) => {
  const {
    ToolGroupService,
    SyncGroupService,
    MeasurementService,
    ToolBarService,
    customizationService,
  } = servicesManager.services;

  ToolBarService.reset();
  customizationService?.reset?.();
  MeasurementService.clearMeasurements();
  ToolGroupService.destroy();
  SyncGroupService.destroy();
};

export default onModeExit;