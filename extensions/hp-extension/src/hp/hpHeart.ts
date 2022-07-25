export default {
  id: 'LV Function Heart',
  hasUpdatedPriorsInformation: false,
  name: 'Default',
  createdDate: '2021-02-23T19:22:08.894Z',
  modifiedDate: '2021-02-23T19:22:08.894Z',
  availableTo: {},
  editableBy: {},
  protocolMatchingRules: [
    {
      id: 'MR',
      weight: 50,
      attribute: 'ModalitiesInStudy',
      constraint: {
        contains: 'MR',
      },
    },
    {
      id: 'SAX',
      attribute: 'seriesDescriptions',
      constraint: {
        contains: 'SAX',
      },
      required: true,
    },
    {
      id: '4',
      attribute: 'seriesDescriptions',
      constraint: {
        contains: '4',
      },
      required: true,
    },
    {
      id: '3',
      attribute: 'seriesDescriptions',
      constraint: {
        contains: '3',
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
          id: 'displaySetCineLax4',
          // Matches displaysets, NOT series
          seriesMatchingRules: [
            {
              id: 'numImageFrames 20-40',
              weight: 1,
              attribute: 'numImageFrames',
              constraint: {
                betweeen: {
                  value: [20, 40],
                },
              },
            },
            {
              weight: 20,
              attribute: 'SeriesDescription',
              constraint: {
                contains: 'LAX',
              },
            },
            {
              weight: 10,
              attribute: 'SeriesDescription',
              constraint: {
                contains: '4',
              },
            },
          ],
        },
        {
          id: 'displaySetCineLax3',
          // Matches displaysets, NOT series
          seriesMatchingRules: [
            {
              id: 'numImageFrames>25',
              attribute: 'numImageFrames',
              constraint: {
                betweeen: {
                  value: [20, 40],
                },
              },
            },
            {
              weight: 20,
              attribute: 'SeriesDescription',
              constraint: {
                contains: 'LAX',
              },
            },
            {
              weight: 10,
              attribute: 'SeriesDescription',
              constraint: {
                contains: '3',
              },
            },
          ],
          studyMatchingRules: [],
        },
        {
          id: 'displaySetCineLax2',
          // Matches displaysets, NOT series
          seriesMatchingRules: [
            {
              id: 'numImageFrames>25',
              attribute: 'numImageFrames',
              constraint: {
                betweeen: {
                  value: [20, 40],
                },
              },
            },
            {
              weight: 20,
              attribute: 'SeriesDescription',
              constraint: {
                contains: 'LAX',
              },
            },
            {
              weight: 10,
              attribute: 'SeriesDescription',
              constraint: {
                contains: '2',
              },
            },
          ],
          studyMatchingRules: [],
        },
        {
          id: 'displaySetCineSax',
          // Matches displaysets, NOT series
          seriesMatchingRules: [
            {
              id: 'numImageFrames>25',
              attribute: 'numImageFrames',
              constraint: {
                betweeen: {
                  value: [20, 40],
                },
              },
            },
            {
              weight: 20,
              attribute: 'SeriesDescription',
              constraint: {
                contains: 'SAX',
              },
            },
          ],
          studyMatchingRules: [],
        },
      ],
      viewports: [
        {
          viewportOptions: {
            toolGroupId: 'default',
            customViewportOptions: {
              zoomPan: {
                initialDisplayArea: [0.6, 0.6],
                imageCanvasPoint: [0.5, 0.35],
              },
            },
            displaySetGroup: 'displaySetCineLax4',
            syncGroups: [
              {
                type: 'cameraPosition',
                id: 'axialSync',
                source: false,
                target: false,
              },
            ],
          },
          displaySets: [
            {
              id: 'displaySetCineLax4',
            },
          ],
        },
        {
          viewportOptions: {
            toolGroupId: 'default',
            customViewportOptions: {
              zoomPan: {
                initialDisplayArea: [0.6, 0.6],
              },
            },
            displaySetGroup: 'displaySetCineLax3',
            syncGroups: [
              {
                type: 'cameraPosition',
                id: 'axialSync',
                source: false,
                target: false,
              },
            ],
          },
          displaySets: [
            {
              id: 'displaySetCineLax3',
            },
          ],
        },
        {
          viewportOptions: {
            toolGroupId: 'default',
            customViewportOptions: {
              zoomPan: {
                initialDisplayArea: [0.5, 0.5],
                imageCanvasPoint: [0.5, 0.45],
              },
            },
            displaySetGroup: 'displaySetCineLax2',
            syncGroups: [
              {
                type: 'cameraPosition',
                id: 'axialSync',
                source: false,
                target: false,
              },
            ],
          },
          displaySets: [
            {
              id: 'displaySetCineLax2',
            },
          ],
        },
        {
          viewportOptions: {
            toolGroupId: 'default',
            customViewportOptions: {
              zoomPan: {
                initialDisplayArea: [0.4, 0.4],
              },
            },
            displaySetGroup: 'displaySetCineSax',
          },
          displaySets: [
            {
              displaySetIndex: 4,
              id: 'displaySetCineSax',
            },
          ],
        },
      ],
      createdDate: '2021-02-23T18:32:42.850Z',
    },
  ],
  numberOfPriorsReferenced: -1,
};
