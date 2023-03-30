const commandsModule = ({ servicesManager }) => {
  const {
    displaySetService,
    viewportGridService,
    hangingProtocolService,
  } = servicesManager.services;

  const actions = {

    updateViewportDisplaySet: ({ direction, circular }) => {
      const {
        activeViewportIndex,
        viewports = [],
      } = viewportGridService.getState();

      const viewport = viewports[activeViewportIndex];
      const activeDisplaySetInstanceUIDs = (viewport || {})
        .displaySetInstanceUIDs;

      if (!activeDisplaySetInstanceUIDs) {
        throw Error(
          'Mismatching on ViewportGridService where there is no valid displaySetInstanceUid for activeViewportIndex'
        );
      }
      
      const activeDisplaySets = displaySetService.getActiveDisplaySets();
      const displaySetGroup = viewport.viewportOptions?.displaySetGroup;
      const matchDetails = hangingProtocolService.getDisplaySetsMatchDetails().get(displaySetGroup)
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
      viewportGridService.setDisplaySetsForViewport({
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
  };

  return {
    actions,
    definitions,
    defaultContext: 'DEFAULT',
  };
};

export default commandsModule;
