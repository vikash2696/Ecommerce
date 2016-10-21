/**
 * @author jyotikumari
 */


var bowlerId;
var batsmanId;
var enablenextrowflag=0;
var totalBatsman;

$(document).on('click', 'input[type="button"][class="player_btn bowler"]', function() {
	 $('input[type="button"][class="player_btn bowler green"]').removeClass('green');
	 $(this).addClass('green');
	 $("table#score_table").find("tr:eq(1)").find('input[type="radio"],[type="checkbox"],[type="button"]').prop('disabled',false);

});


$(document).on('click', 'input[type="button"][class*="player_btn batsman"]', function() {
	 batsmanId= $(this).attr('data');
	if($(this).hasClass('green')){
		$("#bat"+batsmanId).removeClass('green');
	
	}else{
		if($('input[type="button"][class*="player_btn batsman"]').hasClass('green') 
				&& $('input[type="button"][class*="player_btn batsman"]').hasClass('lightgreen')){
			
			alert("Only 2 batsman can be selected");
		}else if($('input[type="button"][class*="player_btn batsman"]').hasClass('green') ){
			$("#bat"+batsmanId).removeClass('green').addClass('lightgreen');
			$("table#score_table tr[id="+enablenextrowflag+"]").find('input[type="radio"],[type="checkbox"],[type="button"]').prop('disabled',false);
			
		}else if($('input[type="button"][class*="player_btn batsman"]').hasClass('lightgreen')){	console.log("ligreen");
			$("#bat"+batsmanId).removeClass('lightgreen').addClass('green');
			$("table#score_table tr[id="+enablenextrowflag+"]").find('input[type="radio"],[type="checkbox"],[type="button"]').prop('disabled',false);
			
		}else{
			$("#bat"+batsmanId).addClass('green');
			$("table#score_table tr[id="+enablenextrowflag+"]").find('input[type="radio"],[type="checkbox"],[type="button"]').prop('disabled',false);
			
		}
	}
	 $('#bat1span').html( $('input[type="button"][class="player_btn batsman green"]').val());
	 $('#bat2span').html($('input[type="button"][class="player_btn batsman lightgreen"]').val());
	 
});


//select either no or wide ball
$(document).on('change', 'input[type="checkbox"][group="extra[]"]', function() {
	$(this).parents('tr').find('input[group="' + $(this).attr('group') + '"]').not($(this)).prop('checked', false);
});
var batsmandetail=[],batsmandetailactive=[];

var overcount=1;
var wicketCount = 0;
var ballcount=1,nextballcount=1,batsman1,batsman2,CheckPlayerFlag = 1,wicket;
$(document).on('click', 'input[type="button"][class*="ball"]', function() {
	 var lastovercnt =  $("#over").find(".over_btn").last().val();
	 
	if($('input[type="button"][class*="player_btn batsman"]').hasClass('green') && $('input[type="button"][class*="player_btn batsman"]').hasClass('lightgreen') ){
		CheckPlayerFlag = 0;
	}else{
		CheckPlayerFlag =1;
	}
	if(CheckPlayerFlag == 0){
	
	var over =  $('input[type="button"][class*="over_btn active"]').attr('id');
	var check_ball = $(this).attr('checkclass');	
	if(check_ball == 1){
		$('input[type="button"][class*="player_btn bowler"]').prop('disabled',true);		
		 
	}
	var checkedRun=[];
	var check_over,radiocount=1;
	var gainedruns;

	var extraruns,extraType="",oldplayer;  
	 oldplayer =  $('input[type="button"][class="player_btn batsman green"]').val();  
	  batsman_active = $('input[type="button"][class="player_btn batsman green"]').attr('data');
	  oncrease_player = $('input[type="button"][class="player_btn batsman green"]').attr('data');
	  offcrease_player = $('input[type="button"][class="player_btn batsman lightgreen"]').attr('data');
	 $(this).parents('tr').find('input[type="radio"],[type="checkbox"],[type="button"]').prop("disabled",true);
	 bowler_activename = $('input[type="button"][class="player_btn bowler green"]').val();
	 $(this).parents('tr').find("input:checkbox[class*='overball'][checkclass="+check_ball+"][name*='check"+over+"_"+check_ball+"']:checked").each(function(){
			checkedRun.push($(this).val());
		});
	  if($('input[type="radio"][name="radio'+over+"_"+check_ball+'_'+nextballcount+'"]:checked').val() == '7'){
		  gainedruns=0;
		   if($.inArray('9', checkedRun)< 0 && $.inArray('10', checkedRun)<0){
			   if($.inArray('8', checkedRun) >=0){
				   batsmandetail.map(function (person) {
					   $("#bowlerrungiven").val(" ") ;
						  if (person.name == $('input[type="button"][class="player_btn bowler green"]').val()) {
						  $("div #"+bowler_activename+"_"+person.over).append('');
						 } 
						});
				  
			   }else{
				   batsmandetail.map(function (person) {
					   $("#bowlerrungiven").val(gainedruns) ;
						  if (person.name == $('input[type="button"][class="player_btn bowler green"]').val()) {
						  $("div #"+bowler_activename+"_"+person.over).append(" "+''+gainedruns+'');
						 } 
						});
				
			   }
			  
		}
	 }else{
		  gainedruns=$('input[type="radio"][name="radio'+over+"_"+check_ball+'_'+nextballcount+'"]:checked').val();
		  batsman_activename = $('input[type="button"][class="player_btn batsman green"]').val();
		  $("span:contains('"+batsman_activename+"')").append(''+gainedruns+'');
		  batsmandetail.map(function (person) {
			  if (person.name == $('input[type="button"][class="player_btn bowler green"]').val()) {
			  $("div #"+bowler_activename+"_"+person.over).append(" "+''+gainedruns+'');
			  $("#bowlerrungiven").val(gainedruns) ;
			 } 
			});
		}
	  
	 	
	  if(checkedRun.length == '0' ){
		  extraruns='0';  wicket="no";
	}
	  else{
		  extraruns='1';
			  if($.inArray('9', checkedRun)>=0 && $.inArray('8', checkedRun)== -1 ){
			  extraType ="wide";
			  wicket="no";
			 $("#bowlerrungiven").val(gainedruns+"wd") ;
			  batsmandetail.map(function (person) {
				  if (person.name == $('input[type="button"][class="player_btn bowler green"]').val()) {
				  $("div #"+bowler_activename+"_"+person.over).append(" wd");
				 } 
				});
		  }else if($.inArray('10', checkedRun)>=0  && $.inArray('8', checkedRun)== -1){
			  extraType="noball";
			  wicket="no";
				 $("#bowlerrungiven").val(gainedruns+"nb") ;
			  batsmandetail.map(function (person) {
				  if (person.name == $('input[type="button"][class="player_btn bowler green"]').val()) {
				  $("div #"+bowler_activename+"_"+person.over).append(" nb");
				 } 
				});
		  }
		  if($.inArray('8', checkedRun)>=0){
			   wicket="yes";
			   wicketCount++;
			   extraruns='0';
			   if($.inArray('9', checkedRun)>=0 ){
					 $("#bowlerrungiven").val(gainedruns+"wdW") ;
				   batsmandetail.map(function (person) {
						  if (person.name == $('input[type="button"][class="player_btn bowler green"]').val()) {
						  $("div #"+bowler_activename+"_"+person.over).append(" wdW");
						 } 
						});
			   }else if($.inArray('10', checkedRun)>=0 ){
				   batsmandetail.map(function (person) {
						 $("#bowlerrungiven").val("nbW") ;
						  if (person.name == $('input[type="button"][class="player_btn bowler green"]').val()) {
						  $("div #"+bowler_activename+"_"+person.over).append(" nbW");
						 } 
						});
				 }else{
					   batsmandetail.map(function (person) {
							 $("#bowlerrungiven").val("W") ;
							  if (person.name == $('input[type="button"][class="player_btn bowler green"]').val()) {
							  $("div #"+bowler_activename+"_"+person.over).append(" W");
							 } 
							});
					  
			   }
			  $('input[type="button"][class*="player_btn batsman"][data="'+$('input[type="radio"][name="wicketplyr"]:checked').val()+'"]')
			  .removeClass('green lightgreen').addClass('red');
			  batsman_active = $('input[type="button"][class="player_btn batsman red"]').attr('data');
		  }
	}
	  
	
	  //change batsman
	   if((ballcount < 6) && (gainedruns == '1' || gainedruns == '3' || gainedruns == '5')){
		  batsman_active = $('input[type="button"][class="player_btn batsman green"]').attr('data');
		  $('input[type="button"][class="player_btn batsman green"][data="'+oncrease_player+'"]').removeClass('green').addClass('lightgreen');
		  $('input[type="button"][class="player_btn batsman lightgreen"][data="'+offcrease_player+'"]').removeClass('lightgreen').addClass('green');
		oldplayer =  $('input[type="button"][class="player_btn batsman lightgreen"]').val();  
	  }
	   bowlerId = $('input[type="button"][class="player_btn bowler green"]').attr('data'); 
	$.ajax({
		url: "/addRuns",
		data: {
			"over":overcount,
			"ball":check_ball,
			"extraruns":extraruns,
			"extratype":extraType,
			"wicket":wicket,
			"gainedruns":gainedruns,
			"bowler":bowlerId,
			"batsman_id":batsman_active,
			"matchId" : $("#match_id_score").val(),
			"team1Id" : $("#battingteam_id_score").val()
		
		},
		
		method: "POST",
		success: function(result){
		},
		error: function(err) {
			console.log(err);
		}
	});
	
	$.get('/currentScore', function(data) {
});
	

		if ( ($.inArray('9', checkedRun)>=0 &&  $.inArray('8', checkedRun)== -1)  || ($.inArray('10', checkedRun)>=0) && $.inArray('8', checkedRun)== -1  ) {
		radiocount++;
		nextballcount++;
	  var currentRow = $("input:checkbox[class*='overball'][checkclass="+check_ball+"][name='check"+over+"_"+check_ball+"']").parents('tr');
	  var currentTr= currentRow.attr('id');
	  var newrow=$("<tr class="+currentTr+" id='"+check_ball+"_"+nextballcount+"'><td></td>");
	  for(var i=1; i <=10; i++) { 
		  if(i<=7){ 
			  newrow.append("<td><input type='radio'  name='radio"+over+"_"+check_ball+"_"+nextballcount+"' class='overball ball1'" +" checkclass="+check_ball+" value= "+i+" id="+i+" checked="+(i=='7' ? "true":"false")+"></td>");
		  } 
		  else {
			  if(i==8){
				  newrow.append("<td><input type='checkbox' name='check"+over+"_"+check_ball+"_"+nextballcount+"' class='overball ball1 popover-top popover-show' data-bind=popover checkclass="+check_ball+" value=" + i+ " id="+i+" group="+(i=='8' ? "wicket[]":"extra[]")+"></td>");
				    	  
			  }else{
			  newrow.append("<td><input type='checkbox' name='check"+over+"_"+check_ball+"_"+nextballcount+"' class='overball ball1' checkclass="+check_ball+" value=" + i+ " id="+i+" group="+(i=='8' ? "wicket[]":"extra[]")+"></td>");
	     }
		  }
	  } 
	  newrow.append("<td><input type='button' value='OK' class ='ball1' checkclass='"+check_ball+"' id='ball1'></td></tr>");
	  newrow.insertAfter($(this).parents('tr').closest( "tr" ) );
	  flag = 1;
	}
	else if($.inArray('8', checkedRun)>=0){
		  if($.inArray('8', checkedRun)>=0 && $('input[type="radio"][name="wicketplyr"]:checked').val() == undefined ){
			  $(this).parents('tr').find("input:checkbox[class*='overball'][checkclass="+check_ball+"][name='check"+over+"_"+check_ball+"']")
				.prop('checked',false); 
		  }
		ballcount++;
		check_ball++;
		var currentTr= $("input:checkbox[class*='overball'][checkclass="+check_ball+"][name='check"+over+"_"+check_ball+"']").parents('tr').attr('id');
		  var newrow=$("<tr class="+currentTr+" id='"+check_ball+"_"+nextballcount+"'><td>"+check_ball+"</td>");
		  for(var i=1; i <=10; i++) { 
			  if(i<=7){ 
				  newrow.append("<td><input type='radio'  name='radio"+over+"_"+check_ball+"_"+nextballcount+"' class='overball ball1'" +" checkclass="+check_ball+" value= "+i+" id="+i+" checked="+(i=='7' ? "true":"false")+"></td>");
			  } 
			   else {
				  if(i==8){
					  newrow.append("<td><input type='checkbox' name='check"+over+"_"+check_ball+"_"+nextballcount+"' class='overball ball1 popover-top popover-show' data-bind=popover checkclass="+check_ball+" value=" + i+ " id="+i+" group="+(i=='8' ? "wicket[]":"extra[]")+"></td>");
					    	  
				  }else{
				  newrow.append("<td><input type='checkbox' name='check"+over+"_"+check_ball+"_"+nextballcount+"' class='overball ball1' checkclass="+check_ball+" value=" + i+ " id="+i+" group="+(i=='8' ? "wicket[]":"extra[]")+"></td>");
		     }
				  }
		  } 
		  newrow.append("<td><input type='button' value='OK' class ='ball1' checkclass='"+check_ball+"' id='ball1'></td></tr>");
		  newrow.insertAfter($(this).parents('tr').closest( "tr" ) );
		  if($.inArray('8', checkedRun)>=0 && $('input[type="radio"][name="wicketplyr"]:checked').val() == undefined ){
			  $(this).parents('tr').closest('tr').next('tr').find('input[type="radio"],[type="checkbox"],[type="button"]')
			  .prop("disabled",false);
	
		  }else{
		  $(this).parents('tr').closest('tr').next('tr').find('input[type="radio"],[type="checkbox"],[type="button"]')
		  .prop("disabled",true);
		  alert("Please select a Batsman");
		  }	
		 
	enablenextrowflag =  $(this).parents('tr').closest('tr').next('tr').attr('id');
	 $('input[type="button"][class*="player_btn batsman"]').prop('disabled',false);		
	 
	
	}
	else{
		if(checkedRun.length == '0'){
			ballcount++;
		}
		nextballcount = 1;
		check_ball++;
		  
		if(check_ball < 7){
			var currentTr= $("input:checkbox[class*='overball'][checkclass="+check_ball+"][name='check"+over+"_"+check_ball+"']").parents('tr').attr('id');
			  var newrow=$("<tr class="+currentTr+" id='"+over+"_"+check_ball+"_"+nextballcount+"'><td>"+check_ball+"</td>");
			  for(var i=1; i <=10; i++) { 
				  if(i<=7){ 
					  newrow.append("<td><input type='radio'  name='radio"+over+"_"+check_ball+"_"+nextballcount+"' class='overball ball1'" +" checkclass="+check_ball+" value= "+i+" id="+i+" checked="+(i=='7' ? "true":"false")+"></td>");
				  } 
				  else {
					  if(i==8){
						  newrow.append("<td><input type='checkbox' name='check"+over+"_"+check_ball+"_"+nextballcount+"' class='overball ball1 popover-top popover-show' data-bind=popover checkclass="+check_ball+" value=" + i+ " id="+i+" group="+(i=='8' ? "wicket[]":"extra[]")+"></td>");
						    	  
					  }else{
					  newrow.append("<td><input type='checkbox' name='check"+over+"_"+check_ball+"_"+nextballcount+"' class='overball ball1' checkclass="+check_ball+" value=" + i+ " id="+i+" group="+(i=='8' ? "wicket[]":"extra[]")+"></td>");
			     }
					  }
			  } 
			  newrow.append("<td><input type='button' value='OK' class ='ball1' checkclass='"+check_ball+"' id='ball1'></td></tr>");
			  newrow.insertAfter($(this).parents('tr').closest( "tr" ) );
		}
		
	
	}
	
	  if(ballcount==7){
		 
		   overcount++;
		  check_over = $('input[type="button"][class*="over_btn active"]').attr('id');
		  var completed_over =  $("input[type='button'][name='over"+check_over+"']");
		  completed_over.removeClass('active');
		  completed_over.addClass('completed');
		  var nextover=$('input[type="button"][class*="over_btn completed"][name="over'+check_over+'"]').next().attr('id');
		  $("#"+nextover).addClass('active');
		  $("input:checkbox[class*='overball']").prop('checked',false);
		  $("input:radio[class*='overball']").prop('checked',false);
		  $("table#score_table").find("tr:gt(1)").remove();
		  $("table#score_table").find("tr:gt(0)").find('input[type="radio"][id="7"]').prop('checked',true);
		 $("table#score_table").find("tr:eq(1)").find('input[type="radio"]').attr('name',"radio"+nextover+"_1_1");
		 $("table#score_table").find("tr:eq(1)").find('input[type="checkbox"]').attr('name',"check"+nextover+"_1");
		 if($.inArray('8', checkedRun)>=0 ){
			 $("table#score_table").find("tr:eq(1)").find('input[type="radio"],[type="checkbox"],[type="button"]').prop('disabled',true);
					 
		 }else{
		 $("table#score_table").find("tr:eq(1)").find('input[type="radio"],[type="checkbox"],[type="button"]').prop('disabled',true);
		 }
		 //if(gainedruns == '1' || gainedruns == '3' || gainedruns == '5' || gainedruns == '0'){
			   $('input[type="button"][class="player_btn batsman green"][data="'+oncrease_player+'"]').removeClass('green').addClass('lightgreen');
			  $('input[type="button"][class="player_btn batsman lightgreen"][data="'+offcrease_player+'"]').removeClass('lightgreen').addClass('green');
			  oldplayer =  $('input[type="button"][class="player_btn batsman lightgreen"]').val();  	   
		//  }
		 
		 batsmandetail.map(function (person) {
			  if (person.name == $('input[type="button"][class="player_btn bowler green"]').val()) {
					person.over = parseInt(person.over)+1;
			 } 
			});
		 enablenextrowflag =   $("table#score_table").find("tr:eq(1)").attr('id');
		 ballcount=1;
		 $('input[type="button"][class="player_btn bowler green"]').removeClass('green');
		  alert("select a bowler");
		  $('input[type="button"][class="player_btn bowler"]').prop('disabled',false);
	 }
	  
	   if ( $.inArray('9', checkedRun)>=0){
		  var tot_wide=parseInt($('#tot_wide').html())+1;
		  $('#tot_wide').html(tot_wide);
		  $('#tot_totalruns').html(parseInt($('#tot_totalruns').html())+1);
	  } else if( $.inArray('10', checkedRun)>=0 ){
		  var tot_noball=parseInt($('#tot_noball').html())+1;
		  $('#tot_noball').html(tot_noball);
		  $('#tot_totalruns').html(parseInt($('#tot_totalruns').html())+1);
	  }else if( $.inArray('8', checkedRun)>=0 ) {
		  var tot_wicket=parseInt($('#tot_wickets').html())+1;
		  $('#tot_wickets').html(tot_wicket);
	 }
		 var tot_run=parseInt($('#tot_totalruns').html())+parseInt(gainedruns);
		  $('#tot_totalruns').html(tot_run);
	 
	  var tot_extra=parseInt($('#tot_wide').html())+parseInt($('#tot_noball').html());
	  $('#tot_extras').html(tot_extra);
	  
	  console.log("lastover"+lastovercnt);

		if(($('#innings').val()== '1' && overcount == parseInt(lastovercnt)+1 && ballcount==1) || ($('#innings').val()== '1' && wicketCount ==  totalBatsman-1)){
			ballcount=1;
			wicketCount = 0;
			$.get('/startMatch/2', function(data) {
				$('#myModal').modal('toggle');
				   $('#myModal').css('display','block');
				   $('.start-Match').css('display','block');
				   $('.modal-header').css('display','block');
				   $('.modal-footer').css('display','block');
					$("#cancelbtn").hide();
					$(".over-details").hide();
					$(".toss-Match").hide();
					$(".start-Match").html(data);
			});
			$.get('/scoreboard/2', function(data) {
				$(".scoreboard").html(data);

			});
			return false;
		}
		$.ajax({
			url: "/example",
			data: {
				"over":overcount,
				"ball":$(this).attr('checkclass'),
				"bowler":$('input[type="button"][class="player_btn bowler green"]').val(),
				"batsman_oncrease":$('input[type="button"][class="player_btn batsman green"]').val(),
				"batsman_offcrease":oldplayer,
				"TotalRunMade":$('#tot_totalruns').html(),
				"gainedrun":gainedruns,
				"totalNoBall":$('#tot_noball').html(),
				"totalWideBall":$('#tot_wide').html(),
				"totalWicket":$('#tot_wickets').html(),
				"runsgiven":$('#bowlerrungiven').val(),
			},
			
			method: "POST",
			success: function(result){
			},
			error: function(err) {
				console.log(err);
			}
		});
		
		
		
		
		
}else{
	alert("Please select Bowler");
} 
	if(($('#innings').val()== '2' && (overcount == parseInt(lastovercnt)*2+1 && ballcount==1)) || ($('#innings').val()== '2' && wicketCount ==  totalBatsman-1)){
		alert("match finished");
		ballcount=1;
		var matchId = $("#match_id_score").val();
		$.ajax({
			url: "/result",
			data: { 
				'matchId' : matchId 
				},
			method: "POST",
			success: function(result){
				$('#resultModal').modal('toggle');
				console.log(result);
				$(".result-Match").html(result);
			},
			error: function(err) {
				console.log(err);
			}
		});
	}

});


$(document).on('click', 'input[type="button"][class*="over_btn completed"]', function() {
	 $('#myModal').modal('toggle');
	 $("#cancelbtn").show();
	var overId =($(this).attr('id'));
	$(".start-Match").hide();
	$(".over-details").show();
	$(".toss-Match").hide();
	var matchId = $("#match_id_score").val();
	var teamId = $("#battingteam_id_score").val();
	$.ajax({
		url: "/getOverRecord",
		data: {
			overId : overId,
			matchId : matchId,
			teamId : teamId,
		},
		method: "POST",
		success: function(result){
		   $(".start_match_title").html('Over Details');
			$(".start-Match").html('');
			$(".over-details").html(result);
			$("#start_match_btn").hide();
			$("#back_to_home").hide();
		}
	});
	
});




$(document).on('click', "#start_match_btn", function() {
	
	var firstbatsman = $('#1stbatsman_select option:selected').attr('id');
	if(firstbatsman == undefined) {
		$('#1st_batsman_select').html('Select First batsman');
		return false;
	}
	else {
		$('#1st_batsman_select').html('');
	}
	var secondbatsman = $('#2ndbatsman_select option:selected').attr('id');
	if(secondbatsman == undefined) {
		$('#2nd_batsman_select').html('Select Second batsman');
		return false;
	} else if(secondbatsman == firstbatsman) {
		$('#2nd_batsman_select').html('Already selected');
		return false;
	}
	else {
		$('#2nd_batsman_select').html('');
	}
	var firstbowler = $('#1stbowler_select option:selected').attr('id');
	if(firstbowler == undefined) {
		$('#1st_bowler_select').html('Select First bowler');
		return false;
	}
	else {
		$('#1st_bowler_select').html('');
	}
	 $('#myModal').modal('hide');
	 $("div #batsman").find('input[type="button"][id="bat'+firstbatsman+'"]').addClass('green');
	 $("div #batsman").find('input[type="button"][id="bat'+secondbatsman+'"]').addClass('lightgreen');
	 $("div #bowler").find('input[type="button"][id="ball'+firstbowler+'"]').addClass('green');
	 $('#bat1span').html( $('input[type="button"][class="player_btn batsman green"]').val());
	 $('#bat2span').html($('input[type="button"][class="player_btn batsman lightgreen"]').val());
	 $('input[type="button"][class*="player_btn bowler"]').each(function(){
		 batsmandetail.push({name:$(this).val(),over:1});
		});
 
	 $('input[type="button"][class*="player_btn bowler"]').prop('disabled',true);
	 $('input[type="button"][class*="player_btn batsman"]').prop('disabled',true);
	 
	 totalBatsman = $('input[type="button"][class*="player_btn batsman"]').size();
//		alert(totalBatsman);

	});

$(document).on('click', ".vrline", function() {
	 $("#menuline").find("li").removeClass('active');
 $(this).addClass('active');
});
