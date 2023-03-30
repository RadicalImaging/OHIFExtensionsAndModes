const findingsContextMenu = {
  id: 'measurementsContextMenu',
  customizationType: 'ohif.contextMenu',
  menus: [
    {
      id: 'forExistingMeasurement',
      selector: ({ nearbyToolData }) => !!nearbyToolData,
      items: [
        {
          customizationType: "ohif.contextSubMenu",
          label: 'Site',
          actionType: 'ShowSubMenu',
          subMenu: 'siteSelectionSubMenu',
        },
        {
          customizationType: "ohif.contextSubMenu",
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
            }
          ],
        },
        {
          label: 'Add Label',
          commands: [
            {
              commandName: 'setMeasurementLabel',
            },
          ]
        },
      ],
    },

    {
      id: 'findingSelectionSubMenu',
      selector: ({ nearbyToolData }) => !!nearbyToolData,
      items: [
        {
          customizationType: "contextMenu.findingMenuItem", 
          code: 'SCT:371861004',
        },
        {
          customizationType: "contextMenu.findingMenuItem", 
          code: 'SCT:194983005'
        },
      ],
    },

    {
      id: 'siteSelectionSubMenu',
      selector: ({ nearbyToolData }) => !!nearbyToolData,
      items: [
        {
          customizationType: "contextMenu.siteMenuItem",
          code: 'SegmentationCardiac:4ch',
        },
        {
          customizationType: "contextMenu.siteMenuItem", 
          code: 'SegmentationCardiac:3ch',
        },
      ],
    },

  ],
};

export default findingsContextMenu;
