import { id } from './id';
import getHangingProtocolModule from './hp';
// import {setViewportZoomPan, storeViewportZoomPan } from './custom-viewport/setViewportZoomPan';
import viewCodeAttribute from './custom-attribute/viewCode';
import lateralityAttribute from './custom-attribute/laterality';
import numberOfDisplaySets from './custom-attribute/numberOfDisplaySets';
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
    const { HangingProtocolService, SyncGroupService } = servicesManager.services;
    // HangingProtocolService.addCustomViewportOption('zoomPan', "Set initial zoom, WITH camera event", 
    //   setViewportZoomPan, 
    //   storeViewportZoomPan);
    HangingProtocolService.addCustomAttribute('ViewCode', 'View Code Designator:Value', viewCodeAttribute);
    HangingProtocolService.addCustomAttribute('Laterality', 'Laterality of object', lateralityAttribute);
    HangingProtocolService.addCustomAttribute('seriesDescriptions', 'Series Descriptions', seriesDescriptionsFromDisplaySets);
    HangingProtocolService.addCustomAttribute('numberOfDisplaySets', 'Number of displays sets', numberOfDisplaySets);
    HangingProtocolService.addCustomAttribute('maxNumImageFrames', 'Maximum of number of image frames', maxNumImageFrames);
    
    console.log("About to create synchronizer initialzoompan");
    SyncGroupService.setSynchronizer('initialzoompan', initialZoomPan);
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

