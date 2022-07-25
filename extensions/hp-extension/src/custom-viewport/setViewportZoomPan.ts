/**
 * Sets the viewport zoom/pan information on initial display.
 * 
 * @param id 
 * @param value 
 * @param viewport 
 */
const setViewportZoomPan = (id,value,viewport) => {
  const {zoom,pan, flipHorizontal, flipVertical} = value;
  const {imageCanvasPoint,initialDisplayArea} = value;
  if( flipHorizontal || flipVertical ) {
    viewport.flip(value);
  }

  const camera = viewport.getCamera();
  console.log("Camera=", JSON.stringify(camera));

  // if (widthWorld && heightWorld) {
  //   const camera = this.getCamera();
  //   const activeCamera = this.getVtkActiveCamera();
  //   const { viewPlaneNormal, focalPoint, position, viewUp } = camera;
  //   const distanceVec = vec3.subtract(vec3.create(), position, focalPoint);

  //   const { imageCanvasPoint = [0.5, 0.5] } = this.options;
  //   if (imageCanvasPoint.length == 2) {
  //     imageCanvasPoint.push(0.5, 0.5);
  //   }
  //   if (!focalPoint || focalPoint[0] === null) return;

  //   // The focal point is currently the center of the image
  //   // It needs to be adjusted by the sum of:
  //   // vector between the two imageCanvasPoint values.
  //   if (imageCanvasPoint[0] !== 0.5) {
  //     const delta = 0.5 - imageCanvasPoint[0];
  //     const viewRight = vec3.create();
  //     vec3.cross(viewRight, viewPlaneNormal, viewUp);
  //     vec3.scaleAndAdd(focalPoint, focalPoint, viewRight, delta * widthWorld);
  //   }
  //   if (imageCanvasPoint[1] !== 0.5) {
  //     const delta = 0.5 - imageCanvasPoint[1];
  //     const viewUp = activeCamera.getViewUp() as Point3;
  //     vec3.scaleAndAdd(focalPoint, focalPoint, viewUp, delta * heightWorld);
  //   }
  //   const topLeft = this.canvasToWorld([0, 0]);
  //   if (imageCanvasPoint[2] !== 0.5) {
  //     const delta = 0.5 - imageCanvasPoint[2];
  //     const right = this.canvasToWorld([this.sWidth, 0]);
  //     const vector = vec3.subtract(vec3.create(), right, topLeft);
  //     vec3.scaleAndAdd(focalPoint, focalPoint, vector, delta);
  //   }
  //   if (imageCanvasPoint[3] !== 0.5) {
  //     const delta = 0.5 - imageCanvasPoint[3];
  //     const bottom = this.canvasToWorld([0, this.sHeight]);
  //     const vector = vec3.subtract(vec3.create(), bottom, topLeft);
  //     vec3.scaleAndAdd(focalPoint, focalPoint, vector, delta);
  //   }
  //   activeCamera.setFocalPoint(focalPoint[0], focalPoint[1], focalPoint[2]);
  //   activeCamera.setPosition(
  //     focalPoint[0] + distanceVec[0],
  //     focalPoint[1] + distanceVec[1],
  //     focalPoint[2] + distanceVec[2]
  //   );
  // }
  if( zoom && zoom!==1 ) viewport.setZoom(zoom);
  if( pan ) {
    console.log("Setting pan to", JSON.stringify(pan));
    viewport.setPan(pan);
  }
}

/** Stores the viewport zoom/pan information, when a viewport goes away (to be restored later) */
const storeViewportZoomPan = (settings, priorSettings, viewport) => {
  if( !priorSettings || !viewport ) return;
  console.log("Storing viewport zoom pan for reset");
  settings.customViewportOptions = { 
    ...priorSettings.customViewportOptions,
    ...settings.customViewportOptions,
    zoomPan: {
      pan: viewport.getPan(),
      zoom: viewport.getZoom(),
    },
  };
  settings.imageCanvasPoint = settings.imageCanvasPoint ?? priorSettings.imageCanvasPoint;
  settings.initialDisplayArea = settings.initialDisplayArea ?? priorSettings.initialDisplayArea;
  settings.displaySetGroup = settings.displaySetGroup ?? priorSettings.displaySetGroup;
  settings.syncGroups = settings.syncGroups ?? priorSettings.syncGroups;
  console.log("Updated settings", settings);
}

export {storeViewportZoomPan, setViewportZoomPan};