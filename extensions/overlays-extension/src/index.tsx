import { id } from './id';

/**
 * You can remove any of the following modules if you don't need them.
 */
export default {
  /**
   * Only required property. Should be a unique value across all extensions.
   * You ID can be anything you want, but it should be unique.
   */
  id,

  geCustomizationModule() {
    return [
      { 
        name: 'veterinary',
        value: {
          id: 'cornerstoneOverlay',
          customizationType: 'ohif.overlay',
          topLeft: [
            {
              customizationType: 'ohif.overlayItem',
              label: 'Other PIDs',
              attribute: 'OtherPatientIDs',
            },
          ],
        }
      },
    ];
  },
};
