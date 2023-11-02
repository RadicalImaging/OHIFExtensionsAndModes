import { id } from './id';
import getHangingProtocolModule from './hp';
// import {setViewportZoomPan, storeViewportZoomPan } from './custom-viewport/setViewportZoomPan';
import viewCodeAttribute from './custom-attribute/viewCode';
import sameAs from './custom-attribute/sameAs';
import lateralityAttribute from './custom-attribute/laterality';
import numberOfDisplaySets from './custom-attribute/numberOfDisplaySets';
import numberOfDisplaySetsWithImages from './custom-attribute/numberOfDisplaySetsWithImages';
import maxNumImageFrames from './custom-attribute/maxNumImageFrames';
import seriesDescriptionsFromDisplaySets from './custom-attribute/seriesDescriptionsFromDisplaySets';
import getCommandsModule from './commandsModule';
import initialZoomPan from './synchronizers/createInitialZoomPanSynchronizer';

/**
 * Adds extensions for various hanging protocols, including 2x2 mode and MPR modes.
 */
export default {
  /**
   * Only required property. Should be a unique value across all extensions.
   * You ID can be anything you want, but it should be unique.
   */
  id,

  /**
   * Register the hanging protocol handlers
   */
  preRegistration: ({
    servicesManager,
  }) => {
    const { hangingProtocolService, syncGroupService } = servicesManager.services;
    hangingProtocolService.addCustomAttribute('ViewCode', 'View Code Designator:Value', viewCodeAttribute);
    hangingProtocolService.addCustomAttribute('Laterality', 'Laterality of object', lateralityAttribute);
    hangingProtocolService.addCustomAttribute('seriesDescriptions', 'Series Descriptions', seriesDescriptionsFromDisplaySets);
    hangingProtocolService.addCustomAttribute('numberOfDisplaySets', 'Number of displays sets', numberOfDisplaySets);
    hangingProtocolService.addCustomAttribute('numberOfDisplaySetsWithImages', 'Number of displays sets with images', numberOfDisplaySetsWithImages);
    hangingProtocolService.addCustomAttribute('maxNumImageFrames', 'Maximum of number of image frames', maxNumImageFrames);
    hangingProtocolService.addCustomAttribute('sameAs', 'Match an attribute in an existing display set', sameAs);

    syncGroupService.addSynchronizerType('initialzoompan', initialZoomPan);
  },

  /**
   * HangingProtocolModule should provide a list of hanging protocols that will be
   * available in OHIF for Modes to use to decide on the structure of the viewports
   * and also the series that hung in the viewports. Each hanging protocol is defined by
   * { name, protocols}. Examples include the default hanging protocol provided by
   * the default extension that shows 2x2 viewports.
   */
  getHangingProtocolModule,

  /**
   * CommandsModule should provide a list of commands that will be available in OHIF
   * for Modes to consume and use in the viewports. Each command is defined by
   * an object of { actions, definitions, defaultContext } where actions is an
   * object of functions, definitions is an object of available commands, their
   * options, and defaultContext is the default context for the command to run against.
   */
  getCommandsModule,
};

