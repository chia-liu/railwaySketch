/*
L-System Reference
https://p5js.org/examples/simulate-l-systems.html
Example created by R. Luke DuBois.
*/


// TURTLE STUFF:
let x, y; 
let currentangle = 0; 
let step = 100; 
let angle = 75; 

// LINDENMAYER STUFF (L-SYSTEMS)
let thestring = 'A'; 
let numloops = 3; 
let therules = []; 
therules[0] = ['A', '-BF+AFA+FB-']; // first rule
therules[1] = ['B', '+AF-BFB-FA+']; // second rule

let clr = "4ECDC4-fff56b".split("-").map(a=>"#"+a)

// const clr = createCols("https://coolors.co/4ECDC4-fff56b");
let bg;


function setup() {
	// const s = min(windowWidth, windowHeight);
  createCanvas(windowWidth, windowHeight);
  	
  for (let i = 0; i < numloops; i++)
	{
    thestring = lindenmayer(thestring);
  }
	
	//bg
	bg = createGraphics(width, height);
	//bg.background(255,10);
  bg.noStroke();
  for (let i = 0; i < width*height / 2; i++) {
    let x = random(width);
    let y = random(height);
    let s = noise((x/200, y/200, 1000)-0.5)*0.5;
    bg.fill(clr[0]);
    bg.rect(x, y, s, s);
  } 
	
	background(clr[0]);
}

function draw()
{	
	
	background(clr[0] + "05");
	image(bg, 0, 0);
	let cycle = 90;
	let ratio = frameCount % cycle / cycle;
	//ratio = min(ratio * 1.2, 1);
	//ratio = easingEaseInOutCubic(ratio);
	x = 0;
  y = height-1;
	
	push();
	translate(0, height-1);
	
	for(let i = 0; i < thestring.length; i++)
	{
		drawIt2(thestring[i], ratio);
	}
	
	pop();
	
	
}


// interpret an L-system
function lindenmayer(s) {
  let outputstring = ''; // start a blank output string

  // iterate through 'therules' looking for symbol matches:
  for (let i = 0; i < s.length; i++) {
    let ismatch = 0; // by default, no match
    for (let j = 0; j < therules.length; j++) {
      if (s[i] == therules[j][0])  {
        outputstring += therules[j][1]; // write substitution
        ismatch = 1; // we have a match, so don't copy over symbol
        break; // get outta this for() loop
      }
    }
    // if nothing matches, just copy the symbol over.
    if (ismatch == 0) outputstring+= s[i];
  }
  return outputstring; // send out the modified string
}



function drawIt2(k, ratio) {
	
	noStroke();
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	if (k=='F')
	{ 
		fill(clr[1]);
		circle(step * ratio, 0, step * 0.5);
		translate(step, 0);
  }
	
	else if (k == '+')
	{
		rotate(radians(angle));
  }
	else if (k == '-')
	{
		rotate(-radians(angle));
  }
}


function easingEaseInOutCubic (x) {
	if(x < 0.5)return 0.5 * pow(2*x, 3);
	else return 0.5 * pow(2*(x-1), 3) + 1;
}



function createCols(_url)
{
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}