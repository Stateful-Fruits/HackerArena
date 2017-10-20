import React, {Component} from 'react';
import PropTypes from 'prop-types'

// import '../../Spectator/SpectatorChat.css'

class Video extends Component {


render() {
    return(
        <div
        ref="container"
    />
    );
}
}
Video.propTypes = {
    // video: PropTypes.object.isRequired,
  };
export default Video;