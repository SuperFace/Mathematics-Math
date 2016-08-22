$(function(){
	var box = $("#box");
	var n=5, t=0;
	var p0 = {x: 100, y: 350},p1 = {x: 100,y:30},p2 = {x: 400, y: 30}, p3 = {x: 500, y: 250}, p4 = {x: 360, y: 50}, p5 = {x: 500, y: 480}, p6 = {x: 380, y:80}, p7 = {x:300, y: 100}, p8={x: 250,y:150};
	
	/*//根据阶数：n，t值，绘制一条贝塞尔曲线
	 * do{
		var linePoint = bezier.bezier_n(n, t, p0, p1, p2, p3, p4, p5);
		var point = document.createElement("div");
		point.className = "point";
		point.style.top = linePoint.y+"px";
		point.style.left = linePoint.x+"px";
		box[0].appendChild(point);
		t+=0.01;
	}while(t <= 1)*/
	
	/*//动画：绘制：1阶-8阶贝塞尔曲线
	  var _handler = setInterval(function(){
		if(t > 1){
			n++;
			t = 0;
			if(n > 8){
				n = 1;
				box.html("");
			}
		}else{
			var linePoint = bezier.bezier_n(n, t, p0, p1, p2, p3, p4, p5, p6, p7, p8);
			var point = document.createElement("div");
			point.className = "point";
			point.style.top = linePoint.y+"px";
			point.style.left = linePoint.x+"px";
			box[0].appendChild(point);
		}
		t+=0.01;
	}, 100);*/
	
	var page = {
        event: function (evt) {
            var ev = evt || window.event;
            return ev;
        },
        pageX: function (evt) {
            var e = this.event(evt);
            return e.pageX || (e.clientX + document.body.scrollLeft - document.body.clientLeft);
        },
        pageY: function (evt) {
            var e = this.event(evt);
            return e.pageY || (e.clientY + document.body.scrollTop - document.body.clientTop);

        },
        layerX: function (evt) {
            var e = this.event(evt);
            return e.layerX || e.offsetX;
        },
        layerY: function (evt) {
            var e = this.event(evt);
            return e.layerY || e.offsetY;
        }
    };  
	
	n = 3;//5阶
	//画起始点
	var startP = document.createElement("div");
	startP.className = "start-p";
	startP.id = "start-p";
	startP.style.top = p0.y+"px";
	startP.style.left = p0.x + "px";
	box[0].appendChild(startP);
	//结束点
	var endP = document.createElement("div");
	endP.className = "end-p";
	endP.id = "end-p5";
	endP.style.top = p5.y+"px";
	endP.style.left = p5.x + "px";
	box[0].appendChild(endP);
	//控制点1
	var cP1 = document.createElement("div");
	cP1.className = "c-p";
	cP1.id = "c-p1";
	cP1.style.top = p1.y+"px";
	cP1.style.left = p1.x + "px";
	box[0].appendChild(cP1);
	//控制点2
	var cP2 = document.createElement("div");
	cP2.className = "c-p";
	cP2.id = "c-p2";
	cP2.style.top = p2.y+"px";
	cP2.style.left = p2.x + "px";
	box[0].appendChild(cP2);
	/*//控制点3
	var cP3 = document.createElement("div");
	cP3.className = "c-p";
	cP3.id = "c-p3";
	cP3.style.top = p3.y+"px";
	cP3.style.left = p3.x + "px";
	box[0].appendChild(cP3);
	//控制点4
	var cP4 = document.createElement("div");
	cP4.className = "c-p";
	cP4.id = "c-p4";
	cP4.style.top = p4.y+"px";
	cP4.style.left = p4.x + "px";
	box[0].appendChild(cP4);*/
	//绘制曲线
	var drawBezier = function(){
		$(".point").remove();
		t = 0;
		do{
			var linePoint = bezier.bezier_n(n, t, p0, p1, p2, /*p3, p4,*/ p5);
			var point = document.createElement("div");
			point.className = "point";
			point.style.top = linePoint.y+"px";
			point.style.left = linePoint.x+"px";
			box[0].appendChild(point);
			t += 0.01;
		}while(t<=1)
	};
	drawBezier();
	
	var drayFunction = function(target, e, fn){
		var d = document;
        var that=e.target;
        var boxLeft = box[0].getBoundingClientRect().left;
        var boxTop = box[0].getBoundingClientRect().top;
        var cLeft = that.getBoundingClientRect().left;
        var cTop = that.getBoundingClientRect().top;
        var x = page.pageX(e);
        var y = page.pageY(e);   
        if (that.setCapture) {
            that.setCapture();
        }else if (window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        }
        d.onmousemove = function (e) {   
        	var tx = cLeft - boxLeft + page.pageX(e) - x;
            var ty = cTop - boxTop + page.pageY(e) - y;
            that.style.left = tx + "px";
            that.style.top = ty + "px";
            fn(tx, ty);
            drawBezier();
        }
        d.onmouseup = function () {
            if (that.releaseCapture) {
                that.releaseCapture();
            }else if (window.releaseEvents) {
                window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }
            d.onmousemove = null;
            d.onmouseup = null;
        }
	};
	
	//拖拽起始点
	$("#start-p").on("mousedown", function(e){
		drayFunction($("#start-p")[0], e, function(tx, ty){
			p0 = {x: tx, y: ty};
		});
	});
	//拖拽控制点1
	$("#c-p1").on("mousedown", function(e){
		drayFunction($("#c-p1")[0], e, function(tx, ty){
			p1 = {x: tx, y: ty};
		});
	});
	//拖拽控制点2
	$("#c-p2").on("mousedown", function(e){
		drayFunction($("#c-p2")[0], e, function(tx, ty){
			p2 = {x: tx, y: ty};
		});
	});
	//拖拽控制点3
	$("#c-p3").on("mousedown", function(e){
		drayFunction($("#c-p3")[0], e, function(tx, ty){
			p3 = {x: tx, y: ty};
		});
	});
	//拖拽控制点4
	$("#c-p4").on("mousedown", function(e){
		drayFunction($("#c-p4")[0], e, function(tx, ty){
			p4 = {x: tx, y: ty};
		});
	});
	//拖拽终止点
	$("#end-p5").on("mousedown", function(e){
		drayFunction($("#end-p")[0], e, function(tx, ty){
			p5 = {x: tx, y: ty};
		});
	});
});