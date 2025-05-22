function stampTool(){
    this.icon = "assets/stampTool.png" // the tool icon
    this.name = "stamp" // the name of the tool
    this.draw = function(){ // this function is called every frame
        if(mouseIsPressed) //checks if the mouse is pressed
        {
            strokeWeight(1);//sets the stroke weight to 1
            stroke(0);//sets the stroke color to black
            fill(150, 182, 45);//sets the fill color to green
            ellipse(pmouseX, pmouseY, 50, 50);//draws a circle at the previous mouse position
            fill(255, 42, 42);//sets the fill color to red
            ellipse(pmouseX - 15, pmouseY, 10, 10);//draws a circle at the previous mouse position
            ellipse(pmouseX + 15, pmouseY, 10);//draws a circle at the previous mouse position
            fill(0);//sets the fill color to black
            ellipse(pmouseX - 15, pmouseY, 2, 2);//draws a circle at the previous mouse position
            ellipse(pmouseX + 15, pmouseY, 2);//draws a circle at the previous mouse position
            fill(255, 192, 203);//sets the fill color to pink
            arc(pmouseX + 2, pmouseY + 15, 10, 10, 0, radians(180), PIE);//draws the smile of the stamp
        }
    }
};

