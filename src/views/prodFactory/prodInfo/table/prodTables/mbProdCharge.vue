<template>
    <v-card>
        <v-toolbar card dense color="transparent">
            <!--<a-button type="primary" @click="onAdd">新增</a-button>-->
            <a-button type="primary" @click="onEdit" class="ml-2">修改</a-button>
            <!--<a-button type="primary" @click="onDelete" class="ml-2">删除</a-button>-->
            <v-dialog v-model="dialog" width="800">
                <v-toolbar color="primary lighten-2" style="height: 50px">
                    <v-toolbar-title class="white--text" style="margin-top: -2%">{{ titleDesc}}</v-toolbar-title>
                </v-toolbar>
                <v-card v-if="dialog">
                    <v-card-text>
                        <v-layout wrap>
                            <v-flex xs12 sm6 m6>
                                <dc-multiselect :isMultiSelect="false" v-model="selected.chargePeriodFreq" :options="chargePeriodFreq1" labelDesc="  收费频率"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <dc-multiselect :isMultiSelect="false" v-model="selected.chargeDealMethod" :options="chargeDealMethod1" labelDesc="  收费处理方式"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <dc-multiselect :isMultiSelect="false" v-model="selected.conDeductFlag" :options="conDeductFlag1" labelDesc="  持续扣款标识"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <dc-date v-model="selected.nextChargeDate" labelDesc="下一收费日期"></dc-date>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <dc-text-field labelDesc="收费日" v-model="selected.chargeDay"></dc-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <dc-text-field labelDesc="持续扣款次数" v-model="selected.conDeductTimes"></dc-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <dc-text-field labelDesc="批量收费类型" v-model="selected.feeType"></dc-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <v-btn color="info" @click="dialog = false" class="bthStyle">取消</v-btn>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <v-btn color="info" @click="submit" class="bthStyle" style="margin-left: 50%">保存</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
                <a-table :customRow="customRow" :columns="columns" :dataSource="chargeDefinesInfo" bordered>
                </a-table>
        </v-card-text>
    </v-card>

</template>
<script>
import DcMultiselect from '@/components/widgets/DcMultiselect'
import DcTextField from "@/components/widgets/DcTextField";
import {getChargeDefine} from '@/api/table';
import toast from '@/utils/toast';
import { getInitData } from "@/mock/init";
import {getColumnDesc} from '@/utils/columnDesc'
import {removeByValue} from '@/utils/util'
import DcDate from '@/components/widgets/DcDate'

export default {
    filters: {
        getDescByKey: function (key) {
            return getColumnDesc(key)
        }
    },
    components: { DcMultiselect,DcDate,DcTextField},
    props: ["prodData"],
    data () {
        return {
            chargeDefinesInfo: '',
            disabledFlag: false,
            prodType: '',
            open: true,
            valid: true,
            dialog: false,
            refData: getInitData,
            option: '',
            titleDesc: '',
            selectedRowKeys: [],
            selected: {
                feeType: '',
                chargePeriodFreq: '',
                chargeDay: '',
                nextChargeDate: '',
                chargeDealMethod: '',
                conDeductFlag: '',
                conDeductTimes: ''
            },
            chargePeriodFreq1: [
                {
                    "key": "3D",
                    "value": "3D-3天"
                },
                {
                    "key": "2D",
                    "value": "2D-2天"
                }
            ],
            chargeDealMethod1: [
                {
                    "key": "10",
                    "value": "10-实时生效"
                },
                {
                    "key": "11",
                    "value": "11-日终处理"
                }
            ],
            conDeductFlag1: [
                {
                    "key": "Y",
                    "value": "Y-持续扣款"
                },
                {
                    "key": "N",
                    "value": "N-非持续扣款"
                }
            ],
            columns: [
                {dataIndex: 'feeType', title: '批量收费类型',scopedSlots: { customRender: 'feeType' }},
                {dataIndex: 'chargePeriodFreq', title: '收费频率'},
                {dataIndex: 'chargeDay', title: '收费日'},
                {dataIndex: 'nextChargeDate', title: '下一收费日'},
                {dataIndex: 'chargeDealMethod', title: '收费处理方式'},
                {dataIndex: 'conDeductFlag', title: '持续扣款标识'},
                {dataIndex: 'conDeductTimes', title: '持续扣款次数'}
            ]
        };
    },
    watch: {
        prodData (val) {
            this.getChargeDefinesInfo(val)
        }
    },
    mounted: function() {
        this.getChargeDefinesInfo(this._props.prodData)
    },

    methods: {
        testClick(val) {
          alert(val)
        },
        //获取原始数据
        getChargeDefinesInfo(val) {
            //初始化产品对应的信息
            if(val!=undefined&&val.prodType!=undefined){
                this.chargeDefinesInfo = val.mbProdCharge
                this.prodType = val.prodType.prodType
            }
        },
        //加载备选数据
        initRefDate() {
            this.feeType = this.refData[2].paraDataRb.feeType;
            this.chargePeriodFreq = this.refData[2].paraDataRb.chargePeriodFreq;
            this.chargeDealMethod = this.refData[2].paraDataRb.chargeDealMethod;
            this.conDeductFlag = this.refData[2].paraDataRb.conDeductFlag;
        },
        //删除
        onDelete () {
            let dataSource=this.chargeDefinesInfo
            confirm('确认删除该条参数?') && removeByValue(dataSource,this.selected)
        },
        //新增
        onAdd () {
            this.option='add';
            this.titleDesc = "新增信息";
            this.selected={};
            this.dialog=true;
            this.disabledFlag =false;
        },
        //修改
        onEdit () {
            this.option='edit';
            this.dialog=true;
            this.titleDesc = "修改信息";
            this.disabledFlag = true;
        },
        //弹框增加或修改保存事件
        submit () {
            if(this.option == 'add'){
                let dataSource=this.chargeDefinesInfo
                let selected=this.selected;
                selected.prodType=this.prodType
                dataSource.push(selected)
                this.dialog=false;
            }
            if(this.option =='edit')
            {
                this.dialog=false;
            }
        },
        //点击某行，无效选中数据
        customRow (record) {
            return {
                on: {
                    click: this.clickRow.bind(this, record)
                }
            }
        },
        //点击某行 选中数据
        clickRow(record,event){
            var tr=event.currentTarget;
            var tbd=tr.parentNode;
            for (const i in tbd.childNodes) {
                if (!isNaN(i)) {
                    if (tr == tbd.childNodes[i]) {
                        tbd.childNodes[i].style = 'background-color: #e6f7ff';
                    } else {
                        tbd.childNodes[i].style = '';
                    }
                }
            }
            this.selected=record;
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
                //新增数据，产品类型默认
                this.editedItem.prodType = this.prodType
                let flag = 0
                for(let i = 0; i<this.chargeDefinesInfo.length; i++){
                    if(this.editedItem.feeType === "" || this.editedItem.feeType === undefined){
                        toast.info("主键feeType[批量收费类型]不能为空!");
                        flag = 1
                        break
                    }else if(this.chargeDefinesInfo[i].prodType === this.editedItem.prodType && this.chargeDefinesInfo[i].feeType === this.editedItem.feeType){
                        toast.info("主键feeType[批量收费类型:"+this.editedItem.feeType+"]不能重复!");
                        flag = 1
                        break
                    }
                }
                if(flag === 0){
                    this.chargeDefinesInfo.push(this.editedItem)
                    this.close()
                }
            }
        }
    }
};
</script>

<style scoped>
    .bthStyle {
        color: #00b0ff;
        width: 120px;
        margin-top: 30px;
    }
</style>