<?php

define('DIR_LOC', 'images/');
$img = $_POST['img'];
$file_path = DIR_LOC . $img . '.png';
$successful_delete = unlink($file_path);
print $successful_delete ? 'Successfully deleted.' : 'Deletion unsuccessful.';