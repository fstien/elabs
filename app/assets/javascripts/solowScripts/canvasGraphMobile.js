// define the context1
var canvasGraph = document.getElementById("canvasGraph");
var context1 = canvasGraph.getContext("2d");

var desktop = false;

// define the ratio dimensions of the canvas in logical pixels
var canvasLogic = {
    width: 1000,
    height: 700
}

// the dimensions in device independant pixels
var canvasLogicConstants = {
    width: canvasLogic.width,
    height: canvasLogic.height
}

// compute the constant ratio to scale the canvas with
var devicePixelRatio = window.devicePixelRatio || 1;

// determine the backing store ratio
var backingStoreRatio = context1.webkitBackingStorePixelRatio || context1.mozBackingStorePixelRatio || context1.msBackingStorePixelRatio || context1.oBackingStorePixelRatio ||context1.backingStorePixelRatio || 1;

// determine the pixel density
var GraphCanvasDisplayRatio = (devicePixelRatio/backingStoreRatio)*1;

// size of the menu div at the tom
var menuHeight = 50;
// set the height of the menu div
$("#Menu").height(menuHeight);

// define the padding for desktop in px
var padding = {
    top: 40,
    bottom: 35,
    left: 50,
    right: 35
};

// main colors that will be reused
var color = {
    g1: 20, 
    g2: 50, 
    g3: 100,

    table: {
      init: 10,
      hover: 20,
      click: 30
    },

    symbols: 60,

    Init: 220,
    darken: 60

}


// removes the sliders
$("#rangeControl").css("display", "none");

// object containing the size of the div with the graph
var divGraph = {
    width: $(window).width(),
    height: $(window).height() - menuHeight
};


// oject containing the key ratios used for resizing
var ratio = {
    curves: (canvasLogic.height - (padding.top + padding.bottom))/(canvasLogic.width - (padding.left + padding.right)),
    canvasGraph: canvasLogic.height/canvasLogic.width,
    div: divGraph.height/divGraph.width
};

// define properties of the graph
var ID = {
    width: canvasLogic.width - (padding.left + padding.right),
    height: canvasLogic.height - (padding.top + padding.bottom),
    axesColor: grey(color.g2),
    lineBasis: 1.4,
    lineGraphRatio: 1.25,
    scale: 1.7
};


var v = {

 alpha: document.getElementById("alphaInput").value,
 savings: document.getElementById("savingsInput").value,
 dep: document.getElementById("depInput").value,
 tech: document.getElementById("techInput").value,

 a: {
     
     shift: { 
        swtch: false,
        startTime: 0,
        current: 0,
        sStart: 0,
        distance: 0
     },
     
     
     EqProd: "&alpha;",
     EqSS: "&alpha;",
     
     save: document.getElementById("alphaInput").value
 },
    
 s: {
     
     lineEasing: {
        switch1: false,
        switch2: false,
        Large: false,
        easeLarge: false
     },
     
     
    shift: { 
        swtch: false,
        startTime: 0,
        current: 0,
        sStart: 0,
        distance: 0
     },
     
     color: { 
        r: 0,
        g: color.Init,
        b: 0,
        string: "green"
     },

     wrapColor: { 
        r: 254,
        g: 255, 
        b: 255,
        string: "X1"
     },
     
     EqSS: " s ",
     
     lineRatio: 1,
     clickBonus: 0,
     
     save: document.getElementById("savingsInput").value
 },

    
 d: {
     
     lineEasing: {
        switch1: false,
        switch2: false,
        Large: false,
        easeLarge: false
     },
     
     
     shift: { 
        swtch: false,
        startTime: 0,
        current: 0,
        sStart: 0,
        distance: 0
     },
     
     color: { 
        r: 0,
        g: 0,
        b: color.Init,
        string: "blue"
     },

     wrapColor: { 
        r: 255,
        g: 254, 
        b: 255,
        string: "X2"
     },
     
     EqSS: "&delta;",
     
     lineRatio: 1,
     clickBonus: 0,

     save: document.getElementById("depInput").value
 },
    
 t: {
     
     lineEasing: {
        switch1: false,
        switch2: false,
        Large: false,
        easeLarge: false
     },
     
     shift: { 
        swtch: false,
        startTime: 0,
        current: 0,
        sStart: 0,
        distance: 0
     },
     
     max: $("#techInput").prop('max'),

     color: { 
        r: color.Init,
        g: 0,
        b: 0,
        string: "red"
     },

     wrapColor: { 
        r: 255,
        g: 255, 
        b: 254,
        string: "X3"
     },
     
     EqProd: " A ",
     EqSS: " A ",
     
     lineRatio: 1,
     clickBonus: 0,

     save: document.getElementById("techInput").value
 },

 round10000: function(keyVar) { 
    this[keyVar] = round10000(this[keyVar]);
 },

 IDscaleSave: ID.scale,
    
    
 P1Color: {
    r: 0,
    g: color.Init,
    b: color.Init,
    string: "yellow"
 },
 P2Color: {
    r: color.Init,
    g: color.Init,
    b: 0, 
    string: "cyan"
 },

 wrapRatio: 5,
 P1Bonus: 0,
 P2Bonus: 0,
 bonusSize: 0.2,

 keyVar: ["k", "y", "c", "i", "MPK"],
    
 unit: (canvasGraph.height/GraphCanvasDisplayRatio - padding.bottom - unitFunc())/key,
    
 property: function(i) {
     return Object.keys(this)[i];
    },
 index: function(prop) { 
    if(this.hasOwnProperty(prop)) { 
        for(i=0; i<=7; i++) { 
          if(Object.keys(this)[i] === prop) { 
            return i;
  }}}},

  colorConvert: function(color) {
    switch (color) { 
      case this.s.color.string:
        return "savings"
      break;
      case this.d.color.string:
        return "dep"
      break;
      case this.t.color.string:
        return "tech";
      break;
      default: 
      // nothing
    }
  },   

  midName: function(letterName) {
    switch (letterName) {
      case "a":
        return "alpha";
      break; 
      case "s":
        return "savings";
      break;
      case "d":
        return "dep";
      break;
      case "t": 
        return "tech";
      break;
      default: 
      // nothing
    }
  },

  fullName: function(midName) { 
    switch (midName) {
      case "alpha":
        return "alpha";
      break; 
      case "savings":
        return "savings";
      break;
      case "dep":
        return "depreciation";
      break;
      case "tech": 
        return "technology";
      break;
      default: 
      // nothing
    }
  }

}

var m = { 
    tag: "canvasGraph",
    
    alphaHover: false, 
    
    cursorBody: "auto",
    newCursorBody: "auto",

    cursorSlider: "auto",
    newCursorSlider: "auto",
   
    cursorBack: "auto",
    newCursorBack: "auto",

    cursorForward: "auto",
    newCursorForward: "auto",   
    
    g: { 
      pos: {
      //Set values such that the hoverRegionTrue boolean doesn't set to true in the first loop with these fake values
          x: 1000, 
          y: 0
      },
      rgb: "",
      stringColor: "", 
      stringColorClick: "",

      newHoverVar: "none",

      hoverVar: "none", 

      hoverDefault: "none",

      indexColor: {
        k: color.g2,
        K: color.g2,
        i: color.g2,
        y: color.g2,
        Y: color.g2,

        none: color.g2
      },

      indexSize: {
        k: 1,
        K: 1,
        i: 1,
        y: 1,
        Y: 1,

        none: 1
      },

      padding: {
        x1: 0, 
        x2: 0, 

        X: 0,

        y1: 0, 
        y2: 0, 
        y3: 0,

        Y: 0,

        paddingRatio: 0.9,

        indexRatio: 1.2
      },

      hoverUpdate: function() { 

        this.padding.x1 = plotX(inter.a.x) - padding.left;
        this.padding.x2 = (canvasGraph.width/GraphCanvasDisplayRatio) - padding.right - plotX(inter.a.x);
        this.padding.X = Math.min(this.padding.x1, this.padding.x2)/2;

        this.padding.y1 = (canvasGraph.height/GraphCanvasDisplayRatio) - padding.bottom - plotY(inter.a.y);
        this.padding.y2 = plotY(inter.a.y) - plotY(inter.b.y);
        this.padding.y3 = plotY(inter.b.y) - padding.top;
        this.padding.Y = Math.min(this.padding.y1, this.padding.y2, this.padding.y3)/2;

        if(m.tag === "canvasGraph") {
          if(this.pos.x > (canvasGraph.width/GraphCanvasDisplayRatio) - padding.right - this.padding.X*this.padding.paddingRatio && this.pos.y > (canvasGraph.height/GraphCanvasDisplayRatio) - padding.bottom*this.padding.indexRatio) { 
            this.newHoverVar = "K";
          }
          else if(this.pos.x > plotX(inter.a.x) - this.padding.X*this.padding.paddingRatio && this.pos.x < plotX(inter.a.x) + this.padding.X*this.padding.paddingRatio && this.pos.y > (canvasGraph.height/GraphCanvasDisplayRatio) - padding.bottom*this.padding.indexRatio) {
            this.newHoverVar = "k";
          }
          else if(this.pos.y > plotY(inter.a.y) - this.padding.Y*this.padding.paddingRatio && this.pos.y < plotY(inter.a.y) + this.padding.Y*this.padding.paddingRatio && this.pos.x < padding.left) {  
            this.newHoverVar = "i";
          }
          else if(this.pos.y > plotY(inter.b.y) - this.padding.Y*this.padding.paddingRatio && this.pos.y < plotY(inter.b.y) + this.padding.Y*this.padding.paddingRatio && this.pos.x < padding.left*this.padding.indexRatio ) {  
            this.newHoverVar = "y";
          }    
          else if(this.pos.y < padding.top + this.padding.Y*this.padding.paddingRatio && this.pos.x < padding.left*this.padding.indexRatio ) {  
            this.newHoverVar = "Y";
          }
          else { 
            this.newHoverVar = this.hoverDefault;
          }
        }

        if(this.hoverVar !== this.newHoverVar) {

          $("#var-" + v.keyVar[$.inArray(m.g.hoverVar, v.keyVar)]).parent().css("background-color", grey(color.table.init));

          this.indexColor[this.hoverVar] = color.g2;
          this.indexSize[this.hoverVar] = 1;
          this.hoverVar = this.newHoverVar;
          this.indexColor[this.hoverVar] = 100;
          this.indexSize[this.hoverVar] = 1.05;

          if(this.hoverVar === this.hoverDefault) { 
            title.revertTransStatus();
          } 
          else {
            title.setTransStatus(text.keyVar[m.g.hoverVar]);
          }

          if ($.inArray(m.g.hoverVar, v.keyVar) > -1) { 
            $("#var-" + v.keyVar[$.inArray(m.g.hoverVar, v.keyVar)]).parent().css("background-color", grey(color.table.hover));
          }
          
        }

        if(m.tag === "canvasGraph" && m.g.hoverVar !== m.g.hoverDefault) {
          m.newCursorBody = "pointer";
        }
 
    
      }

    },
    
    c: { 
      pos: { 
        x: "", 
        y: ""
      },
      touch: { 
      
      }   
    }
}



var ease = { 
    
  shift: { 
      size: 0.1,
      speed: 300,
      savingsRatio: 1.2,
      proportionA: 0.15
  },
  
  lineWidth: { 
      size: 1.3,
      duration: 2000
  },
  
  equation: { 
      updateRatio: 0.8,
      hoverSpeed: 200,
      ID: ["EqProd", "EqSS"]  
  },

  zoom: {
    allowIn: true,
    proportion: 0.2,

    allowUpdate: function() { 
      if(plotX(inter.b.x*(1+ease.zoom.proportion))>plotX(max.x) || plotY(inter.b.y*(1+ease.zoom.proportion))<plotY(max.y)) {
          this.inAllow = false;
      } 
      else { 
          this.inAllow = true;
      }
    },

    ease: function(input) {
      if(rescaleRefreshAllow) {
       scaleT = ID.scale*input;
       scaleStart = ID.scale;
       scaleDistance = scaleT - ID.scale;
       scaleStartTime = Date.now();
       duration = 300;
       scaleSwitch = true;
      }
    }
  }
}


// the intersection coordinates
var inter = {
    a: {},
    b: {},
    compute: function() {
        this.a.x = Math.pow((v.dep/(v.savings*v.tech)),(1/(v.alpha -1)));
        this.a.y = v.savings*v.tech*Math.pow((v.dep/(v.savings*v.tech)),(v.alpha/(v.alpha -1)));
        this.b.x = Math.pow((v.dep/(v.savings*v.tech)),(1/(v.alpha -1)));
        this.b.y = v.tech*Math.pow((v.dep/(v.savings*v.tech)),(v.alpha/(v.alpha -1)));
    }
}

// the hypothetical intersection coordinates
var hypoInter = {
    a: {
        savings: { increase: {}, decrease: {} },
        depreciation: { increase: {}, decrease: {} },
        technology: { increase: {}, decrease: {} }
    },
    b: {
        savings: { increase: {}, decrease: {} },
        depreciation: { increase: {}, decrease: {} },
        technology: { increase: {}, decrease: {} }
    },
    compute: function(){
        hypoUpdate()
    }
}


// the size of the ID in geometric (function-relative) units; used to determine if the intersection is outside of the graph
var max = {
    x: round10000(ID.width/(v.unit*key)),
    y: round10000(ID.height/(v.unit*key)),
    compute: function() {
        this.x = round10000(ID.width/(v.unit*key));
        this.y = round10000(ID.height/(v.unit*key));
    }
};

var box = { 
  k: "k",
  y: "y",
  c: "c",
  i: "i",
  MPK: "MPK",

  update: function(varLetter, expression) {
    box[varLetter] = round100fixed(expression)
    if($("#var-" + varLetter).text() !== varLetter + ": " + box[varLetter]) { 
      $("#var-" + varLetter).text(varLetter + ": " + box[varLetter])
    }
  }

}

var title = {

  p: $("#textTitle").text(),
  t: "",

  log: [],
  logIndex: 0,

  ajaxStatus: "none",
  ajaxSpeed: 200,

  fadeSpeed: 100,

  swtch: false,

  nav: {
    back: false,
    forward: false,
    hoverBackGrey: 70,
    hoverForwardGrey: 70,
    defaultGrey: 70
  },

  setTransStatus: function(text) { 
    this.swtch = true;
    this.t = text;
  },

  revertTransStatus: function() {   
      this.swtch = false;
  },

  upgradeStatus: function(ajaxRequest, hashValue, logBoolean) { 
    this.p = this.t;
    this.swtch = false;
    document.getElementById("textDiv").scrollTop = 0;

    if(ajaxRequest !==  this.ajaxStatus) {
      if(this.logIndex < this.log.length) { 
        this.log.splice(this.logIndex, this.log.length)
      }
      
      this.log.push([this.p, ajaxRequest, hashValue])
      this.logIndex = this.log.length;
      ajax(ajaxRequest, hashValue);
      this.ajaxStatus = ajaxRequest;
      }
  },

  pushStatus: function(text) {
    this.p = text;
  },

  value: function() {
    if(this.swtch) {
      return this.t;
    }
    else { 
      return this.p;
    }
  },

  update: function() { 
    if($("#textTitle").text() !== this.value()) {
      $("#textTitle").fadeOut(5, function(){
        $("#textTitle").text(title.value()).fadeIn(title.fadeSpeed, 'linear');
      });
    }
    if(title.logIndex>=2) { 
      this.nav.back = true; 
      m.newCursorBack = "pointer";
      this.nav.hoverBackGrey = 100;
    } 
    else { 
      this.nav.back = false;
      m.newCursorBack = "auto";
      this.nav.hoverBackGrey = 70;
    }
    if(title.logIndex<title.log.length) { 
      this.nav.forward = true;
      m.newCursorForward = "pointer";
      this.nav.hoverForwardGrey = 100;
    } 
    else { 
      this.nav.forward = false 
      m.newCursorForward = "auto";
      this.nav.hoverForwardGrey = 70;
    }
  },

  mobileUpgrade: function(text, ajaxRequest, hashValue) {
    
    $("#textTitle").text(text)

    this.p = text;
    this.swtch = false;

      if(ajaxRequest !==  this.ajaxStatus) {
        this.log.push([this.p, ajaxRequest, hashValue])
        this.logIndex = this.log.length;
        ajax(ajaxRequest, hashValue);
        this.ajaxStatus = ajaxRequest;
      }
  }
  
}

var text = { 

  alpha: {
    increase: "Increase in Alpha",
    decrease: "Decrease in Alpha"
  },

  dep: {
    increase: "Increase in Depreciation",
    decrease: "Decrease in Depreciation",
    curve: "The Depreciation Function"
  },

  savings: { 
    increase: "Increase in Savings",
    decrease: "Decrease in Savings", 
    curve: "The Savings Function"
  },

  tech: { 
    increase: "Technological progress",
    decrease: "Technological decline",
    curve: "The Production Function"
  },

  inputVar: {
    alpha: "Alpha",
    savings: "The Savings Rate", 
    dep: "The Depreciation Rate",
    tech: "Technology/Labour efficiency"
  },

  keyVar: {
    k: "Steady-State Capital/Worker",
    k2: "Steady-State Capital/Worker",
    y: "Steady-State Output/Worker",
    c: "Steady-State Consumption/Worker",
    i: "Steady-State Investment/Worker",
    MPK: "Marginal Product of Capital",
    K: "Capital/Worker",
    Y: "Output/Worker"
  },

  index: {
    x: "k",
    y: "y"
  },

  equations: {
    EqProd: ["Y", "K", "tech", "alpha"],
    EqSS: ["savings", "tech", "k", "alpha", "dep", "k2"]
  },

  curvePad: 0.05,

  varAccess: function(input) {
    for(index in this.inputVar) {  
      if(index === input) {
        return "inputVar";
      }
    }
    for(index2 in this.keyVar) { 
      if(index2 === input) {
        return "keyVar";
      }
    }    
  },

  hashHandler: function(input) {
    if(this.inputVar.hasOwnProperty(input)) { 
      return v.fullName(input)
    }
    else { 
      return this.keyVar[input].replace(/\s+/g, '').replace('/','');
    }
  }
}


var font = { 

  equation: { 
    basis: 19,
  
    XS: 0.75, 
    S: 0.95,
    L: 1.05, 
    XL: 1.1
  },
  symbol: 17,

  table: 16, 

  title: {
    weight: 700
   // size: 30
  },
  content: 16,

  index: 16,
  indexScale: 1.5,
  paddingRatio: 0.6,
  indexRatio: 1.2

}

/*
// Set the font size to the default for the "y"s and "="s
$("#equationsDiv").css({"font-size": font.equation.basis});
$(".symbolText").css("fontSize", font.symbol);
$(".data").css("fontSize", font.table);
$("#textTitle").css("fontSize", font.title.size);
$("#textTitle").css("font-weight", font.title.weight)
$("#textDiv").css("fontSize", font.content);
*/

var active = true;
$(window).focus(function() {
  active = true;
  m.newCursorBody = m.newCursorSlider = "auto";
});
$(window).blur(function() {
  active = false;
  m.newCursorBody = m.newCursorSlider = "auto";
});

var now = Date.now()

// variable used for rescaling the ID box, assigned value is irrelevant.s
var scaleT = ID.scale;

// the object containing the width properties of the lines
var lineWidth = {
    axes: 0,
    graph: 0
};

// the limits of the graph for resizing
var sizeLimit = {
    width: 0,
    height: 0
};



resizecanvasGraph();

// the event listener for firing the resizecanvasGraph function every time the window is resized
window.addEventListener("resize", resizecanvasGraph, false);


    function gameLoop() {
        requestAnimFrame(gameLoop);
        drawScreen();
            }
       gameLoop();

    function drawScreen() {  


v.round10000("alpha")
v.round10000("savings")
v.round10000("dep")
v.round10000("tech")


 key = ((oldWidth * GraphCanvasDisplayRatio) - GraphCanvasDisplayRatio*(padding.left+padding.right))/((canvasLogicConstants.width - (padding.left + padding.right))*GraphCanvasDisplayRatio);

 v.unit = ((oldHeight * GraphCanvasDisplayRatio)/GraphCanvasDisplayRatio - padding.bottom - unitFunc())/key;



for(i = 0; i <= 3; i++) {
   v[Object.keys(v)[i]] = round10000(document.getElementById(Object.keys(v)[i] + "Input").value);
} 

now = Date.now();       
        
if (v["a"].shift.swtch) {
    shiftEaseLoop("a", "alpha", 0, 1)
}

if (v["s"].shift.swtch) {
    shiftEaseLoop("s", "savings", 0, 1)
}

if (v["d"].shift.swtch) {
    shiftEaseLoop("d", "dep", 0, 1)
}

if (v["t"].shift.swtch) {
    shiftEaseLoop("t", "tech", 0, v.t.max)
}


if (scaleSwitch) {
    scaleTime = Date.now();
    scaleClock = scaleTime - scaleStartTime;
    ID.scale = easeOutCubic(scaleClock, scaleStart, scaleDistance, duration);

   if (scaleClock >= duration) {
        scaleSwitch = false
        ID.scale = scaleT;
        m.newCursorBody = "auto"
    }
    graphScale = ID.height*ID.scale/10;
}


ease.zoom.allowUpdate();      

max.compute();

inter.compute();

hypoInter.compute();

// cover the canvas with white
whiteRefresh();

// draw the axes
showAxes();

unitIndex(1);

// draw the dotted indices
dottedIndex();



// plot the functions, specifiying the function, color and desired precision
Graph(function graph(x) {return v.tech*Math.pow(x, v.alpha);}, rgbString(v.t.color), 0.5, lineWidth.graph*(v.t.lineRatio + v.t.clickBonus));

Graph(function graph(x) {return v.tech*v.savings*Math.pow(x, v.alpha);}, rgbString(v.s.color), 0.5, lineWidth.graph*(v.s.lineRatio + v.s.clickBonus));

Graph(function graph(x) {return v.dep*x;}, rgbString(v.d.color), 0.1, lineWidth.graph*(v.d.lineRatio + v.d.clickBonus));
        


if (inter.b.x < max.x && inter.b.y < max.y) {
 Point(plotX(inter.b.x), plotY(inter.b.y), rgbString(v.P1Color), lineWidth.graph*0.6*(v.t.lineRatio + v.P2Bonus));
};

if (inter.a.x < max.x && inter.a.y < max.y) {
 Point(plotX(inter.a.x), plotY(inter.a.y), rgbString(v.P2Color), lineWidth.graph*0.6*(Math.max(v.d.lineRatio, v.s.lineRatio) + v.P1Bonus));
};



}



