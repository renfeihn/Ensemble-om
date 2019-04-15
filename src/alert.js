exports.install = function (Vue, options) {
    Vue.prototype.sweetAlert = function (type,title){
        if(type == 'error'){
            type = 'ERROR'
        } else if(type == 'true'){
            type = 'TRUE'
        } else if(type == 'info'){
            type = 'INFO'
        }
        this.$swal({
            confirmButtonClass: 'confirmButton-class',
            width: '20%',
            allowOutsideClick: false,
            title: type,
            text: title,
        })
    };
};