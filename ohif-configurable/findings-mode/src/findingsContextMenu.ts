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
                items: [
                  {
                    label: 'sub1',
                    actionType: 'RunCommands',
                    commands: [
                      {
                        commandName: 'deleteMeasurement',
                      }
                    ],
                  },
                  {
                    label: 'sub2',
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
                id: 'siteSelectionSubMenu',
                selector: ({ nearbyToolData }) => !!nearbyToolData,
                items: [
                  {
                    label: 'Site sub1',
                    actionType: 'RunCommands',
                    commands: [
                      {
                        commandName: 'deleteMeasurement',
                      }
                    ],
                  },
                  {
                    label: 'Site sub2',
                    actionType: 'RunCommands',
                    commands: [
                      {
                        commandName: 'setLabel',
                      },
                    ]
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
