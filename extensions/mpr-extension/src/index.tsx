import { id } from './id';
import getHangingProtocolModule from './getHangingProtocolModule.ts';

console.log("Loading mprExtension - should be as umd module");

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
  // getCommandsModule: ({
  //   servicesManager,
  //   commandsManager,
  //   extensionManager,
  // }) => {},
};

console.log("Loaded mpr extension umd module");
