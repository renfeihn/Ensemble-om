<template>
    <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            transition="scale-transition"
            offset-y
    >

        <v-btn icon flat dark fixed top="top" slot="activator" right="right" class="DcMyWork" color="primary" >
            <v-badge color="red" overlap>
                <span slot="badge">3</span>
                <v-icon>shopping_cart</v-icon>
            </v-badge>
        </v-btn>

        <v-card>
            <v-toolbar color="teal" dark>
                <v-toolbar-side-icon></v-toolbar-side-icon>

                <v-toolbar-title class="text-xs-center">操作列表</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>search</v-icon>
                </v-btn>
            </v-toolbar>

            <v-list subheader>
                <v-subheader>产品列表</v-subheader>
                <v-list-tile
                        v-for="item in items"
                        :key="item.title"
                        avatar
                >
                    <v-list-tile-avatar>
                        <img :src="item.avatar">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title v-html="item.title"></v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-icon :color="item.active ? 'teal' : 'grey'">close</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>

            <v-divider></v-divider>

            <v-list subheader>
                <v-subheader>参数列表</v-subheader>

                <v-list-tile
                        v-for="item in items2"
                        :key="item.title"
                        avatar
                >
                    <v-list-tile-avatar>
                        <img :src="item.avatar">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title v-html="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-icon :color="item.active ? 'teal' : 'grey'">close</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn flat @click="menu = false">清空</v-btn>
                <v-btn color="primary" flat @click="menu = false">提交</v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>
<script>
    export default {
        data () {
            return {
                menu: false,
                items: [
                    { active: true, title: 'RB10001-个人活期产品', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' }
                ],
                items2: [
                    { title: '参数分类表', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
                    { title: '交易服务映射表', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
                    { title: '费率信息定义表', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
                    { title: '币种信息表', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' }
                ]
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .DcMyWork {
        top: 11% !important;
        right: 20px;
        border-radius: 0;
    }
</style>