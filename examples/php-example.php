<?php

  # Example Push Number with Curl
  $CounterMac = "";
  $CounterToken = "";
  $NumberToDisplay = "12345";

  $url = "https://connect.smiirl.com/?s=pushnumber&mac=${CounterMac}&token=${CounterToken}&number=${NumberToDisplay}";
  $ch = curl_init($url);

  # Setting our options
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

  # Get the response
  $response = curl_exec($ch);
  $response = json_decode($response);
  curl_close($ch);

  # Show the reponse
  var_dump($response);

  die();
?>
