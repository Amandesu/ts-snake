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
	constructor(){
		var snakes = this.snakes = [];
		for(let i = 0; i < 3; i++){
			snakes.push([0, i]);
		}
		this.updateSnakes();
		this.setNewSnake();
		this.bindEvent();
		//this.start("r");
	}
	start(d){
		var row = 0;       //初始的蛇头坐标;
		var col = 2;
		var snakes = this.snakes;
		setInterval(()=>{
			if (d == "r") {
				col++;
			} else if (d == "l") {
				col--;
			} else if (d == "t") {
				row--;
			} else {
				row++;
			}
			snakes.shift();
			snakes.push([row, col])
			this.updateSnakes()
		}, 300)
	}
	bindEvent(){
		enum keys {l=37, t, r, d};
		document.addEventListener("keydown", (e)=>{
			this.start(keys[e.keyCode])
		})
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
