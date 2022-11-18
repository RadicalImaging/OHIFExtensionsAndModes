import getWADORSImageId from './getWADORSImageId';

function buildInstanceWadoUrl(config, instance) {
  const { StudyInstanceUID, SeriesInstanceUID, SOPInstanceUID } = instance;
  const params = [];

  params.push('requestType=WADO');
  params.push(`studyUID=${StudyInstanceUID}`);
  params.push(`seriesUID=${SeriesInstanceUID}`);
  params.push(`objectUID=${SOPInstanceUID}`);
  params.push('contentType=application/dicom');
  params.push('transferSyntax=*');

  const paramString = params.join('&');

  return `${config.wadoUriRoot}?${paramString}`;
}

/**
 * Obtain an imageId for Cornerstone from an image instance
 *
 * @param instance
 * @param frame
 * @param thumbnail
 * @returns {string} The imageId to be used by Cornerstone
 */
export default function getImageId({
  instance,
  frame,
  config,
  thumbnail = false,
  extraParameters,
}) {
  if (!instance) {
    return;
  }

  if (instance.url) {
    return instance.url;
  }

  const renderingAttr = thumbnail ? 'thumbnailRendering' : 'imageRendering';

  return getWADORSImageId(instance, config, frame, extraParameters); // WADO-RS Retrieve Frame
}
