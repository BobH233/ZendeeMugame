function ZM_map_info(){
    this.songname = "";
    this.originCreater = "";
    this.mapcreater = "";
    this.mapLength = "";
    this.difficuty = "";
    this.blockCnt = 0;
}
function ZM_map_block(type,timeS,timeE,lastTime){
    this.type = type || -1;
    /*  type
        -1:没有定义
        1:短块，通常块状
        2:延时块
    */
    this.timeStart = timeS || 0; //时间轴开始时间,毫秒计算 ms
    this.timeEnd = timeE || 0; //时间轴结束时间,毫秒计算 ms
    this.lastTime = lastTime || 0; //时间轴持续时间,毫秒计算 ms
    this.insType = 0; // Ex功能,乐器的类型
}
//JSON.stringify(object)
function ZM_map(url){
    this.map_info = new ZM_map_info();
    this.map_blocks_line1 = new Array();
    this.map_blocks_line2 = new Array();
    this.map_blocks_line3 = new Array();
    this.music_url = url;
    //console.log(JSON.stringify(this.map_info));
}
var solveZM_map = (JsonStr)=>{
    var obj = JSON.parse(JsonStr);
    return obj;
    //console.log(obj);
}
var example = ()=>{
    var exam_map = new ZM_map("music/Bad Apple!.mp3")
    exam_map.map_info.blockCnt = 2
    exam_map.map_info.difficuty = "简单"
    exam_map.map_info.mapcreater = "BobH"
    exam_map.map_info.mapLength = "1'36'"
    exam_map.map_info.originCreater = "ZUN"
    exam_map.map_info.songname = "Bad Apple"
    exam_map.map_blocks_line1.push(new ZM_map_block(1,1056,2536,1480));
    exam_map.map_blocks_line2.push(new ZM_map_block(1,3140,4140,1000));
    console.log(exam_map)
    console.log(JSON.stringify(exam_map));
}