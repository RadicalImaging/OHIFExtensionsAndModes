import React, { Component } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import * as DICOMwebClient from 'dicomweb-client';
import microscopyManager from './tools/microscopyManager';
// import ViewportOverlay from './components/ViewportOverlay';
import './DicomMicroscopyViewport.css';

class DicomMicroscopyViewport extends Component {
  state = {
    error: null,
  };

  viewer = null;

  constructor(props) {
    super(props);

    this.container = React.createRef();
    this.overlayElement = React.createRef();

    this.debouncedResize = debounce(() => {
      if (this.viewer) this.viewer.resize();
    }, 100);
  }

  static propTypes = {
    viewportData: PropTypes.object,
    activeViewportIndex: PropTypes.number,
    setViewportActive: PropTypes.func,
    viewportIndex: PropTypes.number,
  };

  // install the microscopy renderer into the web page.
  // you should only do this once.
  installOpenLayersRenderer(container, displaySet) {
    const {
      StudyInstanceUID,
      SeriesInstanceUID,
      others: series,
    } = displaySet;

    const { dataSource } = this.props;

    console.log("installOpenLayersRenderer", dataSource);

    // const retrieveInstances = instances => {
    //   const promises = [];
    //   for (let i = 0; i < instances.length; i++) {
    //     const sopInstanceUID = instances[i]['00080018']['Value'][0];
    //     const loadedInstance =
    //       series && series.getInstanceByUID(sopInstanceUID);
    //     if (loadedInstance) {
    //       const { metadata } = loadedInstance.getData();
    //       promises.push(Promise.resolve(metadata));
    //       continue;
    //     }

    //     const retrieveInstanceOptions = {
    //       studyInstanceUID: StudyInstanceUID,
    //       seriesInstanceUID: SeriesInstanceUID,
    //       sopInstanceUID,
    //     };

    //     const promise = dicomWebClient
    //       .retrieveInstanceMetadata(retrieveInstanceOptions)
    //       .then(metadata => {
    //         const metadataZero = metadata[0];
    //         const ImageType = metadataZero['00080008']['Value'];
    //         if (ImageType[2] === 'VOLUME') {
    //           return dcmjs.data.DicomMetaDictionary.naturalizeDataset(
    //             metadataZero
    //           );
    //         }
    //       });
    //     promises.push(promise);
    //   }
    //   return Promise.all(promises);
    // };

    const loadViewer = async metadata => {
      metadata = metadata.filter(m => m);
      console.log("microscopy metadata", metadata);

      const { api } = await import(
        /* webpackChunkName: "dicom-microscopy-viewer" */ 'dicom-microscopy-viewer'
      );
      const microscopyViewer = api.VLWholeSlideMicroscopyImageViewer;

      const url = window.config.dataSources[0].configuration.wadoRoot;
      const client = new DICOMwebClient.api.DICOMwebClient({url});
      client.wadoURL = url;

      const options = {
        client,
        metadata,
        retrieveRendered: false,
        controls: ['overview'],
      };

      this.viewer = new microscopyViewer(options);

      if (
        this.overlayElement &&
        this.overlayElement.current &&
        this.viewer.addViewportOverlay
      ) {
        this.viewer.addViewportOverlay({
          element: this.overlayElement.current,
          className: 'OpenLayersOverlay',
        });
      }

      this.viewer.render({ container });

      const { StudyInstanceUID, SeriesInstanceUID } = displaySet;
      microscopyManager.addViewer(
        this.viewer,
        this.props.viewportIndex,
        container,
        StudyInstanceUID,
        SeriesInstanceUID
      );
    };

    console.log("Loading viewer metadata", displaySet);
    loadViewer(displaySet.others);
  }

  componentDidMount() {
    console.log("componentDidMount", this.props);
    const {displaySets, viewportIndex} = this.props;
    const displaySet = displaySets[viewportIndex];
    this.installOpenLayersRenderer(this.container.current, displaySet);
  }

  componentWillUnmount() {
    microscopyManager.removeViewer(this.viewer);
  }

  setViewportActiveHandler = () => {
    const {
      setViewportActive,
      viewportIndex,
      activeViewportIndex,
    } = this.props;

    if (viewportIndex !== activeViewportIndex) {
      setViewportActive(viewportIndex);
    }
  };

  render() {
    const style = { width: '100%', height: '100%' };
    return (
      <div
        className={'DicomMicroscopyViewer'}
        style={style}
        onClick={this.setViewportActiveHandler}
      >
        <div style={{ ...style, display: 'none' }}>
          <div style={{ ...style }} ref={this.overlayElement}>
            <div
              style={{ position: 'relative', height: '100%', width: '100%' }}
            >
              {/* <ViewportOverlay
                image={this.props.viewportData.displaySet.series.getFirstInstance()}
                imageId={this.props.viewportData.displaySet.series
                  .getFirstInstance()
                  .getImageId()}
                metadata={this.props.viewportData.displaySet.metadata}
              /> */}
            </div>
          </div>
        </div>
        {ReactResizeDetector && (
          <ReactResizeDetector
            handleWidth
            handleHeight
            onResize={this.onWindowResize}
          />
        )}
        {this.state.error ? (
          <h2>{JSON.stringify(this.state.error)}</h2>
        ) : (
          <div style={style} ref={this.container} />
        )}
      </div>
    );
  }

  onWindowResize = () => {
    this.debouncedResize();
  };
}

export default DicomMicroscopyViewport;
