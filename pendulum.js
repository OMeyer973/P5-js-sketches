// small multi stage pendulum system (not based on physics equations)

// tweak these !
var seed = 1;
var wholeTurn = true;

var size = 500;
var timeStep = 0.05;
var branches = 4;


var speeds = [];
var lengths = [];
var amps =  [];
var steps =  [];

var nbDots = 0;
var dots = [
  []
];

function setup() {
  createCanvas(size, size);
	colorMode(HSB, 100);
  
  tmp = 0;
  for (var i = 0; i < branches; i++) {
    
    speeds[i] = map(noise(seed*tmp*i), 0, 1, 0.1, 1.0);
    tmp++;
    lengths[i] = map(noise(seed*tmp*i), 0, 1, 10, 80);
    tmp++;
    amps[i] = map(noise(seed*tmp*i), 0, 1, 0.1, 1.0);
    tmp++;
    steps[i] = map(noise(seed*tmp*i), 0, 1, 0, 10);
    dots[i] = [];
  }
}

function draw() {
  background(220);
  translate(size * 0.5, size * 0.5);
  rotate(HALF_PI);
  scale(4/branches);

  currPt = {
    x: 0,
    y: 0
  };
  prevPt = {
    x: 0,
    y: 0
  };
  tmpStep = 0;
	
  strokeWeight = 1;
  
  // draw trail
  i = branches - 1;
  for (var j = 0; j < nbDots - 1; j++) {
	  stroke(j*0.2%100,100,100);
    line(dots[i][j].x, dots[i][j].y, dots[i][j + 1].x, dots[i][j + 1].y);
  }

  stroke(0,100,0);
  strokeWeight = 5;
  // draw pendulum arms
  for (var i = 0; i < branches; i++) {
    steps[i] += speeds[i] * timeStep;
    tmpStep += steps[i];
    if (wholeTurn)
      tmpAngle = tmpStep;
    else
    	tmpAngle = amps[i] * PI * cos(tmpStep * speeds[i] + steps[i]);
    currPt.x = prevPt.x + lengths[i] * cos(tmpAngle);
    currPt.y = prevPt.y + lengths[i] * sin(tmpAngle);

    line(prevPt.x, prevPt.y, currPt.x, currPt.y);
    dots[i][nbDots] = eval(uneval(currPt));
    prevPt = eval(uneval(currPt));

  }
  nbDots++;
}
