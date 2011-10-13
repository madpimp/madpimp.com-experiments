    var images = {};
    var kin;
 
    // drag and drop globals
    var offsetX = 0;
    var offsetY = 0;
 
    // reszize globals
    var resizeStartX = 0;
    var resizeStartY = 0;
    var resizeStartScaleX = 0;
    var resizeStartScaleY = 0;
    var resizeOffsetX = 0;
    var resizeOffsetY = 0;
 
    // resize corner constants
    var TOP_LEFT = "TOP_LEFT";
    var TOP_RIGHT = "TOP_RIGHT";
    var BOTTOM_RIGHT = "BOTTOM_RIGHT";
    var BOTTOM_LEFT = "BOTTOM_LEFT";
    var NONE = "NONE";
	var gmessage = "ha ha ha";
	var rolledover = "true";
	var toggleCorners = "Hide Corners";
 
    // initialize an array of rectangles that provide
    // rectangular paths and properties for the images
    var rectangles = [{
        name: "border1",
        image: null,
        x: 475,
        y: 400,
        width: 100,
        height: 100,
        dragging: false,
        resizeCorner: NONE,
        scaleX: 1,
        scaleY: 1
    }, {
        name: "element1",
        image: null,
        x: 500,
        y: 70,
        width: 50,
        height: 25,
        dragging: false,
        resizeCorner: NONE,
        scaleX: 1,
        scaleY: 1
    }, {
        name: "element2",
        image: null,
        x: 500,
        y: 100,
        width: 50,
        height: 50,
        dragging: false,
        resizeCorner: NONE,
        scaleX: 1,
        scaleY: 1
    },{
        name: "element3",
        image: null,
        x: 500,
        y: 155,
        width: 50,
        height: 50,
        dragging: false,
        resizeCorner: NONE,
        scaleX: 1,
        scaleY: 1
    },{
        name: "element4",
        image: null,
        x: 500,
        y: 210,
        width: 50,
        height: 50,
        dragging: false,
        resizeCorner: NONE,
        scaleX: 1,
        scaleY: 1
    },{
        name: "element5",
        image: null,
        x: 500,
        y: 275,
        width: 50,
        height: 50,
        dragging: false,
        resizeCorner: NONE,
        scaleX: 1,
        scaleY: 1
    },{
        name: "element6",
        image: null,
        x: 500,
        y: 335,
        width: 50,
        height: 50,
        dragging: false,
        resizeCorner: NONE,
        scaleX: 1,
        scaleY: 1
    }/*,{
        name: "mainphoto",
        image: null,
        x: 100,
        y: 70,
        width: 338,
        height: 450,
        dragging: false,
        resizeCorner: NONE,
        scaleX: 1,
        scaleY: 1
    }*/];
	
    function writeMessage(kin, message){
        var context = kin.getContext();
        context.font = "18pt Georgia";
        context.fillStyle = "#9eda1e";
        context.fillText(message, 20, 35);
    }	

	function staticImage(kin, x, y, url){
        var context = kin.getContext();
                
                var destX = x;
                var destY = y;
                
                var imageObj = new Image();
                imageObj.onload = function(){
                    context.drawImage(imageObj, destX, destY);
                };
                imageObj.src = url;
	}
	
	function roundRect(context, x, y, width, height, radius, fill, stroke) {
	  if (typeof stroke == "undefined" ) {
		stroke = true;
	  }
	  if (typeof radius === "undefined") {
		radius = 5;
	  }
	  context.beginPath();
	  context.moveTo(x + radius, y);
	  context.lineTo(x + width - radius, y);
	  context.quadraticCurveTo(x + width, y, x + width, y + radius);
	  context.lineTo(x + width, y + height - radius);
	  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	  context.lineTo(x + radius, y + height);
	  context.quadraticCurveTo(x, y + height, x, y + height - radius);
	  context.lineTo(x, y + radius);
	  context.quadraticCurveTo(x, y, x + radius, y);
	  context.closePath();
	  if (stroke) {
		context.stroke();
	  }
	  if (fill) {
		context.fill();
	  }        
	}	
	
    function loadImages(sources, callback){
        var loadedImages = 0;
        var numImages = 0;
        for (var src in sources) {
            numImages++;
        }
        for (var src in sources) {
            images[src] = new Image();
            images[src].onload = function(){
                if (++loadedImages >= numImages) {
                    callback();
                }
            };
            images[src].src = sources[src];
        }
    }
 
	function drawResizeBoxNF(x, y, rect, resizeCorner){
	
        var context = kin.getContext();
        kin.beginRegion();
        context.beginPath();
        context.fillStyle = "rgba(218,145,145, 0.5)";
        context.rect(x, y, 10, 10);
        context.fill();
        context.closePath();
		
		
	}
 
    function drawResizeBox(x, y, rect, resizeCorner){
 
        var context = kin.getContext();
        kin.beginRegion();
        context.beginPath();
        context.fillStyle = "rgba(255, 255, 000, 0.0)";
        context.rect(x, y, 10, 10);
        context.fill();
        context.closePath();
		
		
		
		kin.addRegionEventListener("mouseover", function(){
		});
		
		kin.addRegionEventListener("mouseout", function(){
		});
		kin.addRegionEventListener("mousedown", function(){
            var mousePos = kin.getMousePos();
            rect.resizeCorner = resizeCorner;
            resizeStartX = mousePos.x;
            resizeStartY = mousePos.y;
            resizeOffsetX = rect.x - mousePos.x;
            resizeOffsetY = rect.y - mousePos.y;
            resizeStartScaleX = rect.scaleX;
            resizeStartScaleY = rect.scaleY;
			context.fill();
        });
 
 
        kin.addRegionEventListener("mouseup", function(){
            rect.resizeCorner = NONE;
			context.fill();
        });
 
        kin.closeRegion();
    }
 
    function resizeRect(thisRect){
        var mousePos = kin.getMousePos();
 
        var xDiff = resizeStartX - mousePos.x;
        var yDiff = resizeStartY - mousePos.y;
 
        var scaleOffsetX = thisRect.width * (1 - resizeStartScaleX);
        var scaleOffsetY = thisRect.height * (1 - resizeStartScaleY);
 
        switch (thisRect.resizeCorner) {
            case TOP_LEFT:
                thisRect.scaleX = (thisRect.width + xDiff - scaleOffsetX) / thisRect.width;
                thisRect.scaleY = (thisRect.height + yDiff - scaleOffsetY) / thisRect.height;
 
                thisRect.x = resizeStartX + resizeOffsetX - xDiff;
                thisRect.y = resizeStartY + resizeOffsetY - yDiff;
                break;
            case TOP_RIGHT:
                thisRect.scaleX = (thisRect.width - xDiff - scaleOffsetX) / thisRect.width;
                thisRect.scaleY = (thisRect.height + yDiff - scaleOffsetY) / thisRect.height;
 
                thisRect.y = resizeStartY + resizeOffsetY - yDiff;
                break;
            case BOTTOM_RIGHT:
                thisRect.scaleX = (thisRect.width - xDiff - scaleOffsetX) / thisRect.width;
                thisRect.scaleY = (thisRect.height - yDiff - scaleOffsetY) / thisRect.height;
                break;
 
            case BOTTOM_LEFT:
                thisRect.scaleX = (thisRect.width + xDiff - scaleOffsetX) / thisRect.width;
                thisRect.scaleY = (thisRect.height - yDiff - scaleOffsetY) / thisRect.height;
 
                thisRect.x = resizeStartX + resizeOffsetX - xDiff;
                break;
        }
    }
 
    function initStage(){
        // map images to rectangles array
        counter = 0;
        for (var img in images) {
            rectangles[counter++].image = images[img];
        }
 
        kin = new Kinetic_2d("mycanvas");
        var context = kin.getContext();
		

		
        // when using KineticJS, we need to draw the shapes with the highest z-index
        // first and the shapes with the lowest z-index last in order to 
        // correctly handle shape layering
        context.globalCompositeOperation = "destination-over";
 
        kin.setDrawStage(function(){
            kin.clear();
			
            var mousePos = kin.getMousePos();
 
            for (var n = 0; n < rectangles.length; n++) {
                var thisRect = rectangles[n];
                if (thisRect.dragging) {
                    thisRect.x = mousePos.x - offsetX;
                    thisRect.y = mousePos.y - offsetY;
                }
 
                // handle resizing
                if (thisRect.resizeCorner != "NONE") {
                    resizeRect(thisRect);
                }
 
  
                // draw resize boxes
                drawResizeBox(thisRect.x, thisRect.y, thisRect, TOP_LEFT);				
                drawResizeBox(thisRect.x + (thisRect.width * thisRect.scaleX) - 10, thisRect.y, thisRect, TOP_RIGHT);
                drawResizeBox(thisRect.x + (thisRect.width * thisRect.scaleX) - 10, thisRect.y + (thisRect.height * thisRect.scaleY) - 10, thisRect, BOTTOM_RIGHT);
                drawResizeBox(thisRect.x, thisRect.y + (thisRect.height * thisRect.scaleY) - 10, thisRect, BOTTOM_LEFT);
 
				if(rolledover == "true"){
                drawResizeBoxNF(thisRect.x, thisRect.y, thisRect, TOP_LEFT);
                drawResizeBoxNF(thisRect.x + (thisRect.width * thisRect.scaleX) - 10, thisRect.y, thisRect, TOP_RIGHT);
                drawResizeBoxNF(thisRect.x + (thisRect.width * thisRect.scaleX) - 10, thisRect.y + (thisRect.height * thisRect.scaleY) - 10, thisRect, BOTTOM_RIGHT);
                drawResizeBoxNF(thisRect.x, thisRect.y + (thisRect.height * thisRect.scaleY) - 10, thisRect, BOTTOM_LEFT);
					}
                // draw image
                if (thisRect.scaleX != 0 && thisRect.scaleY != 0) {
                    kin.beginRegion();
                    context.save();
                    context.translate(thisRect.x, thisRect.y);
                    context.scale(thisRect.scaleX, thisRect.scaleY);
 
                    context.drawImage(thisRect.image, 0, 0, thisRect.width, thisRect.height);
 
                    context.beginPath();
                    context.rect(0, 0, thisRect.width, thisRect.height);
                    context.closePath();
 
                    kin.addRegionEventListener("mousedown", function(){
                        thisRect.dragging = true;
                        var mousePos = kin.getMousePos();
 
                        offsetX = mousePos.x - thisRect.x;
                        offsetY = mousePos.y - thisRect.y;
 
                        // place this rect at the beginning of the rectangles
                        // array so that is is rendered on top
                        rectangles.splice(n, 1);
                        rectangles.splice(0, 0, thisRect);
                    });
                    kin.addRegionEventListener("mouseup", function(){
                        thisRect.dragging = false;
                    });
                    kin.addRegionEventListener("mouseover", function(){
                        document.body.style.cursor = "pointer";
						//rolledover = "true";	
                    });
                    kin.addRegionEventListener("mouseout", function(){
                        document.body.style.cursor = "default";
						//rolledover = "false";	
                    });
                    context.restore();
                    kin.closeRegion();
                }
				
				

				
            }
			
				//make button that toggles the corner boxes 
                    kin.beginRegion(); 
					 context.beginPath();
					 
					context.font = "bold 12px century gothic";
					context.fillStyle = "rgba(225,225,225,1)";  
					context.fillText(toggleCorners, 480, 30);	
					context.strokeStyle = "black";
					context.fillStyle = "rgba(218,145,145,1)";  
					context.stroke();    
					roundRect(context, 470, 10, 100, 30, 5, true, false);

						kin.addRegionEventListener("mousedown", function(){
							if(rolledover != "true"){ 
								toggleCorners = "Hide Corners";
								rolledover = "true";}
							else{ 
								toggleCorners = "Show Corners";
								rolledover = "false";}
						});
									
					
                    kin.closeRegion();	
					
				
            writeMessage(kin, "Being silly with canvas");
        });
    }
 
    window.onload = function(){
        var sources = {
            border1: "http://madpimp.com/wp-content/uploads/2011/09/curly-template-300x300.png",
            element1: "img/mustache.png",
            element2: "img/hard_hat.png",
            element3: "img/borsalino.png",
            element4: "img/applications_engineering.png",
            element5: "img/henrys_hat.png",
            element6: "img/borsalino.png",
         //   mainphoto: "http://madpimp.com/test/pics/1.jpg"
        };
 
        loadImages(sources, function(){
            initStage();
        });
		
                

    };