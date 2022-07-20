export default [
  {
  id: '2x2',
  hasUpdatedPriorsInformation: false,
  name: '2x2',
  protocolMatchingRules: [
    {
      id: 'FourOrMoreSeries',
      weight: 25,
      attribute: 'numberOfDisplaySets',
      constraint: {
        greaterThan: 3,
      },
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
        {
          viewportOptions: {
            toolGroupId: 'default',
          },
          displaySets: [
            {
              displaySetIndex: 2,
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
              displaySetIndex: 3,
              id: 'displaySet',
            },
          ],
        },
      ],
    },
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
},


{
  id: '2x1',
  hasUpdatedPriorsInformation: false,
  name: '2x1',
  protocolMatchingRules: [
    {
      id: 'TwoOrMoreSeries',
      weight: 15,
      attribute: 'numberOfDisplaySets',
      constraint: {
        greaterThan: 1,
      },
    },
  ],
  toolGroupIds: ['default'],
  stages: [
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
},
];
