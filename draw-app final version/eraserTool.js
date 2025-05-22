function eraserTool(){
	// Set an icon and a name for the object
	this.icon = "assets/eraserTool.png";
	this.name = "eraser";
	this.lineFatness = 25; // Set the thickness of the eraser
	this.colour = 255; // Set the color of the eraser
	// To smoothly draw, we'll draw a line from the previous mouse location
	// to the current mouse location. The following values store
	// the locations from the last frame. They are -1 to start with because
	// we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;
	this.draw = function(){
		// If = or - is pressed change lineFatness
		if (keyIsPressed){
			if (key == "="){
				this.lineFatness += 0.3; // Increase the thickness of the eraser
			}
			else if (key == "-" && this.lineFatness > 1){
				this.lineFatness -= 0.3; // Decrease the thickness of the eraser, if it is greater than 1
			}
		}
		// If the mouse is pressed
		if(mouseIsPressed){
			// Check if the previousX and Y are -1. Set them to the current
			// mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			// If we already have values for previousX and Y we can draw a line from 
			// there to the current mouse location
			else{
				strokeWeight(this.lineFatness); // Set the thickness of the eraser stroke
                stroke(this.colour); // Set the color of the eraser stroke
				line(previousMouseX, previousMouseY, mouseX, mouseY); // Draw a line from the previous mouse position to the current mouse position
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		}
		// If the user has released the mouse, we want to set the previousMouse values 
		// back to -1.
		// Try and comment out these lines and see what happens!
		else{
			previousMouseX = -1;
			previousMouseY = -1;
		}
	};
}