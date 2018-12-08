//=====================================================
var emailReg = /^\w{5,18}@\w{2,10}(\.[a-z]{2,3}){1,3}$/;//邮箱
var phonehaoReg = /^1[34578][0-9]{9}$/;//手机
var  nichengReg =  /^[a-zA-Z\d\_\u2E80-\u9FFF]{4,16}$/; //昵称  4-16位字符
var  mimaReg =/^(?![^a-zA-Z]+$)(?!\D+$)[0-9a-zA-Z]{6,12}$/ ;//密码 6-12字母加数字
var  mimaReg2 =/^(?![^a-zA-Z]+$)(?!\D+$)[0-9a-zA-Z]{6,12}$/ ;//密码 6-12字母加数字
var  checkcodeReg =/^\d{6}$/  ;//验证码
var zhaohuimyobj;
var zhucemyobj;
var dlmyobj ;
var ugg;
var mimaobj;
var aaad=0;
var aaads=0;

$('#login_btn').click(function(){
	userLogin();
});

$('#user_register_btn').click(function(){
	userRegister();
});

$('#user_register_getCode').click(function(){
	sendVcode();
});

function userLogin(){
	var user_login_tel = $('#user_login_tel').val();
	var user_login_password = $('#user_login_password').val();
	var user_login_utype = $('#user_login_utype').val();
	if(null == user_login_tel || "" == user_login_tel){
		$('#user_login_error').html("<font color='red'>" +"请输入手机号！"+ "</font>");
		return;
	}
	if(null == user_login_password || "" == user_login_password){
		$('#user_login_error').html("<font color='red'>" +"请输入密码！"+ "</font>");
		return;
	}
	
	if(!phonehaoReg.test(user_login_tel)){
		$('#user_login_error').html("<font color='red'>" +"手机号格式错误！"+ "</font>");
		return;
	}
	
	$.ajax({
     	type :"post" ,
     	url :"/qiji/users/login",
     	data :{
     		utel : user_login_tel,
     		upwd : user_login_password,
     		utype : user_login_utype
     	},
     	dataType: "json" ,
     	async :true ,
     	success: function(data) {
     		if(data.operSucc && data.succ){
     			myStorage.setItem("uid",data.obj.uid);
     			myStorage.setItem("utel",data.obj.utel);
     			myStorage.setItem("upwd",user_login_password);
     			myStorage.setItem("nickname",data.obj.nickname);
     			myStorage.setItem("utype",data.obj.utype);
     			myStorage.setItem("logourl",data.obj.logourl);
     			myStorage.setItem("status",data.obj.status);
     			myStorage.setItem("isLogin","1");
     			
     			
     			//div切换
//     			$('#user_login_before').hide();
//     			$('#userlogina').hide();
//     			$('#user_login_after_tel').html(data.obj.utel);
//     			$('#user_login_after').show();
     			//div切换

     			$('#user_login_after_tel').html(data.obj.utel);
     			$('.userCenter-tab').hide();
     			$('.loginBox').hide();
     			$('.login-userMsg').show();
     		}else{
     			$('#user_login_error').html("<font color='red'>" +data.message+ "</font>");
     		}
     	},
        error: function(data) {
        	$('#user_login_error').html("<font color='red'>" +"系统错误！"+ "</font>");
       }
	});
	
}

function userRegister(){
	var user_register_tel = $('#user_register_tel').val();
	var user_register_code = $('#user_register_code').val();
	var user_register_password = $('#user_register_password').val();
	var user_register_utype = $('#user_register_utype').val();

	if(null == user_register_tel || "" == user_register_tel){
		$('#user_register_error').html("<font color='red'>" +"请输入手机号！"+ "</font>");
		return;
	}
	
	if(null == user_register_code || "" == user_register_code){
		$('#user_register_error').html("<font color='red'>" +"请输入验证码！"+ "</font>");
		return;
	}
	if(null == user_register_password || "" == user_register_password){
		$('#user_register_error').html("<font color='red'>" +"请输入密码！"+ "</font>");
		return;
	}
	
	if(!phonehaoReg.test(user_register_tel)){
		$('#user_register_error').html("<font color='red'>" +"手机号格式错误！"+ "</font>");
		return;
	}
	if(!$('#user_register_remind').attr('checked')){
		$('#user_register_error').html("<font color='red'>" +"请先认真阅读并接受用户协议！"+ "</font>");
		return;
	}
	$.ajax({
     	type :"post" ,
     	url :"/qiji/users/register",
     	data :{
     		utel : user_register_tel,
     		vcode: user_register_code,
     		upwd : user_register_password,
     		utype : user_register_utype
     	},
     	dataType: "json" ,
     	async :true ,
     	success: function(data) {
     		if(data.operSucc && data.succ){
     			myStorage.setItem("uid",data.obj.uid);
     			myStorage.setItem("utel",data.obj.utel);
     			myStorage.setItem("upwd",user_register_password);
     			myStorage.setItem("nickname",data.obj.nickname);
     			myStorage.setItem("utype",data.obj.utype);
     			myStorage.setItem("logourl",data.obj.logourl);
     			myStorage.setItem("status",data.obj.status);
     			myStorage.setItem("isLogin","1");
     			
     			
     			window.location.href="/qiji/index.html";
     		}else{
     			$('#user_register_error').html("<font color='red'>" +data.message+ "</font>");
     		}
     	},
        error: function(data) {
        	$('#user_register_error').html("<font color='red'>" +"系统错误！"+ "</font>");
       }
	});
	
}

//验证码倒计时
var wait = 60;
function time(obj) {
	if(wait==0) {
		//$("#user_register_getCode").removeAttr("disabled");
		$("#user_register_getCode").attr("onclick","sendVcode(this)")
		$("#user_register_getCode").html("获取验证码");
		wait = 60;
	}else {
		$("#user_register_getCode").removeAttr("onclick");
		$("#user_register_getCode").html(wait+"秒后重试");
		wait--;
		setTimeout(function() {		//倒计时方法
			time(obj);
		},1000);	//间隔为1s
	}
}

function sendVcode(e){
	var user_register_tel = $('#user_register_tel').val();
	if(null == user_register_tel || "" == user_register_tel){
		$('#user_register_error').html("<font color='red'>" +"请输入手机号！"+ "</font>");
		return;
	}
	if(!phonehaoReg.test(user_register_tel)){
		$('#user_register_error').html("<font color='red'>" +"手机号格式错误！"+ "</font>");
		return;
	}
	
	$.ajax({
     	type :"post" ,
     	url :"/qiji/users/getVCode",
     	data :{
     		utel : user_register_tel
     	},
     	dataType: "json" ,
     	async :true ,
     	success: function(data) {
     		if(data.operSucc && data.succ){
     			wait = 60;
     			time(e);//倒计时
     			$('#user_register_error').html("<font color='red'>" +""+ "</font>");
     		}else{
     			$('#user_register_error').html("<font color='red'>" +data.message+ "</font>");
     		}
     	},
        error: function(data) {
        	$('#user_register_error').html("<font color='red'>" +"系统错误！"+ "</font>");
       }
	});
	
}



$('#index_logout').click(function(){
	myStorage.removeItem("isLogin");
	$('#user_login_after_tel').html('');
	$('.userCenter-tab').show();
	$('.loginBox').show();
	$('.login-userMsg').hide();
	alert("退出成功，欢迎回来！");
	//调用服务销毁session
	$.ajax({
     	type :"post" ,
     	url :"/qiji/users/logout",
     	data :{},
     	dataType: "json" ,
     	async :true ,
     	success: function(data) {
     		if(data.operSucc && data.succ){
     		}else{
     			window.location.href="/qiji/index.html";
     		}
     	},
        error: function(data) {
        	window.location.href="/qiji/index.html";
       }
	});
	
})





















$("#").css("color","#666");
//通用的校验
function checkElement(eid,reg,message) { // 提示的id，正则，提示信息
	//获取用户名
	var val = $("#" + eid).val();
	//获取显示框
	var span = $("#" + eid + "Span");
	//验证的要点
	if (val != null && val.length > 0) {
		if (reg.test(val)) {
			return true;
		} else {
			span.html("<font color='red'>" +"请输入正确的"+ message + "</font>");
			return false;
		}
	} else {
		span.html("<font color='red'>" +"请输入"+message + "</font>");
		
		return false;
	}
};
//----判断是手机还是邮箱
function checkusername(obj,message,mval){
	var emailReg = /^\w{5,18}@\w{2,10}(\.[a-z]{2,3}){1,3}$/;//邮箱
	var phonehaoReg = /^1[34578][0-9]{9}$/;//手机

	//获取用户名
	var val = $("#" + obj).val();
	//获取显示框
	var span = $("#" + obj + "Span");
	//验证的要点
	if (val != null && val.length > 0) {
		if(emailReg.test(val)){
			zhaohuimyobj= "isemail";
			return true;
		}else if(phonehaoReg.test(val)){
			zhaohuimyobj="isphone";
			return true ;
		}else if(val==mval){
			span.html("请输入"+message );
			return false ;
		}else{
			span.html( "请输入正确的"+message);
			return false ;
		}
	}else{
		span.html("请输入"+message );
		return false ;
	}
}
//----登陆判断是手机还是邮箱还是昵称
function checkdlUsername(obj,message){
	var emailReg = /^\w{5,18}@\w{2,10}(\.[a-z]{2,3}){1,3}$/;//邮箱
	var phonehaoReg = /^1[34578][0-9]{9}$/;//手机
	var  nichengReg =  /^[a-zA-Z\d\_\u2E80-\u9FFF]{4,12}$/; //昵称
	//获取用户名
	var val = $("#" + obj).val();
	//获取显示框
	var span = $("#" + obj + "Span");
	//验证的要点
	if (val != null && val.length > 0) {
		if(emailReg.test(val)){
			dlmyobj= "isemail";
			return true;
		}else if(phonehaoReg.test(val)){
			dlmyobj="isphone";
			return true ;
		/*}else if(nichengReg.test(val)){
			dlmyobj="isnicheng";
			return true ;*/
		}else{
			span.html("请输入正确的"+message );
			return false ;
		}
	}else{
		span.html("请输入"+message);
		return false ;
	}
}
//----注册判断是手机还是邮箱还是昵称
function checkUsername(obj,message,mval){
	var emailReg = /^\w{5,18}@\w{2,10}(\.[a-z]{2,3}){1,3}$/;//邮箱
	var phonehaoReg = /^1[34578][0-9]{9}$/;//手机
	var  nichengReg =  /^[a-zA-Z\d\_\u2E80-\u9FFF]{4,12}$/; //昵称
	//获取用户名
	var val = $("#" + obj).val();
	//获取显示框
	var span = $("#" + obj + "Span");
	//验证的要点
	if (val != null && val.length > 0) {
		if(emailReg.test(val)){
			zhucemyobj= "isemail";
			return true;
		}else if(phonehaoReg.test(val)){
			zhucemyobj="isphone";
			return true ;
		/*}else if(nichengReg.test(val)){
			zhucemyobj="isnicheng";
			return true ;*/
		
		}else{
			span.html("请输入正确的"+message );
			return false ;
		}
	}else{
		span.html("请输入"+message );
		return false ;
	}
}
function issNicheng(obj,message){
	var  nichengReg =  /^[a-zA-Z\d\_\u2E80-\u9FFF]{4,16}$/; //昵称  4-16位字符      
	var val = $("#" + obj).val();
	//获取显示框
	var span = $("#" + obj + "Span");
	//验证的要点
	if (val != null && val.length > 0) {
		if(nichengReg.test(val)){
			return true;
		}else if(val=="用户名，4~16个字符，字母/中文/数字/下划线"){
			span.html("请输入"+message );
			return false ;
		}else{
			$("#"+obj+"Span").html( "请输入正确的"+message);
			return false ;
		}
	}else{
		span.html("请输入"+message );
		return false ;
	}
}
function isMima(obj,message){
	var  mimaReg =/^(?![^a-zA-Z]+$)(?!\D+$)[0-9a-zA-Z]{6,12}$/ ;//密码 6-12字母加数字
	var val = $("#" + obj).val();
	var span = $("#" + obj + "Span");
	//验证的要点
	if (val != null && val.length > 0) {
		if(mimaReg.test(val)){
			return true;
		
		}else{
			$("#"+obj+"Span").html("请输入正确的"+message);
			return false ;
		}
	}else{
		span.html("请输入"+message );
		return false ;
	}
}

function isCheckcode(obj,message){
	var  checkcodeReg =/^\d{6}$/  ;//验证码
	var val = $("#" + obj).val();
	var span = $("#" + obj + "Span");
	if (val != null && val.length > 0) {
		if(checkcodeReg.test(val)){
			return true;
		}else if(val=="请输入验证码"){
			span.html("请输入"+message );
			return false ;
		}else{
			$("#"+obj+"Span").html("请输入正确的"+message );
			return false ;
		}
	}else{
		
		span.html("请输入"+message );
		return false ;
	}
}

//===============================================================

//-----------------------------
//框框里面改变的时候提示 OnkeyUp事件
function zhuceOnkeyup(){
	var val =document.getElementById("username").value;
	var phonehaoReg = /^1[34578][0-9]{9}$/;//手机
	
	if(phonehaoReg.test(val)){
		var sj = document.getElementById("phone");
		sj.style.display ="block";
		return true ;
	}else{
		var sk = document.getElementById("phone");
		sk.style.display ="none";
		return true ;
	}
}
//鼠标移除之后判断 onfous事件
function zhuceOnfocus(){
	$("#username").css("color","#666");
	$("#usernameSpan").empty();
	var tel =document.getElementById("username");
	if(tel.value =='请输入大陆手机号码或者邮箱') {
		tel.value="";
	}	
}
//-----------------------------
//注册用户名鼠标离开事件
function zhuceOnblur(){
	var emailReg = /^\w{5,18}@\w{2,10}(\.[a-z]{2,3}){1,3}$/;//邮箱
	var phonehaoReg = /^1[34578][0-9]{9}$/;//手机
	var val =document.getElementById("username").value;
	if(val !=""){
		if(emailReg.test(val)){   //输入手机后台查询
			ugg=1;
			$.ajax({
		         	type :"post" ,
		         	url :"addUserAction_checkUsername.action",
		         	data :"username="+val+"&ugg="+ugg,
		         	dataType: "json" ,
		         	async :true ,
		           success: function(data) {
			           	if(data =="ok"){
			           		$("#usernameSpan").html("可以注册");
			           		
			           	}else{
			           		
			           		$("#usernameSpan").html("账号已存在");
			           		
			           	
			           	}
		           },
		           error: function(data) {
		           	console.info(data);
		           	window.location.href="blank.jsp";
		           }
				});
			
		}else if(phonehaoReg.test(val)){ //输入邮箱后台查询
				ugg=2;
				$.ajax({
			          	type :"post" ,
			          	url :"addUserAction_checkUsername.action",
			          	data :"username="+val+"&ugg="+ugg,
			          	dataType: "json" ,
			          	async :true ,
			            success: function(data) {
			            	if(data == "ok"){
			            		$("#usernameSpan").html("可以注册");
			            		//$("#checkcodeInfo").val("获取验证码").removeAttr("disabled");
			            	}else{
			            		$("#usernameSpan").html("账号已存在");
			            		//$("#checkcodeInfo").attr("disabled", true);
			            	}
			            },
			            error: function(data) {
			            	console.info("后台报错了");
			            	window.location.href="blank.jsp";
			            }
					});
				}else{
					$("#usernameSpan").html("请输入正确的用户名");
			    }
		
		}else{
			$("#username").val("请输入大陆手机号码或者邮箱");
			$("#usernameSpan").html("请输入用户名");
		}
		
}
//------验证码onfuous-------
function checkcode1Onfocus(){
	$("#checkcode").css("color","#666");
	$("#checkcodeSpan").empty();
	var tel =document.getElementById("checkcode");
	if(tel.value =='请输入验证码') {
		tel.value="";
	}	
}

//-------手机验证码onblur-----
function checkcodeCheck(){
	var checkcodeReg =/^\d{6}$/ ;
	var val =document.getElementById("checkcode").value;
	if(val !="" ){
		if(checkcodeReg.test(val)){ 
			return true;
		}else{
			$("#checkcodeSpan").html("请输入正确的验证码");
			return false;
		}
	}else{
		$("#checkcode").val("请输入验证码");
		$("#checkcodeSpan").html("请输入验证码");
		return false;
	}
}
//点击按钮获取验证码的事件

function yanzhengma(phoneNum) {
	var usernameSpan =document.getElementById("usernameSpan").innerHTML;
	if(usernameSpan=="可以注册"){
		var timestamp=new Date().getTime();
		$("#timestamp").val(timestamp);
		if(aaad==0){
			aaad=1;
			var num = $(phoneNum).val();
			var reg =/^\d{6}$/ ;
			var path = 'getAction_fangfa.action';
			var param = 'phoneNum=' + num;
				
			$.post(path, param, function(res) {
				//res就是ajax返回的时间数
				 var count = 60;
				 var countdown = setInterval(CountDown, 1000);
				 function CountDown() {
			             $("#checkcodeInfo").attr("disabled", true);
			             $("#checkcodeInfo").val("您在" + count + " 秒后可以再次获取!");
			             aaad=0;
			             if (count == 0) {
			                 $("#checkcodeInfo").val("获取验证码").removeAttr("disabled");
			                 clearInterval(countdown);
			                 
			             } 
			             count--;
			            
			      }
		        
			});
		}else{
			return;
		}
	}else{
		return;
	}
		
}


//-------昵称格式-----
function nichengCheck(){
	var  nichengReg =  /^[a-zA-Z\d\_\u2E80-\u9FFF]{4,16}$/; //昵称  4-16位字符                           
	var val =document.getElementById("nicheng").value;
	if(val !="" ){
		if(nichengReg.test(val)){ 
			$.ajax({
	         	type :"post" ,
	         	url :"addUserAction_checkNicheng.action",
	         	data :"nicheng="+val,
	         	dataType: "json" ,
	         	async :true ,
	           success: function(data) {
		           	if(data =="ok"){
		           		$("#nichengSpan").html("可以注册");
		           	}else{
		           		$("#nichengSpan").html("账号已经存在");
		           	}
	           },
	           error: function(data) {
	           	console.info(data);
	           	window.location.href="blank.jsp";
	           }
			});
		
		}else{
			$("#nichengSpan").html("请输入正确的昵称");
		}
	}else{
		$("#nicheng").val("用户名，4~16个字符，字母/中文/数字/下划线");
		$("#nichengSpan").html("请输入昵称");
	}
	
}
//昵称onfuous
function nichengOnfocus(){
	$("#nicheng").css("color","#666");
	$("#nichengSpan").empty();
	var tel =document.getElementById("nicheng");
	if(tel.value =='用户名，4~16个字符，字母/中文/数字/下划线') {
		tel.value="";
	}	
}

//------密码格式-------
//注册密码onblur
function mimaCheck(){
	var  mimaReg =/^(?![^a-zA-Z]+$)(?!\D+$)[0-9a-zA-Z]{6,12}$/ ;//密码 6-12字母加数字                        
	var val =document.getElementById("xinpwd2").value;
	var tx =document.getElementById("xinpwd");
	var pwd =document.getElementById("xinpwd2");
	if(val !="" ){
		if(mimaReg.test(val)){ 
			return true;
		}else{
			$("#xinpwd2Span").html("请输入正确的密码");
			return false;
		}
	}else{
		pwd.style.display = "none";
		tx.style.display = "";
		tx.value = "密码由6-12位字母+数字组成";
		$("#xinpwd2Span").html("请输入密码");
		return false ;
	}
	
}
//密码onfuous ---text
function mimaOnfocus(){
	$("#xinpwd").css("color","#666");
	$("#xinpwd2Span").empty();
	var tx= document.getElementById("xinpwd");
	 var pwd= document.getElementById("xinpwd2");
	 if(tx.value != "密码由6-12位字母+数字组成") return ;
	 	tx.style.display = "none";
		pwd.style.display = "";
		pwd.value = "";
		pwd.focus();
}
//密码onfocus --password
function zhucemimaOnfocus(){
	$("#xinpwd2Span").html("");
}

//注册ajax 
function zhuceAjax(){
			var username = document.getElementById("username").value;
			var mima = document.getElementById("xinpwd2").value;
			var nicheng = document.getElementById("nicheng").value;
			var checkcode = document.getElementById("checkcode").value;
			var usernameflag =checkUsername("username","用户名","请输入大陆手机号码或者邮箱");
			var nichengflag =issNicheng("nicheng","昵称");
			var mimaflag =isMima("xinpwd2","密码");
			var checkcodeflag=isCheckcode("checkcode","验证码");
			var checkCheckbox =document.getElementById("agree").checked; //判断阅读协议是否被选中
			var nichengHtml=document.getElementById("nichengSpan").innerHTML;
			if(nichengHtml=="账号已经存在"){
				return;
			}else{
			//phone注册-------
				if(usernameflag && nichengflag && mimaflag && checkcodeflag && checkCheckbox && zhucemyobj=="isphone" ) {
					var timestampold=new Date().getTime();
					if(timestampold-$("#timestamp").val()>(1*60*1000)){
						$("#checkcodeSpan").html("验证码失效");
						return;
					}
					ugg=2;
					 $.ajax({ 
				          	type :"post" ,
				          	url :"addUserAction_addUserByPhone.action",
				          	data :"username="+username+"&mima="+mima+"&nicheng="+nicheng+"&ugg="+ugg+"&checkcode="+checkcode,
				          	dataType: "json" ,
				          	async :true ,
				            success: function(data) {
				            	if(data =="ok"){
				            		window.location.href="usercenterAction_findUserByuid.action";
				            	}else if(data=="wrong"){
				            		$("#checkcodeSpan").html("请输入正确的验证码");
				            	}else{
				            		$("#checkcodeSpan").html("验证码失效");
				            	}
				            },
				            error: function(data) {
				            	window.location.href="blank.jsp";
				            }
		     			});
				
			//email注册
				}else if(usernameflag && nichengflag && mimaflag && checkCheckbox && zhucemyobj== "isemail"  ){
					ugg=1;
				 $.ajax({ 
			          	type :"post" ,
			          	url :"addUserAction_addUserByEmail.action",
			          	data :"username="+username+"&mima="+mima+"&nicheng="+nicheng+"&ugg="+ugg,
			          	dataType: "json" ,
			          	async :true ,
			            success: function(data) {
			            	if(data == "ok"){
			            		window.location.href="addUserAction_youxiangReg.action?username="+username;
			            	}else if(data=="wrong"){
			            		alert("邮件发送失败");
			            	}else{
			            		
			            	}
			            },
			            error: function(data) {
			            	
			            	window.location.href="blank.jsp";
			            }
	     			});
				 //手机注册
			}else {
				return;
		}
	}
}   //JavaScript onmouseover 事件与 onmouseout 事件 离开区域


//=====================登陆====================
//登录用户名
//获取焦点
function dlOnfocus(){
	$("#tel").css("color","#666");
	$("#telSpan").empty();
	var tel =document.getElementById("tel");
	if(tel.value =='请输入手机号码或邮箱') {
		tel.value="";
	}	
}
//登录失去焦点
function dlOnblur(){
	var emailReg = /^\w{5,18}@\w{2,10}(\.[a-z]{2,3}){1,3}$/;//邮箱
	var shoujihaoReg = /^1[358][0-9]{9}$/;//手机
	var  nichengReg =  /^[a-zA-Z\d\_\u2E80-\u9FFF]{4,16}$/; //昵称  4-16位字符                    
	var username =document.getElementById("tel").value;
	if(username !=""){
		
		if(emailReg.test(username)){
			return true ;
		}else if(shoujihaoReg.test(username)){
			return true ;
		}else if(nichengReg.test(username)){
			return true ;
		}else{
			$("#telSpan").html("请输入正确的手机号码或邮箱");
			return false ;
		}
	}else{
			$("#telSpan").html("请输入手机号码或邮箱");
			$("#tel").val("请输入手机号码或邮箱");
			return false ;
	}
}
//登录密码获取焦点
function  dlmmOnfocus(){
	$("#tx").css("color","#666");
	$("#pwdSpan").empty();
	var tx= document.getElementById("tx");
	 var pwd= document.getElementById("pwd");
	 if(tx.value != "请输入密码")return;
	 	tx.style.display = "none";
		pwd.style.display = "";
		pwd.value = "";
		pwd.focus();
}
//登录密码失去焦点
function dlmmOnblur(){
	var  mimaReg =/^(?![^a-zA-Z]+$)(?!\D+$)[0-9a-zA-Z]{6,12}$/ ;//密码 6-12字母加数字
	var val =document.getElementById("pwd").value;
	var tx1= document.getElementById("tx");
	var pwd1= document.getElementById("pwd");
	if(val !="" ){
		if(mimaReg.test(val)){ 
			return true;
		}else{
			$("#pwdSpan").html("请输入正确的密码");
			return false;
		}
	}else{
		pwd1.style.display = "none";
		tx1.style.display = "";
		tx1.value = "请输入密码";
		$("#pwdSpan").html("请输入密码");
		return false;
	}
}
function dsdlmmOnfocus(){
	$("#pwdSpan").html("");
}
function dsdlmmOnblur(){
 	var tx1= document.getElementById("tx");
	var pwd1= document.getElementById("pwd");
	if(pwd1.value != ""){
		
	}else{
		pwd1.style.display = "none";
		tx1.style.display = "";
		tx1.value = "请输入密码";
	}
}
function keyLogin(event){
	   e = event ? event :(window.event ? window.event : null);  
	    var currKey=0;  
	    currKey=e.keyCode||e.which||e.charCode;  
	    if(currKey==13){  
	        //执行的方法  
	    	dlOnclick();
	    }
}
//登陆onclick
function dlOnclick(){
	var pathname = window.location.pathname;
	var fwsid = window.location.search;
	var wodebanji =document.getElementById("wodebanji").value;
	 var cpwd =document.getElementById("remind").checked;
	 	if(cpwd){
	 		$("#inremind").val("1");
	 	}else{
	 		$("#inremind").val("0");
	 	}
 	var username = document.getElementById("tel").value;
	var mima = document.getElementById("pwd").value;
	var inremind =document.getElementById("inremind").value;
	var flagusername =checkdlUsername("tel","手机号码或邮箱");
	var mimaflag =checkElement("pwd",mimaReg,"密码");
	var hiddentname = escape(username);
	hiddentname = hiddentname.replace(/%/g, "-");
	if(flagusername && mimaflag){
		 
		if(dlmyobj=="isemail"){
			ugg=1
		}else if(dlmyobj=="isphone"){
			ugg=2;
		}else if(dlmyobj=="isnicheng"){
			ugg=3;
		}else{
			
		}
		if(wodebanji){
			 $.ajax({ 
		          	type :"post" ,
		          	url :"userAction_yonghudenglu.action",
		          	data :"username="+username+"&mima="+mima+"&ugg="+ugg +"&inremind="+inremind+"&hiddentname="+hiddentname+"&wodebanji="+wodebanji,
		          	dataType: "json" ,
		          	async :true ,
		            success: function(data) {
		            	if(data=="ok"){
		            		if(pathname=="/loginnew.jsp"){
		            			if(window.opener){//存在父页面
			            			window.opener.location.reload();//刷新 
					            	window.close();//关闭  		            			 
			            		 }else{
					            	window.location.href="wenzhangAction_mainPageWZlist.action";
			            		 }
		            		}else{
		            			window.location.href=pathname+fwsid;
		            		}
		            		
		            	}else if(data =="wodebanjiyouke"){
		            		
		            		var exp = new Date();
		    				exp.setTime(exp.getTime() + 1*24*60*60*1000);
		            		document.cookie="wodebanjiyouke="+escape("班级登陆")+";expires=" + exp.toGMTString();
		            		 window.location.href="wenzhangAction_mainPageWZlist.action";
		            	}else if(data.indexOf("wodebanjixuesheng") >= 0){
		            		 window.location.href="banjiAction_myClass.action?selclass="+data.substring(17);
		            	}else if(data.indexOf("wodebanjilaoshi") >= 0){
		            		 window.location.href="usercenterAction_findUsercenter.action?id="+data.substring(15);
		            	}else if(data == "activate"){
		            		$("#telSpan").html("邮箱未激活");
		            	}else if(data =="AjaxOk"){
		            		$("#telSpan").html("用户名不存在");
		            	}else{
		            		$("#pwdSpan").html("请输入正确的密码");
		            	}
		            	
		            },
		            error:function(){
		            	window.location.href="a500.html";
		            }
			 });
			
		}else{
			 $.ajax({ 
		          	type :"post" ,
		          	url :"userAction_yonghudenglu.action",
		          	data :"username="+username+"&mima="+mima+"&ugg="+ugg +"&inremind="+inremind+"&hiddentname="+hiddentname,
		          	dataType: "json" ,
		          	async :true ,
		            success: function(data) {
		            	if(data=="ok"){
		            		if(pathname=="/loginnew.jsp"){
		            			if(window.opener){//存在父页面
			            			window.opener.location.reload();//刷新 
					            	window.close();//关闭  		            			 
			            		 }else{
					            	window.location.href="wenzhangAction_mainPageWZlist.action";
			            		 }
		            		}else{
		            			window.location.href=pathname+fwsid;
		            		}
			            		
		            	}else if(data == "activate"){
		            		$("#telSpan").html("邮箱未激活");
		            	}else if(data =="AjaxOk"){
		            		$("#telSpan").html("用户名不存在");
		            	}else{
		            		$("#pwdSpan").html("请输入正确的密码");
		            	}
		            	
		            },
		            error:function(){
		            	window.location.href="a500.html";
		            }
			 });
			
			
		}
	
	}
	
	
}
//---------------重置密码------------------
function cp1mmOnfocus(){
	$("#pwdSpan").html("");
}
function cp1Onfocus(){ //密码一
	$("#tx1").css("color","#666");
	$("#pwdSpan").empty();
	var obj =document.getElementById("tx1");
	var pwd =document.getElementById("pwd");
	if(obj.value != "新密码由6-12位字母+数字组成") return ;
	obj.style.display = "none";
	pwd.style.display = "";
	pwd.value = "";
	pwd.focus();
}
function cp1mmOnblur(){
	var  mimaReg =/^(?![^a-zA-Z]+$)(?!\D+$)[0-9a-zA-Z]{6,12}$/ ;//密码 6-12字母加数字
	var val =document.getElementById("pwd").value;
	var tx= document.getElementById("tx1");
	var pwd= document.getElementById("pwd");
	if(val !="" ){
		if(mimaReg.test(val)){ 
			return true;
		}else{
			$("#pwdSpan").html("请输入正确的密码");
			return false;
		}
	}else{
		pwd.style.display = "none";
		tx.style.display = "";
		tx.value = "新密码由6-12位字母+数字组成";
		$("#pwdSpan").html("请输入密码");
			return false;
	}
}
function cp2mmOnfocus(){//密码二
	$("#tx2").css("color","#666");
	$("#pwdtwoSpan").empty();
	var obj =document.getElementById("tx2");
	var pwd =document.getElementById("pwdtwo");
	if(obj.value != "请重复输入新密码") return ;
	obj.style.display = "none";
	pwd.style.display = "";
	pwd.value = "";
	pwd.focus();
}
function cp2mmmOnfocus(){
	$("#pwdtwoSpan").html("");
}
function cp2mmOnblur(){
	var  mimaReg =/^(?![^a-zA-Z]+$)(?!\D+$)[0-9a-zA-Z]{6,12}$/ ;//密码 6-12字母加数字
	var val =document.getElementById("pwdtwo").value;
	var tx= document.getElementById("tx2");
	var pwd= document.getElementById("pwdtwo");
	if(val !="" ){
		if(mimaReg.test(val)){ 
			return true;
		}else{
			$("#pwdtwoSpan").html("请输入正确的密码");
			return false;
		}
	}else{
		pwd.style.display = "none";
		tx.style.display = "";
		tx.value = "请重复输入新密码";
		$("#pwdtwoSpan").html("请输入密码");
			return false;
	}
}
//------------------找回密码---------------
//找回密码第一步，点击获取验证码
function hqyzm(rephoneNum){
	
	var  num = $(rephoneNum).val(); 
	var path = 'getAction_fangfa.action';
	var param = 'phoneNum=' + num;
	var usernameSpan =document.getElementById("usernameSpan").innerHTML;
	if(usernameSpan=="账号存在"){
		if(aaads==0){
			aaads=1;
			$.post(path , param ,function(res){
				 var count = 60;
		         var countdown = setInterval(CountDown, 1000);
		         function CountDown() {
		             $("#checkcodeInfo").attr("disabled", true);
		             $("#checkcodeInfo").val(count + " 秒后可以再次获取!");
		             aaads=0;
		             if (count == 0) {
		                 $("#checkcodeInfo").val("点击获取短信验证码").removeAttr("disabled");
		                 clearInterval(countdown);
		             }
		             count--;
		         }
			
			});
		}else{
			return;
		}
	}else{
		return;
	}
}
//切换 忘记密码
function forgetOnkeyuo(){
	
	var shoujihaoReg = /^1[358][0-9]{9}$/;//手机
	var username =document.getElementById("username").value;
	if(shoujihaoReg.test(username)){
		var sj = document.getElementById("first_yanzhengma");
		sj.style.display ="block";
		return true ;
	}else{
		var sk = document.getElementById("first_yanzhengma");
		sk.style.display ="none";
		return true ;
	}
}
function uforgetOnfocus(){
	$("#username").css("color","#666");
	$("#usernameSpan").empty();
	var obj =document.getElementById("username");
	if(obj.value == '请输入注册时手机号/邮箱') {
		obj.value="";
	}	
}
//找回密码第一步，用户名鼠标移除事件
function uforgetOnblur(){
	var emailReg = /^\w{5,18}@\w{2,10}(\.[a-z]{2,3}){1,3}$/;//邮箱
	var phonehaoReg = /^1[34578][0-9]{9}$/;//手机
	var val =document.getElementById("username").value;
	if(val !=""){
		if(emailReg.test(val)){   //邮箱
			ugg=1;
			$.ajax({
		         	type :"post" ,
		         	url :"addUserAction_checkUsername.action",
		         	data :"username="+val+"&ugg="+ugg,
		         	dataType: "json" ,
		         	async :true ,
		           success: function(data) {
			           	if(data =="ok"){
			           		$("#usernameSpan").html("账号不存在");
			           		
			           	}else{
			           		$("#usernameSpan").html("账号存在");
			           	}
		           },
		           error: function(data) {
		           	console.info(data);
		           	window.location.href="a500.html";
		           }
				});
			
		}else if(phonehaoReg.test(val)){ //手机
				ugg=2;
				$.ajax({
			          	type :"post" ,
			          	url :"addUserAction_checkUsername.action",
			          	data :"username="+val+"&ugg="+ugg,
			          	dataType: "json" ,
			          	async :true ,
			            success: function(data) {
			            	if(data == "ok"){
			            		$("#usernameSpan").html("账号不存在");
			            		//$("#checkcodeInfo").val("获取验证码").removeAttr("disabled");
			            	}else{
			            		$("#usernameSpan").html("账号存在");
			            		//$("#checkcodeInfo").attr("disabled", true);
			            	}
			            },
			            error: function(data) {
			            	console.info("后台报错了");
			            	window.location.href="blank.jsp";
			            }
					});
				}else{
					$("#usernameSpan").html("请输入正确的用户名");
			    }
		
		}else{
			$("#username").val("请输入注册时手机号/邮箱");
			$("#usernameSpan").html("请输入用户名");
		}
}
function checkcodeOnfocus(){
	$("#checkcodeSpan").empty();
	var obj =document.getElementById("checkcode");
	if(obj.value == '请输入验证码') {
		obj.value="";
	}	
}
function checkcodeOnblur(){
	$("#checkcode").css("color","#666");
	var checkcodeReg =/^\d{6}$/; ;//验证码
	var checkcode =document.getElementById("checkcode").value;
	if(checkcode !=""){
		if(checkcodeReg.test(checkcode)){
			return true ;
		
		}else{
			
			$("#checkcodeSpan").html("请输入正确的验证码");
			return false ;
		}
	}else{
			$("#checkcode").val("请输入验证码");
			$("#checkcodeSpan").html("请输入验证码");
			return false ;
	}
}
function beforesubmit(){
	var phone = document.getElementById("username").value;
	var email = document.getElementById("username").value;
	var checkcode = document.getElementById("checkcode").value;
	var usernameflag =checkusername("username","用户名","请输入注册时手机号/邮箱");
	if(phonehaoReg.test(phone)){
		var checkflg =isCheckcode("checkcode","验证码");
	}
	
	if(usernameflag && checkflg && zhaohuimyobj=="isphone"){
		ugg=2;
		$.ajax({ 
          	type :"post" ,
          	url :"remimaAction_remima.action",
          	data :"username="+phone+"&code="+checkcode+"&ugg="+ugg,
          	dataType: "json" ,
          	async :true ,
            success: function(data) {
            	if(data=="ok"){
            		window.location.href="remimaAction_phoneReg.action?username="+phone;	            	
            	}else if(data =="wrong"){
            		$("#checkcodeSpan").html("验证码错误");
            	}else if(data =="nocheckcode"){
            		$("#checkcodeSpan").html("验证码失效");
            		
            	}else{
            		$("#telSpan").html("请输入正确的用户名");
            	}
            	
            },
            error:function(){
            	window.location.href="blank.jsp";
            }
	 });
	}else if(usernameflag && zhaohuimyobj == "isemail"){
		ugg = 1;
		$.ajax({ 
          	type :"post" ,
          	url :"remimaAction_remima.action",
          	data :"username="+email+"&ugg="+ugg,
          	dataType: "json" ,
          	async :true ,
            success: function(data) {
            	if(data=="ok"){
            		window.location.href="remimaAction_youxiangReg.action?username="+email;	            	
            	}else if(data =="wrong"){
            		$("#usernameSpan").html("用户名不存在");
            	}else{
            		$("#usernameSpan").html("用户名不存在");
            	}
            	
            },
            error:function(){
            	window.location.href="a500.jsp";
            }
	 });
		
	}else {
		return;
	}
}
//------------------确认修改---------------
function loginxiugai(){
	var password1 = document.getElementById("pwd").value;
	var password2 = document.getElementById("pwdtwo").value;
	var ugg=0;
	var mimaflag1 =checkElement("pwd",mimaReg,"密码");
	var mimaflag2 =checkElement("pwdtwo",mimaReg2,"密码");
	var resMimaUsername =document.getElementById("resMimaUsername").value;
	if(emailReg.test(resMimaUsername)){
		mimaobj="isemail";
	}
	if(phonehaoReg.test(resMimaUsername)){
		mimaobj="isphone";
	}
	if(mimaflag1 && mimaflag2 && mimaobj=="isemail"){
		$.ajax({ 
          	type :"post" ,
          	url :"remimaAction_reshezhimima.action",
          	data :"remima="+password1+"&rermima="+password2+"&username="+resMimaUsername,
          	dataType: "json" ,
          	async :true ,
            success: function(data) {
            	if(data=="ok"){
            		window.location.href="change_sucess.jsp";	            	
            	}else{
            		$("#change2Span").html("密码不一致，请重新输入");
            	}
            	
            },
            error:function(){
            	window.location.href="blank.jsp";
            }
	 });
	}else if(mimaflag1 && mimaflag2 && mimaobj=="isphone"){	
		$.ajax({ 
          	type :"post" ,
          	url :"remimaAction_reshezhimimabyphone.action",
          	data :"remima="+password1+"&rermima="+password2+"&username="+resMimaUsername,
          	dataType: "json" ,
          	async :true ,
            success: function(data) {
            	if(data=="ok"){
            		window.location.href="change_sucess.jsp";		            	
            	}else{
            		$("#change2Span").html("密码不一致，请重新输入");
            	}
            	
            },
            error:function(){
            	window.location.href="blank.jsp";
            }
	 });
	}else{
		
	}
}