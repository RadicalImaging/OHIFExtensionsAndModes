import React from 'react';

import './DicomHtmlViewport.css';

function normalizeString(str) {
  return (str || '').replaceAll('^', ' ');
}

function getRelationshipString(data) {
  switch (data.RelationshipType) {
    case 'HAS CONCEPT MOD':
      return 'Concept modifier: ';
    case 'HAS OBS CONTEXT':
      return 'Observation context: ';
    default:
      return '';
  }
}

const getMeaningString = data => {
  if (data.ConceptNameCodeSequence) {
    const { CodeMeaning } = data.ConceptNameCodeSequence;

    return `${CodeMeaning} = `;
  }

  return '';
};

function getValueString(data) {
  switch (data.ValueType) {
    case 'CODE':
      const {
        CodeMeaning,
        CodeValue,
        CodingSchemeDesignator,
      } = data.ConceptNameCodeSequence[0];

      return `${CodeMeaning} (${CodeValue}, ${CodingSchemeDesignator})`;

    case 'PNAME':
      console.log(data);
      return normalizeString(
        data.PersonName[0] ? data.PersonName[0].Alphabetic : data.PersonName
      );

    case 'TEXT':
      return normalizeString(data.TextValue);

    case 'UIDREF':
      return data.UID;

    case 'NUM':
      const { MeasuredValueSequence } = data;
      const numValue = MeasuredValueSequence.NumericValue;
      const codeValue =
        MeasuredValueSequence.MeasurementUnitsCodeSequence.CodeValue;
      return `${numValue} ${codeValue}`;
  }
}

function constructPlainValue(data) {
  const value = getValueString(data);

  if (value) {
    return getRelationshipString(data) + getMeaningString(data) + value;
  }
}

function getMainData(data) {
  const root = [];

  const patientValue = normalizeString(
    `${data.PatientName[0].Alphabetic} (${data.PatientSex}, #${data.PatientID})`
  );
  root.push(getMainDataItem('Patient', patientValue));

  const studyValue = normalizeString(data.StudyDescription);
  root.push(getMainDataItem('Study', studyValue));

  const seriesValue = normalizeString(
    `${data.SeriesDescription} (#${data.SeriesNumber})`
  );
  root.push(getMainDataItem('Series', seriesValue));

  const manufacturerValue = normalizeString(
    `${data.Manufacturer} (${data.ManufacturerModelName}, #${data.DeviceSerialNumber})`
  );

  root.push(getMainDataItem('Manufacturer', manufacturerValue));

  const mainDataObjects = {
    CompletionFlag: 'Completion flag',
    VerificationFlag: 'Verification flag',
  };

  Object.keys(mainDataObjects).forEach(key => {
    if (!data[key]) {
      return;
    }

    const item = getMainDataItem(mainDataObjects[key], data[key]);

    root.push(item);
  });

  // TODO: Format these dates
  const contentDateTimeValue = `${data.ContentDate} ${data.ContentTime}`;
  root.push(getMainDataItem('Content Date/Time', contentDateTimeValue));

  root.push();

  return <div>{root}</div>;
}

const getContentSequence = (data, level = 1) => {
  const root = [];
  if (data.ValueType) {
    if (data.ValueType === 'CONTAINER') {
      if (!data.ConceptNameCodeSequence) console.log(data);
      else {
        const { CodeMeaning, CodeValue, CodingSchemeDesignator } =
          data.ConceptNameCodeSequence[0] || data.ConceptNameCodeSequence;

        const header = `${CodeMeaning} (${CodeValue} - ${CodingSchemeDesignator})`;
        const HeaderDynamicLevel = `h${Math.min(level, 6)}`;
        root.push(
          <HeaderDynamicLevel key={header}>{header}</HeaderDynamicLevel>
        );
      }

      data.ContentSequence.map(item => getContentSequence(item, level + 1))
        .filter(item => item)
        .forEach(item => root.push(item));
    }

    root.push(constructPlainValue(data));
  }

  if (data.ContentSequence) {
    data.ContentSequence.map(item => getContentSequence(item, level + 1))
      .filter(item => item)
      .forEach(item => root.push(item));
  }

  return <div>{root}</div>;
};

function getMainDataItem(key, value) {
  return (
    <div key={key}>
      <b>{key}</b>: {value}
    </div>
  );
}

function DicomHtmlViewport(props) {
  const mainData = getMainData(props.instance);
  const contentSequence = getContentSequence(props.instance);
  const content = (
    <>
      {mainData}
      {contentSequence}
    </>
  );

  const setViewportActiveHandler = () => {
    const { setViewportActive, viewportIndex, activeViewportIndex } = props;

    if (viewportIndex !== activeViewportIndex) {
      setViewportActive(viewportIndex);
    }
  };

  return (
    <div
      data-cy="dicom-html-viewport"
      className="DicomHtmlViewport"
      onClick={setViewportActiveHandler}
      onScroll={setViewportActiveHandler}
    >
      {content}
    </div>
  );
}

export default DicomHtmlViewport;
