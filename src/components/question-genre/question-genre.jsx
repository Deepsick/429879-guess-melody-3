import React, {memo} from 'react';
import PropTypes from 'prop-types';
import QuestionGenreItem from "../question-genre-item/question-genre-item.jsx";
import {GameType} from '../../const';

const handleFormSubmit = (onAnswer) => (evt) => {
  evt.preventDefault();
  onAnswer();
};

const QuestionGenre = ({question, onAnswer, onChange, renderPlayer, userAnswers}) => {
  const {answers, genre} = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form
        className="game__tracks"
        onSubmit={handleFormSubmit(onAnswer)}
      >
        {answers.map((answer, i) => (
          <QuestionGenreItem
            answer={answer}
            id={i}
            key={`${i}-${answer.src}`}
            onChange={onChange}
            renderPlayer={renderPlayer}
            userAnswer={userAnswers[i]}
          />
        ))}

        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  );
};

QuestionGenre.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
    genre: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  renderPlayer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  userAnswers: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default memo(QuestionGenre);
