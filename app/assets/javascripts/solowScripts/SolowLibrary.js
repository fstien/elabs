// Add a CSS property to the cell class if the browser is not firefox
var isFirefox = typeof InstallTrigger !== 'undefined';   
var fireShift = 0;

if(isFirefox) { 
  $(".symbol").css("padding-top", 5);
  fireShift = 4;
}
else { 
  $(".cell").css("display", "inline-block");
}


// define the parameters of the requestanimationframe
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame		  ||
		   window.webkitRequestAnimationFrame ||
		   window.mozRequestAnimationFrame	  ||
		   function(callback) {
			window.setTimeout(callback, 20);
		   };
	})();


// the function that draws functions
function Graph(func, color, precision, width) {
 var xx, yy, dx=1/precision, x0=padding.left, y0=padding.top + ID.height, scale=graphScale;
 var iMax = Math.round((ID.width)/dx);
 var iMin = 0;
 context1.beginPath();
 context1.lineWidth = width;
 context1.strokeStyle = color;

 for (var i=iMin;i<=iMax;i++) {
  xx = dx*i; yy = scale*func(xx/scale);
     if (y0-yy>padding.top) {
  if (i==iMin) context1.moveTo(x0+xx,y0-yy);
  else         context1.lineTo(x0+xx,y0-yy);
 }
 }
 context1.stroke();
};


// the function that displays the axes
function showAxes() {
 var x0=padding.left, w=context1.canvas.width;
 var y0=padding.top + ID.height, h=context1.canvas.height;
 var xmin = ID.axesNegative ? 0 : x0;

 context1.beginPath();

context1.lineWidth="0";
context1.fillStyle = "#FDFDFD";
context1.fillRect(plotX(0),plotY(1),plotX(1)-padding.left,plotX(1)-padding.left);

context1.stroke();
context1.closePath();

 context1.beginPath();
 context1.strokeStyle = ID.axesColor;
 context1.lineWidth = lineWidth.axes;
 context1.lineCap = 'round';
 context1.moveTo(xmin,y0);
 context1.lineTo(padding.left+ID.width,y0);  // X axis
 context1.moveTo(x0,padding.top);
 context1.lineTo(x0,y0);  // Y axis
 context1.stroke();
};

function dottedIndex() {

context1.strokeStyle = grey(color.g2);
context1.setLineDash([10, 8]);

if(desktop) {
  context1.lineWidth = 1;
}
else {
  context1.lineWidth = 0.5;
}
context1.beginPath();

if(inter.b.x < max.x) {
  if(inter.b.y < max.y) {
    context1.moveTo(plotX(inter.b.x), padding.top + ID.height)
    context1.lineTo(plotX(inter.b.x),plotY(inter.b.y))
  }
  else {
    context1.moveTo(plotX(inter.b.x), padding.top + ID.height)
    context1.lineTo(plotX(inter.b.x), padding.top)
  }
}
if(inter.b.y < max.y) {

   if(inter.b.x < max.x) {
      context1.moveTo( padding.left, plotY(inter.b.y) )
      context1.lineTo( plotX(inter.b.x),plotY(inter.b.y))    }
    else {
      context1.moveTo( padding.left, plotY(inter.b.y) )
      context1.lineTo( (canvasGraph.width/GraphCanvasDisplayRatio) - padding.right, plotY(inter.b.y))
    }
}
if(inter.a.y < max.y) {
    if(inter.b.x < max.x) {
      context1.moveTo( padding.left, plotY(inter.a.y) )
      context1.lineTo(plotX(inter.a.x),plotY(inter.a.y))
    }
    else {
      context1.moveTo( padding.left, plotY(inter.a.y) )
      context1.lineTo( (canvasGraph.width/GraphCanvasDisplayRatio) - padding.right, plotY(inter.a.y))
    }
}

context1.stroke();
context1.closePath();

if(desktop) {
  context1.setLineDash([1000, 1]);
}
else {
  context1.setLineDash([1]);
}

}


var xIndexShift, yIndexShift1, yIndexShift2;

function unitIndex(index) {

context1.beginPath();

context1.strokeStyle = grey(color.g2);
context1.lineWidth = index;
context1.beginPath();
context1.moveTo(plotX(index), padding.top + ID.height);
context1.lineTo(plotX(index),plotY(index));
context1.lineTo(padding.left, plotY(index));

context1.stroke();
context1.closePath();

context1.beginPath();

context1.font = font.index + "px Helvetica";


context1.fillStyle = grey(color.g2);
context1.strokeStyle = grey(color.g2);;

context1.textAlign="center"; 
context1.textBaseline="hanging"; 


// The X-Axis 1 
if( plotX(inter.b.x) < plotX(1) - font.index || plotX(inter.b.x) > plotX(1) + font.index ) {
 context1.fillText("1", plotX(1), canvasGraph.height/GraphCanvasDisplayRatio - padding.bottom + font.index*font.paddingRatio);
}


context1.fillStyle = grey(m.g.indexColor.k);
context1.font = font.index*m.g.indexSize.k + "px Helvetica";

// The X-Axis steady state level of capital
if(inter.b.x < max.x) {
 context1.fillText(round10fixed(inter.b.x), plotX(inter.b.x), canvasGraph.height/GraphCanvasDisplayRatio - padding.bottom + font.index*font.paddingRatio);
}

context1.fillStyle = grey(color.g2);
context1.font = font.index + "px Helvetica";

// The 0
context1.fillText("0", padding.left - font.index, canvasGraph.height/GraphCanvasDisplayRatio - padding.bottom + font.index*font.paddingRatio);

context1.textAlign="end"; 
context1.textBaseline="middle";


context1.fillStyle = grey(color.g2);

// The Y-Axis 1 
if((plotY(inter.b.y) < plotY(1) - font.index || plotY(inter.b.y) > plotY(1) + font.index) && (plotY(inter.a.y) < plotY(1) - font.index || plotY(inter.a.y) > plotY(1) + font.index)) {
  context1.fillText("1", padding.left - font.index*font.paddingRatio, plotY(1));
}

context1.fillStyle = grey(m.g.indexColor.y);
context1.font = font.index*m.g.indexSize.y + "px Helvetica";

// The Y-Axis steady state level of output 
if(inter.b.y < max.y) {
 context1.fillText(round10fixed(inter.b.y), padding.left - font.index*font.paddingRatio, plotY(inter.b.y))
}

context1.fillStyle = grey(m.g.indexColor.i);
context1.font = font.index*m.g.indexSize.i + "px Helvetica";


// The Y-Axis steady state level of investment 
if(inter.a.y < max.y && (inter.a.y + font.index/v.unit < inter.b.y)) {
 context1.fillText(round10fixed(inter.a.y), padding.left - font.index*font.paddingRatio, plotY(inter.a.y))
}

context1.textAlign="start"; 
context1.textBaseline="hanging"; 
// The X axis name

context1.fillStyle = grey(m.g.indexColor.K);
context1.font = font.index*font.indexRatio*m.g.indexSize.K + "px Helvetica";

context1.fillText(text.index.x, canvasGraph.width/GraphCanvasDisplayRatio - padding.right + font.index/2, canvasGraph.height/GraphCanvasDisplayRatio - padding.bottom + font.index*font.paddingRatio)

context1.textAlign="end"; 
context1.textBaseline="alphabetic"; 

context1.fillStyle = grey(m.g.indexColor.Y);
context1.font = font.index*font.indexRatio*m.g.indexSize.Y + "px Helvetica";

// The Y axis name
context1.fillText(text.index.y, padding.left - 1.2*font.index*font.paddingRatio, padding.top - font.index/2)

context1.fillStyle = grey(color.g2);


context1.stroke();
context1.closePath();

}

function getlength(number) {
    return number.toString().length;
}


// the margin above the canvasGraph used for centering vertically which is defined in the function
var marginTop, oldWidth, oldHeight, graphScale, key;

// the function that computes the size of the div and resized the canvasGraph
function resizecanvasGraph() {

  canvasLogic.width = canvasGraph.width/GraphCanvasDisplayRatio;
  canvasLogic.height = canvasGraph.height/GraphCanvasDisplayRatio;


  if(desktop) {

    $("#container").height($(window).height() - menuHeight);
    divGraph.width = myLayout.center.state.layoutWidth;
    divGraph.height = $("#container").height();
    ratio.div = divGraph.height/divGraph.width;
  }
  else {

    divGraph.width = $(window).width();
    divGraph.height = divGraph.width*ratio.canvasGraph + 0.01;
    ratio.div = divGraph.height/divGraph.width;
  }

  if(divGraph.width>sizeLimit.width && divGraph.height>sizeLimit.height) {

    if (ratio.div>ratio.canvasGraph) {

     canvasLogic.width = divGraph.width;
     ID.width = divGraph.width - (padding.left + padding.right);
     ID.height = ratio.curves*ID.width;
     canvasLogic.height = ID.height + (padding.top + padding.bottom);
     graphScale = ID.height*ID.scale/10;

    }

    if (ratio.div<ratio.canvasGraph) {

     canvasLogic.height = divGraph.height;
     ID.height = divGraph.height - (padding.top + padding.bottom);
     ID.width = ID.height/ratio.curves;
     canvasLogic.width = ID.width + (padding.left + padding.right);
     graphScale = ID.height*ID.scale/10;

    }

    if(desktop) {
      marginTop = ((divGraph.height)-(canvasLogic.height))/2;
      $("#canvasGraph").css('margin-top', marginTop);
    }

  };


 oldWidth = canvasLogic.width;
 oldHeight = canvasLogic.height;

 canvasGraph.width = oldWidth * GraphCanvasDisplayRatio;
 canvasGraph.height = oldHeight * GraphCanvasDisplayRatio;

 canvasGraph.style.width = oldWidth + 'px';
 canvasGraph.style.height = oldHeight + 'px';

 context1.scale(GraphCanvasDisplayRatio, GraphCanvasDisplayRatio);


 // define the width properties of the axes and graph
 lineWidth.axes = Math.round((Math.sqrt(ID.width*ID.lineBasis/10)));
 lineWidth.graph = Math.round(Math.sqrt(ID.width*ID.lineBasis*ID.lineGraphRatio/10));

  if(desktop) {

  font.index = lineWidth.graph*font.indexScale;

    if(font.index>font.table) {
      font.index = font.table;
    }
  }

};


// the function that resizes the canvasControls
var oldWidth2, containerWidth, textHeight;

function resizecanvasControls() {

  if(desktop) {
    containerWidth = myLayout.east.state.layoutWidth;
  }
  else {
    containerWidth = $(window).width();
  }

  canvasControls.width = containerWidth*GraphCanvasDisplayRatio2;

  ControlCanvasLogic.width = canvasControls.width/GraphCanvasDisplayRatio2;
  oldWidth2 = ControlCanvasLogic.width;

 canvasControls.width = oldWidth2 * GraphCanvasDisplayRatio2;
 canvasControls.height = ControlCanvasLogic.height * GraphCanvasDisplayRatio2;

 canvasControls.style.width = oldWidth2 + 'px';
 canvasControls.style.height = ControlCanvasLogic.height + 'px';

 context2.scale(GraphCanvasDisplayRatio2, GraphCanvasDisplayRatio2);


for (i = 0; i < buttons.length; i++) {
  buttons[i].X = (containerWidth/(buttons.length+1))*(i+1);
}


if(desktop) {
 textHeight = $(window).height() - $("#text").offset().top;
  $("#text").height(textHeight);
}


  icon.ZoomIn.x = (canvasControls.width/GraphCanvasDisplayRatio2) - (canvasControls.height/GraphCanvasDisplayRatio2)*structure.iconPadding;
  icon.ZoomIn.y = (canvasControls.height/GraphCanvasDisplayRatio2)*structure.iconPadding;

  icon.ZoomOut.x = (canvasControls.width/GraphCanvasDisplayRatio2) - (canvasControls.height/GraphCanvasDisplayRatio2)*structure.iconPadding;
  icon.ZoomOut.y = (canvasControls.height/GraphCanvasDisplayRatio2)*(1 - structure.iconPadding);

  icon.refresh.x = (canvasControls.width/GraphCanvasDisplayRatio2) - structure.refreshRatio*(canvasControls.height/GraphCanvasDisplayRatio2)*structure.iconPadding;
  icon.refresh.y = (canvasControls.height/GraphCanvasDisplayRatio2)*structure.iconPadding;


  if(desktop) {
   structure.ratio = (icon.refresh.x - (canvasControls.height/GraphCanvasDisplayRatio2)*structure.iconPadding*0.5)/(canvasControls.width/GraphCanvasDisplayRatio2);
  }
  else { 
   structure.ratio = (icon.refresh.x + 1.5*buttonsDefault.W - (canvasControls.height/GraphCanvasDisplayRatio2)*structure.iconPadding*0.5)/(canvasControls.width/GraphCanvasDisplayRatio2);
  }

  for(i=0; i<=2; i++) {

    buttons[butArray[i]].X = ((canvasControls.width/GraphCanvasDisplayRatio2)*structure.ratio)*(1 - 2*structure.buttonPadding)*i/2 + structure.buttonPadding*(canvasControls.width/GraphCanvasDisplayRatio2)*structure.ratio;

    buttons[butArray[i]].Y = ((canvasControls.height/GraphCanvasDisplayRatio2) - buttons[butArray[i]].H)*structure.verticalRatio;

  }

if(desktop === false) {
  structure.buttonDistanceX = buttons.d.X - buttons.s.X;
}

};


// the white refresh function that sets the whole canvasGraph to white
function whiteRefresh () {
context1.beginPath();
context1.fillStyle = "white";
context1.fillRect(0,0,canvasGraph.width,canvasGraph.height);
}

function whiteRefresh2 () {
context2.beginPath();
context2.fillStyle = "#FDFDFD";
context2.fillRect(0,0,canvasControls.width,canvasControls.height);
}


function unitFunc() {
    return (padding.top + ID.height-graphScale);
}

function round10fixed(x) {
  var decimal = 1;

  if(x>=10) {
    decimal = 0;
  }
  return (Math.round((x)* 10) / 10).toFixed(decimal);
};

function round100fixed(x) {
  var decimal = 2;

  if(x>=10) {
    decimal = 1;
  }

  if(x>=100) {
    decimal = 0;
  }
  return (Math.round((x)* 100) / 100).toFixed(decimal);
};


function round10(x) {
  return (Math.round((x)* 10) / 10).toFixed(1);
}

function round100(x) {
  return (Math.round((x)* 100) / 100).toFixed(2);
};

function round10000(x) {
  return (Math.round((x)* 10000) / 10000);
};


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: Math.round(evt.clientX - rect.left),
    y: Math.round(evt.clientY - rect.top)
    };
};



function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
          throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }


function Point(x, y, color, size) {
    context1.fillStyle = color || 'black';
    context1.beginPath();
    context1.arc(x, y, size, 0, 2 * Math.PI, true);
    context1.fill();

  };

function plotX(x) {
  return x*key*v.unit + padding.left;
}

function plotY(y) {
  return (canvasGraph.height/GraphCanvasDisplayRatio - padding.bottom) - y*key*v.unit;
}


function plotRX(x) {
  return (x - padding.left)/(key*v.unit);
}

function plotRY(y) {
return (canvasGraph.height/GraphCanvasDisplayRatio - padding.bottom - y)/(key*v.unit);
}

function graphX(x) {
  return x - padding.left;
}

function graphY(y) {
  return canvasGraph.height - padding.bottom - y
}


function bTop(buttonObject, mouse) {
  return mouse.x>(buttonObject.X - buttonObject.W) && mouse.x<(buttonObject.X + buttonObject.W) && mouse.y>buttonObject.Y && mouse.y<(buttonObject.Y + ((1-buttonObject.ratio1)/2)*buttonObject.H);

}

function bBot(buttonObject, mouse) {
  return mouse.x>(buttonObject.X - buttonObject.W) && mouse.x<(buttonObject.X + buttonObject.W) && mouse.y<(buttonObject.Y + buttonObject.H) && mouse.y>(buttonObject.Y + buttonObject.H - ((1-buttonObject.ratio1)/2)*buttonObject.H);
}

function bMid(buttonObject, mouse) {
  return mouse.x>(buttonObject.X - buttonObject.W) && mouse.x<(buttonObject.X + buttonObject.W) && mouse.y>(buttonObject.Y + ((1-buttonObject.ratio1)/2)*buttonObject.H) && mouse.y<(buttonObject.Y + buttonObject.H - ((1-buttonObject.ratio1)/2)*buttonObject.H);
}


// The mobile regions 

function bTopM(buttonObject, mouse) {

return mouse.x>(buttonObject.X - (structure.buttonDistanceX/2)) && mouse.x<(buttonObject.X + structure.buttonDistanceX/2) && mouse.y < structure.halfHeight;

}

function bBotM(buttonObject, mouse) {
  return mouse.x>(buttonObject.X - (structure.buttonDistanceX/2)) && mouse.x<(buttonObject.X + (structure.buttonDistanceX/2)) && mouse.y > structure.halfHeight;
}

/*
function bMidM(buttonObject, mouse) {
  return mouse.x>(buttonObject.X - (structure.buttonDistanceX/2)) && mouse.x<(buttonObject.X + (structure.buttonDistanceX/2)) && mouse.y>(buttonObject.Y + ((1-buttonObject.ratio1)/2)*buttonObject.H) && mouse.y<(buttonObject.Y + buttonObject.H - ((1-buttonObject.ratio1)/2)*buttonObject.H);
}
*/


function symbolTouchUpdate() {

  if(ControlCanvasLogic.width -  structure.halfHeight < m.c.touch.x && structure.halfHeight > m.c.touch.y) {
    icon.ZoomIn.touch = true;
  }
  else {
    icon.ZoomIn.touch = false;
  }

  if(ControlCanvasLogic.width -  structure.halfHeight < m.c.touch.x && structure.halfHeight < m.c.touch.y) {
    icon.ZoomOut.touch = true;
  }
  else {
    icon.ZoomOut.touch = false;
  }

  if(ControlCanvasLogic.width - 2*structure.halfHeight < m.c.touch.x && ControlCanvasLogic.width - structure.halfHeight > m.c.touch.x && structure.halfHeight > m.c.touch.y) {
    icon.refresh.touch = true;
  }
  else {
    icon.refresh.touch = false;
  }

}



function buttonTouchPosUpdate() {


  if (bTopM(buttons.s, m.c.touch) && v.savings<1 && hypoInter.a.savings.increase.x<max.x && hypoInter.b.savings.increase.y<max.y) {
    buttons.s.topM = true;
  }
  else {
    buttons.s.topM = false;
  }

  if (bBotM(buttons.s, m.c.touch) && v.savings>0) {
    buttons.s.botM = true;
  }
  else {
    buttons.s.botM = false;
  }


  if (bTopM(buttons.d, m.c.touch) && v.dep<1) {
    buttons.d.topM = true;
  }
  else {
    buttons.d.topM = false;
  }

  if (bBotM(buttons.d, m.c.touch) && v.dep>0 && hypoInter.a.depreciation.decrease.x<max.x && hypoInter.b.depreciation.decrease.y<max.y) {

    buttons.d.botM = true;
  }
  else {
    buttons.d.botM = false;
  }


  if (bTopM(buttons.t, m.c.touch) && v.tech<v.t.max && hypoInter.b.technology.increase.y<max.y && hypoInter.a.technology.increase.x < max.x) {
    buttons.t.topM = true;
  }
  else {
    buttons.t.topM = false;
  }

  if (bBotM(buttons.t, m.c.touch) && v.tech>0) {

    buttons.t.botM = true;
  }
  else {
    buttons.t.botM = false;
  }

}


function buttonPosUpdate() {

  if (bTop(buttons.s, m.c.pos) && v.savings<1 && hypoInter.a.savings.increase.x<max.x && hypoInter.b.savings.increase.y<max.y) {
    buttons.s.topD = true;
  }
  else {
    buttons.s.topD = false;
  }

  if (bBot(buttons.s, m.c.pos) && v.savings>0) {
    buttons.s.botD = true;
  }
  else {
    buttons.s.botD = false;
  }

  if (bTop(buttons.d, m.c.pos) && v.dep<1) {
    buttons.d.topD = true;
  }
  else {
    buttons.d.topD = false;
  }

  if (bBot(buttons.d, m.c.pos) && v.dep>0 && hypoInter.a.depreciation.decrease.x<max.x && hypoInter.b.depreciation.decrease.y<max.y) {

    buttons.d.botD = true;
  }
  else {
    buttons.d.botD = false;
  }

  if (bTop(buttons.t, m.c.pos) && v.tech<v.t.max && hypoInter.b.technology.increase.y<max.y && hypoInter.a.technology.increase.x < max.x) {
    buttons.t.topD = true;
  }
  else {
    buttons.t.topD = false;
  }

  if (bBot(buttons.t, m.c.pos) && v.tech>0) {

    buttons.t.botD = true;
  }
  else {
    buttons.t.botD = false;
  }


 if (bMid(buttons.s, m.c.pos)) {
    buttons.s.midD = true;
  }
  else {
    buttons.s.midD = false;
  }

 if (bMid(buttons.d, m.c.pos)) {
    buttons.d.midD = true;
  }
  else {
    buttons.d.midD = false;
  }

 if (bMid(buttons.t, m.c.pos)) {
    buttons.t.midD = true;
  }
  else {
    buttons.t.midD = false;
  }

}




var scaleStart, scaleDistance, duration, scaleStartTime, scaleTime, scaleClock;
var scaleSwitch = false;
var scaleSize = 3/4;
var maxScale = 4/5;

function rescale() {

    if(rescaleRefreshAllow) {

 if (inter.a.x > max.x && inter.b.y < max.y) {
  if(max.x/inter.a.x>scaleSize) { scaleSize = max.x/inter.a.x; } else { scaleSize = maxScale; }
   scaleT = (((scaleSize)*max.x)/inter.a.x)*ID.scale;
 }

 if (inter.b.y > max.y && inter.a.x < max.x) {
  if(max.y/inter.a.y>scaleSize) { scaleSize = max.y/inter.b.y; } else { scaleSize = maxScale; }
   scaleT = (((scaleSize)*max.y)/inter.b.y)*ID.scale;
 }

 if (inter.b.y > max.y && inter.a.x > max.x) {
   if (inter.b.y - max.y > inter.a.x - max.x) {
    scaleT = (((scaleSize)*max.y)/inter.b.y)*ID.scale;
   }
   else {

  if(max.x/inter.a.x>scaleSize) {
    if(max.y/inter.a.y>scaleSize) { scaleSize = max.y/inter.b.y; } else { scaleSize = maxScale; }
     scaleSize = max.x/inter.a.x;
    }
    else {
     scaleSize = maxScale;
    }
  scaleT = (((scaleSize)*max.x)/inter.a.x)*ID.scale;
  }
 }

 scaleStart = ID.scale;
 scaleDistance = scaleT - ID.scale;
 scaleStartTime = Date.now();
 duration = 400;
 scaleSwitch = true;

 m.newCursorBody = "auto";

 }
};



var alphaRefresh, savingsRefresh, depRefresh, ARefresh;

var rescaleRefreshAllow = true;

function refresh() {

 scaleT = v.IDscaleSave;

 scaleStart = ID.scale;
 scaleDistance = v.IDscaleSave - ID.scale;
 scaleStartTime = Date.now();
 duration = 400;
 scaleSwitch = true;

 rescaleRefreshAllow = false;

 setTimeout(function(){
    rescaleRefreshAllow = true;
 }, ease.shift.speed + 10);

 alphaRefresh = v.a.save - v.alpha;
 easeInit(v.a.shift, v.alpha, alphaRefresh);

 savingsRefresh = v.s.save - v.savings
 easeInit(v.s.shift, v.savings, savingsRefresh);

 depRefresh = v.d.save - v.dep
 easeInit(v.d.shift, v.dep, depRefresh);

 ARefresh = v.t.save - v.tech
 easeInit(v.t.shift, v.tech, ARefresh);

}


function refreshTest() { 
  for (i = 0; i < 4; i++) { 
    if(range(v[Object.keys(v)[i]], v[Object.keys(v)[i+4]].save, 0.05)) { 
      return true;
    }
  }
  if(range(ID.scale, v.IDscaleSave, 0.05)) {
    return true;
  }
  return false;
}


function range(var1, var2, percent) {

  if((Math.abs((var1/var2) - 1)) > percent) {
    return true;
  }
  else {
    return false;
  }

}


function scaleStatus() {
  return (inter.b.x > max.x) || (inter.b.y > max.y) || ((inter.b.x > max.x) || (inter.b.y > max.y))
}


function drawButton(X, Y, letter, W, H, lWidth, alpha, colorTop, colorBottom, lineColor, fillColor, ratio1, ratio2, ratio3, font, fontRatio, index) {

  var tHeight = ((1-ratio1)/2)*H;

    // draw the top rectangle
  context2.beginPath();
  context2.lineCap = "square";
  context2.fillStyle = colorTop;
  context2.strokeStyle = colorTop;
  context2.lineWidth = lWidth;
  context2.moveTo(X,Y);
  context2.quadraticCurveTo(X+W, Y+(1-ratio3)*tHeight, X+W, Y+tHeight);
  context2.quadraticCurveTo(X, Y+(1-ratio2)*tHeight, X-W, Y+tHeight);
  context2.quadraticCurveTo(X-W, Y+(1-ratio3)*tHeight, X, Y);
  context2.fill();
  context2.closePath();
  context2.stroke();

  context2.beginPath();
  context2.lineCap = "square";
  context2.fillStyle = colorBottom;
  context2.strokeStyle = colorBottom;
  context2.lineWidth = lWidth;
  context2.moveTo(X, Y+H);
  context2.quadraticCurveTo(X+W, Y+H-(1-ratio3)*tHeight, X+W, Y+H-tHeight);
  context2.quadraticCurveTo(X, Y+H-(1-ratio2)*tHeight, X-W, Y+H-tHeight);
  context2.quadraticCurveTo(X-W, Y+H-(1-ratio3)*tHeight, X, Y+H)
  context2.fill();
  context2.closePath();
  context2.stroke();

  context2.beginPath();
  context2.globalAlpha = alpha;
  context2.fillStyle = fillColor;
  context2.strokeStyle = fillColor;
  context2.lineWidth = 0.1;
  context2.moveTo(X-W, Y+H-tHeight);
  context2.quadraticCurveTo(X, Y+H-(1-ratio2)*tHeight, X+W, Y+H-tHeight);
  context2.lineTo(X+W, Y+H-tHeight-index*(H-2*tHeight));
  context2.lineTo(X-W, Y+H-tHeight-index*(H-2*tHeight));
  context2.lineTo(X-W, Y+H-tHeight);
  context2.fill();
  context2.closePath();
  context2.stroke();
  context2.globalAlpha = 1;



  context2.beginPath();
  context2.lineCap = "square";
  context2.strokeStyle = lineColor;
  context2.lineWidth = 1;
  context2.moveTo(X,Y);
  context2.quadraticCurveTo(X+W, Y+(1-ratio3)*tHeight, X+W, Y+tHeight);
  context2.moveTo(X,Y);
  context2.quadraticCurveTo(X-W, Y+(1-ratio3)*tHeight, X - W, Y + tHeight);
  context2.moveTo(X-W, Y+tHeight);
  context2.lineTo(X-W, Y+H-tHeight);
  context2.moveTo(X+W, Y+tHeight);
  context2.lineTo(X+W, Y+H-tHeight);
  context2.moveTo(X, Y+H);
  context2.quadraticCurveTo(X+W, Y+H-(1-ratio3)*tHeight, X+W, Y+H-tHeight);
  context2.moveTo(X, Y+H);
  context2.quadraticCurveTo(X-W, Y+H-(1-ratio3)*tHeight, X-W, Y+H-tHeight);
  context2.moveTo(X, Y+H);
  context2.closePath();
  context2.stroke();

  context2.beginPath();
  context2.lineCap = "square";
  context2.strokeStyle = lineColor;
  context2.lineWidth = lWidth;
  context2.moveTo(X-W, Y+tHeight);
  context2.lineTo(X-W, Y+H-tHeight);
  context2.moveTo(X+W, Y+tHeight);
  context2.lineTo(X+W, Y+H-tHeight);
  context2.closePath();
  context2.stroke();
  context2.font =  H/2*fontRatio + "px " + font;
  context2.fillStyle = grey(color.g3);
  context2.textAlign = "center";
  context2.textBaseline = "middle";
  context2.fillText(letter, X + 1, Y + H/2 + fireShift);
  context2.textAlign = "start";
  context2.textBaseline = "alphabetic";
};



function hypoUpdate() {
hypoInter.a.savings.increase.x = round10000(Math.pow((v.dep/((v.savings + ease.shift.savingsRatio*ease.shift.size)*v.tech)),(1/(v.alpha-1))));

hypoInter.a.savings.increase.y = round10000((v.savings+ease.shift.savingsRatio*ease.shift.size)*v.tech*Math.pow((v.dep/((v.savings + ease.shift.savingsRatio*ease.shift.size)*v.tech)),(v.alpha/(v.alpha-1))));

hypoInter.a.savings.decrease.x = round10000(Math.pow((v.dep/((v.savings - ease.shift.savingsRatio*ease.shift.size)*v.tech)),(1/(v.alpha-1))));

hypoInter.a.savings.decrease.y = round10000((v.savings - ease.shift.savingsRatio*ease.shift.size)*v.tech*Math.pow((v.dep/((v.savings - ease.shift.savingsRatio*ease.shift.size)*v.tech)),(v.alpha/(v.alpha-1))));

hypoInter.b.savings.increase.x = round10000(Math.pow((v.dep/((v.savings + ease.shift.savingsRatio*ease.shift.size)*v.tech)),(1/(v.alpha-1))));

hypoInter.b.savings.increase.y = round10000(v.tech*Math.pow((v.dep/((v.savings + ease.shift.savingsRatio*ease.shift.size)*v.tech)),(v.alpha/(v.alpha-1))));

hypoInter.b.savings.decrease.x = round10000(Math.pow((v.dep/((v.savings - ease.shift.savingsRatio*ease.shift.size)*v.tech)),(1/(v.alpha-1))));

hypoInter.b.savings.decrease.y = round10000(v.tech*Math.pow((v.dep/((v.savings - ease.shift.savingsRatio*ease.shift.size)*v.tech)),(v.alpha/(v.alpha-1))));



hypoInter.a.depreciation.increase.x = round10000(Math.pow(((v.dep + ease.shift.size)/(v.savings*v.tech)),(1/(v.alpha-1))));

hypoInter.a.depreciation.increase.y = round10000(v.savings*v.tech*Math.pow(((v.dep + ease.shift.size)/(v.savings*v.tech)),(v.alpha/(v.alpha-1))));

hypoInter.a.depreciation.decrease.x = round10000(Math.pow(((v.dep - ease.shift.size)/(v.savings*v.tech)),(1/(v.alpha-1))));

hypoInter.a.depreciation.decrease.y = round10000(v.savings*v.tech*Math.pow(((v.dep - ease.shift.size)/(v.savings*v.tech)),(v.alpha/(v.alpha-1))));

hypoInter.b.depreciation.increase.x = round10000(Math.pow(((v.dep + ease.shift.size)/(v.savings*v.tech)),(1/(v.alpha-1))));

hypoInter.b.depreciation.increase.y = round10000(v.tech*Math.pow(((v.dep + ease.shift.size)/(v.savings*v.tech)),(v.alpha/(v.alpha-1))));

hypoInter.b.depreciation.decrease.x = round10000(Math.pow(((v.dep - ease.shift.size)/(v.savings*v.tech)),(1/(v.alpha-1))));

hypoInter.b.depreciation.decrease.y = round10000(v.tech*Math.pow(((v.dep - ease.shift.size)/(v.savings*v.tech)),(v.alpha/(v.alpha-1))));

hypoInter.a.technology.increase.x = round10000(Math.pow((v.dep/(v.savings*(v.tech + v.tech*ease.shift.proportionA))),(1/(v.alpha-1))));

hypoInter.a.technology.increase.y = round10000(v.savings*(v.tech + v.tech*ease.shift.proportionA)*Math.pow((v.dep/(v.savings*(v.tech + v.tech*ease.shift.proportionA))),(v.alpha/(v.alpha-1))));

hypoInter.a.technology.decrease.x = round10000(Math.pow((v.dep/(v.savings*(v.tech - v.tech*ease.shift.proportionA))),(1/(v.alpha-1))));

hypoInter.a.technology.decrease.y = round10000(v.savings*(v.tech - v.tech*ease.shift.proportionA)*Math.pow((v.dep/(v.savings*(v.tech - v.tech*ease.shift.proportionA))),(v.alpha/(v.alpha-1))));

hypoInter.b.technology.increase.x = round10000(Math.pow((v.dep/(v.savings*(v.tech + v.tech*ease.shift.proportionA))),(1/(v.alpha-1))));

hypoInter.b.technology.increase.y = round10000((v.tech + v.tech*ease.shift.proportionA)*Math.pow((v.dep/(v.savings*(v.tech + v.tech*ease.shift.proportionA))),(v.alpha/(v.alpha-1))));

hypoInter.b.technology.decrease.x = round10000(Math.pow((v.dep/(v.savings*(v.tech - v.tech*ease.shift.proportionA))),(1/(v.alpha-1))));

hypoInter.b.technology.decrease.y = round10000((v.tech - v.tech*ease.shift.proportionA)*Math.pow((v.dep/(v.savings*(v.tech - v.tech*ease.shift.proportionA))),(v.alpha/(v.alpha-1))));


}



// the yellow box that helps visualise the area for the graph
function yellowBox() {
context1.strokeStyle = "yellow";
context1.lineWidth = 1;
context1.rect(padding.left, padding.top, ID.width, ID.height);
context1.stroke();
}

// the yellow box that helps visualise the area for the controls
function controlsYellowBox() {
context2.strokeStyle = "red";
context2.lineWidth = 1;
context2.rect(controlPadding.left, controlPadding.top, canvasControls.width -(controlPadding.left + controlPadding.right),canvasControls.height-(controlPadding.top + controlPadding.bottom));
context2.stroke();
}

function redBox() {
context1.strokeStyle = "red";
context1.lineWidth = 1;
context1.rect(2, 2, canvasGraph.width-5, canvasGraph.height-5);
context1.stroke();
}




function easeOutCubic(t, b, c, d) {
  t /= d;
  t--;
  return c*(t*t*t + 1) + b;
};

function easeOutQuint (t, b, c, d) {
  t /= d;
  t--;
  return c*(t*t*t*t*t*t*t + 1) + b;
};


function easeInit(input, varEase, shiftS) {
  input.startTime = Date.now();
  input.sStart = varEase;
  input.distance = shiftS;
  input.swtch = true;
}



function easeControl(easingOject, variable) {


 if(easingOject.Large) {
    if(easingOject.easeLarge===false) {
        easingOject.easeLarge = true;
        easeLine(easingOject, variable, "IN");
    }
 }
 else {
    if(easingOject.easeLarge) {
        easingOject.easeLarge = false;
        easeLine(easingOject, variable, "OUT");
    }
 }

}




function easeLine(easingOject, startValue, dir) {

easingOject.startTime = Date.now();
easingOject.startValue = startValue;
  if(dir==="IN") {
    easingOject.shiftSize = ease.lineWidth.size - startValue;
    easingOject.switch1 = true;
    easingOject.switch2 = false;
  }
  else {
    easingOject.shiftSize = - startValue + 1;
    easingOject.switch1 = false;
    easingOject.switch2 = true;
  }
}

function lineEaseLoop(easeObject, variable) {

 if(easeObject.switch1) {

    easeObject.currentTime = Date.now();
    easeObject.clockTime = easeObject.currentTime - easeObject.startTime;

    if(variable === "savings") {
    v.s.lineRatio = easeOutQuint(easeObject.clockTime, easeObject.startValue, easeObject.shiftSize, ease.lineWidth.duration)

    if(easeObject.clockTime>ease.lineWidth.duration) {
        easeObject.switch1 = false;
        v.s.lineRatio = easeObject.startValue + easeObject.shiftSize;
    }
  }

  if(variable === "dep") {
    v.d.lineRatio = easeOutQuint(easeObject.clockTime, easeObject.startValue, easeObject.shiftSize, ease.lineWidth.duration)

    if(easeObject.clockTime>ease.lineWidth.duration) {
        easeObject.switch1 = false;
        v.d.lineRatio = easeObject.startValue + easeObject.shiftSize;
    }
  }

  if(variable === "tech") {
    v.t.lineRatio = easeOutQuint(easeObject.clockTime, easeObject.startValue, easeObject.shiftSize, ease.lineWidth.duration)

    if(easeObject.clockTime>ease.lineWidth.duration) {
        easeObject.switch1 = false;
        v.t.lineRatio = easeObject.startValue + easeObject.shiftSize;
    }
  }
 }

  if(easeObject.switch2) {

    easeObject.currentTime = Date.now();
    easeObject.clockTime = easeObject.currentTime - easeObject.startTime;

    if(variable === "savings") {
    v.s.lineRatio = easeOutQuint(easeObject.clockTime, easeObject.startValue, easeObject.shiftSize, ease.lineWidth.duration)

    if(easeObject.clockTime>ease.lineWidth.duration) {
        easeObject.switch1 = false;
        v.s.lineRatio = easeObject.startValue + easeObject.shiftSize;
    }
  }

  if(variable === "dep") {
    v.d.lineRatio = easeOutQuint(easeObject.clockTime, easeObject.startValue, easeObject.shiftSize, ease.lineWidth.duration)

    if(easeObject.clockTime>ease.lineWidth.duration) {
        easeObject.switch1 = false;
        v.d.lineRatio = easeObject.startValue + easeObject.shiftSize;
    }
  }

  if(variable === "tech") {
    v.t.lineRatio = easeOutQuint(easeObject.clockTime, easeObject.startValue, easeObject.shiftSize, ease.lineWidth.duration)

    if(easeObject.clockTime>ease.lineWidth.duration) {
        easeObject.switch1 = false;
        v.t.lineRatio = easeObject.startValue + easeObject.shiftSize;
    }
  }
 }

}

function rgbString(colorObject) {
  return "rgb(" + colorObject.r + "," + colorObject.g + "," + colorObject.b + ")";
}


function colorString(rgbObject) {

  if((rgbObject.r === 0 && rgbObject.g === 0 && rgbObject.b !== 0) || (rgbObject.r === rgbObject.g > 0 && rgbObject.b === 255)) {
    return "blue";
  }

  if((rgbObject.g === 0 && rgbObject.b === 0 && rgbObject.r !== 0) || (rgbObject.r === 255 && rgbObject.g === rgbObject.b > 0)) {
    return "red";
  }

  if((rgbObject.r === 0 && rgbObject.b === 0 && rgbObject.g !== 0) || (rgbObject.g === 255 && rgbObject.r === rgbObject.b > 0)) {
    return "green";
  }

  if(((rgbObject.r === rgbObject.b) && rgbObject.g === 0) || (rgbObject.r === rgbObject.b === 255) ) {
    return "violet";
  }

  if(((rgbObject.r === rgbObject.g) && rgbObject.b === 0) || (rgbObject.r === rgbObject.g === 255) ) {
    return "yellow";
  }

  if(((rgbObject.g === rgbObject.b) && rgbObject.r === 0) || (rgbObject.g === rgbObject.b === 255) ) {
    return "cyan";
  }

  if(rgbObject.r === rgbObject.g === rgbObject.b) {
    return "grey";
  }

  if(rgbObject.r === rgbObject.g && rgbObject.b === rgbObject.g + 1) {
    return "shade1";
  }

  if(rgbObject.r === rgbObject.g && rgbObject.b === rgbObject.g + 2) {
    return "shade2";
  }


  if(rgbObject.r === 254 && rgbObject.g === 255 && rgbObject.b === 255) {
    return "X1";
  }

  if(rgbObject.r === 255 && rgbObject.g === 254 && rgbObject.b === 255) {
    return "X2";
  }

  if(rgbObject.r === 255 && rgbObject.g === 255 && rgbObject.b === 254) {
    return "X3";
  }

  else {
    return "OTHER"
  }

}



function convertSym(stringInput) {  
    var stringHold = stringInput
    stringHold = stringHold.replace("α", "&alpha;");
    stringHold = stringHold.replace("δ", "&delta;");
   return stringHold 
}

    




function dragUpdate(variable, expression, upperLimit, bonus) { 
    v[variable] = round10000(expression);
    
    if(v[variable] > upperLimit) { 
        v[variable] = upperLimit;
    }
    else if (v[variable]<0) { 
        v[variable] = 0;
    }
    document.getElementById(variable + "Input").value = v[variable];
    if (bonus) { 
        v[v.property(v.index(variable)+4)].clickBonus = v.bonusSize 
    }
}




function shiftEaseLoop(variableShort, variableLong, minValue, maxValue) { 

    v[variableShort].shift.current = now - v[variableShort].shift.startTime;
    v[variableLong] = document.getElementById(variableLong + "Input").value = (easeOutCubic(v[variableShort].shift.current, v[variableShort].shift.sStart, v[variableShort].shift.distance, ease.shift.speed))
     
    if (v[variableLong]>=maxValue) {
     document.getElementById(variableLong + "Input").value = v[variableLong] = maxValue;
    }
    if (v[variableLong]<=minValue) {
     document.getElementById(variableLong + "Input").value = v[variableLong] = 0;
    }
    if (v[variableShort].shift.current >= ease.shift.speed) {
    v[variableShort].shift.swtch = false
   }

    if(desktop) {
        buttonPosUpdate()
    }

   if(scaleStatus()) {
    rescale();
   }
        
}


function refreshEase() { 

   icon.refresh.shift.current = now2 - icon.refresh.shift.startTime;

   icon.refresh.shift.angle = easeOutCubic(icon.refresh.shift.current, icon.refresh.shift.sStart, icon.refresh.shift.distance, icon.refresh.shift.speed*500)
 
    if(icon.refresh.shift.angle>=180) {
      icon.refresh.shift.swtch = false
      icon.refresh.shift.angle = 180;
    }
}


function equationHover() { 
    
   
  $("#EqProdtech").mouseover(function() {
      v.t.EqProd = round10(v.tech);
      $("#EqProdtech").css({"font-size": font.equation.basis*font.equation.L});
  });
  $("#EqProdtech").mouseout(function() {
      setTimeout(function(){
          v.t.EqProd = " A ";
          $("#EqProdtech").css({"font-size": font.equation.basis*font.equation.L});
      }, ease.equation.hoverSpeed);
  });

  $("#EqProdalpha").mouseover(function() {
      v.a.EqProd = round100(v.alpha);
      $("#EqProdalpha").css({"font-size": font.equation.basis*font.equation.XS});
  });
  $("#EqProdalpha").mouseout(function() {
      setTimeout(function(){
          v.a.EqProd = "&alpha;";
          $("#EqProdalpha").css({"font-size": font.equation.basis});
      }, ease.equation.hoverSpeed);
  });



  $("#EqSSsavings").mouseover(function() {
      v.s.EqSS = round100(v.savings);
      v.t.EqSS = "A";
      $("#EqSSsavings").css({"font-size": font.equation.basis*font.equation.S});
  });
  $("#EqSSsavings").mouseout(function() {
        v.s.EqSS = "s ";
        v.t.EqSS = "A ";
        $("#EqSSsavings").css({"font-size": font.equation.basis*font.equation.XL});

      $("#EqSStech").mouseover(function() {
          v.t.EqSS = round10(v.tech);
          v.s.EqSS = "s";
          $("#EqSStech").css({"font-size": font.equation.basis*font.equation.L});
      })
  });

  $("#EqSStech").mouseover(function() {
      v.t.EqSS = round10(v.tech);
      v.s.EqSS = "s";
      $("#EqSStech").css({"font-size": font.equation.basis*font.equation.L});
  });
  $("#EqSStech").mouseout(function() {
          v.t.EqSS = " A ";
          $("#EqSStech").css({"font-size": font.equation.basis*font.equation.XL});
  });

  $("#EqSSalpha").mouseover(function() {
      v.a.EqSS = round100(v.alpha);
      $("#EqSSalpha").css({"font-size": font.equation.basis*font.equation.XS});

  });
  $("#EqSSalpha").mouseout(function() {
      setTimeout(function(){
      v.a.EqSS = "&alpha; ";
      $("#EqSSalpha").css({"font-size": font.equation.basis});
      }, ease.equation.hoverSpeed);
  });

  $("#EqSSdep").mouseover(function() {
      v.d.EqSS = round100(v.dep);
      $("#EqSSdep").css({"font-size": font.equation.basis});
  });
  $("#EqSSdep").mouseout(function() {
      setTimeout(function(){
      v.d.EqSS = " &delta; ";
      $("#EqSSdep").css({"font-size": font.equation.basis*font.equation.XL});
      }, ease.equation.hoverSpeed);
  });  
    
}





function equationUpdate() { 

  if(v.t.lineRatio > ((ease.lineWidth.size - 1)*ease.equation.updateRatio) + 1 && m.alphaHover===false) {
      v.t.EqProd = v.t.EqSS = round10(v.tech);
      $("#EqProdtech").css({"font-size": font.equation.basis*font.equation.L});
      $("#EqSStech").css({"font-size": font.equation.basis*font.equation.L});
  }
  else {
      v.t.EqProd = " A ";
      v.t.EqSS =  " A ";

      $("#EqProdtech").css({"font-size": font.equation.basis*font.equation.XL});
      $("#EqSStech").css({"font-size": font.equation.basis*font.equation.XL});
  }

  if(v.t.lineRatio > ((ease.lineWidth.size - 1)*ease.equation.updateRatio) + 1 && m.alphaHover) {
      v.a.EqProd = round100(v.alpha);

      $("#EqProdalpha").css({"font-size": font.equation.basis*font.equation.XS});
      $("#EqSSalpha").css({"font-size": font.equation.basis*font.equation.XS});
  }
  else {
      v.a.EqProd = "&alpha;";
      $("#EqProdalpha").css({"font-size": font.equation.basis});
      $("#EqSSalpha").css({"font-size": font.equation.basis});
  }


  if(v.s.lineRatio > ((ease.lineWidth.size - 1)*ease.equation.updateRatio) + 1) {
      v.s.EqSS = round100(v.savings);
      v.t.EqSS =  "A";

      $("#EqSSsavings").css({"font-size": font.equation.basis*font.equation.S});
  }
  else {
      v.s.EqSS = "s";
      $("#EqSSsavings").css({"font-size": font.equation.basis*font.equation.XL});
  }

  if(v.t.lineRatio > ((ease.lineWidth.size - 1)*ease.equation.updateRatio) + 1 && m.alphaHover) {
      v.a.EqSS = round100(v.alpha);
  }
  else {
      v.a.EqSS = "&alpha; ";
  }

  if(v.d.lineRatio > ((ease.lineWidth.size - 1)*ease.equation.updateRatio) + 1) {
      v.d.EqSS = round100(v.dep);
      $("#EqSSdep").css({"font-size": font.equation.basis});

  }
  else {
      v.d.EqSS = " &delta; ";
      $("#EqSSdep").css({"font-size": font.equation.basis*font.equation.XL});
  } 
 
}


function curveHoverLineEase(var1, var2) { 
    
    if(m.g.stringColor === v[var1].color.string || m.g.stringColor === v[var2].string) {
        v[var1].lineEasing.Large = true;
    }
    else {
        v[var1].lineEasing.Large = false;
    }  
}


function wrapHoverEase(var1, var2) { 
    if(m.g.stringColor === var2) {
        v[var1].lineEasing.Large = true;
    }
}



function buttonListener(varButton, variable, expression) { 
    
    if (buttons[varButton].topD) {
     easeInit(v[varButton].shift, variable, expression)
     buttons[varButton].colorTop = (color.g3);

     title.upgradeStatus(window.location.pathname + "-" + v.property(v.index(varButton)-4) + "-" + "increase", v.fullName(v.property(v.index(varButton)-4)) + "-increase");
    }
     
    if (buttons[varButton].botD) {
     easeInit(v[varButton].shift, variable, (-1)*expression)
     buttons[varButton].colorBottom = (color.g3);

     title.upgradeStatus(window.location.pathname + "-" + v.property(v.index(varButton)-4) + "-" + "decrease", v.fullName(v.property(v.index(varButton)-4)) + "-decrease");
    }   

    if (buttons[varButton].midD) {
     title.upgradeStatus(window.location.pathname + "-" + v.property(v.index(varButton)-4), v.fullName(v.property(v.index(varButton)-4)));
    }   
}



function buttonTouch(varButton, variable, expression) { 
	
    if (buttons[varButton].topM) {
     easeInit(v[varButton].shift, variable, expression)
     buttons[varButton].colorTop = (color.g3);

     title.mobileUpgrade(text[v.property(v.index(varButton)-4)].increase, window.location.pathname + "-" + v.property(v.index(varButton)-4) + "-" + "increase", v.fullName(v.property(v.index(varButton)-4)) + "-increase");

    }
	if (buttons[varButton].botM) {
     easeInit(v[varButton].shift, variable, (-1)*expression)
     buttons[varButton].colorBottom = (color.g3);

    title.mobileUpgrade(text[v.property(v.index(varButton)-4)].decrease, window.location.pathname + "-" + v.property(v.index(varButton)-4) + "-" + "decrease", v.fullName(v.property(v.index(varButton)-4)) + "-decrease");

    }       
}

function grey(percent) {
  return "rgb(" + Math.round((100-percent)/100*255) + "," + Math.round((100-percent)/100*255) + "," + Math.round((100-percent)/100*255) + ")"
}

function singleGrey(percent) { 
  return Math.round((100-percent)/100*255);
}


function ajax(requestName, hash) { 

  $("#textDiv").html("");

   $.ajax({url: requestName, 

    success: function(content) {
        
      for(i=0; i<= content.length-1; i++) { 
         if(desktop) {
          desktopTimeout(i);
         }
         else{
          mobileTimeout(i);
        }
      }

      function desktopTimeout(i) {

       title.log[title.logIndex-1].push(content[i])
       setTimeout(function(){ 
          $("<p class=\"textPara\">" + content[i] + "</p>").hide().appendTo("#textDiv").fadeIn(title.fadeSpeed*i);
        }, (i*title.ajaxSpeed)/content.length);
      }

      function mobileTimeout(i) {
       title.log[title.logIndex-1].push(content[i])
       setTimeout(function(){ 
          $("<p class=\"textPara\">" + content[i] + "</p>").appendTo("#textDiv");
        }, (i*title.ajaxSpeed)/content.length);
      }

      if(desktop) {
        setTimeout(function(){  
          $("[data-toggle=tooltip]").tooltip();
        }, title.ajaxSpeed*content.length + 10);
      }

      window.location.hash = "!" + hash;
    },

    error: function() {
     $( "#textDiv" ).html("<br>Apologies, our servers have failed to load this content.");
     }

   })

}  
  

function dragTitle(varString) { 
  if(refValue*(1+text.curvePad)<v[varString]) { 
    title.setTransStatus(text[varString].increase);
  }
  else if (refValue*(1-text.curvePad)>v[varString]) {
    title.setTransStatus(text[varString].decrease);
  }
}

function symbolClick(sym, titleText) { 

  if(desktop) {
    title.setTransStatus(titleText)
    title.upgradeStatus(window.location.pathname + "-" + sym, titleText.replace(/\s+/g, '').replace('/','')) 
  }
  else { 
    title.mobileUpgrade(titleText, window.location.pathname + "-" + sym, titleText.replace(/\s+/g, '').replace('/',''))
  }

}


function cursorUpdate() { 

  if(m.newCursorBody !== m.cursorBody) {
    m.cursorBody = m.newCursorBody;
    $("body").css("cursor", m.cursorBody, "important");
  }

  if(m.newCursorSlider !== m.cursorSlider) {
    m.cursorSlider = m.newCursorSlider;
    $(".sliderInput").css("cursor", m.cursorSlider, "important");
  }

  if(m.newCursorBack !== m.cursorBack) {
    m.cursorBack = m.newCursorBack;
    $("#back").css("cursor", m.cursorBack, "important");
  }

  if(m.newCursorForward !== m.cursorForward) {
    m.cursorForward = m.newCursorForward;
    $("#forward").css("cursor", m.cursorForward, "important");
  }


}


function drawIcons() {

  context2.textAlign = "center";
  context2.textBaseline = "middle";

  context2.font = icon.refresh.font + "px FontAwesome";
  context2.fillStyle=grey(icon.refresh.color);

  if(icon.refresh.shift.swtch) { refreshEase() }

  icon.refresh.shift.angle = icon.refresh.shift.angle*(Math.PI/180)
  context2.save();
  context2.translate(icon.refresh.x, icon.refresh.y);
  context2.rotate(icon.refresh.shift.angle);
  context2.fillText(icon.refresh.symbol, 0, 0);
  context2.restore();



  context2.font = icon.ZoomOut.font + "px FontAwesome";
  context2.fillStyle=grey(icon.ZoomOut.color);
  context2.fillText(icon.ZoomOut.symbol, icon.ZoomOut.x, icon.ZoomOut.y);

  context2.font = icon.ZoomIn.font + "px FontAwesome";
  context2.fillStyle=grey(icon.ZoomIn.color);
  context2.fillText(icon.ZoomIn.symbol, icon.ZoomIn.x, icon.ZoomIn.y);

}


