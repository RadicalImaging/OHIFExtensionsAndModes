import { hotkeys } from '@ohif/core';
import { id } from './id';
import {
  initToolGroups, toolbarButtons,
  sopClassHandlers, defaultExtensions, defaultRoutes,
  onModeExit, onModeEnter,
  defaultTool, defaultToolBarSections,
  themeLoad,
} from '@radicalimaging/config-mode';
import ConfigPoint from 'config-point';
import findingsContextMenu from './findingsContextMenu';
import codingValues from './codingValues';
import customMeasurementItem from './customMeasurementItem';

const extensionDependencies = {
  ...defaultExtensions,
  '@ohif/extension-test': '^0.0.1',
};

const findingsCP = ConfigPoint.createConfiguration("@radicalimaging/mode-findings", {
  /**
   * Mode ID, which should be unique among modes used by the viewer. This ID
   * is used to identify the mode in the viewer's state.
   */
  id,
  routeName: 'findings',
  /**
   * Mode name, which is displayed in the viewer's UI in the workList, for the
   * user to select the mode.
   */
  displayName: 'Findings',

  toolbarButtons,

  modeCustomizations: [
    '@ohif/extension-test.customizationModule.contextMenuCodeItem',
    // Next two values are references to config values in the theme configuration, so leave them as strings.
    'measurementsContextMenu',
    'codingValues',
    // This is a straight function, so just return it.
    customMeasurementItem, 
  ],

  defaultTool,
  toolBarSections: defaultToolBarSections,

  /**
   * Lifecycle hooks
   */
  onModeEnter,

  onModeExit,

  initToolGroups,

  excludedModalities: { SM: true, ECG: true, SR: true, PR: true },

  /** Any modality but SM or ECG */
  isValidMode: function ({ modalities }) {
    const modalities_list = modalities.split('\\');

    // Slide Microscopy modality not supported by basic mode yet
    const valid = modalities_list.filter(it => !this.excludedModalities[it]).length > 0;

    return { valid, description: 'Modalities list must have a modality other than SM/SR'};
  },

  routes: defaultRoutes,

  /** List of extensions that are used by the mode */
  extensions: extensionDependencies,

  /** HangingProtocols used by the mode */
  hangingProtocol: [
    'default',
    '@ohif/mnGrid',
    '@ohif/hpCompare'
  ],

  sopClassHandlers,

  /** hotkeys for mode */
  hotkeys: [...hotkeys.defaults.hotkeyBindings, ...((window as any).config.hotkeys || [])],
}
);

async function modeFactory({ modeConfiguration }) {
  // Ensure the themes have finished loading before continuing.
  await themeLoad;
  return findingsCP;
}

const mode = {
  id,
  modeFactory,
  extensionDependencies,
};

export default mode;
export {
  findingsContextMenu,
  codingValues,
  findingsCP,
};