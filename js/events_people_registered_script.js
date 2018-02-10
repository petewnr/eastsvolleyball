$(document).ready(function(){
	
	console.log("events_people_registered_script.js is alive");
	
	var event_details;
	var eventid;
	
	var thisPageURL = window.location.search.substring(1);
	var URLVariables = thisPageURL.split('&');
	//console.log(URLVariables.length);
	if (URLVariables.length == 1)
	{
		var URLParameter = URLVariables[0].split("=");
		eventid = URLParameter[1];
		console.log(eventid);
		getEventDetails(eventid);
	}
	else
	{
		console.log("error with eventid in URL");
	}
	
	// get event details
	
	$(document).on('click', 'button.filter-button', function(){
		var filterterm = $(this).attr('data-filter');
		console.log(filterterm);
		$('.registered_people').each(function(){
			if ($(this).attr('data-options').indexOf(filterterm) < 0)
			{
				$(this).hide();
			}
			else
			{
				$(this).show();
			}
		});
	});
	
	$('#btn_showall').click(function(){
		$('.registered_people').show();
		console.log("showing all?");
	});
	
});

function getEventDetails(eventid)
{

	$.ajax({
			type: 'POST',
			url: '../server/get/get_event_details_eventid.php',
			data: {
				"eventid" : eventid
			},
			success: function(data)
			{
				console.log("get success");
				event_details = $.parseJSON(data);
				console.log(event_details.length);
				
				$('#event_name').text(event_details[0].event_name);
				
				createFilterButtons(event_details);
			},
			error: function(err)
			{
				console.log("Error getting events");
			}
		});
	
};

function createFilterButtons(event_details)
{
	var event_options = event_details[0].event_signup_options.trim().split(",");

	if(event_options.length > 0)
	{
		var buttonscode = "";
		
		for (var i=0; i<event_options.length; i++)
		{
			buttonscode += "<button class='btn btn-default btn-block filter-button' data-filter='";
			buttonscode += event_options[i];
			buttonscode += "'>";
			buttonscode += event_options[i];
			buttonscode += "</button>";
		}
		
		var buttonsHTML = $.parseHTML(buttonscode);
		
		$('#filter_buttons').append(buttonsHTML);
		
		getPeopleRegistered(event_details);
	}

}

function getPeopleRegistered(event_details)
{
	var people_registered;
	var eventid = event_details[0].event_id;
	
	$.ajax({
			type: 'POST',
			url: '../server/get/get_people_for_event_eventid.php',
			data: {
				"eventid" : eventid
			},
			success: function(data)
			{
				console.log("get success");
				people_registered = $.parseJSON(data);
				console.log(people_registered.length);
				createPeopleList(people_registered);
			},
			error: function(err)
			{
				console.log("Error getting events");
			}
		});
}

function createPeopleList(people_registered)
{
	var peopleblock = "";
	peopleblock += "<table class='table'>";
	
	for (var i=0; i < people_registered.length; i++)
	{
		peopleblock += "<tr class='text-left registered_people' data-options='";
		peopleblock += people_registered[i].options;
		peopleblock += "'>";
		peopleblock += "<td>";
		peopleblock += people_registered[i].first_name + " " + people_registered[i].last_name;
		peopleblock += "</td>";
		peopleblock += "<td>";
		peopleblock += people_registered[i].phone;
		peopleblock += "</td>";
		peopleblock += "<td>";
		peopleblock += $.trim(people_registered[i].options);
		peopleblock += "</td>";
		peopleblock += "</tr>";
	}
	
	peopleblock += "</table>";
	
	var peopleHTML = $.parseHTML(peopleblock);
	
	$('#people_registered_list').append(peopleHTML);

}

