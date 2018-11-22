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
                                <v-flex xs12 sm6 md6 v-if="disabled=='true'">
                                    <v-text-field v-model="editedItem.menuSeqNo" label="菜单序号" disabled></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6 v-if="disabled=='false'">
                                    <v-text-field v-model="editedItem.menuSeqNo" label="菜单序号"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.menuId" label="菜单ID"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.menuName" label="菜单名称"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-select v-model="editedItem.menuParentId" label="父级菜单" :items="perent" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.menuLevel" label="菜单等级"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.menuStatus" label="状态"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.menuIcon" label="菜单标识"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.menuComponent" label="菜单URL"></v-text-field>
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
                <td>{{ props.item.menuSeqNo }}</td>
                <td>{{ props.item.menuId }}</td>
                <td>{{ props.item.menuName }}</td>
                <td>{{ props.item.menuTitle }}</td>
                <td>{{ props.item.menuParentId }}</td>
                <td>{{ props.item.menuLevel }}</td>
                <td>{{ props.item.menuStatus }}</td>
                <td>{{ props.item.menuIcon }}</td>
                <td>{{ props.item.menuComponent }}</td>
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

    export default {
        props: ["title"],
        data: () => ({
            dialog: false,
            disabled: "false",
            headers: [
                {text: '菜单序号'},
                {text: '菜单ID',sortable: false,size: "medium"},
                { text: '菜单名称',sortable: false},
                { text: '菜单描述',sortable: false},
                { text: '父级菜单',sortable: false },
                { text: '菜单等级',sortable: false },
                { text: '状态',sortable: false },
                { text: '菜单标识',sortable: false},
                { text: '菜单URL',sortable: false },
                { text: 'Action',sortable: false }
            ],
            perent: [{key: "",value: ""}],
            desserts: [],
            sourceData: [],
            keySet: [
                {
                    key: "true",
                    dataIndex: "menuSeqNo"
                }
            ],
            editedIndex: -1,
            title: "",
            editedItem: {
                menuSeqNo: '',
                menuId: '',
                menuName: '',
                menuTitle: '',
                menuParentId: '',
                menuLevel: '',
                menuStatus: '',
                menuIcon: '',
                menuComponent: ''
            },
            defaultItem: {
                menuSeqNo: '',
                menuId: '',
                menuName: '',
                menuTitle: '',
                menuParentId: '',
                menuLevel: '',
                menuStatus: '',
                menuIcon: '',
                menuComponent: ''
            },
            backValue: {}
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新增菜单' : '修改菜单'
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
                getSysTable("OM_MENU").then(function (response) {
                    that.desserts = response.data.data.columnInfo;
                    that.sourceData = that.copy(that.desserts,that.sourceData)
                });
            },
            addClick() {
              this.disabled = "false"
            },

            initParentRef() {
                let temp = {}
                let that = this
                temp["tableName"] = "OM_MENU";
                temp["columnCode"] = "MENU_ID";
                temp["columnDesc"] = "MENU_NAME"
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
                this.backValue.tableName = "OM_MENU"
                this.backValue.keySet = "MENU_SEQ_NO"
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