import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GameType} from '../../const';

class QuestionGenre extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [false, false, false, false],
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _handleInputChange(index) {
    return (evt) => {
      const value = evt.target.checked;
      this.setState((prevState) => ({
        answers: [...prevState.answers.slice(0, index), value, ...prevState.answers.slice(index + 1)],
      }));
    };
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    const {onAnswer, question} = this.props;
    onAnswer(question, this.state.answers);
  }

  render() {
    const {question, renderPlayer} = this.props;
    const {answers: userAnswers} = this.state;
    const {
      answers,
      genre,
    } = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={this._handleFormSubmit}
        >
          {answers.map((answer, i) => (
            <div key={`${i}-${answer.src}`} className="track">
              {renderPlayer(answer.src, i)}
              <div className="game__answer">
                <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`}
                  id={`answer-${i}`}
                  checked={userAnswers[i]}
                  onChange={this._handleInputChange(i)}
                />
                <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
              </div>
            </div>
          ))}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

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
};

export default QuestionGenre;
