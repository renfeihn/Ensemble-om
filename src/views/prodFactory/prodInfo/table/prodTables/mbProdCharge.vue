<template>
    <v-card>
        <v-toolbar card dense color="transparent">
            <!--<a-button type="primary" @click="onAdd">新增</a-button>-->
            <a-button type="primary" @click="onEdit" class="ml-2">修改</a-button>
            <!--<a-button type="primary" @click="onDelete" class="ml-2">删除</a-button>-->
            <v-dialog v-model="dialog" width="900">
                <v-toolbar color="primary lighten-2" style="height: 50px">
                     <v-toolbar-title class="white--text" style="margin-top: -2%">{{ titleDesc}}</v-toolbar-title>
                     <v-spacer></v-spacer>
                     <v-icon class="mr-2 closeClass" @click="close()">close</v-icon>
                 </v-toolbar>
                <v-card v-if="dialog">
                    <v-card-text>
                        <v-layout wrap>
                            <v-flex xs12 sm6 m6>
                                <dc-multiselect :isMultiSelect="false" v-model="selected.chargePeriodFreq" :options="chargePeriodFreq1" labelDesc="收费频率"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <dc-multiselect :isMultiSelect="false" v-model="selected.chargeDealMethod" :options="chargeDealMethod1" labelDesc="收费处理方式"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <dc-multiselect :isMultiSelect="false" v-model="selected.conDeductFlag" :options="conDeductFlag1" labelDesc="持续扣款标识"></dc-multiselect>
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
                                <v-btn color="info" @click="dialog = false" class="bthStyle" style="margin-left: 20%">取消</v-btn>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <v-btn color="info" @click="submit" class="bthStyle" style="margin-left: 40%">保存</v-btn>
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
import DcMultiselect from '@/components/widgets/DcSelectTable'
import DcTextField from "@/components/widgets/DcTextField";
import {getChargeDefine} from '@/api/table';
import toast from '@/utils/toast';
import { getInitData } from "@/mock/init";
import {getColumnDesc} from '@/utils/columnDesc'
import {removeByValue} from '@/utils/util'
import DcDate from '@/components/widgets/DcDate'
import {getParamTable} from "@/api/url/prodInfo";

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
            chargeDefinesInfo: [],
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
                nextChargeDate: '20190101',
                chargeDealMethod: '',
                conDeductFlag: '',
                conDeductTimes: ''
            },
            selectedOld: {},
            chargePeriodFreq1: [],
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
            //加载备选数据
            this.getRfInfo();
        },
        //加载备选数据
        getRfInfo() {
            let that = this
            getParamTable("FM_PERIOD_FREQ").then(function (response) {
                let freqArr = response.data.data.columnInfo;
                for(let i=0; i<freqArr.length; i++){
                    let temp = {}
                    temp["key"] = freqArr[i].PERIOD_FREQ;
                    temp["value"] = freqArr[i].PERIOD_FREQ_DESC;
                    that.chargePeriodFreq1.push(temp);
                }
            });
        },
//        //删除
//        onDelete () {
//            let dataSource=this.chargeDefinesInfo
//            confirm('确认删除该条参数?') && removeByValue(dataSource,this.selected)
//        },
//        //新增
//        onAdd () {
//            this.option='add';
//            this.titleDesc = "新增信息";
//            this.selected={};
//            this.dialog=true;
//            this.disabledFlag =false;
//        },
        //修改
        onEdit () {
            if(this.selected.feeType != '') {
                for(let key in this.selected){
                    if(this.selected[key] == null){
                        this.selected[key] = ""
                    }
                }
                this.option = 'edit';
                this.dialog = true;
                this.titleDesc = "修改信息";
                this.disabledFlag = true;
            }else{
                toast.info("请选择需要修改的数据!");
            }
        },
        //弹框修改保存事件
        submit () {
            let dataSource=this.chargeDefinesInfo
            if(this.option == 'add'){
                let selected=this.selected;
                selected.prodType=this.prodType
                dataSource.push(selected)
                this.dialog=false;
            }
            if(this.option =='edit')
            {
                let feeType = this.selected.feeType
                for(let index=0; index<dataSource.length; index++){
                    if(dataSource[index].feeType === feeType){
                        this.removeArr(dataSource,this.selectedOld)
                        dataSource.push(this.selected)
                        break;
                    }
                }
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
        removeArr(_arr, _obj) {
            let length = _arr.length;
            for (let i = 0; i < length; i++) {
                if (_arr[i] == _obj) {
                    if (i == 0) {
                        _arr.shift(); //删除并返回数组的第一个元素
                        return _arr;
                    }
                    else if (i == length - 1) {
                        _arr.pop();  //删除并返回数组的最后一个元素
                        return _arr;
                    }
                    else {
                        _arr.splice(i, 1); //删除下标为i的元素
                        return _arr;
                    }
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
            this.selectedOld = {}
            this.selected = {}
            this.selectedOld = record
            this.selected=this.copy(record,this.selected);
        },
        close () {
            this.dialog = false
            setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            }, 300)
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
    .bthStyle {
        color: #00b0ff;
        width: 120px;
        margin-top: 30px;
    }
    .switchClass{
        margin-left: 55%;
        margin-top: 2%
    }
    .closeClass{
        color: white;
        margin-top: -2%;
    }
</style>