export const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  hangingProtocol: '@ohif/extension-default.hangingProtocolModule.default',
  leftPanel: '@ohif/extension-default.panelModule.seriesList',
  rightPanel: '@ohif/extension-default.panelModule.measure',
};

export const dicomhtml = {
  sopClassHandler:
    '@radicalimaging/extension-dicom-html.sopClassHandlerModule.dicom-html',
  viewport: '@radicalimaging/extension-dicom-html.viewportModule.dicom-html',
};
