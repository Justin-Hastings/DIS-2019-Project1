<?php

require 'constants.php';

/* mysqli is a library another is PDO see 
 * https://www.php.net/manual/en/mysqlinfo.api.choosing.php
 * to decide which you prefer.  mysqli is better taylored to 
 * MySQL but PDO is more uniform across databases
 */

/* OOP method
$conn = new mysqli(DB_HOST, DB_USER,DB_PASS, DB_NAME);

if($conn->connect_error){
	echo "Failed to connect to MySQL: " . $conn->connect_error;
    die('Database error:' . $conn->connect_error);
} */

// procedural method
$conn = mysqli_connect(DB_HOST, DB_USER,DB_PASS, DB_NAME);

// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
	die('Database error:' . mysqli_connect_error() );
}
?>