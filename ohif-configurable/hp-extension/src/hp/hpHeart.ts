export default {
  // id not required, but is included for historical reasons.
  id: 'hpHeart',
  name: 'LV Function Heart',
  hasUpdatedPriorsInformation: false,
  protocolMatchingRules: [
    {
      id: 'MR',
      weight: 50,
      attribute: 'ModalitiesInStudy',
      constraint: {
        contains: 'MR',
      },
      required: true,
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
  displaySetSelectors: {
    displaySetCineLax4: {
      // Matches displaysets, NOT series
      seriesMatchingRules: [
        {
          id: 'numImageFrames 20-40',
          weight: 1,
          attribute: 'numImageFrames',
          constraint: {
            range: {
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
    displaySetCineLax3: {
      // Matches displaysets, NOT series
      seriesMatchingRules: [
        {
          attribute: 'numImageFrames',
          constraint: {
            range: {
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
    displaySetCineLax2: {
      // Matches displaysets, NOT series
      seriesMatchingRules: [
        {
          id: 'numImageFrames>25',
          attribute: 'numImageFrames',
          constraint: {
            range: {
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
    displaySetCineSax: {
      // Matches displaysets, NOT series
      seriesMatchingRules: [
        {
          attribute: 'numImageFrames',
          constraint: {
            equals: 25,
          },
        },
        {
          weight: 5,
          attribute: 'numImageFrames',
          constraint: {
            equals: 30,
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
  },

  stages: [
    {
      name: '2x2',
      viewportStructure: {
        type: 'grid',
        layoutType: 'grid',
        properties: {
          idPrefix: 'heart',
          rows: 2,
          columns: 2,
        },
      },
      viewports: [
        {
          viewportOptions: {
            toolGroupId: 'default',
            displaySetGroup: 'displaySetCineLax4',
            syncGroups: [
              {
                type: 'initialZoomPan',
                options: { 
                  initialDisplayArea: [0.6, 0.6],
                  imageCanvasPoint: [0.5, 0.35],
                },
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
            syncGroups: [
              {
                type: 'initialZoomPan',
                options: { 
                  initialDisplayArea: [0.6, 0.6],
                },
              },
            ],
            displaySetGroup: 'displaySetCineLax3',
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
            syncGroups: [
              {
                type: 'initialZoomPan',
                options: { 
                  initialDisplayArea: [0.5, 0.5],
                  imageCanvasPoint: [0.5, 0.45],
                  },
              },
            ],
            displaySetGroup: 'displaySetCineLax2',
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
            syncGroups: [
              {
                type: 'initialZoomPan',
                options: { 
                  initialDisplayArea: [0.4, 0.4],
                  },
              },
            ],
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
    },
  ],
  numberOfPriorsReferenced: -1,
};
