import React from 'react';
import { utils } from '@ohif/core';

import './DicomHtmlViewport.css';

const { guid } = utils;

const defaultStyles: Record<string, React.CSSProperties> = {
  meta_header_key: {
    color: 'rgb(52, 140, 253)',
    marginRight: '9px',
    textAlign: 'right',
    minWidth: '9rem',
    display: 'inline-block',
    lineHeight: 1.58,
  },
  meta_header_value: {},
  h1: {
    color: 'rgb(144, 205, 244)',
  },
  h2: {
    color: 'rgb(144, 205, 244)',
  },
  h3: {
    color: 'rgb(144, 205, 244)',
  },
  h4: {
    color: 'rgb(144, 205, 244)',
  },
  h5: {
    color: 'rgb(144, 205, 244)',
  },
  h6: {
    color: 'rgb(144, 205, 244)',
  },
  content_key: {
    color: 'rgb(52, 140, 253)',
    lineHeight: 1.58,
  },
  content_value: {},
};

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

    return `${CodeMeaning}`;
  }

  return '';
};

function getValueString(data: any) {
  if (data.ValueType === 'CODE') {
    const {
      CodeMeaning,
      CodeValue,
      CodingSchemeDesignator,
    } = data.ConceptNameCodeSequence[0];

    return `${CodeMeaning} (${CodeValue}, ${CodingSchemeDesignator})`;
  } else if (data.ValueType === 'PNAME') {
    return normalizeString(
      data.PersonName[0] ? data.PersonName[0].Alphabetic : data.PersonName
    );
  } else if (data.ValueType === 'TEXT') {
    return normalizeString(data.TextValue);
  } else if (data.ValueType === 'UIDREF') {
    return data.UID;
  } else if (data.ValueType === 'NUM') {
    const { MeasuredValueSequence } = data;
    const numValue = MeasuredValueSequence.NumericValue;
    const codeValue =
      MeasuredValueSequence.MeasurementUnitsCodeSequence.CodeValue;
    return `${numValue} ${codeValue}`;
  }
}

function StyledReportContent({
  instance,
  styles,
}: {
  instance: any;
  styles: Record<string, React.CSSProperties>;
}) {
  const PlainValue = ({ data }) => {
    const value = getValueString(data);

    if (value) {
      return (
        <>
          <div style={styles.content_key}>
            {getRelationshipString(data)} {getMeaningString(data)}
          </div>
          <div style={styles.content_value}>{value}</div>
        </>
      );
    } else {
      return null;
    }
  };

  function ReportMetaHeaderItem({ k, v }: { k: string; v: string }) {
    return (
      <div key={k}>
        <span style={styles.meta_header_key}>
          <b>{k}</b>
        </span>
        <span style={styles.meta_header_value}>{v}</span>
      </div>
    );
  }

  const ReportMetaHeader = () => {
    const patientValue = normalizeString(
      `${instance.PatientName[0].Alphabetic} (${instance.PatientSex}, #${instance.PatientID})`
    );
    const studyValue = normalizeString(instance.StudyDescription);
    const seriesValue = normalizeString(
      `${instance.SeriesDescription} (#${instance.SeriesNumber})`
    );
    const manufacturerValue = normalizeString(
      `${instance.Manufacturer} (${instance.ManufacturerModelName}, #${instance.DeviceSerialNumber})`
    );
    // TODO: Format these dates
    const contentDateTimeValue = `${instance.ContentDate} ${instance.ContentTime}`;

    const mainDataObjects = {
      CompletionFlag: 'Completion flag',
      VerificationFlag: 'Verification flag',
    };

    return (
      <div>
        <ReportMetaHeaderItem k="Patient" v={patientValue} />
        <ReportMetaHeaderItem k="Study" v={studyValue} />
        <ReportMetaHeaderItem k="Series" v={seriesValue} />
        <ReportMetaHeaderItem k="Manufacturer" v={manufacturerValue} />
        {Object.keys(mainDataObjects)
          .filter(key => !!instance[key])
          .map(key => {
            return (
              <ReportMetaHeaderItem
                key={key}
                k={mainDataObjects[key]}
                v={instance[key]}
              />
            );
          })}
        <ReportMetaHeaderItem k="Content Date/Time" v={contentDateTimeValue} />
      </div>
    );
  };

  const ContentSequenceBlock = ({
    data,
    level = 1,
  }: {
    data: any;
    level?: number;
  }) => {
    let header = null,
      HeaderDynamicLevel;
    if (data.ValueType) {
      if (data.ValueType === 'CONTAINER') {
        if (!data.ConceptNameCodeSequence) console.log(data);
        else {
          const { CodeMeaning, CodeValue, CodingSchemeDesignator } =
            data.ConceptNameCodeSequence[0] || data.ConceptNameCodeSequence;

          header = `${CodeMeaning} (${CodeValue} - ${CodingSchemeDesignator})`;
          HeaderDynamicLevel = `h${Math.min(level, 6)}`;
        }
      }
    }

    return (
      <div>
        {header && (
          <HeaderDynamicLevel key={header} style={styles[HeaderDynamicLevel]}>
            {header}
          </HeaderDynamicLevel>
        )}
        {data.ValueType ? (
          <>
            {data.ValueType === 'CONTAINER' &&
              data.ContentSequence &&
              data.ContentSequence.map(item => (
                <ContentSequenceBlock
                  key={`ContentSequence_${guid()}`}
                  data={item}
                  level={level + 1}
                />
              ))}
            <PlainValue data={data} />
          </>
        ) : (
          data.ContentSequence &&
          data.ContentSequence.map(item => (
            <ContentSequenceBlock
              key={`ContentSequence_${guid()}`}
              data={item}
              level={level + 1}
            />
          ))
        )}
      </div>
    );
  };

  return (
    <>
      <ReportMetaHeader />
      <ContentSequenceBlock data={instance} />
    </>
  );
}

function DicomHtmlViewport({
  activeViewportIndex,
  instance,
  setViewportActive,
  viewportIndex,
}: {
  activeViewportIndex: number | null;
  instance: any;
  setViewportActive: (idx: number | null) => void;
  viewportIndex: number | null;
}) {
  // TODO: override default styles with some styles from configurations

  const setViewportActiveHandler = () => {
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
      <StyledReportContent instance={instance} styles={defaultStyles} />
    </div>
  );
}

export default DicomHtmlViewport;
