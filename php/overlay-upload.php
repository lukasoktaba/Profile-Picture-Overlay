<?php

    // Code from xjamundx: https://gist.github.com/xjamundx/845345

    // requires php5
	define('UPLOAD_DIR', 'images/');
	$img = $_POST['img'];
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
    print $data;
	$file = UPLOAD_DIR . uniqid() . '.png';
	$success = file_put_contents($file, $data);
	print $success ? $file : 'Unable to save the file.';