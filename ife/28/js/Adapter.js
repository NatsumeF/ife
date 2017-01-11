"use strict";

var adapter = {
	main: document.getElementsByTagName("tbody")[0],
	arr: ["", "", "", ""],
	showArr: function() {
		var html = "";
		var me = this;
		this.arr.forEach(function(item, index) {
			if (item) {
				html += "<tr><td>" + item[0] + "号</td><td>" +
					me.showSpeed(item[1]) + "</td><td>" +
					me.showRevert(item[2]) + "</td><td>"+
					me.showCond(item[3])+"</td><td>"+
					item[4]+"%</td></tr>";
			}
		});
		this.main.innerHTML = html;
	},
	pushArr: function(data) {
		//var data1=
		var data = dataDeal.deal(data);
			var id = data.id,
			cond = data.cond,
			energy = data.energy;
		this.arr[id - 1].push(cond, energy);
		//console.log(this.arr)
		this.showArr();
	},
	deleteArr: function(i) {
		this.arr[i] = "";
	},
	showSpeed: function(i) {
		if (i === 5) {
			return "普通飞船";
		} else if (i === 7) {
			return "双发动机";
		} else {
			return "推进装置";
		}
	},
	showRevert: function(i) {
		if (i === 2) {
			return "机械能";
		} else if (i === 4) {
			return "光能";
		} else {
			return "组合能"
		}
	},
	showCond:function(i){
		if(i===1){
			return "运行中";
		}else if(i===2){
			return "停止";
		}else{
			return "准备摧毁"
		}
	}
}