<?php
	
	require('config/db.php');
	
	$username = $_POST['username'];
	$password = $_POST['password'];
	$password_hash = password_hash($password, PASSWORD_DEFAULT);
	
	$query = "SELECT * FROM business where Username = '$username' and Password = '$password_hash'";
	$result = mysqli_query($conn, $query) or die(mysqli_error($conn));
	
/*	$count = mysqli_num_rows($result);

	if ($count == 1){

	//echo "Login Credentials verified";
	echo "<script type='text/javascript'>alert('Login Credentials verified')</script>";

	}else{
	echo "<script type='text/javascript'>alert('Invalid Login Credentials')</script>";
	//echo "Invalid Login Credentials";
	}
*/
	
	$row = mysqli_fetch_array($result);
	if ($row['Username'] == $username && $row['Password'] == $password)
	{
		echo "Login Success!! Welcome";
	} else {
		echo "Failed to login";
	}
	

?>