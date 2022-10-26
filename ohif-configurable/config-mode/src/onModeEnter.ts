export default function onModeEnter({ servicesManager, extensionManager, commandsManager }) {
  const { ToolBarService, uiCustomizationService, ToolGroupService } = servicesManager.services;

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
    console.log("Creating toolbar section", section, this.toolBarSections[section]);
    ToolBarService.createButtonSection(section, this.toolBarSections[section]);
  });

  uiCustomizationService?.addModeCustomizations?.(this.modeCustomizations);
}