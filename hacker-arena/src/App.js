import React, { Component } from 'react';
import fire from './firebase';
import fillDb from './fillDb'
import './Styles/App.css';
import CodeEditor from './Containers/CodeEditor.js';

class App extends Component {

  componentWillMount() {
    // fillDb();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Team Stateful Fruits</h1>
        </header>
        <p className="App-intro">
          Hello Team!!!
        </p>
        <CodeEditor />
        <div>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default App;