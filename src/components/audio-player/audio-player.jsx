import React, {memo, Fragment} from 'react';
import PropTypes from 'prop-types';

const handleButtonClick = (onClick) => () => onClick();

const AudioPlayer = ({isLoading, isPlaying, onPlayButtonClick, children}) => (
  <Fragment>
    <button
      className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
      type='button'
      disabled={isLoading}
      onClick={handleButtonClick(onPlayButtonClick)}
    />
    <div className='track__status'>
      {children}
    </div>
  </Fragment>
);

AudioPlayer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

export default memo(AudioPlayer);
