<template>
    <div class="pt-5 pl-4">
        <v-layout>
            <v-flex md3 lg3 class="pl-4">
                <v-flex xs12>
                    <v-card-media src="/static/bg/18.jpg" height="200px" class="elevation-4">
                        <v-card-title class="pb-0">
                            <td>
                                <h3 class="" style="color: white;margin-top: -75px">{{title}}</h3>
                            </td>
                            <td>
                                <h1 class="" style="color: white;margin-top: 60%;">{{titleNum}}</h1>
                            </td>
                        </v-card-title>
                    </v-card-media>
                </v-flex>
                <v-flex xs12 class="mt-3 pb-4">
                    <v-card style="height: 200%" class="elevation-4">
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
            <v-flex md10 lg10 class="pl-4 pb-4 pr-1">
                <table-list v-if="action == 'model'"></table-list>
                <table-column v-if="action == 'json'"></table-column>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    import tableColumn from './tables/tableColumnManage'
    import tableList from './tables/tableListManage'

    export default {
        components: {
            tableColumn,
            tableList
        },
        data() {
            return {
                title: "交易数量",
                titleNum: "105",
                action: 'model',
                items: [
                    {title: '交易模块维护',name: 'model', class: '',icon: 'settings',color: "blue"},
                    {title: '元数据维护',name: 'json', class: '', icon: 'event',color: "blue"}
                ],
                window: 0,
                windowItem: 'windowItem',
                windowTitle: 'windowTitle',
            }
        },
        methods: {
            actionTag(item) {
                if(item.name === "model"){
                    this.title = "交易数量"
                    this.titleNum = "105"
                }
                if(item.name === "json"){
                    this.title = "字段数量"
                    this.titleNum = "213"
                }
                this.action = item.name;
                item.class="selected";
                for(const index in this.items){
                    if(this.items[index].name != item.name) {
                        this.items[index].class="";
                    }
                }
            },
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
