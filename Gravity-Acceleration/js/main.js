var i = null;
function demo(hp,vp,sp) {
	var f = document.getElementById('fall');
	f.style.right = '0px';
	f.style.bottom = '40px';
	i&&clearInterval(i);
	var h=1, v=1,
		hp=(hp > 0 && hp < 1) ? hp : 0.2, 
		vp = (vp > 0 && vp < 1) ? vp : 0.5, 
		sp=(sp > 20 || sp < 1000) ? sp : 20;
	i=setInterval(function(){
		if(f){
			var r = parseInt(f.style.right) + h,
			    b = parseInt(f.style.bottom) - v;
			f.style.right = r + 'px';
			f.style.bottom = b + 'px';
			if(r>=98) clearInterval(i);
			if(b > -216){
				v += 2
			} else {
				h = (v > 0) ? v*hp : 0;
				v *= (v > 0) ? -1*vp : 0;
				console.log(h, v);
			}
			
		}
	},sp);
}
