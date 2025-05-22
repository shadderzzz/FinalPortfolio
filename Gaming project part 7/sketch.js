/*
	The Game Project Part 4 - Character Interaction
*/

var gameChar_x;
var gameChar_y;
var floorPos_y;

var canyon;
var flagPole

//Interaction variables
var isLeft;
var isRight;
var isFalling
var isPlummeting 

//Onject variablesa
var trees_x
var trees_y

var clouds
var mountain

//collectible
var collectable
//variable to control the camera
var cameraPosX

//variables controlling the state of the game
var gameOver = false
var levelComplete = false

//variable to keep score of the score
var gameScore = 0

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = -1020;
	gameChar_y = floorPos_y - 25;
    

	canyon = [{x_pos: -400, width: 130},
              {x_pos: -90, width: 60},
              {x_pos: -160, width: 30},
              {x_pos: 200, width: 150},
              {x_pos: 600, width: 150}
            ];
    
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    
    collectable = [{xpos: 270, 
                    ypos: floorPos_y - 90, 
                    isFound: false},
                   {xpos: 575,
                    ypos: floorPos_y - 18,
                    isFound: false},
                   {xpos: 700,
                    ypos: floorPos_y - 70,
                    isFound: false},
                   {xpos: -100,
                    ypos: floorPos_y - 18,
                    isFound: false},
                   {xpos: -180,
                    ypos: floorPos_y - 18,
                    isFound: false},
                   {xpos: -550,
                    ypos: floorPos_y - 18,
                    isFound: false},
                   {xpos: -1350, 
                    ypos: floorPos_y - 18,
                    isFound: false}
                ];
    
    flagPole = {xpos: 800, 
                ypos: 293,
                flagX: 800,
                flagY: 910,
                isReached: false}
    
    trees_x = [-1300,-500, -150, 600, 950, 1400]
    trees_y = floorPos_y - 88
    
    clouds = [
        {xpos: -700, ypos: 80},
        {xpos: -400, ypos: 100},
        {xpos: -100, ypos: 150},
        {xpos: 200, ypos: 100},
        {xpos: 500, ypos: 180},
        {xpos: 800, ypos: 130},
        {xpos: 1200, ypos: 150}
    ]
    
    mountain = [
        {xpos: - 1400, ypos: 445},
        {xpos: -600, ypos : 445},
        {xpos: -200, ypos: 445},
        {xpos: 200, ypos: 445},
        {xpos: 582, ypos: 445},
        {xpos: 1300, ypos: 445}
    ]

    
}


function draw()
{
    //moves the camera depending on the position of my game character    
    cameraPosX = -gameChar_x + width/2
	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue
    
    noStroke();
	fill(0,155,0);
	rect(0, floorPos_y + 12, width, height -
    floorPos_y); //draw some green ground
    
    //Text to be displayed if the game i over or finished and also the score.
    //Placed outside the push function so that it is displayed in the middle of the creen no matter where the character is
    fill(0);
    textSize(50);
    textFont("Helvetica");
    text(gameScore, 100, 100)
    
    if(gameOver == true)    
    {
        fill(0)
        textSize(100);
        textFont("Helvetica");
        text("Game Over", 100, 200);
    }
    
    if(levelComplete == true)
    {
        fill(0)
        textSize(100);
        textFont("Helvetica");
        text("Level Complete", 100, 200);
    }
    
    fill(100, 200, 200);
    textSize(50);
    textFont("Helvetica");
    text(gameScore, 100, 100)
    
    push();
    translate(cameraPosX, 0);
    
    //NInjas house
    stroke(2);
    fill(165,42,42);
    rect(-1100, floorPos_y - 90, 160, 100);
    fill(255, 255, 255);
    rect(-1090, floorPos_y, 150, 10);
    fill(165,42,42);
    rect(-1100, floorPos_y - 90, 20, 100);
    rect(-950, floorPos_y - 90, 20, 100);
    fill(0)
    ellipse(-1089, floorPos_y - 105, 35);
    ellipse(-940, floorPos_y - 105, 35);
    fill(165,42,42);
    
    
    //Traverses through the array clouds to draw more clouds in different postions
    for(var i = 0; i < clouds.length; i++)
    {
        //Cloud
        noStroke();
        fill(255,255,255,210);
        ellipse(clouds[i].xpos - 30, clouds[i].ypos, 100, 30);
        ellipse(clouds[i].xpos - 10, clouds[i].ypos - 10, 100, 30);
        ellipse(clouds[i].xpos - 10, clouds[i].ypos + 10, 100, 30);
        ellipse(clouds[i].xpos + 20, clouds[i].ypos + 10, 100, 30);
        ellipse(clouds[i].xpos + 20, clouds[i].ypos - 10, 100, 30);
        ellipse(clouds[i].xpos + 40, clouds[i].ypos, 100, 30);
    }
    //Traverses through the array mountain to draw more clouds in different postions
    for(var i = 0; i < mountain.length; i++)
    {
        noStroke();
        fill(50, 50, 50);
        beginShape();
        vertex(mountain[i].xpos, mountain[i].ypos);
        vertex(mountain[i].xpos - 50, mountain[i].ypos - 163);
        vertex(mountain[i].xpos - 80, mountain[i].ypos - 113);
        vertex(mountain[i].xpos - 110, mountain[i].ypos - 233);
        vertex(mountain[i].xpos - 140, mountain[i].ypos - 113);
        vertex(mountain[i].xpos - 170, mountain[i].ypos - 163);
        vertex(mountain[i].xpos - 220, mountain[i].ypos);
        endShape();

        //Code for white snow on mountains
        fill(255, 255, 255);
        beginShape();
        vertex(mountain[i].xpos - 110, mountain[i].ypos - 233);
        vertex(mountain[i].xpos - 125, mountain[i].ypos - 173);
        vertex(mountain[i].xpos - 89, mountain[i].ypos - 153);
        endShape();

        beginShape();
        vertex(mountain[i].xpos - 50, mountain[i].ypos - 163);
        vertex(mountain[i].xpos - 62, mountain[i].ypos - 143);
        vertex(mountain[i].xpos - 38, mountain[i].ypos - 123);
        endShape();

        beginShape();
        vertex(mountain[i].xpos - 170, mountain[i].ypos - 163);
        vertex(mountain[i].xpos - 176, mountain[i].ypos - 143);
        vertex(mountain[i].xpos - 151, mountain[i].ypos - 133);
        endShape();
    }
    
    
    for(var i = 0; i < collectable.length; i++)
        if(!collectable[i].isFound){
            fill(255);
            beginShape();
            vertex(collectable[i].xpos, collectable[i].ypos + 30);
            vertex(collectable[i].xpos + 5, collectable[i].ypos + 20);
            vertex(collectable[i].xpos, collectable[i].ypos);
            vertex(collectable[i].xpos - 5, collectable[i].ypos + 20);
            vertex(collectable[i].xpos, collectable[i].ypos + 30);
            endShape();
        }
    
    if(!flagPole.isReached){
        //flagpole
        fill(50,50,50);
        rect(flagPole.xpos + 15, flagPole.ypos + 2, 7, 150);
        //flag
        fill(10, 10, 10);
        triangle(flagPole.flagX + 20, 
                 flagPole.flagY - 518, 
                 flagPole.flagX + 20,
                 flagPole.flagY - 468, 
                 flagPole.flagX + 80, 
                 flagPole.flagY - 495);
    }
    
 
    
    if(flagPole.isReached == true){
        flagPole.flagY = 814
        //flagpole
        fill(50,50,50);
        rect(flagPole.xpos + 15, flagPole.ypos + 2, 7, 150);
        //flag
        fill(10, 10, 10);
        triangle(flagPole.flagX + 20, 
                 flagPole.flagY - 518, 
                 flagPole.flagX + 20,
                 flagPole.flagY - 468, 
                 flagPole.flagX + 80, 
                 flagPole.flagY - 495);
    }

	//draw the canyon
	noStroke();
	fill(92, 40, 0);
    
    for(var i=0; i < canyon.length;i++)
    {
	   rect(canyon[i].x_pos, floorPos_y + 12, canyon[i].width, height -floorPos_y);
    }
    
    //Traverses through the array trees to draw more clouds in different postions
    for(var i = 0; i < trees_x.length; i++)
    {
        //Tree
        //Tree trunk
        fill(165, 42, 42);
        rect(trees_x[i], trees_y, 10, 100);
        //Tree Leafs
        fill(0, 255, 0);
        ellipse(trees_x[i] - 15, trees_y, 45, 45);
        ellipse(trees_x[i] + 25, trees_y, 45, 45);
        ellipse(trees_x[i] - 30, trees_y - 30, 45, 45);
        ellipse(trees_x[i] - 15, trees_y - 55, 45, 45);
        ellipse(trees_x[i] + 25, trees_y - 55, 45, 45);
        ellipse(trees_x[i] + 40, trees_y - 30, 45, 45);
        ellipse(trees_x[i], trees_y - 25, 45, 45);
    }
    
	//the game character
	if(isLeft && isFalling)
	{
		//jumping-left code
        //body
        stroke(0,0,0);
        strokeWeight(1);
        fill(50,50,50);
        rect(gameChar_x - 1, gameChar_y - 38, 17, 35, 5);

        //sword
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x + 16, gameChar_y - 18);
        vertex(gameChar_x + 21, gameChar_y - 12 );
        vertex(gameChar_x + 16, gameChar_y - 14);
        vertex(gameChar_x + 16, gameChar_y - 18);
        endShape();

        //head
        stroke(0,0,0);
        strokeWeight(1);
        fill(50,50,50);  
        rect(gameChar_x - 14, gameChar_y - 72, 45, 45, 40);

        //face
        strokeWeight(1);
        stroke(0,0,0);
        fill(232, 190, 172);
        ellipse(gameChar_x, gameChar_y - 47, 25, 28);

        //left eyebrow
        fill(0, 0, 0);
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x - 9, gameChar_y - 52);
        vertex(gameChar_x - 4, gameChar_y - 49);
        endShape();

        //right eyebrow
        beginShape();
        vertex(gameChar_x + 6, gameChar_y - 52);
        vertex(gameChar_x, gameChar_y - 49);
        endShape();


        //eyes
        fill(0,0,0)
        ellipse(gameChar_x - 8, gameChar_y - 46, 5, 5);
        ellipse(gameChar_x + 5, gameChar_y - 46, 5, 5);

        //Waist rope
        fill(255, 0, 0);
        rect(gameChar_x - 1, gameChar_y - 12, 17, 3, 10);

        //left leg
        fill(50, 50, 50);
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x - 1, gameChar_y - 9);
        vertex(gameChar_x - 9, gameChar_y - 13);
        vertex(gameChar_x - 15, gameChar_y - 1);
        vertex(gameChar_x - 11, gameChar_y + 1);
        vertex(gameChar_x - 7, gameChar_y - 7);
        vertex(gameChar_x + 2, gameChar_y - 4);
        endShape();

        //right leg
        beginShape();
        vertex(gameChar_x + 14, gameChar_y - 9);
        vertex(gameChar_x + 20, gameChar_y + 7);
        vertex(gameChar_x + 12, gameChar_y + 9);
        vertex(gameChar_x + 7, gameChar_y - 8);
        endShape();

        //left foot
        beginShape();
        vertex(gameChar_x - 15, gameChar_y - 1);
        vertex(gameChar_x - 19, gameChar_y);
        vertex(gameChar_x - 13, gameChar_y + 4);
        vertex(gameChar_x - 11, gameChar_y + 1);
        vertex(gameChar_x - 15, gameChar_y - 1);
        endShape();

        //right foot
        beginShape();
        vertex(gameChar_x + 12, gameChar_y + 9);
        vertex(gameChar_x + 10, gameChar_y + 13);
        vertex(gameChar_x + 22, gameChar_y + 10);
        vertex(gameChar_x + 20, gameChar_y + 7);
        vertex();
        endShape();

        //left hand
        stroke(0, 0, 0);
        strokeWeight(1);
        fill(232, 190, 172);
        ellipse(gameChar_x - 15, gameChar_y - 33, 6, 6);

        //left arm
        fill(50, 50, 50);
        beginShape();
        vertex(gameChar_x + 6, gameChar_y - 23);
        vertex(gameChar_x - 5, gameChar_y - 27);
        vertex(gameChar_x - 12, gameChar_y - 33);
        vertex(gameChar_x - 15, gameChar_y - 30);
        vertex(gameChar_x - 8, gameChar_y - 24);
        vertex(gameChar_x + 4, gameChar_y - 20);
        endShape();


	}
	else if(isRight && isFalling)
	{
		//jumping-right code
        //sword
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x - 1, gameChar_y - 18);
        vertex(gameChar_x - 6, gameChar_y - 12);
        vertex(gameChar_x - 1, gameChar_y - 14);
        vertex(gameChar_x - 1, gameChar_y - 18);
        endShape();

        //head
        stroke(0,0,0);
        strokeWeight(1);
        fill(50,50,50);  
        rect(gameChar_x - 14, gameChar_y - 72, 45, 45, 40);

        //body
        stroke(0,0,0);
        strokeWeight(1);
        fill(50,50,50);
        rect(gameChar_x - 1, gameChar_y - 38, 17, 35, 5);

        //right hand
        stroke(0, 0, 0);
        strokeWeight(1);
        fill(232, 190, 172);
        ellipse(gameChar_x + 27, gameChar_y - 30, 6, 6);

        //right arm
        fill(50, 50, 50);
        beginShape();
        vertex(gameChar_x + 9, gameChar_y - 21);
        vertex(gameChar_x + 18, gameChar_y - 24);
        vertex(gameChar_x + 24, gameChar_y - 30);
        vertex(gameChar_x + 27, gameChar_y - 27);
        vertex(gameChar_x + 21, gameChar_y - 20);
        vertex(gameChar_x + 11, gameChar_y - 17);
        endShape();


        //left leg
        fill(50, 50, 50);
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x - 1, gameChar_y - 8 );
        vertex(gameChar_x - 8, gameChar_y + 7);
        vertex(gameChar_x - 1, gameChar_y + 9);
        vertex(gameChar_x + 6, gameChar_y - 6);
        endShape();

        //right leg
        beginShape();
        vertex(gameChar_x + 15, gameChar_y - 8);
        vertex(gameChar_x + 24, gameChar_y - 13);
        vertex(gameChar_x + 31, gameChar_y - 3);
        vertex(gameChar_x + 27, gameChar_y);
        vertex(gameChar_x + 22, gameChar_y - 7);
        vertex(gameChar_x + 14, gameChar_y - 4);
        endShape();

        //left foot
        beginShape();
        vertex(gameChar_x - 8, gameChar_y + 7);
        vertex(gameChar_x - 10, gameChar_y + 11);
        vertex(gameChar_x, gameChar_y + 13);
        vertex(gameChar_x - 1, gameChar_y + 9);
        vertex(gameChar_x - 8, gameChar_y + 7);
        endShape();

        //right foot
        beginShape();
        vertex(gameChar_x + 31, gameChar_y - 3);
        vertex(gameChar_x + 36, gameChar_y - 2);
        vertex(gameChar_x + 29, gameChar_y + 3);
        vertex(gameChar_x + 27, gameChar_y);
        vertex();
        endShape();


        //head
        stroke(0,0,0);
        strokeWeight(1);
        fill(50,50,50);  
        rect(gameChar_x - 14, gameChar_y - 72, 45, 45, 40);

        //Waist rope
        fill(255, 0, 0);
        rect(gameChar_x - 1, gameChar_y - 12, 17, 3, 10);

        //face
        strokeWeight(1);
        stroke(0,0,0);
        fill(232, 190, 172);
        ellipse(gameChar_x + 17, gameChar_y - 47, 25, 28);

        //left eyebrow
        fill(0, 0, 0);
        beginShape();
        vertex(gameChar_x + 12, gameChar_y - 52);
        vertex(gameChar_x + 17, gameChar_y - 49);
        endShape();

        //right eyebrow
        beginShape();
        vertex(gameChar_x + 26, gameChar_y - 52);
        vertex(gameChar_x + 21, gameChar_y - 49);
        endShape();


        //eyes
        fill(0,0,0)
        ellipse(gameChar_x + 25, gameChar_y - 46, 5, 5);
        ellipse(gameChar_x + 13, gameChar_y - 46, 5, 5);

	}
	else if(isLeft)
	{
		//walking left code
        //sword
        fill(255,255,255);
        stroke(0,0,0);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x + 16, gameChar_y - 18);
        vertex(gameChar_x + 23, gameChar_y - 11);
        vertex(gameChar_x + 16, gameChar_y - 14);
        vertex(gameChar_x + 16, gameChar_y - 18);
        endShape();

        //right hand
        stroke(0, 0, 0);
        strokeWeight(1);
        fill(232, 190, 172);
        ellipse(gameChar_x + 17, gameChar_y - 15.5, 5, 5);

        //body
        stroke(0,0,0);
        strokeWeight(1);
        fill(50,50,50);
        rect(gameChar_x - 1, gameChar_y - 38, 17, 35, 5);

        //left leg
        fill(50, 50, 50);
        stroke(0, 0 ,0);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x - 1, gameChar_y - 7);
        vertex(gameChar_x - 7, gameChar_y + 8);
        vertex(gameChar_x + 2, gameChar_y + 8);
        vertex(gameChar_x + 7, gameChar_y - 7);
        vertex(gameChar_x - 1, gameChar_y - 7);
        endShape();

        //right leg
        beginShape();
        vertex(gameChar_x + 7, gameChar_y - 7);
        vertex(gameChar_x + 7, gameChar_y + 8);
        vertex(gameChar_x + 15, gameChar_y + 8);
        vertex(gameChar_x + 15, gameChar_y - 7);
        vertex(gameChar_x + 7, gameChar_y - 7);
        endShape();

        //left foot
        beginShape();
        vertex(gameChar_x - 7, gameChar_y + 8);
        vertex(gameChar_x - 10, gameChar_y + 12);
        vertex(gameChar_x + 2, gameChar_y + 12);
        vertex(gameChar_x + 2, gameChar_y + 8);
        vertex(gameChar_x - 7, gameChar_y + 8);
        endShape();

        //right foot
        beginShape();
        vertex(gameChar_x + 7, gameChar_y + 8);
        vertex(gameChar_x + 4, gameChar_y + 12);
        vertex(gameChar_x + 15, gameChar_y + 12);
        vertex(gameChar_x + 15, gameChar_y + 8);
        vertex(gameChar_x + 7, gameChar_y + 8);
        endShape();

        //arm on the knife
        fill(50, 50, 50);
        beginShape();
        vertex(gameChar_x + 7, gameChar_y - 22);
        vertex(gameChar_x + 16, gameChar_y - 18);
        vertex(gameChar_x + 16, gameChar_y - 14);
        vertex(gameChar_x + 7, gameChar_y - 18);
        endShape();

        //right hand
        strokeWeight(1);
        fill(232, 190, 172);
        ellipse(gameChar_x - 10, gameChar_y - 15, 5, 5);

        //right arm
        fill(50, 50, 50);
        beginShape();
        vertex(gameChar_x - 1, gameChar_y - 23);
        vertex(gameChar_x - 10, gameChar_y - 17);
        vertex(gameChar_x - 8, gameChar_y - 15);
        vertex(gameChar_x - 1, gameChar_y - 19);
        vertex(gameChar_x - 1, gameChar_y - 23);
        endShape();

        //Waist rope
        fill(255, 0, 0);
        rect(gameChar_x - 1, gameChar_y - 12, 17, 3, 10);

        //head
        stroke(0,0,0);
        strokeWeight(1);
        fill(50,50,50);  
        rect(gameChar_x - 14, gameChar_y - 72, 45, 45, 40);

        //face
        strokeWeight(1);
        stroke(0,0,0);
        fill(232, 190, 172);
        ellipse(gameChar_x, gameChar_y - 47, 25, 28);

        //eyes
        fill(0,0,0)
        ellipse(gameChar_x - 8, gameChar_y - 46, 5, 5);
        ellipse(gameChar_x + 5, gameChar_y - 46, 5, 5);

        //left eyebrow
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x - 8, gameChar_y - 52);
        vertex(gameChar_x - 4, gameChar_y - 50);
        endShape();

        //right eyebrow
        beginShape();
        vertex(gameChar_x + 2, gameChar_y - 50);
        vertex(gameChar_x + 7, gameChar_y - 51);
        endShape();


	}
	else if(isRight)
	{
		//walking right code
        //arm on sword
        fill(50, 50, 50);
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x + 7, gameChar_y - 23);
        vertex(gameChar_x - 1, gameChar_y - 17);
        vertex(gameChar_x - 1, gameChar_y - 13);
        vertex(gameChar_x + 7, gameChar_y - 19);
        endShape();

        //left hand
        stroke(0, 0, 0);
        strokeWeight(1);
        fill(232, 190, 172);
        ellipse(gameChar_x + 25, gameChar_y - 17, 5, 5);

        //other arm
        fill(50, 50, 50);
        beginShape();
        vertex(gameChar_x + 16, gameChar_y - 24);
        vertex(gameChar_x + 25, gameChar_y - 19);
        vertex(gameChar_x + 23, gameChar_y - 16);
        vertex(gameChar_x + 16, gameChar_y - 19);
        endShape();


        //sword
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x - 1, gameChar_y - 17);
        vertex(gameChar_x - 9, gameChar_y - 11);
        vertex(gameChar_x - 1, gameChar_y - 13);
        vertex(gameChar_x - 1, gameChar_y - 17);
        endShape();

        //hand on sword
        stroke(0, 0, 0);
        strokeWeight(1);
        fill(232, 190, 172);
        ellipse(gameChar_x - 2, gameChar_y - 14, 4, 4);

        //body
        stroke(0,0,0);
        strokeWeight(1);
        fill(50,50,50);
        rect(gameChar_x - 1, gameChar_y - 38, 17, 35, 5);

        //arm on sword
        fill(50, 50, 50);
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x + 7, gameChar_y - 23);
        vertex(gameChar_x - 1, gameChar_y - 17);
        vertex(gameChar_x - 1, gameChar_y - 13);
        vertex(gameChar_x + 7, gameChar_y - 19);
        endShape();

        //head
        stroke(0,0,0);
        strokeWeight(1);
        fill(50,50,50);  
        rect(gameChar_x - 14, gameChar_y - 72, 45, 45, 40);

        //Waist rope
        fill(255, 0, 0);
        rect(gameChar_x - 1, gameChar_y - 12, 17, 3, 10);

        //face
        strokeWeight(1);
        stroke(0,0,0);
        fill(232, 190, 172);
        ellipse(gameChar_x + 17, gameChar_y - 47, 25, 28);

        //eyes
        fill(0,0,0)
        ellipse(gameChar_x + 25, gameChar_y - 46, 5, 5);
        ellipse(gameChar_x + 13, gameChar_y - 46, 5, 5);

        //left eyebrow
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x + 12, gameChar_y - 51);
        vertex(gameChar_x + 17, gameChar_y - 49);
        endShape();

        //right eyebrow
        beginShape();
        vertex(gameChar_x + 21, gameChar_y - 49);
        vertex(gameChar_x + 26, gameChar_y - 51);
        endShape();

        //left leg
        fill(50, 50, 50);
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x, gameChar_y - 8);
        vertex(gameChar_x, gameChar_y + 8);
        vertex(gameChar_x + 6, gameChar_y + 8);
        vertex(gameChar_x + 6, gameChar_y - 8);
        vertex(gameChar_x, gameChar_y - 8);
        endShape();

        //left foot
        beginShape();
        vertex(gameChar_x + 6, gameChar_y + 8);
        vertex(gameChar_x + 9, gameChar_y + 12);
        vertex(gameChar_x, gameChar_y + 12);
        vertex(gameChar_x, gameChar_y + 8);
        vertex(gameChar_x + 6, gameChar_y + 8);
        endShape();

        //right leg
        beginShape();
        vertex(gameChar_x + 15, gameChar_y - 8);
        vertex(gameChar_x + 19, gameChar_y + 8);
        vertex(gameChar_x + 12, gameChar_y + 8);
        vertex(gameChar_x + 8, gameChar_y - 8);
        vertex(gameChar_x + 15, gameChar_y - 8);
        endShape();

        //right foot
        beginShape();
        vertex(gameChar_x + 19, gameChar_y + 8);
        vertex(gameChar_x + 22, gameChar_y + 12);
        vertex(gameChar_x + 12, gameChar_y + 12);
        vertex(gameChar_x + 12, gameChar_y + 8);
        vertex(gameChar_x + 19, gameChar_y + 8);
        endShape();
        

	}
	else if(isFalling)
	{
		// jumping facing forwards code
        //body
        stroke(0,0,0);
        strokeWeight(1);
        fill(50,50,50);
        rect(gameChar_x - 3, gameChar_y - 40, 25, 38, 5);

        //left hand
        strokeWeight(1);
        fill(232, 190, 172);
        ellipse(gameChar_x - 20, gameChar_y - 29, 7, 7);

        //left arm
        stroke(0,0,0);
        fill(50,50,50);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x - 3, gameChar_y - 23);
        vertex(gameChar_x - 17, gameChar_y - 30);
        vertex(gameChar_x - 19, gameChar_y - 26);
        vertex(gameChar_x - 3, gameChar_y - 19);
        vertex(gameChar_x - 3, gameChar_y - 23);
        endShape();


        //right hand
        stroke(0,0,0)
        strokeWeight(1);
        fill(232, 190, 172);
        ellipse(gameChar_x + 40, gameChar_y - 29, 7, 7);

        //right arm
        fill(50,50,50);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x + 22, gameChar_y - 23);
        vertex(gameChar_x + 37, gameChar_y - 30);
        vertex(gameChar_x + 38, gameChar_y - 26);
        vertex(gameChar_x + 22, gameChar_y - 19);
        vertex(gameChar_x + 22, gameChar_y - 23);
        endShape();

        //legs
        fill(50, 50, 50);
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x - 3, gameChar_y - 7);
        vertex(gameChar_x - 13, gameChar_y + 3);
        vertex(gameChar_x - 8, gameChar_y + 7);
        vertex(gameChar_x + 2, gameChar_y - 3);
        vertex(gameChar_x + 17, gameChar_y - 3);
        vertex(gameChar_x + 25, gameChar_y + 6);
        vertex(gameChar_x + 30, gameChar_y + 3);
        vertex(gameChar_x + 21, gameChar_y - 7);
        vertex(gameChar_x - 3, gameChar_y - 7);
        endShape();

        //left foot
        fill(50, 50, 50);
        stroke(0,0,0);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x - 13, gameChar_y + 3);
        vertex(gameChar_x - 20, gameChar_y + 3);
        vertex(gameChar_x - 12, gameChar_y + 11);
        vertex(gameChar_x - 8, gameChar_y + 7);
        vertex(gameChar_x - 13, gameChar_y + 3);
        endShape();

        //right foot
        beginShape();
        vertex(gameChar_x + 30, gameChar_y + 3);
        vertex(gameChar_x + 37, gameChar_y + 5);
        vertex(gameChar_x + 28, gameChar_y + 9);
        vertex(gameChar_x + 25, gameChar_y + 6);
        vertex(gameChar_x + 30, gameChar_y + 3);
        endShape();

        //Waist rope
        fill(255, 0, 0);
        rect(gameChar_x - 3, gameChar_y - 10, 25, 3, 10);

        //head
        stroke(0,0,0);
        strokeWeight(1);
        fill(50,50,50);  
        rect(gameChar_x - 18, gameChar_y - 72, 55, 45, 25);

        //face
        strokeWeight(1);
        stroke(0,0,0);
        fill(232, 190, 172);
        ellipse(gameChar_x + 10, gameChar_y - 44, 50, 30);

        //eyes
        fill(0,0,0)
        ellipse(gameChar_x, gameChar_y - 43, 5, 5);
        ellipse(gameChar_x + 20, gameChar_y - 43, 5, 5);

        //left eyebrow
        fill(0,0,0);
        stroke(0,0,0);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x - 2, gameChar_y - 50);
        vertex(gameChar_x + 6, gameChar_y - 47);
        endShape();

        //right eyebrow
        beginShape();
        vertex(gameChar_x + 24, gameChar_y - 50);
        vertex(gameChar_x + 15, gameChar_y - 47);
        endShape();

        //sword
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x - 3, gameChar_y - 16);
        vertex(gameChar_x - 11, gameChar_y - 8);
        vertex(gameChar_x - 3, gameChar_y - 12);
        vertex(gameChar_x - 3, gameChar_y - 16);
        endShape();

	}
	else
	{
		//front facing code
        //sword
        noFill();
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x - 3, gameChar_y - 9);
        vertex(gameChar_x - 8, gameChar_y - 2);
        vertex(gameChar_x - 9, gameChar_y);
        vertex(gameChar_x - 2, gameChar_y - 6);
        vertex(gameChar_x - 3, gameChar_y - 9);
        endShape();

        //body
        stroke(0,0,0);
        strokeWeight(1);
        fill(50,50,50);
        rect(gameChar_x - 3, gameChar_y - 40, 25, 40, 5);

        //Waist rope
        fill(255, 0, 0);
        rect(gameChar_x - 3, gameChar_y - 10, 25, 3, 10);

        //left foot
        fill(50,50,50);
        beginShape();
        vertex(gameChar_x - 8, gameChar_y + 12);
        vertex(gameChar_x - 14, gameChar_y + 17);
        vertex(gameChar_x - 1, gameChar_y + 17);
        vertex(gameChar_x + 1, gameChar_y + 12);
        vertex(gameChar_x, gameChar_y + 12);
        endShape();

        //right foot
        beginShape();
        vertex(gameChar_x + 24, gameChar_y + 12);
        vertex(gameChar_x + 29, gameChar_y + 17);
        vertex(gameChar_x + 17, gameChar_y + 17);
        vertex(gameChar_x + 15, gameChar_y + 12);
        vertex(gameChar_x + 24, gameChar_y + 12);
        endShape();

        //legs
        fill(50, 50, 50);
        stroke(0,0,0);
        strokeWeight(1);
        beginShape();
        vertex(gameChar_x - 3, gameChar_y - 6);
        vertex(gameChar_x - 8, gameChar_y + 12);
        vertex(gameChar_x + 1, gameChar_y + 12);
        vertex(gameChar_x + 8, gameChar_y + 3);
        vertex(gameChar_x + 15, gameChar_y + 12);
        vertex(gameChar_x + 24, gameChar_y + 12);
        vertex(gameChar_x + 22, gameChar_y - 6);
        vertex(gameChar_x - 3, gameChar_y - 6);
        endShape();

        //left hand
        strokeWeight(1);
        fill(232, 190, 172);
        ellipse(gameChar_x - 12, gameChar_y - 6, 8, 8);

        //left arm
        stroke(0,0,0);
        strokeWeight(1);
        fill(50,50,50);
        beginShape();
        vertex(gameChar_x - 3, gameChar_y - 21);
        vertex(gameChar_x - 13, gameChar_y - 10);
        vertex(gameChar_x - 8, gameChar_y - 6);
        vertex(gameChar_x - 3, gameChar_y - 10);
        vertex(gameChar_x - 3, gameChar_y - 21);
        endShape();


        //right hand
        stroke(0,0,0)
        strokeWeight(1);
        fill(232, 190, 172);
        ellipse(gameChar_x + 31, gameChar_y - 8, 8, 8);



        //right arm
        stroke(0,0,0);
        strokeWeight(1);
        fill(50,50,50);
        beginShape();
        vertex(gameChar_x + 22, gameChar_y - 21);
        vertex(gameChar_x + 32, gameChar_y - 12);
        vertex(gameChar_x + 27, gameChar_y - 9);
        vertex(gameChar_x + 22, gameChar_y - 13);
        vertex(gameChar_x + 22, gameChar_y - 21);
        endShape();    

        //head
        stroke(0,0,0);
        strokeWeight(1);
        fill(50,50,50);  
        rect(gameChar_x - 18, gameChar_y - 72, 55, 45, 25);

        //face
        strokeWeight(1);
        stroke(0,0,0);
        fill(232, 190, 172);
        ellipse(gameChar_x + 10, gameChar_y - 44, 50, 30);

        //eyes
        fill(0,0,0)
        ellipse(gameChar_x, gameChar_y - 43, 5, 5);
        ellipse(gameChar_x + 20, gameChar_y - 43, 5, 5);

        //left eyebrow
        fill(0,0,0);
        beginShape();
        vertex(gameChar_x - 3, gameChar_y - 50);
        vertex(gameChar_x + 5, gameChar_y - 47);
        endShape();

        //right eyebrow
        fill(0,0,0);
        beginShape();
        vertex(gameChar_x + 24, gameChar_y - 50 );
        vertex(gameChar_x + 15, gameChar_y - 47);
        endShape();
	}
    
    pop();
    
    ///////////INTERACTION CODE//////////
	//conditional statements to move the game character and changing states of objects
    //They must also collect all the collectables to activate the flag
    if(dist(gameChar_x, gameChar_y, 
        flagPole.xpos, gameChar_y) <= 7 && flagPole.isReached == false && gameScore == 7)
    {
        flagPole.isReached= true;
        levelComplete = true;
    }
    
    for(var i =0; i < collectable.length; i++)
    {
        if(dist(gameChar_x, gameChar_y, collectable[i].xpos, collectable[i].ypos) < 30){
            if(collectable[i].isFound == false){
                gameScore++;
            }
        collectable[i].isFound = true;
    }
    }
    
    //Freeze controls when falling and when game finishes
    if(isLeft == true && isPlummeting == false && levelComplete == false){
        gameChar_x -= 3;
    }
    
    if(isRight == true && isPlummeting == false && levelComplete == false){
        gameChar_x += 3;
    }
    
    // adds gravity for the character to fall
    if(gameChar_y < floorPos_y){
        gameChar_y += 2;
        isFalling = true;
    }else{
        isFalling = false;
    }
    
    //Makes the player to fall down the canyon and also allows the character to jump across the canyon without falling
    for(var i = 0; i < canyon.length; i++)
    {
        if(gameChar_x > canyon[i].x_pos && gameChar_x < canyon[i].x_pos + canyon[i].width && gameChar_y >= floorPos_y)
        {
            isPlummeting = true;
            isFalling = true;
            gameOver = true
            gameChar_y += 10;
        }
    }
    
    
}






function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    
    if (key == "a"){
        isLeft = true;
    }else if (key == "d"){
        isRight = true;
    }else if(key == "w" && isFalling == false && levelComplete == false){ //Prevent character from double jumping 
        isFalling = true;
        gameChar_y -= 125;
    }
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    
    if (key == "a"){
        isLeft = false;
    }else if (key == "d"){
        isRight = false;
    }else if(key == "w"){
        isFalling = false;
    }
}
