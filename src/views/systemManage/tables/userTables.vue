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
                <v-btn round slot="activator" color="blue" dark @click="addClick">
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
                                <v-flex xs12 sm6 md6 v-if="disabled=='false'">
                                    <v-text-field v-model="editedItem.userId" label="用户ID"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6 v-if="disabled=='true'">
                                    <v-text-field v-model="editedItem.userId" label="用户ID" disabled></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.userName" label="用户名称"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.parentUserId" label="父级用户" disabled></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.userLevel" label="用户级别"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.branch" label="所属部门"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.company" label="所属法人"></v-text-field>
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
                <td>{{ props.item.userId }}</td>
                <td>{{ props.item.userName }}</td>
                <td>{{ props.item.parentUserId }}</td>
                <td>{{ props.item.userLevel }}</td>
                <td>{{ props.item.branch }}</td>
                <td>{{ props.item.company }}</td>
                <td>
                    <v-icon small class="mr-2" @click="editItem(props.item)" style="color: #0d47a1">edit</v-icon>
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
            disabled: "false",

            headers: [
                {text: '用户ID',sortable: false},
                { text: '用户名称',sortable: false},
                { text: '父级用户ID',sortable: false },
                { text: '用户等级',sortable: false },
                { text: '所属部门',sortable: false },
                { text: '所属法人',sortable: false},
                { text: 'Action',sortable: false }

            ],
            perent: [{key: "",value: ""}],
            desserts: [],
            sourceData: [],
            keySet: [
                {
                    key: "true",
                    dataIndex: "userId"
                }
            ],
            editedIndex: -1,
            title: "",
            editedItem: {
                userId: '',
                userName: '',
                parentUserId: '',
                userLevel: '',
                branch: '',
                company: '',
                password: ''
            },
            defaultItem: {
                userId: '',
                userName: '',
                parentUserId: '',
                userLevel: '',
                branch: '',
                company: '',
                password: ''

            },
            backValue: {}
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新增用户' : '修改用户'
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            }
        },

        created () {
            this.initialize()
            this.initParentRef()
        },

        methods: {
            initialize () {
                let that = this
                let userId = sessionStorage.getItem("userId")
                let userLevel = sessionStorage.getItem("userLevel")
                //增加用户 父级用户默认为本身
                that.editedItem.parentUserId = userId
                //获取角色信息
                getSysInfoByUser(userId).then(function (response) {
                    that.desserts = response.data.data.userInfo;
                    that.sourceData = that.copy(that.desserts,that.sourceData)
                });
            },
            addClick() {
                this.disabled = "false"
            },
            initParentRef() {
                let temp = {}
                let that = this
                temp["tableName"] = "OM_USER";
                temp["columnCode"] = "USER_ID";
                temp["columnDesc"] = "USER_NAME"
                getPkList(temp,response => {
                    that.perent = response
            });
            },
            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
                this.disabled = "true";

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
                this.backValue.tableName = "OM_USER"
                this.backValue.keySet = "USER_ID"
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