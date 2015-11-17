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