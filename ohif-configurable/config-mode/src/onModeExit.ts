/** De-initialize the tool bar and measurement services when done. */
const onModeExit = ({ servicesManager }) => {
  const {
    toolGroupService,
    syncGroupService,
    segmentationService,
    cornerstoneViewportService,
    uiDialogService,
    uiModalService,
  } = servicesManager.services;

  uiDialogService.dismissAll();
  uiModalService.hide();
  toolGroupService.destroy();
  syncGroupService.destroy();
  segmentationService.destroy();
  cornerstoneViewportService.destroy();
};

export default onModeExit;