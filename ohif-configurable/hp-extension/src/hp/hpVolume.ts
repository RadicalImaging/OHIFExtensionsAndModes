export default [
  {
    id: 'volume',
    hasUpdatedPriorsInformation: false,
    name: 'Volume',
    protocolMatchingRules: [
      {
        id: 'Volume 2x2',
        weight: 50,
        attribute: 'maxNumImageFrames',
        constraint: {
          greaterThan: 10,
        },
        required: true,
      },
    ],
    toolGroupIds: ['default'],
    stages: [
      {
        id: '2x2',
        name: 'default',
        viewportStructure: {
          type: 'grid',
          properties: {
            rows: 2,
            columns: 2,
          },
        },
        displaySets: [
          {
            id: 'displaySet',
            findAll: true,
            seriesMatchingRules: [
              {
                attribute: 'numImageFrames',
                constraint: {
                  greaterThan: 10,
                },
              },
            ],
          },
        ],
        viewports: [
          {
            viewportOptions: {
              viewportId: 'ctAXIAL',
              viewportType: 'volume',
              orientation: 'axial',
              initialImageOptions: {
                // index: 5,
                preset: 'first', // 'first', 'last', 'middle'
              },
              syncGroups: [
                {
                  type: 'voi',
                  id: 'ctWLSync',
                  source: true,
                  target: true,
                },
              ],
            },
            displaySets: [
              {
                id: 'displaySet',
              },
            ],
          },
          {
            viewportOptions: {
              viewportId: 'ctSAG',
              viewportType: 'volume',
              orientation: 'sagittal',
              syncGroups: [
                {
                  type: 'voi',
                  id: 'ctWLSync',
                  source: true,
                  target: true,
                },
              ],
            },
            displaySets: [
              {
                id: 'displaySet',
              },
            ],
          },
          {
            viewportOptions: {
              viewportId: 'ctCOR',
              viewportType: 'volume',
              orientation: 'coronal',
              syncGroups: [
                {
                  type: 'voi',
                  id: 'ctWLSync',
                  source: true,
                  target: true,
                },
              ],
            },
            displaySets: [
              {
                id: 'displaySet',
              },
            ],
          },
          {
            viewportOptions: {
              viewportId: 'mipSagittal',
              viewportType: 'volume',
              orientation: 'sagittal',
              background: [1, 1, 1],
              toolGroupId: 'mipToolGroup',
              // Custom props can be used to set custom properties which extensions
              // can react on.
              customViewportOptions: {
                // We use viewportDisplay to filter the viewports which are displayed
                // in mip and we set the scrollbar according to their rotation index
                // in the cornerstone extension.
                hideOverlays: true,
              },
            },
            displaySets: [
              {
                options: {
                  blendMode: 'MIP',
                  slabThickness: 'fullVolume',
                  voiInverted: true,
                },
                id: 'displaySet',
              },
            ],
          },
        ],
      },
    ],
  }
];
