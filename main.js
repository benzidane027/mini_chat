let message_sent_id=[];
var isalpha = /^[A-Za-z]+$/;
window.onload=()=>{
    document.querySelector("#message").value = "";
    document.querySelector("#set_name_input").value="";
    let x=document.querySelector("#set_name_input");
    if(localStorage.getItem("user")){
      x.value=localStorage.getItem("user");
      x.disabled=true;
    }
}





document.querySelector("#set_name_input").addEventListener("input",()=>{
      let x=document.querySelector("#set_name_input");
      if(!String(x.value).slice(-1).match(isalpha))
          x.value=String(x.value).slice(0,-1);
      document.querySelector("#case_number").innerHTML="12"-String(x.value).length;
      
  })

  document.querySelector("#set_name").addEventListener("click",()=>{
    let x=document.querySelector("#set_name_input");
      if(x.value==""){
      document.querySelector("#error_message").innerHTML = "name can t be empty";
        return
      }
      localStorage.setItem("user",x.value);
      x.disabled=true;
  })


  document.querySelector("#update_name").addEventListener("click",()=>{
    let x=document.querySelector("#set_name_input");
    x.disabled=false;
  })
  




















document.querySelector("#send_button").addEventListener("click", async () => {
  if (document.querySelector("#message").value == "") {
    document.querySelector("#error_message").innerHTML = "empty field";
    return;
  }
  let last_message_id_query=await fetch("display.php");
  let last_messge_id=await last_message_id_query.json()
  message_sent_id.push(Number(last_messge_id.msg[0][0])+1);

  let request = await fetch("insert.php", {
    method: "post",
    body: new FormData(document.forms[0]),
  });
  let resualt = await request.json();

  if (resualt.msg == "send") {
    document.querySelector("#message").value = "";
    document.querySelector("#error_message").innerHTML = "";
  }
  else 
    document.querySelector("#error_message").innerHTML = "message not sent";
//  console.log(resualt);
});




let handel=setInterval(async()=>{
    let request = await fetch("display.php");
      let resualt = await request.json();
      let table=document.querySelector("#message_table");
        table.innerHTML=null
      for(let i=9;i>=0;i--){
        
        var tr=document.createElement("tr")
        tr.setAttribute("class","table_row")
        var td=document.createElement("td")
        text=document.createTextNode(resualt.msg[i][1]);
        td.appendChild(text)
        tr.appendChild(td)
        table.appendChild(tr) 
        if(message_sent_id.indexOf(Number(resualt.msg[i][0]))!=-1){
            tr.setAttribute("style","position: relative;left:65px")
        }
        else{
          tr.setAttribute("style","position: relative;left:-65px")
        }
        /*console.log(resualt.let x=document.querySelector("#set_name_input");msg[i][1]);
        console.log(message_sent_id);*/
      }
   //   console.log(resualt.msg[0][1]);
    
},1000);
//setTimeout(clearInterval(handel),5000)

