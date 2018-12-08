$(function() {
	$.ajax({
     	type :"post" ,
     	url :"/qiji/users/getMyInfo",
     	data :{
     		utel : myStorage.getItem("utel"),
     		upwd : myStorage.getItem("upwd")
     	},
     	dataType: "json" ,
     	async :true ,
     	success: function(data) {
     		if(data.operSucc && data.succ){
     			$('#myInfo_nickname').val(data.obj.nickname);
     			//myInfo_logoUrl_files
     			$('#myInfo_intro').val(data.obj.intro);
     			$('#myInfo_name').val(data.obj.name);
     			$('#myInfo_mobile').val(data.obj.mobile);
     			$('#myInfo_email').val(data.obj.email);
     		}else{
     			
     		}
     	},
        error: function(data) {
        	
       }
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	searchProvinces('#myInfo_provinces');
	
	$('#myInfo_provinces').change(function(){
		
		$('#myInfo_city').empty();
		$('#myInfo_area').empty();
		
		if($(this).val() != ''){
			searchCitiesByProvinceId($(this).val(),'#myInfo_city');
		}
	});
	
	
	
	$('#myInfo_city').change(function(){
		$('#myInfo_area').empty();
		if($(this).val() != ''){
			searchAreasByCityId($(this).val(),'#myInfo_area');
		}
	});
	

	
	function searchProvinces(selectId){
		$.ajax({
	     	type :"post" ,
	     	url :"/qiji/key/getProvinces",
	     	data :{
	     	},
	     	dataType: "json" ,
	     	async :true ,
	     	success: function(data) {
	     		if(data.operSucc && data.succ){
	     			for(var i=0;i<data.obj.length;i++){
	     				$(selectId).append("<option value='" + data.obj[i].provinceid + "'>" + data.obj[i].province + "</option>");
	     			}
	     		}else{
	     			
	     		}
	     	},
	        error: function(data) {
	        	
	       }
		});
	}
	
	function searchCitiesByProvinceId(provinceid,selectId){
		$.ajax({
	     	type :"post" ,
	     	url :"/qiji/key/getCitiesByProvinceId",
	     	data :{
	     		provinceid : provinceid
	     	},
	     	dataType: "json" ,
	     	async :true ,
	     	success: function(data) {
	     		if(data.operSucc && data.succ){
	     			for(var i=0;i<data.obj.length;i++){
	     				$(selectId).append("<option value='" + data.obj[i].cityid + "'>" + data.obj[i].city + "</option>");
	     			}
	     		}else{
	     			
	     		}
	     	},
	        error: function(data) {
	        	
	       }
		});
	}
	
	function searchAreasByCityId(cityId,selectId){
		$.ajax({
	     	type :"post" ,
	     	url :"/qiji/key/getAreasByCityId",
	     	data :{
	     		cityId : cityId
	     	},
	     	dataType: "json" ,
	     	async :true ,
	     	success: function(data) {
	     		if(data.operSucc && data.succ){
	     			for(var i=0;i<data.obj.length;i++){
	     				$(selectId).append("<option value='" + data.obj[i].areaid + "'>" + data.obj[i].area + "</option>");
	     			}
	     		}else{
	     			
	     		}
	     	},
	        error: function(data) {
	        	
	       }
		});
	}
	
	//图片上传
	var myInfo_logoUrl_files = "";
	var myInfo_logoUrl_options = {
	    path: '/qiji/file/uploadFiles',
	    save_path : 'activeimg',
	    img_container_id : 'logoUrl_uploadImg',
	    img_file_input_id : 'logoUrl_uploadImg_input',
	    imgNums : 1,
	    isAddImgBtnHidden : true,
	    onSuccess: function (ret) {
	    	var res = $.parseJSON(ret);
	    	if(res.succ && res.obj != null){
	    		for(var i=0;i<res.obj.length;i++){
		    		if(i== res.obj.length-1){
		    			myInfo_logoUrl_files = myInfo_logoUrl_files + res.obj;
		    		}else{
		    			myInfo_logoUrl_files = myInfo_logoUrl_files + res.obj + ",";
		    		}
		    		
		    	}
	    	}
	    	
	    },
	    onFailure: function (res) {
	        console.info(res);
	    }
	}

	var myInfo_logoUrl_upload = tinyImgUpload('#logoUrl_uploadImg', myInfo_logoUrl_options);

	
	var myInfo_idCard_files = "";
	var myInfo_idCard_options = {
	    path: '/qiji/file/uploadFiles',
	    save_path : 'activeimg',
	    img_container_id : 'idCard_uploadImg',
	    img_file_input_id : 'idCard_uploadImg_input',
	    imgNums : 1,
	    isAddImgBtnHidden : true,
	    onSuccess: function (ret) {
	    	var res = $.parseJSON(ret);
	    	if(res.succ && res.obj != null){
	    		for(var i=0;i<res.obj.length;i++){
		    		if(i== res.obj.length-1){
		    			myInfo_idCard_files = myInfo_idCard_files + res.obj;
		    		}else{
		    			myInfo_idCard_files = myInfo_idCard_files + res.obj + ",";
		    		}
		    		
		    	}
	    	}
	    	
	    },
	    onFailure: function (res) {
	        console.info(res);
	    }
	}

	var myInfo_idCard_upload = tinyImgUpload('#idCard_uploadImg', myInfo_idCard_options);

	var myInfo_studentImg_files = "";
	var myInfo_studentImg_options = {
	    path: '/qiji/file/uploadFiles',
	    save_path : 'activeimg',
	    img_container_id : 'studentImg_uploadImg',
	    img_file_input_id : 'studentImg_uploadImg_input',
	    imgNums : 1,
	    isAddImgBtnHidden : true,
	    onSuccess: function (ret) {
	    	var res = $.parseJSON(ret);
	    	if(res.succ && res.obj != null){
	    		for(var i=0;i<res.obj.length;i++){
		    		if(i== res.obj.length-1){
		    			myInfo_studentImg_files = myInfo_studentImg_files + res.obj;
		    		}else{
		    			myInfo_studentImg_files = myInfo_studentImg_files + res.obj + ",";
		    		}
		    		
		    	}
	    	}
	    	
	    },
	    onFailure: function (res) {
	        console.info(res);
	    }
	}

	var myInfo_studentImg_upload = tinyImgUpload('#studentImg_uploadImg', myInfo_studentImg_options);

	
	$('#myInfo_save_btn').click(function(){
		//调用ajax提交数据；
		myInfo_logoUrl_upload();//上传图片
		myInfo_idCard_upload();
		myInfo_studentImg_upload();
		
		if(myInfo_logoUrl_files==""){
			$('#myInfo_errMsg').html("<font color='red'>" +"头像不能为空！"+ "</font>");
			return;
		}
		if(myInfo_idCard_files==""){
			$('#myInfo_errMsg').html("<font color='red'>" +"身份证不能为空！"+ "</font>");
			return;
		}
		if(myInfo_studentImg_files==""){
			$('#myInfo_errMsg').html("<font color='red'>" +"营业执照不能为空！"+ "</font>");
			return;
		}
		var myInfo_nickname = $('#myInfo_nickname').val();
		var myInfo_intro = $('#myInfo_intro').val();
		var myInfo_name = $('#myInfo_name').val();
		var myInfo_mobile = $('#myInfo_mobile').val();
		var myInfo_email = $('#myInfo_email').val();
		if(myInfo_nickname==null || myInfo_nickname == ""){
			$('#myInfo_errMsg').html("<font color='red'>" +"昵称不能为空！"+ "</font>");
			return;
		}
		if(myInfo_intro==null || myInfo_intro == ""){
			$('#myInfo_errMsg').html("<font color='red'>" +"简介不能为空！"+ "</font>");
			return;
		}
		if(myInfo_name==null || myInfo_name == ""){
			$('#myInfo_errMsg').html("<font color='red'>" +"联系人不能为空！"+ "</font>");
			return;
		}
		if(myInfo_mobile==null || myInfo_mobile == ""){
			$('#myInfo_errMsg').html("<font color='red'>" +"联系方式不能为空！"+ "</font>");
			return;
		}
		if(myInfo_email==null || myInfo_email == ""){
			$('#myInfo_errMsg').html("<font color='red'>" +"邮箱不能为空！"+ "</font>");
			return;
		}
		
		
		
		
		//检查必输项
		
		
		$.ajax({
	     	type :"post" ,
	     	url :"/qiji/users/uMyInfo",
	     	data :{
	     		utel : myStorage.getItem("utel"),
	     		nickname : myInfo_nickname,
	     		intro : myInfo_intro,
	     		name : myInfo_name,
	     		mobile : myInfo_mobile,
	     		email : myInfo_email,
	     		logoUrl : myInfo_logoUrl_files
	     	},
	     	dataType: "json" ,
	     	async :true ,
	     	success: function(data) {
	     		if(data.operSucc && data.succ){
	     			myStorage.setItem("nickname",data.obj.nickname);
	     			myStorage.setItem("logourl",data.obj.logourl);
	     			alert('更新成功！');
	     			$('#myInfo_errMsg').html("");
	     		}else{
	     			$('#myInfo_errMsg').html("<font color='red'>" +data.message+ "</font>");
	     		}
	     	},
	        error: function(data) {
	        	$('#myInfo_errMsg').html("<font color='red'>" +"请求失败"+ "</font>");
	       }
		});
	});
	
	
});