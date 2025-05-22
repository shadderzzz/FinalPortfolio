//Displays and handles the colour palette.
// This function represents the colour palette
function ColourPalette() {
	//a list of web colour strings
	this.colours = [
	  "black", "silver", "gray", "white", "maroon", "red", "purple",
	  "orange", "pink", "fuchsia", "green", "lime", "olive", "yellow", "navy",
	  "blue", "teal", "aqua"
	];
	// The list of colours available in the palette
	//make the start colour be black
	this.selectedColour = "black";
	// The default colour that is selected when the application starts
	this.colourChange = this.colours;
	// This variable is used to pass the selected colour to the backgroundTool.
	var self = this;
	// This function is called when a swatch is clicked.
	var colourClick = function() {
	  // Remove the old border
	  var current = select("#" + self.selectedColour + "Swatch");
	  current.style("border", "0");
	  // Get the new colour from the id of the clicked element
	  var c = this.id().split("Swatch")[0];
	  // Set the selected colour and fill and stroke
	  self.selectedColour = c;
	  fill(c);
	  stroke(c);
	  // Add a new border to the selected colour
	  this.style("border", "2px solid blue");
	};
	// Load the colours into the palette
	this.loadColours = function() {
	  // Set the fill and stroke properties to be black at the start of the programme running
	  fill(this.colours[0]);
	  stroke(this.colours[0]);
	  // For each colour in the palette, create a new div in the html for the colourSwatches
	  for (var i = 0; i < this.colours.length; i++) {
		var colourID = this.colours[i] + "Swatch";
		// Create a new div for the colour swatch and set its class and id
		var colourSwatch = createDiv();
		colourSwatch.class("colourSwatches");
		colourSwatch.id(colourID);
		// Add the swatch to the palette and set its background colour to be the colour value
		select(".colourPalette").child(colourSwatch);
		select("#" + colourID).style("background-color", this.colours[i]);
		// Add an event listener to the swatch for when it is clicked
		colourSwatch.mouseClicked(colourClick);
	  }
	  // Add a blue border to the first swatch by default
	  select(".colourSwatches").style("border", "2px solid blue");
	};
	// Call the loadColours function now it is declared
	this.loadColours();
  }
  