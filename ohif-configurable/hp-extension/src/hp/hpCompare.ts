/**
 * Hanging protocol which requires two studies, for which the first study and selected series
 * has a series in the second study containing the same series description to show in the right hand panel.
 */
export default
  {
    name: 'Prior Compare',
    hasUpdatedPriorsInformation: true,
    numberOfPriorsReferenced: 1,
    protocolMatchingRules: [
      {
        id: 'Two Studies',
        weight: 1000,
        attribute: 'StudyInstanceUID',
        // The 'from' attribute says where to get the 'attribute' value from.  In this case
        // prior means the second study in the study list.
        from: 'prior',
        constraint: {
          notNull: true,
        },
      },
    ],
    toolGroupIds: ['default'],
    displaySetSelectors: {
      currentDisplaySetId: {
        findAll: true,
        studyMatchingRules: [
          {
            // The priorInstance is a study counter that indicates what position this study is in
            // and the value comes from the options parameter.
            attribute: 'priorInstance',
            from: 'options',
            required: true,
            constraint: {
              equals: { value: 0 },
            },
          },
        ],
        seriesMatchingRules: [
          {
            attribute: 'numImageFrames',
            constraint: {
              greaterThan: { value: 0 },
            },
          },
        ],
      },

      priorDisplaySetId: {
        findAll: true,
        studyMatchingRules: [
          {
            attribute: 'priorInstance',
            from: 'options',
            required: true,
            constraint: {
              equals: 1,
            },
          },
        ],
        seriesMatchingRules: [
          {
            id: 'Only Compare DisplaySets with images',
            attribute: 'numImageFrames',
            constraint: {
              greaterThan: { value: 0 },
            },
          },

          {
            id: 'Require comparison to have same series desription as current',
            // Custom constraint that returns boolean true if this display set has the same value as another 
            attribute: 'sameAs',
            // The attribute to retrieve from both display sets
            sameAttribute: 'SeriesDescription',
            // And the location to retrieve that from
            sameDisplaySetId: 'currentDisplaySetId',
            // This is a flag to indicates that this display set should be recomputed if the other
            // specified display set changes.
            recomputeDisplaySet: 'currentDisplaySetId',
            // And apply this only if true
            constraint: {
              equals: { value: false },
            },
            required: true,
          },
        ],
      },
    },
    stages: [
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
        viewports: [
          {
            viewportOptions: {
              toolGroupId: 'default',
              // Only allow same study matching contraints to be dragged in
              allowUnmatchedView: 'studyMatch',
            },
            displaySets: [
              {
                id: 'currentDisplaySetId',
              },
            ],
          },
          {
            viewportOptions: {
              toolGroupId: 'default',
              allowUnmatchedView: 'studyMatch',
              // Red border on the prior viewport
              border: [255, 0, 0],
            },
            displaySets: [
              {
                id: 'priorDisplaySetId',
              },
            ],
          },
        ],
      },
    ],
  };
