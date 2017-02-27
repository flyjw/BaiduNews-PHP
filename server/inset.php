<?php
	header("Content-type: application/json;charset=utf-8");

	require_once('db.php');

	if($link){
		//插入新闻
		$newstitle = $_POST['newstitle'];
		$newstype = $_POST['newstype'];
		$newscontents = $_POST['newscontents'];
		$newsimg = $_POST['newsimg'];
		$newstime = $_POST['newstime'];

		$sql ="INSERT INTO `news`( `newstitle`,`newstype`, `newscontents`, `newsimg`, `newstime`) VALUES ('{$newstitle}','{$newstype}','{$newscontents}','{$newsimg}','{$newstime}')";

		mysqli_query($link,"SET NAMES utf8");
		$result = mysqli_query($link,$sql);

		echo json_encode(array('success' => 'ok'));

	}else{

	}
?>