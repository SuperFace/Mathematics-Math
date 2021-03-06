/*
 * 设备检测
 * 浏览器js引擎版本和版本号检测
 * 浏览器类型检测
 * 平台检测：系统检测、移动设备类型检测、游戏系统检测
 * @author：linxl
 * */
var client = function(){
    var engine = {   
    		
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,

        ver: null  
    };
    
    var browser = {
        
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,

        ver: null
    };

    
    //platform/device/OS
    var system = {
        win: false,
        mac: false,
        x11: false,
        
        //mobile devices
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,
        
        //game systems
        wii: false,
        ps: false 
    };    

    var ua = navigator.userAgent;    
    if (window.opera){
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)){
        engine.ver = RegExp["$1"];
        engine.webkit = parseFloat(engine.ver);
        
        if (/Chrome\/(\S+)/.test(ua)){
            browser.ver = RegExp["$1"];
            browser.chrome = parseFloat(browser.ver);
        } else if (/Version\/(\S+)/.test(ua)){
            browser.ver = RegExp["$1"];
            browser.safari = parseFloat(browser.ver);
        } else {
            var safariVersion = 1;
            if (engine.webkit < 100){
                safariVersion = 1;
            } else if (engine.webkit < 312){
                safariVersion = 1.2;
            } else if (engine.webkit < 412){
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            }   
            
            browser.safari = browser.ver = safariVersion;        
        }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
        engine.ver = browser.ver = RegExp["$1"];
        engine.khtml = browser.konq = parseFloat(engine.ver);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){    
        engine.ver = RegExp["$1"];
        engine.gecko = parseFloat(engine.ver);
        
        if (/Firefox\/(\S+)/.test(ua)){
            browser.ver = RegExp["$1"];
            browser.firefox = parseFloat(browser.ver);
        }
    } else if (/MSIE ([^;]+)/.test(ua)){    
        engine.ver = browser.ver = RegExp["$1"];
        engine.ie = browser.ie = parseFloat(engine.ver);
    }
    
    browser.ie = engine.ie;
    browser.opera = engine.opera;
    

    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);

    if (system.win){
        if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
            if (RegExp["$1"] == "NT"){
                switch(RegExp["$2"]){
                    case "5.0":
                        system.win = "2000";
                        break;
                    case "5.1":
                        system.win = "XP";
                        break;
                    case "6.0":
                        system.win = "Vista";
                        break;
                    case "6.1":
                        system.win = "7";
                        break;
                    default:
                        system.win = "NT";
                        break;                
                }                            
            } else if (RegExp["$1"] == "9x"){
                system.win = "ME";
            } else {
                system.win = RegExp["$1"];
            }
        }
    }
    
    system.iphone = ua.indexOf("iPhone") > -1;
    system.ipod = ua.indexOf("iPod") > -1;
    system.ipad = ua.indexOf("iPad") > -1;
    system.nokiaN = ua.indexOf("NokiaN") > -1;
    
    if (system.win == "CE"){
        system.winMobile = system.win;
    } else if (system.win == "Ph"){
        if(/Windows Phone OS (\d+.\d+)/.test(ua)){;
            system.win = "Phone";
            system.winMobile = parseFloat(RegExp["$1"]);
        }
    }
    
    if (system.mac && ua.indexOf("Mobile") > -1){
        if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
            system.ios = parseFloat(RegExp.$1.replace("_", "."));
        } else {
            system.ios = 2;  //can't really detect - so guess
        }
    }
    
    if (/Android (\d+\.\d+)/.test(ua)){
        system.android = parseFloat(RegExp.$1);
    }
    
    system.wii = ua.indexOf("Wii") > -1;
    system.ps = /playstation/i.test(ua);
    
    return {
        engine:     engine,
        browser:    browser,
        system:     system        
    };

}();
var uPlat = false;
var plat = false;
var ua = navigator.userAgent.toLowerCase();
var platform = navigator.platform.toLowerCase(); //android or linux
var platV = false;
var iphoneN = false;
var uuid = false;//设备ID
//初始化微信接口
if(ua.indexOf("applewebkit") != -1){
	if(client.system.iphone || client.system.ipad){
		plat = "ios";
		if(ua.indexOf("6_") != -1){
			platV = 6.0;
		}
		if(ua.indexOf("7_") != -1){
			platV = 7.0;
		}
		if(ua.indexOf("8_") != -1){
			platV = 8.0;
		}
		if(ua.indexOf("8_0") != -1){
			platV = 8.0;
		}
		if(ua.indexOf("8_1") != -1){
			platV = 8.1;
		}
		if(ua.indexOf("8_2") != -1){
			platV = 8.2;
		}
		if(ua.indexOf("8_3") != -1){
			platV = 8.3;
		}
		if(ua.indexOf("8_4") != -1){
			platV = 8.4;
		}
		if(ua.indexOf("9_") != -1){
			platV = 9.0;
		}
		if(ua.indexOf("micromessenger") != -1){//微信浏览器
			uPlat = "ios_weixin";
		}else if(ua.indexOf("version") != -1 && ua.indexOf("safari") != -1){//Safair浏览器
			uPlat = "safari";
		}else{ //桌面快捷方式
			uPlat = "desktop";
		}
		var w = window.screen.width;
		var h = window.screen.height;
		if(h == 480){
			iphoneN = "iphone4";
		}
		if(h == 568){
			iphoneN = "iphone5";
		}
		if(h == 667){
			iphoneN = "iphone6";
		}
		if(h == 736){
			iphoneN = "iphone6p";
		}
	}else if(client.system.android){
		plat = "android";
		if(ua.indexOf("micromessenger") != -1){//微信浏览器
			uPlat = "android_weixin";
		}else if(ua.indexOf("chrome") != -1){//Chrome浏览器
			uPlat = "chrome";
		}
	}
}
//获取uuid
!function(){
    var uid_arr = ua.split('/');
    uuid = uid_arr[4].substr(0,6);
}();