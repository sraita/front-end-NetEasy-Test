/*
 *首页幻灯展示 
 * */
window.onload = function(){
	var banner = document.getElementsByClassName("banner")[0];
	var bannerList = banner.getElementsByTagName("li");
	
	var point = document.getElementsByClassName("point")[0];
	var pointList = point.getElementsByTagName("i");
	for (var i=0;i<bannerList.length;i++){
		pointList[i].index = i;
		pointList[i].onmouseover = function(){
			for (var i=0;i<bannerList.length;i++){
				pointList[i].className = "";
				bannerList[i].className = "";
			}
			this.className = "current";
			bannerList[this.index].className = "current";
		}
	}
}
