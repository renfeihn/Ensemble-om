<template>
    <v-card>
        <v-toolbar card dense color="transparent">

            <a-button type="primary" @click="onAdd">新增</a-button>
            <a-button type="primary" @click="onEdit" class="ml-2">修改</a-button>
            <a-button type="primary" @click="onDelete" class="ml-2">删除</a-button>
            <v-dialog
                    v-model="dialog"
                    width="500"
            >
                <v-card>
                    <v-card-text>
                <v-form v-model="valid">
                    <v-text-field
                            v-model="selected.feeType"
                            :counter="10"
                            label="费用类型"
                            required
                            class="mx-5"
                    ></v-text-field>
                    <v-text-field
                            v-model="selected.chargePeriodFerq"
                            label="收费频率"
                            class="mx-5"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="selected.chargeDay"
                            label="收费日"
                            class="mx-5"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="selected.nextChargeDate"
                            label="下一收费日期"
                            class="mx-5"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="selected.chargeDealMethod"
                            label="收费处理方式"
                            class="mx-5"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="selected.conDeductFlag"
                            label="持续扣款标示"
                            class="mx-5"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="selected.conDeductTimes"
                            label="持续扣款次数"
                            class="mx-5"
                            required
                    ></v-text-field>
                </v-form>
                <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="submit"
                >
                    确认
                </v-btn>
                  <v-btn
                          color="green darken-1"
                          flat="flat"
                          @click="dialog = false"
                  >
                      取消
                  </v-btn>
                    </v-card-text>
                </v-card>
            </v-dialog>
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
import {removeByValue} from '@/utils/util'

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
            valid: true,
            dialog: false,
            refData: getInitData,
            option: '',
            selectedRowKeys: [],
            selected: {},
            columns: [
                {dataIndex: 'feeType', title: '批量收费类型',scopedSlots: { customRender: 'feeType' }},
                {dataIndex: 'chargePeriodFerq', title: '收费频率'},
                {dataIndex: 'chargeDay', title: '收费日期'},
                {dataIndex: 'nextChargeDate', title: '下一收费日'},
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
        submit () {
            if(this.option == 'add'){
                let dataSource=this.chargeDefinesInfo
                let selected=this.selected;
                selected.prodType=this.prodType
                dataSource.push(selected)
            }
            this.dialog=false;
        },
        onDelete () {
            let dataSource=this.chargeDefinesInfo
            removeByValue(dataSource,this.selected)
        },
        onAdd () {
            this.option='add';
            this.selected={};
            this.dialog=true;
        },
        onEdit () {
            this.option='edit';
            this.dialog=true;
        },
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