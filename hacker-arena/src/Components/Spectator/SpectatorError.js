import React, { Component } from 'react';

class SpectatorError extends Component {
  render() {
    return (
      <div style={{ color: 'red' }}>
        <h1>
          {
            this.props.errorMessage || 'An Unknown Error Occured'
          }
        </h1>
      </div>
    )
  }
}

export default SpectatorError;