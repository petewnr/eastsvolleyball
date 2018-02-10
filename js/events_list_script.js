$(document).ready(function()
{

	console.log("events_list_script.js is alive");
	
	var events;
	// get news
	
	$.ajax({
		type: 'POST',
		url: '../server/get/get_events_all.php',
		success: function(data)
		{
			console.log("get success");
			events = $.parseJSON(data);
			console.log(events.length);
			addEventsToPage(events);
		},
		error: function(err)
		{
			console.log("Error getting events");
		}
	});
	
	


});

function addEventsToPage(events)
	{
		console.log(events.length);
	
		var eventsListBlock = "";
		
		eventsListBlock += "<div class='col-md-8 element_centre'>";
		eventsListBlock += "<table class='table'>";
		eventsListBlock += "<tr>";
		eventsListBlock += "<th>Event Name</th>";
		eventsListBlock += "<th>Event ID</th>";
		eventsListBlock += "<th>Event date</th>";
		eventsListBlock += "<th>Actions</th>";
		eventsListBlock += "</tr>";
		
		
		
		for (var i=0; i<events.length; i++)
		{
			eventsListBlock += "<tr>";
			eventsListBlock += "<td class='text-left'>";
			eventsListBlock += events[i].event_name;
			eventsListBlock += "</td>";
			eventsListBlock += "<td class='text-left'>";
			eventsListBlock += events[i].event_id;
			eventsListBlock += "</td>";
			eventsListBlock += "<td class='text-left'>";
			eventsListBlock += events[i].event_start_date;
			eventsListBlock += "</td>";
			eventsListBlock += "<td class='text-left'>";
			eventsListBlock += "<a class='btn btn-warning' role='button' href='events_people_registered.php?eventid=";
			eventsListBlock += events[i].event_id;
			eventsListBlock += "'>People Registered</button>";
			eventsListBlock += "</td>";
			eventsListBlock += "</tr>";
		}
		
		eventsListBlock += "</table>";
		eventsListBlock += "</div>";
		
		var eventsListHTML = $.parseHTML(eventsListBlock);
		
		$('#event_list').append(eventsListHTML);
	}