<?php
	header("Content-type: application/json;charset=utf-8");

	require_once('db.php');

	if($link){
		//修改新闻
		$newstitle = $_POST['newstitle'];
		$newstype = $_POST['newstype'];
		$newscontents = $_POST['newscontents'];
		$newsimg = $_POST['newsimg'];
		$newstime = $_POST['newstime'];
		$newsid = $_POST['id'];

		$sql ="UPDATE `news` SET `newstitle`='{$newstitle}',`newstype`='{$newstype}',`newscontents`='{$newscontents}',`newsimg`='{$newsimg}',`newstime`='{$newstime}' WHERE `id`='{$newsid}'";

		mysqli_query($link,"SET NAMES utf8");
		$result = mysqli_query($link,$sql);

		echo json_encode(array('success' => 'ok'));

	}
?>