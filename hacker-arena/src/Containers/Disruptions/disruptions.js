import $ from 'jquery';

const getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
const Disruptions = {
	Wipe: function(editor){
    // Clear console 
		editor.setValue("Sorry");
  },
  LineBomb: function(editor){
    // Insert gibberish on even lines
		editor.gotoLine(2);
		editor.insert("\nfspofjdsofijsfsoifjsdofijasfodijfsoafijjroijweraoeijraworiejr");
		editor.gotoLine(4);
		editor.insert("\nfspofjdsofijsfsoifjsdofijasfodijfsoafijjroijweraoeijraworiejr");
		editor.gotoLine(6);
		editor.insert("\nfspofjdsofijsfsoifjsdofijasfodijfsoafijjroijweraoeijraworiejr");
		editor.gotoLine(8);
		editor.insert("\nfspofjdsofijsfsoifjsdofijasfodijfsoafijjroijweraoeijraworiejr");
  },
  Blind: function(editor){
    // Turn console black
	  editor.getSession().setMode("ace/mode/html");
    $("#ace-editor").css({"background": "black", "color": "black"});

    // Duration ends 
    setTimeout( () => {
      editor.getSession().setMode("ace/mode/javascript");
      $("#ace-editor").css({"background": "#272822", "color": "white"});
      // editor.setTheme("ace/theme/monokai");
    }, 5000)
	},
  Fog: function(){
    // Blur the console
    $('#ace-editor').css({"filter": "blur(3px)"});
    
    // Duration ends
		setTimeout(() => {
      $('#ace-editor').css({"filter": "none"});
    }, 5000);
	},
  Flip: function(){
    // Flip the console
		$("#ace-editor").css({"transform": "scaleX(-1)"});
    $("#ace-editor").css({"filter": "FlipH"});
    
    // Duration ends 
    setTimeout(() => {
      $("#ace-editor").css({"transform": "scaleX(1)"});
      $("#ace-editor").css({"filter": "none"});
    },5000)
	},
  Zoom: function(){
    // Zooms into console
		$("#ace-editor").animate({
      "fontSize": "3em"
    }, 1500 )

    // Duration ends
    setTimeout(() => {
      $("#ace-editor").animate({
        "fontSize": "12px"
        }, 1500 )
    },6000)
	},
	Sublime: function(){
    // Sublime popups for the next 5 seconds
      $("#ace-editor").keydown(function() {
        alert( "Hello! Thanks for trying out Sublime Text.\n\nThis is an unregistered evaluation version, and although the trial is untimed, a license must be purchased for continued use.\n\nWould you like to purchase a license now?" );
      })
      setTimeout(() => {
        $("#ace-editor").unbind('keydown');
      },5000)
	},
  Move: function(){
  // Randomly move the console around
	let movement = setInterval( function(){
		var x = Math.round(getRandomInt(0, 800));
		var y = Math.round(getRandomInt(0, 800));
		 $("#ace-editor").css({
      "transition":"1s",
      "left":`${x}px`,
      "top":`${y}px`
        })
    }, 1000);
  
  // Duration ends  
  setTimeout(() => {
    clearInterval(movement);
    $("#ace-editor").css({
      "left":"0px",
      "top":"0px"
    })
  }, 6000);  
},
Python: function(editor){
  // Change from javascript mode to python mode
  editor.getSession().setMode("ace/mode/python");
  
  // Duration ends
  setTimeout(() => {
    editor.getSession().setMode("ace/mode/javascript");
  }, 5000);
},
ActualTimeTravel: function(editor){
  for(let i = 0 ; i < 10 ; i++){
    editor.undo();
  }
},
Kennify: function(editor){
  // Change background to Kenny
  $("#ace-editor").css({
    "background":" url('/assets/kenny.jpg') center",
    "backgroundSize":" cover "  
  })

  setTimeout(() => {
    // editor.getSession().setMode("ace/mode/javascript");
    $("#ace-editor").css({"background": "#272822", "color": "white"});
    // editor.setTheme("ace/theme/monokai");
  }, 5000);
}

}

export default Disruptions;