<template>
        <v-layout row wrap>
            <h4 style="margin-left: 6%;color: #00b0ff;font-size: x-large;margin-top: 4%">个人信息管理</h4>
            <form class="class2">
                <v-text-field v-model="userId" label="用户ID" required disabled append-icon="person" color="red"></v-text-field>
                <v-text-field v-model="name" label="用户名称" required append-icon="edit"></v-text-field>
                <v-text-field v-model="email" label="电子邮箱" required append-icon="email"></v-text-field>
                <v-text-field v-model="email" label="联系电话" required append-icon="phone"></v-text-field>
                <h5></h5>
                <v-btn @click="submit" style="margin-left: 70%;color: white;background-color: #00b0ff" class="btn" round>确   认</v-btn>
                <v-btn @click="clear" style="margin-left: 3%;color: white;background-color: #00b0ff" class="btn" round>取   消</v-btn>
            </form>
        </v-layout>
</template>
<script>
    import axios from 'axios'

    export default {
        data: () => ({
            valid: true,
            userId: "admin",
            name: '系统管理员',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4'
            ],
            checkbox: false
        }),

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
        width: 90%;margin-left: 6%;height: 300px;margin-top: 4%
    }
    .class3 {
        font-size: large; color: white; margin-left: 5px
    }
</style>