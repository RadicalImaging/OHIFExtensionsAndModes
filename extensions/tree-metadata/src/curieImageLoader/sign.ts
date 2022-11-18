import { Signer } from '@aws-amplify/core';

const sign = (params, config) => {
  const serviceInfo = {
    region: config.region,
    service: 'medical-imaging',
  };

  let { healthlake } = window;
  if (!healthlake) {
    const sHealthLake = window.localStorage.getItem("healthlake");
    if (sHealthLake) {
      healthlake = window.healthlake = JSON.parse(sHealthLake);
    }
  }
  const credentials = {
    secret_key: healthlake?.awsSecretAccessKey || config.awsSecretAccessKey,
    access_key: healthlake?.awsAccessKeyID || config.awsAccessKeyID,
  };

  const uriSigned = Signer.sign(params, credentials, serviceInfo);
  return uriSigned;
};

export default sign;
