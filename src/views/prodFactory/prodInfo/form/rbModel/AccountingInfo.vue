<template>
    <v-card>
        <v-toolbar card dense color="transparent">
            <v-dialog v-model="dialog" max-width="900px">
                <v-btn slot="activator" color="success" dark class="mb-2" @click="addClick">新增</v-btn>
                <v-btn slot="activator" color="success" dark class="mb-2" @click="modClick">修改</v-btn>
                <v-card>
                    <v-card-text>
                        <v-flex xs12 md12 lg12>
                            <div slot="widget-content">
                                <v-container fluid pt-1>
                                    <v-layout row wrap>
                                        <v-flex>
                                            <v-subheader class="primary--text subheading">产品类型*</v-subheader>
                                        </v-flex>
                                        <v-flex md3 lg3>
                                            <v-text-field class="primary--text mx-1" label="产品类型" name="title" v-model="editedItem.prodType" single-line hide-details disabled>
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12 md3 lg3>
                                            <v-subheader class="primary--text subheading">核算状态*</v-subheader>
                                        </v-flex>
                                        <v-flex md3 lg3>
                                            <v-select class="primary--text mx-2" :items="accountingStatus" v-model="editedItem.accountingStatus" label="核算状态" item-text="value" item-value="key" single-line hide-details></v-select>
                                       </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs12 md3 lg3>
                                            <v-subheader class="primary--text subheading">账套*</v-subheader>
                                        </v-flex>
                                        <v-flex md3 lg3>
                                            <v-text-field class="primary--text mx-1" label="账套" name="title" v-model="editedItem.businessUnit" single-line hide-details>
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12 md3 lg3>
                                            <v-subheader class="primary--text subheading">负债科目代码*</v-subheader>
                                        </v-flex>
                                        <v-flex md3 lg3>
                                            <v-select class="primary--text mx-2" :items="glCodeL" v-model="editedItem.glCodeL" label="负债科目代码" item-text="value" item-value="key" single-line hide-details></v-select>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs12 md3 lg3>
                                            <v-subheader class="primary--text subheading">利息支出科目代码*</v-subheader>
                                        </v-flex>
                                        <v-flex md3 lg3>
                                            <v-select class="primary--text mx-2" :items="glCodeIntE" v-model="editedItem.glCodeIntE" label="利息支出科目代码" item-text="value" item-value="key" single-line hide-details></v-select>
                                        </v-flex>
                                        <v-flex xs12 md3 lg3>
                                            <v-subheader class="primary--text subheading">应付利息科目代码*</v-subheader>
                                        </v-flex>
                                        <v-flex md3 lg3>
                                            <v-select class="primary--text mx-2" :items="glCodeIntPay" v-model="editedItem.glCodeIntPay" label="应付利息科目代码" item-text="value" item-value="key" single-line hide-details></v-select>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </div>
                        </v-flex>
                        <v-layout row wrap>
                            <v-flex xs12 md2 lg2>
                            </v-flex>
                            <v-btn color="success" depressed="" @click="close"><v-icon >assignment_turned_in</v-icon>取消</v-btn>
                            <v-flex xs12 md3 lg3>
                            </v-flex>
                            <v-btn color="success" depressed="" @click="saveClick"><v-icon >assignment_turned_in</v-icon>保存</v-btn>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
            <template>
                <v-data-table :headers="headers" :items="prodAccountingInfo" hide-actions class="elevation-0">
                    <template slot="items" slot-scope="props">
                        <tr @click="getSelect(props.item)" v-bind:class="{'chargeSelected': props.item==editedItem }" highlight-row>
                            <td class="text-xs-left">{{ props.item.prodType | getColumnDesc}}</td>
                            <td class="text-xs-left">{{ props.item.accountingStatus | getColumnDesc}}</td>
                            <td class="text-xs-left">{{ props.item.businessUnit | getColumnDesc}}</td>
                            <td class="text-xs-left">{{ props.item.glCodeL | getColumnDesc}}</td>
                            <td class="text-xs-left">{{ props.item.glCodeIntE | getColumnDesc}}</td>
                            <td class="text-xs-left">{{ props.item.glCodeIntPay | getColumnDesc}}</td>
                        </tr>
                    </template>
                </v-data-table>
            </template>
            <v-divider></v-divider>
        </v-card-text>
    </v-card>
</template>
<script>
    import {getChargeDefine} from '@/api/table';
    import {getColumnDesc} from '@/utils/columnDesc'
    import toast from '@/utils/toast';
    import { getInitData } from "@/mock/init";


    export default {
        filters: {
            getDescByKey: function (key) {
                return getColumnDesc(key)
            }
        },
        props: ["prodData"],
        data () {
            return {
                dialog: false,
                addFlag: false,
                modFlag: false,
                refData: getInitData,
                prodType: '',
                accountingStatus: [{
                    key: "",
                    value: ""
                }],
                glCodeL: [{
                    key: "",
                    value: ""
                }],
                glCodeIntE: [{
                    key: "",
                    value: ""
                }],
                glCodeIntPay: [{
                    key: "",
                    value: ""
                }],
                headers: [
                    {text: '产品类型', align: 'left', value: 'prodType'},
                    {text: '核算状态', value: 'accountingStatus'},
                    {text: '账套', value: 'businessUnit'},
                    {text: '负债科目代码', value: 'glCodeL' },
                    {text: '利息支出科目代码', value: 'glCodeIntE'},
                    {text: '应付利息科目代码', value: 'glCodeIntPay'}
                ],
                editedItem: {
                    prodType: '',
                    accountingStatus: '',
                    businessUnit: '',
                    glCodeL: '',
                    glCodeIntE: '',
                    glCodeIntPay: ''
                },
                defaultItem: {
                    prodType: '',
                    accountingStatus: '',
                    businessUnit: '',
                    glCodeL: '',
                    glCodeIntE: '',
                    glCodeIntPay: ''
                },
                projects: [{
                    prodType: '',
                    accountingStatus: '',
                    businessUnit: '',
                    glCodeL: '',
                    glCodeIntE: '',
                    glCodeIntPay: ''
                }],
                prodAccountingInfo: []
            };
        },
        computed: {

        },
        watch: {
            prodData (val) {
                this.getChargeDefinesInfo(val)
            }
        },
        mounted: function() {
            this.queryDespositProdData(this.prodData)
            this.initRefDate()
        },
        methods: {
            getChargeDefinesInfo(val) {
                //初始化产品对应的信息
                this.prodAccountingInfo = []
                this.prodAccountingInfo = val.glProdAccounting
                this.prodType = val.prodType.prodType
            },
            editItem (item) {
                this.editedIndex = this.projects.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
                this.close()

            },
            initRefDate() {
                this.accountingStatus = this.refData[2].paraDataRb.accountingStatus;
                //暂时不区分科目代码
                this.glCodeL = this.refData[2].paraDataRb.glCode;
                this.glCodeIntE = this.refData[2].paraDataRb.glCode;
                this.glCodeIntPay = this.refData[2].paraDataRb.glCode;

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
                    let flag = 0
                    for(let i = 0; i<this.prodAccountingInfo.length; i++){
                        if(this.editedItem.accountingStatus === "" || this.editedItem.accountingStatus === undefined){
                            toast.info("主键accountingStatus[核算状态]不能为空!");
                            flag = 1
                            break
                        }else if(this.prodAccountingInfo[i].prodType === this.editedItem.prodType && this.prodAccountingInfo[i].accountingStatus === this.editedItem.accountingStatus){
                            toast.info("主键accountingStatus[核算状态:"+this.editedItem.accountingStatus+"]不能重复!");
                            flag = 1
                            break
                        }
                    }
                    if(flag === 0){
                        this.prodAccountingInfo.push(this.editedItem)
                        this.close()
                    }
                }
            },
            getSelect(value){
                this.editedItem = []
                this.editedItem = value
            },
            addClick() {
                this.initRefDate()
                this.editedItem = []
                //新增产品类型默认&&不允许修改
                this.editedItem.prodType = this.prodType
                this.modFlag = false
                this.addFlag = true
            },
            modClick() {
                this.initRefDate()
                this.addFlag = false
                this.modFlag = true
            },
            saveClick() {
                if(this.addFlag){
                    this.save()
                }else if(this.modFlag){
                    this.editItem()
                }
            }
        }
    };
</script>
<style>
    .chargeSelected {
        background-color: #e3f2fd;
    }
</style>
