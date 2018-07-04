var $$ = mdui.JQ;
var map_load;  //储存地图数据
var server_data;
//游戏变量
var user_score_tot = 0;
var user_score_prefect = 0; //perfact块数
var user_score_pool = 0; //pool块数
var user_score_miss = 0; //miss块数
//状态变量
var is_key1_down = false;
var is_key2_down = false;
var is_key3_down = false;
//绘制信息
var canvasContext;
var int=self.setInterval("onRender()",1000/60); //60fps
var int2=self.setInterval("updateProgress()",500); 
//音乐
var audio_obj;
var audio_effect;
var setProgress = (precent)=>{
    $$("#progress").get(0).style = "width:" + precent + "%";
}
var updateProgress = ()=>{
    //更新进度条显示
    if(audio_obj.readyState == 0){
        setProgress(0);
    }else{
        setProgress(audio_obj.currentTime / audio_obj.duration * 100);
    }
}
var onRender = ()=>{
    $$("#gameCenter").get(0).height=$$("#gameCenter").get(0).height; //清空画布
    var canvasWidth = $$("#gameCenter").get(0).offsetWidth;
    var canvasHeight = $$("#gameCenter").get(0).offsetHeight;
    //console.log(canvasWidth);
    //console.log(canvasHeight);
    var insHeight = 50;
    //绘制三等分线
    var pos1 = canvasWidth / 3;
    var pos2 = canvasWidth / 3 * 2;
    canvasContext.moveTo(pos1, 0);
    canvasContext.lineTo(pos1,canvasHeight);
    canvasContext.moveTo(pos2, 0);
    canvasContext.lineTo(pos2,canvasHeight);
    //绘制动画
    var insHeight = 50;
    if(is_key1_down){
        insHeight += 20;
    }
    canvasContext.fillStyle='rgb(255, 124, 37)'
    canvasContext.fillRect(0,canvasHeight-insHeight,pos1,insHeight);
    insHeight = 50;
    if(is_key2_down){
        insHeight += 20;
    }
    canvasContext.fillStyle='rgb(15, 255, 55)'
    canvasContext.fillRect(pos1,canvasHeight-insHeight,pos1,insHeight);
    insHeight = 50;
    if(is_key3_down){
        insHeight += 20;
    }
    canvasContext.fillStyle='rgb(255, 15, 255)'
    canvasContext.fillRect(pos2,canvasHeight-insHeight,pos1,insHeight);
    canvasContext.stroke();
}
var PlayMusic = (musicName)=>{
    $$("#audioPlayer").get(0).src = "music/" + musicName + ".mp3";
    $$("#audioPlayer").get(0).play();
    //while($$("#audioPlayer").get(0).readyState != 4);
}

var changePage = (page)=>{
    var b1 = $$("#page1").get(0).style;
    var b2 = $$("#page2").get(0).style;
    var b3 = $$("#page3").get(0).style;
    var b4 = $$("#page4").get(0).style;
    if(page == 1){
        b1.display = "unset";
        b2.display = "none";
        b3.display = "none";
        b4.display = "none";
    }else if(page == 2){
        b1.display = "none";
        b2.display = "unset";
        b3.display = "none";
        b4.display = "none";
    }else if(page == 3){
        b1.display = "none";
        b2.display = "none";
        b3.display = "unset";
        b4.display = "none";
    }else if(page == 4){
        b1.display = "none";
        b2.display = "none";
        b3.display = "none";
        b4.display = "unset";
    }
}
$$(()=>{
    audio_obj = $$("#audioPlayer").get(0)
    audio_effect = $$("#audioEffect").get(0)
    audio_obj.volume = 0.5;
    audio_effect.volume = 1;
    var c = $$("#gameCenter").get(0);
    canvasContext = c.getContext("2d");
    $$("#gameCenter").get(0).width = $$("#GameSpace").get(0).offsetWidth
    $$("#gameCenter").get(0).height = $$("#GameSpace").get(0).offsetHeight
    canvasInit();
    //绑定bar事件
    $$("#bar1").get(0).onclick = ()=>{
        changePage(1);
    }
    $$("#bar2").get(0).onclick = ()=>{
        changePage(2);
    }
    $$("#bar3").get(0).onclick = ()=>{
        changePage(3);
    }
    $$("#bar4").get(0).onclick = ()=>{
        changePage(4);
    }
});
$$(()=>{
    setTimeout(()=>{
        //mdui.alert('这只是一个界面优先预览版，还没有写出游戏实际功能', '预览版提示');
    },1000);
    $$("#start").get(0).onclick = ()=>{
        PlayMusic('Bad Apple!');
    }
});
$$(()=>{
    setTimeout(()=>{
        //PlayMusic('夢路らびりんす');
    },3000);
});
var canvasInit = ()=>{
    var canvasWidth = $$("#gameCenter").get(0).offsetWidth;
    var canvasHeight = $$("#gameCenter").get(0).offsetHeight;
    //console.log(canvasWidth);
    //console.log(canvasHeight);
    var insHeight = 50;
    //绘制三等分线
    var pos1 = canvasWidth / 3;
    var pos2 = canvasWidth / 3 * 2;
    canvasContext.moveTo(pos1, 0);
    canvasContext.lineTo(pos1,canvasHeight);
    canvasContext.moveTo(pos2, 0);
    canvasContext.lineTo(pos2,canvasHeight);
    //绘制三块打击板
    canvasContext.fillStyle='rgb(255, 124, 37)'
    canvasContext.fillRect(0,canvasHeight-insHeight,pos1,insHeight);
    canvasContext.fillStyle='rgb(15, 255, 55)'
    canvasContext.fillRect(pos1,canvasHeight-insHeight,pos1,insHeight);
    canvasContext.fillStyle='rgb(255, 15, 255)'
    canvasContext.fillRect(pos2,canvasHeight-insHeight,pos1,insHeight);
    canvasContext.stroke();
}
var onKeyPress = (keynum)=>{
    audio_effect.currentTime = 0;
    audio_effect.play();
    //console.log('asf');
}

document.onkeydown = function(e) {
    //Numpad%%
    if(e.code == "Numpad1"){
        onKeyPress(1);
        is_key1_down = true;
    }else if(e.code == "Numpad2"){
        onKeyPress(1);
        is_key2_down = true;
    }else if(e.code == "Numpad3"){
        onKeyPress(1);
        is_key3_down = true;
    }
}
document.onkeyup = function(e) {
    if(e.code == "Numpad1"){
        is_key1_down = false;
        //audio_effect.pause();
    }else if(e.code == "Numpad2"){
        is_key2_down = false;
        //audio_effect.pause();
    }else if(e.code == "Numpad3"){
        is_key3_down = false;
        //audio_effect.pause();
    }
}