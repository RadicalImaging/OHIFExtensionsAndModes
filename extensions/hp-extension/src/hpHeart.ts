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
      id: 'LVFunction',
      weight: 150,
      attribute: 'StudyDescription',
      constraint: {
        contains: 'LV Function',
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
              weight: 10,
              attribute: 'SeriesDescription',
              constraint: {
                contains: 'CINE',
              },
            },
            {
              weight: 10,
              attribute: 'SeriesDescription',
              constraint: {
                contains: 'LAX',
              },
            },
            {
              weight: 10,
              attribute: 'SeriesDescription',
              constraint: {
                contains: '4Ch',
              },
            },
          ],
          studyMatchingRules: [],
        },
        {
          id: 'displaySetCineLax3',
          // Matches displaysets, NOT series
          seriesMatchingRules: [
            {
              weight: 10,
              attribute: 'SeriesDescription',
              constraint: {
                contains: 'CINE',
              },
            },
            {
              weight: 10,
              attribute: 'SeriesDescription',
              constraint: {
                contains: 'LAX',
              },
            },
            {
              weight: 10,
              attribute: 'SeriesDescription',
              constraint: {
                contains: '3Ch',
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
              weight: 10,
              attribute: 'SeriesDescription',
              constraint: {
                contains: 'CINE',
              },
            },
            {
              weight: 10,
              attribute: 'SeriesDescription',
              constraint: {
                contains: 'LAX',
              },
            },
            {
              weight: 10,
              attribute: 'SeriesDescription',
              constraint: {
                contains: '2Ch',
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
              weight: 10,
              attribute: 'SeriesDescription',
              constraint: {
                contains: 'CINE',
              },
            },
            {
              weight: 10,
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
              initialScale: 2.5,
            },
            // syncGroups: [
            //   {
            //     type: 'cameraPosition',
            //     id: 'axialSync',
            //     source: true,
            //     target: true,
            //   },
            // ],
              // initialImageOptions: {
            //   index: 180,
            //   preset: 'middle', // 'first', 'last', 'middle'
            // },
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
              initialScale: 2.5,
            },
            syncGroups: [
              {
                type: 'cameraPosition',
                id: 'axialSync',
                source: true,
                target: true,
              },
            ],
            // initialImageOptions: {
            //   index: 180,
            //   preset: 'middle', // 'first', 'last', 'middle'
            // },
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
              initialScale: 2.5,
            },
            // syncGroups: [
            //   {
            //     type: 'cameraPosition',
            //     id: 'axialSync',
            //     source: true,
            //     target: true,
            //   },
            // ],
            // initialImageOptions: {
            //   index: 180,
            //   preset: 'middle', // 'first', 'last', 'middle'
            // },
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
              initialScale: 2.5,
            },
            // syncGroups: [
            //   {
            //     type: 'cameraPosition',
            //     id: 'axialSync',
            //     source: true,
            //     target: true,
            //   },
            // ],
            // initialImageOptions: {
            //   index: 180,
            //   preset: 'middle', // 'first', 'last', 'middle'
            // },
          },
          displaySets: [
            {
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
