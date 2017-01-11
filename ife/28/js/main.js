"use strict";
(function(window, undefined) {
	var main = $("#main"),
		textarea = $("textarea")[0];

	function text(text) {
		textarea.value += text + "\n";
		textarea.scrollTop = textarea.scrollHeight;
	}
	var flycar = {
		//仓库里面的车;
		id: [1, 2, 3, 4],
		main: [],
		status: [false, false, false, false],
		sortId: function() {
			this.id.sort(function(a, b) {
				return a - b;
			})
		},
		random: function(data) {
			var me = this;
			var _data=dataDeal.deal(data),
				no=_data.id,
				commond=_data.commond;
			function randomSay() {
				setTimeout(function() {
					if ((Math.random() * 100) > 30) {
						me.say(data)
						if (commond === 3) {
							me.id.push(no);
							me.status[no-1] = false;
							adapter.deleteArr(no-1);
							adapter.showArr();
							me.showCar();
							me.sortId();
						}
					} else {
						setTimeout(function(){
							randomSay();
						},500)
					}
				}, 300)
			}
			randomSay();
		},
		say: function(data) {
			for (let i = 0; i < this.status.length; i++) {
				if (this.status[i]) {
					this.main[i].listen(data);
				}
			}
		},
		time:null,
		showCar:function(){
			var me = this;
			clearInterval(this.time);
			this.time=setInterval(function(){
				if(me.id.length<4){
					me.status.forEach(function(item,index){
						if(item){
							adapter.arr[index]=[index+1,me.main[index].speed,me.main[index].revert]
							me.main[index].speak();
						}
					})
				}else{
					clearInterval(me.time)
				}
			},1000)
		}
	};
	var consoles= {
		index: 1,
		createDiv: function() {
			if (this.index < 5) {
				var div = $("<div class=\"move\" data-index=" +this.index + ">" +
					"<span>" + this.index + "号飞船</span>" +
					"<button data-dothing=\"go\">开始飞行</button>" +
					"<button data-dothing=\"stop\">停止飞行</button>" +
					"<button data-dothing=\"clear\">摧毁飞船</button>" +
					"</div>");
				div.appendTo($("#footer"))
				this.index++;
			}
		}
	};
	$(".new-car-but").on("click", function() {
		if (flycar.id.length > 0) {
			flycar.sortId();
			var i = flycar.id.shift(),
				data = {};
			data.speed=$(".speedCar:checked").attr("data-speed");
			data.revert=$(".degCar:checked").attr("data-revert");
			flycar.status[i - 1] = true;
			flycar.showCar()
			flycar.main[i - 1] = new FlyCar($("#main"),i);
			//console.log("data"+data.revert)
			setTimeout(function() {
				//console.log(data)
				flycar.main[i - 1].init(data);
				consoles.createDiv();
				$($(".move")[i - 1]).show();
			}, 300)
		}
	})

	$("#footer").on("click",function(e){
		if($(e.target).attr("data-dothing")){
			var thing = $(e.target).closest(".move").attr("data-index"),
				no = $(e.target).attr("data-dothing"),
				data;
			if(no==="go"){
				data=dataDeal.toTwo(thing)+"0001";
				flycar.random(data)
			}else if(no==="stop"){
				data=dataDeal.toTwo(thing)+"0010";
				flycar.random(data)
			}else if(no==="clear"){
				data=dataDeal.toTwo(thing)+"0011";
				flycar.random(data)
				adapter.arr[thing-1][3]=3;
				adapter.showArr();
				$(e.target).closest(".move").hide();
			}	
		}
	})
	
})(window)