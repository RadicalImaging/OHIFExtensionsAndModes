function buildInstanceWadoRsUri(instance, config) {
  const { StudyInstanceUID, SeriesInstanceUID, SOPInstanceUID } = instance;
  return `${config.wadoRoot}/studies/${StudyInstanceUID}/series/${SeriesInstanceUID}/instances/${SOPInstanceUID}`;
}

/**
 *
 * @returns query parameters for request
 */
 const buildQueryParams = (instance, config, extraParameters) => {
  const { singlepart = '' } = config;
  let ret = '';
  if (singlepart.indexOf('image') !== -1) {
    ret = `?accept=image/jphc`;
  }
  if( extraParameters ) {
    for(const key of Object.keys(extraParameters)) {
      ret = `${ret}${ret.length ? '&' : '?'}${key}=${extraParameters[key]}`;
    }
  }
  return ret;
};

function buildInstanceFrameWadoRsUri(instance, config, frame, extraParameters) {
  const baseWadoRsUri = buildInstanceWadoRsUri(instance, config);

  frame = frame || 1;

  const query = buildQueryParams(instance, config, extraParameters);

  return `${baseWadoRsUri}/frames/${frame}${query}`;
}

// function getWADORSImageUrl(instance, frame) {
//   const wadorsuri = buildInstanceFrameWadoRsUri(instance, config, frame);

//   if (!wadorsuri) {
//     return;
//   }

//   // Use null to obtain an imageId which represents the instance
//   if (frame === null) {
//     wadorsuri = wadorsuri.replace(/frames\/(\d+)/, '');
//   } else {
//     // We need to sum 1 because WADO-RS frame number is 1-based
//     frame = frame ? parseInt(frame) + 1 : 1;

//     // Replaces /frame/1 by /frame/{frame}
//     wadorsuri = wadorsuri.replace(/frames\/(\d+)/, `frames/${frame}`);
//   }

//   return wadorsuri;
// }

/**
 * Obtain an imageId for Cornerstone based on the WADO-RS scheme
 *
 * @param {object} instanceMetada metadata object (InstanceMetadata)
 * @param {(string\|number)} [frame] the frame number
 * @returns {string} The imageId to be used by Cornerstone
 */
export default function getWADORSImageId(instance, config, frame, extraParameters) {
  //const uri = getWADORSImageUrl(instance, frame);
  const uri = buildInstanceFrameWadoRsUri(instance, config, frame, extraParameters);

  if (!uri) {
    return;
  }

  return `wadors:${uri}`;
}
