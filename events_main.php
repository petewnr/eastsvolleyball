<?PHP

session_start();

include 'server/inc/easts_main_header.php';

?>

<div class="container">

	<div class="row">
	
		<h3><span id="event_title"></span></h3>
		
	</div> <!-- .row -->
	
	<div class="row" id="event_details">
		
	</div> <!-- .row -->
	
	<div class="row" id="submit_button">
		<button type='button' class='btn btn-success' id='btn_signup'>Sign-up</button>
	</div>
	
</div> <!-- .container -->

<script src="js/events_main_script.js"></script>


<?PHP
include 'server/inc/easts_footer.php';
?>