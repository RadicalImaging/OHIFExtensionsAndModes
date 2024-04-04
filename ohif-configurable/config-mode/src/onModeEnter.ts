import {getConfig} from 'config-point';

const asArray = (v) => Array.isArray(v) ? v : [v];

export default function onModeEnter({ servicesManager, extensionManager, commandsManager }) {
  const {
    measurementService,
    toolbarService,
    customizationService,
  } = servicesManager.services;

  // Clear a few things here.
  measurementService.clearMeasurements();

  // Init Default and SR ToolGroups
  this.initToolGroups(extensionManager, servicesManager, commandsManager);

  toolbarService.addButtons(this.toolbarButtons);
  Object.keys(this.toolBarSections).forEach(section => {
    toolbarService.createButtonSection(section, this.toolBarSections[section]);
  });

  const customizations = this.modeCustomizations?.map(it => (typeof it)==='string' && getConfig(it) || it )
  
  customizationService?.addModeCustomizations?.(customizations);
}