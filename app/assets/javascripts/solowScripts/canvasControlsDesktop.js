// define the context2
var canvasControls = document.getElementById("canvasControls");
var context2 = canvasControls.getContext("2d");

var desktop = true;


if(desktop) {
                    //code for Desktop browsers

	// define the ratio dimensions of the control canvas in logical pixels
	var ControlCanvasLogic = {
	    width: splitter.size,
	    height: 115
	};
}
else {
                    //code for mobile browsers

	// define the ratio dimensions of the control canvas in logical pixels
	var ControlCanvasLogic = {
	    width: $(window).width,
	    height: 170
	};
}

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
	index: 0.3,
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
	color: 70, 
	font: 25
};

var icon = { 
	refresh: { 
		x: iconDefaults.x,
		y: iconDefaults.y,
		hover: iconDefaults.hover,
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
		color: iconDefaults.color,
		font: iconDefaults.font,
		symbol: "\uf00e",
		string: "Zoom In"
	},
	ZoomOut: { 
		x: iconDefaults.x,
		y: iconDefaults.y,
		hover: iconDefaults.hover,
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

						title.setTransStatus(text.refresh);

						title.upgradeStatus(window.location.pathname + "-" + "refresh", "refresh", false);

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
	}
}
	

var structure = { 
	ratio: 0.7,
	buttonPadding: 0.28,
	refreshRatio: 2.4,
	verticalRatio: 0.6,
	iconPadding: 0.31,
	buttonDistanceX: 0,
	halfHeight: ControlCanvasLogic.height/2,
	iconDistance: 0
}

if(desktop) {

	canvasControls.addEventListener('mousemove', function(evt) {

		m.c.pos = getMousePos(canvasControls, evt);
		buttons.s.updateHoverStatus();
		icon.hoverUpdate();
      
        for (var index in buttons) {  
            
            if(buttons[index].topD) {
				buttons[index].colorTop = (color.g2);
				m.newCursorBody = "pointer";
				v[index].lineEasing.Large = true;
     		    title.setTransStatus(text[v.property(v.index(index)-4)].increase);
			}
			else {
				buttons[index].colorTop = (color.g1);
			}

			if(buttons[index].botD) {
				buttons[index].colorBottom = (color.g2);
				m.newCursorBody = "pointer";
				v[index].lineEasing.Large = true;
     		    title.setTransStatus(text[v.property(v.index(index)-4)].decrease);
			}
			else {
				buttons[index].colorBottom = (color.g1);
			}

			if(buttons[index].midD) {
				v[index].lineEasing.Large = true;
     		    title.setTransStatus(text.inputVar[v.midName(index)]);

     		}
        }

		for(i=0; i<3; i++) {
			if(icon[Object.keys(icon)[i]].hover) {
				m.newCursorBody = "pointer";
				icon[Object.keys(icon)[i]].color = 100;
				icon[Object.keys(icon)[i]].font = iconDefaults.font+1;
       		    title.setTransStatus(icon[Object.keys(icon)[i]].string);
			}
			else { 
				icon[Object.keys(icon)[i]].font = iconDefaults.font;;
				icon[Object.keys(icon)[i]].color = iconDefaults.color;
			}
		}


        // Set the swtch to false if the mouse is out of the button regions
        if(buttons["s"].topD === false && buttons["d"].topD === false && buttons["t"].topD === false && buttons["s"].botD === false && buttons["d"].botD === false && buttons["t"].botD === false && buttons["s"].midD === false && buttons["d"].midD === false && buttons["t"].midD === false && icon.refresh.hover === false && icon.ZoomIn.hover === false && icon.ZoomOut.hover === false) { 
        	title.revertTransStatus();
        }

		if(buttons.s.topD===false && buttons.d.topD===false && buttons.t.topD===false && buttons.s.botD===false && buttons.d.botD===false && buttons.t.botD===false && buttons.s.midD===false && buttons.d.midD===false && buttons.t.midD===false && icon.refresh.hover === false && icon.ZoomIn.hover === false && icon.ZoomOut.hover === false) {

			m.newCursorBody = "auto";

			v.s.lineEasing.Large = false;
			v.d.lineEasing.Large = false;
			v.t.lineEasing.Large = false;
		}


	}, false);



	canvasControls.addEventListener('mousedown', function() { 

        buttonListener("s", v.savings, ease.shift.savingsRatio*ease.shift.size);
        buttonListener("d", v.dep, ease.shift.size); 
        buttonListener("t", v.tech, v.tech*ease.shift.proportionA);

        icon.listener("refresh");
        icon.listener("ZoomIn");
        icon.listener("ZoomOut");
	
	}, false);




}




if(desktop===false) {

  canvasControls.addEventListener("touchstart", function(evt) {

	var e = event;
    m.c.touch.x = e.targetTouches[0].pageX - canvasControls.offsetLeft;
    m.c.touch.y = e.targetTouches[0].pageY - canvasControls.offsetTop;

	buttonTouchPosUpdate();

        buttonTouch("s", v.savings, ease.shift.savingsRatio*ease.shift.size);
        buttonTouch("d", v.savings, ease.shift.size);
        buttonTouch("d", v.savings, v.tech*ease.shift.proportionA);
    
  }, false);

  canvasControls.addEventListener("touchend", function() {

	for (i = 0; i < buttons.length; i++) {

		if(buttons[i].topM) {
			buttons[i].colorTop = grey(color.g1);
		}

		if(buttons[i].botM) {
			buttons[i].colorBottom = grey(color.g1);
		}
	}

  }, false);

}

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

if (desktop) {


	drawIcons();


	for (var i in buttons) {
		if(buttons[i.toString()].colorTop>(color.g2)) {
			buttons[i.toString()].colorTop -= (color.g3 - color.g2)/15;
		}

		if(buttons[i.toString()].colorBottom>(color.g2)) {
			buttons[i.toString()].colorBottom -= (color.g3 - color.g2)/15;
		}
	}

	buttons.s.index = v.savings;
	buttons.d.index = v.dep;
	buttons.t.index = v.tech/v.t.max;

	buttons.s.alpha = (v.s.lineRatio + v.s.clickBonus/2 - 1)/2 + 0.1;
	buttons.d.alpha = (v.d.lineRatio + v.d.clickBonus/2 - 1)/2 + 0.1;

	if(m.alphaHover === false) {
		buttons.t.alpha = (v.t.lineRatio + v.t.clickBonus/2 - 1)/2 + 0.1;
	}

	if(m.tag !== "canvasControls") { 
		for (var index in buttons) {      
			buttons[index].colorBottom = (color.g1);
			buttons[index].colorTop = (color.g1);
		}
	}

}

buttons.s.draw()
buttons.d.draw()
buttons.t.draw()


}






