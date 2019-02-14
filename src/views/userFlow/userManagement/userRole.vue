<template>
    <v-layout row wrap>
        <v-card style="width: 95%" class="elevation-4">
            <v-toolbar color="primary lighten-2" dark>
                <v-btn icon>
                    <v-icon>settings</v-icon>
                </v-btn>
                <v-toolbar-title>用户权限</v-toolbar-title>
            </v-toolbar>
            <div>
                <v-layout row wrap>
                    <v-flex md4 lg4>
                        <br><br>
                        <div class="headline pa-3">
                            用户角色:  {{this.userRole[0].roleDesc}}
                        </div>
                        <div class="headline pa-3">
                            所属部门:  {{this.user[0].branch}}
                        </div>
                        <div class="headline pa-3">
                            用户角色等级:  {{this.userRole[0].roleLevel}}
                        </div>
                        <div class="headline pa-3">
                            用户等级:  {{this.user[0].userLevel}}
                        </div>
                    </v-flex>
                    <v-flex md8 lg8>
                        <div class="headline text-xs-center pa-3">
                            授权的界面:
                        </div>
                        <div style="height: 1px;background-color: black;width: 100%"></div>
                        <v-data-table :headers="headers" :items="desserts" class="elevation-1">
                            <template slot="items" slot-scope="props">
                                <td>{{ props.item.menuId }}</td>
                                <td>{{ props.item.menuParentId }}</td>
                                <td>{{ props.item.menuStatus }}</td>
                                <td>{{ props.item.menuTitle }}</td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
            </div>
        </v-card>
    </v-layout>

</template>
<script>
    import {getSysUserInfoByUser} from "@/api/url/prodInfo";
    import {filterTableChangeData} from "@/server/filterTableChangeData";
    import {saveSysTable} from "@/api/url/prodInfo";

    export default {

        data: () => ({
            headers: [
                { text: '菜单id', sortable: false},
                { text: '父菜单id', sortable: false },
                { text: '菜单状态', sortable: false },
                { text: '菜单名称', sortable: false },
            ],
            desserts: [],
            userRole: [],
            user: [],
            rule: [],
            valid: true,
            sourceData: [],
            backValue: {},
            keySet: [
                {
                    key: "true",
                    dataIndex: "userId"
                }
            ],
        }),
        computed: {
           userId (){
             return sessionStorage.getItem("userId")
           }
        },
        created () {
            this.initialize()
        },
        methods: {
            initialize () {
                let that = this
                let userId = sessionStorage.getItem("userId")
                getSysUserInfoByUser(userId).then(function (response) {
                    that.desserts = response.data.data.columnInfo;
                    that.user = response.data.data.userInfo;
                    that.userRole = response.data.data.roleInfo
                    that.sourceData = that.copy(that.desserts,that.sourceData)
                });
            },
            //对象浅复制
            copy(obj1,obj2) {
                var obj = obj2||{};
                for(let name in obj1){
                    if(typeof obj1[name] === "object" && obj1[name]!== null){
                        obj[name]= (obj1[name].constructor===Array)?[]:{};
                        this.copy(obj1[name],obj[name]);
                    }else{
                        obj[name]=obj1[name];
                    }
                }
                return obj;
            },
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