import microscopyManager from '../tools/microscopyManager';

export default function getSourceDisplaySet(studies, microscopySRDisplaySet) {
  const referencedDisplaySet = _getReferencedDisplaySet(
    microscopySRDisplaySet,
    studies
  );

  microscopyManager.clearAnnotations();

  microscopySRDisplaySet.load(referencedDisplaySet, studies);

  return referencedDisplaySet;
}

const _getReferencedDisplaySet = (microscopySRDisplaySet, studies) => {
  let allDisplaySets = [];

  const { ReferencedFrameOfReferenceUID } = microscopySRDisplaySet;

  studies.forEach(study => {
    allDisplaySets = allDisplaySets.concat(study.displaySets);
  });

  const otherDisplaySets = allDisplaySets.filter(
    ds =>
      ds.displaySetInstanceUID !== microscopySRDisplaySet.displaySetInstanceUID
  );
  const referencedDisplaySet = otherDisplaySets.find(
    displaySet =>
      displaySet.Modality === 'SM' &&
      displaySet.FrameOfReferenceUID === ReferencedFrameOfReferenceUID
  );
  if (!referencedDisplaySet && otherDisplaySets.length == 1) {
    console.log('No display set with FrameOfReferenceUID',
      ReferencedFrameOfReferenceUID,
      'single series, assuming data error, defaulting to only series.')
    return otherDisplaySets[0];
  }

  return referencedDisplaySet;
};
