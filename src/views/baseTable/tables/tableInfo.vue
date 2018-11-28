<template>
    <v-layout justify-center pt-4>
        <v-flex xs12 sm12>
            <v-toolbar card dense color="primary lighten-2" dark>
                <v-toolbar-title>MB_PROD_TYPE-产品定义表</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card>
                <v-toolbar card dense color="transparent">
                    <v-layout justify-center>
                        <v-flex xs6 sm6>
                    <dc-text-field label="产品类型" labelDesc="产品类型" v-model='prodTypeSearch'/>
                        </v-flex>
                        <v-flex xs6 sm6>
                    <dc-multiselect label="产品分类" labelDesc="产品分类" v-model='prodClassSearch' :options="prodClassOption"></dc-multiselect>
                        </v-flex>
                    </v-layout>
                </v-toolbar>
                <v-toolbar card dense color="transparent">
                    <a-button type="primary" @click="onAdd">新增</a-button>
                    <a-button type="primary" @click="onEdit" class="ml-2">修改</a-button>
                    <a-button type="primary" @click="onDelete" class="ml-2">删除</a-button>
                    <a-button type="primary" @click="onSave" class="ml-2">提交</a-button>
                </v-toolbar>
                <v-card-text class="pa-0">
                    <a-table :customRow="customRow" :columns="columns" @change="changeTable" :dataSource="dataInfo">
                    </a-table>
                    <v-divider></v-divider>
                </v-card-text>
                <v-dialog
                        v-model="dialog"
                        width="500"
                >
                    <edit-table-info :selected="selected" :columns="columns"
                                     v-on:editAction="editAction"></edit-table-info>
                </v-dialog>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
    import EditTableInfo from './editTableInfo'
    import {getParamTable} from "@/api/url/prodInfo";
    import {saveTable} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';
    import DcTextField from "@/components/widgets/DcTextField";
    import {
        savaProdInfo
    } from '@/api/url/prodInfo';
    import {remove} from '@/utils/util'
    import {filterTableChangeData} from "@/server/filterTableChangeData";
    import DcMultiselect from "../../../components/widgets/DcMultiselect";

    export default {
        components: {
            DcMultiselect,
            EditTableInfo,
            DcTextField
        },
        data() {
            return {
                dataInfo: [],
                sourceDataInfo: [],
                disabledFlag: false,
                prodType: '',
                open: true,
                prodTypeSearch: '',
                prodClassSearch: 'RB100',
                prodClassOption: [
                    {
                        "key": "RB100",
                        "value": "RB100-存款RB100"
                    },
                    {
                        "key": "RB400",
                        "value": "RB400-存款RB400"
                    }
                ],
                valid: true,
                dialog: false,
                tbd: {},
                option: '',
                selectedRowKeys: [],
                selected: {},
                columns: [],
                backValue: {}
            };
        },
        mounted: function () {
            if (this.$route.params.tableName != undefined) {
                this.getParaTable(this.$route.params.tableName);
            }
        },
        methods: {
            getParaTable(tableName) {
                let that = this;
                getParamTable("MB_PROD_TYPE").then(function (response) {
                    that.dataInfo = response.data.data.columnInfo;
                    that.sourceDataInfo = that.copy(that.dataInfo, that.sourceDataInfo)
                    that.columns = response.data.data.column;
                });
            },
            copy(obj1, obj2) {
                var obj = obj2 || {};
                for (let name in obj1) {
                    if (typeof obj1[name] === "object" && obj1[name] !== null) {
                        obj[name] = (obj1[name].constructor === Array) ? [] : {};
                        this.copy(obj1[name], obj[name]);
                    } else {
                        obj[name] = obj1[name];
                    }
                }
                return obj;
            },
            customRow(record) {
                return {
                    on: {
                        click: this.clickRow.bind(this, record)
                    }
                }
            },
            clickRow(record, event) {
                var tr = event.currentTarget;
                var tbd = tr.parentNode;
                for (const i in tbd.childNodes) {
                    if (!isNaN(i)) {
                        if (tr == tbd.childNodes[i]) {
                            tbd.childNodes[i].style = 'background-color: #e6f7ff';
                            this.tbd = tbd.childNodes[i]
                        } else {
                            tbd.childNodes[i].style = '';
                        }
                    }
                }
                this.selected = record;
            },
            onEdit() {
                this.tbd.style = '';
                this.dialog = true;
            },
            onAdd() {
                this.tbd.style = '';
                this.selected = {};
                this.dialog = true
            },
            onDelete() {
                this.tbd.style = '';
                remove(this.dataInfo, this.selected)
            },
            changeTable() {
                this.tbd.style = '';
            },
            onSave() {
                let test = this.dataInfo
                this.backValue.data = filterTableChangeData(this.columns, this.dataInfo, this.sourceDataInfo)
                this.backValue.tableName = "MB_PROD_TYPE"
                this.backValue.option = "save"
                this.backValue.userName = sessionStorage.getItem("userId")
                saveTable(this.backValue).then(response => {
                    if (response.status === 200) {
                        toast.success("提交成功！");
                    }
                })

            },
            editAction(option, editSelected) {
                this.dialog = false;
                if (option == 'submit') {
                    let selected = this.selected;
                    if (JSON.stringify(selected) == '{}') {
                        for (const key in editSelected) {
                            selected[key] = editSelected[key].value
                        }
                        this.dataInfo.splice(0, 0, selected)
                    } else {
                        for (const key in selected) {
                            selected[key] = editSelected[key].value
                        }
                    }
                }
            }
        }
    };
</script>