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
                                             <v-subheader class="primary--text subheading">批量收费类型*</v-subheader>
                                         </v-flex>
                                         <!--getDesc(editedItem.feeType)-->
                                         <v-flex md4 lg4>
                                             <v-select class="primary--text mx-2" :items="feeType" v-model="editedItem.feeType" label="批量收费类型" item-text="value" item-value="key" single-line hide-details></v-select>
                                         </v-flex>
                                         <v-flex xs12 md2 lg2>
                                             <v-subheader class="primary--text subheading">收费频率*</v-subheader>
                                         </v-flex>
                                         <v-flex md4 lg4>
                                             <v-select class="primary--text mx-2" :items="chargePeriodFreq" v-model="editedItem.chargePeriodFreq" label="收费频率" item-text="value" item-value="key" single-line hide-details></v-select>
                                         </v-flex>
                                     </v-layout>
                                     <v-layout row wrap>
                                         <v-flex xs12 md2 lg2>
                                             <v-subheader class="primary--text subheading">收费日期*</v-subheader>
                                         </v-flex>
                                         <v-flex md4 lg4>
                                             <v-menu ref="chargeDate" lazy :close-on-content-click="false" v-model="chargeDay" transition="scale-transition" offset-y full-width :nudge-bottom="-22" min-width="290px" :return-value.sync="chargeDate">
                                                 <v-text-field slot="activator" label="收费日期" v-model="editedItem.chargeDay" append-icon="event" single-line hide-details></v-text-field>
                                                 <v-date-picker v-model="editedItem.chargeDay" @input="$refs.chargeDate.save(chargeDay)" no-title scrollable locale="zh-cn"></v-date-picker>
                                             </v-menu>
                                         </v-flex>
                                         <v-flex xs12 md2 lg2>
                                             <v-subheader class="primary--text subheading">收费处理方式*</v-subheader>
                                         </v-flex>
                                         <v-flex md4 lg4>
                                             <v-select class="primary--text mx-2" :items="chargeDealMethod" v-model="editedItem.chargeDealMethod" label="收费处理方式" item-text="value" item-value="key" single-line hide-details></v-select>
                                         </v-flex>
                                     </v-layout>
                                     <v-layout row wrap>
                                         <v-flex xs12 md2 lg2>
                                             <v-subheader class="primary--text subheading">持续扣款标识*</v-subheader>
                                         </v-flex>
                                         <v-flex md4 lg4>
                                             <v-select class="primary--text mx-2" :items="conDeductFlag" v-model="editedItem.conDeductFlag" label="持续扣款标识" item-text="value" item-value="key" single-line hide-details></v-select>
                                         </v-flex>
                                         <v-flex xs12 md2 lg2>
                                             <v-subheader class="primary--text subheading">持续扣款次数*</v-subheader>
                                         </v-flex>
                                         <v-flex md4 lg4>
                                             <v-text-field class="primary--text mx-2" label="持续扣款次数" name="title" v-model="editedItem.conDeductTimes" single-line hide-details/>
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
                <v-data-table :headers="headers" :items="chargeDefinesInfo" hide-actions class="elevation-0">
                    <template slot="items" slot-scope="props">
                        <tr @click="getChargeDefine(props.item)" v-bind:class="{'chargeSelected': props.item==editedItem }" highlight-row>
                        <td class="text-xs-left">{{ props.item.feeType | getDescByKey}}</td>
                        <td class="text-xs-left">{{ props.item.chargePeriodFreq | getDescByKey}}</td>
                        <td class="text-xs-left">{{ props.item.chargeDay | getDescByKey}}</td>
                        <td class="text-xs-left">{{ props.item.chargeDealMethod | getDescByKey}}</td>
                        <td class="text-xs-left">{{ props.item.conDeductFlag | getDescByKey}}</td>
                        <td class="text-xs-left">{{ props.item.conDeductTimes | getDescByKey}}</td>
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
import toast from '@/utils/toast';
import { getInitData } from "@/mock/init";
import {getColumnDesc} from '@/utils/columnDesc'


export default {
    filters: {
        getDescByKey: function (data) {
            return getColumnDesc(data)
        }
    },
    props: ["prodData"],
    data () {
        return {
            dialog: false,
            addFlag: false,
            modFlag: false,
            prodType: '',
            open: true,
            feeType: [{
                key: "",
                value: ""
            }],
            chargePeriodFreq: [{
                key: "",
                value: ""
            }],
            chargeDealMethod: [{
                key: "",
                value: ""
            }],
            conDeductFlag: [{
                key: "",
                value: ""
            }],

            refData: getInitData,
            headers: [
                {text: '批量收费类型', align: 'left', value: 'feeType'},
                {text: '收费频率', value: 'chargePeriodFreq'},
                {text: '收费日期', value: 'chargeDay'},
                {text: '收费处理方式', value: 'chargeDealMethod' },
                {text: '持续扣款标识', value: 'conDeductFlag'},
                {text: '持续扣款次数', value: 'conDeductTimes'}
            ],
            editedItem: {
                prodType: '',
                feeType: '',
                chargePeriodFreq: '',
                chargeDay: '',
                chargeDealMethod: '',
                conDeductFlag: '',
                conDeductTimes: ''
            },
            defaultItem: {
                feeType: '',
                chargePeriodFreq: '',
                chargeDay: '',
                chargeDealMethod: '',
                conDeductFlag: '',
                conDeductTimes: ''
            },
            projects: [{
                feeType: '',
                chargePeriodFreq: '',
                chargeDay: '',
                chargeDealMethod: '',
                conDeductFlag: '',
                conDeductTimes: ''
            }],
            chargeDefinesInfo: []
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
    },
    methods: {
        getChargeDefinesInfo(val) {
            //初始化产品对应的信息
            this.chargeDefinesInfo = []
            this.chargeDefinesInfo = val.mbProdCharge
            this.prodType = val.prodType.prodType
        },
        editItem (item) {
            this.editedIndex = this.projects.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
            this.close()
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
                        toast.info("主键feeType[批量收费类型]不能重复!");
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
        getChargeDefine(value){
            this.editedItem = []
            this.editedItem = value
        },
        addClick() {
            this.initRefDate();
            this.editedItem = []
            this.modFlag = false
            this.addFlag = true
        },
        modClick() {
            this.initRefDate();
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