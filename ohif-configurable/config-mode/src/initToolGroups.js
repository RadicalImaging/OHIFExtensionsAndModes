const colours = {
  'viewport-0': 'rgb(200, 0, 0)',
  'viewport-1': 'rgb(200, 200, 0)',
  'viewport-2': 'rgb(0, 200, 0)',
};

const colorsByOrientation = {
  axial: 'rgb(200, 0, 0)',
  sagittal: 'rgb(200, 200, 0)',
  coronal: 'rgb(0, 200, 0)',
};

function initDefaultToolGroup(
  extensionManager,
  toolGroupService,
  commandsManager,
  toolGroupId,
  modeLabelConfig
) {
  const utilityModule = extensionManager.getModuleEntry(
    '@ohif/extension-cornerstone.utilityModule.tools'
  );

  const SRUtilityModule = extensionManager.getModuleEntry(
    '@ohif/extension-cornerstone-dicom-sr.utilityModule.tools'
  );

  const { toolNames, Enums } = utilityModule.exports;
  const { toolNames: SRToolNames } = SRUtilityModule.exports;

  const tools = {
    active: [
      {
        toolName: toolNames.WindowLevel,
        bindings: [
          { mouseButton: Enums.MouseBindings.Primary },
          {
            mouseButton: Enums.MouseBindings.Primary,
            modifierKey: Enums.KeyboardBindings.Meta,
          },
        ],
      },
      {
        toolName: toolNames.Pan,
        bindings: [
          { mouseButton: Enums.MouseBindings.Auxiliary },
          {
            mouseButton: Enums.MouseBindings.Primary,
            modifierKey: Enums.KeyboardBindings.Ctrl,
          },
        ],
      },
      {
        toolName: toolNames.Zoom,
        bindings: [
          { mouseButton: Enums.MouseBindings.Secondary },
          {
            mouseButton: Enums.MouseBindings.Primary,
            modifierKey: Enums.KeyboardBindings.Shift,
          },
          { numTouchPoints: 2 },
        ],
      },
      {
        toolName: toolNames.StackScroll,
        bindings: [
          { mouseButton: Enums.MouseBindings.Wheel },
          { numTouchPoints: 3 },
          {
            mouseButton: Enums.MouseBindings.Primary,
            modifierKey: Enums.KeyboardBindings.Alt,
          },
        ],
      },
    ],
    passive: [
      { toolName: toolNames.Length },
      {
        toolName: toolNames.ArrowAnnotate,
        configuration: {
          getTextCallback: (callback, eventDetails) => {
            if (modeLabelConfig) {
              callback(' ');
            } else {
              commandsManager.runCommand('arrowTextCallback', {
                callback,
                eventDetails,
              });
            }
          },
          changeTextCallback: (data, eventDetails, callback) => {
            if (modeLabelConfig === undefined) {
              commandsManager.runCommand('arrowTextCallback', {
                callback,
                data,
                eventDetails,
              });
            }
          },
        },
      },
      { toolName: toolNames.Bidirectional },
      { toolName: toolNames.DragProbe },
      { toolName: toolNames.Probe },
      { toolName: toolNames.EllipticalROI },
      { toolName: toolNames.CircleROI },
      { toolName: toolNames.RectangleROI },
      { toolName: toolNames.StackScroll },
      { toolName: toolNames.Angle },
      { toolName: toolNames.CobbAngle },
      { toolName: toolNames.Magnify },
      { toolName: toolNames.CalibrationLine },
      {
        toolName: toolNames.PlanarFreehandContourSegmentation,
        configuration: {
          displayOnePointAsCrosshairs: true,
        },
      },
      { toolName: toolNames.UltrasoundDirectional },
      { toolName: toolNames.PlanarFreehandROI },
      { toolName: toolNames.SplineROI },
      { toolName: toolNames.LivewireContour },
      { toolName: toolNames.WindowLevelRegion },
    ],
    enabled: [
      { toolName: toolNames.ImageOverlayViewer },
      { toolName: toolNames.ReferenceLines },
      {
        toolName: SRToolNames.SRSCOORD3DPoint,
      },
    ],
    disabled: [
      {
        toolName: toolNames.AdvancedMagnify,
      },
    ],
  };

  toolGroupService.createToolGroupAndAddTools(toolGroupId, tools);
}

function initSRToolGroup(extensionManager, servicesManager, commandsManager) {
  const { toolGroupService } = servicesManager.services;
  const SRUtilityModule = extensionManager.getModuleEntry(
    '@ohif/extension-cornerstone-dicom-sr.utilityModule.tools'
  );

  const CS3DUtilityModule = extensionManager.getModuleEntry(
    '@ohif/extension-cornerstone.utilityModule.tools'
  );

  const { toolNames: SRToolNames } = SRUtilityModule.exports;
  const { toolNames, Enums } = CS3DUtilityModule.exports;
  const tools = {
    active: [
      {
        toolName: toolNames.WindowLevel,
        bindings: [
          {
            mouseButton: Enums.MouseBindings.Primary,
          },
        ],
      },
      {
        toolName: toolNames.Pan,
        bindings: [
          {
            mouseButton: Enums.MouseBindings.Auxiliary,
          },
        ],
      },
      {
        toolName: toolNames.Zoom,
        bindings: [
          {
            mouseButton: Enums.MouseBindings.Secondary,
          },
        ],
      },
      {
        toolName: toolNames.StackScrollMouseWheel,
        bindings: [],
      },
    ],
    passive: [
      { toolName: SRToolNames.SRLength },
      { toolName: SRToolNames.SRArrowAnnotate },
      { toolName: SRToolNames.SRBidirectional },
      { toolName: SRToolNames.SREllipticalROI },
    ],
    enabled: [
      {
        toolName: SRToolNames.DICOMSRDisplay,
        bindings: [],
      },
      { toolName: toolNames.SegmentationDisplay },
    ],

    // disabled
  };

  const toolsConfig = {
    [toolNames.ArrowAnnotate]: {
      getTextCallback: (callback, eventDetails) =>
        commandsManager.runCommand('arrowTextCallback', {
          callback,
          eventDetails,
        }),

      changeTextCallback: (data, eventDetails, callback) =>
        commandsManager.runCommand('arrowTextCallback', {
          callback,
          data,
          eventDetails,
        }),
    },
  };

  const toolGroupId = 'SRToolGroup';
  toolGroupService.createToolGroupAndAddTools(toolGroupId, tools, toolsConfig);
}

function initMPRToolGroup(extensionManager, servicesManager, commandsManager) {
  const { toolGroupService, cornerstoneViewportService } =
    servicesManager.services;
  const utilityModule = extensionManager.getModuleEntry(
    '@ohif/extension-cornerstone.utilityModule.tools'
  );

  const { toolNames, Enums } = utilityModule.exports;

  const tools = {
    active: [
      {
        toolName: toolNames.WindowLevel,
        bindings: [{ mouseButton: Enums.MouseBindings.Primary }],
      },
      {
        toolName: toolNames.Pan,
        bindings: [{ mouseButton: Enums.MouseBindings.Auxiliary }],
      },
      {
        toolName: toolNames.Zoom,
        bindings: [{ mouseButton: Enums.MouseBindings.Secondary }],
      },
      { toolName: toolNames.StackScrollMouseWheel, bindings: [] },
    ],
    passive: [
      { toolName: toolNames.Length },
      { toolName: toolNames.ArrowAnnotate },
      { toolName: toolNames.Bidirectional },
      { toolName: toolNames.DragProbe },
      { toolName: toolNames.EllipticalROI },
      { toolName: toolNames.RectangleROI },
      { toolName: toolNames.StackScroll },
      { toolName: toolNames.Angle },
      { toolName: toolNames.CobbAngle },
      { toolName: toolNames.PlanarFreehandROI },
      { toolName: toolNames.SegmentationDisplay },
      { toolName: toolNames.CalibrationLine },
    ],
    disabled: [{ toolName: toolNames.Crosshairs }],
    enabled: [{ toolName: toolNames.SegmentationDisplay }],

    // enabled
    // disabled
  };

  const toolsConfig = {
    [toolNames.Crosshairs]: {
      viewportIndicators: true,
      autoPan: {
        enabled: false,
        panSize: 10,
      },
      getReferenceLineColor: (viewportId) => {
        const viewportInfo =
          cornerstoneViewportService.getViewportInfo(viewportId);
        const viewportOptions = viewportInfo?.viewportOptions;
        if (viewportOptions) {
          return (
            colours[viewportOptions.id] ||
            colorsByOrientation[viewportOptions.orientation] ||
            '#0c0'
          );
        } else {
          console.warn('missing viewport?', viewportId);
          return '#0c0';
        }
      },
    },
    [toolNames.ArrowAnnotate]: {
      getTextCallback: (callback, eventDetails) =>
        commandsManager.runCommand('arrowTextCallback', {
          callback,
          eventDetails,
        }),

      changeTextCallback: (data, eventDetails, callback) =>
        commandsManager.runCommand('arrowTextCallback', {
          callback,
          data,
          eventDetails,
        }),
    },
  };

  toolGroupService.createToolGroupAndAddTools('mpr', tools, toolsConfig);
}

function initToolGroups(extensionManager, servicesManager, commandsManager) {
  initDefaultToolGroup(
    extensionManager,
    servicesManager,
    commandsManager,
    'default'
  );
  initSRToolGroup(extensionManager, servicesManager, commandsManager);
  initMPRToolGroup(extensionManager, servicesManager, commandsManager);
}

export default initToolGroups;
