export default (id,value,viewport) => {
  const {zoom,pan, flipHorizontal, flipVertical} = value;
  if( zoom && zoom!==1 ) viewport.setZoom(zoom);
  if( pan ) viewport.setPan(pan);
  if( flipHorizontal || flipVertical ) {
    viewport.flip(value);
  }
}