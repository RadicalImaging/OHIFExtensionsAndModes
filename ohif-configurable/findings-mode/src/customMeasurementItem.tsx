import React, { useState } from 'react';
import classnames from 'classnames';
import { Icon } from '@ohif/ui';

const FindingsMeasurementItem = ({
  uid,
  index,
  label,
  displayText,
  isActive,
  onClick,
  onEdit,
  item,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const onEditHandler = event => {
    event.stopPropagation();
    onEdit({ uid, isActive, event });
  };
  const onClickHandler = event => onClick({ uid, isActive, event });
  const onMouseEnter = () => setIsHovering(true);
  const onMouseLeave = () => setIsHovering(false);

  const { site,finding } = item;
  const useLabel = label || site?.text || finding?.text || '(empty)';
  let useDisplayText = displayText;
  if (finding && finding?.text !== useLabel) {
    useDisplayText = [finding.text, ...useDisplayText];
  }
  if (site && site?.text !== useLabel) {
    useDisplayText = [site.text, ...useDisplayText];
  }

  const keyImage = site?.keyImage || false;

  return (
    <div
      className={classnames(
        'group flex cursor-pointer bg-black border outline-none border-transparent transition duration-300',
        {
          'rounded overflow-hidden border-primary-light': isActive,
        }
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClickHandler}
      role="button"
      tabIndex="0"
      data-cy={'measurement-item'}
    >
      <div
        className={classnames(
          'text-center w-6 py-1 text-base transition duration-300',
          {
            'bg-primary-light text-black active': isActive,
            'bg-primary-dark text-primary-light group-hover:bg-secondary-main': !isActive,
          }
        )}
      >
        {index}
      </div>
      <div className="relative flex flex-col flex-1 px-2 py-1">
        <span className="mb-1 text-base text-primary-light">
          {keyImage && (<Icon
            className='text-white w-4'
            name="lock"
          />
          )}
          {useLabel}
        </span>
        {useDisplayText.map((line, i) => (
          <span
            key={i}
            className="pl-2 text-base text-white border-l border-primary-light"
            dangerouslySetInnerHTML={{ __html: line }}
          ></span>
        ))}
        <Icon
          className={classnames(
            'text-white w-4 absolute cursor-pointer transition duration-300',
            { 'invisible opacity-0 mr-2': !isActive && !isHovering },
            { 'visible opacity-1': !isActive && isHovering }
          )}
          name="pencil"
          style={{
            top: 4,
            right: 4,
            transform: isActive || isHovering ? '' : 'translateX(100%)',
          }}
          onClick={onEditHandler}
        />
      </div>
    </div>
  );
};

export default {
  id: 'MeasurementItem',
  content: FindingsMeasurementItem,
  contentProps: {
    isActive: true,
  },
};

export {
  FindingsMeasurementItem as MeasurementItem
};