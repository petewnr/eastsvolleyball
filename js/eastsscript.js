jQuery(document).ready(function($) {

	// interactions
	
	$('#contact').click(function(){
		$('#contactus').modal('toggle');
	});
	
	$('#contactsubmit').click(function(){
		console.log("submit contact form");
		
		var form_name = $('#f_name').val();
		var form_email = $('#f_email').val();
		var form_text = $('#f_text').val();
		
		console.log(form_name + " " + form_email + " " + form_text);
		
		var data = "";
		data += "f_name="+form_name;
		data += "&f_email="+form_email;
		data += "&f_text="+form_text;
				
		$.ajax({
			async: false,
			method: "POST",
			url: "../server/php/sendemail_contact.php",
			data: data,
			
			success: function(msg) {
				console.log(msg);
				console.log("Contact messages emailed from " + form_name);
				//addMessage ("success", "Email to "+emaildetails[1]+" sent.");
				
			},
			error: function(error){
				console.log(error);
			}
			
		});
		
		$('#contactus').modal('toggle');
	});
	
	$('#showemail').click(function(){
		var emailaddress = "easts";
		emailaddress += "@";
		emailaddress += "eastsvolleyball.club";
		
		console.log(emailaddress);
		
		$('#eastsemail').append(emailaddress);
	});

});