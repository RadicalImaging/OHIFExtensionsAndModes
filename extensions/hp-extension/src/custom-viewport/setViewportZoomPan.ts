/**
 * Sets the viewport zoom/pan information on initial display.
 * 
 * @param id 
 * @param value 
 * @param viewport 
 */
const setViewportZoomPan = (id,value,viewport) => {
  const {zoom,pan, flipHorizontal, flipVertical} = value;
  if( zoom && zoom!==1 ) viewport.setZoom(zoom);
  if( pan ) viewport.setPan(pan);
  if( flipHorizontal || flipVertical ) {
    viewport.flip(value);
  }
}

/** Stores the viewport zoom/pan information, when a viewport goes away (to be restored later) */
const storeViewportZoomPan = (settings, priorSettings, viewport) => {
  if( !priorSettings || !viewport ) return;
  settings.customViewportOptions = { 
    ...priorSettings.customViewportOptions,
    ...settings.customViewportOptions,
    zoomPan: {
      pan: viewport.getPan(),
      zoom: viewport.getZoom(),
    },
  };
  settings.initialCenter = settings.initialCenter ?? priorSettings.initialCenter;
  settings.canvasCenter = settings.canvasCenter ?? priorSettings.canvasCenter;
  settings.initialRange = settings.initialRange ?? priorSettings.initialRange;
  settings.displaySetGroup = settings.displaySetGroup ?? priorSettings.displaySetGroup;
}

export {storeViewportZoomPan, setViewportZoomPan};