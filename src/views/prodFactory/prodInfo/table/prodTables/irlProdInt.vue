<template>
    <v-card>
        <!--新增或修改利率信息弹框界面-->
        <v-toolbar card dense color="transparent">
            <!--<a-button type="primary" @click="onAdd">新增</a-button>-->
            <a-button type="primary" @click="onEdit" class="ml-2">修改</a-button>
            <!--<a-button type="primary" @click="onDelete" class="ml-2">删除</a-button>-->
            <v-flex md12 lg12 class="switchClass">
                <v-switch v-model="switchValue" :label="switchValue == true?'使用固定利率值':'不使用固定利率值'"></v-switch>
            </v-flex>
            <!--不使用固定利率修改界面-->
            <v-dialog v-model="dialogs" width="900">
                <v-toolbar color="primary lighten-2" style="height: 50px">
                    <v-toolbar-title class="white--text" style="margin-top: -2%">{{ titleDesc}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-icon class="mr-2 closeClass" @click="close()">close</v-icon>
                </v-toolbar>
                <v-card>
                    <v-card-text>
                        <v-layout wrap>
                            <v-flex xs12 sm6 m6 v-if="!dialogEidt">
                                <dc-select :isMultiSelect="false" v-model="selected.eventType" :options="rfInfo.EVENT_TYPE.value" labelDesc="事件类型"></dc-select>
                            </v-flex>
                            <v-flex xs12 sm6 m6 v-if="!dialogEidt">
                                <dc-select :isMultiSelect="false" v-model="selected.intClass" :options="rfInfo.INT_CLASS.value" labelDesc="利息分类"></dc-select>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <dc-select :isMultiSelect="false" v-model="selected.intType" :options="rfInfo.INT_TYPE.value" labelDesc="利率代码"></dc-select>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <dc-select :isMultiSelect="false" v-model="selected.intCalcBal" :options="rfInfo.INT_CALC_BAL.value" labelDesc="计息方式"></dc-select>
                            </v-flex>
                            <v-flex xs12 sm6 m6 v-if="!dialogEidt">
                                <dc-select :isMultiSelect="false" v-model="selected.rateAmtId" :options="rfInfo.RATE_AMT_ID.value" labelDesc="利率计算金额编码"></dc-select>
                            </v-flex>
                            <v-flex xs12 sm6 m6 v-if="!dialogEidt">
                                <dc-select :isMultiSelect="false" v-model="selected.intAmtId" :options="rfInfo.INT_AMT_ID.value" labelDesc="利息计算金额编码"></dc-select>
                            </v-flex>
                            <v-flex xs12 sm6 m6 v-if="!dialogEidt">
                                <dc-select :isMultiSelect="false" v-model="selected.monthBasis" :options="rfInfo.MONTH_BASIS.value" labelDesc="月基准"></dc-select>
                            </v-flex>
                            <v-flex xs12 sm6 m6 v-if="!dialogEidt">
                                <dc-select :isMultiSelect="false" v-model="selected.intApplType" :options="rfInfo.INT_APPL_TYPE.value" labelDesc="利率启用方式"></dc-select>
                            </v-flex>
                            <v-flex xs12 sm6 m6 v-if="!dialogEidt">
                                <dc-select :isMultiSelect="false" v-model="selected.intDaysType" :options="rfInfo.INT_DAYS_TYPE.value" labelDesc="靠档天数计算方式 "></dc-select>
                            </v-flex>
                            <v-flex xs12 sm6 m6 v-if="!dialogEidt">
                                <dc-select :isMultiSelect="false" v-model="selected.taxType" :options="rfInfo.TAX_TYPE.value" labelDesc="税率类型 "></dc-select>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <dc-text labelDesc="最大利率" v-model="selected.maxRate"></dc-text>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <dc-text labelDesc="最小利率" v-model="selected.minRate"></dc-text>
                            </v-flex>
                            <v-flex xs12 sm6 m6 v-if="!dialogEidt">
                                <dc-text labelDesc="利率变更周期" v-model="selected.rollFreq"></dc-text>
                            </v-flex>
                            <v-flex xs12 sm6 m6 v-if="!dialogEidt">
                                <dc-text labelDesc="利率靠档标志" v-model="selected.intRateInd"></dc-text>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <dc-date v-model="selected.rollDay" labelDesc="下一个利率变更日"></dc-date>
                            </v-flex>
                        </v-layout>
                        <v-layout wrap>
                            <v-flex xs12 sm6 m6>
                                <v-btn color="info" @click="console" class="bthStyle" style="margin-left: 20%">取消</v-btn>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <v-btn color="info" @click="submit" class="bthStyle" style="margin-left: 40%">保存</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <!--使用固定利率修改界面-->
            <v-dialog v-model="dialogsFiexd" width="500">
                <v-toolbar color="primary lighten-2" style="height: 50px">
                    <v-toolbar-title class="white--text" style="margin-top: -2%">{{ titleDesc}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-icon class="mr-2 closeClass" @click="close()">close</v-icon>
                </v-toolbar>
                <v-card v-if="dialogsFiexd">
                    <v-card-text>
                        <v-layout wrap>
                            <v-flex xs12 sm12 m12>
                                <dc-select :isMultiSelect="false" v-model="selectedFixed.eventType" :options="rfInfo.EVENT_TYPE.value" labelDesc="事件类型"></dc-select>
                            </v-flex>
                            <v-flex xs12 sm12 m12>
                                <dc-select :isMultiSelect="false" v-model="selectedFixed.intType" :options="rfInfo.INT_TYPE.value" labelDesc="利率代码"></dc-select>
                            </v-flex>
                            <v-flex xs12 sm12 m12>
                                <dc-text labelDesc="固定利率值" v-model="selectedFixed.fixedInt"></dc-text>
                            </v-flex>
                        </v-layout>
                        <v-layout wrap>
                            <v-flex xs12 sm6 m6>
                                <v-btn color="info" @click="FixedConsole" class="bthStyle" style="margin-left: 10%">取消</v-btn>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <v-btn color="info" @click="FixedSubmit" class="bthStyle" style="margin-left: 30%">保存</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <!--利率代码详情 点击PHQI弹出框-->
        <v-dialog v-model="dialog" width="800">
            <v-toolbar color="primary lighten-2" style="height: 50px">
                <v-toolbar-title class="white--text" style="margin-top: -2%">利率代码详情</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon class="mr-2 closeClass" @click="close()">close</v-icon>
            </v-toolbar>
            <v-card>
                <v-card-text class="pa-0">
                    <a-table :customRow="customRow" :columns="irlCodeColumn" :dataSource="irlCodeInfo" bordered>
                    </a-table>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!--利率信息展示 || 固定利率信息展示-->
        <v-card-text class="pa-0">
            <template>
                <a-table v-if="!switchValue" :customRow="customRow" :columns="columns" :dataSource="rateInfos" bordered :scroll="{ x: 1900}">
                    <template slot="splitId" slot-scope="text, record, index">
                        <div class='editable-row-splitId'>
                            <span>
                                <a @click="() => phqiClick(record)">{{text}}</a>
                            </span>
                        </div>
                    </template>
                </a-table>
                <a-table v-if="switchValue" :customRow="customRow" :columns="fixedColumn" :dataSource="fixedInfos" bordered></a-table>
            </template>
            <v-divider></v-divider>
        </v-card-text>
    </v-card>
</template>
<script>
    import DcSwitch from "@/components/widgets/DcSwitch";
    import {getRateInfo} from '@/api/table';
    import {getColumnDesc} from '@/utils/columnDesc'
    import DcSelect from '@/components/widgets/DcSelectTable'
    import DcDate from '@/components/widgets/DcDateTable'
    import DcText from '@/components/widgets/DcTextTable'
    import {getPkList} from '@/views/prodFactory/prodInfo/pkListColumnInfo'
    import columnInfo from '../../columnInfo'

    export default {
        components: {columnInfo,DcSwitch,DcSelect,DcDate,DcText},
        filters: {
            getDescByKey: function (key) {
                return getColumnDesc(key)
            }
        },
        props: ["prodData"],
        data () {
            return {
                dialog: false,
                dialogs: false,
                dialogEidt: false,
                dialogsFiexd: false,
                switchValue: false,
                titleDesc: "",
                prodType: "",
                columns: [
                    {dataIndex: 'eventType', title: '事件类型',scopedSlots: { customRender: 'eventType' },width: 100},
                    {dataIndex: 'intClass', title: '利息分类',width: 100},
                    {dataIndex: 'intType', title: '利率代码',width: 100},
                    {dataIndex: 'splitId', title: '利率代码详细',width: 150,scopedSlots: { customRender: 'splitId' }},
                    {dataIndex: 'intCalcBal', title: '计息方式',width: 100},
                    {dataIndex: 'rateAmtId', title: '利率计算金额编码',width: 175},
                    {dataIndex: 'intAmtId', title: '利息计算金额编码',width: 175},
                    {dataIndex: 'monthBasis', title: '月基准',width: 85},
                    {dataIndex: 'minRate', title: '最小利率',width: 100},
                    {dataIndex: 'maxRate', title: '最大利率',width: 100},
                    {dataIndex: 'intApplType', title: '利率启用方式',width: 150},
                    {dataIndex: 'rollFreq', title: '利率变更周期',width: 150},
                    {dataIndex: 'rollDay', title: '下一利率变更日',width: 150},
                    {dataIndex: 'intRateInd', title: '靠档标志',width: 100},
                    {dataIndex: 'intDaysType', title: '靠档天数计算方式',width: 200},
                    {dataIndex: 'taxType', title: '税率类型',width: 100}
                ],
                irlCodeColumn: [
                    {dataIndex: 'depositDate', title: '存期',scopedSlots: { customRender: 'eventType' },width: 100},
                    {dataIndex: 'amt', title: '金额',width: 100},
                    {dataIndex: 'intType', title: '利率类型',width: 100},
                    {dataIndex: 'baseIntValue', title: '基准利率值',width: 130},
                    {dataIndex: 'floatPer', title: '浮动百分比',width: 130},
                    {dataIndex: 'prodIntValue', title: '产品利率值',width: 130},
                    {dataIndex: 'ccy', title: '币种',width: 80},
                    {dataIndex: 'branch', title: '机构',width: 80}
                ],
                fixedColumn: [
                    {dataIndex: 'eventType', title: '事件类型',width: 130},
                    {dataIndex: 'intType', title: '利率代码',width: 130},
                    {dataIndex: 'fixedIntValue', title: '固定利率值',width: 130}
                ],
                fixedInfos: [],
                irlCodeInfo: [],
                selectedFixed: {
                    eventType: '',
                    intType: '',
                    fixedInt: ''
                },
                selected: {
                    prodType: '',
                    eventType: '',
                    intClass: '',
                    intType: '',
                    intCalcBal: '',
                    rateAmtId: '',
                    intAmtId: '',
                    monthBasis: '',
                    minRate: '',
                    maxRate: '',
                    intApplType: '',
                    rollFreq: '',
                    rollDay: '20180909',
                    intRateInd: '',
                    intDaysType: '',
                    taxType: '',
                    splitId: '',
                    splitType: 'PA',
                    ruleid: 'NO',
                    recalMethod: 'N'
                },
                //利率相关参数集合
                rateInfos: [],
                irlPeriSplit: [],
                irlAmtSplit: [],
                irlIntType: [],
                irlIntRate: [],
                irlIntMatrix: [],
                irlBasisRate: [],
                ccy: [],
                branch: [],
                rfInfo: {
                    EVENT_TYPE: {
                        value: {},
                    },
                    INT_CLASS: {
                        value: {}
                    },
                    INT_TYPE: {
                        value: {}
                    },
                    INT_CALC_BAL: {
                        value: {}
                    },
                    RATE_AMT_ID: {
                        value: {}
                    },
                    INT_AMT_ID: {
                        value: {}
                    },
                    MONTH_BASIS: {
                        value: {}
                    },
                    INT_APPL_TYPE: {
                        value: {}
                    },
                    ROLL_FREQ: {
                        value: {}
                    },
                    INT_RATE_IND: {
                        value: {}
                    },
                    INT_DAYS_TYPE: {
                        value: {}
                    },
                    TAX_TYPE: {
                        value: {}
                    }
                }
            };
        },
        watch: {
            prodData (val) {
                this.getChargeDefinesInfo(val)
                this.prodType = val.prodType.prodType
            }
        },
        mounted: function() {
            //加载利率信息
            this.getChargeDefinesInfo(this._props.prodData);
        },
        methods: {
            //初始化产品对应的信息
            getChargeDefinesInfo(val) {
                this.rateInfos = val.irlProdInt;
                this.irlPeriSplit = val.irlProdIntInfos.irlPeriSplitList;
                this.irlAmtSplit = val.irlProdIntInfos.irlAmtSplitList;
                this.irlIntType = val.irlProdIntInfos.irlIntTypeList;
                this.irlIntRate = val.irlProdIntInfos.irlIntRateList;
                this.irlBasisRate = val.irlProdIntInfos.irlBasisRateList;
                this.irlIntMatrix = val.irlIntMatrices;
                //获取产品适用币种，机构信息
                this.ccy = val.prodDefines.CCY.attrValue.split(",");
                this.branch = val.prodDefines.PROD_BRANCH.attrValue.split(",");
                //加载事件对应利率 且利率计算模型为F-固定利率模型的利率值
                this.getFixedIntRate(val);
                //加载备选数据
                this.getRfInfo()

            },
            //加载备选数据valueSource
            getRfInfo(){
                let rf = this.rfInfo;
                //数据类型取自本地维护json文件
                const source = columnInfo;
                for(let key in rf){
                    let column = source[key];
                    if(column != undefined && column != 'undefined'){
                        if(source[key].valueMethod == 'VL'){
                            rf[key].value = source[key].valueScore;
                        }
                        if(source[key].valueMethod == 'RF' && source[key].valueScore != undefined && JSON.stringify(source[key].valueMethod) != '{}'){
                            getPkList(source[key].valueScore,response => {
                                rf[key].value=response
                            });
                        }
                    }
                }
            },
            //获取事件对应利率 且利率计算模型为F-固定利率模型的利率值
            getFixedIntRate(val){
                let prodInt = val.irlProdInt;
                let intType = val.irlProdIntInfos.irlIntTypeList;
                let intMartix = val.irlIntMatrices;
                for(let prodIntIndex in prodInt){
                    for(let intTypeIndex in intType){
                        //匹配事件对应利率类型 && 利率税率类型标志为INT-利率 && 利率的利息计算模型为“F-固定利率模型”
                        if(prodInt[prodIntIndex].intType === intType[intTypeIndex].intTaxType && intType[intTypeIndex].intTaxFlag === "INT" && intType[intTypeIndex].rateLadder === "F"){
                            this.getFixedIntRateTemp(prodInt,prodIntIndex,intType,intMartix);
                            break;
                        }
                    }
                }
            },
            //降低getFixedIntRate方法深度
            getFixedIntRateTemp(prodInt,prodIntIndex,intType,intMartix){
                let irlIntRateFixedArr = [];
                //通过利率类型，产品币种，机构获取irl_int_rate表该利率类型最新利率值对应的irl_seq_no
                irlIntRateFixedArr = this.getIrlIntMatrix(prodInt[prodIntIndex].intType);
                //通过irl_seq_no联合irl_int_martix表，irl_basis_rate表 获取基准利率值
                for(let irlIndex in irlIntRateFixedArr) {
                    for (let matrixIndex in intMartix) {
                        if (intMartix[matrixIndex].irlSeqNo === irlIntRateFixedArr[irlIndex].irlSeqNo) {
                            let temp = {}
                            temp["eventType"] = prodInt[prodIntIndex].eventType
                            temp["intType"] = prodInt[prodIntIndex].intType;
                            //采用基础浮动利率 获取基准利率值
                            temp["fixedIntValue"] = this.getUpRateValue(intMartix[matrixIndex].intBasis,irlIntRateFixedArr[irlIndex].ccy);
                            this.fixedInfos.push(temp);
                        }
                    }
                }
            },
            //点击利率详细信息，获取详细利率矩阵信息
            phqiClick(val){
                this.irlCodeInfo = [];
                let irlIntRateArr = [];
                let intType = "";
                let splitType = val.splitType;
                let splitId = val.splitId;
                if(splitType === "PA"){
                    //先周期分段  再金额分段
                    for(let periIndex in this.irlPeriSplit){
                        if(this.irlPeriSplit[periIndex].periSplitId === splitId){
                            let amtSplitId = this.irlPeriSplit[periIndex].amtSplitId
                            for(let amtIndex in this.irlAmtSplit){
                                if(this.irlAmtSplit[amtIndex].amtSplitId === amtSplitId){
                                    intType = this.irlAmtSplit[amtIndex].intType;
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
                if(splitType === "AP"){
                    //先金额分段 再周期分段
                    for(let i in this.irlAmtSplit){
                        if(this.irlAmtSplit[i].amtSplitId === splitId){
                            let periSplitId = this.irlAmtSplit[i].periSplitId
                            for(let j in this.irlPeriSplit){
                                if(this.irlPeriSplit[j].periSplitId === periSplitId){
                                    intType = this.irlPeriSplit[j].intType;
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
                //通过利率类型,产品适用币种，机构获取最新的irlIntRate表利率信息集合
                irlIntRateArr = this.getIrlIntMatrix(intType);
                // 通过irlIntRateArr集合，逐条通过irlSeqNo 获取irlIntMatrix利率信息矩阵信息
                for(let irlIndex in irlIntRateArr) {
                    for (let matrixIndex in this.irlIntMatrix) {
                        if (this.irlIntMatrix[matrixIndex].irlSeqNo === irlIntRateArr[irlIndex].irlSeqNo) {
                            let temp = {}
                            temp["depositDate"] = "";
                            temp["amt"] = this.irlIntMatrix[matrixIndex].matrixAmt;
                            temp["intType"] = intType;
                            let floatPer = this.irlIntMatrix[matrixIndex].spreadPercent;
                            temp["floatPer"] = floatPer;
                            if(this.irlIntMatrix[matrixIndex].intBasis == null || this.irlIntMatrix[matrixIndex].intBasis == ""){
                                //采用固定利率信息
                                temp["baseIntValue"] = "";
                                temp["prodIntValue"] = this.irlIntMatrix[matrixIndex].actualRate;
                            }else{
                                //采用基础浮动利率 获取基准利率值
                                let baseIntValue = this.getUpRateValue(this.irlIntMatrix[matrixIndex].intBasis,irlIntRateArr[irlIndex].ccy);
                                temp["baseIntValue"] = baseIntValue;
                                //计算实际利率 = 基准利率*（1+（浮动/100)）保留小数点后8位
                                temp["prodIntValue"] = this.calculateActualRate(baseIntValue,floatPer);
                            }
                            temp["ccy"] = irlIntRateArr[irlIndex].ccy;
                            temp["branch"] = irlIntRateArr[irlIndex].branch;
                            this.irlCodeInfo.push(temp);
                        }
                    }
                }
                this.dialog = true
            },
            //计算实际利率 = 基准利率*（1+（浮动值/100）） 保留小数点后8位
            calculateActualRate(intBasisRate,floatPer){
                return (parseFloat(intBasisRate)*(1+(parseFloat(floatPer)/100))).toFixed(8)
            },
            //通过基准利率类型，产品币种 ，获取最新基准利率
            getUpRateValue(intBasis,ccy){
                let tempBasis = [];
                for(let basisIndex=0; basisIndex<this.irlBasisRate.length-1; basisIndex++){
                    if(this.irlBasisRate[basisIndex].intBasis == intBasis && this.irlBasisRate[basisIndex].ccy == ccy){
                        if(parseInt(this.irlBasisRate[basisIndex].effectDate)<parseInt(this.irlBasisRate[basisIndex+1].effectDate)){
                            tempBasis = []
                            tempBasis.push(this.irlBasisRate[basisIndex+1]);
                        }else{
                            tempBasis = []
                            tempBasis.push(this.irlBasisRate[basisIndex]);
                        }
                    }
                }
                return tempBasis[0].intBasisRate;
            },
            //通过利率类型，产品适用币种，产品适用机构，获取最新利率矩阵信息
            getIrlIntMatrix(intType){
               let irlIntRateTemp = []
                for(let intRateIndex in this.irlIntRate){
                    if(this.irlIntRate[intRateIndex].intType === intType && this.findIn(this.ccy,this.irlIntRate[intRateIndex].ccy) && this.findIn(this.branch,this.irlIntRate[intRateIndex].branch)){
                        let flag = true
                        for(let k in irlIntRateTemp){
                            if(irlIntRateTemp[k].intType == this.irlIntRate[intRateIndex].intType && irlIntRateTemp[k].ccy == this.irlIntRate[intRateIndex].ccy && irlIntRateTemp[k].branch == this.irlIntRate[intRateIndex].branch){
                                if(parseInt(irlIntRateTemp[k].effectDate)>parseInt(this.irlIntRate[intRateIndex].effectDate)){
                                    flag = false
                                }
                                if(parseInt(irlIntRateTemp[k].effectDate)<=parseInt(this.irlIntRate[intRateIndex].effectDate)){
                                    delete irlIntRateTemp[k];
                                }
                            }
                        }
                        if(flag) {
                            irlIntRateTemp.push(this.irlIntRate[intRateIndex]);
                        }
                    }
                }
                return irlIntRateTemp;
            },
            findIn(val,key){
              for(let ind in val){
                  if(val[ind] === "ALL"){
                      return true;
                  }
                  if(val[ind] === key){
                      return true;
                  }
              }
              return false;
            },
            //查看利率详细信息，弹出框关闭事件
            close() {
                this.dialog = false
                this.dialogs = false
                this.dialogsFiexd = false
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
            //删除事件
            onDelete () {
                console.log("KK")
            },
            //新增事件
            onAdd () {
                this.option='add';
                this.titleDesc = "新增信息";
                if(!this.switchValue){
                    this.selected={};
                    this.dialogs=true;
                    this.dialogEidt=false;
                    this.dialogsFiexd = false;
                }
                if(this.switchValue){
                    this.selectedFixed={};
                    this.dialogs=false;
                    this.dialogEidt=false;
                    this.dialogsFiexd = true;
                }
            },
            //修改事件
            onEdit () {
                this.selected = {}
                this.option='edit';
                this.titleDesc = "修改信息";
                if(!this.switchValue){
                    this.dialogEidt=true;
                    this.dialogs = true;
                    this.dialogsFiexd = false;
                }
                if(this.switchValue){
                    this.dialogEidt=false;
                    this.dialogs = false;
                    this.dialogsFiexd = true;
                }
            },
            //主信息编辑保存事件
            submit() {
                if(this.option == 'add'){
                    let dataSource=this.rateInfos;
                    this.selected.prodType = this.prodType;
                    this.selected.splitType = 'PA';
                    this.selected.ruleid = 'NO';
                    this.selected.recalMethod = 'N';
                    let selected=this.selected;
                    dataSource.push(selected);
                    this.dialogs=false;
                }
                if(this.option =='edit')
                {
                    this.selected = {}
                    this.dialogs=false;
                }
            },
            //主信息编辑取消事件
            console(){
                this.dialogs = false;
            },
            //固定利率信息 取消事件
            FixedConsole(){
                this.dialogsFiexd = false
            },
            //固定利率信息 保存事件
            FixedSubmit(){
                this.dialogsFiexd = false
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
    .switchClass{
        margin-left: 55%;
        margin-top: 2%
    }
    .closeClass{
        color: white;
        margin-top: -2%;
    }
    .dcMulti {
        margin-top: 10px;
    }
</style>