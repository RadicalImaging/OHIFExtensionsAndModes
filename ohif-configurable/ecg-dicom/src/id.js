import packageJson from '../package.json';

const id = packageJson.name;
const SOPClassHandlerId = `${id}.sopClassHandlerModule.ecg-dicom`;

export { id, SOPClassHandlerId };
