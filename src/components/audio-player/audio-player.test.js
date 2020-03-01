import React from 'react';
import renderer from 'react-test-renderer';
import AudioPlayer from './audio-player.jsx';
import {AUDIO_PLAYER_PROPS} from '../../mocks/test-data';

it(`Should render AudioPlayer component correctly`, () => {
  const {isPlaying, src, onPlayButtonClick} = AUDIO_PLAYER_PROPS;
  const node = renderer.create(
      <AudioPlayer
        src={src}
        isPlaying={isPlaying}
        onPlayButtonClick={onPlayButtonClick}
        isLoading={true}
      >
        <audio />
      </AudioPlayer>, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(node).toMatchSnapshot();
});
