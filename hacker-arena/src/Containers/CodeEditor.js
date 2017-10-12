import ReactAce from 'react-ace-editor';
import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import '../Styles/CodeEditor.css';
 
class CodeEditor extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    // const editor = this.ace.editor;
    // editor.setTheme("ace/theme/monokai");
    // editor.getSession().setMode("ace/mode/javascript");
  }

  // NEEDS TO TAKE INPUT CODE OF EDITOR,
  // UTILIZE ROOM.PROBLEM.TESTCASES TO GRAB TEST RESULTS
  // SET TEST RESULTS IN ROOM DATABASE 

  handleSubmit(){
    //TEST SUITE
    // place here
    
    // ACE CONSOLE
    let code = this.ace.editor.getValue();
    // Function to handle console.logs in the aceConsole
    let newLog = function(...theArgs){
      let results = "";
      let args = [].slice.call(arguments);
      args.forEach( argument => {
        results += eval("'" + argument + "'");
      })
      //Replace with append to aceConsole
      // return results;
      // console.log(results);
      // return results;
      $('#aceConsole').append(`<li id="log">${results}</li>`);
    }

    let consoleLogChange = "let console = {}\nconsole.log=" + newLog + "\n";
    let newCode = consoleLogChange + code;

    try { 
      // eslint-disable-next-line
      $('#aceConsole').append(`<li>${eval(newCode)}</li>`);
    } catch (e) {
      $('#aceConsole').append(`<li>undefined</li>`);
    }
    // DISRUPTION TESTS
    // $('#canvas').css({"filter": "blur(3px)"})
    // $("#canvas").css({"transform": "scaleX(-1)"});
    // $("#ace-editor").css({"background": "black", "color": "black"})
  }
  

  render() {
    return (
      <div>
          <ReactAce
            mode="javascript"
            theme="monokai"
            style={{ height: '400px', width: '50vw' }}
            ref={instance => { this.ace = instance; }} // Let's put things into scope
          />
        <button onClick={this.handleSubmit}> SUBMIT </button>
        <ul id="aceConsole"></ul>
      </div>
    );
  }
}

export default CodeEditor;