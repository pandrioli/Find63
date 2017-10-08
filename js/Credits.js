window.onload = Main;

var fade;

function Main() {
	FadeIn();
	var back = document.getElementById("back");
	back.onclick = btnClick;
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
	FadeOut(function(){window.location.replace("index.html")});
}