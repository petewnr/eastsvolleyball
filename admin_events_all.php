<?PHP

session_start();

include 'server/inc/easts_main_header.php';

?>

<div class="container">

	<div class="row">
	
		<h3>list of all events</h3>
		
	</div> <!-- .row -->
	
	<div class="row" id="event_list">
		
	</div> <!-- .row -->
	
</div> <!-- .container -->

<script src="js/events_list_script.js"></script>


<?PHP
include 'server/inc/easts_footer.php';
?>