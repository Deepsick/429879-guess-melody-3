import React, {PureComponent} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import QuestionArtist from '../question-artist/question-artist.jsx';
import QuestionGenre from '../question-genre/question-genre.jsx';
import GameScreen from '../game-screen/game-screen.jsx';
import {GameType, Path, WELCOME_SCREEN_STEP} from '../../const';
import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player.js';

const GenreQuestionScreenWrapped = withAudioPlayer(QuestionGenre);
const ArtistQuestionScreenWrapped = withAudioPlayer(QuestionArtist);
class App extends PureComponent {
  _renderGameScreen() {
    const {
      maxMistakes,
      step,
      questions,
      handleUserAnswer,
      handleWelcomeButtonClick,
    } = this.props;
    const question = questions[step];

    if (step === WELCOME_SCREEN_STEP || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onWelcomeButtonClick={handleWelcomeButtonClick}
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
  questions: PropTypes.array.isRequired,
  handleUserAnswer: PropTypes.func.isRequired,
  handleWelcomeButtonClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  maxMistakes: state.maxMistakes,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  handleWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  handleUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementMistake(question, answer));
    dispatch(ActionCreator.incrementStep());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
