<?php 

session_start();

	include("connection.php");
	include("functions.php");
	

	if($_SERVER['REQUEST_METHOD'] == "POST")
	{
		$user_name = $_POST['user_name'];
		$password = $_POST['password'];
		
		

		if(!empty($user_name) && !empty($password) && !is_numeric($user_name))
		{

			//read from database
			$query = "select * from users where user_name = '$user_name' limit 1";
			$result = mysqli_query($con, $query);
                // extra
		
		
				// 
			if($result)
			{
				if($result && mysqli_num_rows($result) > 0)
				{

					$user_data = mysqli_fetch_assoc($result);
					
					// captcha conditions
						if (isset($_POST['submit'])) {
							$secret = "6Lf95ZMiAAAAACv-Q3KtfsXaNlY5IcN31qDzzb53";
							$response = $_POST['g-recaptcha-response'];
							$remoteip = $_SERVER['REMOTE_ADDR'];
							$url = "https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=$response&remoteip=$remoteip";
							$data = file_get_contents($url);
							$row = json_decode($data, true);
						
							
						//  verification password and captcha
									if($user_data['password'] === $password  )
									{
										//  see if captcha is checked
										if($row['success'] == "true")
										{
											$_SESSION['user_id'] = $user_data['user_id'];
											header("Location: index.php");
											die;
										}
											else
											{
												echo "Check robot verification ";
											}
									}
					}

					
				}
			}
			
			echo "wrong username or password!";
		}else
		{
			echo "wrong username or password!";
		}
	}
  

	


	   

?>


<!DOCTYPE html>
<html>
<head>
	<title>Login</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
	<script src="https://www.google.com/recaptcha/api.js" async defer></script>
	
      <!-- Bootstrap -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	<!-- fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet">
   

	<!-- captcha edit -->

 <!-- Materialize CSS -->
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
  <!-- Custom CSS -->
  <link rel="stylesheet" href="style.css">
  <!-- Google Recaptcha -->
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>

   
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
		text-align: center;
		margin-left: 100px;
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

	.captcha{
		width: 50%;
		background: yellow;
		text-align: center;
		font-size: 24px;
		font-weight: 700;
		font-family: 'Orbitron', sans-serif;

	}

	</style>

	<div id="box" class="rounded-2">
		
		<form method="post">
			<div style="font-size: 20px;margin: 10px;color: black; text-align:center;">Login</div>
            <labe style="size: 1rem; color: black; ">Username</labe>
			<input id="text" type="text" name="user_name" placeholder="Enter username"><br><br>
			<label style="size: 1.2rem; color: black;">Password</label>
			<input id="text" type="password" name="password" placeholder="Enter password"><br><br>
         
			<!-- captcha -->
			<div class="row">
			<div class="g-recaptcha" data-sitekey="6Lf95ZMiAAAAANLtE-4wn8L3vs4g2g1ujP_0ugpV"></div>
			</div>
                            
			 <br><br>
			<!-- subbit -->
			<input id="button" type="submit" name="submit" value="Login" calass="btn-success"><br><br>

			<a href="signup.php">Click to Signup</a><br><br>
		</form>
	</div>

	
</body>
</html>


