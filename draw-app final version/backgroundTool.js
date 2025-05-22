// This is a constructor function for a background tool object. It defines two properties, an icon and a name for the tool.
function backgroundTool(){
    this.icon = "assets/backgroundTool.png"; // the tool icon
    this.name = "ChangeBackgroundColor"; // the name of the tool
    // create a new ColourPalette object
    var palette = new ColourPalette(); // the colour palette
    // This function gets called repeatedly to update the display. It sets the background color of the canvas to the selected color in the palette.
    this.draw = function() {
        // get the selected color from the ColourPalette object
        var selectedColor = palette.colourChange; // the selected color
        // set the background color of the canvas to the selected color
        background(selectedColor); // set the background color
    }
}