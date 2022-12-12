import { AwsClient } from 'aws4fetch';
import awsCredentials from './awsCredentials';

const loadMetaDataInternal = async (datastoreId, collectionId, config) => {
    const uri = config.endpoint + '/runtime/datastore/' + datastoreId + '/imageset?imageSetId=' + collectionId 
    const params = {
        url: uri,
        data: null,
        headers: {},
        method: "GET"
    };

    console.time("curie Metadata");
    const aws = new AwsClient(awsCredentials(config));
    const response = await aws.fetch(uri)
    console.timeEnd("curie Metadata");

    const json = await response.json();
    config.collections[json.ImageSetID] = json
    return json
}

export default loadMetaDataInternal;
