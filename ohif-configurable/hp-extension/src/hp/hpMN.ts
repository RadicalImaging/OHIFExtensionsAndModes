export default [
  {
    hasUpdatedPriorsInformation: false,
    name: '2x2',
    protocolMatchingRules: [
      {
        id: 'FourOrMoreSeries',
        weight: 25,
        attribute: 'numberOfDisplaySetsWithImages',
        constraint: {
          greaterThan: 3,
        },
      },
    ],
    toolGroupIds: ['default'],
    displaySetSelectors: {
      defaultDisplaySetId: {
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
    },
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
            id: 'defaultDisplaySetId',
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
                id: 'defaultDisplaySetId',
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
                id: 'defaultDisplaySetId',
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
                id: 'defaultDisplaySetId',
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
                id: 'defaultDisplaySetId',
              },
            ],
          },
        ],
      },

      // A 2x1 stage
      {
        name: '2x1',
        viewportStructure: {
          type: 'grid',
          layoutType: 'grid',
          properties: {
            rows: 1,
            columns: 2,
          },
        },
        displaySets: [
          {
            id: 'defaultDisplaySetId',
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
                id: 'defaultDisplaySetId',
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
                id: 'defaultDisplaySetId',
              },
            ],
          },
        ],
      },
    ],
    numberOfPriorsReferenced: -1,
  },

  // An entirely separate hanging protocol for 2x1 layout
  {
    id: '2x1',
    hasUpdatedPriorsInformation: false,
    name: '2x1',
    protocolMatchingRules: [
      {
        id: 'TwoOrMoreSeries',
        weight: 15,
        attribute: 'numberOfDisplaySetsWithImages',
        constraint: {
          greaterThan: 1,
        },
      },
    ],
    toolGroupIds: ['default'],
    displaySetSelectors: {
      defaultDisplaySetId:{
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
    },
    stages: [
      {
        id: '2x1',
        name: '2x1',
        viewportStructure: {
          type: 'grid',
          layoutType: 'grid',
          properties: {
            rows: 1,
            columns: 2,
          },
        },
        // TODO - delete this
        displaySets: [
          {
            id: 'defaultDisplaySetId',
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
                id: 'defaultDisplaySetId',
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
                id: 'defaultDisplaySetId',
              },
            ],
          },
        ],
      },
    ],
    numberOfPriorsReferenced: -1,
  },
];
