import { id } from './id';
import getSopClassHandlerModule from "./getSopClassHandlerModule";
import React, { Suspense } from "react";
import mode from './ecgModeFactory';

const Component = React.lazy(() => {
  return import('./viewports/EcgViewport');
});

const EcgViewport = props => {
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
  ...mode,
  
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
  preRegistration: ({
    servicesManager,
    commandsManager,
    configuration = {},
  }) => { },

  /**
   * ViewportModule should provide a list of viewports that will be available in OHIF
   * for Modes to consume and use in the viewports. Each viewport is defined by
   * {name, component} object. Example of a viewport module is the CornerstoneViewport
   * that is provided by the Cornerstone extension in OHIF.
   */
  getViewportModule({ servicesManager, extensionManager }) {
    const ExtendedEcgViewport = props => {
      return (
        <EcgViewport
          servicesManager={servicesManager}
          extensionManager={extensionManager}
          {...props}
        />
      );
    };

    return [{ name: 'ecg-dicom', component: ExtendedEcgViewport }];
  },

  /**
   * SopClassHandlerModule should provide a list of sop class handlers that will be
   * available in OHIF for Modes to consume and use to create displaySets from Series.
   * Each sop class handler is defined by a { name, sopClassUids, getDisplaySetsFromSeries}.
   * Examples include the default sop class handler provided by the default extension
   */
  getSopClassHandlerModule,
};
