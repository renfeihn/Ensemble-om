<template>
        <v-layout row wrap>
            <v-card style="height: 500px;width: 95%" class="elevation-4">
                <v-toolbar color="primary lighten-2" dark>
                    <v-btn icon>
                        <v-icon>person</v-icon>
                    </v-btn>
                    <v-toolbar-title>个人信息管理</v-toolbar-title>

                </v-toolbar>
                <form class="class2">
                    <v-text-field v-model="userId" label="用户ID" required disabled append-icon="person" color="red"></v-text-field>
                    <v-text-field v-model="name" label="用户名称" required append-icon="edit"></v-text-field>
                    <v-text-field v-model="email" label="电子邮箱" required append-icon="email"></v-text-field>
                    <v-text-field v-model="email" label="联系电话" required append-icon="phone"></v-text-field>
                    <v-btn @click="submit" style="width: 122px;color: white;background-color: #00b0ff" round>确   认</v-btn>
                    <v-btn @click="clear" style="width: 122px;color: white;background-color: #00b0ff" round>重   置</v-btn>
                </form>
            </v-card>
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
        width: 80%;margin-left: 10%;height: 400px;margin-top: 4%
    }
    .class3 {
        font-size: large; color: white; margin-left: 5px
    }
</style>