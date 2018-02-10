<?PHP
session_start();

include 'server/inc/easts_main_header.php';

?>

<div class="container">

	<div class="row">
		<div class="col-md-3 element_centre" id="brand-block">
			<img src="assets/easts_logo.png" class="img-responsive center-block" alt="Easts Logo">
		</div> <!-- #brand-block -->
	</div> <!-- .row -->
	
	<div class="row">
		<h2>easts volleyball club</h2>
	</div>
	
	<div class="row">
		<div class="col-md-3 element_centre" id="news-head">
			<h3 class="text-orange">news</h3>
		</div> <!-- .news -->
	</div>
	
	<div class="row">
		<div class="col-md-5 element_centre" id="news-items">
		<!-- index_script.js will complete this -->
		</div>
	</div>

</div> <!-- .container -->

<script src="js/index_script.js"></script>

<?PHP

include 'server/inc/easts_footer.php';

?>