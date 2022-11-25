export default function onModeEnter({ servicesManager, extensionManager, commandsManager }) {
  const {
    MeasurementService,
    ToolBarService,
    ToolGroupService,
    customizationService,
  } = servicesManager.services;

  // Clear a few things here.
  MeasurementService.clearMeasurements();
  ToolBarService.reset();

  // Init Default and SR ToolGroups
  this.initToolGroups(extensionManager, ToolGroupService, commandsManager);

  let unsubscribe;

  const activateTool = () => {
    ToolBarService.recordInteraction(this.defaultTool);

    // We don't need to reset the active tool whenever a viewport is getting
    // added to the toolGroup.
    unsubscribe();
  };

  // Since we only have one viewport for the basic cs3d mode and it has
  // only one hanging protocol, we can just use the first viewport
  ({ unsubscribe } = ToolGroupService.subscribe(
    ToolGroupService.EVENTS.VIEWPORT_ADDED,
    activateTool
  ));

  ToolBarService.init(extensionManager);
  ToolBarService.addButtons(this.toolbarButtons);
  Object.keys(this.toolBarSections).forEach(section => {
    ToolBarService.createButtonSection(section, this.toolBarSections[section]);
  });

  customizationService?.addModeCustomizations?.(this.modeCustomizations);
}