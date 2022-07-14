export default (id,value,viewport,properties) => {
  const {zoom,pan} = value;
  console.log("Setting zoom on", viewport, zoom, properties);
  viewport.setZoom(zoom);
  viewport.setCanvasPan(pan);
}