// define the context2
var canvasControls = document.getElementById("canvasControls");
var context2 = canvasControls.getContext("2d");

var desktop = false;

// define the ratio dimensions of the control canvas in logical pixels
var ControlCanvasLogic = {
    width: $(window).width,
    height: 115
};

var devicePixelRatio2 = window.devicePixelRatio || 1;

var backingStoreRatio2 = context1.webkitBackingStorePixelRatio || context1.mozBackingStorePixelRatio || context1.msBackingStorePixelRatio || context1.oBackingStorePixelRatio ||context1.backingStorePixelRatio || 1;


var GraphCanvasDisplayRatio2 = (devicePixelRatio2 / backingStoreRatio2)*1;


var controlPadding = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10
};

var now2 = Date.now();       

var buttonsDefault = {
	Y: 15,
	W: 20,
	H: 75,
	lWidth: 0.4,
	lineColor: (color.g2),
	ratio1: 0.4,
 	ratio2: 0.3,
	ratio3: 0.2,
	font: "Helvetica",
	fontRatio: 1,

	ind: function(i) {
     return Object.keys(this)[i];
    },

 	draw: function() {
 		drawButton(this.X, this.Y, this.letter, this.W, this.H, this.lWidth, this.alpha, grey(this.colorTop), grey(this.colorBottom), grey(this.lineColor), this.fillColor, this.ratio1, this.ratio2, this.ratio3, this.font, this.fontRatio, this.index)
 	},

 	updateHoverStatus: function() {
 		buttonPosUpdate();
 	}
};

var buttons = {}

buttons.s = Object.create(buttonsDefault);
jQuery.extend(buttons.s, {
	X: 60,
	letter: "S",
	alpha: 0.1,
	colorTop: (color.g1),
	colorBottom: (color.g1),
	lineColor: (color.g2),
	fillColor: v.s.color.string,
	index: 0.3,
	topD: false,
	midD: false,
	botD: false,
	topM: false,
	botM: false
});

buttons.d = Object.create(buttonsDefault);
jQuery.extend(buttons.d, {
	X: 120,
	letter: "δ",
	alpha: 0.1,
	colorTop: (color.g1),
	colorBottom: (color.g1),
	lineColor: (color.g2),
	fillColor: v.d.color.string,
	index: 0.3,
	topD: false,
	midD: false,
	botD: false,
	topM: false,
	botM: false
});

buttons.t = Object.create(buttonsDefault);
jQuery.extend(buttons.t, {
	X: 180,
	letter: "A",
	alpha: 0.1,
	colorTop: (color.g1),
	colorBottom: (color.g1),
	lineColor: (color.g2),
	fillColor: v.t.color.string,
	index: 0.6,
	topD: false,
	midD: false,
	botD: false,
	topM: false,
	botM: false
});


var butArray = ["s", "d", "t"];

var iconDefaults = { 
	x: 0, 
	y: 0, 
	hover: false, 
	touch: false,
	color: 80, 
	font: 22
};

var icon = { 
	refresh: { 
		x: iconDefaults.x,
		y: iconDefaults.y,
		hover: iconDefaults.hover,
		touch: iconDefaults.touch,
		color: iconDefaults.color,
		font: iconDefaults.font,
		symbol: "\uf021",
		string: "Refresh",

		shift: { 
	        swtch: false,
	        startTime: 0,
	        current: 0,
	        sStart: 0,
	        distance: 180,
	        angle: 0,
	        speed: 1
		}
	},
	ZoomIn: {
		x: iconDefaults.x,
		y: iconDefaults.y,
		hover: iconDefaults.hover,
		touch: iconDefaults.touch,
		color: iconDefaults.color,
		font: iconDefaults.font,
		symbol: "\uf00e",
		string: "Zoom In"
	},
	ZoomOut: { 
		x: iconDefaults.x,
		y: iconDefaults.y,
		hover: iconDefaults.hover,
		touch: iconDefaults.touch,
		color: iconDefaults.color,
		font: iconDefaults.font,
		symbol: "\uf010",
		string: "Zoom Out"
	},

	hoverUpdate: function() {

	 for(i=0; i<3; i++) {
	 	if(this[Object.keys(this)[i]].x + iconDefaults.font/2 > m.c.pos.x && this[Object.keys(this)[i]].x - iconDefaults.font/2<m.c.pos.x && this[Object.keys(this)[i]].y - iconDefaults.font/2<m.c.pos.y && this[Object.keys(this)[i]].y + iconDefaults.font/2>m.c.pos.y) {
	 		this[Object.keys(this)[i]].hover = true;
	 	}
	 	else { 
	 		this[Object.keys(this)[i]].hover = false;
	 	}
	 }

	 if(ease.zoom.inAllow === false) { 
	   this.ZoomIn.hover = false;
     }

	}, 

	listener: function(iconInput) { 

		if(ease.zoom.inAllow === false) { 
		  this.ZoomIn.hover = false;
		}

		if(this[iconInput].hover) { 

			switch (iconInput) { 
				case "refresh":
					if(refreshTest()) {
						refresh();
						icon.refresh.shift.startTime = Date.now();
						icon.refresh.shift.sStart = 0;
						icon.refresh.shift.distance = 180;
						icon.refresh.shift.swtch = true;
					}	
				break;
				case "ZoomIn":
					ease.zoom.ease(1 + ease.zoom.proportion);

					if(icon.ZoomIn.font<iconDefaults.font + 5) {
						icon.ZoomIn.font += 1;
					}
				break;
				case "ZoomOut":
					ease.zoom.ease(1 - ease.zoom.proportion);

					if(icon.ZoomOut.font>iconDefaults.font - 5) {
						icon.ZoomOut.font -= 1;
					}
				break;
				default:
				// do nothing
			}

		}
	},

	touch: function(iconInput) { 

		symbolTouchUpdate();

		 if(ease.zoom.inAllow === false) { 
		   this.ZoomIn.touch = false;
	     }

     	if(this[iconInput].touch) { 

			switch (iconInput) { 
				case "refresh":
					if(refreshTest()) {
						refresh();
						icon.refresh.shift.startTime = Date.now();
						icon.refresh.shift.sStart = 0;
						icon.refresh.shift.distance = 180;
						icon.refresh.shift.swtch = true;
					}	
				break;
				case "ZoomIn":
					ease.zoom.ease(1 + ease.zoom.proportion);
				break;
				case "ZoomOut":
					ease.zoom.ease(1 - ease.zoom.proportion);
				break;
				default:
				// do nothing
			}

		}

	}
}
	


var structure = { 
	ratio: 0,
	buttonPadding: 0.27,
	refreshRatio: 1.85,
	verticalRatio: 0.5,
	iconPadding: 0.35,
	buttonDistanceX: 0,
	halfHeight: ControlCanvasLogic.height/2,
}


document.addEventListener('touchmove', function(event) {
   if(event.target.parentNode.className.indexOf('noBounce') != -1 
|| event.target.className.indexOf('noBounce') != -1 ) {
    event.preventDefault(); }
}, false);


  canvasControls.addEventListener("touchstart", function(evt) {

	var e = event;
    m.c.touch.x = e.targetTouches[0].pageX - canvasControls.offsetLeft;
    m.c.touch.y = e.targetTouches[0].pageY - canvasControls.offsetTop;

	buttonTouchPosUpdate();

    buttonTouch("s", v.savings, ease.shift.savingsRatio*ease.shift.size);
    buttonTouch("d", v.dep, ease.shift.size);
    buttonTouch("t", v.tech, v.tech*ease.shift.proportionA);

    icon.touch("refresh")
    icon.touch("ZoomIn")
    icon.touch("ZoomOut")

    
  }, false);



 $("#back").on("tap", function(){
  if(title.nav.back) {
    title.logIndex -= 1;
    title.pushStatus(title.log[title.logIndex -1][0]);
    title.ajaxStatus = title.log[title.logIndex - 1][1];
    $("#textTitle").text(title.log[title.logIndex -1][0])
    $("#textDiv").html("");
    for(i=3; i<title.log[title.logIndex-1].length; i++) {
      $("#textDiv").append("<p class=\"textPara\">" + title.log[title.logIndex-1][i] + "</p>");
    }
    $(".tooltipClass").tooltip();
  } 
})

$("#forward").on("tap", function(){
  if(title.nav.forward) {
    title.logIndex += 1;
    title.pushStatus(title.log[title.logIndex -1][0]);
    title.ajaxStatus = title.log[title.logIndex - 1][1];
    $("#textTitle").text(title.log[title.logIndex -1][0])
    $("#textDiv").html("");
    for(i=3; i<title.log[title.logIndex -1].length; i++) {
      $("#textDiv").append("<p class=\"textPara\">" + title.log[title.logIndex -1][i] + "</p>");
    }
    $(".tooltipClass").tooltip();
  } 
})




resizecanvasControls()

window.addEventListener("resize", resizecanvasControls, false);
	
	function gameLoop2() {
		requestAnimFrame(gameLoop2);
		drawScreen2();
	}

	gameLoop2();

	function drawScreen2() {

whiteRefresh2();

now2 = Date.now();


drawIcons();


for (var but in buttons) {
	if(buttons[but].colorTop>(color.g1)) {
		buttons[but].colorTop -= (color.g3 - color.g1)/8;
		if(buttons[but].colorTop<(color.g1)) {
			buttons[but].colorTop = color.g1;
		}
	}

	if(buttons[but].colorBottom>(color.g1)) {
		buttons[but].colorBottom -= (color.g3 - color.g1)/8;
		if(buttons[but].colorBottom<(color.g1)) {
			buttons[but].colorBottom = color.g1;
		}
	}
}


buttons.s.index = v.savings;
buttons.d.index = v.dep;
buttons.t.index = v.tech/v.t.max;

buttons.s.draw()
buttons.d.draw()
buttons.t.draw()



}






