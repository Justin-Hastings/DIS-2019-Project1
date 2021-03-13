<?php

	include_once '../config/db.php';

	header("Access-Control-Allow-Origin: * ");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	$messages = array();

	$businessName = '';
	$postCode = '';
	$businessType = '';
	$email = '';
	$userName = '';
	$passWord = '';
	$passwordConf = '';

	$data = json_decode(file_get_contents("php://input"),true);

	error_log( "received: data", 0);

	$businessName = $data['businessName'];
	$postCode = $data['postCode'];
	$businessType = $data['businessType'];
	$email = $data['email'];
	$userName = $data['username'];
	$passWord = $data['password'];
	$passwordConf = $data['passwordConf'];

	$password_hash = password_hash($passWord, PASSWORD_DEFAULT);

	$query = "INSERT INTO business set BusinessName = ?, PostCode = ?, BusinessType = ?, Email = ?, Username = ?, Password = ?";

	$stmt = mysqli_prepare($conn, $query);
	mysqli_stmt_bind_param( $stmt, 'sissss', $businessName, $postCode, $businessType, $Email, $userName, $password_hash);

	// perform query and create message based on success or error
	if (mysqli_stmt_execute($stmt)) {
		http_response_code(200);
		array_push( $messages , array("success" => "INSERT successful: " . mysqli_stmt_affected_rows($stmt) . " rows added"));
		echo json_encode($messages);
	} else {
		http_response_code(200);
		array_push( $messages , array("failure" => "Failed to run INSERT query: " . mysqli_stmt_error($stmt) ));
		echo json_encode($messages);
	}
	mysqli_stmt_close($stmt);
	mysqli_close($conn);

?>