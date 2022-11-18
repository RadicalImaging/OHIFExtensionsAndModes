import createDicomWebTreeApi from './createDicomWebTreeApi';

/**
 *
 */
function getDataSourcesModule() {
  return [
    {
      name: 'dicomwebTree',
      type: 'webApi',
      createDataSource: createDicomWebTreeApi,
    },
  ];
}

export default getDataSourcesModule;
