/*
 * 根据贝塞尔曲线各阶公式，求曲线上的点
 * author：linxl
 * email：350825854@qq.com
 * time: 2016-08-19
 * API: bezier.bezier_1(t, p0, p1)、bezier.bezier_2(t, p0, p1, p2)、
 * 		bezier.bezier_3(t, p0, p1, p2, p3)、
 * 		bezier.bezier_4(t, p0, p1, p2, p3, p4)、
 * 		bezier.bezier_5(t, p0, p1, p2, p3, p4, p5)、
 * 		bezier.bezier_n(n, t, p0, p1, ...)
 * */
//贝塞尔曲线各阶公式
//P0为起点,Pn为终点,Pi为控制点
//t=[0, 1]
var bezier = {
		//n!=n阶乘
		factorial: function(n){
			var that = this;
			return n > 1 ? n*that.factorial(n-1) : 1;
		},
		point2D: function(x, y){
			return {x: x, y: y};
		},
		//一阶贝塞尔曲线(线段)
		//意义：由 P0 至 P1 的连续点， 描述的一条线段
		//公式：
		bezier_1: function(t, p0, p1){
			var mum1 = 1 - t;
			return this.point2D(Math.round(mum1*p0.x + t*p1.x), Math.round(mum1*p0.y + t*p1.y));
		},
		//二阶贝塞尔曲线(线段)
		//起始点、终点、一个控制点，在时间t时，决定一个物理点（x, y）
		//t=[0, 1]
		bezier_2: function(t, p0, p1, p2){
			var mum1 = 1 - t,
			mum12 = mum1*mum1,
			mu2 = t*t;
			return this.point2D(Math.round(mum12*p0.x + 2*mum1*p1.x + mu2*p2.x), Math.round(mum12*p0.y + 2*mum1*p1.y + mu2*p2.y));
		},
		//三阶贝塞尔曲线
		//四个点一个时间t值决定一个物理点（x, y）
		//t=[0, 1]
		bezier_3: function(t, p0, p1, p2, p3) {
			var that = this;
			var mum1 = 1 - t,
			mum13 = mum1 * mum1 * mum1,
			mu3 = t * t * t;
			return that.point2D(Math.round(mum13*p0.x + 3*t*mum1*mum1*p1.x + 3*t*t*mum1*p2.x + mu3*p3.x),
						Math.round(mum13*p0.y + 3*t*mum1*mum1*p1.y + 3*t*t*mum1*p2.y + mu3*p3.y));
		},
		//四阶贝塞尔曲线
		//五个点一个时间t值决定一个物理点（x, y）
		//t=[0, 1]
		bezier_4: function(t, p0, p1, p2, p3, p4) {
			var that = this;
			var mum1 = 1-t,
			mum14 = mum1*mum1*mum1*mum1,
			mu4 = t*t*t*t;
			return that.point2D(Math.round(mum14*p0.x + 4*t*mum1*mum1*mum1*p1.x + 6*t*t*mum1*mum1*p2.x + 4*t*t*t*mum1*p3.x + mu4*p4.x), Math.round(mum14*p0.y + 4*t*mum1*mum1*mum1*p1.y + 6*t*t*mum1*mum1*p2.y + 4*t*t*t*mum1*p3.y + mu4*p4.y));
		},
		//五阶贝塞尔曲线
		//六个点一个时间t值决定一个物理点（x, y）
		//t=[0, 1]
		bezier_5: function(t, p0, p1, p2, p3, p4, p5) {
			var that = this;
			var mum1 = 1-t,
			mum15 = mum1*mum1*mum1*mum1*mum1,
			mu5 = t*t*t*t*t;
			return that.point2D(Math.round(mum15*p0.x + 5*t*mum1*mum1*mum1*mum1*p1.x + 10*t*t*mum1*mum1*mum1*p2.x + 10*t*t*t*mum1*mum1*p3.x + 5*t*t*t*t*mum1*p4.x + mu5*p5.x), Math.round(mum15*p0.y + 5*t*mum1*mum1*mum1*mum1*p1.y + 10*t*t*mum1*mum1*mum1*p2.y + 10*t*t*t*mum1*mum1*p3.y + 5*t*t*t*t*mum1*p4.y + mu5*p5.y));
		},
		//贝塞尔曲线通用公式
		//n阶=1, 2, 3, 4, 5, ....，t=[0, 1]
		//参数：n ,t, p0, p1, ...
		bezier_n: function(n, t){
			var that = this;
			var points = [];
			for(var i=2; i<=2+n; i++){
				var _point = arguments[i];
				points.push(_point);
			}
			if(points.length == n+1){
				var mum1 = 1-t,
				mum1n = Math.pow(mum1, n),
				mun = Math.pow(t, n);
				var mArr = [];
				for(var m=0; m <= n; m++){
					//杨辉三角形的每一项数据正好是组合（即n!/m!/(n-m)!）的值，其中n是行数（从0行开始）；m是列数（从0列开始）
					mArr[m] = that.factorial(n)/that.factorial(m)/that.factorial(n - m);
				}
				var _resultX = 0, _resultY = 0;
				for(var j=0; j<=n; j++){
					var _point = points[j];
					if(j == 0){
						_resultX += mArr[0]*mum1n*_point.x;
						_resultY += mArr[0]*mum1n*_point.y;
					}else if(j == n){
						_resultX += mArr[n]*mun*_point.x;
						_resultY += mArr[n]*mun*_point.y;                        
					}else{
						_resultX += mArr[j]*Math.pow(t, j)*Math.pow(mum1, n-j)*_point.x;
						_resultY += mArr[j]*Math.pow(t, j)*Math.pow(mum1, n-j)*_point.y;
					}
				}
				if(_resultX && _resultY) return that.point2D(Math.round(_resultX), Math.round(_resultY));
			}else{
				return new Error("arguments error!");
			}
		},
};