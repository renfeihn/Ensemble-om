<template>
    <a-upload name="file" :multiple="true" :action="upload" :headers="headers" @change="handleChange">
        <a-button>
            <a-icon type="upload" /> Click to Upload
        </a-button>
    </a-upload>
</template>
<script>
    export default {
        data () {

            return {
                data: '1',
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
            },
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