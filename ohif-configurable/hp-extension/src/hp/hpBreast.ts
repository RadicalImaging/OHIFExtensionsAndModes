export default {
  id: 'MGBreastScreening',
  hasUpdatedPriorsInformation: false,
  name: 'Mammography Breast Screening',
  availableTo: {},
  editableBy: {},
  protocolMatchingRules: [
    {
      id: 'Mammography',
      weight: 150,
      attribute: 'ModalitiesInStudy',
      constraint: {
        contains: 'MG',
      },
      required: true,
    },
  ],
  toolGroupIds: ['default'],
  stages: [
    {
      id: 'hYbmMy3b7pz7GLiaT',
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
          id: 'LCC',
          // Matches displaysets, NOT series
          seriesMatchingRules: [
            {
              weight: 10,
              attribute: 'ViewCode',
              constraint: {
                contains: 'SCT:399162004',
              },
            },
            {
              weight: 10,
              attribute: 'PatientOrientation',
              constraint: {
                contains: 'L',
              },
              required: true,
            },
          ],
        },
        {
          id: 'RCC',
          // Matches displaysets, NOT series
          seriesMatchingRules: [
            {
              weight: 10,
              attribute: 'ViewCode',
              constraint: {
                contains: 'SCT:399162004',
              },
              required: true,
            },
            {
              weight: 10,
              attribute: 'PatientOrientation',
              constraint: {
                contains: 'R',
              },
              required: true,
            },
          ],
        },
        {
          id: 'LMLO',
          seriesMatchingRules: [
            {
              weight: 10,
              attribute: 'ViewCode',
              constraint: {
                contains: 'SCT:399368009',
              },
              required: true,
            },
            {
              weight: 10,
              attribute: 'PatientOrientation',
              constraint: {
                contains: 'L',
              },
              required: true,
            },
          ],
          studyMatchingRules: [],
        },
        {
          id: 'RMLO',
          seriesMatchingRules: [
            {
              weight: 10,
              attribute: 'ViewCode',
              constraint: {
                contains: 'SCT:399368009',
              },
              required: true,
            },
            {
              weight: 10,
              attribute: 'PatientOrientation',
              constraint: {
                contains: 'R',
              },
              required: true,
            },
          ],
          studyMatchingRules: [],
        },
      ],
      viewports: [
        {
          viewportOptions: {
            toolGroupId: 'default',
            background: [127,0,127],
            syncGroups: [
              {
                type: 'initialZoomPan',
                options: { 
                  imageCanvasPoint: [1,0,1,0],
                },
              },
            ],
          },
          displaySets: [
            {
              id: 'RCC',
            },
          ],
        },
        {
          viewportOptions: {
            toolGroupId: 'default',
            background: [127,127,0],
            syncGroups: [
              {
                type: 'initialZoomPan',
                options: { 
                  imageCanvasPoint: [0,0,0,0],
                },
              },
            ],
          },
          displaySets: [
            {
              id: 'LCC',
            },
          ],
        },
        {
          viewportOptions: {
            toolGroupId: 'default',
            background: [0,0,127],
            syncGroups: [
              {
                type: 'initialZoomPan',
                options: { 
                  imageCanvasPoint: [1,1,1,1],
                },
              },
            ],
          },
          displaySets: [
            {
              id: 'RMLO',
            },
          ],
        },
        {
          viewportOptions: {
            toolGroupId: 'default',
            background: [0,127,0],
            syncGroups: [
              {
                type: 'initialZoomPan',
                options: { 
                  imageCanvasPoint: [0,1,0,1],
                },
              },
            ],
          },
          displaySets: [
            {
              id: 'LMLO',
            },
          ],
        },
      ],
    },
  ],
  numberOfPriorsReferenced: -1,
};
