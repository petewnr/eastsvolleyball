<?PHP

session_start();

include 'server/inc/easts_main_header.php';

?>

<div class="container">

	<div class="row">
	
		<h3>People registered for <span id='event_name'></span></h3>
		<br />
		
	</div> <!-- .row -->
	
	<div class="row">
	
		<div class="col-md-2" id="filter_buttons">
		
			<button class='btn btn-warning btn-block filter_button' data-filter=' ' id='btn_showall'>Show all</button>
		
		</div> <!-- #filter_buttons -->
	
		<div class="col-md-10" id="people_registered_list">
		
		</div> <!-- #people_registered_list -->
		
	</div> <!-- .row -->
	
</div> <!-- .container -->

<script src="js/events_people_registered_script.js"></script>


<?PHP
include 'server/inc/easts_footer.php';
?>