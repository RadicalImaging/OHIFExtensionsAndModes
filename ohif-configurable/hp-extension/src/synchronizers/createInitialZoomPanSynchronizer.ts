import { Enums, eventTarget } from '@cornerstonejs/core';
import syncCallback, { storeCurrentZoomPan } from './initialZoomPanCallback';
import createSingleViewportSynchronizer from './createSingleViewportSynchronizer';

/**
 * A helper that creates a new `Synchronizer` which listens to the `STACK_NEW_IMAGE`
 * rendering event and calls the `initialZoomPanCallback`.
 *
 * @param synchronizerName - The name of the synchronizer.
 * @returns A new `Synchronizer` instance.
 */
export default function createSynchronizer(
  synchronizerName: string,
) {
  console.log("createSynchronizer");
  const synchronizer = createSingleViewportSynchronizer(
    synchronizerName,
    Enums.Events.STACK_NEW_IMAGE,
    syncCallback,
  );
  synchronizer.addEvent(Enums.Events.STACK_VIEWPORT_NEW_STACK, syncCallback)
  synchronizer.addEvent(Enums.Events.ELEMENT_DISABLED, storeCurrentZoomPan)

  return synchronizer;
}
