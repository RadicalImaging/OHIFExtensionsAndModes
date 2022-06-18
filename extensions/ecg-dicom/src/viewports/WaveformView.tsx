import React from "react";
import EcgTrace from "./EcgTrace";

const WaveformView = (props) => {
  const { channelDefinition = {}, max, scale } = props;

  const { ChannelSourceSequence = {} } = channelDefinition;
  // Values about -2500 ... 2500 fitting into itemHeight (-150..150 currently)
  const subProps = { ...props };
  const textY = -max*scale;
  const text = ChannelSourceSequence.CodeMeaning;
  return (
    <>
      <rect x="0" y={textY-15} width={`${text.length*0.5}em`} height="20" fill="black" />
      <text stroke="none" fill="yellow" x="5" y={textY}>{text}</text>
      {EcgTrace(subProps)}
    </>
  )
}

export default WaveformView;
