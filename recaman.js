	
  // visualisation of the Recamán Sequence
  // cf https://www.youtube.com/watch?v=FGC5TdIiT9U
  
  var steps = 0;
	
	function setup() {
		createCanvas(500, 500);
		strokeWeight(0.2);
		fill(0, 0, 0, 0);
	}


	function draw() {
		background(220);
		translate(10, 490);
		rotate(-PI * 0.25);
		scale(2.8);
		
		frameRate(10);
		steps++;
		
		done = [];
		curr = 0;
		prev = 0;
		step = 0;
		up = true;
		for (var i = 0; i < steps; i++) {
			done[curr] = true;
			prev = curr;

			if (curr - step > 0 && done[curr - step] != true)
				curr -= step;
			else
				curr += step;

			step++;
			up = !up;

			r = abs(curr - prev);
			if (up)
				arc((curr + prev) * 0.5, 0, r, r, PI, 0);
			else
				arc((curr + prev) * 0.5, 0, r, r, 0, PI);
		}
	}
