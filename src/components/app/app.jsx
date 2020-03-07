import React, {PureComponent} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/game/game.js";
import {getStep, getMistakes, getMaxMistakes} from "../../reducer/game/selectors.js";
import {getQuestions} from "../../reducer/data/selectors.js";
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import QuestionArtist from '../question-artist/question-artist.jsx';
import QuestionGenre from '../question-genre/question-genre.jsx';
import GameScreen from '../game-screen/game-screen.jsx';
import GameOverScreen from "../game-over-screen/game-over-screen.jsx";
import WinScreen from "../win-screen/win-screen.jsx";
import {GameType, Path, WELCOME_SCREEN_STEP} from '../../const';
import withActivePlayer from "../../hocs/with-active-player/with-active-player.js";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer.js";

const GenreQuestionScreenWrapped = withActivePlayer(withUserAnswer(QuestionGenre));
const ArtistQuestionScreenWrapped = withActivePlayer(QuestionArtist);

class App extends PureComponent {
  _renderGameScreen() {
    const {
      maxMistakes,
      mistakes,
      step,
      questions,
      handleUserAnswer,
      handleWelcomeButtonClick,
      resetGame,
    } = this.props;
    const question = questions[step];

    if (step === WELCOME_SCREEN_STEP) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onWelcomeButtonClick={handleWelcomeButtonClick}
        />
      );
    }

    if (mistakes >= maxMistakes) {
      return (
        <GameOverScreen
          onReplayButtonClick={resetGame}
        />
      );
    }

    if (step >= questions.length) {
      return (
        <WinScreen
          questionsCount={questions.length}
          mistakesCount={mistakes}
          onReplayButtonClick={resetGame}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen type={question.type}>
              <ArtistQuestionScreenWrapped
                question={question}
                onAnswer={handleUserAnswer}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen type={question.type} >
              <GenreQuestionScreenWrapped
                question={question}
                onAnswer={handleUserAnswer}
              />
            </GameScreen>
          );
      }
    }

    return null;
  }

  render() {
    const {questions} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={Path.INDEX}>
            {this._renderGameScreen()}
          </Route>
          <Route exact path={Path.ARTIST}>
            <ArtistQuestionScreenWrapped
              question={questions[1]}
              onAnswer={this._handleAnswerInputChange}
            />
          </Route>
          <Route exact path={Path.GENRE}>
            <GenreQuestionScreenWrapped
              question={questions[0]}
              onAnswer={this._handleAnswerInputChange}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  handleUserAnswer: PropTypes.func.isRequired,
  handleWelcomeButtonClick: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: getStep(state),
  maxMistakes: getMaxMistakes(state),
  questions: getQuestions(state),
  mistakes: getMistakes(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  handleUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementMistake(question, answer));
    dispatch(ActionCreator.incrementStep());
  },
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
