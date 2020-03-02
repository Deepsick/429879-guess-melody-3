
import React, {createRef, PureComponent} from "react";
import PropTypes from "prop-types";

const withAudioPlayer = (Component) => {
  class WithAudioPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._audioRef = createRef();

      this.state = {
        progress: 0,
        isLoading: true,
        isPlaying: props.isPlaying,
      };

      this._handleButtonClick = this._handleButtonClick.bind(this);
    }

    _handleButtonClick() {
      const {onPlayButtonClick} = this.props;
      const {isPlaying} = this.state;

      this.setState({isPlaying: !isPlaying});
      onPlayButtonClick();
    }

    componentDidMount() {
      const {src} = this.props;
      const audio = this._audioRef.current;
      audio.src = src;

      audio.oncanplaythrough = () => this.setState({
        isLoading: false,
      });

      audio.onplay = () => {
        this.setState({
          isPlaying: true,
        });
      };

      audio.onpause = () => this.setState({
        isPlaying: false,
      });

      audio.ontimeupdate = () => this.setState({
        progress: Math.floor(audio.currentTime),
      });
    }

    componentDidUpdate(prevProps) {
      const audio = this._audioRef.current;
      const {isPlaying} = this.props;

      if (this.state.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }

      if (prevProps.isPlaying !== isPlaying) {
        this.setState({isPlaying});
      }
    }

    componentWillUnmount() {
      const audio = this._audioRef.current;

      audio.oncanplaythrough = null;
      audio.onplay = null;
      audio.onpause = null;
      audio.ontimeupdate = null;
      audio.src = ``;
    }

    render() {
      const {isLoading, isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          isLoading={isLoading}
          isPlaying={isPlaying}
          onPlayButtonClick={this._handleButtonClick}
        >
          <audio
            ref={this._audioRef}
          />
        </Component>
      );
    }
  }

  WithAudioPlayer.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
  };

  return WithAudioPlayer;
};

export default withAudioPlayer;
