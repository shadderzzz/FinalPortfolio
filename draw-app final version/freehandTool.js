// This function creates a freehand drawing tool object
function FreehandTool(){
	// Set an icon and a name for the object
	this.icon = "assets/freehand.jpg";
	this.name = "freehand";
	// Set the initial line thickness
	this.lineFatness = 1.3;
	// To smoothly draw, we'll draw a line from the previous mouse location
	// to the current mouse location. The following variables store
	// the locations from the last frame. They are -1 to start with because
	// we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;
	// Display instructions for changing line thickness and color on startup
	alert("- To change the line thickness use the -/_ and =/+ keys.\n- When switching back from the eraser, reselect the color.");
	// This function is called every time a new frame is drawn
	this.draw = function(){
		// If = or - is pressed, change the line thickness
		if (keyIsPressed){
			if (key == "="){
				this.lineFatness += 0.3;
			}
			else if (key == "-" && this.lineFatness > 1){
				this.lineFatness -= 0.3;
			}
		}
		// If the mouse is pressed
		if(mouseIsPressed){
			// Check if the previous mouse X and Y are -1. Set them to the current
			// mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			// If we already have values for previous X and Y we can draw a line from 
			// there to the current mouse location
			else{
				// Set the stroke weight to the current line thickness
				strokeWeight(this.lineFatness);
				// Draw a line from the previous mouse position to the current mouse position
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				// Update the previous mouse position to the current mouse position
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		}
		// If the user has released the mouse, set the previous mouse values 
		// back to -1.
		// Try commenting out these lines and see what happens!
		else{
			previousMouseX = -1;
			previousMouseY = -1;
		}
	};
}