$(document).ready(function()
{

	//get event id
	
	//$('#submit_button').hide();
	
	var eventid;
	var new_ep_html;
	
	var thisPageURL = window.location.search.substring(1);
	var URLVariables = thisPageURL.split('&');
	//console.log(URLVariables.length);
	if (URLVariables.length == 1)
	{
		var URLParameter = URLVariables[0].split("=");
		eventid = URLParameter[1];
		console.log(eventid);
		getEventMainData(eventid);
	}
	else
	{
		console.log("error with eventid in URL");
	}
	
	$('#btn_signup').click(function(){
		var fname = $('#signupFirstName').val();
		var lname = $('#signupLastName').val();
		var phone = $('#signupContactPhone').val();
		
		var checkedOptions = "";
		
		$('.responseoptions:checked').each(function(){
			checkedOptions += $(this).attr('data-option');
			checkedOptions += " ";
		});
		console.log(fname + " " + lname + " " + phone);
		console.log(checkedOptions);
		
		var responseproblems = "Please fix the following issues with your sign-up:\n";
		var problemscount = 1;
		var isresponseproblems = false;
		
		if (fname.length==0)
		{
			responseproblems += problemscount + ". Please complete your first name.\n";
			isresponseproblems = true;
			problemscount ++;
		}
		
		if (lname.length==0)
		{
			responseproblems += problemscount + ". Please complete your last name.\n";
			isresponseproblems = true;
			problemscount ++;
		}
		
		if (phone.length==0)
		{
			responseproblems += problemscount + ". Please complete your contact phone number.\n";
			isresponseproblems = true;
			problemscount ++;
		}
		
		if (checkedOptions.length==0)
		{
			responseproblems += problemscount + ". Please select your response option/s.\n";
			isresponseproblems = true;
			problemscount ++;
		}
		
		if (isresponseproblems)
		{
			window.alert(responseproblems);
		}
		else
		{
			console.log("submitdata");
			
			$("#submit_button").hide();
			$("#event_details").empty();
			
			$.ajax({
				type: 'POST',
				url: 'server/post/add_signup_details.php',
				data:
				{
					"eventid" : eventid,
					"fname" : fname,
					"lname" : lname,
					"phone" : phone,
					"checkedOptions" : checkedOptions
				},
				success: function(response){
				
					console.log("success");
					var submitresponse = "";
					submitresponse += "<div class='col-md-6 element_centre'>";
					submitresponse += "<br />";
					submitresponse += "<p class='text-left'>Hey ";
					submitresponse += fname;
					submitresponse += ",</p>";
					submitresponse += "<h4 class='text-orange'>You're registered!</h4>";
					submitresponse += "<p class='text-left'>Thanks for signing on!  We got your options as: </p>";
					submitresponse += "<p class='text-orange'>";
					submitresponse += checkedOptions;
					submitresponse += "</p>";
					submitresponse += "<p class='text-left'>Please watch the eastsvolleyball facebook page for any updates or news about this event.</p>";
					submitresponse += "<p class='text-left'>If you have any questions about the event or need to contact us, just message us through facebook.</p>";
					submitresponse += "<p class='text-left text-orange'>eastsvolleyball</p>";
					submitresponse += "</div>";
			
					var submitresponsehtml = $.parseHTML(submitresponse);
					$("#event_details").append(submitresponsehtml);
				
				},
				error: function(err){
					var submitresponse = "";
					submitresponse += "<div class='col-md-6 element_centre'>";
					submitresponse += "<br />";
					submitresponse += "<p class='text-left'>Hey ";
					submitresponse += fname;
					submitresponse += ",</p>";
					submitresponse += "<h4 class='text-orange'>Oops!  Problem!</h4>";
					submitresponse += "<p class='text-left'>Sorry!  But there was a problem registering your sign-on.</p>";
					submitresponse += "<p class='text-left'>You can either try again (refresh the page), or just message us through facebook.</p>";
					submitresponse += "<p class='text-left'>Once again, sorry for the problem.</p>";
					submitresponse += "<p class='text-left text-orange'>eastsvolleyball</p>";
					submitresponse += "</div>";
			
					var submitresponsehtml = $.parseHTML(submitresponse);
					$("#event_details").append(submitresponsehtml);
				}
			});
			
			
		}
		
		
	});
	
	function validateSignUp()
	{
		console.log("sign up button clicked");
	}

});

// external functions 

function getEventMainData(eventid)
{
	console.log("Set up page for event no "+eventid);
	
	var eventdata;
	var ep_html;
	
	$.ajax({
		type: 'POST',
		url: 'server/get/get_event_details_eventid.php',
		data:
		{
			"eventid" : eventid
		},
		success: function(data){
			console.log("get success");
			eventdata = $.parseJSON(data);
			console.log(eventdata.length);
			setUpEventMainPage(eventdata);
		},
		error: function(err){
			console.log("Error getting event details "+err);
		}
	});
	
}

function setUpEventMainPage(eventdata)
{
	var eventPageDetails;
	
	$('#event_title').text(eventdata[0].event_name);
	
	if (eventdata[0].event_signup)
	{
		eventPageDetails = "<div class='col-md-6'>";
	}
	else
	{
		eventPageDetails = "<div class='col-md-8 element_centre' id='signupblock'>";
	}
	
	eventPageDetails += "<h4 class='text-left'>Details</h4>";
	eventPageDetails += "<p class='text-left'>";
	eventPageDetails += eventdata[0].event_details;
	eventPageDetails += "</p>"
	eventPageDetails += "<h4 class='text-left'>Venue: </h4><p class='text-left'>";
	eventPageDetails += eventdata[0].event_venue;
	eventPageDetails += "</p>";
	eventPageDetails += "<h4 class='text-left'>Date: </h4><p class='text-left'>";
	eventPageDetails += eventdata[0].event_start_date;
	eventPageDetails += "</p>";
	eventPageDetails += "<h4 class='text-left'>Start time: </h4><p class='text-left'>";
	eventPageDetails += eventdata[0].event_start_time;
	eventPageDetails += "</p>";
	eventPageDetails += "</div> <!-- event info col -->";
	
	if (eventdata[0].event_signup)
	{
		eventPageDetails += "<div class='col-md-6'>";
		eventPageDetails += "<h4 class='text-left'>Sign-up</h4>";
		eventPageDetails += "<form>";
		eventPageDetails += "<div class='form-group'>"
		eventPageDetails += "<label class='sr-only' for='signUpFirstName'>First Name</label>";
		eventPageDetails += "<input class='form-control' id='signupFirstName' placeholder='Your first name'>";
		eventPageDetails += "</div>";
		eventPageDetails += "<div class='form-group'>"
		eventPageDetails += "<label class='sr-only' for='signUpLastName'>Last Name</label>";
		eventPageDetails += "<input class='form-control' id='signupLastName' placeholder='Your last name'>";
		eventPageDetails += "</div>";
		eventPageDetails += "<div class='form-group'>"
		eventPageDetails += "<label class='sr-only' for='signUpContactPhone'>Contact phone</label>";
		eventPageDetails += "<input class='form-control' id='signupContactPhone' placeholder='Your contact phone number'>";
		eventPageDetails += "</div>";
		eventPageDetails += "</form>";
		
		if(eventdata[0].event_signup_options.length > 2)
		{
			eventPageDetails += "<p class='text-left'>Select:</p>";
			var eventoptions = eventdata[0].event_signup_options.split(',');
			for (var j=0; j<eventoptions.length; j++)
			{
				eventPageDetails += "<div class='checkbox text-left'>";
				eventPageDetails += "<label><input type='checkbox' name='eventoptions' class='responseoptions'";
				eventPageDetails += "data-option='";
				eventPageDetails += eventoptions[j];
				eventPageDetails += "'>";
				eventPageDetails += eventoptions[j];
				eventPageDetails += "</label>";
				eventPageDetails += "</div>";
			}
		}
		eventPageDetails += "</div>";
	}
	
	
	
	var eventPageHTML = $.parseHTML(eventPageDetails);
	
	$('#event_details').append(eventPageHTML);
	$('#submit_button').show();
}