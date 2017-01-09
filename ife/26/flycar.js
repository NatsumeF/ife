


function FlyCar(ele,no){
	this.ele=ele;
	this.NO=no;
};
FlyCar.prototype.init=function(){
	this.energy=100; //能量
	this.speed=5;  //速度
	this.work=5;  //工作消耗
	this.revert=2;
	this.deg=0;  //回复
	this.show();
};
FlyCar.prototype.show=function(){
	clearInterval(this.addTime);
	clearInterval(this.moveTime);
	this.ele.style.display="block";
	this.lookMove();
};
FlyCar.prototype.hide=function(no){
	if(this.NO=no){
		clearInterval(this.addTime);
		clearInterval(this.moveTime);
		this.ele.style.display="none";
	}
};
FlyCar.prototype.lookMove=function(){
		this.ele.getElementsByTagName("span")[0].innerHTML = this.energy.toFixed();
		this.ele.getElementsByClassName("oback")[0].style.left = -this.energy * 0.4 + "px";
		this.ele.style.transform = "rotate("+this.deg +"deg)";
};
FlyCar.prototype.move = function(no) {
	if (this.NO === no) {
		than = this;
		clearInterval(this.addTime);
		clearInterval(this.moveTime);
		this.moveTime = setInterval(function() {
			than.energy -= than.work / 20;
			than.deg+=than.speed/20;
			if (than.energy <= 0) {
				than.energy=0;
				clearInterval(than.moveTime);
				than.addWork(no)
			}
			than.lookMove()
		}, 50)
	}
};
FlyCar.prototype.addWork = function(no) {
	if (this.NO === no) {
			than = this;
			clearInterval(this.addTime)
			clearInterval(this.moveTime);
		this.addTime = setInterval(function() {
			than.energy += than.revert;
			if(than.energy>=100){
				than.energy=100;
				clearInterval(than.addTime)
			}
			than.lookMove()
		}, 1000)
	}
};
FlyCar.prototype.listen=function(data){
	if(data.commond===stop){
		this.addWork(data.id);
	}else if(data.commond===go){
		this.move(data.id)
	}
};