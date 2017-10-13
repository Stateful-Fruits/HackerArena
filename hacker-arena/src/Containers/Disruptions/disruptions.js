import $ from 'jquery';
const Disruptions = {
  getRandomInt: function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  },
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
    $("#editor").css({"background": "black", "color": "black"});

    // Duration ends 
    setTimeout( () => {
      editor.getSession().setMode("ace/mode/javascript");
      $("#editor").css({"background": "none", "color": "white"});
    }, 5000)
	},
  Fog: function(){
    // Blur the console
    $('#editor').css({"filter": "blur(3px)"});
    
    // Duration ends
		setTimeout(() => {
      $('#editor').css({"filter": "none"});
    }, 5000);
	},
  Flip: function(){
    // Flip the console
		$("#editor").css({"transform": "scaleX(-1)"});
    $("#editor").css({"filter": "FlipH"});
    
    // Duration ends 
    setTimeout(() => {
      $("#editor").css({"transform": "scaleX(-1)"});
      $("#editor").css({"filter": "none"});
    },5000)
	},
  Zoom: function(){
    // Zooms into console
		$("#editor").animate({
    "width" : "70%",
    "marginLeft": "0.6in",
    "fontSize": "3em",
    "borderWidth": "10px"
    }, 1500 )

    // Duration ends
    $("#editor").stop();
	},
	Sublime: function(){
    // Sublime popups for the next 5 times the user types
    let counter = 5;
    while (counter > 0){
      $( "#editor" ).keydown(function() {
        alert( "Hello! Thanks for trying out Sublime Text.\n\nThis is an unregistered evaluation version, and although the trial is untimed, a license must be purchased for continued use.\n\nWould you like to purchase a license now?" );
      })
      counter--;
    }
    $("#editor").unbind('keydown');
	},
  Move: function(){
  // Randomly move the console around
	let movement = setInterval( function(){
		var x = Math.round(this.getRandomInt(0, 800));
		var y = Math.round(this.getRandomInt(0, 800));
		 $("#editor").css({
      "transition":"1s",
      "left":`${x}px`,
      "top":`${y}px`
        })
    }, 1000);
  
  // Duration ends  
  setTimeout(() => {
    clearInterval(movement);
    $("#editor").css({
      "left":"0px",
      "top":"0px"
    })
  }, 5000);  
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
Kennify: function(){
  // Change background to Kenny
  $("#editor").css({
    "background":" url(./kenny.jpg) center",
    "backgroundSize":" cover "  
  })

  setTimeout(() => {
    $("#editor").css({
      "background": "none" 
    })
  }, 5000);
}

}

export default Disruptions;