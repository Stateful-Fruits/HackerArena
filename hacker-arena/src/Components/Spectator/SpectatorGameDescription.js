import React, { Component } from 'react';
import SpectatorError from './SpectatorError'

class SpectatorGameDescription extends Component {
  render() {
    let { gameRoom } = this.props;
    let { challengerName, creatorName, problem } = gameRoom;
    return (
      <div>
        {
          problem ? (
            <div>
              <div>
                <h2>Problem Title:</h2> { problem.title || 'No Problem Title' }
              </div>
              <div>
                <h2>Problem Difficulty:</h2> { problem.difficulty || 'No Problem Difficulty' }
              </div>
              <div>
                <h2>Problem Description:</h2> { problem.description || 'No Problem Description' }
              </div>
            </div>
          ) : (
            <SpectatorError 
              errorMessage='No Problem In This Room!'
            />
          )
        }
        <h2>{ creatorName } VS { challengerName }</h2>
      </div>
    )
  }
}

export default SpectatorGameDescription;