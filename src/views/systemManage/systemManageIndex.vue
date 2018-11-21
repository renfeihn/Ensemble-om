<template>
    <v-layout align-center>
        <v-item-group v-model="window" class="shrink ml-1" mandatory tag="v-flex">
            <v-item v-for="n in userManagement" :key="n.index">
                <div :class="n.class" slot-scope="{ active, toggle }" @click="clickItem(n.index)">
                    <span v-if="n.index=='title'" >System manage </span>
                    <span v-else @click="toggle" :class="n.classSpan" class="ml-2 mr-5">{{n.text}}</span>
                </div>
            </v-item>
        </v-item-group>

        <v-flex>
            <v-window v-model="window" class="elevation-1" vertical>
                <v-window-item v-for="n in userManagement" :key="n.index">
                    <v-card flat>
                        <v-card-text>
                            <v-layout align-center mb-3>
                                <strong class="title">{{ n.text }}</strong>
                                <v-spacer></v-spacer>
                                <v-btn icon>
                                    <v-icon>mdi-account</v-icon>
                                </v-btn>
                            </v-layout>
                            <user-list></user-list>
                        </v-card-text>
                    </v-card>
                </v-window-item>
            </v-window>
        </v-flex>
    </v-layout>
</template>
<script>
    import UserList from './tables/menuTables'
    export default {
        components: {
            UserList
        },
        data: () => ({
            userManagement: [
                {text: '菜单管理',index: 'title', class: 'windowTitle', classSpan: 'spanItem'},
                {text: '菜单管理',index: 'menuPower', class: 'windowItem', classSpan: 'spanItem'},
                {text: '角色管理',index: 'userPower', class: 'windowItem', classSpan: 'spanItem'},
                {text: '角色菜单授权',index: 'prodManagement', class: 'windowItem', classSpan: 'spanItem'},
                {text: '用户管理',index: 'userPower', class: 'windowItem', classSpan: 'spanItem'},
                {text: '用户角色管理',index: 'tableManagement', class: 'windowItem', classSpan: 'spanItem'}
                ],
            window: 0,
            windowItem: 'windowItem',
            windowTitle: 'windowTitle',
        }),
        methods: {
            clickItem(index) {
                let userManagement=this.userManagement;
                for(const key in userManagement){
                    if(key==0){
                        continue
                    }
                    if(userManagement[key].index==index){

                        userManagement[key].classSpan='spanItemSelected'
                    }else{

                        userManagement[key].classSpan='spanItem'
                    }
                }

            }
        }
    }
</script>
<style scoped>
    .windowTitle {
        background-color: #9E9E9E;
        border: 1px solid #a09ba269;
    }

    .windowItem {
        border: 1px solid #a09ba269;
        background-color: white
    }
    .shrink :hover {
        background-color: #9E9E9E;
    }
    .selectedItem {
        background-color: #9E9E9E;
        border: 1px solid #a09ba269;
    }
    .spanItem {
        height: 30px;
        display: block;
        margin-top: 15px;
        color: #757575;
    }
    .spanItemSelected {
        height: 30px;
        display: block;
        margin-top: 15px;
        color: #000000;
    }
    .titleItem {

    }
</style>
