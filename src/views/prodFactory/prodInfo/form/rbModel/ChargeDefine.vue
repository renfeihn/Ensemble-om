<template>
    <v-card>
        <v-toolbar card dense color="transparent">
            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" color="success" dark class="mb-2">新增</v-btn>
                <v-btn slot="activator" color="success" dark class="mb-2">修改</v-btn>
                <v-card>
                    <v-card-title><span class="headline">形态转移</span></v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                        <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.chargeType" label="批量收费类型"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.chargeFreq" label="收费频率"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.chargeDate" label="收费日期"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.chargeDealMethod" label="收费处理方式"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.conDedFlag" label="持续扣款标识"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.conDedNum" label="持续扣款次数"></v-text-field>
                        </v-flex>
                        </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="close">取消</v-btn>
                        <v-btn color="blue darken-1" flat @click.native="save">保存</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
            <template>
                <v-data-table :headers="headers" :items="projects" hide-actions class="elevation-0">
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-left">{{ props.item.chargeType }}</td>
                        <td class="text-xs-left">{{ props.item.chargeFreq }}</td>
                        <td class="text-xs-left">{{ props.item.chargeDate }}</td>
                        <td class="text-xs-left">{{ props.item.chargeDealMethod }}</td>
                        <td class="text-xs-left">{{ props.item.conDedFlag }}</td>
                        <td class="text-xs-left">{{ props.item.conDedNum }}</td>
                    </template>
                </v-data-table>
            </template>
            <v-divider></v-divider>
        </v-card-text>
    </v-card>
</template>
<script>
import {getChargeDefine} from '@/api/table';
export default {
    data () {
        return {
            dialog: false,
            headers: [
                {text: '批量收费类型', align: 'left', value: 'chargeType'},
                {text: '收费频率', value: 'chargeFreq'},
                {text: '收费日期', value: 'chargeDate'},
                {text: '收费处理方式', value: 'chargeDealMethod' },
                {text: '持续扣款标识', value: 'conDedFlag'},
                {text: '持续扣款次数', value: 'conDedNum'}
            ],
            editedItem: {
                chargeType: '',
                chargeFreq: '',
                chargeDate: '',
                chargeDealMethod: '',
                conDedFlag: '',
                conDedNum: ''
            },
            defaultItem: {
                chargeType: '',
                chargeFreq: '',
                chargeDate: '',
                chargeDealMethod: '',
                conDedFlag: '',
                conDedNum: ''
            },
            projects: [{
                chargeType: '',
                chargeFreq: '',
                chargeDate: '',
                chargeDealMethod: '',
                conDedFlag: '',
                conDedNum: ''
            }]
        };
    },
    computed: {

    },
    watch: {
        dialog (val) {
            val || this.close()
        }
    },
    mounted: function() {
        this.queryDespositProdData()
    },
    methods: {
        queryDespositProdData() {
            getChargeDefine().then(response => {
                this.projects = response.data.chargeDefine
            })
        },
        editItem (item) {
            this.editedIndex = this.projects.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem (item) {
            const index = this.projects.indexOf(item)
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
                Object.assign(this.projects[this.editedIndex], this.editedItem)
            } else {
                this.projects.push(this.editedItem)
            }
            this.close()
        }
    }
};
</script>
