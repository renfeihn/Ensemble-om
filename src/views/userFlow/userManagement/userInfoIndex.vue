<template>
    <div class="pt-3">
        <v-layout>
            <v-flex md2 lg2>
                <v-flex xs12>
                    <v-card class="pt-3">
                        <v-card-media src="/static/avatar/per1.jpg" class="class1">
                        </v-card-media>
                        <v-list style="margin-right: 10%;margin-left: 10%">
                            <v-list-tile>
                                <v-list-tile-content>
                                        <v-list-tile-title style="font-size: x-large;margin-left: 10%; margin-right: 50%;color: #42A5F5">系统管理员</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                        <h4 style="margin-left: 33%;margin-right: 50%;margin-top: -5%;color: #42A5F5">Admin</h4>
                    </v-card>
                </v-flex>
                <v-flex xs12>
                    <v-card class="mt-2 pb-2" style="height: 200%">
                        <v-list>
                            <v-list-tile v-for="item in items" :key="item.title" @click="actionTag(item)" :class="item.class">
                                <v-list-tile-action>
                                    <v-icon :color="item.color">{{ item.icon }}</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title style="font-size: medium">{{ item.title }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-flex>
            <v-flex md10 lg10 class="pl-2 pb-2">
                    <user-info v-if="action=='userInfo'"></user-info>
                    <user-password v-else></user-password>
            </v-flex>
        </v-layout>
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
        width: 100%;height: 100%;margin-top: -5%;
    }
    .class2 {
        color: blue;font-size: x-large
    }
    .class3 {
        font-size: large; color: deepskyblue; margin-left: 5px
    }
</style>