//三阶贝塞尔曲线
//四个点一个时间t值决定一个物理点（x, y）
//t=[0, 1]
var bezier = function(p0, p1, p2, p3, t) {
	var mum1 = 1 - t,
	mum13 = mum1 * mum1 * mum1,
	mu3 = t * t * t;
	function point2D(x, y){
		return {x: x, y: y};
	}
	return point2D(Math.round(mum13*p1.x + 3*t*mum1*mum1*p2.x + 3*t*t*mum1*p3.x + mu3*p4.x),
				Math.round(mum13*p1.y + 3*t*mum1*mum1*p2.y + 3*t*t*mum1*p3.y + mu3*p4.y));
};

//贝塞尔曲线各阶公式
//P0为起点,Pn为终点,Pi为控制点
//t=[0, 1]

var bezier = {
		point2D: function(x, y){
			return {x: x, y: y};
		},
		//一阶贝塞尔曲线(线段)
		//意义：由 P0 至 P1 的连续点， 描述的一条线段
		//公式：
		bezierP1: function(p0, p1, t){
			var mum1 = 1 - t,
			return this.point2D(Math.round(mum1*p0.x + t*p1.x), Math.round(mum1*p0.y + t*p1.y));
		},
		//贝塞尔曲线通用公式
		//n阶=1, 2, 3, 4, 5, ....，t=[0, 1]
		//参数：n ,t, p0, p1, ...
		bezier: function(n, t){
			var that = this;
			n = +n;t = +t;
			var args = !(typeof n == "number") && !(typeof t == "number") && arguments.lenght == (n+3) : args : null;
			if(args){
				var points = [];
				for(var i=2; i<n+1; i++){
					var _point = args[i];
					if(!!_point){
						points.push(_point);
					}
				}
				if(points.length == n+1){
					var mum1 = 1-t,
					mum1n = Math.pow(mum1, n),
					mun = Math.pow(t, n);
					var _resultX = 0, _resultY = 0;
					for(let j=0; j<n+1; j++){
						var _point = points[j];
						if(j == 1){
							_resultX += mum1n*_point.x;
							_resultY += mum1n*_point.y;
						}else if(j == n){
							_resultX += mun*_point.x;
							_resultY += mun*_point.y;
						}else{
							_resultX += Math.pow(t, j)*Math.pow(mum1, n-j)*point.x;
							_resultY += Math.pow(t, j)*Math.pow(mum1, n-j)*point.y;
						}
					}
					if(_resultX && _resultY){
						return that.point2D(_resultX, _resultY);
					}
				}else{
					return new Error("arguments error!");
				}
			}
			return new Error("arguments error!");;
		},
};