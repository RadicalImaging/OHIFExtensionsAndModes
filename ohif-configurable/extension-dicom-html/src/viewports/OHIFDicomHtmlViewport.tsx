import React, { useEffect, useState } from 'react';
import { DicomMetadataStore, utils } from '@ohif/core';
import DicomHtmlViewport from './DicomHtmlViewport';

function OHIFDicomHtmlViewport(props) {
  const {
    children,
    dataSource,
    displaySets,
    viewportIndex,
    servicesManager,
    extensionManager,
    commandsManager,
  } = props;

  const {
    displaySetService,
    cornerstoneViewportService,
  } = servicesManager.services;

  return (
    <>
      <DicomHtmlViewport
        instance={displaySets[0].instance}
        viewportIndex={viewportIndex}
        activeViewportIndex={props.activeViewportIndex}
        setViewportActive={viewportIndex => {}}
      />
    </>
  );
}

export default OHIFDicomHtmlViewport;
