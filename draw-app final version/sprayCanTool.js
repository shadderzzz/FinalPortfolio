//spray can object literal
function sprayCanTool() {
    this.name = "sprayCanTool"; //the name of the tool
    this.icon = "assets/sprayCan.jpg" //the tool icon
    this.points = 100;//how many points of paint to spray
    this.spread = 25;//how far to spread the paint from the mouse pointer
    this.draw = function() {
        //if the mouse is pressed paint on the canvas
        //spread describes how far to spread the paint from the mouse pointer
        //points holds how many pixels of paint for each mouse press.
        if(mouseIsPressed){
            for(var i = 0; i < this.points; i++){//for loop to draw the spray
                strokeWeight(1);//sets the stroke weight to 1
                point(random(mouseX-this.spread, mouseX + this.spread), 
                random(mouseY-this.spread, mouseY+this.spread));//draws a point at a random position within the spread
            }
        }
    }
}
