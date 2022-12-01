import { api } from 'dicomweb-client';
import loadMetaDataInternal from '../curieImageLoader/loadMetaData';

export type HealthLake = {
  collections: Record<string, unknown>;
  awsAccessKeyID: string;
  awsSecretAccessKey: string;
  datastoreID?: string;
  region?: string;
  endpoint?: string;
};

/**
 * An implementation of the static wado client, that fetches data from
 * a static response rather than actually doing real queries.  This allows
 * fast encoding of test data, but because it is static, anything actually
 * performing searches doesn't work.  This version fixes the query issue
 * by manually implementing a query option.
 */
export default class DicomTreeClient extends api.DICOMwebClient {
  healthlake: HealthLake;
  staticWado = false;

  static studyFilterKeys = {
    StudyInstanceUID: '0020000D',
    PatientName: '00100010',
    '00100020': 'mrn',
    StudyDescription: '00081030',
    StudyDate: '00080020',
    ModalitiesInStudy: '00080061',
    AccessionNumber: '00080050',
  };

  static seriesFilterKeys = {
    SeriesInstanceUID: '0020000E',
    SeriesNumber: '00200011',
  };

  constructor(qidoConfig) {
    super(qidoConfig);
    this.staticWado = qidoConfig.staticWado;
    const { healthlake } = qidoConfig;
    if (!window.healthlake) {
      const sHealthlake = window.localStorage.getItem("healthlake");
      if (sHealthlake) {
        window.healthlake = JSON.parse(sHealthlake);
      }
    }
    if (healthlake) {
      this.healthlake = {
        region: 'us-east-1',
        endpoint: 'https://medical-imaging.us-east-1.amazonaws.com',
        tree: true,
        images:true,
        collections: {},
        ...window.healthlake,
        ...qidoConfig.healthlake,
      };
    }
  }

  /**
   * Replace the search for studies remote query with a local version which
   * retrieves a complete query list and then sub-selects from it locally.
   * @param {*} options
   * @returns
   */
  async searchForStudies(options) {
    let searchResult;
    const queryUrl = window.healthlake?.queryJson || this.healthlake?.queryJson;

    if (queryUrl) {
      console.log('Fetching from', queryUrl);
      searchResult = queryUrl[0]==='[' ? JSON.parse(queryUrl) : await (await fetch(queryUrl)).json();
      console.log('Results', searchResult);
    } else {
      searchResult = await super.searchForStudies(options);
    }

    const { queryParams } = options;
    if (!queryParams) return searchResult;
    const filtered = searchResult.filter(study => {
      for (const key of Object.keys(DicomTreeClient.studyFilterKeys)) {
        if (!this.filterItem(key, queryParams, study)) return false;
      }
      return true;
    });
    return filtered;
  }

  async searchForStudiesCurie(options) {
    const { queryParams } = options;
    const queryResults = loadCurieQuery(datastoreID, queryParams, this.healthlake);
    console.log('queryResults', queryResults);
    return queryResults;
  }

  async searchForSeries(options) {
    if (!this.staticWado) return super.searchForSeries(options);

    const searchResult = await super.searchForSeries(options);
    const { queryParams } = options;
    if (!queryParams) return searchResult;
    const filtered = searchResult.filter(study => {
      for (const key of Object.keys(DicomTreeClient.seriesFilterKeys)) {
        if (!this.filterItem(key, queryParams, study)) return false;
      }
      return true;
    });

    return filtered;
  }

  /**
   * Retrieves the metadata tree object, that is an object containing a patient, and then a study tree.
   * @param options
   * @returns
   */
  async retrieveMetadataTree(options) {
    const { studyInstanceUID, withCredentials = false } = options;
    if (!studyInstanceUID) {
      console.log('No study instance uid, not retrieving');
      throw new Error(
        'Study Instance UID is required for retrieval of study metadata'
      );
    }

    const { curie } = window;
    let {
      ImageSetID = curie?.studyID,
      datastoreID = curie?.datastoreID || this.healthlake?.datastoreID,
    } = options;
    if (this.healthlake && !ImageSetID) {
      const studies = await this.searchForStudies({
        ...options,
        queryParams: { StudyInstanceUID: studyInstanceUID },
      });
      console.log('* Studies query found', studies.length, 'studies');
      if (studies && studies.length) {
        const [study] = studies;
        datastoreID = study['00181002']?.Value?.[0] || datastoreID;
        ImageSetID = study['00200010']?.Value?.[0];
      }
    }
    if (this.healthlake?.tree && ImageSetID && datastoreID) {
      if (this.healthlake.collections[ImageSetID]) {
        console.log('* Returning previously fetched data', ImageSetID);
        return this.healthlake.collections[ImageSetID];
      }
      console.log(
        'curie retrieve',
        studyInstanceUID,
        datastoreID,
        ImageSetID
      );
      return loadMetaDataInternal(datastoreID, ImageSetID, this.healthlake);
    } else {
      console.log(
        'retrieve metadata tree of study',
        studyInstanceUID,
        datastoreID,
        ImageSetID
      );
      const url = `${this.wadoURL}/studies/${studyInstanceUID}/metadataTree.json`;
      return this._httpGetApplicationJson(url, {datastoreID, ImageSetID, }, false, withCredentials);
    }
  }

  /**
   * Compares values, matching any instance of desired to any instance of
   * actual by recursively go through the paired set of values.  That is,
   * this is O(m*n) where m is how many items in desired and n is the length of actual
   * Then, at the individual item node, compares the Alphabetic name if present,
   * and does a sub-string matching on string values, and otherwise does an
   * exact match comparison.
   *
   * @param {*} desired
   * @param {*} actual
   * @returns true if the values match
   */
  compareValues(desired, actual) {
    if (Array.isArray(desired)) {
      return desired.find(item => this.compareValues(item, actual));
    }
    if (Array.isArray(actual)) {
      return actual.find(actualItem => this.compareValues(desired, actualItem));
    }
    if (actual?.Alphabetic) {
      actual = actual.Alphabetic;
    }
    if (typeof actual == 'string') {
      if (actual.length === 0) return true;
      if (desired.length === 0 || desired === '*') return true;
      if (desired[0] === '*' && desired[desired.length - 1] === '*') {
        // console.log(`Comparing ${actual} to ${desired.substring(1, desired.length - 1)}`)
        return actual.indexOf(desired.substring(1, desired.length - 1)) != -1;
      } else if (desired[desired.length - 1] === '*') {
        return actual.indexOf(desired.substring(0, desired.length - 1)) != -1;
      } else if (desired[0] === '*') {
        return (
          actual.indexOf(desired.substring(1)) ===
          actual.length - desired.length + 1
        );
      }
    }
    return desired === actual;
  }

  /** Compares a pair of dates to see if the value is within the range */
  compareDateRange(range, value) {
    if (!value) return true;
    const dash = range.indexOf('-');
    if (dash === -1) return this.compareValues(range, value);
    const start = range.substring(0, dash);
    const end = range.substring(dash + 1);
    return (!start || value >= start) && (!end || value <= end);
  }

  /**
   * Filters the return list by the query parameters.
   *
   * @param {*} key
   * @param {*} queryParams
   * @param {*} study
   * @returns
   */
  filterItem(key, queryParams, study) {
    const altKey = DicomTreeClient.studyFilterKeys[key] || key;
    if (!queryParams) return true;
    const testValue = queryParams[key] || queryParams[altKey];
    if (!testValue) return true;
    const valueElem = study[key] || study[altKey];
    if (!valueElem) return false;
    if (valueElem.vr == 'DA') {
      return this.compareDateRange(testValue, valueElem.Value[0]);
    }
    const value = valueElem.Value;
    return this.compareValues(testValue, value) && true;
  }
}
