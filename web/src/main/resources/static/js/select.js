$.fn.selectDate = function(options,callback){
	 var settings = $.extend({
		 minYear: (new Date).getFullYear(),//最小年份
		 maxYear: ((new Date).getFullYear() + 10),
		 yearSelId: null,
		 monthSelId : null,
		 daySelId : null
		 
     }, options);
	 
	 if (!settings.yearSelId) {
         $.error('yearSelId is not defined.');
     }
	 if (!settings.monthSelId) {
         $.error('monthSelId is not defined.');
     }
	 if (!settings.daySelId) {
         $.error('daySelId is not defined.');
     }
	 var minYear = settings.minYear;
	 var maxYear = settings.maxYear;		
	 var yearSel = document.getElementById(settings.yearSelId);
	 var monthSel = document.getElementById(settings.monthSelId);
	 var daySel = document.getElementById(settings.daySelId);

	for(var y = maxYear;y >= minYear;y--){
		var yearOpt = document.createElement('option')
		yearOpt.value = y
//		yearOpt.innerHTML = y+'年'
		yearOpt.innerHTML = y+''
		yearSel.appendChild(yearOpt)
	}

	$(yearSel).click(function(event){
		if(!$("#" + settings.yearSelId + " option:selected").val()) return;
		removeOption(monthSel)
//		addOption(12,'月',monthSel)
		addOption(12,'',monthSel)
		removeOption(daySel)
	})

	$(monthSel).click(function(){
		removeOption(daySel)
		var year = $("#" + settings.yearSelId + " option:selected").val()
		var month = $("#" + settings.monthSelId + " option:selected").val()
		if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
			addOption(31,'',daySel)
		}else if(month==4 || month==6 || month==9 || month==11){
			addOption(30,'',daySel)
		}else if(month==2){
			if((year%4 == 0 && year%100 != 0 ) || (year%400 == 0)){
				addOption(29,'',daySel)
			}else{	
				addOption(28,'',daySel)
			}
		}
	});

	function addOption(num,unit,parent){
		//num：选项个数
		//unit：单位（年/月/日）
		//parent：父对象
		for(var index=1;index <= num;index++){
			var opt =document.createElement('option')
			$(opt).attr('value',index)
			if(index<10){index = '0'+index}
			$(opt).html(index+unit)
			$(parent).append(opt)
		}
	}
			
	function removeOption(parent){
		//parent：父对象
		var options = $(parent).find('option')
		for(var index = 1;index < options.length;index++){
			parent.removeChild(options[index])
		}
	}
}