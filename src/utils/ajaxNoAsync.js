import $ from 'jquery'
export function asyncPost(url, data) {
    let reData='';
    $.ajax({
        url: process.env.BASE_API+url,//url·��
        type: 'POST', //GET
        async: false, //��false,�Ƿ��첽
        data: data,
        timeout: 15000, //��ʱʱ��
        dataType: 'json',
        success: function(data,textStatus,jqXHR){
            reData= data;
        }
    });
    return reData.data;
}