import React, {memo} from 'react';
import PropTypes from 'prop-types';

const handleInputChange = (onChange, id) => (evt) => {
  const value = evt.target.checked;

  onChange(id, value);
};

const QuestionGenreItem = ({answer, id, onChange, renderPlayer, userAnswer}) => {
  return (
    <div className='track'>
      {renderPlayer(answer.src, id)}
      <div className='game__answer'>
        <input className='game__input visually-hidden' type='checkbox' name='answer' value={`answer-${id}`}
          id={`answer-${id}`}
          checked={userAnswer}
          onChange={handleInputChange(onChange, id)}
        />
        <label className='game__check' htmlFor={`answer-${id}`}>Отметить</label>
      </div>
    </div>
  );
};

QuestionGenreItem.propTypes = {
  answer: PropTypes.shape({
    src: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  userAnswer: PropTypes.bool.isRequired,
};

export default memo(QuestionGenreItem);
