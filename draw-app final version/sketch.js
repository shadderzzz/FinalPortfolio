// Global variables that will store the toolbox colour palette
// and the helper functions.
var toolbox = null;
var colourP = null;
var helpers = null;
function setup() {
	frameRate(120);
	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");
	//create helper functions and the colour palette
    helpers = new HelperFunctions();
	colourP = new ColourPalette();
	//create a toolbox for storing the tools
	toolbox = new Toolbox();
	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());//add the freehand tool
	toolbox.addTool(new LineToTool());//add the line tool
	toolbox.addTool(new sprayCanTool());//add the spray can tool
	toolbox.addTool(new mirrorDrawTool());//add the mirror tool
	toolbox.addTool(new eraserTool());//add the eraser tool
	toolbox.addTool(new SquareTool());//add the square tool
	toolbox.addTool(new StarTool());//add the star tool
	toolbox.addTool(new backgroundTool());//add the background tool
	toolbox.addTool(new stampTool());//add the stamp tool
	background(255);
}
function draw() {
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
}
