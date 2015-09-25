function gameLoop2(){requestAnimFrame(gameLoop2),drawScreen2()}function drawScreen2(){if(whiteRefresh2(),desktop){context2.font=icon.fontSize+"px FontAwesome",context2.fillStyle=grey(color.g3),context2.textAlign="right",context2.textBaseline="middle",context2.fillText(icon.refresh.symbol,icon.ZoomIn.x,icon.ZoomIn.y),context2.fillText(icon.ZoomOut.symbol,icon.ZoomOut.x,icon.ZoomOut.y),context2.fillText(icon.ZoomIn.symbol,icon.refresh.x,icon.refresh.y);for(var t in buttons)buttons[t.toString()].colorTop>color.g2&&(buttons[t.toString()].colorTop-=(color.g3-color.g2)/15),buttons[t.toString()].colorBottom>color.g2&&(buttons[t.toString()].colorBottom-=(color.g3-color.g2)/15);buttons.s.index=v.savings,buttons.d.index=v.dep,buttons.t.index=v.tech/v.t.max,buttons.s.alpha=(v.s.lineRatio+v.s.clickBonus/2-1)/2+.1,buttons.d.alpha=(v.d.lineRatio+v.d.clickBonus/2-1)/2+.1,m.alphaHover===!1&&(buttons.t.alpha=(v.t.lineRatio+v.t.clickBonus/2-1)/2+.1)}buttons.s.draw(),buttons.d.draw(),buttons.t.draw()}var canvasControls=document.getElementById("canvasControls"),context2=canvasControls.getContext("2d");if(desktop)var ControlCanvasLogic={width:splitter.size,height:100};else var ControlCanvasLogic={width:$(window).width,height:170};var devicePixelRatio2=window.devicePixelRatio||1,backingStoreRatio2=context1.webkitBackingStorePixelRatio||context1.mozBackingStorePixelRatio||context1.msBackingStorePixelRatio||context1.oBackingStorePixelRatio||context1.backingStorePixelRatio||1,GraphCanvasDisplayRatio2=devicePixelRatio2/backingStoreRatio2*1,controlPadding={top:10,bottom:10,left:10,right:10},buttonsDefault={Y:15,W:20,H:75,lWidth:.4,lineColor:color.g2,ratio1:.4,ratio2:.3,ratio3:.2,font:"Helvetica",fontRatio:1,ind:function(t){return Object.keys(this)[t]},draw:function(){drawButton(this.X,this.Y,this.letter,this.W,this.H,this.lWidth,this.alpha,grey(this.colorTop),grey(this.colorBottom),grey(this.lineColor),this.fillColor,this.ratio1,this.ratio2,this.ratio3,this.font,this.fontRatio,this.index)},updateHoverStatus:function(){buttonPosUpdate()}},buttons={};buttons.s=Object.create(buttonsDefault),jQuery.extend(buttons.s,{X:60,letter:"S",alpha:.1,colorTop:color.g1,colorBottom:color.g1,lineColor:color.g2,fillColor:v.s.color.string,index:.3,topD:!1,midD:!1,botD:!1,topM:!1,botM:!1}),buttons.d=Object.create(buttonsDefault),jQuery.extend(buttons.d,{X:120,letter:"\u03b4",alpha:.1,colorTop:color.g1,colorBottom:color.g1,lineColor:color.g2,fillColor:v.d.color.string,index:.3,topD:!1,midD:!1,botD:!1,topM:!1,botM:!1}),buttons.t=Object.create(buttonsDefault),jQuery.extend(buttons.t,{X:180,letter:"A",alpha:.1,colorTop:color.g1,colorBottom:color.g1,lineColor:color.g2,fillColor:v.t.color.string,index:.3,topD:!1,midD:!1,botD:!1,topM:!1,botM:!1});var butArray=["s","d","t"],icon={refresh:{x:0,y:0,hover:!1,symbol:"\uf00e"},ZoomIn:{x:0,y:0,hover:!1,symbol:"\uf021"},ZoomOut:{x:0,y:0,hover:!1,symbol:"\uf010"},fontSize:25,hoverUpdate:function(){for(i=0;i<3;i++)this[Object.keys(this)[i]].hover=this[Object.keys(this)[i]].x>m.c.pos.x&&this[Object.keys(this)[i]].x-this.fontSize<m.c.pos.x&&this[Object.keys(this)[i]].y-this.fontSize/2<m.c.pos.y&&this[Object.keys(this)[i]].y+this.fontSize/2>m.c.pos.y?!0:!1;ease.zoom.inAllow===!1&&(this.ZoomIn.hover=!1)},listener:function(t){if(ease.zoom.inAllow===!1&&(this.ZoomIn.hover=!1),this[t].hover)switch(t){case"refresh":refresh();break;case"ZoomIn":ease.zoom.ease(1+ease.zoom.proportion);break;case"ZoomOut":ease.zoom.ease(1-ease.zoom.proportion)}}},structure={ratio:.7,buttonPadding:.28,verticalRatio:.6,iconPadding:.31,iconSize:30};if(desktop&&(canvasControls.addEventListener("mousemove",function(t){m.c.pos=getMousePos(canvasControls,t),buttons.s.updateHoverStatus(),icon.hoverUpdate();for(var o in buttons)buttons[o].topD?(buttons[o].colorTop=color.g2,m.newCursor="pointer",v[o].lineEasing.Large=!0,title.setTransStatus(text[v.property(v.index(o)-4)].increase)):buttons[o].colorTop=color.g1,buttons[o].botD?(buttons[o].colorBottom=color.g2,m.newCursor="pointer",v[o].lineEasing.Large=!0,title.setTransStatus(text[v.property(v.index(o)-4)].decrease)):buttons[o].colorBottom=color.g1,buttons[o].midD&&(v[o].lineEasing.Large=!0,title.setTransStatus(text.inputVar[v.midName(o)]));buttons.s.topD===!1&&buttons.d.topD===!1&&buttons.t.topD===!1&&buttons.s.botD===!1&&buttons.d.botD===!1&&buttons.t.botD===!1&&buttons.s.midD===!1&&buttons.d.midD===!1&&buttons.t.midD===!1&&title.revertTransStatus(),buttons.s.topD===!1&&buttons.d.topD===!1&&buttons.t.topD===!1&&buttons.s.botD===!1&&buttons.d.botD===!1&&buttons.t.botD===!1&&buttons.s.midD===!1&&buttons.d.midD===!1&&buttons.t.midD===!1&&(m.newCursor="auto",v.s.lineEasing.Large=!1,v.d.lineEasing.Large=!1,v.t.lineEasing.Large=!1)},!1),canvasControls.addEventListener("mousedown",function(){buttonListener("s",v.savings,ease.shift.savingsRatio*ease.shift.size),buttonListener("d",v.dep,ease.shift.size),buttonListener("t",v.tech,v.tech*ease.shift.proportionA),icon.listener("refresh"),icon.listener("ZoomIn"),icon.listener("ZoomOut")},!1)),desktop===!1&&(canvasControls.addEventListener("touchstart",function(){var t=event;m.c.touch.x=t.targetTouches[0].pageX-canvasControls.offsetLeft,m.c.touch.y=t.targetTouches[0].pageY-canvasControls.offsetTop,buttonTouchPosUpdate(),buttonTouch("s",v.savings,ease.shift.savingsRatio*ease.shift.size),buttonTouch("d",v.savings,ease.shift.size),buttonTouch("d",v.savings,v.tech*ease.shift.proportionA)},!1),canvasControls.addEventListener("touchend",function(){for(i=0;i<buttons.length;i++)buttons[i].topM&&(buttons[i].colorTop=grey(color.g1)),buttons[i].botM&&(buttons[i].colorBottom=grey(color.g1))},!1)),0==desktop)for(i=0;i<buttons.length;i++)buttons[i].Y-=50;resizecanvasControls(),window.addEventListener("resize",resizecanvasControls,!1),gameLoop2();