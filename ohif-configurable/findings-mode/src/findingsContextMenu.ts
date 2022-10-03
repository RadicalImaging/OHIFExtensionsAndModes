import codingValues from "./codingValues";

const findingsContextMenu = {
  id: 'cornerstoneContextMenu',
  uiType: 'ohif.contextMenu',
  refs: codingValues,
  items: [
    {
      id: 'forExistingMeasurement',
      selector: ({ nearbyToolData }) => !!nearbyToolData,
      items: [
        {
          uiType: "ohif.contextMenuItem", // Implicit value if not otherwise specified
          label: 'Site',
          actionType: 'SubMenu',
          subMenu: 'siteSelectionSubMenu',
        },
        {
          label: 'Finding',
          actionType: 'SubMenu',
          subMenu: 'findingSelectionSubMenu',
        },
        {
          label: 'Delete Measurement',
          actionType: 'RunCommands',
          commands: [
            {
              commandName: 'deleteMeasurement',
            }
          ],
        },
        {
          label: 'Add Label',
          actionType: 'RunCommands',
          commands: [
            {
              commandName: 'setLabel',
            },
          ]
        },
      ],
    },

    {
      id: 'findingSelectionSubMenu',
      selector: ({ nearbyToolData }) => !!nearbyToolData,
      attribute: 'code', // This will no longer be required/used
      items: [
        {
          uiType: "ohif.findingMenuItem", // TODO - specify that this is a finding menu item, which defaults the commands list
          commandName: 'setFinding', // Remove commandName
          code: 'SCT:371861004',
        },
        {
          commandName: 'setFinding',
          code: 'SCT:194983005'
        },
      ],
    },

    {
      id: 'siteSelectionSubMenu',
      selector: ({ nearbyToolData }) => !!nearbyToolData,
      attribute: 'code',
      items: [
        {
          actionType: 'Default',
          commandName: 'setSite',
          code: 'SegmentationCardiac:4ch',
        },
        {
          commandName: 'setSite',
          code: 'SegmentationCardiac:3ch',
        },
      ],
    },

  ],
};

export default findingsContextMenu;
