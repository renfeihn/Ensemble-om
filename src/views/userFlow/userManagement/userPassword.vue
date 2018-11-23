<template>
    <form>
        <v-text-field
                v-model="userId"
                label="用户名"
                disabled= true
                required
        ></v-text-field>
        <v-text-field
                v-model="password"
                :rules="passwordErrors"
                label="原密码"
                required
        ></v-text-field>
        <v-text-field
                v-model="newPassword"
                label="新密码"
                :rules="passwordErrors"
                required
        ></v-text-field>
        <v-text-field
                v-model="newPasswordEnd"
                label="新密码"
                :rules="[v => v==newPassword||'与上次输入新密码不一致']"
                required
        ></v-text-field>
        <v-checkbox
                v-validate="'required'"
                v-model="checkbox"
                :error-messages="errors.collect('checkbox')"
                value="1"
                label="修改密码将重新跳到登录页"
                data-vv-name="checkbox"
                type="checkbox"
                required
        ></v-checkbox>

        <v-btn @click="submit">确认</v-btn>
        <v-btn @click="clear">取消</v-btn>
    </form>
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