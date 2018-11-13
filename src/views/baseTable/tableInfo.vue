<template>
    <v-card>
        <v-toolbar card dense color="transparent">
            <a-button type="primary" @click="onAdd">新增</a-button>
            <a-button type="primary" @click="onEdit" class="ml-2">修改</a-button>
            <a-button type="primary" @click="onDelete" class="ml-2">删除</a-button>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
            <a-table :customRow="customRow" :columns="columns" @change="changeTable" :dataSource="dataInfo" bordered>
            </a-table>
            <v-divider></v-divider>
        </v-card-text>
        <v-dialog
                v-model="dialog"
                width="500"
        >
            <edit-table-info :selected="selected" :columns="columns" v-on:editAction="editAction"></edit-table-info>
        </v-dialog>
    </v-card>
</template>
<script>
    import EditTableInfo from './editTableInfo'
    import {getParamTable} from "@/api/url/prodInfo";
    import {remove} from '@/utils/util'
    export default {
        components: {
            EditTableInfo
        },
        data () {
            return {
                dataInfo: [],
                disabledFlag: false,
                prodType: '',
                open: true,
                valid: true,
                dialog: false,
                tbd: {},
                option: '',
                selectedRowKeys: [],
                selected: {},
                columns: []
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
                    that.columns = response.data.data.column;
                });
            },
            customRow (record) {
                return {
                    on: {
                        click: this.clickRow.bind(this, record)
                    }
                }
            },
            clickRow(record, event){
                var tr = event.currentTarget;
                var tbd = tr.parentNode;
                for (const i in tbd.childNodes) {
                    if (!isNaN(i)) {
                        if (tr == tbd.childNodes[i]) {
                            tbd.childNodes[i].style = 'background-color: #e6f7ff';
                            this.tbd=tbd.childNodes[i]
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
                remove(this.dataInfo,this.selected)
            },
            changeTable() {
                this.tbd.style = '';
            },
            editAction(option, editSelected) {
                this.dialog = false;
                if (option == 'submit') {
                    let selected = this.selected;
                    if (JSON.stringify(selected) == '{}') {
                        for (const key in editSelected) {
                            selected[key] = editSelected[key].value
                        }
                        this.dataInfo.splice(0,0, selected)
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