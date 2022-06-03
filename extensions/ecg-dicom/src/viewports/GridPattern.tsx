import React from "react";

const GridPattern = (props) => {
  const { secondsWidth, itemHeight, pxWidth, scale } = props;

  const path = [];
  const smallPath = [];

  const height = itemHeight / 2;
  const lineHeight = 100 * scale;
  const hLines = Math.floor(height / lineHeight);
  const vLines = 1 + Math.floor(5 * (1 + pxWidth) / secondsWidth);

  for (let h = 1; h < hLines; h++) {
    const dest = (h % 5) ? smallPath : path;
    dest.push(`M 0 ${h * lineHeight} l ${pxWidth} 0`)
    dest.push(`M 0 ${-h * lineHeight} l ${pxWidth} 0`)
  }

  const dxSmall = secondsWidth / 25;

  for (let v = 0; v < vLines; v++) {
    const x = v * secondsWidth / 5;
    path.push(`M ${x} ${-height} l 0 ${itemHeight}`)
    for (let vFifth = 1; vFifth < 5; vFifth++) {
      smallPath.push(`M${x + vFifth * dxSmall} ${-height} l 0 ${itemHeight}`);
    }
  }

  return (
    <>
      <path d={`M 0 0 l ${pxWidth} 0`} strokeWidth="2" stroke="#7F4C00" />
      <path d={path.join()} stroke="#7f0000" strokeWidth="1" fill="none" />
      <path d={smallPath.join()} stroke="#3f0000" strokeWidth="1" fill="none" />
    </>
  );
}

export default GridPattern;
