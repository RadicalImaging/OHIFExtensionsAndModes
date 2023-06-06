const asArray = (v) => Array.isArray(v) ? v : [v];

export default function onModeEnter({ servicesManager, extensionManager, commandsManager }) {
  const {
    measurementService,
    toolbarService,
    toolGroupService,
    customizationService,
  } = servicesManager.services;

  // Clear a few things here.
  measurementService.clearMeasurements();

  // Init Default and SR ToolGroups
  this.initToolGroups(extensionManager, servicesManager, commandsManager);

  let unsubscribe;

  const activateTool = () => {
    asArray(this.defaultTool).forEach(tool => toolbarService.recordInteraction(tool));
    
    // We don't need to reset the active tool whenever a viewport is getting
    // added to the toolGroup.
    unsubscribe();
  };

  // Since we only have one viewport for the basic cs3d mode and it has
  // only one hanging protocol, we can just use the first viewport
  ({ unsubscribe } = toolGroupService.subscribe(
    toolGroupService.EVENTS.VIEWPORT_ADDED,
    activateTool
  ));

  toolbarService.init(extensionManager);
  toolbarService.addButtons(this.toolbarButtons);
  Object.keys(this.toolBarSections).forEach(section => {
    toolbarService.createButtonSection(section, this.toolBarSections[section]);
  });

  customizationService?.addModeCustomizations?.(this.modeCustomizations);
}