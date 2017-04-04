window.onload = function(){
	document.addEventListener('touchmove',function(ev){
		ev.preventDefault();
	});
	var viewport = document.querySelector('.viewport-new');
	var searchBarCover = document.querySelector('.search-cover');
	var scrollToTopBtn = document.querySelector('.bottom-to-top');
	viewport.addEventListener('touchmove',function(ev){
		ev.stopPropagation();
		slideShowOrHide()
	});
	document.addEventListener('scroll',function(ev){
		slideShowOrHide()
	});
	scrollToTopBtn.addEventListener('touchstart',function(){
		document.documentElement.scrollTop = document.body.scrollTop = 0;
	});
	//滑动时改变搜索框背景颜色透明度和显示隐藏返回顶部按钮
	slideShowOrHide();
	function slideShowOrHide(){
		var top = document.documentElement.scrollTop || document.body.scrollTop;
		var navOpacity = top/300>0.85?0.85:top/300;
		searchBarCover.style.opacity = navOpacity;
		var pageHeight = window.innerHeight;
		if (top > pageHeight) {
			scrollToTopBtn.style.display = 'block';
		} else{
			scrollToTopBtn.style.display = 'none';
		}
	}
	//广告轮播图
    sliderAdvertisement(".slider");
    sliderAdvertisement(".slider-small1");
    sliderAdvertisement(".slider-small2");
    sliderAdvertisement(".slider-small3");
    function sliderAdvertisement(obj){
    		var wrap = document.querySelector(obj);
		var box = wrap.querySelector(".slider-box");
		box.innerHTML += box.innerHTML;
		var aLi = box.querySelectorAll("li");
		var focusBtn = wrap.querySelectorAll(".focus-btn span");
		var sliderHeight = aLi[0].offsetHeight;
		var sliderWidth = wrap.offsetWidth;
	    var startPoint = 0;
		var startEle = 0;
		var now = 0;
		var sliderTimer = null;
		var lastTime = 0;
		
		box.style.width = aLi.length * 100 + "%";
		for(var i=0;i<aLi.length;i++){
	        aLi[i].style.width = 1/aLi.length * 100 + '%';
	    };
	    cssTransform(box,"translateX",0);
	    auto();
	    
	    wrap.addEventListener("touchstart",function(e){
		    clearInterval(sliderTimer);
		    box.style.transition = "none";
		    var moveX = cssTransform(box,"translateX");
		    now = Math.round(-moveX/sliderWidth);
		    if(now<=0){
		        now = focusBtn.length;
		    }else if(now>=aLi.length-1){
		        now = focusBtn.length-1;
		    }
		    cssTransform(box,"translateX",-now*sliderWidth);
		    startPoint = e.changedTouches[0].pageX;
		    startEle = cssTransform(box,"translateX");
		    lastTime = new Date().getTime();
		    e.preventDefault();
		});
		wrap.addEventListener("touchmove",function(e){
		    var endPoint = e.changedTouches[0].pageX;
		    var disX = endPoint - startPoint;
		    cssTransform(box,"translateX",disX+startEle);
		});
		wrap.addEventListener("touchend",function(e){
			var nowTime = new Date().getTime();
			var endPoint = e.changedTouches[0].pageX;
		    var moveX = cssTransform(box,"translateX");
		    if (endPoint < startPoint && nowTime - lastTime < 250) {
	    		now = Math.ceil(-moveX/sliderWidth);
		    }else if (endPoint > startPoint && nowTime - lastTime < 250) {
	    		now = Math.floor(-moveX/sliderWidth);
		    }else {
		    	now = Math.round(-moveX/sliderWidth);
		    }
		    tab();
		    auto();
		});
		function auto(){
		    clearInterval(sliderTimer);
		    sliderTimer = setInterval(function(){
		        if(now == aLi.length-1){
		            now = focusBtn.length - 1;
		        }
		        box.style.transition = "none";
		        cssTransform(box,"translateX",-now*(sliderWidth));
		        setTimeout(function(){
		            now++;
		            tab();
		        },30);
		    },3000);
		};
		function tab(){
		    box.style.transition = ".3s";
		    cssTransform(box,"translateX",-now*sliderWidth);
		    for(var i=0;i<focusBtn.length;i++){
		        focusBtn[i].className = "";
		    };
		    focusBtn[now%focusBtn.length].className = "active";
		}
    }
    
    //京东快报标题上下滑动切换
    var newList = document.querySelector('.news-list');
    var newLis = newList.getElementsByTagName('li');
    var newTimer = null;
    newTimer = setInterval(function(){
    		newList.style.cssText = "transform: translate3d(0px, -23px, 0px);transition-property: -webkit-transform, transform;transition-duration: 0.5s;transition-timing-function: ease;";
    		setTimeout(function(){
    			newList.style.cssText = "transform: translate3d(0px, 0px, 0px)";
    			newList.appendChild(newLis[0]);
    		},500)
    },3000)
    
    //京东秒杀倒计时
    var endTime = new Date();
	endTime.setHours(endTime.getHours()+2);
	var hour = document.querySelectorAll('.seckill-time')[0].querySelector('span');
	var minute = document.querySelectorAll('.seckill-time')[1].querySelector('span');
	var second = document.querySelectorAll('.seckill-time')[2].querySelector('span');
	var seckillTimer = null;
	function toTwo(n){return n<10?'0'+n:''+n;}
	function countDown(){
		var nowTime = new Date();
		var timeDifference = parseInt((endTime.getTime() - nowTime.getTime())/1000);
		var h = parseInt((timeDifference/3600)%24);
        var m = parseInt((timeDifference/60)%60);
        var s = parseInt(timeDifference%60);
        hour.innerHTML = toTwo(h);
		minute.innerHTML = toTwo(m);
		second.innerHTML = toTwo(s);
		if (timeDifference<=0) {
			hour.innerHTML = "00";
			minute.innerHTML = "00";
			second.innerHTML = "00";
			clearInterval(seckillTimer);
		}
	}
	countDown();
	seckillTimer = setInterval(countDown,1000);
    
    //京东秒杀滑动区域
	var seckillSlider = document.querySelector('.seckill-slider ul');
	var seckillLi = seckillSlider.querySelectorAll("li");
	var sliderHeight = seckillLi[0].offsetHeight;
	var sliderWidth = seckillLi[0].offsetWidth;
    var startPoint = 0;
	var startEle = 0;
	var now = 0;
	var hWidth = document.documentElement.getBoundingClientRect().width;
	seckillSlider.style.width = seckillLi.length * sliderWidth + "px";
	seckillSlider.addEventListener("touchstart",function(e){
	    seckillSlider.style.transition = "none";
	    var moveX = cssTransform(seckillSlider,"translateX");
	    now = Math.round(-moveX/sliderWidth);
	    cssTransform(seckillSlider,"translateX",-now*sliderWidth);
	    startPoint = e.changedTouches[0].pageX;
	    startEle = cssTransform(seckillSlider,"translateX");
	    e.preventDefault();
	});
	seckillSlider.addEventListener("touchmove",function(e){
	    var endPoint = e.changedTouches[0].pageX;
	    var disX = endPoint - startPoint;
	    var moveX = cssTransform(seckillSlider,"translateX");
	    if ((moveX<0 || disX<0)) {
	    		cssTransform(seckillSlider,"translateX",disX+startEle);
	    } 
	});
	seckillSlider.addEventListener("touchend",function(e){
		var endPoint = e.changedTouches[0].pageX;
	    var moveX = cssTransform(seckillSlider,"translateX");
	    now = Math.round(-moveX/sliderWidth);
	    showNumber = Math.ceil(hWidth/sliderWidth);
	    
	    if (endPoint < startPoint) {
	    		now = Math.ceil(-moveX/sliderWidth);
	    		if (now>seckillLi.length-showNumber) {
	    			now = seckillLi.length-showNumber;
	    		}
	    }else if (endPoint > startPoint && now>0) {
	    		now = Math.floor(-moveX/sliderWidth);
	    }
	    seckillSlider.style.transition = ".3s";
	    cssTransform(seckillSlider,"translateX",-now*sliderWidth);
	});
	
	
    
};
// 只传入两个实参则为获取，传入三个实参为设置参数值，当然为了简单点，所以只加入了translateX这一单一属性，用户可以自行对该函数进行改造，
//可以适当的加入translateY,scaleX,scaleY等值。
function cssTransform(ele,attr,val){
    if(!ele.transform){
        ele.transform = {};
    };
//当传入值时对属性进行设置。
    if(arguments.length>2){
        ele.transform[attr] = val;
        var sval = "";
        for(var s in ele.transform){
            if(s == "translateX"){
                sval += s + "("+ele.transform[s] +"px)";
            }
            ele.style.WebkitTransform = ele.style.transform = sval;
        }

    }else{
        val = ele.transform[attr];
        if(typeof val=="undefined"){
            if(attr=="translateX"){
                val = 0;
            }
        };
//      console.log(val);
        return val;
    }
}