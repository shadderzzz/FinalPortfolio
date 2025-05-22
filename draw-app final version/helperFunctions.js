function HelperFunctions() {
	// These are p5.dom click events. Notice that there is no 'this.' 
	// at the start. We don't need to use 'this.' here because the event 
	// will be added to the button and doesn't 'belong' to the object.
	// This is an event handler for the 'clear' button event. It clears the screen.
	select("#clearButton").mouseClicked(function() {
		background(255);
		// Call loadPixels to update the drawing state. This is needed for the mirror tool.
		loadPixels();
	});
	// This is an event handler for the 'save image' button. It saves the canvas to the local file system.
	select("#saveImageButton").mouseClicked(function() {
		saveCanvas("My Drawing", "png")
	});
}