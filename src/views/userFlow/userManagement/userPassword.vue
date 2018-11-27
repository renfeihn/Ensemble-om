<template>
    <v-layout row wrap>
        <v-card style="height: 100%;width: 100%">
            <v-toolbar color="primary lighten-2" dark>
                <v-btn icon>
                    <v-icon>lock</v-icon>
                </v-btn>
                <v-toolbar-title>密码管理</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom color="blue">
                    <v-btn flat icon="save" slot="activator">
                        <v-icon>save</v-icon>
                    </v-btn>
                    <span>保存修改</span>
                </v-tooltip>
            </v-toolbar>
        <form class="class2">
            <v-text-field v-model="userId" label="用户ID" disabled= true required append-icon="person"></v-text-field>
            <v-text-field v-model="password" :rules="passwordErrors" label="原密码" required append-icon="lock"></v-text-field>
            <v-text-field v-model="newPassword" label="新密码" :rules="passwordErrors" required append-icon="lock"></v-text-field>
            <v-text-field v-model="newPasswordEnd" label="再次输入新密码" :rules="[v => v==newPassword||'与上次输入新密码不一致']" required append-icon="info"></v-text-field>
                <h5 style="color: orangered">
                    <v-icon style="color: orangered">info</v-icon>
                    修改成功后将重新登录
                </h5>
        </form>
        </v-card>
    </v-layout>

</template>
<script>
    import axios from 'axios'
    export default {

        data: () => ({
            valid: true,
            newPasswordEnd: '',
            password: '',
            newPassword: '',
            passwordErrors: [
                v => v.length>=6||'密码长度必须大于6位',
                v => v.length<=16||'密码最大长度不能超过16',
            ],
            checkbox: false
        }),
       computed: {
         userId (){
             return sessionStorage.getItem("userId")
         }
       },
        methods: {
            submit () {
                if (this.$refs.form.validate()) {
                    // Native form submission is not yet supported
                    axios.post('/api/submit', {
                        name: this.name,
                        email: this.email,
                        select: this.select,
                        checkbox: this.checkbox
                    })
                }
            },
            passwordEndErrors () {
                const errors = []

                return errors
            },
            clear () {
                this.$refs.form.reset()
            }
        }
    }
</script>

<style>
    .btn {
        width: 122px;
    }
    .class2 {
        width: 90%;margin-left: 6%;height: 400px;margin-top: 4%
    }
    .class3 {
        font-size: large; color: white; margin-left: 5px
    }
</style>