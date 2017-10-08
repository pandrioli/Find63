window.onload = Main;

var fade;
var gray = "rgb(150,150,150)";
var blue = "rgb(50,50,80)";
var yellow = "rgb(220,220,150)";
var red = "rgb(150,80,80)";
var green = "rgb(120,250,120)";

function Main() {
	FadeIn();
	var btn1 = document.getElementById("btn1");
	var btn2 = document.getElementById("btn2");
	var btn3 = document.getElementById("btn3");
	btn1.addEventListener("click", btnClick);
	btn2.addEventListener("click", btnClick);
	btn3.addEventListener("click", btnClick);
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

function FadeOut(fnc) {
	fade.style.zIndex = "10000";
	TweenLite.to(fade, 1, {opacity: 1, ease: Linear.easeNone, onComplete: fnc});
}

function btnClick() {
	this.style.background = "linear-gradient("+yellow+",rgba(0,0,0,0))";
	this.style.color = "white";
	TweenLite.to(this, 1, {transform: "scale(.9)"});
	switch(this.id) {
		case "btn1":
			FadeOut(function(){window.location.replace("levels.html")});
			break;
		case "btn2":
			FadeOut(function(){window.location.replace("tutorial.html")});
			break;
		case "btn3":
			FadeOut(function(){window.location.replace("credits.html")});
			break;
	}
}