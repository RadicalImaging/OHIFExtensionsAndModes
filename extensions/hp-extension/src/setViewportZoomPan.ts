export default (id,value,viewport) => {
  const {zoom,pan} = value;
  viewport.setZoom(zoom);
  viewport.setCanvasPan(pan);
}