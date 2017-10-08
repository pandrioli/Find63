window.onload = Main;
var lastLevel;
var gray = "rgb(150,150,150)";
var blue = "rgb(50,50,80)";
var yellow = "rgb(220,220,150)";
var red = "rgb(150,80,80)";
var green = "rgb(120,250,120)";
var keylock;
var fade;

function Main() {
	var back = document.getElementById("back");
	back.onclick = Home;
	keylock = document.createElement("img");
	keylock.src = "img/keylock.png";
	keylock.style.width = "8vh";
	keylock.style.height = "8vh";
	keylock.style.marginTop = "-2vh";
	lastLevel = GetLastLevel();
	FadeIn();
	PutTimes();
	SetColorsAndLinks();
}

function FadeIn() {
	fade = document.createElement("div");
	fade.style.left = "0px";
	fade.style.top = "0px";
	fade.style.zIndex = "10000";
	fade.style.position = "fixed";
	fade.style.backgroundColor = "black";
	fade.style.width = window.innerWidth + "px";
	fade.style.height = window.innerHeight + "px";
	fade.style.pointerEvents = "none";
	document.body.appendChild(fade);
	TweenLite.to(fade, 1, {opacity: 0, ease: Linear.easeNone});
}

function FadeOut() {
	fade.style.zIndex = "10000";
	TweenLite.to(fade, 1, {opacity: 1, ease: Linear.easeNone});
}

function PutTimes() {
	for (var i=1; i<=lastLevel; i++) {
		var timeSpan = document.getElementById("time"+i);
		var time = localStorage.getItem("recordLevel"+i);
		if (time != null) {
			timeSpan.innerHTML = GetTime(parseInt(time));
		}
	}
}

function SetColorsAndLinks() {
	for (var i=1; i<=9; i++) {
		var levelDiv = document.getElementById("level"+i);
		if (i<lastLevel+1) {
			levelDiv.style.background = "linear-gradient("+yellow+",rgba(0,0,0,0))";
			levelDiv.onclick = OpenLevel;
		} else if (i==lastLevel+1) {
			levelDiv.style.background = "linear-gradient("+green+",rgba(0,0,0,0))";			
			levelDiv.onclick = OpenLevel;
		} else {
			levelDiv.style.background = "linear-gradient("+gray+",rgba(0,0,0,0))";
			document.getElementById("time"+i).appendChild(keylock.cloneNode());
		}
		levelDiv.id = "level" + i;
	}
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

function GetTime(elapsed) {
	var cen = elapsed % 10;
	var sec = parseInt(elapsed / 10) % 60; 
	if (sec<10) sec="0"+sec;
	var min = parseInt(elapsed / 10 / 60);
	if (min<10) min="0"+min;
	return min+":"+sec+"."+cen;
}

function OpenLevel() {
	FadeOut();
	var lev = this;
	lev.style.color = "white";
	TweenLite.to(this, 1, {transform: "scale(.9)",onComplete: function(){
		window.location.replace(lev.id + ".html");
	}});
}

function Home() {
	FadeOut();
	setTimeout(function(){
		window.location.replace("index.html");
	}, 1000);
}

