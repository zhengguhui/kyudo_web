function playVideo(value){
	console.log(value);
	console.log(value.src);
	document.getElementById("myvideo").src = value.src;
	//$("#myvideo").src = value.src;
	$("#myvideo").load();
}