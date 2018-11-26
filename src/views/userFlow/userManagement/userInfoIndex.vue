<template>
    <div class="app-container pt-3">
    <v-card>
        <v-layout row wrap>
            <v-flex md2 lg2>
                <v-navigation-drawer v-model="drawer" permanent absolute>
                    <v-card>
                        <v-card-media src="/static/nature/tree2.png" class="class1">
                            <v-card-title class="pb-0">
                                <v-toolbar flat class="transparent">
                                    <v-list class="pa-0" style="margin-left: -40px">
                                        <v-list-tile avatar>
                                            <v-list-tile-avatar style="margin-top: -9%">
                                                <img src="/static/avatar/timg.jpg">
                                            </v-list-tile-avatar>
                                            <v-list-tile-content>
                                                <v-list-tile-title class="class2" style="margin-left: 0%">Admin</v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-list-tile>
                                    </v-list>
                                </v-toolbar>
                                <h4 class="title class3">系统管理员</h4>
                            </v-card-title>
                        </v-card-media>
                    </v-card>
                    <v-list class="pt-0" dense>
                        <v-divider></v-divider>
                        <v-list-tile v-for="item in items" :key="item.title" @click="actionTag(item)" :class="item.class">
                            <v-list-tile-action>
                                <v-icon :color="item.color">{{ item.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title style="font-size: medium">{{ item.title }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        </v-list>
                </v-navigation-drawer>
            </v-flex>
            <v-flex md10 lg10 class="pl-5">
                <user-info v-if="action=='userInfo'"></user-info>
                <user-password v-else></user-password>
            </v-flex>
        </v-layout>
    </v-card>
    </div>
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
                    {title: '个人信息管理', name: 'userInfo', icon: 'person', class: '',color: "blue"},
                    {title: '密码管理', name: 'userPassword', icon: 'lock', class: '', color: "red"}
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
    .class1 {
        width: 100%;height: 220px
    }
    .class2 {
        color: white;font-size: x-large
    }
    .class3 {
        font-size: large; color: white; margin-left: 5px
    }
</style>