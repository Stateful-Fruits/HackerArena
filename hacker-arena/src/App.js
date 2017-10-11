import React, { Component } from 'react';
import './Styles/App.css';
import CodeEditor from './CodeEditor.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Team Stateful Fruits</h1>
        </header>
        <CodeEditor />
        <p className="App-intro">
          Hello Team!!!
        </p>
      </div>
    );
  }
}

export default App;