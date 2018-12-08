
$('#nav_personal').click(function(){
	$.ajax({
     	type :"post" ,
     	url :"/qiji/users/login",
     	data :{
     		utel : myStorage.getItem("utel"),
     		upwd : myStorage.getItem("upwd")
     	},
     	dataType: "json" ,
     	async :true ,
     	success: function(data) {
     		if(data.operSucc && data.succ){
     			window.location.href="/qiji/myInfo";
     		}else{
     			alert("请先登录！");
     		}
     	},
        error: function(data) {
        	alert("请先登录！");
       }
	});	
	
});














