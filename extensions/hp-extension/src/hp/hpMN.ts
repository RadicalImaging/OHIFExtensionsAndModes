export default {
  id: 'MxN',
  hasUpdatedPriorsInformation: false,
  name: 'Default',
  createdDate: '2021-02-23T19:22:08.894Z',
  modifiedDate: '2021-02-23T19:22:08.894Z',
  availableTo: {},
  editableBy: {},
  protocolMatchingRules: [
    {
      id: 'TwoOrMoreSeries',
      weight: 50,
      attribute: 'NumberOfStudyRelatedSeries',
      constraint: {
        greaterThan: 1,
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
          rows: 1,
          columns: 2,
        },
      },
      displaySets: [
        {
          id: 'displaySet',
          findAll: true,
          // Matches displaysets, NOT series
          seriesMatchingRules: [
            {
              weight: 10,
              attribute: 'numImageFrames',
              constraint: {
                greaterThan: 0,
              },
            },
          ],
        },
      ],
      viewports: [
        {
          viewportOptions: {
            toolGroupId: 'default',
            // initialImageOptions: {
            //   index: 180,
            //   preset: 'middle', // 'first', 'last', 'middle'
            // },
          },
          displaySets: [
            {
              id: 'displaySet',
            },
          ],
        },
        {
          viewportOptions: {
            toolGroupId: 'default',
            // initialImageOptions: {
            //   index: 180,
            //   preset: 'middle', // 'first', 'last', 'middle'
            // },
          },
          displaySets: [
            {
              displaySetIndex: 1,
              id: 'displaySet',
            },
          ],
        },
      ],
      createdDate: '2021-02-23T18:32:42.850Z',
    },
  ],
  numberOfPriorsReferenced: -1,
};
