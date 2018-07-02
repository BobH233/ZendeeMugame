var $$ = mdui.JQ;
var int=self.setInterval("colorChange()",1000);
var R = 0;
function colorChange(){
    document.getElementById("title2").style.color = "rgb("+ Math.floor(Math.random()*255) +","+ Math.floor(Math.random()*255) +","+ Math.floor(Math.random()*255) +")";
    document.getElementById("title3").style.color = "rgb("+ Math.floor(Math.random()*255) +","+ Math.floor(Math.random()*255) +","+ Math.floor(Math.random()*255) +")";
}
$$(()=>{
    $$("#GameStart").get(0).onclick = ()=>{
        window.location.href = "./map_select.html";
    }
})