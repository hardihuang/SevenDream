//initialize
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
var drawTree = function(ctx, sX, sY, length, angle, depth, width){
	// variables
	var newLength, newAngle, newDepth, eX, eY, baseX, baseY, topX, topY, subBranches;
	var rand = Math.random;	// 0 < rand() < 1
	var maxBranch = 3;
	var maxAngle = Math.PI/2;	// pi/2(rad) = 90(deg)
	var shrink = 0.618;	//branch width bottom to top ratio

	//calculations
	eX = sX+length*Math.cos(angle);
	eY = sY-length*Math.sin(angle);
	baseX = 0.5*width*Math.sin(angle);
	baseY = 0.5*width*Math.cos(angle);
	topX = shrink*(0.5*width)*Math.sin(angle);
	topY = shrink*(0.5*width)*Math.cos(angle);

	// start drawing
	ctx.beginPath();
	ctx.lineCap = 'cap';
	ctx.lineWidth = width;
	ctx.moveTo(sX-baseX,sY-baseY);		//point a

	//points
	ctx.lineTo(sX+baseX,sY+baseY);		//point b
	ctx.lineTo(eX+topX,eY+topY);	//point c
	ctx.lineTo(eX-topX,eY-topY);	//point d
	ctx.lineTo(sX-baseX,sY-baseY);		//back to point a

	//change color for different branchs
	if(depth <= 1){
		ctx.fillStyle = 'rgb(0,'+(((rand()*64)+128)>>0)+',0)';
	}else{
		ctx.fillStyle = 'rgb('+(((rand()*64)+64)>>0)+',50,25)';
	}


	ctx.fill();
	// ctx.stroke();

	/*prepare new data for new branches, same variables outside the for loop
	* different variables for each branches inside the for loop
	*/

	// depth counting
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
	width*=shrink;
	// width = (width*shrink)/2

	//for loop to draw new branches
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
		drawTree(ctx, eX, eY, newLength, newAngle, newDepth, width);	
	}

}

//ctx, startX, startY, length, angle, depth, branchWidth
drawTree(ctx,center('x'),center('y'),130,Math.PI/2,5,40);
		
