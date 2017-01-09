(function(window,undefined){
	var index=[1,2,3,4];//定义当前飞船数量;










	var go = document.getElementsByClassName("a")[0],
		stop=document.getElementsByClassName("b")[0],
		out=document.getElementsByClassName("c")[0],
		car1=document.getElementsByClassName("ball1")[0],
		CAR1,
		clearCar=document.getElementsByClassName('c')[0];

		CAR1=new FlyCar(car1,1);
		go.onclick=function(){
			CAR1.init()
		}
		stop.onclick=function(){
			CAR1.move(1)
		}
		out.onclick=function(){
			CAR1.hide(1)
		}
})(window)