<?php 
	$action = $_GET['action'];
	session_start();

	if($action == 'token'){
		setToken($_GET['token']);
	}else if($action == 'email'){
		setEmail($_GET['email']);
	}else if($action == 'getToken'){
		getToken();
	}else if($action == 'getEmail'){
		getEmail();
	}else{

	}

	function getToken(){
		echo $_SESSION['token'];
	}

	function getEmail(){
		echo $_SESSION['token'];
	}


	function setToken($token){
		$_SESSION['token'] = $token;
		echo $token;
	}
	function setEmail($email){
		$_SESSION['email'] = $email;
		echo $email;
	}


?>