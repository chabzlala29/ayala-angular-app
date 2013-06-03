$(function(){
	$('#search-store').keyup(function(){
		if($(this).val()){
			$('.alpha-container').css('display','none');
			$('#hidden-query').css('display','block');
		}else{
			$('.alpha-container').css('display','block');
			$('#hidden-query').css('display','none');
		}
	});
	$('#category-name').click(function(){
		$('#stores-by-category-container').css('display','none');
		$('#stores-name').css('background-color', 'transparent');
		$('#stores-name').css('color', 'rgb(85, 100, 129)');
		$('#category-name').css('background-color', 'rgb(85, 100, 129)');
		$('#category-name').css('color', 'rgb(255, 255, 255)');
		$('#stores-container').css('display','none');
		$('#categories-container').css('display', 'block');

		$('#categories-container').find('li:not(:first)').click(function(){
			$('#category-name').css('background-color', 'transparent');
			$('#category-name').css('color', 'rgb(85, 100, 129)');
			$('#stores-name').css('background-color', 'rgb(85, 100, 129)');
			$('#stores-name').css('color', 'rgb(255, 255, 255)');
			$('#stores-by-category-container').css('display','block');
			$('#stores-container').css('display','none');
			$('#categories-container').css('display', 'none');
		});
	});
	$('#stores-name').click(function(){
		$('#stores-by-category-container').css('display','none');
		$('#category-name').css('background-color', 'transparent');
		$('#category-name').css('color', 'rgb(85, 100, 129)');
		$('#stores-name').css('background-color', 'rgb(85, 100, 129)');
		$('#stores-name').css('color', 'rgb(255, 255, 255)');
		$('#stores-container').css('display','block');
		$('#categories-container').css('display', 'none');
	});

	
});