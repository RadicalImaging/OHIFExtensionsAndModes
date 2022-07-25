/**
 * Sets the viewport zoom/pan information on initial display.
 * 
 * @param id 
 * @param value 
 * @param viewport 
 */
const setViewportZoomPan = (id, value, viewport) => {
  const { zoom, pan, flipHorizontal, flipVertical } = value;
  const { imageCanvasPoint, initialDisplayArea } = value;

  const camera = viewport.getCamera();
  console.log("Camera=", JSON.stringify(camera));

  // Set the base values - assume height fits for now
  let initialZoom = 1;
  if (initialDisplayArea) {
    // TODO - use the correct calculation to actually fit things properly
    // such that both initialDisplayArea's fit
    initialZoom = 1 / Math.min(initialDisplayArea[0], initialDisplayArea[1]);
    viewport.setZoom(initialZoom, true);
  }

  const imageData = viewport.getImageData();

  if (imageCanvasPoint && imageData) {
    const canvas = viewport.getCanvas();
    const canvasX = imageCanvasPoint[2] ?? 0.5;
    const canvasY = imageCanvasPoint[3] ?? 0.5;
    const canvasPanX = canvas.width * (canvasX - 0.5);
    const canvasPanY = canvas.height * (canvasY - 0.5);
   
    const canvasZero = viewport.worldToCanvas([0,0,0]);
    const canvasEdge = viewport.worldToCanvas(imageData.dimensions);
    const canvasImage = [canvasEdge[0]-canvasZero[0], canvasEdge[1]-canvasZero[1]];
    const [imgWidth,imgHeight] = canvasImage;
    const imagePanX = imgWidth * (0.5-imageCanvasPoint[0]);
    const imagePanY = imgHeight  * (0.5-imageCanvasPoint[1]);
    viewport.setPan([imagePanX+canvasPanX,imagePanY+canvasPanY],true);
  }

  if (flipHorizontal || flipVertical) {
    viewport.flip(value);
  }

  // Now set the sync value offsets
  if (zoom && zoom !== 1) viewport.setZoom(zoom);
  if (pan) {
    console.log("Setting pan to", JSON.stringify(pan));
    viewport.setPan(pan);
  }
}

/** Stores the viewport zoom/pan information, when a viewport goes away (to be restored later) */
const storeViewportZoomPan = (settings, priorSettings, viewport) => {
  if (!priorSettings || !viewport) return;
  console.log("Storing viewport zoom pan for reset");
  settings.customViewportOptions = {
    zoomPan: {
      ...priorSettings.customViewportOptions?.zoomPan,
      ...settings.customViewportOptions?.zoomPan,
      pan: viewport.getPan(),
      zoom: viewport.getZoom(),
    },
  };
  settings.imageCanvasPoint = settings.imageCanvasPoint ?? priorSettings.imageCanvasPoint;
  settings.syncGroups = settings.syncGroups ?? priorSettings.syncGroups;
  console.log("Updated settings", settings);
}

export { storeViewportZoomPan, setViewportZoomPan };