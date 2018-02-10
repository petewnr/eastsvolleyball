$(document).ready(function()
{
	console.log("index_script.js is alive");
	
	var newsitems;
	// get news
	
	$.ajax({
		type: 'POST',
		url: '../server/get/get_news.php',
		success: function(data)
		{
			console.log("get success");
			newsitems = $.parseJSON(data);
			console.log(newsitems.length);
			addNewsToPage(newsitems);
		},
		error: function(err)
		{
			console.log("Error getting news");
		}
	});
	
});

// external functions below here

function addNewsToPage(news)
{
	var newshtml;
	
	for(var i=0; i<news.length; i++)
	{
		newshtml = '<div class="panel panel-default" data-newsitem="';
		newshtml += news[i].news_id;
		newshtml += '">';
		newshtml += '<div class="panel-body back-grey">';
		newshtml += '<h4>';
		newshtml += news[i].news_headline;
		newshtml += '</h4>';
		newshtml += '<p>';
		newshtml += news[i].news_splash;
		newshtml += '</p>';
		newshtml += '<p><a href="events_main.php?eventid=';
		newshtml += news[i].news_eventid;
		newshtml += '">'
		newshtml += news[i].news_actiontext;
		newshtml += '</a>';
		newshtml += '</div>';
		newshtml += '</div>';
		
		var newsinject = $.parseHTML(newshtml);
	
		console.log(newshtml);
		
		$("#news-items").append(newsinject);
	}

}
