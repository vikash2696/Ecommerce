/**
 * @author vikash
 */

function deleteUser(id) {
	var del = confirm("Are you confirm?");
	if (del == true) {
		$.get('/deleteuser/' + id + '');
		$.get('/list', function(data) {
			$(document).find('body').html(data);
		});
	}
}
$(document).on("click", '#add_new_player', function() {
	$("#jumbotron").show();
	$("#allScore").hide();
	$("#notificationdiv").hide();
	$.get('/addAsPlayer', function(data) {
		$(".modal-body").html(data);
	});
	$.get('/list', function(data) {
		$(".jumbotron").html(data);
	});
});

$(document).on("click", '#home', function() {
	$("#notificationdiv").show();
	$("#allScore").hide();
	$("#jumbotron").hide();
});

$(document).on("click", '#playeradd', function() {
	$("#allScore").hide();
	var formData = $('#form_id').serializeArray();
	$.ajax({
		url: "/addPlayerData",
		data: formData,
		method: "POST",
		success: function(result){
			if(result.length < 10) {
				for(i = 0; i < result.length; i ++) {
					$("."+result[i].param).html(result[i].msg);
				}
			}
			else {
				$('#myModal').modal('toggle');
			}
		}
	});
	$.get('/list', function(data) {
		$(".jumbotron").html(data);
	});
});

$(document).on("click", '#list_view', function() {
	$("#jumbotron").show();
	$("#allScore").hide();
	$("#notificationdiv").hide();
	$.get('/list', function(data) {
		$(".jumbotron").html(data);
	});
});


//For admin login 

$(document).on("click", '#admin', function() {
	$("#notificationdiv").show();
	$("#allScore").hide();
	$("#jumbotron").hide();
	$.get('/login', function(data) {
		$(".modal-body").html(data);
	});
});

$(document).on("click", '#dash_admin', function() {
	$("#graph_div").css('display',"none");
	$(".scoreboard").css('display','block');
	$.get('/startMatch/1', function(data) {
		if(data == 'NANT'){
			alert("No Match Setting done for today match");
			 $(".dash_admin").removeClass('active');
			 $(".dash_admin").find("a").removeClass('focus');  
			 $(".match_setting").addClass('active').find("a").addClass('focus');
			 $("#graph_div").css('display',"none");
			 $(".scoreboard").css('display','block');
			 $.get('/teamlist', function(data) {
					$(".scoreboard").html(data);
				});
		}else if(data == 'NANM'){
			alert("No Toss selected for today match.First select toss");
			 $(".dash_admin").removeClass('active');
			 $(".dash_admin").find("a").removeClass('focus');  
			 $(".match_setting").addClass('active').find("a").addClass('focus');
			 $("#graph_div").css('display',"none");
			 $(".scoreboard").css('display','block');
			 $.get('/teamlist', function(data) {
					$(".scoreboard").html(data);
				});
		}else{
			   $('#myModal').modal('toggle');
			   $('#myModal').css('display','block');
			   $('.start-Match').css('display','block');
			   $('.modal-header').css('display','block');
			   $('.modal-footer').css('display','block');
				$("#cancelbtn").hide();
				$(".over-details").hide();
				$(".toss-Match").hide();
				$(".start-Match").html(data);
				$.get('/scoreboard/1', function(data) {
					$(".scoreboard").html(data);

				});
		}
	});

});

//For playing team list
$(document).on("click", '#match_setting', function() {
	$("#graph_div").css('display',"none");
	$(".scoreboard").css('display','block');
	$.get('/teamlist', function(data) {
		$(".scoreboard").html(data);
	});

});
//for adding teammember to a team
$(document).on("click", '#add_team', function() {
	$("#graph_div").css('display',"none");
	$(".scoreboard").css('display','block');
	
	$.get('/addTeam', function(data) {
		$(".scoreboard").html(data);
		$( ".draggable" ).draggable({
			revert: 'invalid',
			helper : 'clone',
			opacity: 0.7,
			start : function(event, ui) {
			    ui.helper.width($(this).width());
			    console.log(event.clientX);
			    console.log($(event.target).offset().left);
			    console.log(event.clientY);
			    console.log($(event.target).offset().top);
                $(ui.helper).css("margin-left", event.clientX - $(event.target).offset().left);
                $(ui.helper).css("margin-top", event.clientY - $(event.target).offset().top);
			}
		});
		$( ".droppable" ).droppable({
			hoverClass: "highlight",
			drop: function(ev, ui) {
				//(ui.helper).remove(); //destroy clone
           		
           		if($(this).children('.draggable').length == 0){
           			$(ui.draggable).remove();
           			$(this).append($(ui.draggable).first().clone().attr('droped',1).css({"marginTop": "auto","marginRight": "auto","marginBottom": "auto","marginLeft": "auto"}).draggable({
	           			revert: 'invalid',
						helper : 'clone',
						opacity: 0.7,
						start : function(event, ui) {
						    ui.helper.width($(this).width());
			                $(ui.helper).css("margin-left", event.clientX - $(event.target).offset().left);
			                $(ui.helper).css("margin-top", event.clientY - $(event.target).offset().top);
						}
	           		}));
					var playerId = $(ui.draggable).attr("id");
					var teamId = 0;
					teamId = $(this).parent().attr("id").split("_")[1];
					$.ajax({
						url: "/assignPlayerToTeam",
						data: {
							player_id: playerId,
							team_id: teamId,
						},
						method: "POST",
						success: function(result){
							console.log("kllkjlj");
						}
					});
           		}
           		
			},
		});
		$( ".playerdroppable" ).droppable({
			drop: function(ev, ui) {
				(ui.helper).remove(); //destroy clone
           		$(ui.draggable).remove();
           		$(this).append($(ui.draggable).clone().attr('droped',0).css({"marginTop": "5%","marginRight": "auto","marginBottom": "auto","marginLeft": "auto"}).draggable({
           			revert: 'invalid',
					helper : 'clone',
					opacity: 0.7,
					start : function(event, ui) {
					    ui.helper.width($(this).width());
		                $(ui.helper).css("margin-left", event.clientX - $(event.target).offset().left);
		                $(ui.helper).css("margin-top", event.clientY - $(event.target).offset().top);
					}
           		}));
				var playerId = $(ui.draggable).attr("id");
				var teamId = 0;
				$.ajax({
					url: "/assignPlayerToTeam",
					data: {
						player_id: playerId,
						team_id: teamId,
					},
					method: "POST",
					success: function(result){
						console.log("kllkjlj");
					}
				});
			},
		});
	});
});

function removeDroppableAccept() {
	$(this).droppable('option', 'accept', ui.draggable);
}

function addDroppableAccept() {
	$(this).droppable('option', 'accept', '.draggable');
}
//For select playing 11 player for team 1
$(document).on("change", '#team_A_select', function() {
	$('#team1_name').val($('#team_A_select option:selected').text());
	$('#play_team1_name').val($('#team_A_select option:selected').text());
	var id = $(this).children(":selected").attr("id");

	$.get('/teamPlayer/' + id, function(data) {
		$(document).find('#player_list_A').html(data);
		console.log(data);
	});

});
//For select playing 11 player for team 2
$(document).on("change", '#team_B_select', function() {
	
	$('#team2_name').val($('#team_B_select option:selected').text());
	$('#play_team2_name').val($('#team_B_select option:selected').text());
	var id = $(this).children(":selected").attr("id");
	$.get('/teamPlayer/' + id, function(data) {
		$(document).find('#player_list_B').html(data);
	});

});

//For match setting
$(document).on("click", '#setting_save', function() {
	
	
});


//Save match setting details
$(document).on("click", '.setting_save', function() {
	var team1 = $('#team_A_select :selected').val();

	var team2 = $('#team_B_select :selected').val();
	if(team1 == 0) {
		$('#team1err').html('Select Team 1');
		return false;
	}
	else{
		$('#team1err').html(' ');
	}
	if(team2 == 0) {
		$('#team2err').html('Select Team 2');
		return false;
	}
	else if(team1 == team2){
		$('#team2err').html('Already selected');
		return false;
	}
	else{
		$('#team2err').html(' ');
	}
	var total_over = $('#total_over').val();
	if(total_over <= 0) {
//		$('#team1err').html('Enter the number of over');
		alert('Enter the number of over');
		return false;
	}
	
	var over_limit = $('#over_limit').val();
	if(over_limit <= 0) {
//		$('#team1err').html('Enter the number of over');
		alert('Set the over limit');
		return false;
	}
	
	$.ajax({
		url: "/savesetting",
		data: {
			team1_name:$('#team_A_select :selected').attr("id"),
			team2_name:$('#team_B_select :selected').attr("id"),
			total_over:total_over,
			over_limit:over_limit,
			match_id :$('#match_id').val(),
			
		},
		method: "POST",
		success: function(result){
			console.log(result);
			$("#playing_11_div").css('display','inline-block');
			/*$('.team_info').attr('disabled','disabled');*/
			$("#setting_save").attr('disabled','disabled');
			$(".match_setting_text").attr('disabled','disabled');
			$("#setting_save").attr('disabled','disabled');
		}
	});
});

$(document).on("click",'#edit_match_setting',function() {
	$.get('/editSetting', function(data) {
		$(document).find('#player_list_B').html(data);
	});
});
$(document).on("click", '#new_team_match', function() {
	$('.team_info').attr('disabled',false);
	$(".match_setting_text").attr('disabled',false);
	$("#setting_save").attr('disabled',false);
	$('#match_id').val('');
});

//For match setting	
$(document).on("click", '#match_player_save1', function() {
	var checkedPlayer1=[];
	var team=$('#team_A_select option:selected').attr('id');
	$('input[name="player"][class='+team+']:checked').each(function(){
		console.log($(this).val());
		checkedPlayer1.push($(this).val());
	});
	console.log("player1"+checkedPlayer1);

	$.ajax({
		url: "/playing11",
		data: {
			"player11_id" : checkedPlayer1,
			"team_id" : team,
		},
		method: "POST",
		success: function(result){
			alert("playing 11 selected successfully for first Team...");
			$('.team_info').attr('disabled','disabled');
		}
	});
});

$(document).on("click", '#match_player_save2', function() {
	var checkedPlayer2=[];
	var team=$('#team_B_select option:selected').attr('id');
	$('input[name="player"][class='+team+']:checked').each(function(){
		checkedPlayer2.push($(this).val());
	});
	console.log(checkedPlayer2);
	$.ajax({
		url: "/playing11",
		data: {
			"player11_id" : checkedPlayer2,
			"team_id" : team,
		},
		method: "POST",
		success: function(result){
			$('.team_info').attr('disabled','disabled');
			alert("playing 11 selected successfully for second Team...");
		}
	});
});
	
$(document).on("keyup", '#search_box', function() {
	//$('.setting_update').show();
	var playerName = $('#search_box').val();
	$.ajax({
		url: "/fetchPlayer",
		data: {
			"player_name" : playerName,
		},
		method: "POST",
		success: function(result){
			var data = jQuery.parseJSON(result);
			$('div[droped=0]').remove();
			for(var i = 0; i < data.length ; i += 2) {
				$("#filtered_data").prepend('<div droped="0" class="draggable" style="color:black;border:1px solid black;width:75%;margin:11.5%" id="'+data[i]+'" >'+data[i+1]+'</div>');
			}
			$( ".draggable" ).draggable({
				revert: 'invalid',
				helper : 'clone',
				opacity: 0.7,
				start : function(event, ui) {
				    ui.helper.width($(this).width());
	                $(ui.helper).css("margin-left", event.clientX - $(event.target).offset().left);
	                $(ui.helper).css("margin-top", event.clientY - $(event.target).offset().top);
				}
			});
		}
	});
});

$(document).on("click", '.toss_btn', function() {
	var team1= $("#team_A_select :selected").attr('id');
	var team2= $("#team_B_select :selected").attr('id');
	if(($( 'input[type=checkbox][name=player][class='+team1+']:checked' ).length == 0) &&
			($( 'input[type=checkbox][name=player][class='+team2+']:checked' ).length == 0)){
		
		alert("Please Select Player");
		return false;
	}else{
	
	$.get('/tossMatch', function(data) {
		$('#myModal').modal('toggle');
		$(".modal-header").hide();
		$(".start-Match").hide();
		$("#overdetails").hide();
		$(".toss-Match").css('display','inline-block');
		$(".modal-footer").hide();
//		$(".start_match_title").text("Match Toss");
		$(".toss-Match").html(data);
	});
	}
});


$(document).on("change", '#tournament_year', function() {
	var selectedYear = $('#tournament_year').val();
	$.ajax({
		url: "/fetchSelectedYearData",
		data: {
			"selected_year" : selectedYear,
		},
		method: "POST",
		success: function(result){
			$('#tournament_section2').html(result);
			var noOfRows = $('#team_info tr').length;
			var TotalRows = $("#no_of_teams").val();
			//for(var i = noOfRows - 1  ; i < TotalRows ; i ++) {
				//$('#team_info tr').last().after("<tr><td><input type='text' value='' name='team_name_"+i+"' id='team_name_"+i+"'></td><td><input  type='file' value='' name='logo_"+i+"' id='logo_"+i+"'></td><td><input  type='text' value='' name='captain_"+i+"' id='captain_"+i+"'></td><td><input  type='text' value='' name='no_of_wins' disabled></td><td><input  type='text' value='' name='no_of_loss' disabled></td></tr>");
				//$('#total_rows').val(parseInt($('#total_rows').val()) + 1);
			//}
			var isDisabled = $('#team_info tr').last().find('input#team_name_1').prop('disabled');
			if(noOfRows != 1 && !isDisabled) {
				$('#team_info tr').last().after("<tr><td colspan='5'><input type='button' value='Save' onclick='saveTeamData();'></td></tr>");
			}
		}
	});
});
function saveTournamentData() {
	$.ajax({
		url: "/saveTournamentData",
		data: $("#tournamentForm").serialize(),
		method: "POST",
		success: function(result){
			var isError = result[Object.keys(result)[Object.keys(result).length - 1]].isError;
			if(result.length > 0 && isError) {
				console.log(result);
				for(i = 0; i < result.length; i ++) {

					$("."+result[i].param).html(result[i].msg);
				}
			}
			else {
				$("#tournamentForm").find('span').html("");
				$('#tournamentForm').find('input, textarea, button, select').attr('disabled','disabled');
				$("#team_info").find("tr:gt(0)").remove();
				var noOfTeams = $("#no_of_teams").val();
				for(var i=1,j=0; i <= noOfTeams; i ++,j++) {
					$('#team_info tr').last().after("<tr><td><input type='hidden' name='team_id_"+j+"' value='"+result[i].team_id+"'><input type='hidden' name='tournament_id_"+j+"' value='"+result[i].tournament_id+"'><input type='text' size = '12' name='team_name_"+j+"' value='"+result[i].team_name+"'></td><td><input  type='file' name='logo_"+j+"' value=''></td><td><input size = '12' type='text' name='captain_"+j+"' value='"+result[i].captain_name+"'></td><td><input size = '12'  type='text' value='' disabled></td><td><input size = '12' type='text' value='' disabled></td></tr>");
				}
				$('#team_info tr').last().after("<tr><td colspan='5'><input type='button' value='Save' onclick='saveTeamData();'></td></tr>");
			}
		}
	});
}

function saveTeamData() {
	var fields_data = $("#teamForm").serialize();
	var form_data = new FormData();
	var file_data_pass = '';
	var correctFileFormat = 1;
	for (var i = 0, len=$("#no_of_teams").val(); i < len; i++) {
		if(typeof $('#logo_'+i).prop('files') != "undefined") {
			$.each($('#logo_'+i).prop("files"), function(k,v){
				var filename = v['name'];	
				var ext = filename.split('.').pop().toLowerCase();
				if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
					$('.logo_'+i).html("Upload only image files");
					correctFileFormat = 0
				}
				else {
					file_data_pass = $('#logo_'+i).prop('files')[0];
					form_data.append('logo_'+i, file_data_pass);
				}
			});
		}
	}
	if(correctFileFormat) {
		var arr = fields_data.split("&");
		for(var i = 0 , len= arr.length; i < len; i++) {
			var arr1 = arr[i].split("=");
			arr1[1] = arr1[1].replace('+', ' ');
			form_data.append( arr1[0], arr1[1]);
		}
		$.ajax({
			url : '/saveTeamData',
			cache : false,
			contentType : false,
			processData : false,
			method : 'post',
			data : form_data,
			success : function(result) {
				if(result.length > 0) {
					for(i = 0; i < result.length; i ++) {
						$("."+result[i].param).html(result[i].msg);
					}
				}
				else {
					$("#teamForm").find('span').html("");
					$('#teamForm').find('input, textarea, button, select').attr('disabled','disabled');
					$('#tournamentForm').find('input, textarea, button, select').attr('disabled','disabled');
					alert("Data Saved Successfully");
				}
			},
		});	
	}
}


$(document).on("click", '#toss_save', function() {
	
	var formData = $('#toss_form_id').serializeArray();
	$.ajax({
		url: "/tossUpdateData",
		data:formData,
		method: "POST",
		success: function(result){
			$('#myModal').modal('toggle');
		}
	});
});

$(function() {
	$( "#tournamentWiseScoreCard" ).accordion();
});

function fetchSelectedTournamentMatches(tournament_year) {
	$.ajax({
		url: "/fetchSelectedTournamentMatches",
		data: {
			tournament_year : tournament_year,
		},
		method: "POST",
		success: function(result){
			var html = '';
			console.log(result);
			var len = result.length;
			for(var i = 0 ; i < len; i ++) {
				if(result[i].first_team && result[i].second_team) {
					html += "<a href='javascript:void(0)' onclick=fetchMatchDetails('"+result[i].match_id+"')>"+ result[i].first_team +" V/S "+result[i].second_team+"</a><br/><br/>";
				}
			}
			
			$("#"+tournament_year).html(html);
			
		}
	});
}

function fetchMatchDetails(match_id) {
	$.ajax({
		url: "/fetchMatchDetails",
		data: {
			match_id : match_id,
		},
		method: "POST",
		success: function(result){
			$("#notificationdiv").hide();
			$("#jumbotron").hide();
			$("#allScore").show();
			$("#allScore").html(result);
			$( "#tabs" ).tabs();
		}
	});
}
$(document).on("click", '#tournament_setting', function() {
	$("#graph_div").css('display',"none");
	$(".scoreboard").css('display','block');
	$.get('/tournamentSetting', function(data) {
		$(".scoreboard").html(data);
	});
});

$(document).on('click','#logout',function(){
	window.location.href = '/logout';

});
$(document).on("click", '.dashboard', function() {
	$(".scoreboard").css('display','none');
	$("#graph_div").css('display','block');
graph();
});

$(document).on("click", '#back_to_home', function() {
	$('#myModal').modal('toggle');
	$('#resultModal').hide();
	 $(".dash_admin").removeClass('active');
	 $(".dash_admin").find("a").removeClass('focus');  
	 $(".dashboard").addClass('active').find("a").addClass('focus');
	 $("#graph_div").css('display',"block");
	 $(".scoreboard").css('display','none');
});

$(document).on("click", '#match_done', function() {
	$('#resultModal').modal('toggle');
	 $(".dash_admin").removeClass('active');
	 $(".dash_admin").find("a").removeClass('focus');  
	 $(".dashboard").addClass('active').find("a").addClass('focus');
	 $("#graph_div").css('display',"block");
	 $(".scoreboard").css('display','none');
});
$(document).on("click", '#news_feed', function() {
	$("#graph_div").css('display',"none");
	$(".scoreboard").css('display','block');
	$.get('/newsFeed', function(data) {
		$(".scoreboard").html(data);
	});
});
$(document).on("click", '.news_feed_save', function() {
	var data = $('#news_feed_area').val();
	if(data.length == 0) {
		alert("Write something on News Feed.")
		return false;
	}
	else {
		$.ajax({
			url: "/newsFeed",
			data: {
				news_data : data,
			},
			method: "POST",
			success: function(result){
				alert("News feed added successfully");
			}
		});
	}
});
$( document ).ready(function() {
	$("#jumbotron").hide();
	$("#allScore").hide();
	$.get('/dashboard', function(data) {
		graph(data);
	});
//	graph();
});
function graph(data){
//	console.log(data);
	var key1 = 0 ,key2 = 0 ,key3 = 0 ,key4 = 0,count=0,keywon=0,keyloss=0,keydraw=0,keyplayed=0;
	var graph1Data=[],graph2Data=[],graph3Data=[],graph4Data=[],chart,graph1Name=[],graphTeam=[],graph4Player =[],graph4RunName =[],graph4RunData =[];
	var player =0,run=0,runData = 0;
	var graph1Datawon=[],graph1Dataloss=[],graph1Datadraw=[],graph1Dataplayed = [];
	  $.each( data, function( key, value ) {
		  if(value.tournament_year) {
			  graph3Data[key3++] = {name: value.tournament_year+ " " +value.tournament_name, data: [value.no_of_teams,value.max_number_of_players]};
		  }
		  else if(value.captain){
			  graph2Data[key2++] = [value.team_name + " "+ value.tournament_name,value.no_of_won_match];
			  graph1Datawon[keywon++] = [value.no_of_won_match];
			  graph1Dataloss[keyloss++] = [value.no_of_loss_match];
			  graph1Datadraw[keydraw++] = [value.no_of_draw_match];
			  graph1Dataplayed[keyplayed++] = [value.no_of_won_match+value.no_of_loss_match+value.no_of_draw_match];
			  graphTeam[count++] = [value.team_name];
			  
		  }
		  else if(value.batsman_run) {
//			  console.log(value);
			  graph4Player[player++] = value.first_name + " "+ value.last_name;
			  graph4RunName[run++] = value.first_name+ " "+ value.last_name;
			  graph4RunData[runData++] = value.batsman_run;
		  }
    	});
//	  console.log(graph4Player);
//	  console.log(graph4Run);
    $('#container1').highcharts({
    	 chart: {
             type: 'column'
         },
         title: {
             text: 'Current Tournament Status'
         },
         subtitle: {
             text: 'OPL: osscube.com'
         },
         xAxis: {
             categories: graphTeam,
             crosshair: true
         },
         yAxis: {
             min: 0,
             title: {
                 text: 'Values'
             }
         },
         tooltip: {
             headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
             pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                 '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
             footerFormat: '</table>',
             shared: true,
             useHTML: true
         },
         plotOptions: {
             column: {
                 pointPadding: 0.2,
                 borderWidth: 0
             }
         },
         series: [{
        	 name : 'Total Played match',
        	 data : graph1Dataplayed
         },
         {
        	 name : 'No of won match',
        	 data : graph1Datawon
         },
         {
        	 name : 'No of Loss match',
        	 data : graph1Dataloss
         },
         {
        	 name : 'No of Draw match',
        	 data : graph1Datadraw
         }]
    });
    
    $('#container2').highcharts({
  
              chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: 'pie'
              },
              title: {
                  text: 'Number Of Won Match Status Of Tournament (Current Year)'
              },
              tooltip: {
          	    pointFormat: '{series.name}: <b>{point.y}</b>',
              	percentageDecimals: 1
              },
              series: [{
            	  name: 'No of won match',
            	  data: graph2Data
              }]

    });

    $('#container3').highcharts({
    	 title: {
             text: 'Tournament',
             x: -20 //center
         },
         subtitle: {
             text: 'Tournament Summary',
             x: -20
         },
         xAxis: {
             categories: ['No of team','Max no of player']
         },
         yAxis: {
             title: {
                 text: 'Value'
             },
             plotLines: [{
                 value: 0,
                 width: 1,
                 color: '#808080'
             }]
         },
         legend: {
             layout: 'vertical',
             align: 'right',
             verticalAlign: 'middle',
             borderWidth: 0
         },
       	  series: graph3Data
       
    });
    
    $('#container4').highcharts({
    	chart: {
            type: 'column'
        },
        title: {
            text: 'Top 5 Batsman of the Tournament(Current Tournament Status)'
        },
        subtitle: {
            text: 'OPL: osscube.com'
        },
        xAxis: {
            categories: graph4Player,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Runs'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
       series: [{
	        name : 'Run:',
	        data: graph4RunData,
    	 }]
    });


}
