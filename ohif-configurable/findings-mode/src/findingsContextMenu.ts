import codingValues from "./codingValues";

const findingsContextMenu = {
  id: 'cornerstoneContextMenu',
  type: 'ohif.contextMenu',
  props: {
    show: {
      id: 'show-menu',
      interactionType: 'action',
      commands: [
        {
          commandName: 'showViewerContextMenu',
          commandOptions: {
            menuName: 'cornerstoneContextMenu',
            refs: codingValues,
            items: [
              {
                id: 'forExistingMeasurement',
                selector: ({ nearbyToolData }) => !!nearbyToolData,
                items: [
                  {
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
                attribute: 'code',
                items: [
                  { 
                    commandName: 'setFinding',
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
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
};

export default findingsContextMenu;
