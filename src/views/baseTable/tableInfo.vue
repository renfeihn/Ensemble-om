<template>
    <v-card>
        <v-toolbar card dense color="transparent">
            <a-button type="primary" @click="onAdd">新增</a-button>
            <a-button type="primary" @click="onEdit" class="ml-2">修改</a-button>
            <a-button type="primary" @click="onDelete" class="ml-2">删除</a-button>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
            <a-table :customRow="customRow" :columns="columns" :dataSource="dataInfo" bordered>
            </a-table>
            <v-divider></v-divider>
        </v-card-text>
    </v-card>

</template>
<script>
    import {getParamTable} from "@/api/url/prodInfo";
    export default {
        data () {
            return {
                dataInfo: [],
                disabledFlag: false,
                prodType: '',
                open: true,
                valid: true,
                dialog: false,
                option: '',
                selectedRowKeys: [],
                selected: {},
                columns: [
                ]
            };
        },
        mounted: function() {
            if(this.$route.params.tableName!=undefined){
                this.getParaTable(this.$route.params.tableName);
            }
        },
        methods: {
            getParaTable(tableName) {
                let that=this;
                getParamTable("MB_PROD_TYPE").then(function (response){
                    that.dataInfo=response.data.data.columnInfo;
                    that.columns=response.data.data.column;
                });
            }
        }
    };
</script>