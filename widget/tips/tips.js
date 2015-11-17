var dialog = {
	showTime :5000, //提示框默认展示时间5s
	
	Messager: function(type,content,showTime){
		var autoClose = true;
		var body = document.getElementsByTagName("body")[0];
		var sms = document.createElement("div");
		if(document.getElementById("tips-messager")){
			body.removeChild(document.getElementById("tips-messager"));
		}
		sms.setAttribute("id","tips-messager");
		var smsContent = document.createElement("p");
		smsContent.innerHTML = content;
		smsImg = document.createElement("img");
		switch(type){
			case "loading":
			 autoClose = false;
			smsImg.setAttribute("src","loading.gif");
			break;
			case "success":
			smsImg.setAttribute("src", "success.png");
			break;
			case "error":
			smsImg.setAttribute("src", "error.png");
			break;
			case "info":
			default:
			smsImg.setAttribute("src", "info.png");
			break;
		}
		
		body.appendChild(sms);
		sms.appendChild(smsContent);
		smsContent.appendChild(smsImg);
		if(!autoClose){
			setTimeout(function(){
				var smsNode = document.getElementById("tips-messager");
			
				smsNode.parentNode.removeChild(smsNode);
			
			},showTime||this.showTime);
		}
	},
	alert: function(title,type,content,fn){
		var mask = document.createElement("div");
		mask.setAttribute("id","mask");
		body.appendChild(mask);

		var maskNode = document.getElementById("mask");
		maskNode.parentNode.removeChild(maskNode);
	},
	prompt: function(title,content,fn){

	},
	confirm: function(title,content,fn){

	},
	window : function(url,content,fn){

	}
}