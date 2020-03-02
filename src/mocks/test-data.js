import {AVATAR_URL} from '../const';

export const ERRORS_COUNT = 3;
export const HANDLE_WELCOME_BUTTON_CLICK = () => {};
export const HANDLE_ANSWER_INPUT_CHANGE = () => {};
export const RENDER_PLAYER = () => {};
export const QUESTIONS = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [{
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `blues`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `jazz`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }],
  }, {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [{
      picture: `${AVATAR_URL}/${1}`,
      artist: `John Snow`,
    }, {
      picture: `${AVATAR_URL}/${2}`,
      artist: `Jack Daniels`,
    }, {
      picture: `${AVATAR_URL}/${3}`,
      artist: `Jim Beam`,
    }],
  },
];

export const AUDIO_PLAYER_PROPS = {
  src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  isPlaying: true,
  onPlayButtonClick: () => {},
};

export const ANSWER = {
  src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  genre: `rock`,
};
