import sign from "./sign";

const loadMetaDataInternal = async (datastoreId, collectionId, config) => {
    const uri = config.endpoint + '/runtime/datastore/' + datastoreId + '/study/' + collectionId + '/dicomstudymetadata'
    const params = {
        url: uri,
        data: null,
        headers: {},
        method: "GET"
    };

    const options = sign(params, config)
    console.time("curie Metadata");
    console.log("* curie signed request", options);
    const response = await fetch(options.url, options)
    console.timeEnd("curie Metadata");

    const json = await response.json();
    config.collections[json.ImageSetID] = json
    return json
}

export default loadMetaDataInternal
