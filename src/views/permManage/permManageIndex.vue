<template>
    <v-layout align-center>
        <v-flex xs12 md2 lg2>
        <v-item-group v-model="window" class="shrink ml-1" mandatory tag="v-flex">
            <v-item v-for="n in userManagement" :key="n.index">
                <div :class="n.class" slot-scope="{ active, toggle }" @click="clickItem(n.index)">
                    <span @click="toggle" :class="n.classSpan" class="ml-2 mr-5">{{n.text}}</span>
                </div>
            </v-item>
        </v-item-group>
        </v-flex>
        <v-flex xs12 md10 lg10>
            <v-window v-model="window" class="elevation-1" vertical style="height: 700px">
                <v-window-item v-for="n in userManagement" :key="n.index">
                    <v-card flat>
                        <v-card-text>
                            <prod-perm v-bind:title="n.text" v-if="n.index == 'prod'"></prod-perm>
                            <param-perm v-bind:title="n.text" v-if="n.index == 'param'"></param-perm>
                        </v-card-text>
                    </v-card>
                </v-window-item>
            </v-window>
        </v-flex>
    </v-layout>
</template>
<script>
    import ParamPerm from './tables/paramPermTables'
    import ProdPerm from './tables/prodPermTables'

    export default {
        components: {
            ParamPerm,
            ProdPerm
        },
        data: () => ({
            userManagement: [
                {text: '产品工厂权限管理',index: 'prod', class: 'windowItem', classSpan: 'spanItem'},
                {text: '参数配置权限权利',index: 'param', class: 'windowItem', classSpan: 'spanItem'},
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
