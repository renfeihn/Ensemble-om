<template>
    <div class="app-container">
        <v-layout row wrap>
            <v-flex lg9 sm9 class="v-card">
                <v-toolbar color="primary lighten-1" dark tabs>
                    <v-toolbar-side-icon></v-toolbar-side-icon>
                    <v-toolbar-title class="white--text">{{prodCode}}-{{prodDesc}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="refreshClick">
                        <v-icon>refresh</v-icon>
                    </v-btn>
                    <v-tabs color="primary lighten-1" slot="extension" v-model="activeName" grow show-arrows>
                        <v-tabs-slider color="yellow"></v-tabs-slider>
                        <v-tab v-for="n in prodInfo" :key="n">
                            {{ n.text}}
                        </v-tab>
                    </v-tabs>
                </v-toolbar>
                <v-tabs-items v-model="activeName" class="white elevation-1">
                    <v-tab-item v-for="i in 3" :key="i">
                        <base-prod v-if="i==1" :prodType="prodData.prodType" :prodDefines="prodData.prodDefines" tags="BASE"></base-prod>
                        <base-prod v-if="i==2" :prodDefines="prodData.prodDefines" tags="CONTROL"></base-prod>
                        <base-prod v-if="i==3" :prodDefines="eventList"></base-prod>
                      <!--  <get-action v-if="i==13" v-bind:prodData="prodData"></get-action>-->
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
    import VWidget from '@/components/VWidget';
    import VuePerfectScrollbar from 'vue-perfect-scrollbar';
    import { getProdData } from "@/api/url/prodInfo";
    import {filterChangeData} from "@/server/filterChangeData";
    import { getCheckFlowList } from "@/api/url/prodInfo";
    import toast from '@/utils/toast';
    import downAction from '@/views/prodFactory/prodInfo/btn/downAction';
    import column from './column'
    import tags from './tags'
    import columnInfo from './columnInfo'
    import PendingForm from '@/views/prodFactory/prodInfo/btn/PendingForm';
    import BaseProd from './BaseProd'
    export default {
        name: 'deposit',
        components: {
            VWidget,
            BaseProd,
            downAction,
            PendingForm
        },
        data () {
            return {
                listLoading: true,
                showCopy: '',
                prodCode: '',
                prodDesc: '',
                pendFlag: 0,
                prodClass: '',
                activeName: 'basic',
                eventList: {},
                prodInfo: [
                    {
                    icon: 'account_balance',
                    text: '基本信息'
                    }, {
                    icon: 'filter_vintage',
                    text: '控制信息'
                   }, {
                        icon: 'filter_vintage',
                        text: '开户定义'
                    }
                ],
                tagList: [
                ],
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
        mounted: function() {
            //检查是否存在待处理数据
            this.queryProdFlow();
            window.getApp.$emit('APP_DRAWER_TOGGLED');
            if(this.$route.hash !== "" && this.$route.hash !== null) {
                //点击主菜单产品组时 获取产品组代码
                this.prodClass = this.$route.hash
                //默认展示RB101产品信息
                getProdData("RB101").then(response => {
                    const reProd  = response.data.data
                    this.prodData=reProd;
                    const event=reProd.mbEventInfos.OPEN_RB101
                    let events={}
                    for(const index in event.mbEventAttrs){
                        events[index]=event.mbEventAttrs[index]
                    }
                    for(const index in event.mbEventParts){
                        const part=event.mbEventParts[index]
                        for(const key in part){
                            events[key]=part[key]
                        }
                    }
                    this.eventList=events;
                    this.prodCode = response.data.data.prodType.prodType
                    this.prodDesc = response.data.data.prodType.prodDesc
                    this.sourceProdData = this.copy(this.prodData,this.sourceProdData)
                });
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
                        this.pendFlag = 1
                        toast.success("提交成功！");
                    }
                })
            },
            tempProd() {
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
                this.prodData = {}
                getProdData(this.prodCode).then(response => {
                    this.prodData = response.data.data
                    this.prodDesc = response.data.data.prodType.prodDesc
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
            listenToCopy(data) {
                this.prodCode=data.prodType;
                this.prodDesc = data.prodDesc;
                this.prodData.prodType.prodType=data.prodType;
                this.prodData.prodType.prodDesc=data.prodDesc;
                const newData=this.copy(this.prodData,[]);
                this.prodData=newData;
                if(!data.showCopy){
                    this.showCopy = 'Y';
                }else{
                    this.showCopy = '';
                }
            },
            refreshClick() {
                getProdData(this.prodCode).then(response => {
                    this.prodData = response.data.data
                    this.prodCode = response.data.data.prodType.prodType
                    this.prodDesc = response.data.data.prodType.prodDesc
                    this.sourceProdData = this.copy(this.prodData,this.sourceProdData)
                });
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