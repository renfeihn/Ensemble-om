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
                            <!-- <v-icon>{{n.icon}}</v-icon> -->
                        </v-tab>
                    </v-tabs>
                </v-toolbar>
                <v-tabs-items v-model="activeName" class="white elevation-1">
                    <v-tab-item v-for="i in 12" :key="i" :id="'mobile-tabs-5-' + i">
                        <!-- <v-card>
                            <v-card-text> v-on:prodDataSon="prodDataSon"-->
                        <event-form v-if="i==1" ref="test" v-bind:prodData="prodData" :options="options" v-on:getNewProdData="getNewProdData"></event-form>
                        <accounting-plain v-if="i==2"></accounting-plain>
                        <branch-form v-if="i==3"></branch-form>
                        <acct-form v-if="i > 3" v-bind:sourceData="{'acctForm':sourceData.acctForm}"></acct-form>
                        <!-- </v-card-text>
                    </v-card> -->
                    </v-tab-item>
                </v-tabs-items>
            </v-flex>
            <v-flex lg3 sm3 class="v-card">
                <!--<v-card>-->
                <!--<v-card-text>-->
                <!--<down-action v-on:listenToCopy="showCopy"></down-action>-->
                <!--</v-card-text>-->
                <!--</v-card>-->
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
    // import queryheader from './components/queryheader'
    import {
        getProdType
    } from '@/api/url/prodInfo'
    import {
        savaProdInfo
    } from '@/api/url/prodInfo';
    import BranchForm from "../form/BranchFormProd";
    import EventForm from '../form/EventFormPord';
    import VWidget from '@/components/VWidget';
    import VuePerfectScrollbar from 'vue-perfect-scrollbar';
    import accountingPlain from '../table/accountingPlain'
    import AcctForm from '../form/AcctFormPord';
    import { getProdData } from "@/api/url/prodInfo";
    import downAction from '../btn/downAction'
    import {filterChangeData} from "@/server/filterChangeData";
    export default {
        name: 'deposit',
        components: {
            accountingPlain,
            BranchForm,
            EventForm,
            VWidget,
            AcctForm,
            VuePerfectScrollbar,
            downAction
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
                options: '',
                activeName: 'basic',
                prodInfo: [{
                    icon: 'account_balance',
                    text: '基本信息'
                }, {
                    icon: 'filter_vintage',
                    text: '账户信息'
                }, {
                    icon: 'work',
                    text: '产品对象'
                }, {
                    icon: 'work',
                    text: '利率信息'
                }, {
                    icon: 'work',
                    text: '风险信息'
                }, {
                    icon: 'work',
                    text: '开户定义'
                }, {
                    icon: 'work',
                    text: '存入定义'
                }, {
                    icon: 'work',
                    text: '支取定义'
                }, {
                    icon: 'work',
                    text: '利率信息'
                }, {
                    icon: 'work',
                    text: '核算信息'
                }, {
                    icon: 'work',
                    text: '销户定义'
                }, {
                    icon: 'work',
                    text: '结息定义'
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
                this.options = "save"
                this.$refs.test[0].callbackProd
                filterChangeData(this.prodData,this.sourceProdData,this.targetData);
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
//            getProdBySearchValue(val) {
//                if (val) {
//                    let j = 1
//                    for (let i = 1; i < this.folders.length; i++) {
//                        if (this.folders[i].value.indexOf(val) == -1 || this.folders[i].label.indexOf(val) == -1) {
//                        }
//                    }
//                }
//            },
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
//        watch: {
//            searchValue(val, oldval) {
//                if (val !== oldval) {
//                    this.getProdBySearchValue(val)
//                }
//            }
//        }
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