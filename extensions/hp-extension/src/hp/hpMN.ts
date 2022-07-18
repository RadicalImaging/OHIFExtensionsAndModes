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
      weight: 25,
      attribute: 'numberOfDisplaySets',
      constraint: {
        greaterThan: 1,
      },
      required: true,
    },
  ],
  toolGroupIds: ['default'],
  stages: [
    // {
    //   id: '2x2',
    //   name: 'default',
    //   viewportStructure: {
    //     type: 'grid',
    //     properties: {
    //       rows: 2,
    //       columns: 2,
    //     },
    //   },
    //   displaySets: [
    //     {
    //       id: 'displaySet',
    //       findAll: true,
    //       studyMatchingRules: [
    //         {
    //           id: 'ThreeOrMoreSeries',
    //           attribute: 'numberOfDisplaySets',
    //           constraint: {
    //             greaterThan: 2,
    //           },
    //         },        
    //       ],
    //       seriesMatchingRules: [
    //         {
    //           attribute: 'numImageFrames',
    //           constraint: {
    //             greaterThan: 0,
    //           },
    //         },
    //       ],
    //     },
    //   ],
    //   viewports: [
    //     {
    //       viewportOptions: {
    //         toolGroupId: 'default',
    //       },
    //       displaySets: [
    //         {
    //           id: 'displaySet',
    //         },
    //       ],
    //     },
    //     {
    //       viewportOptions: {
    //         toolGroupId: 'default',
    //       },
    //       displaySets: [
    //         {
    //           displaySetIndex: 1,
    //           id: 'displaySet',
    //         },
    //       ],
    //     },
    //     {
    //       viewportOptions: {
    //         toolGroupId: 'default',
    //       },
    //       displaySets: [
    //         {
    //           displaySetIndex: 2,
    //           id: 'displaySet',
    //         },
    //       ],
    //     },
    //     {
    //       viewportOptions: {
    //         toolGroupId: 'default',
    //       },
    //       displaySets: [
    //         {
    //           displaySetIndex: 3,
    //           id: 'displaySet',
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      id: '2x1',
      name: '2x1',
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
          },
          displaySets: [
            {
              displaySetIndex: 1,
              id: 'displaySet',
            },
          ],
        },
      ],
    },
  ],
  numberOfPriorsReferenced: -1,
};
