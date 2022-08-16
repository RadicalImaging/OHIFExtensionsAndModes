export default {
  id: 'mpr',
  locked: true,
  hasUpdatedPriorsInformation: false,
  name: 'MPR',
  createdDate: '2021-02-23T19:22:08.894Z',
  modifiedDate: '2021-02-23T19:22:08.894Z',
  availableTo: {},
  editableBy: {},
  toolGroupIds: [
    'ctToolGroup',
  ],
  imageLoadStrategy: 'interleaveTopToBottom', // "default" , "interleaveTopToBottom",  "interleaveCenter"
  protocolMatchingRules: [
    {
      id: 'ctModality',
      weight: 100,
      attribute: 'ModalitiesInStudy',
      constraint: {
        contains: "CT",
      },
      required: false,
    },
    {
      id: 'mrModality',
      weight: 100,
      attribute: 'ModalitiesInStudy',
      constraint: {
        contains: "MR",
      },
      required: false,
    },
  ],
  stages: [
    {
      id: 'hYbmMy3b7pz7GLiaT',
      name: 'default',
      viewportStructure: {
        layoutType: 'grid',
        properties: {
          rows: 1,
          columns: 3,
          layoutOptions: [
            {
              x: 0,
              y: 0,
              width: 1 / 3,
              height: 1,
            },
            {
              x: 1 / 3,
              y: 0,
              width: 1 / 3,
              height: 1,
            },
            {
              x: 2 / 3,
              y: 0,
              width: 1 / 3,
              height: 1,
            },
          ],
        },
      },
      displaySets: [
        {
          id: 'ctDisplaySet',
          imageMatchingRules: [],
          seriesMatchingRules: [
            {
              id: 'numImageFrames>25',
              weight: 10,
              attribute: 'numImageFrames',
              constraint: {
                greaterThan: {
                  value: 25,
                },
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
            viewportId: 'ctAXIAL',
            viewportType: 'volume',
            orientation: 'axial',
            toolGroupId: 'ctToolGroup',
            initialImageOptions: {
              // index: 5,
              preset: 'first', // 'first', 'last', 'middle'
            },
            syncGroups: [
              {
                type: 'cameraPosition',
                id: 'axialSync',
                source: true,
                target: true,
              },
              {
                type: 'voi',
                id: 'ctWLSync',
                source: true,
                target: true,
              },
            ],
          },
          displaySets: [
            {
              id: 'ctDisplaySet',
            },
          ],
        },
        {
          viewportOptions: {
            viewportId: 'ctSAGITTAL',
            viewportType: 'volume',
            orientation: 'sagittal',
            toolGroupId: 'ctToolGroup',
            syncGroups: [
              {
                type: 'cameraPosition',
                id: 'sagittalSync',
                source: true,
                target: true,
              },
              {
                type: 'voi',
                id: 'ctWLSync',
                source: true,
                target: true,
              },
            ],
          },
          displaySets: [
            {
              id: 'ctDisplaySet',
            },
          ],
        },
        {
          viewportOptions: {
            viewportId: 'ctCORONAL',
            viewportType: 'volume',
            orientation: 'coronal',
            toolGroupId: 'ctToolGroup',
            syncGroups: [
              {
                type: 'cameraPosition',
                id: 'coronalSync',
                source: true,
                target: true,
              },
              {
                type: 'voi',
                id: 'ctWLSync',
                source: true,
                target: true,
              },
            ],
          },
          displaySets: [
            {
              id: 'ctDisplaySet',
            },
          ],
        },
      ],
      createdDate: '2021-02-23T18:32:42.850Z',
    },
  ],
  numberOfPriorsReferenced: -1,
};
