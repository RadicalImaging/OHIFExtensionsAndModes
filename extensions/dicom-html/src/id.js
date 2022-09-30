import packageJson from '../package.json';

const id = packageJson.name;

const SOPClassHandlerName = 'dicom-html';
const SOPClassHandlerId = `${id}.sopClassHandlerModule.${SOPClassHandlerName}`;

export { SOPClassHandlerName, SOPClassHandlerId, id };
