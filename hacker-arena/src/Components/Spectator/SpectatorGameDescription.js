import React, { Component } from 'react';
import SpectatorError from './SpectatorError'

class SpectatorGameDescription extends Component {
  render() {
    let { gameRoom } = this.props;
    let { challengerName, creatorName, problem } = gameRoom;
    return (
      <div>
        <h2>{ creatorName } VS { challengerName }</h2>
        {
          problem ? (
            <div>
              Problem Title: { problem.title || 'No Problem Title' }
              Problem Difficulty: { problem.difficulty || 'No Problem Difficulty' }
              Problem Description: { problem.description || 'No Problem Description' }
            </div>
          ) : (
            <SpectatorError 
              errorMessage='No Problem In This Room!'
            />
          )
        }
      </div>
    )
  }
}

export default SpectatorGameDescription;