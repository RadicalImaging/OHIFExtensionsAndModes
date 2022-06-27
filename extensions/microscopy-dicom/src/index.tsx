import DicomMicroscopySopClassHandler from './DicomMicroscopySopClassHandler';
import { id } from './id';
import React, { Suspense } from "react";

const Component = React.lazy(() => {
  return import('./DicomMicroscopyViewport');
});

const MicroscopyViewport = props => {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Component {...props} />
    </Suspense>
  );
};

/**
 * You can remove any of the following modules if you don't need them.
 */
export default {
  /**
   * Only required property. Should be a unique value across all extensions.
   * You ID can be anything you want, but it should be unique.
   */
  id,

  /**
   * Perform any pre-registration tasks here. This is called before the extension
   * is registered. Usually we run tasks such as: configuring the libraries
   * (e.g. cornerstone, cornerstoneTools, ...) or registering any services that
   * this extension is providing.
   */
  // preRegistration: ({
  //   servicesManager,
  //   commandsManager,
  //   configuration = {},
  // }) => {},

  /**
   * PanelModule should provide a list of panels that will be available in OHIF
   * for Modes to consume and render. Each panel is defined by a {name,
   * iconName, iconLabel, label, component} object. Example of a panel module
   * is the StudyBrowserPanel that is provided by the default extension in OHIF.
   */
  // getPanelModule: ({
  //   servicesManager,
  //   commandsManager,
  //   extensionManager,
  // }) => {},

  /**
   * ViewportModule should provide a list of viewports that will be available in OHIF
   * for Modes to consume and use in the viewports. Each viewport is defined by
   * {name, component} object. Example of a viewport module is the CornerstoneViewport
   * that is provided by the Cornerstone extension in OHIF.
   */
   getViewportModule({ servicesManager, extensionManager }) {
    const ExtendedMicroscopyViewport = props => {
      console.log("Creating an extended microscopy viewport");
      return (
        <MicroscopyViewport
          servicesManager={servicesManager}
          extensionManager={extensionManager}
          {...props}
        />
      );
    };
    console.log('getViewportModule', ExtendedMicroscopyViewport);
    return [{ name: 'microscopy-dicom', component: ExtendedMicroscopyViewport }];
  },

  /**
   * ToolbarModule should provide a list of tool buttons that will be available in OHIF
   * for Modes to consume and use in the toolbar. Each tool button is defined by
   * {name, defaultComponent, clickHandler }. Examples include radioGroupIcons and
   * splitButton toolButton that the default extension is providing.
   */
  getToolbarModule: ({
    servicesManager,
    commandsManager,
    extensionManager,
  }) => {},
  /**
   * LayoutTemplateMOdule should provide a list of layout templates that will be
   * available in OHIF for Modes to consume and use to layout the viewer.
   * Each layout template is defined by a { name, id, component}. Examples include
   * the default layout template provided by the default extension which renders
   * a Header, left and right sidebars, and a viewport section in the middle
   * of the viewer.
   */
  getLayoutTemplateModule: ({
    servicesManager,
    commandsManager,
    extensionManager,
  }) => {},
  /**
   * SopClassHandlerModule should provide a list of sop class handlers that will be
   * available in OHIF for Modes to consume and use to create displaySets from Series.
   * Each sop class handler is defined by a { name, sopClassUids, getDisplaySetsFromSeries}.
   * Examples include the default sop class handler provided by the default extension
   */
  getSopClassHandlerModule: ({
    servicesManager,
    commandsManager,
    extensionManager,
  }) => {
    console.log("Loading DicomMicroscopySopClassHandler");
    return [DicomMicroscopySopClassHandler]; // , DicomMicroscopySRSopClassHandler];
  },

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
  /**
   * ContextModule should provide a list of context that will be available in OHIF
   * and will be provided to the Modes. A context is a state that is shared OHIF.
   * Context is defined by an object of { name, context, provider }. Examples include
   * the measurementTracking context provided by the measurementTracking extension.
   */
  // getContextModule: ({
  //   servicesManager,
  //   commandsManager,
  //   extensionManager,
  // }) => {},
};
