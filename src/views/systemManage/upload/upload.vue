<template>
    <a-upload name="file" :multiple="true" :action="upload" :headers="headers" @change="handleChange">
        <a-button>
            <a-icon type="upload" /> Click to Upload
        </a-button>
    </a-upload>
</template>
<script>
    import {upload} from "@/api/url/prodInfo";
    export default {
        data () {
            return {
                headers: {
                    authorization: 'authorization-text',
                    contentType: 'multipart/form-data'
                },
                file: {}
            }
        },

        methods: {
            upload(){
                return 'http://127.0.0.1:8004/upload'
       /*         const fr = new FileReader();
                fr.readAsDataURL(this.file);
                fr.onload = function (event) {
                    const data= event.target.result; //此处获得的data是base64格式的数据
                    upload(data).then(function (response) {

                    })
                }*/
            },
         /*   beforeUpload(file, fileList) {
              this.file=file;
            },*/
            handleChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    this.$message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    this.$message.error(`${info.file.name} file upload failed.`);
                }
            },
        },
    }
</script>