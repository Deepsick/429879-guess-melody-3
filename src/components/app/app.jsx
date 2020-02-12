import React, {PureComponent} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import QuestionArtist from '../question-artist/question-artist.jsx';
import QuestionGenre from '../question-genre/question-genre.jsx';
import {GameType, Path, WELCOME_SCREEN_STEP} from '../../const';

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
            <QuestionArtist
              question={questions[1]}
              onAnswer={this._handleAnswerInputChange}
            />
          );
        case GameType.GENRE:
          return (
            <QuestionGenre
              question={questions[0]}
              onAnswer={this._handleAnswerInputChange}
            />
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
            <QuestionArtist
              question={questions[1]}
              onAnswer={() => {}}
            />
          </Route>
          <Route exact path={Path.GENRE}>
            <QuestionGenre
              question={questions[0]}
              onAnswer={() => {}}
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
