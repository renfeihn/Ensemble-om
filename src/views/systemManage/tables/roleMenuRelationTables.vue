<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn round color="blue" dark @click="saveClick">
                <v-icon>save</v-icon>
                <td>保存</td>
            </v-btn>
            <v-dialog v-model="dialog" max-width="500px">
                <v-btn round slot="activator" color="blue" dark>
                    <v-icon>add</v-icon>
                    <td>添加</td>
                </v-btn>
                <v-card>
                    <v-card-title>
                        <span style="color: #00b0ff;font-size: x-large;margin-left: 5%">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text style="margin-top: -10%">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <v-select v-model="editedItem.roleId" label="角色ID" :items="roleRef" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs12 sm12 md12 >
                                    <v-select v-model="editedItem.menuId" label="菜单ID" :items="muneRef" item-text="value" item-value="key"></v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions style="margin-top: -7%">
                        <v-btn color="info" @click="close" class="bthStyle" style="margin-left: 6%">取消</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="info" @click="save" class="bthStyle" style="margin-right: 6%">保存</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-data-table :headers="headers" :items="desserts" class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.roleId }}</td>
                <td>{{ props.item.menuId }}</td>
                <td>
                    <v-icon small @click="deleteItem(props.item)" style="color: red">delete</v-icon>
                </td>
            </template>
        </v-data-table>
    </div>
</template>
<script>
    import {getSysTable} from "@/api/url/prodInfo";
    import {getPkList} from '@/views/prodFactory/prodInfo/pkListColumnInfo'
    import {filterTableChangeData} from "@/server/filterTableChangeData";
    import {saveSysTable} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';
    import {getSysInfoByUser} from "@/api/url/prodInfo";

    export default {
        props: ["title"],
        data: () => ({
            dialog: false,
            headers: [
                {text: '角色ID'},
                {text: '菜单ID',sortable: false,size: "medium"},
                { text: 'Action',sortable: false }
            ],
            muneRef: [{key: "",value: ""}],
            roleRef: [{key: "",value: ""}],
            desserts: [],
            sourceData: [],
            keySet: [
                {
                    key: "true",
                    dataIndex: "menuId"
                },
                {
                    key: "true",
                    dataIndex: "roleId"
                }
            ],
            editedIndex: -1,
            title: "",
            editedItem: {
                roleId: '',
                menuId: ''
            },
            defaultItem: {
                roleId: '',
                menuId: ''
            },
            backValue: {}
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新增角色菜单关系' : '修改角色菜单关系'
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            }
        },

        created () {
            this.initialize()
            this.initRf()
        },

        methods: {
            initialize () {
                let that = this
                let userId = sessionStorage.getItem("userId")
                let userLevel = sessionStorage.getItem("userLevel")
                //获取角色信息
                getSysInfoByUser(userId).then(function (response) {
                    that.desserts = response.data.data.menuRoleInfo;
                    that.sourceData = that.copy(that.desserts,that.sourceData)
                });
            },
            initRf() {
                //装载菜单列表
                let tempMenu = {}
                let that = this
                tempMenu["tableName"] = "OM_MENU";
                tempMenu["columnCode"] = "MENU_ID";
                tempMenu["columnDesc"] = "MENU_NAME"
                getPkList(tempMenu,response => {
                    that.muneRef = response
                });
                //装载角色列表
                let tempRole = {}
                tempRole["tableName"] = "OM_ROLE";
                tempRole["columnCode"] = "ROLE_ID";
                tempRole["columnDesc"] = "ROLE_NAME"
                getPkList(tempRole,response => {
                    that.roleRef = response
                });
            },
            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },

            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
                this.close()
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
            saveClick() {
                //保存数据落库
                this.backValue.data = filterTableChangeData(this.keySet,this.desserts,this.sourceData)
                this.backValue.userName = sessionStorage.getItem("userId")
                this.backValue.tableName = "OM_MENU_ROLE"
                this.backValue.keySet = "ROLE_ID,MENU_ID"
                saveSysTable(this.backValue).then(response => {
                    if(response.status === 200){
                        toast.success("提交成功！");
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .ee{
        font-size: medium;
    }
    .bthStyle {
        color: #00b0ff;
        width: 120px;
    }
</style>