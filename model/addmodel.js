var connection = require('../connection');
exports.fetchHomePageDataForYear = function(data,res) {
	console.log(data);
	var teamArray = new Array();
	var matchData = new Array();
	var tournamentData = new Array();
	var distinctYear = new Array();
	var year = new Date().getFullYear();
	if(typeof data.tournament_year != "undefined") {
		year = data.tournament_year;
	}
	var newsData = [];
	var newsFeedSql = "SELECT  news from news_feed order by id desc limit 1";
	var newsFeed = connection.query(newsFeedSql);
	newsFeed.on('result', function(news) {
		console.log(news.news);
		newsData.push(news.news);
	});
	var teamSql = "SELECT te.id, te.team_name FROM tournament as t LEFT JOIN team as te ON te.tournament_id = t.id WHERE t.tournament_year = ?";
	var teamObj = connection.query(teamSql , [year]);
	teamObj.on('result', function(rows) {
		teamArray[rows.id] = rows.team_name;
	}).on('end',function(){
		var matchSql = "SELECT mi.id,t.tournament_name, t.tournament_year,mi.first_team,mi.second_team FROM team as te INNER JOIN match_info as mi ON te.id = mi.first_team RIGHT JOIN tournament as t ON te.tournament_id = t.id";
		console.log(matchSql);
		var matchObj = connection.query(matchSql);
		matchObj.on('result', function(rows) {
			if(rows.tournament_year == year) {
				matchData.push({
					first_team: teamArray[rows.first_team],
					second_team: teamArray[rows.second_team],
					match_id: rows.id,
					tournament_name: rows.tournament_name +" - "+rows.tournament_year,
					tournament_year: rows.tournament_year,
					news_feed : newsData,
				});
			}
			else {
				if(distinctYear.indexOf(rows.tournament_year) == -1) {
					tournamentData.push({
						match_id: rows.id,
						tournament_name: rows.tournament_name +" - "+rows.tournament_year,
						tournament_year: rows.tournament_year,
					});
					distinctYear.push(rows.tournament_year);
				}
				
			}
		}).on('end',function(){
			if(typeof data.tournament_year != "undefined") {
				res.send(matchData);
			}
			else {
				console.log(tournamentData);
				res.render('pages/index', {
					matchList : matchData,
					tournamentData : tournamentData,
					news_feed : newsData,
				});
			}
			
		});
	});
};

