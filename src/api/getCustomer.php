<?php
  header("Access-Control-Allow-Origin: *");
  header("content-type: application/json");
  sleep(2);
  echo file_get_contents("customer.json");
