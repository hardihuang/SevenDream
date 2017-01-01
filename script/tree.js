var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = document.body.offsetWidth ;
canvas.height =document.body.scrollHeight;
document.body.appendChild(canvas);



//return root location
function center(a){
	if(a=="x"){
		return document.body.offsetWidth/2;
	}else if(a=="y"){
		return document.body.offsetHeight;
	}else{
		return;
	}
}

var drawTree = function(ctx, startX, startY, length, angle, depth, branchWidth){
	var newLength, newAngle, newDepth, endX, endY, subBranches;
	// 0 < rand() < 1
	var rand = Math.random;
	var maxBranch = 3;
	// pi/2(rad) = 90(deg)
	var maxAngle = Math.PI/2;

	ctx.beginPath();
	ctx.moveTo(startX,startY);
	endX = startX + length*Math.cos(angle);
	endY = startY + length*Math.sin(angle);
	ctx.lineCap = 'cap';
	ctx.lineWidth = branchWidth;
	ctx.lineTo(endX, endY);

	//color for different branchs
	if(depth <= 2){
		ctx.strokeStyle = 'rgb(0,'+(((rand()*64)+128)>>0)+',0)';
	}else{
		ctx.strokeStyle = 'rgb('+(((rand()*64)+64)>>0)+',50,25)';
	}
	ctx.stroke();

	//stop drawing when hits the last depth
	newDepth = depth -1;
	if(!newDepth){
		return;
	}

	
	subBranches = (rand()*(maxBranch-1))+1;
	/*
		x*=y <=> x=x*y
		the width of each branches is reduced by 30%
		the last width will never be zero but will closer to 0
		6.00 | 4.19 | 2.93 | 2.05 | 1.44 | 1.00 | 0.70 | 0.49 | 0.34 | 0.242 | 0.169 | 0.11 | 0.083
	*/
	branchWidth*=0.618;

	for(var i=0;i<subBranches;i++){
		/*
			|angle| 			is the initial value that we passed to the function first time
								it only used to build the first branch
			|+rand()*maxAngle| 	assume maxAngle is pi/2(rad) or 90(deg), 
								so this is a random angle between 0 to pi/2 (rad) or 0 to 90 (deg)
			|-maxAngle*0.5|		this will turn the angle anticlockwise a half of maxAngle
								in our case is 45(deg) 
		*/
		newAngle = angle+rand()*maxAngle-maxAngle*0.5;
		newLength = length*(0.7+rand()*0.3);
		drawTree(ctx, endX, endY, newLength, newAngle, newDepth, branchWidth);

	}
}


//ctx, startX, startY, length, angle, depth, branchWidth
drawTree(ctx,center("x"),center("y"),130,-Math.PI/2,5,30);
