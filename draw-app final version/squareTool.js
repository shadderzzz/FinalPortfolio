function SquareTool() {
    //adds an icon with a url to the image file path
    //adds a name to the function
    this.icon = "assets/squareTool.png";
    this.name = "SquareTool";
    this.lineFatness = 1.3;
    //initialises some local variables for the starting position and state of the cursor
    var startX = -1;//the starting x position of the cursor
    var startY = -1;//the starting y position of the cursor
    var drawing = false;//whether the user is drawing or not
    this.draw = function() {
      //if = or - is pressed change lineFatness
      if (keyIsPressed) {//if a key is pressed
        if (key == "=") {//if the key is =
          this.lineFatness += 0.3;//increase the lineFatness
        } else if (key == "-" && this.lineFatness > 1) {//if the key is - and the lineFatness is greater than 1
          this.lineFatness -= 0.3;//decrease the lineFatness
        }
      }
      //checks whether mouse is pressed and if it is it starts drawing
      if (mouseIsPressed) {
        if (!drawing) {//if the user is not drawing
          startX = mouseX;//set the starting x position to the current x position of the cursor
          startY = mouseY;//set the starting y position to the current y position of the cursor
          drawing = true;//the user is now drawing
          //loadPixels() allows the user to control the individual pixels on the canvas
          loadPixels();
        } else {
          //updates the pixels[] array to allow changes to be visible
          updatePixels();
          // set line thickness
          strokeWeight(this.lineFatness);
          // set no fill to make square hollow
          noFill();
          // determine the top left and bottom right corners of the square
          var x1 = startX;//the x position of the top left corner of the square
          var y1 = startY;//the y position of the top left corner of the square
          var x2 = mouseX;//the x position of the bottom right corner of the square
          var y2 = mouseY;//the y position of the bottom right corner of the square
          if (x1 > x2) {
            var temp = x1;//temporary variable to store the x1 value
            x1 = x2;//set x1 to x2
            x2 = temp;//set x2 to the temporary variable
          }
          if (y1 > y2) {
            var temp = y1;//temporary variable to store the y1 value
            y1 = y2;//set y1 to y2
            y2 = temp;//set y2 to the temporary variable
          }
          // draw the square
          rect(x1, y1, x2 - x1, y2 - y1);//draws a rectangle with the top left corner at (x1, y1) and a width of x2 - x1 and a height of y2 - y1
        }
      }
      //if mouse is not being pressed nothing happens
      else if (drawing) {
        drawing = false;//the user is no longer drawing
        startX = -1;//the starting x position is reset
        startY = -1;//the starting y position is reset
      }
    };
  }
  