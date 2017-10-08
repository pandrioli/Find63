window.onload = Main;
var level;
var tiles = [];
var columns = 7;
var rows = 9;
var tileSize; 
var lastTile = 0;
var checkpoint = 0;
var checktime = 0;
var checkInterval;
var checkDuration;
var win = false;
var deltaY;
var Uarrow;
var Darrow;
var Rarrow;
var Larrow;
var timebar;
var timebarEmpty;
var chkTimer;
var crono;
var timer;	
var elapsedTime = 0;
var timerTuto;
var tuto;
var gray = "rgb(150,150,150)";
var blue = "rgb(50,50,80)";
var yellow = "rgb(220,220,150)";
var red = "rgb(150,80,80)";
var green = "rgb(120,250,120)";
var fade;
var cleared = false;


function Main() {
		var screenW = 320;
		var screenH = 480;
		var screenW = window.innerWidth;
		var screenH = window.innerHeight;
		level = parseInt(document.getElementById("level").innerHTML);
		checkInterval = parseInt(document.getElementById("checkInterval").innerHTML);
		checkDuration = parseInt(document.getElementById("checkDuration").innerHTML);
		tileSize = Math.floor((screenW*.95)/columns);
		deltaX = screenW * .025;
		deltaY = (screenH - tileSize*(rows+1))/2;
		DrawHeader();
		DrawGrid();
		DrawTuto();
		Uarrow = NewArrow("Uarrow");
		Darrow = NewArrow("Darrow");
		Rarrow = NewArrow("Rarrow");
		Larrow = NewArrow("Larrow");
		GeneratePath();
		UpdateCheckpoint();
		FadeIn();
	//	WinGame();
	//	ShowEnd();
}

function FadeIn() {
	fade = document.createElement("div");
	fade.style.position = "fixed";
	fade.style.backgroundColor = "black";
	fade.style.width = window.innerWidth + "px";
	fade.style.height = window.innerHeight + "px";
	fade.style.pointerEvents = "none";
	document.body.appendChild(fade);
	TweenLite.to(fade, 1, {opacity: 0, ease: Linear.easeNone, onComplete: Start});
}

function FadeOut() {
	fade.style.zIndex = "10000";
	TweenLite.to(fade, 1, {opacity: 1, ease: Linear.easeNone, onComplete: Exit});
}

function Start() {
	timer = setInterval(UpdateTime, 100);	
	//if (level == 0) timerTuto = setInterval(Tutorial, 100);
	TouchTile(tiles[lastTile]);
	TurnOn(tiles[lastTile]);
}

function GeneratePath() {
		var pathword = document.getElementById("path").innerHTML;
		var path = pathword.split("");
		var start = document.getElementById("start").innerHTML.split(",");
		var x = parseInt(start[0]);
		var y = parseInt(start[1]);
		for (var i=0; i<path.length+1; i++) {
			var tile = NewTile();
			tile.innerHTML = i+1;
			tile.style.left = x * tileSize + deltaX + "px";
			tile.style.top = (y+1) * tileSize + deltaY + "px";
			tile.style.opacity = "0";
			tile.addEventListener("click", TouchTile);
			tiles[i] = tile;
			switch (path[i]) {
				case "R":
					x += 1;
					break;
				case "L":
					x -= 1;
					break;
				case "D":
					y += 1;
					break;
				case "U":
					y -= 1;
					break;
			}
		}
}

function DrawHeader() {
	var lev = NewTile();
	lev.style.color = "white";
	lev.style.backgroundColor = red;
	lev.style.left = deltaX + tileSize + "px";
	lev.style.top = deltaY + "px";
	lev.style.width = 1.5 * tileSize + "px";
	lev.style.fontSize = tileSize * 0.4 + "px";
	if (level == 0) lev.innerHTML = "Tutorial"; 
	else lev.innerHTML = "Niv. " + level;
	var timeFrame = lev.cloneNode();
	timeFrame.innerHTML = "";
	timeFrame.style.left = deltaX + tileSize * 2.5 + "px";
	timeFrame.style.width = tileSize * 3 + "px";
	timeFrame.style.backgroundColor = gray;
	timeFrame.style.lineHeight = tileSize / 2 + "px";
	document.body.appendChild(timeFrame);
	timebarEmpty = document.createElement("div");
	timebarEmpty.style.backgroundColor = "black";
	timebarEmpty.style.position = "fixed";
	timebarEmpty.style.top = deltaY + tileSize * .25 + "px";
	timebarEmpty.style.left = deltaX + tileSize * 2.75 + "px";
	timebarEmpty.style.width = tileSize * 2.5 + "px";
	timebarEmpty.style.height = tileSize / 2 + "px";
	timebarEmpty.style.boxShadow = "0px 0px 1vh "+gray+" inset";
	document.body.appendChild(timebarEmpty);
	timebar = timebarEmpty.cloneNode();
	timebar.style.width = "0px";
	timebar.style.backgroundColor = green;
	document.body.appendChild(timebar);
	crono = lev.cloneNode();
	crono.innerHTML = "";
	crono.style.left = deltaX + tileSize * 5.5 + "px";
	document.body.appendChild(crono);
	var close = crono.cloneNode();
	close.style.width = tileSize + "px";
	close.style.left = deltaX + "px";
	close.innerHTML = "<img src='img/Larrow.png' style='width: "+tileSize+"px'>";
	close.addEventListener("click", FadeOut)
	document.body.appendChild(close);
}

function DrawTuto() {
	tuto = document.createElement("div");
	tuto.style.position = "fixed";
	tuto.style.top = "25vh";
	tuto.style.left = "0";
	tuto.style.width = "84vw";
	tuto.style.pointerEvents = "none";
	tuto.style.color = "white";
	tuto.style.fontSize = "3.5vh";
	tuto.style.textAlign = "center";
	tuto.style.padding = "8vw";
	document.body.appendChild(tuto);	
}

function DrawGrid() {
	for (var x=0; x < columns; x++) {
		for (var y=0; y < rows; y++) {
			var tile = NewTile();
			tile.style.background = "none";
			tile.style.backgroundColor = blue;
			tile.style.left = (x * tileSize) + deltaX + "px";
			tile.style.top = ((y+1) * tileSize) + deltaY + "px";
			tile.style.opacity = "1";
			tile.onclick = ClearTiles;
			if (x==1 && y==1) tile.id = "frame1";
			if (x==1 && y==5) tile.id = "frame2";
		}
	}
}


function NewTile() {
	var tile = document.createElement("div");
	tile.style.backgroundColor = yellow;
	tile.style.borderRadius = "2vh";
	tile.style.boxShadow = "0px 0px 5px black inset";
	tile.style.position = "fixed";
	tile.style.width = tileSize + "px";
	tile.style.height = tileSize + "px";
	//tile.style.borderRadius = (tileSize * .2) + "px";
	tile.style.lineHeight = tileSize + "px";
	tile.style.color = "black";
	tile.style.fontSize = tileSize * 0.6 + "px";
	//tile.style.textShadow = "0px 0px 10px black";
	tile.style.textAlign = "center";
	tile.style.cursor = "default";
	tile.style.userSelect = "none";
	document.body.appendChild(tile);
	return tile;
}

function TouchTile() {
	var tile;
	var xy1 = GetCoords(this);
	var xy2 = GetCoords(tiles[lastTile]);
	if (level==0) Tutorial();
	if (((xy1[0] == xy2[0] + 1 || xy1[0] == xy2[0] - 1) && xy1[1] == xy2[1]) || 
		((xy1[1] == xy2[1] + 1 || xy1[1] == xy2[1] - 1) && xy1[0] == xy2[0])){
		for (var i=0; i<tiles.length; i++) {
			if (tiles[i] == this) tile = i;
		}
		if (tile > 0 && tiles[tile].style.opacity=="0") { 
			var op = parseFloat(tiles[tile-1].style.opacity);
			if (op > 0) {
				lastTile=Math.max(lastTile,tile);
				if (lastTile % checkInterval == 0) {
					TweenLite.to(tiles[CheckPointPos(checkpoint)], 1, {backgroundColor: yellow});
					checkpoint=lastTile / checkInterval;
					UpdateCheckpoint();
				}
				if (lastTile == tiles.length - 1) WinGame();
				TurnOn(tiles[tile]); 
			} else {
					ClearTiles();
			}
		}
	}
}

function CheckPointPos(chk) {
	return chk * checkInterval;
}

function UpdateCheckpoint() {
	clearInterval(chkTimer);
	tiles[CheckPointPos(checkpoint)].style.backgroundColor = green;
	var checkzone = Math.floor(lastTile / checkInterval);
	checktime = checkDuration * 10;
	UpdateTimeBar();
	if (checkpoint>0 && checkpoint == checkzone) {
		chkTimer = setInterval(UpdateTimeBar, 100);
	}
}

function GetTime(elapsed) {
	var cen = elapsed % 10;
	var sec = parseInt(elapsed / 10) % 60; 
	if (sec<10) sec="0"+sec;
	var min = parseInt(elapsed / 10 / 60);
	if (min<10) min="0"+min;
	return min+":"+sec+"."+cen;
}


function UpdateTime() {
	elapsedTime++;
	crono.innerHTML = GetTime(elapsedTime);
}

function UpdateTimeBar() {
	timebar.style.width = Math.floor(checktime / checkDuration * timebarEmpty.offsetWidth / 10) + "px";
	var chkPercent = checktime / checkDuration * 10;
	if (chkPercent>=50) timebar.style.backgroundColor = green;
	if (chkPercent<50) timebar.style.backgroundColor = yellow;
	if (chkPercent<25) timebar.style.backgroundColor = red;
	checktime--;
	if (checktime==0) {
		clearInterval(chkTimer);
		TweenLite.to(tiles[CheckPointPos(checkpoint)], 1, {backgroundColor: yellow});
		checkpoint = Math.max(checkpoint - 1, 0);
		UpdateCheckpoint();
		TurnOn(tiles[CheckPointPos(checkpoint)]);
	}
}

function TurnOn(e) {	
	MoveArrows(tiles[lastTile]);
	//TweenLite.to(e, 1, {opacity: "1"});
	e.style.opacity="1";
	Zoom(e);
}

function Zoom(e) {
	var ezoom = e.cloneNode();
	ezoom.style.pointerEvents="none";
	ezoom.style.opacity="1";
	ezoom.id = "zoom";
	document.body.appendChild(ezoom);
	TweenLite.to(ezoom, .5, {transform: "scale(3)"});
	TweenLite.to(ezoom, .75, {opacity: "0", onComplete:this.removeChild});
}

function ClearTiles() {
	cleared = true;
	if (win) return;
	var start = CheckPointPos(checkpoint);
	var checkzone = Math.floor(lastTile / checkInterval);
	lastTile = start;
	if (checkzone > checkpoint) UpdateCheckpoint();
	Zoom(tiles[start]);
	MoveArrows(tiles[start]);
	for (var i=start+1; i<tiles.length; i++) {
		//tiles[i].style.opacity="0";
		TweenLite.to(tiles[i], .5, {opacity: "0"});
	}
}

function GetCoords(tile) {
	var x = Math.round((tile.offsetLeft - deltaX) / tileSize);
	var y = Math.round((tile.offsetTop - deltaY - tileSize) / tileSize);	
	return [x, y];
}


function NewArrow(arrow) {
	var arr = document.createElement("img");
	arr.src = "img/" + arrow + ".png";
	arr.style.position = "fixed";
	arr.style.width = tileSize + "px";
	arr.style.height = tileSize + "px";
	arr.style.pointerEvents = "none";
	arr.style.userSelect = "none";
	arr.style.display = "none";
	arr.id = arrow;
	document.body.appendChild(arr);
	return arr;
}

function MoveArrows(tile) {
	if (win) return;
	Uarrow.style.display = "block";
	Uarrow.style.left = tile.offsetLeft + "px";
	Uarrow.style.top =  (tile.offsetTop - tileSize) + "px";
	Darrow.style.display = "block";
	Darrow.style.left = tile.offsetLeft + "px";
	Darrow.style.top = (tile.offsetTop + tileSize) + "px";
	Rarrow.style.display = "block";
	Rarrow.style.left = (tile.offsetLeft + tileSize) + "px";
	Rarrow.style.top = tile.offsetTop + "px";
	Larrow.style.display = "block";
	Larrow.style.left = (tile.offsetLeft - tileSize) + "px";
	Larrow.style.top = tile.offsetTop + "px";
	var coords = GetCoords(tile);
	var x = coords[0];
	var y = coords[1];	
	if (x==0) Larrow.style.display = "none";
	if (y==0) Uarrow.style.display = "none";
	if (x==columns-1) Rarrow.style.display = "none";
	if (y==rows-1) Darrow.style.display = "none";
}

function GetLastLevel() {
	lastlev = localStorage.getItem("lastLevel");
	if (lastlev == null) {
		lastlev = "0";
		localStorage.setItem("lastLevel", lastlev)
	}
	lastlev = parseInt(lastlev);
	return lastlev;
}

function WinGame() {
	if (win) return;
	win = true;
	Uarrow.style.display = "none";
	Darrow.style.display = "none";
	Rarrow.style.display = "none";
	Larrow.style.display = "none";
	timebar.style.display = "none";
	clearInterval(chkTimer);
	clearInterval(timer);
	var lastLevel = GetLastLevel();
	if (level>lastLevel) localStorage.setItem("lastLevel", level);
	var timer2 = setInterval(lights, 1000/30);
	var l = 0;
	function lights() {
		tiles[l].style.display = "none";
		l++;
		if (l == tiles.length) {
			clearInterval(timer2);
			if (level==0) FadeOut(); else ShowTimeFrames();
		}
	}
}

function ShowTimeFrames() {
	var tile1 = document.getElementById("frame1");
	tile1.style.zIndex = "1000";
	var tile2 = document.getElementById("frame2");
	tile2.style.zIndex = "1000";
	var width = tileSize * 5 + "px";
	var height = tileSize * 3 + "px";
	TweenLite.to(tile1, 1, {width: width, height: height, backgroundColor: gray, onComplete: ShowTime});
	TweenLite.to(tile2, 1, {width: width, height: height, backgroundColor: gray});
}

function ShowTime() {
	var tile1 = document.getElementById("frame1");
	var tile2 = document.getElementById("frame2");
	var txt1 = document.createElement("div");
	tile1.style.fontSize = tileSize * .5 + "px";
	tile2.style.fontSize = tileSize * .5 + "px";
	txt1.style.marginTop = tileSize * .3 + "px";
	txt1.style.color = "white";
	txt1.style.fontSize = tileSize * .9 + "px";
	var record = localStorage.getItem("recordLevel"+level);
	if (record == null) txt1.innerHTML = "ninguno"; else txt1.innerHTML = GetTime(record);
	if (record == null) record = "10000";
	record = parseInt(record);
	var txt2 = txt1.cloneNode();
	if (elapsedTime >= record) { 
		tile1.innerHTML = "mejor tiempo";
		tile2.innerHTML = "tu tiempo";
		txt2.innerHTML = GetTime(elapsedTime);
	} else {
		localStorage.setItem("recordLevel"+level, elapsedTime);
		tile1.innerHTML = "record previo"
		tile2.innerHTML = "nuevo record"
		txt2.style.color = green;
		txt2.innerHTML = GetTime(elapsedTime);
	}
	tile1.appendChild(txt1);
	tile2.appendChild(txt2);
	setTimeout(FadeOut, 4000);
}

function Tutorial() {
	if (lastTile==0 && !cleared) ShowTuto("Toca las casillas con flechas para ir descubriendo el recorrido de un total de 63 números");
	if (lastTile==2) ShowTuto("Si te equivocas vuelves a la casilla verde (checkpoint) ¡Memoriza los errores!");
	if (lastTile==5) ShowTuto("La barra superior indica la duración del checkpoint al que has llegado, terminado el tiempo vuelve al checkpoint anterior.");
	if (lastTile==14) ShowTuto("En la esquina superior derecha está el cronómetro de la partida.");
	if (lastTile==20) ShowTuto("El juego guarda el mejor tiempo de cada uno de los niveles ¡Intenta mejorarlos!");
	if (lastTile==25) ShowTuto("Fin del tutorial");
}

function ShowTuto(txt) {
	if (tuto.innerHTML == txt) return;
	TweenLite.to(tuto, 0.5, {opacity: 0, onComplete: ChangeText});
	function ChangeText(){
		tuto.innerHTML = txt;
		TweenLite.to(tuto, .5, {opacity: 1});
	}
}


function Exit() {
	if (level==0) 
		window.location.replace("index.html");
	else 
		window.location.replace("levels.html");
}


