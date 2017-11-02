import React, { Component } from 'react'; 
import AceEditor from 'react-ace-cdn';

class SpectatorEditor extends Component {
  render() {
    let { playerName, playerInput, color} = this.props;
    let editorStyle = {
      height: '400px', width: '40vw', display: 'inline-block', margin: '5px'
    }
    if(color) {
      editorStyle.borderLeft = `7px solid ${color}`;
    }
    return (
      <AceEditor
        value={playerInput}
        readOnly={true}
        name={playerName}
        mode="javascript"
        theme="monokai"
        style={editorStyle}
      />
    );
  }
}

export default SpectatorEditor;