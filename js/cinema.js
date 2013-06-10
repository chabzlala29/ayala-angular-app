$(function(){
	$('a#coming-soon').click(function(){
		$('a#now-showing').css('background', 'none')
		$(this).css('background', 'rgba(95, 95, 95, 0.701961)')
		$('#now-showing-container').css('display','none')
		$('#coming-soon-container').css('display','block')
	});
	$('a#now-showing').click(function(){
		$('a#coming-soon').css('background', 'none')
		$(this).css('background', 'rgba(95, 95, 95, 0.701961)')
		$('#now-showing-container').css('display','block')
		$('#coming-soon-container').css('display','none')
	});

})