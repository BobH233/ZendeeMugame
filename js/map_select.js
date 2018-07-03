var $$ = mdui.JQ;
var selectItem = "";
var selectItemID = -1;
var itemIDmax = 0;
var inst;
var maps_list = ["夢路らびりんす","風の源","本当のお母さん","出航のマーチ","Say something","Wolves","Fade","Bad Apple!"];
function hasClass( elements,cName ){
    return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
}
function removeClass( elements,cName ){
    if( hasClass( elements,cName ) ){
        elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " ); // replace方法是替换
    };
}
function addClass( elements,cName ){
    if( !hasClass( elements,cName ) ){
        elements.className += " " + cName;
    };
}
var unActiveAll = ()=>{
    var cNode =document.getElementById('map_list').getElementsByTagName('li');
    for( var i=0; i<cNode.length; i++){
        //console.log(cNode[i]);
        removeClass(cNode[i],"mdui-list-item-active");
    }
}
var ActiveItem = (item)=>{
    addClass(item,"mdui-list-item-active");
}
function parseDom(arg) {

    　　 var objE = document.createElement("div");
    
    　　 objE.innerHTML = arg;
    
    　　 return objE.childNodes[0];
    
};
var addItemToList = (songName)=>{
    /*
    <li class="mdui-list-item">
        <i class="mdui-icon material-icons">queue_music</i>
        <div class="mdui-list-item-content">%%name%%</div>
    </li>
    */
    let str = "<li class='mdui-list-item' item_id='%%id%%'><i class='mdui-icon material-icons'>queue_music</i><div class='mdui-list-item-content'>%%name%%</div></li>"
    str = str.replace("%%name%%",songName);
    str = str.replace("%%id%%",itemIDmax++);
    document.getElementById('map_list').appendChild(parseDom(str));
}
var getData = ()=>{
    //从服务器获得地图数据
}
var addItems = ()=>{
    //添加项目到列表中
    for(let i=0;i<maps_list.length;i++){
        addItemToList(maps_list[i]);
    }
}
var PlayMusic = (musicName)=>{
    showLoadingMusic();
    $$("#audioPlayer").get(0).src = "music/" + musicName + ".mp3";
    $$("#audioPlayer").get(0).play();
    //while($$("#audioPlayer").get(0).readyState != 4);
}
var GameStart = (id,mapname)=>{

}
var showLoadingMusic= ()=>{
    inst.open();
}
var FinishLodingMusic = ()=>{
    inst.close();
}
$$(()=>{
    inst = new mdui.Dialog('#waiting-dialog',{'modal':'true'});
    $$("#audioPlayer").get(0).addEventListener("canplaythrough",
    function() {
    　　FinishLodingMusic();
    },
    false);
    getData();
    addItems();
    $$("#logo").get(0).onclick = ()=>{
        $$("#logo").get(0).style.color = "rgb("+ Math.floor(Math.random()*255) +","+ Math.floor(Math.random()*255) +","+ Math.floor(Math.random()*255) +")";
    }
    $$("#map_list").get(0).onclick = (clickEvent)=>{
        if(clickEvent.srcElement.nodeName == "LI"){
            //点到了列表上
            let tmp = clickEvent.srcElement.children[1].innerHTML;
            unActiveAll();
            ActiveItem(clickEvent.srcElement);
            selectItem = tmp;
            selectItemID = clickEvent.srcElement.getAttribute("item_id");
            //console.log(tmp);
            
        }else if(clickEvent.srcElement.nodeName == "DIV"){
            //直接点到了名字上
            let tmp = clickEvent.srcElement.innerHTML;
            unActiveAll();
            ActiveItem(clickEvent.srcElement.parentNode);
            selectItem = tmp;
            selectItemID = clickEvent.srcElement.parentNode.getAttribute("item_id");
            //console.log(tmp);
        }else if(clickEvent.srcElement.nodeName == "I"){
            //点到了图标上
            let tmp = clickEvent.srcElement.parentNode.children[1].innerHTML;
            unActiveAll();
            ActiveItem(clickEvent.srcElement.parentNode);
            selectItem = tmp;
            selectItemID = clickEvent.srcElement.parentNode.getAttribute("item_id");
            //console.log(tmp);
        }
        //console.log(selectItemID);
        $$("#title").get(0).innerHTML = selectItem;
        PlayMusic(selectItem);
        $$("#title").get(0).style.color = "rgb(16, 72, 255)";
    };
    $$("#Start").get(0).onclick = ()=>{
        if(selectItemID == -1){
            mdui.alert('请确保选择一个你喜欢的地图然后再开始游戏', '你还没有选择地图');
        }else{
            GameStart(selectItemID,selectItem);
        }
    }
})