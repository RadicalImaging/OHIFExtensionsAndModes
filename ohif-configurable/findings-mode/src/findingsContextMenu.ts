import ConfigPoint from "config-point";

const findingsContextMenu = ConfigPoint.createConfiguration('measurementsContextMenu', {
  id: 'measurementsContextMenu',
  customizationType: 'ohif.contextMenu',
  menus: [
    {
      id: 'forExistingMeasurement',
      // selector restricts context menu to when there is nearbyToolData
      selector: ({ nearbyToolData }) => !!nearbyToolData,
      items: [
        {
          customizationType: 'ohif.contextSubMenu',
          label: 'Site',
          actionType: 'ShowSubMenu',
          subMenu: 'siteSelectionSubMenu',
        },
        {
          customizationType: 'ohif.contextSubMenu',
          label: 'Finding',
          actionType: 'ShowSubMenu',
          subMenu: 'findingSelectionSubMenu',
        },
        {
          // customizationType is implicit here in the configuration setup
          label: 'Delete Measurement',
          commands: [
            {
              commandName: 'deleteMeasurement',
            },
          ],
        },
        {
          label: 'Add Label',
          commands: [
            {
              commandName: 'setMeasurementLabel',
            },
          ],
        },
      ],
    },

    {
      id: 'findingSelectionSubMenu',
      selector: ({ nearbyToolData }) => false,
      items: [
        {
          customizationType: '@ohif/contextMenuAnnotationCode',
          code: 'SCT:371861004',
        },
        {
          customizationType: '@ohif/contextMenuAnnotationCode',
          code: 'SCT:194983005',
        },
      ],
    },

    {
      id: 'siteSelectionSubMenu',
      selector: ({ nearbyToolData }) => !!nearbyToolData,
      items: [
        {
          customizationType: '@ohif/contextMenuAnnotationCode',
          code: 'SCT:69536005',
        },
        {
          customizationType: '@ohif/contextMenuAnnotationCode',
          code: 'SCT:45048000',
        },
      ],
    },

    {
      id: 'orientationSelectionSubMenu',
      selector: ({ nearbyToolData }) => false,
      items: [
        {
          customizationType: '@ohif/contextMenuAnnotationCode',
          code: 'SCT:24422004',
        },
        {
          customizationType: '@ohif/contextMenuAnnotationCode',
          code: 'SCT:81654009',
        },
      ],
    },
  ],
});

export default findingsContextMenu;
