/*通过id,className,TagName获取元素*/
function $(str,element){  //str格式为#id,.className,tarName
	var children;
	var elements = [];
	if(str.charAt(0)=="#"){ //如果str第一个字符为#,返回id选择器
		var id = str.slice(1);
		return (element||document).getElementById(id);
	} else if(str.charAt(0) == "."){ //如果str第一个字符为".",返回class选择器
		var className = str.slice(1);
		children = (element||document).getElementsByTagName('*');
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			var classNames = child.className.split(" ");
			for (var j = 0; j < classNames.length; j++) {
				if(classNames[j] == className){
					elements.push(child);
					break;
				}
			}
		}
		return elements;
	} else { // 否则返回TagName选择器
		var tagName = str;
		children = (element||document).getElementsByTagName(str);
		console.log(children);
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			console.log(child);
			elements.push(child);
		}
		return elements;
	}
}

/*element.dataset兼容*/
if(typeof HTMLElement!=="undefined" && !Object.getOwnPropertyDescriptor(HTMLElement.prototype,"dataset")){
    //在HTMLElement.prototype上定义访问器属性dataset
    Object.defineProperty(HTMLElement.prototype,"dataset", {
        get: function(){
        //获取元素所有属性
        var attrs = this.attributes;
        var result = {};
        for(var i=0;i<attrs.length;i++){
            var attriName = attrs[i].nodeName;
            //判断属性名是否以"data-"开头
            if(/^data-/.test(attriName)){
                //先去掉属性名开头的"data-".然后，若属性名有"-",则改成驼峰写法。比如，account-name改成accountName.
                attriName = attriName.slice(5).replace(/-./g,function(m0){
                    return m0.slice(1).toUpperCase();
                });
                result[attriName] = attrs[i].value;
            }
        }
        return result;
    }});
}

/*事件处理*/
var EventUtil = {
	addHandler: function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type, handler ,false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	getEvent: function(event){
		return event?event:window.event;
	},
	getTarget: function(event){
		return event.target || event.srcElement;
	},
	preventDefault: function(event){
		if(event.preventDefault){
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	removeHandler: function(){
		if(element.removeEventListener){
			element.removeEventListener(type, handler ,false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},
	stopPropagation: function(event) {
		if(event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
}


/*AJAX封装*/

var aj=new Object();
aj.request = function(){
    if(window.XMLHttpRequest) {
        var ajax = new XMLHttpRequest();
    }else if (window.ActiveXObject) { 
        try {
            var ajax = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                    var ajax = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
        }
    }
    if (!ajax) { 
            window.alert("不能创建XMLHttpRequest对象<SPAN class=hilite2>实例</SPAN>.");
            return false;
    }
        return ajax;
}
aj.req=aj.request();
aj.Handle=function(callback){
    aj.req.onreadystatechange=function(){
        if(aj.req.readyState==4){
            if(aj.req.status==200){
                callback(aj.req.responseText);
            }
        }
    }
}
aj.cl=function(o){
    if(typeof(o)=='object'){
        var str='';
        for(a in o){
            
            str+=a+'='+o[a]+'&';
        }
        str=str.substr(0,str.length-1);
        return str;
    }else{
        return o;
    }
}
aj.get=function(url,callback){
    aj.req.open('get',url,true);
    aj.req.send(null);
    aj.Handle(callback);
}
aj.post=function(url,content,callback){
    aj.req.open('post',url,true);
    aj.req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    content=aj.cl(content);
    aj.req.send(content);
    aj.Handle(callback);
}


/*cookie 相关函数*/
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
}

function setCookie(c_name,value,expiredays)
{
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function checkCookie()
{
username=getCookie('username')
if (username!=null && username!="")
  {alert('Welcome again '+username+'!')}
else 
  {
  username=prompt('Please enter your name:',"")
  if (username!=null && username!="")
    {
    setCookie('username',username,365)
    }
  }
}


/*dialog*/
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
			 smsImg.setAttribute("src","images/loading.gif");
			break;
			case "success":
			smsImg.setAttribute("src", "images/success.png");
			break;
			case "error":
			smsImg.setAttribute("src", "images/error.png");
			break;
			case "info":
			default:
			smsImg.setAttribute("src", "images/info.png");
			break;
		}
		
		body.appendChild(sms);
		sms.appendChild(smsContent);
		smsContent.appendChild(smsImg);
		if(autoClose){
			setTimeout(function(){
				var smsNode = document.getElementById("tips-messager");
			
				body.removeChild(smsNode);
			
			},showTime||this.showTime);
		}
	}
	
}