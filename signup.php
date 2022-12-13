<?php 
session_start();

	include("connection.php");
	include("functions.php");


	if($_SERVER['REQUEST_METHOD'] == "POST")
	{
		//something was posted
		$user_name = $_POST['user_name'];
		$password = $_POST['password'];
		$password1 = $_POST['password1'];
		

		if(!empty($user_name) && !empty($password) && !is_numeric($user_name))
		{

			//save to database
			$user_id = random_num(20);
			$query = "insert into users (user_id,user_name,password) values ('$user_id','$user_name','$password')";

			mysqli_query($con, $query);
			if($password === $password1  )
			{header("Location: index.php");
			die;}
			  else
			  {
				echo "Password are not identicaly";
			  }
		}else
		{
			echo "Please enter some valid information!";
		}
	}
?>


<!DOCTYPE html>
<html>
<head>
	<title>Signup</title>

		<!-- Materialize CSS -->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
		<!-- Bootstrap -->
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	<!-- Custom CSS -->
	<link rel="stylesheet" href="style.css">
	<!-- fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet">

</head>
<body style="background-color:black ;">

	<style type="text/css">
	
	#text{

		height: 25px;
		border-radius: 5px;
		padding: 4px;
		border: solid thin #aaa;
		width: 100%;
		font-family: 'Orbitron', sans-serif;
	}

	#button{

		padding: 10px;
		width: 100px;
		color: white;
		background-color: lightblue;
		border: none;
		font-family: 'Orbitron', sans-serif;
	}

	#box{

		background-color: darkorange;
		margin: auto;
		margin-top: 25vh;
		width: 345px;
		padding: 20px;
		font-family: 'Orbitron', sans-serif;
	}

	</style>

	<div id="box" class="rounded-2">
		
		<form method="post">
		<div style="font-size: 20px;margin: 10px;color: black; text-align:center;">Signup</div>
            <labe style="size: 1rem; color: black;">Username</labe>
			<input id="text" type="text" name="user_name" placeholder="Enter username"><br><br>
			<label style="size: 1.2rem; color: black;">Password</label>
			<input id="text" type="password" name="password" placeholder="Enter password"><br><br>
			<label style="size: 1.2rem; color: black;">Verify password</label>
			<input id="text" type="password" name="password1" placeholder="Enter password"><br><br>
			<!-- terms and conditions -->
			
			
			<input id="button" type="submit" value="Signup" style="margin-left:100px;"><br><br>

			<a href="login.php">Click to Login</a><br><br>
		</form>
	</div>
</body>
</html>