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
                        <event-form v-if="i==1" v-bind:sourceData="{'eventForm':sourceData.eventForm}"></event-form>
                        <accounting-plain v-if="i==2"></accounting-plain>
                        <acct-form v-if="i > 2" v-bind:sourceData="{'acctForm':sourceData.acctForm}"></acct-form>

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
                        <v-btn color="success" depressed="" @click="tempClick"><v-icon >assignment_turned_in</v-icon>暂存</v-btn>
                        <v-btn color="success" depressed="" @click="copyClick"><v-icon >history</v-icon>复制</v-btn>
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
                                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.value }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ item.label }}</v-list-tile-sub-title>
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
    } from '@/api/prod'
    import EventForm from '../form/EventFormPord';
    import VWidget from '@/components/VWidget';
    import VuePerfectScrollbar from 'vue-perfect-scrollbar';
    import accountingPlain from '../table/accountingPlain'
    import AcctForm from '../form/AcctFormPord';
    import { getProdData } from "@/api/prod";
    import downAction from '../btn/downAction'
    import {getChangeData} from "@/server/getChangeData";
    export default {
        name: 'deposit',
        components: {
            accountingPlain,
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
                activeName: 'basic',
                targetData: {},
                sourceData: {
                    eventForm: {
                        prodcode: '',
                        proddesc: '',
                        busimodel: '',
                        prodclass: '',
                        prodprepice: '',
                        prodmuti: '',
                        prodstatus: '',
                        baseprod: '',
                        accttype: '',
                        acctsontype: '',
                        acctstruct: '',
                        virtualflag: '',
                        acctintflag: '',
                        amtflag: '',
                        profitcenter: '',
                        effectdate: '',
                        failuredate: ''
                    },
                    acctForm: {
                        attr: '',
                        class: '',
                        muticcyflag: '',
                        ccytype: '',
                        amttype: '',
                        baltype: '',
                        reducedccy: '',
                        acctusefor: '',
                        mediumtype: '',
                        effectdate: '',
                        failuredate: ''
                    }
                },
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
                folders: []
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
                //this.prodData对象，通过子界面回传，导致对象数据为修改后的最新数据。需要根据产品代码重新查库获取原始数据，再筛选出修改过的数据
                getProdData(this.prodCode).then(response => {
                    getChangeData(response.data,this.sourceData,this.targetData).then(response => {
                        console.log(this.targetData)
                    });
                });
            },
            handleClick(value) {
                this.prodCode = value.value
                getProdData(value.value).then(response => {
                    this.sourceData.acctForm = response.data.acctFrom
                    this.sourceData.eventForm = response.data.prodFrom
                    this.sourceData.eventForm.prodcode = this.prodCode
                });
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
                    let length = response.data.prodTypeForm.length
                    for (let i = 0; i < length; i++) {
                        if (prodClass === response.data.prodTypeForm[i].prodClass) {
                            this.folders.push(response.data.prodTypeForm[i])
                        }
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
            showCopy(copyInfo) {
                this.prodCode=copyInfo.prodType
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

