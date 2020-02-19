import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AudioPlayer from './audio-player.jsx';
import {AUDIO_PLAYER_PROPS} from '../../mocks/test-data';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should call callback on answer input change`, () => {
  const {isPlaying, src} = AUDIO_PLAYER_PROPS;
  const onButtonClick = jest.fn(function (...args) {
    return [...args];
  });

  const audioPlayer = mount(
      <AudioPlayer
        src={src}
        isPlaying={isPlaying}
        onPlayButtonClick={onButtonClick}
      />);

  const trackButton = audioPlayer.find(`.track__button`);

  trackButton.simulate(`click`);
  console.log(audioPlayer.state());
  expect(audioPlayer.state().isPlaying).toBe(!isPlaying);
  trackButton.simulate(`click`);
  expect(audioPlayer.state().isPlaying).to.equal(!!isPlaying);

  expect(onButtonClick).toHaveBeenCalledTimes(2);
});
