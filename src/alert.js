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
    Vue.prototype.sweetAlertChoose = function (title){
        this.$swal({
            text: title,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.$swal(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }else{
                return false
            }
        })
    };
};