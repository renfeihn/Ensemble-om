<template>
    <v-card class="elevation-2">
        <v-layout row wrap>
            <v-flex md2 lg2>
                <v-navigation-drawer v-model="drawer" permanent absolute>
                    <v-toolbar flat class="transparent">
                        <v-list class="pa-0">
                            <v-list-tile avatar>
                                <v-list-tile-avatar>
                                    <img src="/static/avatar/timg.jpg">
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>admin</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-toolbar>

                    <v-list class="pt-0" dense>
                        <v-divider></v-divider>
                        <v-list-tile v-for="item in items" :key="item.title" @click="actionTag(item)" :class="item.class">
                            <v-list-tile-action>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        </v-list>
                </v-navigation-drawer>
            </v-flex>
            <v-flex md10 lg10>
                <user-info v-if="action=='userInfo'"></user-info>
                <user-password v-else></user-password>
            </v-flex>
        </v-layout>
    </v-card>
</template>
<script>
    import UserInfo from './userInfo'
    import UserPassword from './userPassword'

    export default {
        components: {
            UserInfo,
            UserPassword
        },
        data() {
            return {
                drawer: true,
                items: [
                    {title: '个人信息管理', name: 'userInfo', icon: 'dashboard', class: ''},
                    {title: '密码管理', name: 'userPassword', icon: 'question_answer', class: ''}
                ],
                right: null,
                action: 'userInfo'
            }
        },
        methods: {
            actionTag(item) {
                this.action = item.name;
                item.class="selected";
                for(const index in this.items){
                   if(this.items[index].name != item.name) {
                       this.items[index].class="";
                   }
                }
            }
        }
    }
</script>
<style>
    .selected {
        background-color: #e8e8e8;
    }
</style>