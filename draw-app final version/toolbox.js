//container object for storing the tools. Functions to add new tools and select a tool
function Toolbox() {
	var self = this;//store a reference to the toolbox object
	this.tools = [];//array to store the tools
	this.selectedTool = null;//currently selected tool
	var toolbarItemClick = function() {
		//remove any existing borders
		var items = selectAll(".sideBarItem");//get all the toolbar items
		for (var i = 0; i < items.length; i++) {
			items[i].style('border', '0');//remove the border
		}
		var toolName = this.id().split("sideBarItem")[0];//get the name of the tool from the id
		self.selectTool(toolName);//select the tool
		//call loadPixels to make sure most recent changes are saved to pixel array
		loadPixels();
	};
	//add a new tool icon to the html page
	var addToolIcon = function(icon, name) {
		var sideBarItem = createDiv("<img src='" + icon + "'></div>");//create a div to hold the icon
		sideBarItem.class("sideBarItem");//give the div a class
		sideBarItem.id(name + "sideBarItem");//give the div an id
		sideBarItem.parent("sidebar");//set the div's parent to the sidebar
		sideBarItem.mouseClicked(toolbarItemClick);//add a mouse click listener to the div
	};
	//add a tool to the tools array
	this.addTool = function(tool) {
		//check that the object tool has an icon and a name
		if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name")) {
			alert("make sure your tool has both a name and an icon");	
		}
		this.tools.push(tool);//add the tool to the array
		addToolIcon(tool.icon, tool.name);//add the tool icon to the html page
		//if no tool is selected (ie. none have been added so far)
		//make this tool the selected one.
		if (this.selectedTool == null) {
			this.selectTool(tool.name);//select the tool
		}
	};
	this.selectTool = function(toolName) {
		//search through the tools for one that's name matches
		//toolName
		for (var i = 0; i < this.tools.length; i++) {
			if (this.tools[i].name == toolName) {
				//if the tool has an unselectTool method run it.
				if (this.selectedTool != null && this.selectedTool.hasOwnProperty("unselectTool")) {
					this.selectedTool.unselectTool();//unselect the tool
				}
				//select the tool and highlight it on the toolbar
				this.selectedTool = this.tools[i];//set the selected tool
				select("#" + toolName + "sideBarItem").style("border", "2px solid blue");//highlight the toolbar icon

				//if the tool has an options area. Populate it now.
				if (this.selectedTool.hasOwnProperty("populateOptions")) {
					this.selectedTool.populateOptions();//populate the options area
				}
			}
		}
	};
}
