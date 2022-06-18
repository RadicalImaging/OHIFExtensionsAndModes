import React from "react";

const EcgTrace = (props) => {
  const { data, pxWidth, scale } = props;
  if (!data) {
    return null;
  }

  const trace = [`M0 0`];
  for (let i = 0; i < data.length; i++) {
    const x = i * pxWidth / data.length;
    const y = - data[i];
    trace.push(`L${x} ${scale * y}`)
  }
  return <path d={trace.join()} stroke="white" fill="none" />;
}

export default EcgTrace;
