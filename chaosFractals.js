// chaos theory fractal stuff from :
// https://www.youtube.com/watch?v=kbKtFN71Lfs

var seed = 1;
var amount = 0.6;
var nbTargets = 5;

var size = 500;
var margin = 10;

var targets = [];

function mkpt(x, y) { return {x,y} }

function lerp (start, end, amt){
  return (1-amt)*start+amt*end
}

function setup() {
  createCanvas(size, size);
  colorMode(HSB, 100);
  strokeWeight(2);
  frameRate(1000);
  
  for(var i=0; i<nbTargets; i++) {
  	targets[i] = mkpt(
      size*0.5 + 0.5*(size-margin) * cos(TWO_PI * i / nbTargets),
      size*0.5 + 0.5*(size-margin) * sin(TWO_PI * i / nbTargets)
    );
  }
  
  //initial random point
  currPt = mkpt(map(noise(seed), 0, 1, -size*0.5, size*0.5),
                map(noise(seed+50), 0, 1, -size*0.5, size*0.5));
}

function draw() {
  line(currPt.x, currPt.y, currPt.x, currPt.y);
  targetPt = targets[Math.floor(Math.random()*targets.length)];
	currPt.x = lerp(currPt.x, targetPt.x, amount);
	currPt.y = lerp(currPt.y, targetPt.y, amount);
}

