import { hotkeys } from '@ohif/core';
import { id } from './id';
import {
  initToolGroups,
  toolbarButtons,
  onModeExit,
  onModeEnter,
  defaultTool,
  defaultToolBarSections,
} from '@radicalimaging/config-mode';
import ConfigPoint from 'config-point';
import routes from './routes';
import { dicomhtml } from './extensions';

const extensionDependencies = {
  '@ohif/extension-default': '^3.0.0',
  '@radicalimaging/extension-dicom-html': '^3.4.0',
};

const sopClassHandlers = [dicomhtml.sopClassHandler];

function modeFactory({ modeConfiguration }) {
  return ConfigPoint.createConfiguration('@radicalimaging/mode-dicom-html', {
    /**
     * Mode ID, which should be unique among modes used by the viewer. This ID
     * is used to identify the mode in the viewer's state.
     */
    id,
    routeName: 'text',
    /**
     * Mode name, which is displayed in the viewer's UI in the workList, for the
     * user to select the mode.
     */
    displayName: 'Text Report',

    toolbarButtons,

    modeCustomizations: [],

    defaultTool,
    toolBarSections: defaultToolBarSections,

    /**
     * Lifecycle hooks
     */
    onModeEnter,

    onModeExit,

    initToolGroups,

    isValidMode: ({ modalities }) => {
      const modalities_list = modalities.split('\\');
      return modalities_list.indexOf('SR') >= 0;
    },

    routes,

    /** List of extensions that are used by the mode */
    extensions: extensionDependencies,

    /** HangingProtocols used by the mode */
    hangingProtocols: ['@ohif/extension-default.hangingProtocolModule.default'],

    hangingProtocol: ['default'],

    sopClassHandlers,

    /** hotkeys for mode */
    hotkeys: [...hotkeys.defaults.hotkeyBindings],
  });
}

const mode = {
  id,
  modeFactory,
  extensionDependencies,
};

export default mode;
