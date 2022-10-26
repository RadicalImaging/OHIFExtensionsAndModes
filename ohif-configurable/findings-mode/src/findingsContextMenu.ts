import codingValues from "./codingValues";
import { UIFindingMenuItemCustomization } from "./findingMenuItem";

const findingsContextMenu = {
  id: 'cornerstoneContextMenu',
  customizationType: 'ohif.contextMenu',
  refs: codingValues,
  menus: [
    {
      id: 'forExistingMeasurement',
      selector: ({ nearbyToolData }) => !!nearbyToolData,
      items: [
        {
          customizationType: "ohif.contextSubMenu",
          label: 'Site',
          actionType: 'SubMenu',
          subMenu: 'siteSelectionSubMenu',
        },
        {
          customizationType: "ohif.contextSubMenu",
          label: 'Finding',
          actionType: 'SubMenu',
          subMenu: 'findingSelectionSubMenu',
        },
        {
          // customizationType is implicit here in the configuration setup
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
        <UIFindingMenuItemCustomization>{
          customizationType: "contextMenu.findingMenuItem", 
          commandName: 'setFinding', // Remove commandName, once customizationType implemented
          code: 'SCT:371861004',
        },
        {
          customizationType: "contextMenu.findingMenuItem", 
          commandName: 'setFinding', // Remove commandName, once customizationType implemented
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
          customizationType: "ohif.siteMenuItem",
          // Remove actionType and commandName 
          actionType: 'Default',
          commandName: 'setSite',
          code: 'SegmentationCardiac:4ch',
        },
        {
          customizationType: "ohif.siteMenuItem", 
          commandName: 'setSite',
          code: 'SegmentationCardiac:3ch',
        },
      ],
    },

  ],
};

export default findingsContextMenu;
