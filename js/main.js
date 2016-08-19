$(function(){
	var box = $("#box");
	var n=5, t=0;
	var p0 = {x: 30, y: 450},p1 = {x: 10,y:30},p2 = {x: 400, y: 30}, p3 = {x: 500, y: 450}, p4 = {x: 550, y: 50}, p5 = {x: 500, y: 480};
	do{
		var linePoint = bezier.bezier_n(n, t, p0, p1, p2, p3, p4, p5);
		var point = document.createElement("div");
		point.className = "point";
		point.style.top = linePoint.y+"px";
		point.style.left = linePoint.x+"px";
		box[0].appendChild(point);
		
		var linePoint1 = bezier.bezier_5(t, p0, p1, p2, p3, p4, p5);
		var point1 = document.createElement("div");
		point1.className = "point";
		point1.style.top = linePoint1.y+"px";
		point1.style.left = linePoint1.x+"px";
		box[0].appendChild(point1);
		
		t+=0.01;
	}while(t <= 1)
});