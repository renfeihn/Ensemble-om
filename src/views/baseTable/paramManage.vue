<template>
    <div class="pt-5 pl-4">
        <v-layout>
            <v-flex md3 lg3 class="pl-4">
                <v-flex xs12>
                    <v-card-media src="/static/bg/18.jpg" height="200px" class="elevation-4">
                        <v-card-title class="pb-0">
                            <td><h3 class="" style="color: white;margin-top: -75px">{{title}}</h3></td>
                            <td><h1 class="" style="color: white;margin-top: 60%;">{{titleNum}}</h1></td>
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
                <div class="elevation-4">
                    <v-toolbar color="primary lighten-2" dark>
                        <v-toolbar-title>{{titleE}}</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-data-table :headers="headers" :items="desserts" class="elevation-4">
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.tableName }}</td>
                            <td>{{ props.item.tableDesc }}</td>
                            <td>{{ props.item.system }}</td>
                            <td>{{ props.item.modelId }}</td>
                            <td>{{ props.item.parameter }}</td>
                            <td>
                                <v-btn depressed outline icon fab dark color="primary lighten-2" small @click="routerTableInfo(props.item.tableName)">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                            </td>
                        </template>
                    </v-data-table>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    import TableList from './tables/tableList'
    import {getTableList} from "@/api/url/prodInfo";

    export default {
        components: {
            TableList
        },
        data() {
            return {
                title: "核心系统",
                titleE: "Ensemble",
                titleNum: "105",
                action: 'ensemble',
                items: [
                    {title: '核心系统',name: 'Ensemble', class: '',icon: 'settings',color: "blue"},
                    {title: '核算系统',name: 'Accounting', class: '',icon: 'settings',color: "blue"},
                    {title: '利率市场化',name: 'Price', class: '',icon: 'settings',color: "blue"}
                ],
                window: 0,
                windowItem: 'windowItem',
                windowTitle: 'windowTitle',
                dialog: false,
                headers: [
                    { text: '交易ID',sortable: false},
                    { text: '交易名称',sortable: false},
                    { text: '所属系统',sortable: false },
                    { text: '所属模块',sortable: false },
                    { text: '参数类型',sortable: false },
                    { text: 'Action',sortable: false }
                ],
                desserts: [
                    {
                        tableName: '',
                        tableDesc: '',
                        system: '',
                        modelId: '',
                        parameter: ''
                    }
                ],
                editedIndex: -1,
                defaultItem: {
                    tableName: '',
                    tableDesc: '',
                    system: '',
                    modelId: '',
                    parameter: ''
                }
            }
        },
        created () {
            this.getParaTable()
        },
        methods: {
            actionTag(item) {
                if(item.name === "Ensemble"){
                    this.title = "核心系统"
                    this.titleE = "Ensemble"
                    this.titleNum = "125"
                }
                if(item.name === "Accounting"){
                    this.title = "核算系统"
                    this.titleE = "Accounting"
                    this.titleNum = "105"
                }
                if(item.name === "Price"){
                    this.title = "利率市场化"
                    this.titleE = "Price"
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
            getParaTable() {
                let that=this;
                getTableList("ensemble").then(function (response){
                    that.desserts=response.data.data.tableList;
                });
            },
            routerTableInfo(tableName) {
                this.$router.push({
                    name: 'tableInfo',
                    params: {
                        'tableName': tableName
                    }
                })
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
