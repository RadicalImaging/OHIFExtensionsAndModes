import { ohif, dicomhtml } from './extensions';

/**
 * Mode Routes are used to define the mode's behavior. A list of Mode Route
 * that includes the mode's path and the layout to be used. The layout will
 * include the components that are used in the layout. For instance, if the
 * default layoutTemplate is used (id: '@ohif/extension-default.layoutTemplateModule.viewerLayout')
 * it will include the leftPanels, rightPanels, and viewports. However, if
 * you define another layoutTemplate that includes a Footer for instance,
 * you should provide the Footer component here too. Note: We use Strings
 * to reference the component's ID as they are registered in the internal
 * ExtensionManager. The template for the string is:
 * `${extensionId}.{moduleType}.${componentId}`.
 */
const routes = [
  {
    path: 'template',
    layoutTemplate: ({ location, servicesManager }) => {
      return {
        id: ohif.layout,
        props: {
          leftPanels: [ohif.leftPanel],
          rightPanels: [ohif.rightPanel],
          viewports: [
            {
              namespace: dicomhtml.viewport,
              displaySetsToDisplay: [dicomhtml.sopClassHandler],
            },
          ],
        },
      };
    },
  },
];

export default routes;
