export const formatPrice =(price)=>{
    return price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const formatNameService=(string)=>{
    if(string.length>14){
        var first= string.substring(0,15);
        var end = string.substring(15,25);
        var cutString= first+"\n"+end+'...';
        return cutString
    }
   return string
}