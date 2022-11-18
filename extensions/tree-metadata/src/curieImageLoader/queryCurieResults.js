import sign from "./sign";

const queryCurieResults = async (queryParams, collectionId, config) => {
    const datastoreId = queryParams.datastoreID || window.curie.datastoreID || config.datastoreID;
    const uri = config.endpoint + '/runtime/datastore/' + datastoreId + '/searchimagesets'
    const params = {
        url: uri,
        data: null,
        headers: {},
        method: "GET"
    };

    const options = sign(params, config)
    console.time("curie search");
    console.log("* curie signed request", options);
    const response = await fetch(options.url, options)
    console.timeEnd("curie search");

    const json = await response.json();
    return json
}

export default queryCurieResults
