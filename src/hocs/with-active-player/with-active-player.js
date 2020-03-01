import React, {PureComponent} from 'react';
import Player from "../../components/audio-player/audio-player.jsx";
import withAudioPlayer from "../with-audio-player/with-audio-player.js";

const AudioPlayer = withAudioPlayer(Player);

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: 0,
      };

      this._renderPlayer = this._renderPlayer.bind(this);
      this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
    }

    _handlePlayButtonClick(activePlayerId, id) {
      return () => {
        this.setState({
          activePlayerId: activePlayerId === id ? -1 : id
        });
      };
    }

    _renderPlayer(activePlayerId) {
      return (src, id) => (
        <AudioPlayer
          src={src}
          isPlaying={id === activePlayerId}
          onPlayButtonClick={this._handlePlayButtonClick(activePlayerId, id)}
        />
      );
    }

    render() {
      const {activePlayerId} = this.state;
      return <Component
        {...this.props}
        renderPlayer={this._renderPlayer(activePlayerId)}
      />;
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
