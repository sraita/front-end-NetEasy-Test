
/*登录 */

function doLogin(event){
	
	var loginForm = document.forms[0];
	var username = loginForm.children[0].value;
	var password = loginForm.children[1].value;
	var url = "http://study.163.com/webDev/login.htm?userName="+username+"&password="+MD5(password);
	
	if(verify(username)&&verify(password)){
		aj.get(url,function(data){
			if(data == 1){
				setCookie("loginSuc",1,7);
				setCookie("followSuc",1,7);
				document.getElementById("follow").setAttribute("class","follow");
				document.getElementById("mask").style.display = "none";
				document.getElementById("login").style.display = "none";
				dialog.Messager("success","登录成功!",3000);
			} else {
				dialog.Messager("error","登录失败!",1000);
			}
		})
	} else {
		alert("用户名或密码不得为空");
	}
}
/*
 * 登录检查
 * @param ele 验证对象
 * @return boolean:success
 * */
function verify(str){
	var success = false; // 定义验证结果标识
	if(str!= ""){
		success = true;
	}
	return success; // 返回验证结果，true为验证成功
}
/*关注*/
/*function setView(that){
	var url = "http://127.0.0.1:8020/NetEasyEDU/test/attention.htm";
	if(getCookie("loginSuc") ==1){ //登录成功
		aj.get(url,function(data){// 获取关注状态
			var data = eval('(' + data + ')');
			if(data == 1){
				that.setAttribute("class","view")
			}
		})
	} else {
		document.getElementById("mask").style.display = "block";
		document.getElementById("login").style.display = "block";
	}
}*/

/*关闭*/
function closeLayout(that){
	var mask = document.getElementById("mask");
	var videoLayout = document.getElementById("videoLayout");
	mask.style.display = "none";
	that.parentElement.style.display = "none";
}
/*
 * 组装课程数据 
 * */
function getCourse(pageNo,type){
	// 获取当前页
	/*var page = document.getElementById("page");
	var pageNo = page.getElementsByClassName("current")[0].innerHTML;
	var prevPage = page.getElementsByClassName("prev")[0];
	var nextPage = page.getElementsByClassName("next")[0];
	prevPage.addEventListener('click',function(){
		pageNo+=1;
	});
	nextPage.addEventListener('click',function(){
		if(pageNo>1){
			pageNo-=1;
		} else {
			pageNo = 1;
		}
	});*/
	var	psize = 16;
	var url = "http://study.163.com/webDev/couresByCategory.htm?pageNo="+pageNo+"&psize="+psize+"&type="+type;

	var courseContent = document.getElementById("tab-content").children[0];
	var productContent = document.getElementById("tab-content").children[1];
	aj.get(url,function(data){
		//清空容器
  		while(courseContent.hasChildNodes()){
  			courseContent.removeChild(courseContent.firstChild);
  		}
  		while(productContent.hasChildNodes()){
  			productContent.removeChild(productContent.firstChild);
  		}
		var data = eval('(' + data + ')');
  		for(var i=0;i<data["list"].length;i++){
  			//创建element
			var course = document.createElement("li");
			if(data["list"][i].price ==0){
				data["list"][i].price ="免费";
			} else {
				data["list"][i].price = "￥ "+data["list"][i].price;
			}
			course.setAttribute("data-name",data["list"][i].name);
			course.setAttribute("data-middle-photo-url",data["list"][i].middlePhotoUrl);
			course.setAttribute("data-name",data["list"][i].name);
			course.setAttribute("data-provider",data["list"][i].provider);
			course.setAttribute("data-learner-count",data["list"][i].learnerCount);
			course.setAttribute("data-description",data["list"][i].description);
			course.setAttribute("data-category-name",data["list"][i].categoryName);
			course.innerHTML=
					'<img src="'+data["list"][i].bigPhotoUrl+'" alt=""/>'+
					'<h3>'+data["list"][i].name+'</h3>'+
					'<p>'+data["list"][i].provider+'</p>'+			
					'<p class="num"><i></i>'+data["list"][i].learnerCount+'</p>'+			
					'<p class="price">'+data["list"][i].price+'</p>';
			if(type == 10){
				courseContent.appendChild(course);
			} else {
				productContent.appendChild(course);
			}
  		}
  		listDis();
  		// 加载hot课程
  		getHotCourse();
  		
	});
	
}
/*
 * 获得热门推荐课程
 * */
function getHotCourse(){
	
	var url = "http://study.163.com/webDev/hotcouresByCategory.htm";
	// 获得容器
	var content = document.getElementById("hot-list");
		aj.get(url,function(data){
			var data = eval('(' + data + ')');
			var index = 10;
	  		do{
				content.removeChild(content.firstChild);
				// 创建节点
				var course = document.createElement("li");
				course.innerHTML=
					'<img src="'+data[index].smallPhotoUrl+'"/>'+
					'<h3>'+data[index].name+'</h3>'+
					'<span><i></i>'+data[index].learnerCount+'</span>';
				// 添加节点
				content.appendChild(course);
				index++;
			} while(content.childNodes.length>9);
			listDis();
			if(content.childNodes.length<9){
				for(var i=0;i<10;i++){
					// 创建节点
					var course = document.createElement("li");
					course.innerHTML=
						'<img src="'+data[i].smallPhotoUrl+'"/>'+
						'<h3>'+data[i].name+'</h3>'+
						'<span><i></i>'+data[i].learnerCount+'</span>';
					// 添加节点
					content.appendChild(course);
					
				}
				
			}
	  });
}


