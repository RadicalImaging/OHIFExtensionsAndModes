import { Synchronizer } from '@cornerstonejs/tools';
import { Types, getRenderingEngine } from '@cornerstonejs/core';

export default function initialPanZoomCallback(
  synchronizerInstance: Synchronizer,
  sourceViewport: Types.IViewportId
): void {
  const renderingEngine = getRenderingEngine(sourceViewport.renderingEngineId);
  if (!renderingEngine) {
    throw new Error(
      `No RenderingEngine for Id: ${sourceViewport.renderingEngineId}`
    );
  }

  const { viewportId } = sourceViewport;
  const options = synchronizerInstance.getOptions(viewportId);
  if (!options) {
    return;
  }

  try {
    options.isInitialSet = true;
    const sViewport = renderingEngine.getViewport(viewportId);

    const imageData = sViewport.getImageData();
    const { dimensions } = imageData;

    const { pan = [0, 0], zoom: previousZoom = 1 } = options;
    const { initialDisplayArea = [1, 1], imageCanvasPoint = [0.5, 0.5] } = options;
    const [areaX, areaY] = initialDisplayArea
    const currentZoom = sViewport.getZoom();
    const zoom = Math.min(currentZoom / areaX, currentZoom / areaY);
    const actualZoom = previousZoom * zoom;
    options.initialZoom = zoom;

    const canvas = sViewport.getCanvas();
    const zeroCanvas = sViewport.worldToCanvas([0, 0, 0]);
    const dimensionsCanvas = sViewport.worldToCanvas(dimensions);

    const [imageX, imageY, screenX = 0.5, screenY = 0.5] = imageCanvasPoint;
    // The initial location isn't quite centered or sized correctly, so correction
    // factors for this - need to do a real inverse on that sometime.
    const screenWidth = canvas.clientWidth * 1.055;
    const screenHeight = canvas.clientHeight / 1.1;
    const imageHeight = dimensionsCanvas[0] - zeroCanvas[0];
    const imageWidth = dimensionsCanvas[1] - zeroCanvas[1];
    const panX = (screenX - 0.5) * screenWidth + (0.5 - imageX) * imageWidth;
    const panY = (screenY - 0.5) * screenHeight + (0.5 - imageY) * imageHeight;
    sViewport.setZoom(actualZoom);
    if (isFinite(panX) && isFinite(panY)) {
      sViewport.setPan([panX + pan[0], panY + pan[1]]);
      options.initialPan = [panX, panY];
    } else {
      delete options.initialPan;
      sViewport.setPan(pan);
    }

    // These are non-default initial values here, so don't pass true to reset
    // Values have been checked before assigning, so safe to just assign here.
    options.isInitialSet = false;
  } catch (reason) {
    console.log("Unable to set initial pan/zoom due to", reason);
    // Let isInitialSet be true still, to avoid an extraneous store
  }
}

export function storeCurrentZoomPan(synchronizerInstance: Synchronizer, viewportInfo: Types.IViewportId) {
  const renderingEngine = getRenderingEngine(viewportInfo.renderingEngineId);
  if (!renderingEngine) {
    throw new Error(
      `No RenderingEngine for Id: ${viewportInfo.renderingEngineId}`
    );
  }

  const { viewportId } = viewportInfo;
  const options = synchronizerInstance.getOptions(viewportId);
  if (!options) return;
  if (options.isInitialSet !== false) {
    console.log("Trying extra initial pan zoom");
    initialPanZoomCallback(synchronizerInstance, viewportInfo);
    return;
  }

  try {
    const sViewport = renderingEngine.getViewport(viewportId);
    const pan = sViewport.getPan();
    if (pan && isFinite(pan[0]) && isFinite(pan[1])) {
      const { initialPan = [0, 0] } = options;
      options.pan = [pan[0] - initialPan[0], pan[1] - initialPan[1]];
      options.zoom = sViewport.getZoom() / (options.initialZoom || 1.1);
    } else {
      console.log("* not storing pan/zoom", pan, sViewport.getZoom());
    }
  } catch (e) {
    console.log("Couldn't store zoom/pan", e);
  }
}
