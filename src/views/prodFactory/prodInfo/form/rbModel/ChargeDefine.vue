<template>
    <v-card>
        <v-toolbar card dense color="transparent">
            <a-button type="primary" >新增</a-button>
            <a-button type="primary" class="ml-2">修改</a-button>
            <a-button type="primary" class="ml-2">删除</a-button>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
            <a-table :customRow="customRow" :columns="columns" :dataSource="chargeDefinesInfo" bordered>
            </a-table>
            <v-divider></v-divider>
        </v-card-text>
    </v-card>

</template>
<script>
import {getChargeDefine} from '@/api/table';
import toast from '@/utils/toast';
import { getInitData } from "@/mock/init";
import {getColumnDesc} from '@/utils/columnDesc'


export default {
    filters: {
        getDescByKey: function (key) {
            return getColumnDesc(key)
        }
    },
    props: ["prodData"],
    data () {
        return {
            prodType: '',
            open: true,
            refData: getInitData,
            selectedRowKeys: [],
            selected: {},
            columns: [
                {dataIndex: 'feeType', title: '批量收费类型',scopedSlots: { customRender: 'feeType' }},
                {dataIndex: 'chargePeriodFreq', title: '收费频率'},
                {dataIndex: 'chargeDay', title: '收费日期'},
                {dataIndex: 'chargeDealMethod', title: '收费处理方式'},
                {dataIndex: 'conDeductFlag', title: '持续扣款标识'},
                {dataIndex: 'conDeductTimes', title: '持续扣款次数'}
            ],
            chargeDefinesInfo: []
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
        customRow (record) {
            return {
                on: {
                    click: this.clickRow.bind(this, record)
                }
            }
        },
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
        getChargeDefinesInfo(val) {
            //初始化产品对应的信息
            if(val!=undefined&&val.prodType!=undefined){
            this.chargeDefinesInfo = val.mbProdCharge
            this.prodType = val.prodType.prodType
            }
        },
        initRefDate() {
            this.feeType = this.refData[2].paraDataRb.feeType;
            this.chargePeriodFreq = this.refData[2].paraDataRb.chargePeriodFreq;
            this.chargeDealMethod = this.refData[2].paraDataRb.chargeDealMethod;
            this.conDeductFlag = this.refData[2].paraDataRb.conDeductFlag;
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