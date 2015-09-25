// define the context1
var canvasGraph = document.getElementById("canvasGraph");
var context1 = canvasGraph.getContext("2d");


var desktop = true;


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
var menuHeight = 60;
// set the height of the menu div
$("#Menu").height(menuHeight);

// define the padding for desktop in px
var padding = {
    top: 80,
    bottom: 80,
    left: 90,
    right: 80
};

// main colors that will be reused
var color = {
    g1: 20, 
    g2: 45, 
    g3: 100,

    table: {
      init: 0.8,
      hover: 5,
      click: 15
    },

    symbols: 60,

    Init: 220,
    darken: 60

}


// determine the maximum distance we allow the controls panel to resize
var maxResize = Math.round($(window).width() - (($(window).height()-menuHeight)*(canvasLogic.width/canvasLogic.height)));


// desktop version only
if(desktop) {

    // minumum size of the controls panel
    var minPanel = 336;

    // define the size of the controls panel
    var defaultSize = (Math.sqrt($(window).width()))*12;

    // override if it is less than the minimum size
    if(defaultSize<minPanel) {
        defaultSize = minPanel;
    }

    // splitter object containing the size properties
    var splitter = {
        minSize: minPanel,
        size: defaultSize,
        maxSize: defaultSize*1.4,
        divSize: 10
    };

    // override the size of the controls panel if it exceeds the maximum value computed with the window object such that the maximum resize is 20% larger than the computed value
    if (splitter.size>maxResize) {
        splitter.maxSize = splitter.size*1.2;
    }
    else {
        splitter.maxSize = maxResize;
    };

    // generate the splitter with the plugin
    var myLayout = $("#container").layout({

     center: {
        maxSize: 1000
     },

     east: {
        spacing_open: splitter.divSize,
        resizerDragOpacity: 0.5,
        size: splitter.size,
        minSize: splitter.minSize,
        maxSize: splitter.maxSize,
        closable: false,
        livePaneResizing: true,
        resizerCursor: "col-resize",

        onresize: function() {
            resizecanvasGraph();
            resizecanvasControls();
        }
     }
    });

    // object containing the size of the div with the graph
    var divGraph = {
        width: myLayout.center.state.layoutWidth,
        height: $(window).height() - menuHeight
    };

}

else {
        //code for mobile browsers

    // make padding smaller for mobile devices
    padding.left = 20;
    padding.right = 20;
    padding.bottom = 20;
    padding.top = 20;

    // removes the sliders
    $("#rangeControl").css("display", "none");

    // object containing the size of the div with the graph
    var divGraph = {
        width: $(window).width(),
        height: $(window).height() - menuHeight
    };
}


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
    lineBasis: 1.35,
    lineGraphRatio: 1.25,
    scale: 1.1
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
       r: color.Init,
        g: 0,
        b: 0,
        string: "red"
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
        r: 0,
        g: 0,
        b: color.Init,
        string: "blue"
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
    r: singleGrey(color.g2),
    g: singleGrey(color.g2),
    b: singleGrey(color.g2) + 1,
    string: "shade1"
 },
 P2Color: {
    r: singleGrey(color.g2),
    g: singleGrey(color.g2),
    b: singleGrey(color.g2) + 2,
    string: "shade2"
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
      proportionA: 0.1
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
  }

}

var text = { 

  refresh: "The Solow Model",

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
    weight: 700,
    size: 19
  },
  content: 16,

  index: 18,
  indexScale: 1.5,
  paddingRatio: 1.2,
  indexRatio: 1.5

}

// Set the font size to the default for the "y"s and "="s
$("#equationsDiv").css({"font-size": font.equation.basis});

$(".symbolText").css("fontSize", font.symbol);
$(".data").css("fontSize", font.table);
$("#textTitle").css("fontSize", font.title.size);
$("#textTitle").css("font-weight", font.title.weight)
$("#textDiv").css("fontSize", font.content);


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
    width: 200,
    height: 400
};

equationHover();

$("#alphaInput").mouseenter( function() {
  v.t.lineEasing.Large = true;
  m.alphaHover = true;
})
$("#alphaInput").mouseleave( function() {
  v.t.lineEasing.Large = false;
  setTimeout(function(){
      m.alphaHover = false;
  }, ease.equation.updateRatio * 500);
})


for (i = 1; i < 4; i++) { 
  (function(i) {           
    $("#" + Object.keys(v)[i] + "Input").mouseenter( function() {
      v[Object.keys(v)[i+4]].lineEasing.Large = true;
    })
    $("#" + Object.keys(v)[i] + "Input").mouseleave( function() {
      v[Object.keys(v)[i+4]].lineEasing.Large = false;
    })

  }(i));
}


var sliderDown = false;

for (i = 0; i < 4; i++) { 
  (function(i) {

   $("#" + Object.keys(v)[i] + "Input").on("mousedown", function() {
      refValue = v[Object.keys(v)[i]];
      sliderDown = true;
   })

   $("#" + Object.keys(v)[i] + "Input").on("mousemove", function() {
      if(sliderDown) {
        if(refValue<v[Object.keys(v)[i]]) { 
          title.setTransStatus(text[Object.keys(v)[i]].increase);
          }
        else { 
          title.setTransStatus(text[Object.keys(v)[i]].decrease);
        }
      }
   })

   $("#" + Object.keys(v)[i] + "Input").on("mouseup", function() {
    if(title.swtch === true) {
      if(refValue<v[Object.keys(v)[i]]) { 
        title.upgradeStatus(window.location.pathname + "-" + v.property(i) + "-increase", v.fullName(v.property(i)) + "-increase");
      } 
      else {
        title.upgradeStatus(window.location.pathname + "-" + v.property(i) + "-decrease", v.fullName(v.property(i)) + "-decrease");
      }
     }  
     sliderDown = false;
     rescale();
    })  
  }(i));
}


for (i = 0; i < v.keyVar.length; i++) { 
  (function(i) {
     $("#var-" + v.keyVar[i]).mouseenter(function(){  

      m.g.newHoverVar = v.keyVar[i];
        title.setTransStatus(text.keyVar[v.keyVar[i]]);
        $("#var-" + v.keyVar[i]).parent().css("background-color", grey(color.table.hover));
      }).mouseleave(function(){       
        $("#var-" + v.keyVar[i]).parent().css("background-color", grey(color.table.init));
      })

      $("#var-" + v.keyVar[i]).mousedown(function(){       
        title.upgradeStatus(window.location.pathname + "-" + v.keyVar[i], text.keyVar[v.keyVar[i]].replace(/\s+/g, '').replace('/',''));
        $("#var-" + v.keyVar[i]).parent().css("background-color", grey(color.table.click));
      }).mouseup(function(){       
        $("#var-" + v.keyVar[i]).parent().css("background-color", grey(color.table.hover));
      })

  }(i));
}

 $("#tableContainerDiv").mouseleave(function(){
  title.revertTransStatus();
  m.g.newHoverVar = m.g.hoverDefault;
 });

  for (i = 0; i < 4; i++) { 
   (function(i) {
     $("#" + v.property(i) + "InputSymbol").mouseenter(function(){ 
         title.setTransStatus(text.inputVar[v.property(i)]);
     })
     $("#" + v.property(i) + "InputSymbol").mousedown(function(){ 
        title.upgradeStatus(window.location.pathname + "-" + v.property(i), v.fullName(v.property(i)));
     })
  }(i));
}

 $(".sliderRow").mouseleave(function(){ 
   title.revertTransStatus();
 })


for (Eq in text.equations) { 
  (function(Eq) {
    for (i = 0; i < text.equations[Eq].length; i++) { 
     (function(i) {
        $("#" + Eq + text.equations[Eq][i]).mouseenter(function(){
          title.setTransStatus(text[text.varAccess(text.equations[Eq][i])][text.equations[Eq][i]]);
        }) 
        $("#" + Eq + text.equations[Eq][i]).mousedown(function(){
          title.upgradeStatus(window.location.pathname + "-" + text.equations[Eq][i], text.hashHandler(text.equations[Eq][i]));
        }) 
      }(i));
    }
    $("#" + Eq).mouseleave(function(){ 
     title.revertTransStatus();
    })
  }(Eq));
}


$("#back").mousedown(function(){
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

$("#forward").mousedown(function(){
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


$("#back").hover(function(){
  $("#back").css('color', grey(title.nav.hoverBackGrey));
}, function(){
  $("#back").css('color', grey(title.nav.defaultGrey));
})

$("#forward").hover(function(){
  $("#forward").css('color', grey(title.nav.hoverForwardGrey));
}, function(){
  $("#forward").css('color', grey(title.nav.defaultGrey));
})
  

$("input").on("input", function(){
  rescaleStatus = scaleStatus();
  if(rescaleStatus) {
    m.newCursorSlider = "not-allowed";
  }
  else {
    m.newCursorSlider = "pointer";
  }
});

$("input").on("mouseup", function(){
  m.newCursorSlider = "pointer";
});


if (desktop) {

    var rgbObj, message3, p;
    var rescaleStatus = false;

    // initialise mouse position before first hover of canvas.
    var mousePos = {
        x: 0,
        y: 0
    }


var tags = ["Menu", "canvasGraph", "canvasControls", "sliderDiv", "equationsDiv", "vectorDiv", "text"];

for(idx = 0; idx<=tags.length-1; idx++) {
   (function(i){             
     $("#" + tags[i]).mouseenter( function() {
        m.tag = tags[i];
        m.newCursorBody = "auto";
     })
   })(idx);
}
     

canvasGraph.addEventListener('mousemove', function(evt) {
  m.g.pos = getMousePos(canvasGraph, evt);
  p = context1.getImageData(GraphCanvasDisplayRatio*m.g.pos.x, GraphCanvasDisplayRatio*m.g.pos.y, 1, 1).data;
  m.g.rgb = "rgb(" + p[0] + "," + p[1] + "," + p[2] + ")";

  rgbObj = {
    r: p[0],
    g: p[1],
    b: p[2]
  }

  if(m.g.stringColor !== colorString(rgbObj) && clickTrue === false && m.g.hoverVar === "none") {
    m.g.stringColor = colorString(rgbObj);
      if(text[v.colorConvert(m.g.stringColor)] != undefined) {
        title.setTransStatus(text[v.colorConvert(m.g.stringColor)].curve); }
      else{ title.revertTransStatus(); }
  }    


}, false);

var clickTrue = false;
var refValue;

canvasGraph.addEventListener('mousedown', function(evt) {
  clickTrue = true;
  m.g.stringColorClick = m.g.stringColor;
  refValue = v[v.colorConvert(m.g.stringColorClick)];

  // THE TEMPORARY FIX !!!!
  if(m.g.stringColorClick === "shade1") { 
     m.g.stringColorClick = "shade2";
  }
  else if(m.g.stringColorClick === "shade2") { 
     m.g.stringColorClick = "shade1";
  }

  if(m.g.hoverVar !== "none") { 
   title.upgradeStatus(window.location.pathname + "-" + m.g.hoverVar, text.keyVar[m.g.hoverVar].replace(/\s+/g, '').replace('/',''));
  }

}, false);


canvasGraph.addEventListener('mouseup', function(evt) {
  clickTrue = false;
  rescale();
  v.s.clickBonus = v.d.clickBonus = v.t.clickBonus = v.P1Bonus = v.P2Bonus = 0;

  if((v.colorConvert(m.g.stringColorClick)) != undefined) { 
    if(refValue*(1+text.curvePad)<v[v.colorConvert(m.g.stringColorClick)]) { 
      title.upgradeStatus(window.location.pathname + "-" + v.colorConvert(m.g.stringColorClick) + "-increase", v.fullName(v.colorConvert(m.g.stringColorClick)) + "-increase");
    } 
    else if(refValue*(1-text.curvePad)>v[v.colorConvert(m.g.stringColorClick)]) { 
      title.upgradeStatus(window.location.pathname + "-" + v.colorConvert(m.g.stringColorClick) + "-decrease", v.fullName(v.colorConvert(m.g.stringColorClick)) + "-decrease");
    }
    else {
      title.upgradeStatus(window.location.pathname + "-" + v.colorConvert(m.g.stringColorClick) + "function", v.fullName(v.colorConvert(m.g.stringColorClick)) + "-function");
    }
  }

}, false);

}

resizecanvasGraph();

// the event listener for firing the resizecanvasGraph function every time the window is resized
window.addEventListener("resize", resizecanvasGraph, false);


    function gameLoop() {
        requestAnimFrame(gameLoop);
        drawScreen();
    }
    gameLoop();

    function drawScreen() {  

//the text update method for the textTitle div
title.update();

v.round10000("alpha")
v.round10000("savings")
v.round10000("dep")
v.round10000("tech")


 key = ((oldWidth * GraphCanvasDisplayRatio) - GraphCanvasDisplayRatio*(padding.left+padding.right))/((canvasLogicConstants.width - (padding.left + padding.right))*GraphCanvasDisplayRatio);

 v.unit = ((oldHeight * GraphCanvasDisplayRatio)/GraphCanvasDisplayRatio - padding.bottom - unitFunc())/key;


if(desktop) {

  if (clickTrue) {
        
      if(m.g.stringColorClick === v["d"].color.string) { 
       dragUpdate("dep", ((plotRY(m.g.pos.y))/(plotRX(m.g.pos.x))), 1, true);
       dragTitle("dep");
      }

      if(m.g.stringColorClick === v["s"].color.string) { 
       dragUpdate("savings", (plotRY(m.g.pos.y))/(v.tech*Math.pow(plotRX(m.g.pos.x), v.alpha)), 1, true);
       dragTitle("savings");
      }        

      if(m.g.stringColorClick === v["t"].color.string) { 
       dragUpdate("tech", (plotRY(m.g.pos.y))/Math.pow(plotRX(m.g.pos.x), v.alpha), v.t.max, true);
       dragTitle("tech");
      }        

      if(m.g.stringColorClick === v["P2Color"].string) {
       dragUpdate("tech", (plotRY(m.g.pos.y))/Math.pow(plotRX(m.g.pos.x), v.alpha), v.t.max, false)
       v.savings = ((plotRX(m.g.pos.x)*v.dep)/(plotRY(m.g.pos.y)))
       document.getElementById("savingsInput").value = v.savings;
       v.P2Bonus = v.bonusSize;
      }

      if(m.g.stringColorClick === v["P1Color"].string) {
       dragUpdate("dep", ((plotRY(m.g.pos.y))/(plotRX(m.g.pos.x))), 1, false)
       dragUpdate("savings", (plotRY(m.g.pos.y))/(v.tech*Math.pow(plotRX(m.g.pos.x), v.alpha)), 1, false)
       v.P1Bonus = v.bonusSize;
      }

      if(m.tag !== "canvasGraph") {
        clickTrue = false;
        title.revertTransStatus();
        m.g.stringColor = m.g.stringColorClick = "OTHER";
        v.s.clickBonus = v.d.clickBonus = v.t.clickBonus = v.P1Bonus = v.P2Bonus = 0;
        rescale();
      }
        
    rescaleStatus = scaleStatus();
    }

    if(m.tag==="canvasGraph") {
      m.newCursorBody = "auto"
    }


    if(m.g.stringColor===v.s.color.string || m.g.stringColor===v.d.color.string || m.g.stringColor===v.t.color.string || m.g.stringColor===v.P2Color.string || m.g.stringColor===v.P1Color.string || (clickTrue && (m.g.stringColorClick===v.s.color.string || m.g.stringColorClick===v.d.color.string || m.g.stringColorClick===v.t.color.string || m.g.stringColorClick===v.P2Color.string || m.g.stringColorClick===v.P1Color.string))) {
        m.newCursorBody = "pointer";
    }

    if(rescaleStatus) {
        m.newCursorBody = "not-allowed"
        rescaleStatus = scaleStatus();
    }

    if(m.tag !== "canvasControls" && m.tag !== "sliderDiv") {
   
      curveHoverLineEase("t", "P1Color")

      curveHoverLineEase("s", "P2Color")
      curveHoverLineEase("d", "P2Color")

      wrapHoverEase("s", "X1")
      wrapHoverEase("d", "X2")
      wrapHoverEase("t", "X3")
    }

    for(i=1; i<=3; i++) {
      easeControl(v[v.property(i+4)].lineEasing, v[v.property(i+4)].lineRatio);
      lineEaseLoop(v[v.property(i+4)].lineEasing, v.property(i));
    }
    
    // update of the colors
    v.s.color.g = color.Init + Math.round(color.darken*(v.s.lineRatio - 1 + v.s.clickBonus));
    v.d.color.r = color.Init + Math.round(color.darken*(v.d.lineRatio - 1 + v.d.clickBonus));
    v.t.color.b = color.Init + Math.round(color.darken*(v.t.lineRatio - 1 + v.t.clickBonus));

    v.P1Color.r = v.P1Color.g = singleGrey(color.g2) + Math.round(color.darken*(v.t.lineRatio - 1 + v.t.clickBonus));
    v.P1Color.b = v.P1Color.r + 1;

    v.P2Color.r = v.P2Color.g = singleGrey(color.g2) + Math.round(color.darken*((Math.max(v.d.lineRatio, v.s.lineRatio) - 1 + Math.max(v.d.clickBonus, v.s.clickBonus) )));
    v.P2Color.b = v.P2Color.r + 2;
}

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

if(m.tag !== "equationsDiv") {
   equationUpdate();
}
        
 // Update the text in the span if the values are new       
for(i=0; i<=3; i++) { 
 for(eq=0; eq<=(ease.equation.ID.length - 1); eq++) { 
  if (document.getElementById(ease.equation.ID[eq] + Object.keys(v)[i]) !== null) { 
    if(convertSym($("#" + ease.equation.ID[eq] + Object.keys(v)[i]).html()) !== v[Object.keys(v)[i+4]][ease.equation.ID[eq]]) {
       $("#" + ease.equation.ID[eq] + Object.keys(v)[i]).html(v[Object.keys(v)[i+4]][ease.equation.ID[eq]]);
}}}}   


m.g.hoverUpdate(); 

cursorUpdate();

ease.zoom.allowUpdate();      

max.compute();

inter.compute();

hypoInter.compute();

// update the values of the variable table.
box.update("k", inter.a.x)
box.update("y", inter.b.y)
box.update("c", inter.b.y - inter.a.y)
box.update("i", inter.a.y)
box.update("MPK", v.tech*v.alpha*Math.pow(inter.a.x,v.alpha-1))

// cover the canvas with white
whiteRefresh();


// the curve wrap
Graph(function graph(x) {return v.tech*Math.pow(x, v.alpha);}, rgbString(v.t.wrapColor), 0.5, v.wrapRatio*lineWidth.graph);
Graph(function graph(x) {return v.tech*v.savings*Math.pow(x, v.alpha);}, rgbString(v.s.wrapColor), 0.5, v.wrapRatio*lineWidth.graph);
Graph(function graph(x) {return v.dep*x;}, rgbString(v.d.wrapColor), 0.1, v.wrapRatio*lineWidth.graph);


// draw the axes
showAxes();

if(desktop) {
    unitIndex(1);
}

// draw the dotted indices
dottedIndex();



// plot the functions, specifiying the function, color and desired precision
Graph(function graph(x) {return v.tech*Math.pow(x, v.alpha);}, rgbString(v.t.color), 1, lineWidth.graph*(v.t.lineRatio + v.t.clickBonus));

Graph(function graph(x) {return v.tech*v.savings*Math.pow(x, v.alpha);}, rgbString(v.s.color), 1, lineWidth.graph*(v.s.lineRatio + v.s.clickBonus));

Graph(function graph(x) {return v.dep*x;}, rgbString(v.d.color), 0.2, lineWidth.graph*(v.d.lineRatio + v.d.clickBonus));
        


if (inter.b.x < max.x && inter.b.y < max.y) {
 Point(plotX(inter.b.x), plotY(inter.b.y), rgbString(v.P1Color), lineWidth.graph*0.6*(v.t.lineRatio + v.P2Bonus));
};

if (inter.a.x < max.x && inter.a.y < max.y) {
 Point(plotX(inter.a.x), plotY(inter.a.y), rgbString(v.P2Color), lineWidth.graph*0.6*(Math.max(v.d.lineRatio, v.s.lineRatio) + v.P1Bonus));
};


}



