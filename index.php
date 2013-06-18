<!DOCTYPE html>
<html ng-app="ayalamalls">
<head>
    <?php session_start(); ?>
  	<meta charset="utf-8" />
  	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
  	<title>Ayala Malls 360</title>
    <link rel="stylesheet" type="text/css" href="css/misc.css">
  	<link rel="stylesheet" type="text/css" href="css/jquery.mobile.iscrollview.css">
  	<!-- <link rel="stylesheet" type="text/css" href="css/bootstrap.css"> -->
  	
    <script type="text/javascript" src="js/main.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true"></script>
  	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
  	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular-resource.min.js"></script>
  	<script type="text/javascript" src="js/app.js"></script>
    <script type="text/javascript" src="js/services.js"></script>
    <script type="text/javascript" src="js/malls.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript">
      // $.ready(function() {
      //     $(".button").forEach(function(button) {
      //         button.bind("touchstart", function() { button.addClass("touched"); });
      //         button.bind("touchend", function() { button.removeClass("touched"); });
      //     });
      // });
    </script>
</head>
<body data-email='test' data-token='test' ng-view>
</body>
</html>