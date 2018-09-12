<template>
    <div class="app-container">
        <v-layout row wrap>
            <v-flex lg9 sm9 class="v-card">
                <v-toolbar color="primary lighten-1" dark tabs>
                    <v-toolbar-side-icon></v-toolbar-side-icon>
                    <v-toolbar-title class="white--text">个人存款产品</v-toolbar-title>
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
                        <acct-base-info v-if="i==1" ref="callback" v-bind:prodData="prodData" v-on:getNewProdData="getNewProdData"></acct-base-info>
                        <control-info v-if="i==2" ref="callback" v-bind:prodData="prodData" v-on:getNewProdData="getNewProdData"></control-info>
                        <product-object v-if="i==3" ref="callback" v-bind:prodData="prodData" v-on:getNewProdData="getNewProdData"></product-object>
                        <int-detail v-if="i == 4" ref="callback" v-bind:prodData="prodData" v-on:getNewProdData="getNewProdData"></int-detail>
                        <open-acct v-if="i==5" ref="callback" v-bind:prodData="prodData" v-on:getNewProdData="getNewProdData"></open-acct>
                        <close-acct v-if="i==6" ref="callback" v-bind:prodData="prodData" v-on:getNewProdData="getNewProdData"></close-acct>
                        <Deposit v-if="i==7" ref="callback" v-bind:prodData="prodData" v-on:getNewProdData="getNewProdData"></Deposit>
                        <draw-info v-if="i==8" ref="callback" v-bind:prodData="prodData" v-on:getNewProdData="getNewProdData"></draw-info>
                        <charge-define v-if="i==9" v-bind:listValue="listValue"></charge-define>
                        <rate-info v-if="i==10" v-bind:listValue="listValue"></rate-info>
                        <form-shift v-if="i==11" v-bind:listValue="listValue"></form-shift>
                        <accounting-info v-if="i==12" v-bind:listValue="listValue"></accounting-info>
                    </v-tab-item>
                </v-tabs-items>
            </v-flex>
            <v-flex lg3 sm3 class="v-card">
                <v-card>
                    <v-card-text>
                        <v-btn color="success" depressed="" ><v-icon >assignment_turned_in</v-icon>暂存</v-btn>
                        <v-btn color="success" depressed="" ><v-icon >history</v-icon>复制</v-btn>
                        <v-btn color="success" depressed="" @click="saveClick"><v-icon >history</v-icon>保存</v-btn>
                    </v-card-text>
                </v-card>
                <v-toolbar dense class="chat-history-toolbar prodLists">
                    <v-text-field flat solo full-width clearable prepend-icon="search" class="top" label="Search" v-model="searchValue"></v-text-field>
                </v-toolbar>
                <vue-perfect-scrollbar class="depositTree">
                    <v-list two-line subheader>
                        <!--<v-subheader inset>个人活期产品</v-subheader>-->
                        <v-list-tile class="chat-list prodList" avatar v-for="(item, index ) in folders" :key="item.title" @click="handleClick(item)">
                            <v-list-tile-avatar>
                                <v-icon :class="['amber white--text']">{{ 'call_to_action'}}</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.prodType }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ item.prodDesc }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-btn icon ripple>
                                    <v-icon color="grey lighten-1">info</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                </vue-perfect-scrollbar>
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
    import downAction from '../btn/downAction'
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
    export default {
        name: 'deposit',
        components: {
            BranchForm,
            VWidget,
            VuePerfectScrollbar,
            downAction,
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
            AccountingInfo
        },
        data () {
            return {
                listLoading: true,
                searchValue: '',
                depositProd: {
                    prodcode: '',
                    version: ''
                },
                prodCode: '',
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
                   text: '利率信息'
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
                targetData: {},
                ttt: {}
            }
        },
        created() {
            this.prodClass = this.$route.params.prodClassCmp
        },
        mounted: function() {
            window.getApp.$emit('APP_DRAWER_TOGGLED');
            this.prodClass = this.$route.hash
            this.queryDespositProdData(this.prodClass)
            if(this.$route.params.prodClassCmp !=''){
                this.prodClass = this.$route.params.prodClassCmp
            }
            if(this.$route.params.prodCodeCmp !=''){
                this.initStage(this.$route.params.prodCodeCmp)
            }
            this.queryDespositProdData(this.prodClass)
        },
        methods: {
            queryProdInfo() {
                console.log('start query prod info')
            },
            saveClick() {
                this.$refs.callback[0].callbackprod()
                this.targetData = filterChangeData(this.prodData,this.sourceProdData)
                this.targetData.option="save";
                savaProdInfo(this.targetData);
            },
            handleClick(value) {
                this.prodCode = value.prodType
                getProdData(this.prodCode).then(response => {
                    this.prodData = response.data
                    this.sourceProdData = this.copy(this.prodData,this.sourceProdData)
                });
            },
            //对象浅复制
            copy(obj1,obj2) {
                var obj = obj2||{};
                for(let name in obj1){
                    if(typeof obj1[name] === "object"){
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
            queryDespositProdData(prodClass) {
                getProdType(prodClass).then(response => {
                    let length = response.data.length
                    for(let j = 0; j<length; j++){
                        this.folders.push(response.data[j])
                    }
                })
            },
            getNewProdData(val) {
                console.log(val)
                this.prodData.prodType.prodType = val.eventForm.prodcode
                this.prodData.prodType.prodDesc = val.eventForm.proddesc
                this.prodData.prodType.prodRange = val.eventForm.prodprepice
                this.prodData.prodType.prodClass = val.eventForm.prodclass
                this.prodData.prodType.prodGroup = val.eventForm.prodmuti
                this.prodData.prodType.status = val.eventForm.prodstatus
                this.prodData.prodDefines.ACCT_STRUCT_FLAG.attrValue = val.eventForm.acctstruct
                this.prodData.prodDefines.ACCT_REAL_FLAG.attrValue = val.eventForm.virtualflag
                this.prodData.prodDefines.ACCT_INT_FLAG.attrValue = val.eventForm.acctintflag
                this.prodData.prodDefines.ACCT_BAL_FLAG.attrValue = val.eventForm.amtflag
                this.prodData.prodDefines.PROFIT_CENTRE.attrValue = val.eventForm.profitcenter
                this.prodData.prodDefines.PROD_START_DATE.attrValue = val.eventForm.effectdate
                this.prodData.prodDefines.PROD_END_DATE.attrValue = val.eventForm.failuredate
                this.prodData.prodDefines.ACCT_TYPE.attrValue = val.eventForm.accttype

                this.prodData.mbEventInfos.CLOSE_RB101.mbEventAttrs.CHECK_AGENT.attrValue = val.eventForm.baseprod
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