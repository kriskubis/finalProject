<?php
$message = '';
$error = '';
if(isset($_POST["submit"]))
{
          if(file_exists('test.json'))
          {
               $current_data = file_get_contents('employee_data.json');
               $array_data = json_decode($current_data, true);
               $extra = array(
                    'title'               =>     $_POST['title'],
                    // 'gender'          =>     $_POST["gender"],
                    // 'designation'     =>     $_POST["designation"]
               );
               $array_data[] = $extra;
               $final_data = json_encode($array_data);

     }
}
?>
