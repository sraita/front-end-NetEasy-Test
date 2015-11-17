/*
	表单验证
	type,验证类型: email,password等
*/
function validate(str,type){
	var success = false; // 验证通过与否标志
	var username = new RegExp("^[^!@#$%\^&\*]{6,12}$"); // 用户名检测,字符长度为6-12,包含数字、字母、下划线
	var password = new RegExp("^[^!@#$%\^&\*]{6,12}$"); // 用户密码检测，长度为6-12,包含数字、字母、下划线
	switch(type){
		case "username":
			success = username.test(str);
			break;
		case "password":
			success = password.test(str);
			break;
		default:
			success = false;
			break;
	}

	return success;
}
