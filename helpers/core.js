export function splitTime(info,string){
    const time = info.split("T")
    const date = time[1].split("Z")
    if(string==="time"){
        return time[0]
    }else if(string==="date"){
        return date[0]
    }
}