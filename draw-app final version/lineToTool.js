function LineToTool(){
	//adds an icon with a url to the image file path
	//adds a name to the function
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";
	// sets a default thickness for the line
	this.lineFatness = 1.3;
	//initialises some local variables for the starting position and state of the cursor
	var startMouseX = -1; //the starting x position of the cursor
	var startMouseY = -1; //the starting y position of the cursor
	var drawing = false; //whether the user is drawing or not
	this.draw = function(){
		//if the equals sign or hyphen key is pressed, adjust the thickness of the line accordingly
		if (keyIsPressed){
			if (key == "="){
				this.lineFatness += 0.3;
			}
			else if (key == "-" && this.lineFatness > 1){ //the line thickness cannot be less than 1
				this.lineFatness -= 0.3;
			}
		}
		//checks whether the mouse is being pressed and if it is, starts drawing
		if(mouseIsPressed){
			if(startMouseX == -1){ //if the starting position of the cursor is -1, set it to the current position
				startMouseX = mouseX; //the starting x position of the cursor
				startMouseY = mouseY; //the starting y position of the cursor
				drawing = true;
				//loadPixels() allows the user to control the individual pixels on the canvas
				loadPixels();
			}
			else{
				//updates the pixels[] array to allow changes to be visible
				updatePixels();
				//sets the stroke weight (i.e. thickness) of the line
				strokeWeight(this.lineFatness);
				//draws the line from the starting position to the current position of the cursor
				line(startMouseX, startMouseY, mouseX, mouseY);
			}
		}
		//if the mouse is not being pressed, stop drawing
		else if(drawing){
			drawing = false; //the user is no longer drawing
			startMouseX = -1;
			startMouseY = -1;
		}
	};
}
