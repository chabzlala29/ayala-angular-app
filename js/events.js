$(function(){
	$events = $('#events-list').children().length;
	if($events == 1){
		alert("This Mall's Events List is empty.");
		url = window.location.href;
		document.location = url.replace('/events', '');
	}
})