var UlamSpiral = (function(){
	"use strict";
	
	var canvas;
	var ctx;
	var pointCount;
	var pointSize;
	var cornerCount;
	var fontSize;
	var showLabels;

	var Spiral = function(opts){
		opts = opts || {};
		if(!(this instanceof Spiral)){
			throw new Error('instantiate me!');
		}
		
		canvas = document.getElementById(opts.canvas);
		
		ctx = canvas.getContext('2d');

		pointCount = opts.points || 2000;
		cornerCount = opts.corners || 4;
		// TODO: improve scale detection based on density
		pointSize = canvas.width / (Math.sqrt(pointCount) * (cornerCount / 3.1));

		showLabels = opts.labels;
		fontSize = pointSize * 0.6;
		if(fontSize < 3){
			fontSize = 0;
		}

		draw();
	};
	
	var draw = function(){
		var sx = canvas.width / 2;
		var sy = canvas.height / 2;
		var angle = 360 / cornerCount;

		var newX = sx;
		var newY = sy;

		var direction = 0;
		var limit = 1;
		var number = 1;

		while(number < pointCount){
			direction += angle;
			if(direction >= 360){
				direction -= 360;
			}
			for(var j = 0; j < limit / 2; j++){
				addPoint(newX, newY, number);
				number++;
				var mod = 1; // TODO: calculate a density modifier
				newX += pointSize * sin(direction) / mod;
				newY += pointSize * cos(direction) / mod;
			}
			limit++;
		}
	};
	
	var addPoint = function(x, y, i){
		if(i === '!'){
			ctx.fillStyle = "rgba(255, 255, 0, 0.8)";
		} else if(i === 1){
			ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
		} else if(isPrime(i)){
			ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
		} else if(i % 2){
			ctx.fillStyle = "rgba(0, 0, 255, 0.1)";
		} else {
			ctx.fillStyle = "rgba(0, 255, 0, 0.1)";
		}
		ctx.fillRect(x - pointSize / 2, y, pointSize, pointSize);

		if(showLabels && fontSize){
			ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
			ctx.font = fontSize + 'px ' + 'Arial';
			ctx.fillText(i, x - fontSize / 2, y + fontSize);
		}
	};

	var isOdd = function(number){
		return number % 2;
	};

	var isEven = function(number){
		return !isOdd(number);
	};

	var isPrime = function(number){
		var start = 2;
		while(start <= Math.sqrt(number)){
			if(number % start++ < 1){
				return false;
			}
		}
		return number > 1;
	};

	var angleToRadian = function(angle){
		return (angle * (Math.PI / 180));
	};
	var sin = function(angle){
		return Math.sin(angleToRadian(angle));
	};
	var cos = function(angle){
		return Math.cos(angleToRadian(angle));
	};

	return Spiral;
}());
