export default [
  {
    hasUpdatedPriorsInformation: false,
    id: '@radicalimaging/hp-extension.mn',
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
      {
        id: 'OneOrMoreSeries',
        weight: 1,
        attribute: 'numberOfDisplaySetsWithImages',
        constraint: {
          greaterThan: 1,
        },
      },
    ],
    toolGroupIds: ['default'],
    displaySetSelectors: {
      defaultDisplaySetId: {
        findAll: true,
        // The reuseId is an id that maps the current mapping for this series instance into
        // the display set UID currently applied, so that on applying related hanging protocols,
        // this one can be re-applied.  This is done by adding the offset# to the reuseId to find
        // the final name.
        reuseId: 'default',
        seriesMatchingRules: [
          {
            attribute: 'numImageFrames',
            constraint: {
              greaterThan: { value: 0 },
            },
          },
        ],
      },
    },
    defaultViewport: {
      viewportOptions: {
        viewportType: 'stack',
        toolGroupId: 'default',
        allowUnmatchedView: true,
      },
      displaySets: [
        {
          id: 'defaultDisplaySetId',
          displaySetIndex: -1,
        },
      ],
    },
    stages: [
      {
        id: '2x2',
        requiredViewports: 1,
        preferredViewports: 4,
        viewportStructure: {
          type: 'grid',
          properties: {
            rows: 2,
            columns: 2,
          },
        },
        viewports: [
          {
            viewportOptions: {
              toolGroupId: 'default',
              allowUnmatchedView: true,
            },
            displaySets: [
              {
                id: 'defaultDisplaySetId',
                reuseId: '0-0',
              },
            ],
          },
          {
            viewportOptions: {
              toolGroupId: 'default',
              allowUnmatchedView: true,
            },
            displaySets: [
              {
                displaySetIndex: 1,
                id: 'defaultDisplaySetId',
                reuseId: '1-0',
              },
            ],
          },
          {
            viewportOptions: {
              toolGroupId: 'default',
              allowUnmatchedView: true,
            },
            displaySets: [
              {
                displaySetIndex: 2,
                id: 'defaultDisplaySetId',
                reuseId: '0-1',
              },
            ],
          },
          {
            viewportOptions: {
              toolGroupId: 'default',
              allowUnmatchedView: true,
            },
            displaySets: [
              {
                displaySetIndex: 3,
                id: 'defaultDisplaySetId',
                reuseId: '1-1',
              },
            ],
          },
        ],
      },

      // 3x1 stage
      {
        id: '3x1',
        requiredViewports: 1,
        preferredViewports: 3,
        viewportStructure: {
          type: 'grid',
          properties: {
            rows: 1,
            columns: 3,
          },
        },
        viewports: [
          {
            viewportOptions: {
              toolGroupId: 'default',
              allowUnmatchedView: true,
            },
            displaySets: [
              {
                id: 'defaultDisplaySetId',
                reuseId: '0-0',
              },
            ],
          },
          {
            viewportOptions: {
              toolGroupId: 'default',
              allowUnmatchedView: true,
            },
            displaySets: [
              {
                displaySetIndex: 1,
                id: 'defaultDisplaySetId',
                reuseId: '1-0',
              },
            ],
          },
          {
            viewportOptions: {
              toolGroupId: 'default',
              allowUnmatchedView: true,
            },
            displaySets: [
              {
                displaySetIndex: 2,
                id: 'defaultDisplaySetId',
                reuseId: '0-1',
              },
            ],
          },
        ],
      },

      // A 2x1 stage
      {
        id: '2x1',
        requiredViewports: 1,
        preferredViewports: 2,
        viewportStructure: {
          type: 'grid',
          layoutType: 'grid',
          properties: {
            rows: 1,
            columns: 2,
          },
        },
        viewports: [
          {
            viewportOptions: {
              toolGroupId: 'default',
              allowUnmatchedView: true,
            },
            displaySets: [
              {
                id: 'defaultDisplaySetId',
                reuseId: '0-0',
              },
            ],
          },
          {
            viewportOptions: {
              toolGroupId: 'default',
              allowUnmatchedView: true,
            },
            displaySets: [
              {
                displaySetIndex: 1,
                id: 'defaultDisplaySetId',
                reuseId: '1-0',
              },
            ],
          },
        ],
      },

      // A 1x1 stage - should be automatically activated if there is only 1 viewable instance
      {
        id: '1x1',
        requiredViewports: 1,
        preferredViewports: 1,
        viewportStructure: {
          type: 'grid',
          layoutType: 'grid',
          properties: {
            rows: 1,
            columns: 1,
          },
        },
        viewports: [
          {
            viewportOptions: {
              toolGroupId: 'default',
              allowUnmatchedView: true,
            },
            displaySets: [
              {
                displaySetIndex: 1,
                id: 'defaultDisplaySetId',
                reuseId: '1-0',
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
              greaterThan: { value: 0 },
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
        viewports: [
          {
            viewportOptions: {
              toolGroupId: 'default',
              allowUnmatchedView: true,
            },
            displaySets: [
              {
                id: 'defaultDisplaySetId',
                reuseId: '0-0',
              },
            ],
          },
          {
            viewportOptions: {
              toolGroupId: 'default',
              allowUnmatchedView: true,
            },
            displaySets: [
              {
                displaySetIndex: 1,
                id: 'defaultDisplaySetId',
                reuseId: '1-0',
              },
            ],
          },
        ],
      },
    ],
    numberOfPriorsReferenced: -1,
  },
];
