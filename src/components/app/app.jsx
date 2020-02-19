import React, {PureComponent} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import QuestionArtist from '../question-artist/question-artist.jsx';
import QuestionGenre from '../question-genre/question-genre.jsx';
import GameScreen from '../game-screen/game-screen.jsx';
import {GameType, Path, WELCOME_SCREEN_STEP} from '../../const';
import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player.js';

const GenreQuestionScreenWrapped = withAudioPlayer(QuestionGenre);
const ArtistQuestionScreenWrapped = withAudioPlayer(QuestionArtist);
class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: WELCOME_SCREEN_STEP,
    };

    this._handleWelcomeButtonClick = this._handleWelcomeButtonClick.bind(this);
    this._handleAnswerInputChange = this._handleAnswerInputChange.bind(this);
  }

  _handleWelcomeButtonClick() {
    this.setState({
      step: 0,
    });
  }

  _handleAnswerInputChange() {
    this.setState((prevState) => ({
      step: prevState.step + 1,
    }));
  }

  _renderGameScreen() {
    const {errorsCount, questions} = this.props;
    const {step} = this.state;
    const question = questions[step];

    if (step === WELCOME_SCREEN_STEP || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onWelcomeButtonClick={this._handleWelcomeButtonClick}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen type={question.type}>
              <ArtistQuestionScreenWrapped
                question={questions[1]}
                onAnswer={this._handleAnswerInputChange}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen type={question.type} >
              <GenreQuestionScreenWrapped
                question={questions[0]}
                onAnswer={this._handleAnswerInputChange}
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
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

export default App;
