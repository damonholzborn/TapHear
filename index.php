<html lang="en">
<head>
	<meta charset="utf-8" />
	<!-- <meta name="viewport" content="width=device-width, initial-scale = 1.0" />
	<meta name="viewport" content="width=336, initial-scale=1, minimum-scale=1, maximum-scale=1"> -->
	<meta name="viewport" content="width=348, user-scalable=no">
	<title>Tap Hear - Rustle Works</title>
	<!--
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
	<script src="textillate/jquery.fittext.js"></script>
	<script src="textillate/jquery.lettering.js"></script>
	<script src="textillate/jquery.textillate.js"></script>
	<link href="textillate/animate.css" rel="stylesheet">
	<link href="textillate/style.css" rel="stylesheet">
	-->

	<script src="//use.typekit.net/ahe3lnc.js"></script>
	<script>try{Typekit.load();}catch(e){}</script>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>

	<script type='application/javascript' src='fastclick.js'></script>
	
	<script type="text/javascript" src="/includes/scripts.js"></script>
	<script type="text/javascript" src="taphear.js"></script>

	<link rel="stylesheet" type="text/css" href="/includes/style.css">
	<link rel="stylesheet" type="text/css" href="taphearstyle.css">

	<link rel="stylesheet" type="text/css" href="bounce/bounceinplace.css">

</head>

<body onload="loadBang();">

<?php readfile($_SERVER['DOCUMENT_ROOT'] . '/includes/menu.inc'); ?>

<div class="page" id="pagecontent">
	<div class="contentall">
	
		<div class="header">
		
			<div class="header_menutab" id="menutab">
				<a href="javascript:menuToggle();" id="menutabtext">&#8801;</a></a>
			</div>
		
			<div class="header_logo">
				<img src="taphear_logo_proxima_nova.png" width="336" height="86" alt="tap hear" />
			</div>
			
		</div>
		
		<div id="taphearinterface">
			<div id="taphearbuttons">
				<a href="javascript:auto();" id="helpbutton">auto</a> - <a href="javascript:autoOn = !autoOn" id="helpbutton">toggle</a> - <a href="javascript:hearABunch();" id="helpbutton">how to play</a>
			</div>
			<div id="taphearformarea">
				<form id="taphearform" action="javascript:addNewWord()"><input id="wordInput" autocapitalize="off" autocorrect="off" size="30"><input id="wordSubmit" type="submit" value="tap"></form>
			</div>
		</div>
	
		<div class="card">
		
			<div id="wordcloud"></div>

		</div>
			
	</div>
</div>

<?php readfile($_SERVER['DOCUMENT_ROOT'] . '/includes/footer.inc'); ?>

</body>
</html>
