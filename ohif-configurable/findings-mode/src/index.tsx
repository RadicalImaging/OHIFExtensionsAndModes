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
import codingValues from './codingValues';

const extensionDependencies = {
  ...defaultExtensions,
  '@radicalimaging/hp-extension': '^3.4.0',
};

function modeFactory({ modeConfiguration }) {
  return ConfigPoint.createConfiguration("@radicalimaging/mode-findings", {
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

    modeCustomizations: [findingsContextMenu, codingValues],

    defaultTool,
    toolBarSections: defaultToolBarSections,

    /**
     * Lifecycle hooks
     */
    onModeEnter,

    onModeExit,

    initToolGroups,

    /** Any modality but SM or ECG */
    isValidMode: ({ modalities }) => {
      const modalities_list = modalities.split('\\');

      // Slide Microscopy modality not supported by basic mode yet
      return modalities_list.filter(it => it !== 'SM' && it !== 'ECG').length > 0;
    },

    routes: defaultRoutes,

    /** List of extensions that are used by the mode */
    extensions: extensionDependencies,

    /** HangingProtocols used by the mode */
    hangingProtocols: [
      '@radicalimaging/hp-extension.hangingProtocolModule.heart',
      '@radicalimaging/hp-extension.hangingProtocolModule.breast',
      '@radicalimaging/hp-extension.hangingProtocolModule.MN',
      '@ohif/extension-default.hangingProtocolModule.default',
    ],

    hangingProtocol: [
      '@radicalimaging/hp-extension.heart',
      '@radicalimaging/hp-extension.breast',
      '@radicalimaging/hp-extension.mn',
      '@radicalimaging/hp-extension.mn1',
      'default',
    ],

    sopClassHandlers,

    /** hotkeys for mode */
    hotkeys: [...hotkeys.defaults.hotkeyBindings],
  }
  );;
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
};