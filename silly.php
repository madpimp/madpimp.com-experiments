<?php
	require('includes/header.php');
?>
	
		<div id="canvas_container">
			<canvas id="mycanvas" width="600" height="600">        </canvas>
		</div>
		<article>
			Messing around with Canvas capabilities and the kinetic2d library.<br/>
			Click and drag items to move items around.<br/>
			Click and drag corners to resize.<br/>
			Click on pink button to toggle corners<br/>
		</article>
<?php
	$mycanvas = "true";
	require('includes/footer.php');
?>