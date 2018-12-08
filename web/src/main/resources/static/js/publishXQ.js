$(function() {
	/**
	 * 标签切换
	 */
	$('.publishXQ-tab>span').click(function() {
		var index = $(this).index();
		$(this).addClass('tabselected').siblings('span')
				.removeClass('tabselected');
		$('.publishXQ-tabview>.publishXQ-tablist').eq(index).show()
				.siblings('.publishXQ-tablist').hide();
	});
	
	
	$("#publishActivity_start_date").selectDate({
		yearSelId: 'publishActivity_start_year',
		monthSelId : 'publishActivity_start_month',
		daySelId : 'publishActivity_start_days'
	});
	$("#publishActivity_end_date").selectDate({
		yearSelId: 'publishActivity_end_year',
		monthSelId : 'publishActivity_end_month',
		daySelId : 'publishActivity_end_days'
	});
	$("#publishRequire_start_date").selectDate({
		yearSelId: 'publishRequire_start_year',
		monthSelId : 'publishRequire_start_month',
		daySelId : 'publishRequire_start_days'
	});
	$("#publishRequire_end_date").selectDate({
		yearSelId: 'publishRequire_end_year',
		monthSelId : 'publishRequire_end_month',
		daySelId : 'publishRequire_end_days'
	});
	/*
	$("#days").focusout(function() {
		var year = $("#year option:selected").html()
		var month = $("#month option:selected").html()
		var day = $("#days option:selected").html()
		console.log(year + month + day)
	});

	$("#days2").focusout(function() {
		var year = $("#year2 option:selected").html()
		var month = $("#month2 option:selected").html()
		var day = $("#days2 option:selected").html()
		console.log(year + month + day)
	});
	*/
	$('#publishActivity_category_pid').change(function(){
		$('#publishActivity_category_id').empty();
		searchSecondCategory($(this).val(),'#publishActivity_category_id');
	});
	
	$('#publishRequire_category_pid').change(function(){
		$('#publishRequire_category_id').empty();
		searchSecondCategory($(this).val(),'#publishRequire_category_id');
	});
	
	searchProvinces('#publishActivity_provinces');
	searchProvinces('#publishRequire_provinces');
	
	
//	$('#publishActivity_provinces').click(function(){
//		
//		if($(this).val() == ''){
//			searchProvinces('#publishActivity_provinces');
//		}
//	});
//	
//	$('#publishRequire_provinces').click(function(){
//		
//		if($(this).val() == ''){
//			searchProvinces('#publishRequire_provinces');
//		}
//	});
	
	$('#publishActivity_provinces').change(function(){
		
		$('#publishActivity_city').empty();
		$('#publishActivity_area').empty();
		$('#publishActivity_city').append("<option value='" + '' + "'>" + '=请选择=' + "</option>");
		$('#publishActivity_area').append("<option value='" + '' + "'>" + '=请选择=' + "</option>");
		if($(this).val() != ''){
			
			searchCitiesByProvinceId($(this).val(),'#publishActivity_city');
		}
	});
	
	$('#publishRequire_provinces').change(function(){
		$('#publishRequire_city').empty();
		$('#publishRequire_area').empty();
		$('#publishRequire_city').append("<option value='" + '' + "'>" + '=请选择=' + "</option>");
		$('#publishRequire_area').append("<option value='" + '' + "'>" + '=请选择=' + "</option>");
		if($(this).val() != ''){
			searchCitiesByProvinceId($(this).val(),'#publishRequire_city');
		}
	});
	
	
	$('#publishActivity_city').change(function(){
		$('#publishActivity_area').empty();
		$('#publishActivity_area').append("<option value='" + '' + "'>" + '=请选择=' + "</option>");
		if($(this).val() != ''){
			searchAreasByCityId($(this).val(),'#publishActivity_area');
		}
	});
	
	$('#publishRequire_city').change(function(){
		$('#publishRequire_area').empty();
		$('#publishRequire_area').append("<option value='" + '' + "'>" + '=请选择=' + "</option>");
		if($(this).val() != ''){
			searchAreasByCityId($(this).val(),'#publishRequire_area');
		}
	});
		
	
	function searchSecondCategory(categoryParentId,selectId){
		$.ajax({
	     	type :"post" ,
	     	url :"/qiji/category/getSecondCategory",
	     	data :{
	     		category_parent_id : categoryParentId
	     	},
	     	dataType: "json" ,
	     	async :true ,
	     	success: function(data) {
	     		if(data.operSucc && data.succ){
	     			for(var i=0;i<data.obj.length;i++){
	     				$(selectId).append("<option value='" + data.obj[i].id + "'>" + data.obj[i].name + "</option>");
	     			}
	     		}else{
	     			
	     		}
	     	},
	        error: function(data) {
	        	
	       }
		});
	}
	
	
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
	var publishActivity_files = "";
	var publishActivity_options = {
	    path: '/qiji/file/uploadFiles',
	    save_path : 'activeimg',
	    img_container_id : 'publishActivity_uploadImg',
	    img_file_input_id : 'publishActivity_uploadImg_input',
	    imgNums : 5,
	    onSuccess: function (ret) {
	    	var res = $.parseJSON(ret);
	    	if(res.succ && res.obj != null){
	    		for(var i=0;i<res.obj.length;i++){
		    		if(i== res.obj.length-1){
		    			publishActivity_files = publishActivity_files + res.obj;
		    		}else{
		    			publishActivity_files = publishActivity_files + res.obj + ",";
		    		}
		    		
		    	}
	    	}
	    	
	    },
	    onFailure: function (res) {
	        console.info(res);
	    }
	}

	var publishActivity_upload = tinyImgUpload('#publishActivity_uploadImg', publishActivity_options);
	
	var publishRequire_files = "";
	var publishRequire_options = {
		    path: '/qiji/file/uploadFiles',
		    save_path : 'require',
		    img_container_id : 'publishRequire_uploadImg',
		    img_file_input_id : 'publishRequire_uploadImg_input',
		    imgNums : 5,
		    onSuccess: function (ret) {
		    	var res = $.parseJSON(ret);
		    	if(res.succ && res.obj != null){
		    		for(var i=0;i<res.obj.length;i++){
			    		if(i== res.obj.length-1){
			    			publishRequire_files = publishRequire_files + res.obj;
			    		}else{
			    			publishRequire_files = publishRequire_files + res.obj + ",";
			    		}
			    		
			    	}
		    	}
		    },
		    onFailure: function (res) {
		        console.info(res);
		    }
		}

	var publishRequire_upload = tinyImgUpload('#publishRequire_uploadImg', publishRequire_options);
	
	
	$('#publishActivity_save').click(function(){
		//调用ajax提交数据；
		publishActivity_upload();//上传图片
		var publishActivity_title = $('#publishActivity_title').val();
		var publishActivity_content = $('#publishActivity_content').val();
		var publishActivity_category_pid = $('#publishActivity_category_pid').val();
		var publishActivity_category_id = $('#publishActivity_category_id').val();
		
		var publishActivity_start_date = "";
		var publishActivity_start_year = $('#publishActivity_start_year').val();
		var publishActivity_start_month = $('#publishActivity_start_month').val();
		var publishActivity_start_days = $('#publishActivity_start_days').val();
		var publishActivity_end_date = "";
		var publishActivity_end_year = $('#publishActivity_end_year').val();
		var publishActivity_end_month = $('#publishActivity_end_month').val();
		var publishActivity_end_days = $('#publishActivity_end_days').val();
		
		if(publishActivity_start_year != '' 
			&& publishActivity_start_month != ''
			&& publishActivity_start_days != ''){
			publishActivity_start_date = publishActivity_start_year + "-" + publishActivity_start_month + "-" + publishActivity_start_days;
		}
		if(publishActivity_end_year != '' 
			&& publishActivity_end_month != ''
			&& publishActivity_end_days != ''){
			publishActivity_end_date = publishActivity_end_year + "-" + publishActivity_end_month + "-" + publishActivity_end_days;
		}
		
		
		
		
		var publishActivity_addr = "";
		var publishActivity_provinces = $('#publishActivity_provinces').val();
		var publishActivity_city = $('#publishActivity_city').val();
		var publishActivity_area = $('#publishActivity_area').val();
		
		if(publishActivity_provinces != '' 
			&& publishActivity_city != ''
			&& publishActivity_area != ''){
			publishActivity_addr = publishActivity_provinces + publishActivity_city + publishActivity_area;
		}
		
		var publishActivity_needs = $('#publishActivity_needs').val();
		var publishActivity_applyname = $('#publishActivity_applyname').val();
		var publishActivity_tel = $('#publishActivity_tel').val();		
		
		//检查必输项
		
		
		$.ajax({
	     	type :"post" ,
	     	url :"/qiji/activity/addActivity",
	     	data :{
	     		ogid : 0,
	     		ogname : 'test',
	     		tel : publishActivity_tel,
	     		title : publishActivity_title,
	     		content : publishActivity_content,
	     		needs : publishActivity_needs,
	     		address : publishActivity_addr,
	     		pictureUrl : publishActivity_files,
	     		actType : '2',
	     		categoryPid : publishActivity_category_pid,
	     		categoryId : publishActivity_category_id,
	     		startTime : publishActivity_start_date,
	     		endTime : publishActivity_end_date,
	     		applyname : publishActivity_applyname
	     	},
	     	dataType: "json" ,
	     	async :true ,
	     	success: function(data) {
	     		if(data.operSucc && data.succ){
	     			//发布成功
	     			alert('发布成功！');
	     		}else{
	     			alert('发布失败！');
	     		}
	     	},
	        error: function(data) {
	        	
	       }
		});
		
		
	});
	
	
	
	
	
	
	$('#publishRequire_save').click(function(){
		//调用ajax提交数据；
		publishRequire_upload();//上传图片
		var publishRequire_ogname = $('#publishRequire_ogname').val();
		var publishRequire_title = $('#publishRequire_title').val();
		var publishRequire_content = $('#publishRequire_content').val();
		var publishRequire_category_pid = $('#publishRequire_category_pid').val();
		var publishRequire_category_id = $('#publishRequire_category_id').val();
		
		var publishRequire_start_date = "";
		var publishRequire_start_year = $('#publishRequire_start_year').val();
		var publishRequire_start_month = $('#publishRequire_start_month').val();
		var publishRequire_start_days = $('#publishRequire_start_days').val();
		var publishRequire_end_date = "";
		var publishRequire_end_year = $('#publishRequire_end_year').val();
		var publishRequire_end_month = $('#publishRequire_end_month').val();
		var publishRequire_end_days = $('#publishRequire_end_days').val();
		
		if(publishRequire_start_year != '' 
			&& publishRequire_start_month != ''
			&& publishRequire_start_days != ''){
			publishRequire_start_date = publishRequire_start_year + "-" + publishRequire_start_month + "-" + publishRequire_start_days;
		}
		if(publishRequire_end_year != '' 
			&& publishRequire_end_month != ''
			&& publishRequire_end_days != ''){
			publishRequire_end_date = publishRequire_end_year + "-" + publishRequire_end_month + "-" + publishRequire_end_days;
		}
		
		
		
		
		var publishRequire_addr = "";
		var publishRequire_provinces = $('#publishRequire_provinces').val();
		var publishRequire_city = $('#publishRequire_city').val();
		var publishRequire_area = $('#publishRequire_area').val();
		
		if(publishRequire_provinces != '' 
			&& publishRequire_city != ''
			&& publishRequire_area != ''){
			publishRequire_addr = publishRequire_provinces + publishRequire_city + publishRequire_area;
		}
		
		var publishRequire_needs = $('#publishRequire_needs').val();
		var publishRequire_applyname = $('#publishRequire_applyname').val();
		var publishRequire_tel = $('#publishRequire_tel').val();
		var publishRequire_money = $('#publishRequire_money').val();
		
		//检查必输项
		
		
		$.ajax({
	     	type :"post" ,
	     	url :"/qiji/activity/addActivity",
	     	data :{
	     		ogid : 0,
	     		ogname : publishRequire_ogname,
	     		tel : publishRequire_tel,
	     		title : publishRequire_title,
	     		content : publishRequire_content,
	     		needs : publishRequire_needs,
	     		address : publishRequire_addr,
	     		pictureUrl : publishRequire_files,
	     		actType : '3',
	     		categoryPid : publishRequire_category_pid,
	     		categoryId : publishRequire_category_id,
	     		startTime : publishRequire_start_date,
	     		endTime : publishRequire_end_date,
	     		applyname : publishRequire_applyname,
	     		money : publishRequire_money
	     	},
	     	dataType: "json" ,
	     	async :true ,
	     	success: function(data) {
	     		if(data.operSucc && data.succ){
	     			//发布成功
	     			alert('发布成功！');
	     		}else{
	     			alert('发布失败！');
	     		}
	     	},
	        error: function(data) {
	        	
	       }
		});
		
		
	});
	
});