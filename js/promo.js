$(function(){
	$promo = $('#promos-list').children().length;
	if($promo == 1){
		alert("This Mall's Promo List is empty.");
		url = window.location.href;
		document.location = url.replace('/promos', '');
	}
})