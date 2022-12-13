<?php 
session_start();

	include("connection.php");
	include("functions.php");

	$user_data = check_login($con);

?>

<!DOCTYPE html>
<html>
<head>
	<title>My website</title>	
	<!-- bootstrap -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <!-- fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet">


<!-- bootstrap JS -->

	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

</head>
<body style="background-color:black ;">

<style type="text/css">
		#text{

height: 25px;
border-radius: 5px;
padding: 4px;
border: solid thin #aaa;
width: 100%;

}

#button{

padding: 10px;
width: 100px;
color: white;
background-color: lightblue;
border: none;

}

/* #box1{

background-color: black;

margin: auto;
margin-top: 25vh;
width: 100px;
padding: 5px;
font-family: 'Orbitron', sans-serif;
color: white;
font-size: 3vh;

text-decoration: dotted;

} */
#box{


margin: auto;
margin-top: 25vh;
width: 150px;
padding: 5px;
font-family: 'Orbitron', sans-serif;
}

</style>





<div id="box">
	<div style="margin: 10px;color: white; text-align:center;">
		<div style="font-size:5vh ;">
		Hello, <?php echo $user_data['user_name']; ?>
		</div>
			<br> <br><br>
				<a id="button" href="logout.php">Logout</a>

				<br>
				

			<br><br><br>
			<a id="button" href="game.php">Play game</a>
	</div>

</div>

</body>
</html>