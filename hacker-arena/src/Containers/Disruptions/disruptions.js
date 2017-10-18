import $ from 'jquery';

const getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
const Disruptions = {
	Wipe: function(affected, editor){
    // Clear console 
    if(editor){
      editor.setValue("Sorry");
    }
  },
  LineBomb: function(affected, editor){
    // Insert gibberish on even lines
    if(editor){
		editor.gotoLine(2);
		editor.insert("\nfspofjdsofijsfsoifjsdofijasfodijfsoafijjroijweraoeijraworiejr");
		editor.gotoLine(4);
		editor.insert("\nfspofjdsofijsfsoifjsdofijasfodijfsoafijjroijweraoeijraworiejr");
		editor.gotoLine(6);
		editor.insert("\nfspofjdsofijsfsoifjsdofijasfodijfsoafijjroijweraoeijraworiejr");
		editor.gotoLine(8);
    editor.insert("\nfspofjdsofijsfsoifjsdofijasfodijfsoafijjroijweraoeijraworiejr");
    }
  },
  Blind: function(affected, editor){
    // Turn console black
    if(editor){
      editor.getSession().setMode("ace/mode/html");
    }
    $("#".concat(affected)).css({"background": "black", "color": "black"});

    // Duration ends 
    setTimeout( () => {
      if(editor){
        editor.getSession().setMode("ace/mode/javascript");
      }
      $("#".concat(affected)).css({"background": "#272822", "color": "white"});
      // editor.setTheme("ace/theme/monokai");
    }, 5000)
	},
  Fog: function(affected, editor){
    // Blur the console
    $("#".concat(affected)).css({"filter": "blur(3px)"});
    
    // Duration ends
		setTimeout(() => {
      $("#".concat(affected)).css({"filter": "none"});
    }, 5000);
	},
  Flip: function(affected, editor){
    // Flip the console
		$("#".concat(affected)).css({"transform": "scaleX(-1)"});
    $("#".concat(affected)).css({"filter": "FlipH"});
    
    // Duration ends 
    setTimeout(() => {
      $("#".concat(affected)).css({"transform": "scaleX(1)"});
      $("#".concat(affected)).css({"filter": "none"});
    },5000)
	},
  Zoom: function(affected, editor){
    // Zooms into console
		$("#".concat(affected)).animate({
      "fontSize": "3em"
    }, 1500 )

    // Duration ends
    setTimeout(() => {
      $("#".concat(affected)).animate({
        "fontSize": "12px"
        }, 1500 )
    },6000)
	},
	Sublime: function(affected, editor){
    // Sublime popups for the next 5 seconds
      $("#".concat(affected)).keydown(function() {
        alert( "Hello! Thanks for trying out Sublime Text.\n\nThis is an unregistered evaluation version, and although the trial is untimed, a license must be purchased for continued use.\n\nWould you like to purchase a license now?" );
      })
      setTimeout(() => {
        $("#".concat(affected)).unbind('keydown');
      },5000)
	},
  Move: function(affected, editor){
  // Randomly move the console around
	let movement = setInterval( function(){
		var x = Math.round(getRandomInt(0, 800));
		var y = Math.round(getRandomInt(0, 800));
		 $("#".concat(affected)).css({
      "transition":"1s",
      "left":`${x}px`,
      "top":`${y}px`
        })
    }, 1000);
  
  // Duration ends  
  setTimeout(() => {
    clearInterval(movement);
    $("#".concat(affected)).css({
      "left":"0px",
      "top":"0px"
    })
  }, 6000);  
},
Python: function(affected, editor){
  // Change from javascript mode to python mode
  if(editor){
    editor.getSession().setMode("ace/mode/python");
  }
  
  // Duration ends
  setTimeout(() => {
    if(editor){
      editor.getSession().setMode("ace/mode/javascript");
    }
  }, 5000);
},
ActualTimeTravel: function(affected, editor){
  if(editor){
    for(let i = 0 ; i < 10 ; i++){
      editor.undo();
    }
  }
},
Kennify: function(affected, editor){
  // Change background to Kenny
  $("#".concat(affected)).css({
    "background":" url('/assets/kenny.jpg') center",
    "backgroundSize":" cover "  
  })

  setTimeout(() => {
    // editor.getSession().setMode("ace/mode/javascript");
    $("#".concat(affected)).css({"background": "#272822", "color": "white"});
    // editor.setTheme("ace/theme/monokai");
  }, 5000);
},
Charmin: function(affected, editor){
  $('.completeWaiting').append('<iframe width="560" height="315" src="https://www.youtube.com/embed/JAzqGuZfo00?autoplay=1&rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>');
  
  setTimeout(() => {
    $('iframe').remove();
  }, 28000);
}

}

export default Disruptions;