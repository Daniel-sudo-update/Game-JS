<?php 
session_start();

	include("connection.php");
	include("functions.php");
    include("config.php");

	$user_data = check_login($con);

?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    

        <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet">

    
    <link rel="stylesheet" href="./css/style.css?v=<?=$version?>">

</head>

<body>

    <div class="topnav">
            <a  href="index.php">Back to menu</a>
        
        <div class="topnav-right">
            
             <a id="logoutt" href="logout.php">Logout</a>
        </div>
     </div>  

    <!-- <div style="padding-left:16px">
    
    </div> -->

   <canvas class="topnav" id="canvas1" ></canvas>
   

  <script src="script.js?v=<?=$version?>"></script>

</body>
</html>