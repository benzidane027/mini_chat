<?php
$conn=new mysqli("localhost","root","@mine1997Amine","mini_chat");
if($conn->connect_error){
    echo json_encode(["msg"=>"error with data base"]);
    die();
}
$resualt=$conn->query("SELECT * FROM messages ORDER BY id DESC limit 10;");
echo json_encode(["msg"=>$resualt->fetch_all()]);

?>