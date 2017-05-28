let T = {
	//查找节点
	find: function(selector:string):HTMLElement{
		return <HTMLElement>document.querySelector(selector)
	},
	findAll: function(selector:string, parent?){
		parent = parent || document;
		return parent.querySelectorAll(selector);
	},
	createElemNode:function(name, attr):HTMLElement{
		var elem = document.createElement(name);
		for (var key in attr) {
			elem.setAttribute(key, attr[key])
		}
		return elem;
	}, 
	//生成随机数
	random: function(s:number, e:number):number{
		return Math.floor(Math.random()*(e-s+1))+s;
	},
	//判断二个数组的值是否相等 不进行深度比较
	isEqualArr: function(arr1, arr2){
		let len1 = arr1.length;
		let len2 = arr2.length;
		if (len1 !== len2) return false;
		for (let i = 0; i < len1; i++) {
			if (arr1[i] !== arr2[i]) {
				return false;
			}
		}
		return true;
	}
}
function createModel(row:number, col:number):void {
	var app = T.find("#app");
	for (let i = 0; i < row; i++) {
		let rowElem = T.createElemNode("div", {class:"row"});
		for (let i = 0; i < col; i++) {
			let colElem = T.createElemNode("div", {class:"cell"});
			rowElem.appendChild(colElem);
		}
		app.appendChild(rowElem);		
	}
}
createModel(15, 15);

class Snake{
	snakes:Array<number[]>;
	newSnake:Array<number>;
	row :number;        //蛇头的坐标
	col :number; 
	direction:string;
	interval:any;
	constructor(){
		
		this.direction = "r";
		this.initSnakes()
		this.bindEvent();
	}
	initSnakes(){
		var snakes = this.snakes = [];
		for(let i = 0; i < 3; i++){
			snakes.push([0, i]);
		}
		this.row = 0;
		this.col = 2;
		this.setNewSnake();
		this.updateSnakes();
	}
	start(d):void{
		var snakes = this.snakes;
		clearInterval(this.interval);
		this.interval = setInterval(()=>{
			var head;
			if (d){
				this.direction = d
			} else {
				d = this.direction
			}
			if (d == "r") {
				this.col++;
			} else if (d == "l") {
				this.col--;
			} else if (d == "t") {
				this.row--;
			} else if (d == "d"){
				this.row++;
			}
			head = [this.row, this.col];
			if (!T.isEqualArr(this.newSnake, head)) {
				snakes.shift();
			} else {
				this.setNewSnake()
			}	
			snakes.push([this.row, this.col])
			this.updateSnakes()
		}, 300)
	}
	bindEvent():void{
		enum keys {l=37, t, r, d};
		document.addEventListener("keydown", (e)=>{	
			var v = Math.abs(keys[this.direction] - e.keyCode);
			if (v == 1 || v == 3){
				//this.direction = keys[e.keyCode];
				this.start(keys[e.keyCode])
			} 		
		});
		T.find("#start").addEventListener("click", ()=>{
			this.start();
		});

		T.find("#restart").addEventListener("click", ()=>{
			this.direction = "r";
			this.initSnakes();
			clearInterval(this.interval);
		}
	}
	updateSnakes():void{
		let snakes = this.snakes;
		let len = snakes.length;
		var all = T.findAll(".cell");
		all.forEach(node => {
			node.className = node.className.replace("snake", "")
		})
		for (let i = 0; i < len; i++){
			let r = snakes[i][0];
			let c = snakes[i][1];
			this.setStyle(r, c, "snake")
		}
	}
	setNewSnake():void{
		let passed = false, //新出现的蛇身是否符合要求
			snakes = this.snakes,
			len = snakes.length,
			random = T.random;
		T.findAll(".cell").forEach(node => {
			node.className = node.className.replace("newSnake", "")
		})
		while (!passed) {
			let r = random(0, 14);
			let c = random(0, 14);
			if (snakes.every((snake)=>{
				return !T.isEqualArr(snake, [r, c]);
			})) {
				passed = true     //检查通过,终止循环
				this.newSnake = [r, c];
				this.setStyle(r, c, "newSnake")
			} 
		}
	}
	setStyle(r:number, c:number, className:string):void {
		let row = T.findAll(".row")[r]
		let cell = T.findAll(".cell", row)[c];
		cell.className = cell.className += " "+className;
	}
}
new Snake()
