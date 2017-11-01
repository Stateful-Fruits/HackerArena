import React, { Component } from 'react'; 
import AceEditor from 'react-ace-cdn';

class SpectatorEditor extends Component {
  render() {
    let { playerName, playerInput} = this.props;
    return (
        <AceEditor
          value={playerInput}
          readOnly={true}
          name={playerName}
          mode="javascript"
          theme="monokai"
          style={{ height: '400px', width: '40vw', display: 'inline-block', margin: '5px' }}
        />
    );
  }
}

export default SpectatorEditor;