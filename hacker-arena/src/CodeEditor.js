import ReactAce from 'react-ace-editor';
import React from 'react';
import $ from 'jquery';
import './Styles/CodeEditor.css';
 
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
    let code = this.ace.editor.getValue();
    // console.log(code);
    // let answer = (eval(code));
    try { 
      $('#aceConsole').append(`<li>${eval(code)}</li>`);
      //console.log(eval(code));
    } catch (e) {

      $('#aceConsole').append(`<li>undefined</li>`);
      // console.log(undefined);
    }
    // $('#canvas').css({"filter": "blur(3px)"})
    // $("#canvas").css({"transform": "scaleX(-1)"});
    // $("#ace-editor").css({"background": "black", "color": "black"})
  }

  // onChange(newValue, e) {
  //   console.log(newValue, e);
 
  //   const editor = this.ace.editor; // The editor object is from Ace's API
  //   console.log(editor.getValue()); // Outputs the value of the editor
  // }
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