export default function initialScaling(id,scaleFactor,viewport) {
  console.log("Setting initial scaling on", viewport, scaleFactor);
  const { parallelScale } = viewport.getCamera();
  viewport.setCamera({ parallelScale: parallelScale / scaleFactor });
  viewport.render();
}