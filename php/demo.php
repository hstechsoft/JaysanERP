<?php
  
  $csv = array();
  $lines = file('anitha.csv', FILE_IGNORE_NEW_LINES);
  
  foreach ($lines as $key => $value)
  {
  
      $csv[$key] = str_getcsv($value);

    


     

      foreach ($csv[$key] as $key1 => $value1)
      {
       

        $csv1[$key1] = ($value1);

      }
      //echo $value."<br>";



     echo $csv1[11]."<br>";
     echo $csv1[1]."<br>";
     echo $csv1[10]."<br>";
     echo $csv1[5]."<br>";
  }



  


?>
   