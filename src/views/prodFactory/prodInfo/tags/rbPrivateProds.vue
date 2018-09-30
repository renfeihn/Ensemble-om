<template>
    <div class="app-container">
        <v-layout row wrap>
            <v-flex lg9 sm9 class="v-card">
                <v-toolbar color="primary lighten-1" dark tabs>
                    <v-toolbar-side-icon></v-toolbar-side-icon>
                    <v-toolbar-title class="white--text">活期产品</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        <v-icon>search</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>apps</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>refresh</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>more_vert</v-icon>
                    </v-btn>
                    <v-tabs color="primary lighten-1" slot="extension" v-model="activeName" grow show-arrows>
                        <v-tabs-slider color="yellow"></v-tabs-slider>
                        <v-tab v-for="n in prodInfo" :key="n">
                            {{ n.text}}
                        </v-tab>
                    </v-tabs>
                </v-toolbar>
                <v-tabs-items v-model="activeName" class="white elevation-1">
                    <v-tab-item v-for="i in 12" :key="i" :id="'mobile-tabs-5-' + i">
                        <acct-base-info v-if="i==1" ref="callback" v-bind:prodData="prodData" v-on:callBackAcctBaseInfo="callBackAcctBaseInfo"></acct-base-info>
                        <control-info v-if="i==2" ref="callback" v-bind:prodData="prodData" v-on:callBackControlInfo="callBackControlInfo"></control-info>
                        <product-object v-if="i==3" ref="callback" v-bind:prodData="prodData" v-on:callBackProdObject="callBackProdObject"></product-object>
                        <int-detail v-if="i == 4" ref="callback" v-bind:prodData="prodData" v-on:callBackIntDetail="callBackIntDetail"></int-detail>
                        <open-acct v-if="i==5" ref="callback" v-bind:prodData="prodData" v-on:callBackOpenAcct="callBackOpenAcct"></open-acct>
                        <close-acct v-if="i==6" ref="callback" v-bind:prodData="prodData" v-on:callBackCloseAcct="callBackCloseAcct"></close-acct>
                        <Deposit v-if="i==7" ref="callback" v-bind:prodData="prodData" v-on:callBackDeposit="callBackDeposit"></Deposit>
                        <draw-info v-if="i==8" ref="callback" v-bind:prodData="prodData" v-on:callBackDrawInfo="callBackDrawInfo"></draw-info>
                        <charge-define v-if="i==9" v-bind:prodData="prodData"></charge-define>
                        <rate-info v-if="i==10" v-bind:prodData="prodData"></rate-info>
                        <form-shift v-if="i==11" v-bind:prodData="prodData"></form-shift>
                        <accounting-info v-if="i==12" v-bind:prodData="prodData"></accounting-info>
                    </v-tab-item>
                </v-tabs-items>
            </v-flex>
            <v-flex lg3 sm3 class="v-card">
                <v-card>
                    <v-card-text>
                        <down-action v-if="pendFlag==0" v-on:listenToCopy="listenToCopy" v-on:saveProd="saveProd" v-on:tempProd="tempProd"></down-action>
                        <pending-form v-if="pendFlag==1"></pending-form>
                    </v-card-text>
                </v-card>
                <prod-list-form v-bind:prodClass="prodClass" v-on:listenToProdList="listenToProdList"></prod-list-form>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import {
        getProdType
    } from '@/api/url/prodInfo'
    import {
        savaProdInfo
    } from '@/api/url/prodInfo';
    import BranchForm from "../form/BranchFormProd";
    import VWidget from '@/components/VWidget';
    import VuePerfectScrollbar from 'vue-perfect-scrollbar';
    import { getProdData } from "@/api/url/prodInfo";
    import {filterChangeData} from "@/server/filterChangeData";

    import AcctBaseInfo from '../form/rbModel/AcctBaseInfo';
    import controlInfo from '../form/rbModel/ControlInfo';
    import ProductObject from '../form/rbModel/ProductObject';
    import IntDetail from '../form/rbModel/IntDetail';
    import OpenAcct from '../form/rbModel/OpenAcct';
    import CloseAcct from  '../form/rbModel/CloseAcct';
    import DrawInfo from  '../form/rbModel/DrawInfo';
    import Deposit from  '../form/rbModel/Deposit';
    import ChargeDefine from '../form/rbModel/ChargeDefine';
    import RateInfo from '../form/rbModel/RateInfo';
    import FormShift from '../form/rbModel/FormShift';
    import AccountingInfo from '../form/rbModel/AccountingInfo';

    import downAction from '../btn/downAction';
    import ProdListForm from '../form/ProdListForm';
    import PendingForm from '../btn/PendingForm';
    import { getCheckFlowList } from "@/api/url/prodInfo";
    import toast from '@/utils/toast';

    export default {
        name: 'deposit',
        components: {
            BranchForm,
            VWidget,
            VuePerfectScrollbar,
            controlInfo,
            AcctBaseInfo,
            ProductObject,
            IntDetail,
            OpenAcct,
            CloseAcct,
            DrawInfo,
            Deposit,
            ChargeDefine,
            RateInfo,
            FormShift,
            AccountingInfo,
            downAction,
            ProdListForm,
            PendingForm
        },
        data () {
            return {
                listLoading: true,
                searchValue: '',
                showCopy: '',
                depositProd: {
                    prodcode: '',
                    version: ''
                },
                prodCode: '',
                pendFlag: 0,
                prodClass: '',
                activeName: 'basic',
                prodInfo: [{
                    icon: 'account_balance',
                    text: '基本信息'
                }, {
                    icon: 'filter_vintage',
                    text: '控制信息'
                }, {
                    icon: 'work',
                    text: '适用范围'
                }, {
                    icon: 'work',
                    text: '利息信息'
                }, {
                    icon: 'work',
                    text: '开户定义'
                }, {
                    icon: 'work',
                    text: '销户定义'
                }, {
                    icon: 'work',
                    text: '存入定义'
                }, {
                    icon: 'work',
                    text: '支取定义'
                }, {
                    icon: 'work',
                    text: '收费定义'
                }, {
                    icon: 'work',
                    text: '利率信息'
                }, {
                    icon: 'work',
                    text: '形态转移'
                }, {
                    icon: 'work',
                    text: '核算信息'
                }],
                files: [{
                    icon: 'assignment',
                    iconClass: 'blue white--text',
                    value: '',
                    lable: ''
                }],
                folders: [],
                prodData: {},
                sourceProdData: {},
                targetData: {}
            }
        },
        created() {
            this.prodClass = this.$route.params.prodClassCmp
        },
        mounted: function() {
            this.queryProdFlow();
            window.getApp.$emit('APP_DRAWER_TOGGLED');
            if(this.$route.hash !== "" && this.$route.hash !== null) {
                //点击主菜单产品组时 获取产品组代码
                this.prodClass = this.$route.hash
            }else if(this.$route.params.prodClassCmp !== "" && this.$route.params.prodClassCmp !== null){
                //通过全局搜索/产品目录  获取目标产品产品组代码
                this.prodClass = this.$route.params.prodClassCmp
            }
            //通过全局搜索/产品目录 获取目标产品代码
            if(this.$route.params.prodType !== "" && this.$route.params.prodType !== null){
                this.listenToProdList(this.$route.params)
            }
        },
        methods: {
            queryProdFlow(){
                getCheckFlowList().then(response => {
                    let length = response.data.data.length
                    for(let j = 0; j<length; j++){
                        if(response.data.data[j].flowManage.status === "2"){
                            this.pendFlag = 1
                            toast.info("存在已提交数据，等待复核!");
                            break
                        }
                        if(response.data.data[j].flowManage.status === "3"){
                            this.pendFlag = 1
                            toast.info("存在已复核数据，等待发布！");
                            break
                        }
                    }
                });
            },
            queryProdInfo() {
                console.log('start query prod info')
            },
            saveProd() {
                this.$refs.callback[0].callbackprod()
                this.$refs.callback[1].callbackprod()
                this.$refs.callback[2].callbackprod()
                this.$refs.callback[3].callbackprod()
                this.$refs.callback[4].callbackprod()
                this.$refs.callback[5].callbackprod()
                this.$refs.callback[6].callbackprod()
                this.$refs.callback[7].callbackprod()
                this.targetData = filterChangeData(this.prodData, this.sourceProdData,this.showCopy)
                if(this.showCopy === "Y") {
                    this.targetData.optionType = "I"
                }else{
                    this.targetData.optionType = "U"
                }
                this.targetData.option = "save";
                this.targetData.userName = sessionStorage.getItem("userId")
                savaProdInfo(this.targetData).then(response => {
                    if(response.status === 200) {
                        //置灰提交按钮，防止为此提交
                        this.pendFlag = 1
                        toast.success("提交成功！");
                    }
                })
            },
            tempProd() {
                this.$refs.callback[0].callbackprod()
                this.$refs.callback[1].callbackprod()
                this.$refs.callback[2].callbackprod()
                this.$refs.callback[3].callbackprod()
                this.$refs.callback[4].callbackprod()
                this.$refs.callback[5].callbackprod()
                this.$refs.callback[6].callbackprod()
                this.$refs.callback[7].callbackprod()
                this.targetData = filterChangeData(this.prodData,this.sourceProdData,this.showCopy)
                if(this.showCopy === "Y") {
                    this.targetData.optionType = "I"
                }else{
                    this.targetData.optionType = "U"
                }
                this.targetData.option="temp";
                this.targetData.userName = sessionStorage.getItem("userId")
                savaProdInfo(this.targetData).then(response => {
                    if(response.status === 200) {
                        toast.success("暂存成功！");
                    }
                })
            },
            listenToProdList(value) {
                this.prodCode = value.prodType
                getProdData(this.prodCode).then(response => {
                    this.prodData = response.data.data
                    this.sourceProdData = this.copy(this.prodData,this.sourceProdData)
                });
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
            },
            initStage(value){
                this.listValue = value
            },
            onSubmit() {
                this.$message('submit!')
            },
            onCancel() {
                this.$message({
                    message: 'cancel!',
                    type: 'warning'
                })
            },
            callBackControlInfo(val) {
                console.log(val)
                this.prodData.prodDefines.AUTOMATIC_RANGE.attrValue = val.controlInfo.draRange
                this.prodData.prodDefines.CIR_EXCHANGE_RANGE.attrValue = val.controlInfo.depRange
                this.prodData.prodDefines.TRAN_CIR_EXCG_FLAG.attrValue = val.controlInfo.tDepFlag
                this.prodData.prodDefines.CASH_CIR_EXCG_FLAG.attrValue = val.controlInfo.cashDepFlag
                this.prodData.prodDefines.CLIENT_CONTRAL_FLAG.attrValue = val.controlInfo.clientFlag
                this.prodData.prodDefines.CHANNEL_CONT_FLAG.attrValue = val.controlInfo.channelFlag
                this.prodData.prodDefines.BRC_AREA_CONT_FLAG.attrValue = val.controlInfo.branchControlFlag
                this.prodData.prodDefines.CHARGE_TYPE.attrValue = val.controlInfo.chargeFlag
                this.prodData.prodDefines.STATUS_TRAN_FLAG.attrValue = val.controlInfo.moveFlag
            },
            callBackProdObject(val) {
                console.log(val)
                this.prodData.prodDefines.CLIENT_TYPE.attrValue = val.productObject.clientType
                this.prodData.prodDefines.INLAND_OFFSHORE.attrValue = val.productObject.inLandOffshore
                this.prodData.prodDefines.PROD_BRANCH.attrValue = val.productObject.prodBranch
                this.prodData.prodDefines.CLIENT_IND.attrValue = val.productObject.clientInd
                this.prodData.prodDefines.AGE_PART.attrValue = val.productObject.ageSection
                this.prodData.prodDefines.PROFESSION.attrValue = val.productObject.occupation
                this.prodData.prodDefines.ADUPTER_AREA.attrValue = val.productObject.applyArea
                this.prodData.prodDefines.AREA_TYPE.attrValue = val.productObject.areaChoose
            },
            callBackIntDetail(val) {
                console.log(val)
                this.prodData.mbEventInfos["CYCLE_"+this.prodData.prodType.prodType].mbEventAttrs.CYCLE_FREQ.attrValue = val.intDetail.cycleFreq
                this.prodData.mbEventInfos["CYCLE_"+this.prodData.prodType.prodType].mbEventAttrs.INT_DAY.attrValue = val.intDetail.intDay
                this.prodData.mbEventInfos["CYCLE_"+this.prodData.prodType.prodType].mbEventAttrs.INT_CAP.attrValue = val.intDetail.cycleSelfFlag
            },
            callBackOpenAcct(val) {
                console.log(val)
                this.prodData.mbEventInfos["OPEN_"+this.prodData.prodType.prodType].mbEventAttrs.STRUCTURE_TYPE.attrValue = val.openAcct.structureType
                this.prodData.mbEventInfos["OPEN_"+this.prodData.prodType.prodType].mbEventAttrs.WITHDRAWAL_TYPE.attrValue = val.openAcct.checkWadrawnType
                this.prodData.mbEventInfos["OPEN_"+this.prodData.prodType.prodType].mbEventAttrs.CHECK_RESTRAINT.attrValue = val.openAcct.restraintFlag
                this.prodData.mbEventInfos["OPEN_"+this.prodData.prodType.prodType].mbEventAttrs.AGENT_FLAG.attrValue = val.openAcct.checkAgent
                this.prodData.mbEventInfos["OPEN_"+this.prodData.prodType.prodType].mbEventAttrs.NUM_OF_CLIENT.attrValue = val.openAcct.numOfClient
                this.prodData.mbEventInfos["OPEN_"+this.prodData.prodType.prodType].mbEventAttrs.MAX_BACK_DATE_DAYS.attrValue = val.openAcct.maxBackDateDays
                this.prodData.mbEventInfos["OPEN_"+this.prodData.prodType.prodType].mbEventAttrs.DOC_TYPE_DEAL.attrValue = val.openAcct.withdrawTypeHandeling
                this.prodData.mbEventInfos["OPEN_"+this.prodData.prodType.prodType].mbEventAttrs.CHECK_CLIENT_NUM_FLAG.attrValue = val.openAcct.clientAmtCheckFlag
                this.prodData.mbEventInfos["OPEN_"+this.prodData.prodType.prodType].mbEventAttrs.START_INT_DATE_FALG.attrValue = val.openAcct.startDepositAmt
            },
            callBackCloseAcct(val) {
                console.log(val)
                this.prodData.mbEventInfos["CLOSE_"+this.prodData.prodType.prodType].mbEventAttrs.AGENT_FLAG.attrValue = val.closeAcct.permitCommersionFlag
                this.prodData.mbEventInfos["CLOSE_"+this.prodData.prodType.prodType].mbEventAttrs.CHECK_RESTRAINT.attrValue = val.closeAcct.acctReatraintCheck
                this.prodData.mbEventInfos["CLOSE_"+this.prodData.prodType.prodType].mbEventAttrs.CHECK_SIGN.attrValue = val.closeAcct.resignCheck
                this.prodData.mbEventInfos["CLOSE_"+this.prodData.prodType.prodType].mbEventAttrs.CHECK_CLOSE_FEE.attrValue = val.closeAcct.ownCheck
                this.prodData.mbEventInfos["CLOSE_"+this.prodData.prodType.prodType].mbEventAttrs.DEPOSIT_CONTRAL_WAY.attrValue = val.closeAcct.systemControlApproach
                this.prodData.mbEventInfos["CLOSE_"+this.prodData.prodType.prodType].mbEventAttrs.CAPITAL_ORIGIN_WAY.attrValue = val.closeAcct.cashResouce
                this.prodData.mbEventInfos["CLOSE_"+this.prodData.prodType.prodType].mbEventAttrs.CLOSE_BACK_FLAG.attrValue = val.closeAcct.closeAcctRollbackFlag
            },
            callBackDeposit(val) {
                console.log(val)
                this.prodData.mbEventInfos["DEP_"+this.prodData.prodType.prodType].mbEventAttrs.AGENT_FLAG.attrValue = val.deposit.permitCommersionFlag
                this.prodData.mbEventInfos["DEP_"+this.prodData.prodType.prodType].mbEventAttrs.CHECK_RESTRAINT.attrValue = val.deposit.acctReatraintCheck
                this.prodData.mbEventInfos["DEP_"+this.prodData.prodType.prodType].mbEventAttrs.CHECK_INIT_AMT.attrValue = val.deposit.startAmtCheck
                this.prodData.mbEventInfos["DEP_"+this.prodData.prodType.prodType].mbEventAttrs.SG_DEP_MIN_AMT.attrValue = val.deposit.sgDepMinAmt
                this.prodData.mbEventInfos["DEP_"+this.prodData.prodType.prodType].mbEventAttrs.SG_DEP_MAX_AMT.attrValue = val.deposit.sgDepMaxAmt
                this.prodData.mbEventInfos["DEP_"+this.prodData.prodType.prodType].mbEventAttrs.CHECK_INIT_AMT.attrValue = val.deposit.checkInitAmt
                this.prodData.mbEventInfos["DEP_"+this.prodData.prodType.prodType].mbEventAttrs.KEEP_MIN_BAL.attrValue = val.deposit.keepMinBal
                this.prodData.mbEventInfos["DEP_"+this.prodData.prodType.prodType].mbEventAttrs.KEEP_MAX_BAL.attrValue = val.deposit.keepMaxBal
                this.prodData.mbEventInfos["DEP_"+this.prodData.prodType.prodType].mbEventAttrs.DEPOSIT_CONTRAL_WAY.attrValue = val.deposit.depositControlApproach
                this.prodData.mbEventInfos["DEP_"+this.prodData.prodType.prodType].mbEventAttrs.CAPITAL_ORIGIN_WAY.attrValue = val.deposit.cashResource
                this.prodData.mbEventInfos["DEP_"+this.prodData.prodType.prodType].mbEventAttrs.DEPOSIT_BREAK_TYPE.attrValue = val.deposit.breakType
                this.prodData.mbEventInfos["DEP_"+this.prodData.prodType.prodType].mbEventAttrs.BREAK_DEAL_WAY.attrValue = val.deposit.dealingWay
            },
            callBackDrawInfo(val) {
                console.log(val)
                this.prodData.mbEventInfos["WTD_"+this.prodData.prodType.prodType].mbEventAttrs.WITHDRAWAL_TYPE.attrValue = val.drawInfo.drawControlWay
                this.prodData.mbEventInfos["WTD_"+this.prodData.prodType.prodType].mbEventAttrs.AGENT_FLAG.attrValue = val.drawInfo.checkAgent
                this.prodData.mbEventInfos["WTD_"+this.prodData.prodType.prodType].mbEventAttrs.FUND_TRAN_TYPE.attrValue = val.drawInfo.cashResource
                this.prodData.mbEventInfos["WTD_"+this.prodData.prodType.prodType].mbEventAttrs.CHECK_RESTRAINT.attrValue = val.drawInfo.attrReatraintCheck
                this.prodData.mbEventInfos["WTD_"+this.prodData.prodType.prodType].mbEventAttrs.CHECK_WDRAWN_TYPE.attrValue = val.drawInfo.withDrawlCheck
                this.prodData.mbEventInfos["WTD_"+this.prodData.prodType.prodType].mbEventParts.CHECK_SG_AMT_PA.SG_MIN_AMT.attrValue = val.drawInfo.sgMinAmt
                this.prodData.mbEventInfos["WTD_"+this.prodData.prodType.prodType].mbEventParts.CHECK_KEEP_BAL_PA.CHECK_KEEP_BAL.attrValue = val.drawInfo.acctBalanceCheck
                this.prodData.mbEventInfos["WTD_"+this.prodData.prodType.prodType].mbEventParts.CHECK_SG_AMT_PA.SG_MAX_AMT.attrValue = val.drawInfo.sgMaxAmt
                this.prodData.mbEventInfos["WTD_"+this.prodData.prodType.prodType].mbEventParts.CHECK_KEEP_BAL_PA.KEEP_MIN_BAL.attrValue = val.drawInfo.keepMinBal
                this.prodData.mbEventInfos["WTD_"+this.prodData.prodType.prodType].mbEventAttrs.BREAK_DEAL_WAY.attrValue = val.drawInfo.dealingWay
                this.prodData.mbEventInfos["WTD_"+this.prodData.prodType.prodType].mbEventAttrs.DRAW_BREAK_TYPE.attrValue = val.drawInfo.breakType
                this.prodData.mbEventInfos["WTD_"+this.prodData.prodType.prodType].mbEventAttrs.CHECK_DOC_TYPE.attrValue = val.drawInfo.voucherTypeCheck
                this.prodData.mbEventInfos["WTD_"+this.prodData.prodType.prodType].mbEventParts.CHECK_KEEP_BAL_PA.CHECK_SG_AMT.attrValue = val.drawInfo.sgBalCheck

            },
            callBackAcctBaseInfo(val) {
                console.log(val)
                this.prodData.prodType.prodType = val.acctBaseInfo.prodType
                this.prodData.prodType.prodDesc = val.acctBaseInfo.prodDesc
                this.prodData.prodType.prodRange = val.acctBaseInfo.prodRange
                this.prodData.prodType.prodClass = val.acctBaseInfo.prodClass
                this.prodData.prodType.prodGroup = val.acctBaseInfo.prodGroup
                this.prodData.prodType.status = val.acctBaseInfo.status
                this.prodData.prodType.baseProdType = val.acctBaseInfo.baseProdType
                this.prodData.prodDefines.SOURCE_MODULE.attrValue = val.acctBaseInfo.sourceModule
                this.prodData.prodDefines.PROFIT_CENTRE.attrValue = val.acctBaseInfo.profitCenter
                this.prodData.prodDefines.MULTI_CCY.attrValue = val.acctBaseInfo.multiCcy
                this.prodData.prodDefines.ACCT_INT_FLAG.attrValue = val.acctBaseInfo.acctIntFlag
                this.prodData.prodDefines.DOC_TYPE.attrValue = val.acctBaseInfo.docType
                this.prodData.prodDefines.ACCT_TYPE.attrValue = val.acctBaseInfo.acctType
                this.prodData.prodDefines.ACCT_NATURE.attrValue = val.acctBaseInfo.acctNature
                this.prodData.prodDefines.OWNERSHIP_TYPE.attrValue = val.acctBaseInfo.ownerShipType
                this.prodData.prodDefines.ACCT_CLASS.attrValue = val.acctBaseInfo.acctClass
                this.prodData.prodDefines.BAL_TYPE.attrValue = val.acctBaseInfo.balType
                this.prodData.prodDefines.PROD_START_DATE.attrValue = val.acctBaseInfo.prodStartDate.substr(0, 4) + val.acctBaseInfo.prodStartDate.substr(5, 2) + val.acctBaseInfo.prodStartDate.substr(8, 2)
                this.prodData.prodDefines.PROD_END_DATE.attrValue = val.acctBaseInfo.prodEndDate.substr(0, 4) + val.acctBaseInfo.prodEndDate.substr(5, 2) + val.acctBaseInfo.prodEndDate.substr(8, 2)
                this.prodData.prodDefines.DOC_TYPE.attrValue = val.acctBaseInfo.docType
                this.prodData.prodDefines.WITHDRAWAL_TYPE.attrValue = val.acctBaseInfo.withdrawalType
                this.prodData.prodDefines.FIXED_CALL.attrValue = val.acctBaseInfo.fixedCall
                this.prodData.prodDefines.DOC_FLAG.attrValue = val.acctBaseInfo.docFlag
                this.prodData.prodDefines.CONVERT_CCY.attrValue = val.acctBaseInfo.discountCcy
            },
            listenToCopy(data) {
                this.prodCode=data.prodType;
                this.prodData.prodType.prodType=data.prodType;
                this.prodData.prodType.prodDesc=data.prodDesc;
                const newData=this.copy(this.prodData,[]);
                this.prodData=newData;
                if(!data.showCopy){
                    this.showCopy = 'Y';
                }else{
                    this.showCopy = '';
                }
            }
        }
    }
</script>

<style scoped>
    .top {
        padding-top: 8px;
    }
    .depositTree {
        height: calc(90vh - 48px);
    }
    /*  .prodList {
                  border-top-style: solid;border-top-width: 1px;border-color: rgba(40, 24, 31, 0.21);
                }
                .prodLists {
                  border-bottom-style: solid;border-bottom-width: 3px;border-color: rgba(183, 172, 177, 0.6);
                }*/
</style>