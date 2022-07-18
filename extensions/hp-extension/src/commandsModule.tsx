const commandsModule = ({ servicesManager, commandsManager }) => {
  const {
    DisplaySetService,
    ViewportGridService,
    HangingProtocolService,
  } = servicesManager.services;

  const actions = {
    nextStage: () => {
      // next stage in hanging protocols
      HangingProtocolService.nextProtocolStage();
    },
    previousStage: () => {
      HangingProtocolService.previousProtocolStage();
    },

    updateViewportDisplaySet: ({ direction, circular, sortSource }) => {
      const {
        activeViewportIndex,
        viewports = [],
      } = ViewportGridService.getState();

      const viewport = viewports[activeViewportIndex];
      const activeDisplaySetInstanceUIDs = (viewport || {})
        .displaySetInstanceUIDs;

      if (!activeDisplaySetInstanceUIDs) {
        throw Error(
          'Mismatching on ViewportGridService where there is no valid displaySetInstanceUid for activeViewportIndex'
        );
      }
      
      const activeDisplaySets = DisplaySetService.getActiveDisplaySets();
      const displaySetGroup = viewport.viewportOptions?.displaySetGroup;
      const matchDetails = HangingProtocolService.getDisplaySetsMatchDetails().get(displaySetGroup)
      const matchingScores = matchDetails?.matchingScores;
      const displaySets = matchingScores || activeDisplaySets;
      const activeDisplaySetIndex = displaySets.findIndex(
        displaySet => activeDisplaySetInstanceUIDs.includes(displaySet.displaySetInstanceUID)
      );

      if (activeDisplaySetIndex === -1) {
        throw Error(
          'Mismatching on ViewportGridService where there is no valid displaySetInstanceUid for activeViewportIndex'
        );
      }

      const len = displaySets.length;
      const boundary = direction > 0 ? len - 1 : 0;

      // prevent circular update
      if (!circular && activeDisplaySetIndex === boundary) {
        return;
      }

      let indexToUpdate = (activeDisplaySetIndex + direction + len) % len;

      const displaySetInstanceUID =
        displaySets[indexToUpdate].displaySetInstanceUID;

      const viewportIndex = activeViewportIndex;
      ViewportGridService.setDisplaySetsForViewport({
        viewportIndex,
        displaySetInstanceUIDs: [displaySetInstanceUID],
      });
    },
  };

  const definitions = {
    incrementActiveViewport: {
      commandFn: actions.updateViewportDisplaySet,
      storeContexts: [],
      options: { direction: 1, circular: false },
    },
    decrementActiveViewport: {
      commandFn: actions.updateViewportDisplaySet,
      storeContexts: [],
      options: { direction: -1, circular: false },
    },
    nextStage: {
      commandFn: actions.nextStage,
      storeContexts: [],
      options: {},
    },
    previousStage: {
      commandFn: actions.previousStage,
      storeContexts: [],
      options: {},
    },
  };

  return {
    actions,
    definitions,
    defaultContext: 'DEFAULT',
  };
};

export default commandsModule;
