$(function(){
	$('#btn-edit-favorites').click(function(){
		$('#btn-edit-favorites').hide();
		$('#btn-done-favorites').show();
		$('#favorites').hide();
		$('#delete-label').show();
		$('#delete-favorites').show();
	});

	$('#btn-done-favorites').click(function(){
		$('#btn-edit-favorites').show();
		$('#btn-done-favorites').hide();
		$('#favorites').show();
		$('#delete-label').hide();
		$('#delete-favorites').hide();
	});
	
})