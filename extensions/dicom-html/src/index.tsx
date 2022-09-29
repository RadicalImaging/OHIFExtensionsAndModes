import React from 'react';
import getSopClassHandlerModule from './getSopClassHandlerModule';

import { id } from './id.js';

const Component = React.lazy(() => {
  return import('./viewports/OHIFDicomHtmlViewport');
});

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
