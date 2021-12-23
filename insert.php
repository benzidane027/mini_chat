<?php
$message=$_POST["message"];
$conn=new mysqli("localhost","root","@mine1997Amine","mini_chat");
if($conn->connect_error){
    echo json_encode(["msg"=>"error with data base"]);
    die();
}
$resualt=$conn->query("insert into messages(message)values('{$message}');");
if($resualt){
    echo json_encode(["msg"=>"send"]);
}else
    echo json_encode(["msg"=>"error"]);
?>