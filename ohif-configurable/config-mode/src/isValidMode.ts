/** Any modality but SM or ECG */
export default function isValidMode({ modalities }) {
  const modalities_list = modalities.split('\\');
  const validSingletonModalities = this.validSingletonModalities || ['SR'];
  if( modalities_list.every(modality => validSingletonModalities.indexOf(modality)!==-1) ) {
    return true;
  }

  const invalidModalities = this.invalidModalities || ['SM', 'ECG', 'SR', 'SEG'];

  // Slide Microscopy modality not supported by basic mode yet
  return (
    modalities_list.filter(it => invalidModalities.indexOf(it)===-1 ).length > 0
  );
};
