/* Author: madpimp
	Messing around with CSS3 stuff using http://css3.bradshawenterprises.com/all/ as a tutorial
*/



function css3Slider(slideName, newSlideContainerWidth, currentSlideLocation){

	
	//for each click on a span, this code
	//1. checks what the current index is
	//2. if index is not 0, then slide location = the combination of all of the previous slides - 1 
	//3. if current slide location goes further than (the end of the container width - the current window width) then the location = maxslide
	//4. use change the positioning and utilize CSS transitioning to handle the animation 
	
	if (newSlideContainerWidth == 0){
		newSlideContainerWidth = $(slidename + "_container").width();
	}
	
	$(slideName + "_controls span").click(function(){
		var currentSlideIndex = $(this).index();
		if(currentSlideIndex != 0){
			while(currentSlideIndex > 0){
				currentSlideLocation-=$(slideName + "_images img:nth-child("+currentSlideIndex+")").width();
				currentSlideIndex--;
			}
	}
	var maxSlide = (-newSlideContainerWidth+$(window).width());
	if(currentSlideLocation < maxSlide){
			currentSlideLocation = maxSlide;
	}
	$(slideName + "_images").css("left",currentSlideLocation);
	//alert(currentSlideLocation);
	currentSlideLocation = 0;
	});
}
$(document).ready(function() {
	//prefix of the scroller
	var slideName = "#slide1";
	
	$("#slide1_controls span").hide();
	//changes the size of the container to match the width of all the images. 
	//only needed for variable width of slideshow.
	var newSlideContainerWidth = 0;
	$(slideName + "_images img").load(function() {
		newSlideContainerWidth += $(this).width();
		$(slideName + "_images").width(newSlideContainerWidth);
		
	});  	
	
	//because of the container width situation, css3slider has to be run after all of the page has loaded so we know the container width
	//also not needed if we know the width for the slideshow
	$(window).load(function () {	
	var currentSlideLocation = 0;
	css3Slider(slideName, newSlideContainerWidth, currentSlideLocation);
	$("#slide1_controls span").show();
	});
	
});






















