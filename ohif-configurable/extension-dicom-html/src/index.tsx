import React from 'react';
import getSopClassHandlerModule from './getSopClassHandlerModule';
import {defaultRoutes, sopClassHandlers} from '@radicalimaging/config-mode';

import { id } from './id.js';

const Component = React.lazy(() => {
  return import('./viewports/OHIFDicomHtmlViewport');
});

export const dicomhtml = {
  sopClassHandler:
    '@radicalimaging/extension-dicom-html.sopClassHandlerModule.dicom-html',
  viewport: '@radicalimaging/extension-dicom-html.viewportModule.dicom-html',
};

// Add the html route as a default route
defaultRoutes[0].defaultRoutes.props.viewports.push(
  {
    namespace: dicomhtml.viewport,
    displaySetsToDisplay: [dicomhtml.sopClassHandler],
  },
);

sopClassHandlers.push(dicomhtml.sopClassHandler);

const OHIFDicomHtmlViewport = props => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </React.Suspense>
  );
};

export default {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id,

  getViewportModule({ servicesManager, extensionManager }) {
    const ExtendedOHIFDicomHtmlViewport = props => {
      return (
        <OHIFDicomHtmlViewport
          servicesManager={servicesManager}
          extensionManager={extensionManager}
          {...props}
        />
      );
    };

    return [{ name: 'dicom-html', component: ExtendedOHIFDicomHtmlViewport }];
  },

  getSopClassHandlerModule,
};
