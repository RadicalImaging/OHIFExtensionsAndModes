import React, { useCallback, useContext, useEffect, useState } from 'react';
import multipartDecode from '../multipartDecode';
import WaveformView from './WaveformView';
import GridPattern from './GridPattern';

const convertBuffer = (dataSrc, numberOfChannels, numberOfSamples, bits, type) => {
  const ret = [];
  const data = new Uint8Array(dataSrc);
  const length = data.byteLength || data.length;
  console.log('data size', length, numberOfChannels, numberOfSamples);
  const expectedLength = (bits == 8 ? 1 : 2) * numberOfChannels * numberOfSamples;
  if (length != expectedLength) {
    console.warn("Data length is too short", data, length, expectedLength);
  }
  if (bits == 16) {
    if (type == "SS") {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const buffer = new Int16Array(numberOfSamples);
        ret.push(buffer);
        let sampleI = 0;
        for (let sample = 2 * channel; sample < length; sample += (2 * numberOfChannels)) {
          const sample0 = data[sample + 1];
          const sample1 = data[sample];
          const sign = sample0 & 0x80;
          buffer[sampleI++] = sign && (0xFFFF0000 | (sample0 << 8) | sample1) || ((sample0 << 8) | sample1);
          // buffer[sampleI++] = sample1 << 8 | sample0;
        }
      }
    } else {
      throw new Error(`Unsupported type ${type}`)
    }
  } else {
    throw new Error(`Unsupported bits ${bits}`);
  }
  return ret;
}

const str2ab = str => Uint8Array.from(atob(str), c => c.charCodeAt(0));

const getChannelData = async (data, numberOfChannels, numberOfSamples, bits, type, studyUID) => {
  if (data.Value) return data.Value;
  if (data.InlineBinary) {
    data.Value = convertBuffer(str2ab(data.InlineBinary), numberOfChannels, numberOfSamples, bits, type);
    return data.Value;
  }
  if (data.retrieveBulkData) {
    const bulkdata = await data.retrieveBulkData();
    console.log('bulkdata=', bulkdata);
    data.Value = convertBuffer(bulkdata, numberOfChannels, numberOfSamples, bits, type);
    return data.Value;
  }
  let {BulkDataURI: url} = data;
  if (url) {
    // older OHIF without retrieveBulkdata functionality
    if( url.indexOf(':')===-1 ) {
      url = `${window.config.dataSources[0].configuration.qidoRoot}/studies/${studyUID}/${url}`;
    }
    console.log("Retrieving", url);

    return new Promise( (resolve,reject) => {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'arraybuffer';
      xhr.open('GET', url);
      xhr.onload = function () {
        const decoded = multipartDecode(xhr.response)[0];
        data.Value = convertBuffer(decoded,numberOfChannels, numberOfSamples, bits, type);
        resolve(data.Value);
      };
      xhr.onerror = function () {
        reject(xhr.response);
      };
      xhr.send();
    });
  }
  console.log("Can't convert waveform", data);
  return [];
}


function EcgViewport(props) {
  const { displaySets } = props;
  const { instances } = displaySets[0];
  const [channelData, setChannelData] = useState([]);

  if (!instances?.length) {
    return (<span className="text-red-700">No ECG in display set</span>)
  }

  const waveform = instances[0].WaveformSequence[0];
  const {StudyInstanceUID: studyUID} = instances[0];

  if (!waveform) {
    return (
      <span className="text-red-700">Waveform data not found</span>
    )
  }

  const {
    MultiplexGroupLabel, WaveformSampleInterpretation,
    NumberOfWaveformChannels, NumberOfWaveformSamples,
    SamplingFrequency, WaveformData, WaveformBitsAllocated,
    ChannelDefinitionSequence = [],
  } = waveform;

  const secondsWidth = 150;
  const defaultItemHeight = 250;
  const pxWidth = Math.ceil(NumberOfWaveformSamples * secondsWidth / SamplingFrequency);
  const extraHeight = 5;

  useEffect(() => {
    getChannelData(WaveformData, NumberOfWaveformChannels, NumberOfWaveformSamples, WaveformBitsAllocated, WaveformSampleInterpretation,studyUID).then(res => {
      setChannelData(res);
    })
  }, [WaveformData])

  const groups = [];
  const scaleRange = 4000;
  const scale = defaultItemHeight / scaleRange;

  const subProps = {...props, scale, scaleRange, secondsWidth, defaultItemHeight, pxWidth, extraHeight};
  
  let pxHeight = 0;
  for (let i = 0; i < NumberOfWaveformChannels; i++) {
    const data = channelData[i];
    if( !data ) continue;
    const min = data.reduce( (prev, curr) => Math.min(prev,curr), 0);
    const max = data.reduce( (prev, curr) => Math.max(prev,curr), 0);;
    const itemHeight = (max-min)*scale*1.25;
    pxHeight += itemHeight + extraHeight;
    console.log("translate", pxHeight+min*scale, "pxHeight", pxHeight);
    groups.push(
        <g key={i} transform={`translate(0,${pxHeight + min*scale})`}>
        {WaveformView({
          secondsWidth, itemHeight, pxWidth,
          data, scale, min, max,
          channelDefinition: ChannelDefinitionSequence[i],
        })}
      </g>
    );
  }

  subProps.pxHeight = pxHeight;
  
  // Need to copies of the source to fix a firefox bug
  return (
    <div className="bg-primary-black w-full h-full overflow-hidden ohif-scrollbar">
      <span className="text-white">ECG {MultiplexGroupLabel}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={pxWidth}
        height={pxHeight}
        viewBox={`0 0 ${pxWidth} ${pxHeight}`}
      >
        <title>ECG</title>
        {GridPattern(subProps)}
        {groups}
      </svg>
    </div>
  )
}

export default EcgViewport;
