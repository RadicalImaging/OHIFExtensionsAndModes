import React from 'react';
import classnames from 'classnames';
import ConfigPoint from 'config-point';

import listComponentGenerator from './listComponentGenerator';
import './ViewportOverlay.css';
import {
  formatDICOMDate,
  formatDICOMTime,
  formatNumberPrecision,
} from './utils';

/**
 *
 * @param {*} config is a configuration object that defines four lists of elements,
 * one topLeft, topRight, bottomLeft, bottomRight contents.
 * @param {*} extensionManager is used to load the image data.
 * @returns
 */
export const generateFromConfig = config => {
  const { topLeft, topRight, bottomLeft, bottomRight, itemGenerator } = config;

  return props => {
    const { imageId } = props;
    const topLeftClass = 'top-viewport left-viewport text-primary-light';
    const topRightClass =
      'top-viewport right-viewport-scrollbar text-primary-light';
    const bottomRightClass =
      'bottom-viewport right-viewport-scrollbar text-primary-light';
    const bottomLeftClass = 'bottom-viewport left-viewport text-primary-light';
    const overlay = 'absolute pointer-events-none';

    if (!imageId) {
      return null;
    }

    return (
      <>
        <div
          data-cy={'viewport-overlay-top-left'}
          className={classnames(overlay, topLeftClass)}
        >
          {listComponentGenerator({ ...props, list: topLeft, itemGenerator })}
        </div>
        <div
          data-cy={'viewport-overlay-top-right'}
          className={classnames(overlay, topRightClass)}
        >
          {listComponentGenerator({ ...props, list: topRight, itemGenerator })}
        </div>
        <div
          data-cy={'viewport-overlay-bottom-right'}
          className={classnames(overlay, bottomRightClass)}
        >
          {listComponentGenerator({
            ...props,
            list: bottomRight,
            itemGenerator,
          })}
        </div>
        <div
          data-cy={'viewport-overlay-bottom-left'}
          className={classnames(overlay, bottomLeftClass)}
        >
          {listComponentGenerator({
            ...props,
            list: bottomLeft,
            itemGenerator,
          })}
        </div>
      </>
    );
  };
};

const { MicroscopyViewportOverlay } = ConfigPoint.register({
  MicroscopyViewportOverlay: {
    configBase: {
      topLeft: [],
      topRight: [],
      bottomLeft: [],
      bottomRight: [],
      itemGenerator: props => {
        const { item } = props;
        const { title, value: valueFunc, condition, contents } = item;
        props.image = { ...props.image, ...props.image.getData().metadata };
        props.formatDate = formatDICOMDate;
        props.formatTime = formatDICOMTime;
        props.formatNumberPrecision = formatNumberPrecision;
        if (condition && !condition(props)) return null;
        if (!contents && !valueFunc) return null;
        const value = valueFunc && valueFunc(props);
        const contentsValue = (contents && contents(props)) || [
          { className: 'mr-1', value: title },
          { classname: 'mr-1 font-light', value },
        ];

        return (
          <div key={item.id} className="flex flex-row">
            {contentsValue.map((content, idx) => (
              <span key={idx} className={content.className}>
                {content.value}
              </span>
            ))}
          </div>
        );
      },
      generateFromConfig,
    },
  },
});

export default MicroscopyViewportOverlay.generateFromConfig(
  MicroscopyViewportOverlay
);
