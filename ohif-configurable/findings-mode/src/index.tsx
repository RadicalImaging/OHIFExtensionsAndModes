import { hotkeys } from '@ohif/core';
import { id } from './id';
import {
  initToolGroups, toolbarButtons,
  sopClassHandlers, defaultExtensions, defaultRoutes,
  onModeExit, onModeEnter,
  defaultTool, defaultToolBarSections,
} from '@radicalimaging/config-mode';
import ConfigPoint from 'config-point';
import findingsContextMenu from './findingsContextMenu';
import findingMenuItem from './findingMenuItem';
import codingValues from './codingValues';
import customMeasurementItem from './customMeasurementItem';
import siteMenuItem from './siteMenuItem';

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
    '@ohif/extension-test.customizationModule.custom-context-menu',
    findingsContextMenu, codingValues, customMeasurementItem, findingMenuItem, siteMenuItem,
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
  hotkeys: [...hotkeys.defaults.hotkeyBindings, ...(window.config.hotkeys || [])],
}
);

function modeFactory({ modeConfiguration }) {
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