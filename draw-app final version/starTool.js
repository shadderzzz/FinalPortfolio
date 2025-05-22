function StarTool() {
    //adds an icon with a url to the image file path
    //adds a name to the function
    this.icon = "assets/starTool.png";//the tool icon
    this.name = "StarTool";//the name of the tool
    this.lineFatness = 1.3;//sets a default thickness for the line
    //initialises some local variables for the starting position and state of the cursor
    var startX = -1;//the starting x position of the cursor
    var startY = -1;//the starting y position of the cursor
    var drawing = false;//whether the user is drawing or not
    this.draw = function() {
        //if = or - is pressed change lineFatness
        if (keyIsPressed) {
          if (key == "=") {
            this.lineFatness += 0.3;//increase line thickness
          } else if (key == "-" && this.lineFatness > 1) {//the line thickness cannot be less than 1
            this.lineFatness -= 0.3;//decrease line thickness
          }
        }
        //checks whether mouse is pressed and if it is it starts drawing
        if (mouseIsPressed) {
          if (!drawing) {
            startX = mouseX;
            startY = mouseY;
            drawing = true;
            //loadPixels() allows the user to control the individual pixels on the canvas
            loadPixels();
          } else {
            //updates the pixels[] array to allow changes to be visible
            updatePixels();
            // set line thickness
            strokeWeight(this.lineFatness);
            // set no fill to make star hollow
            noFill();
            // calculate the coordinates of the star vertices
            var centerX = (startX + mouseX) / 2;//calculate the center x coordinate
            var centerY = (startY + mouseY) / 2;//calculate the center y coordinate
            var radius1 = dist(startX, startY, mouseX, mouseY) / 2;//calculate the radius
            var radius2 = radius1 / 2;//calculate the radius
            var angle = -PI / 2;//calculate the angle
            var angleInc = TWO_PI / 10;//calculate the angle increment
            var vertices = [];//create an array to store the vertices
            for (var i = 0; i < 10; i++) {
              var x = centerX + cos(angle) * (i % 2 == 0 ? radius1 : radius2);
              var y = centerY + sin(angle) * (i % 2 == 0 ? radius1 : radius2);
              vertices.push(createVector(x, y));//add the vertices to the array
              angle += angleInc;//increase the angle, so that the next vertex is in the correct position
            }
            // draw the star
            beginShape();
            for (var i = 0; i < vertices.length; i++) {//loop through the vertices
              vertex(vertices[i].x, vertices[i].y);//draw the vertices
            }
            endShape(CLOSE);
          }
        }
        //if mouse is not being pressed nothing happens
        else if (drawing) {
          drawing = false;
          startX = -1;
          startY = -1;
        }
    };
}
  