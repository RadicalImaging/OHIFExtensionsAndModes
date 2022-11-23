import React from 'react';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { Button } from '@ohif/ui';

function HealthLake() {
  console.log("Rendering healthlake initial page");
  const navigate = useNavigate();

  const dsConfig = window.config.dataSources[0].configuration;
  let { healthlake } = dsConfig;
  if (!healthlake) {
    const sHealthLake = window.localStorage.getItem("healthlake");
    healthlake = sHealthLake && JSON.parse(sHealthLake) || {};
  }

  const setupHealthLakeConnect = () => {
    const awsSecretAccessKey = window.document.getElementById('secret').value;
    const datastoreID = window.document.getElementById('DatastoreID').value;
    const awsAccessKeyID = window.document.getElementById('awsPublicKey').value;
    const studyID = window.document.getElementById('studyID').value;
    const studyUID = window.document.getElementById('studyUID').value;
    const queryJson = window.document.getElementById('queryJson').value;
    const endpoint = window.document.getElementById('endpoint').value;

    console.log(
      'View study',
      awsSecretAccessKey,
      studyID,
      studyUID,
      datastoreID
    );
    window.healthlake = {
      awsSecretAccessKey,
      awsAccessKeyID,
      studyID,
      ImageSetID: studyID,
      studyUID,
      datastoreID,
      queryJson,
      endpoint,
    };
    window.localStorage.setItem("healthlake", JSON.stringify(window.healthlake));
    return window.healthlake;
  };

  console.log("Rendering health lake response");
  return (
    <div className="bg-black border-primary-main text-white">
      AWS Secret Key:{' '}
      <input
        id="secret"
        type="text"
        className="border-primary-main mt-2 bg-black text-white"
        defaultValue={healthlake.awsSecretAccessKey}
      />{' '}
      <br />
      AWS Public Key:{' '}
      <input
        id="awsPublicKey"
        type="text"
        className="border-primary-main mt-2 bg-black text-white"
        defaultValue={healthlake.awsAccessKeyID}
      />{' '}
      <br />
      HealthLake Query JSON:{' '}
      <input
        id="queryJson"
        type="text"
        className="border-primary-main mt-2 bg-black"
        defaultValue={healthlake?.queryJson}
      />
      <br />
      Endpoint:{' '}
      <input
        id="endpoint"
        type="text"
        className="border-primary-main mt-2 bg-black"
        defaultValue={healthlake?.endpoint}
      />
      <br />
      Datastore ID:{' '}
      <input
        id="DatastoreID"
        type="text"
        className="border-primary-main mt-2 bg-black"
        defaultValue={healthlake?.datastoreID}
      />
      <br />
      <Button
        className={classnames('font-bold', 'ml-2')}
        onClick={() => {
          const { studyUID, datastoreID, studyID } = setupHealthLakeConnect();
          const destination = `/?datastoreID=${datastoreID}&ImageSetID=${studyID}&datasources=healthlake`;
          console.log('Querying to destination', destination);
          navigate(destination);
        }}
      >
        Search Study
      </Button>
      <br />
      <br />
      Study ID:
      <input
        id="studyID"
        type="text"
        className="border-primary-main mt-2 bg-black"
        defaultValue=""
      />{' '}
      <br />
      Study UID:
      <input
        id="studyUID"
        type="text"
        className="border-primary-main mt-2 bg-black"
        defaultValue=""
      />{' '}
      <br />
      <Button
        className={classnames('font-bold', 'ml-2')}
        onClick={() => {
          const { studyUID, datastoreID, studyID } = setupHealthLakeConnect();
          navigate(
            `/viewer?StudyInstanceUIDs=${studyUID}&datastoreID=${datastoreID}&ImageSetID=${studyID}`
          );
        }}
      >
        View Study
      </Button>
    </div>
  );
}

export default HealthLake;
