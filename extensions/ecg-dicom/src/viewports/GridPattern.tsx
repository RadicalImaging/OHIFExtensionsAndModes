import React from "react";

const GridPattern = (props) => {
  const { secondsWidth, pxHeight, pxWidth, scale, baseline = 0 } = props;

  const path = [];
  const smallPath = [];
  const vPath = [];

  const lineHeight = 100 * scale;
  const hLines = Math.floor(pxHeight / lineHeight);
  const vLines = 1 + Math.floor(5 * (1 + pxWidth) / secondsWidth);

  for (let h = 0; h < hLines; h++) {
    const dest = (h % 5) ? smallPath : path;
    dest.push(`M 0 ${baseline*scale + h * lineHeight} l ${pxWidth} 0`)
  }

  const dxSmall = secondsWidth / 25;

  for (let v = 0; v < vLines; v++) {
    const x = v * secondsWidth / 5;
    vPath.push(`M ${x} ${baseline} l 0 ${pxHeight}`)
    for (let vFifth = 1; vFifth < 5; vFifth++) {
      smallPath.push(`M${x + vFifth * dxSmall} ${baseline} l 0 ${pxHeight}`);
    }
  }

  return (
    <>
      <path d={`M 0 ${baseline} l ${pxWidth} 0`} strokeWidth="4" stroke="#7F4C00" />
      <path d={path.join()} stroke="#7f0000" strokeWidth="1" fill="none" />
      <path d={vPath.join()} stroke="#7f0000" strokeWidth="1" fill="none" />
      <path d={smallPath.join()} stroke="#3f0000" strokeWidth="1" fill="none" />
    </>
  );
}

export default GridPattern;
