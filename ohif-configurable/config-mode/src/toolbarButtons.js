// TODO: torn, can either bake this here; or have to create a whole new button type
// Only ways that you can pass in a custom React component for render :l
import {
  // ExpandableToolbarButton,
  // ListMenu,
  WindowLevelMenuItem,
} from '@ohif/ui';
import { defaults } from '@ohif/core';

const isNewHP = window.config.isNewHP;

const { windowLevelPresets } = defaults;
/**
 *
 * @param {*} type - 'tool' | 'action' | 'toggle'
 * @param {*} id
 * @param {*} icon
 * @param {*} label
 */
function _createButton(type, id, icon, label, commands, tooltip) {
  return {
    id,
    icon,
    label,
    type,
    commands,
    tooltip,
  };
}

function _createCommands(commandName, toolName, toolGroupIds) {
  return toolGroupIds.map(toolGroupId => ({
    /* It's a command that is being run when the button is clicked. */
    commandName,
    commandOptions: {
      toolName,
      toolGroupId,
    },
    context: 'CORNERSTONE',
  }));
}

const _createActionButton = _createButton.bind(null, 'action');
const _createToggleButton = _createButton.bind(null, 'toggle');
const _createToolButton = _createButton.bind(null, 'tool');

/**
 *
 * @param {*} preset - preset number (from above import)
 * @param {*} title
 * @param {*} subtitle
 */
function _createWwwcPreset(preset, title, subtitle) {
  return {
    id: preset.toString(),
    title,
    subtitle,
    type: 'action',
    commands: [
      {
        commandName: 'setWindowLevel',
        commandOptions: {
          ...windowLevelPresets[preset],
        },
        context: 'CORNERSTONE',
      },
    ],
  };
}

const toolbarButtons = [
  // Measurement
  {
    id: 'MeasurementTools',
    type: 'ohif.splitButton',
    props: {
      groupId: 'MeasurementTools',
      isRadio: true, // ?
      // Switch?
      primary: _createToolButton(
        'Length',
        'tool-length',
        'Length',
        [
          {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: 'Length',
            },
            context: 'CORNERSTONE',
          },
          {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: 'SRLength',
              toolGroupId: 'SRToolGroup',
            },
            // we can use the setToolActive command for this from Cornerstone commandsModule
            context: 'CORNERSTONE',
          },
        ],
        'Length'
      ),
      secondary: {
        icon: 'chevron-down',
        label: '',
        isActive: true,
        tooltip: 'More Measure Tools',
      },
      items: [
        _createToolButton(
          'Length',
          'tool-length',
          'Length',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'Length',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRLength',
                toolGroupId: 'SRToolGroup',
              },
              // we can use the setToolActive command for this from Cornerstone commandsModule
              context: 'CORNERSTONE',
            },
          ],
          'Length Tool'
        ),
        _createToolButton(
          'Bidirectional',
          'tool-bidirectional',
          'Bidirectional',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'Bidirectional',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRBidirectional',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Bidirectional Tool'
        ),
        _createToolButton(
          'ArrowAnnotate',
          'tool-annotate',
          'Annotation',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'ArrowAnnotate',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRArrowAnnotate',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Arrow Annotate'
        ),
        _createToolButton(
          'EllipticalROI',
          'tool-elipse',
          'Ellipse',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'EllipticalROI',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SREllipticalROI',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Ellipse Tool'
        ),
        _createToolButton(
          'CircleROI',
          'tool-circle',
          'Circle',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'CircleROI',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRCircleROI',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Circle Tool'
        ),
        _createToolButton(
          'Angle',
          'tool-angle',
          'Angle',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'Angle',
              },
              context: 'CORNERSTONE',
            },
      ],
          'Angle'
        ),
        _createToolButton(
          'CobbAngle',
          'tool-angle',
          'CobbAngle',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'CobbAngle',
    },
              context: 'CORNERSTONE',
  },
          ],
          'CobbAngle'
        ),
        // _createToolButton(
        //   'PlanarFreehandROI',
        //   'tool-freehand',
        //   'PlanarFreehandROI',
        //   [
        //     {
        //       commandName: 'setToolActive',
        //       commandOptions: {
        //         toolName: 'PlanarFreehandROI',
        //       },
        //       context: 'CORNERSTONE',
        //     },
        //   ],
        //   'PlanarFreehandROI'
        //   ),
        _createToolButton(
          'Rectangle',
          'tool-rectangle',
          'Rectangle',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'RectangleROI',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Rectangle'
        ),

      ],
    },
  },
  // Zoom..
  {
    id: 'Zoom',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-zoom',
      label: 'Zoom',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'Zoom',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Window Level + Presets...
  {
    id: 'WindowLevel',
    type: 'ohif.splitButton',
    props: {
      groupId: 'WindowLevel',
      primary: _createToolButton(
        'WindowLevel',
        'tool-window-level',
        'Window Level',
        [
          {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: 'WindowLevel',
            },
            context: 'CORNERSTONE',
          },
        ],
        'Window Level'
      ),
      secondary: {
        icon: 'chevron-down',
        label: 'W/L Manual',
        isActive: true,
        tooltip: 'W/L Presets',
      },
      isAction: true, // ?
      renderer: WindowLevelMenuItem,
      items: [
        _createWwwcPreset(1, 'Soft tissue', '400 / 40'),
        _createWwwcPreset(2, 'Lung', '1500 / -600'),
        _createWwwcPreset(3, 'Liver', '150 / 90'),
        _createWwwcPreset(4, 'Bone', '2500 / 480'),
        _createWwwcPreset(5, 'Brain', '80 / 40'),
      ],
    },
  },
  // Pan...
  {
    id: 'Pan',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-move',
      label: 'Pan',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'Pan',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'Capture',
    type: 'ohif.action',
    props: {
      icon: 'tool-capture',
      label: 'Capture',
      type: 'action',
      commands: [
        {
          commandName: 'showDownloadViewportModal',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },

  // ************ New Layout Section
  
    // Measurement
  {
    id: 'Layout',
      type: 'ohif.splitButton',
      props: {
        groupId: 'LayoutTools',
        isRadio: false,
        primary: {
          id: 'Layout',
          type: 'action',
          uiType: 'ohif.layoutSelector',
          icon: "tool-layout",
          label: "Grid Layout",
          props: {
            rows: 3,
            columns: 3,
            commands: [
              {
                commandName: 'setLayout',
                commandOptions: {},
                context: 'CORNERSTONE',
              },
            ],
          },
        },
        secondary: {
          icon: 'chevron-down',
          label: '',
          isActive: true,
          tooltip: 'Hanging Protocols',
        },
        items: [
          {
            id: '2x2',
            type: 'action',
            label: '2x2',
            commands: [
              {
                commandName: 'setHangingProtocol',
                commandOptions: {
                  protocolId: '@radicalimaging/hp-extension.mn',
                  stageId: '2x2',
                },
                context: 'DEFAULT',
              },
            ],
          },
          {
            id: '2x1',
            type: 'action',
            label: '2x1',
            commands: [
              {
                commandName: 'setHangingProtocol',
                commandOptions: {
                  protocolId: '@radicalimaging/hp-extension.mn',              
                  stageId: '2x1',
                },
                context: 'DEFAULT',
              },
            ],
          },
          {
            id: '1x1',
            type: 'action',
            label: '1x1',
            commands: [
              {
                commandName: 'setHangingProtocol',
                commandOptions: {
                  protocolId: '@radicalimaging/hp-extension.mn',              
                  stageId: '1x1',
                },
                context: 'DEFAULT',
              },
            ],
          },
        ],
      },
    },
  
  {
    id: 'MPR',
    type: 'ohif.action',
    props: {
      type: 'toggle',
      icon: 'icon-mpr',
      label: 'MPR',
      commands: [
        {
          commandName: 'toggleHangingProtocol',
          commandOptions: {
            protocolId: 'mpr',
          },
          context: 'DEFAULT',
        },      ],
    },
  },
  {
    id: 'Crosshairs',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-crosshair',
      label: 'Crosshairs',
      commands: [
        {
          commandOptions: {
            toolName: 'Crosshairs',
            toolGroupId: 'mpr',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // More...
  {
    id: 'MoreTools',
    type: 'ohif.splitButton',
    props: {
      isRadio: true, // ?
      groupId: 'MoreTools',
      primary: _createActionButton(
        'Reset',
        'tool-reset',
        'Reset View',
        [
          {
            commandName: 'resetViewport',
            commandOptions: {},
            context: 'CORNERSTONE',
          },
        ],
        'Reset'
      ),
      secondary: {
        icon: 'chevron-down',
        label: '',
        isActive: true,
        tooltip: 'More Tools',
      },
      items: [
        _createActionButton(
          'Reset',
          'tool-reset',
          'Reset View',
          [
            {
              commandName: 'resetViewport',
              commandOptions: {},
              context: 'CORNERSTONE',
            },
          ],
          'Reset'
        ),
        _createActionButton(
          'rotate-right',
          'tool-rotate-right',
          'Rotate Right',
          [
            {
              commandName: 'rotateViewportCW',
              commandOptions: {},
              context: 'CORNERSTONE',
            },
          ],
          'Rotate +90'
        ),
        _createActionButton(
          'flip-horizontal',
          'tool-flip-horizontal',
          'Flip Horizontally',
          [
            {
              commandName: 'flipViewportHorizontal',
              commandOptions: {},
              context: 'CORNERSTONE',
            },
          ],
          'Flip Horizontal'
        ),
        _createToggleButton('StackImageSync', 'link', 'Stack Image Sync', [
          {
            commandName: 'toggleStackImageSync',
            commandOptions: {},
            context: 'CORNERSTONE',
          },
        ]),
        _createToggleButton(
          'ReferenceLines',
          'tool-referenceLines', // change this with the new icon
          'Reference Lines',
          [
            {
              commandName: 'toggleReferenceLines',
              commandOptions: {},
              context: 'CORNERSTONE',
            },
          ]
        ),
        _createToolButton(
          'StackScroll',
          'tool-stack-scroll',
          'Stack Scroll',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'StackScroll',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Stack Scroll'
        ),
        _createActionButton(
          'invert',
          'tool-invert',
          'Invert',
          [
            {
              commandName: 'invertViewport',
              commandOptions: {},
              context: 'CORNERSTONE',
            },
          ],
          'Invert Colors'
        ),
        _createToolButton(
          'Probe',
          'tool-probe',
          'Probe',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'DragProbe',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Probe'
        ),
        _createToggleButton(
          'cine',
          'tool-cine',
          'Cine',
          [
            {
              commandName: 'toggleCine',
              context: 'CORNERSTONE',
            },
          ],
          'Cine'
        ),
        _createToolButton(
          'Magnify',
          'tool-magnify',
          'Magnify',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'Magnify',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Magnify'
        ),
        _createToolButton(
          'CalibrationLine',
          'tool-calibration',
          'Calibration',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'CalibrationLine',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Calibration Line'
        ),
        _createActionButton(
          'TagBrowser',
          'list-bullets',
          'Dicom Tag Browser',
          [
            {
              commandName: 'openDICOMTagViewer',
              commandOptions: {},
              context: 'DEFAULT',
            },
          ],
          'Dicom Tag Browser'
        ),
      ],
    },
  },
];

export default toolbarButtons;
