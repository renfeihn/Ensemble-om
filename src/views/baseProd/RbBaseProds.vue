<template>
    <div class="app-container">
        <v-layout row wrap>
            <v-flex lg9 sm9 class="v-card">
                <v-toolbar color="primary lighten-1" dark tabs>
                    <v-toolbar-side-icon></v-toolbar-side-icon>
                    <v-toolbar-title class="white--text">{{prodCode}}-{{prodDesc}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" persistent max-width="500px">
                        <v-btn slot="activator" color="primary" dark @click="addClick"><v-icon>add</v-icon></v-btn>
                        <v-card>
                            <v-card-title style="background-color: #5C6BC0">
                                <span class="addClass">{{prodCode}}-{{prodDesc}}[{{addColumnPageCode}}]增加参数</span>
                            </v-card-title>
                            <v-card-text>
                                <v-layout wrap>
                                    <v-flex xs12 sm12>
                                        <v-autocomplete :items="addColumnsRef" label="请选择或者输入参数名称" v-model="addColumnRef" multiple chips></v-autocomplete>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn slot="activator" @click="resetAddClick" color="success" dark style="margin-left: 8px;margin-top: -10px;width: 160px">取消</v-btn>
                                <v-btn slot="activator" @click="useAddClick(addColumnRef)" color="success" dark style="margin-left: 140px;margin-top: -10px;width: 160px">应用</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-tooltip bottom :color="grey">
                        <v-btn flat icon="refresh" slot="activator" @click="refreshClick">
                            <v-icon>refresh</v-icon>
                        </v-btn>
                        <span>刷新</span>
                    </v-tooltip>
                    <v-tabs color="primary lighten-1" slot="extension" v-model="activeName" grow show-arrows>
                        <v-tabs-slider color="yellow"></v-tabs-slider>
                        <v-tab v-for="n in prodInfo" :key="n">
                            {{ n.text}}
                        </v-tab>
                    </v-tabs>
                </v-toolbar>
                <v-tabs-items v-model="activeName" class="white elevation-1">
                    <v-tab-item v-for="i in columnArr" :key="i">
                        <v-card flat>
                        <base-prod v-if="i==1" :prodTypeCode="prodData.prodType.prodType" :prodType="prodData.prodType" :prodDefines="prodData.prodDefines" tags="BASE"></base-prod>
                        <base-prod v-if="i==2" :prodTypeCode="prodData.prodType.prodType" :prodDefines="prodData.prodDefines" tags="CONTROL"></base-prod>
                        <base-prod v-if="i==3" :prodTypeCode="prodData.prodType.prodType" :prodDefines="eventList"></base-prod>
                        </v-card>
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
            PendingForm,
            columnInfo
        },
        data () {
            return {
                listLoading: true,
                dialog: false,
                showCopy: '',
                prodCode: '',
                prodDesc: '',
                pendFlag: 0,
                columnArr: [1,2,3],
                addColumnRef: [],
                prodClass: '',
                activeName: 'basic',
                addColumnPageCode: '',
                eventList: {},
                addColumnsRef: [],
                addColumnInfos: [],
                prodInfo: [
                    {
                    icon: 'account_balance',
                    text: '基本信息',
                        pageCode: 'BASE'
                    }, {
                    icon: 'filter_vintage',
                    text: '控制信息',
                        pageCode: 'CONTROL'

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
                prodData: {
                    prodType: ''
                },
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
                    this.sourceProdDataww = this.copy(this.prodData,this.sourceProdDataww)

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
                    this.sourceProdDataww = this.copy(this.prodData,this.sourceProdDataww)
                });
            },
            useAddClick(val) {
                //获取当前界面key
                let addColumnPageCode = this.prodInfo[this.activeName].pageCode
                //获取新增参数pageSeqNo
                let addColumnPageSeqNo = this.getMaxSeqNo(this.prodData,addColumnPageCode,"pageSeqNo")+1
                //获取新增参数SeqNo
                let addColumnSeqNo = (parseInt(this.getMaxSeqNo(this.prodData,addColumnPageCode,"seqNo"))+1)+""
                let addColumnData = this.copy(this.prodData,this.addData)
                let showFlag = 0
                for(let i=0; i<val.length; i++){
                    //组装向mbProdDefine表保存的数据对象
                    let columnKey = val[i].split("--")[0]
                    let columnDesc = val[i].split("--")[1]
                    if(this.prodData.prodDefines[columnKey] !== undefined){
                        //已经存在该条数据
                        showFlag = 1
                        toast.info("产品已存在参数"+columnKey+"【"+columnDesc+"】");
                    }else {
                        addColumnData.prodDefines[columnKey] = {}
                        addColumnData.prodDefines[columnKey].prodType = this.prodCode
                        addColumnData.prodDefines[columnKey].seqNo = addColumnSeqNo
                        addColumnData.prodDefines[columnKey].pageCode = addColumnPageCode
                        addColumnData.prodDefines[columnKey].pageSeqNo = addColumnPageSeqNo
                        addColumnData.prodDefines[columnKey].attrKey = columnKey
                        addColumnData.prodDefines[columnKey].attrValue = ""
                        addColumnData.prodDefines[columnKey].status = "A"
                        addColumnData.prodDefines[columnKey].assembleType = "ATTR"
                        addColumnData.prodDefines[columnKey].assembleId = columnKey
                        //多条参数添加  序号递增
                        addColumnPageSeqNo = addColumnPageSeqNo + 1
                        addColumnSeqNo = addColumnSeqNo+1
                    }
                }
                if(showFlag === 0) {
                    this.addColumnRef = []
                    this.prodData = addColumnData
                    toast.success("产品增加参数成功！");
                    this.dialog = false
                }
            },
            resetAddClick() {
                //弹出框取消增加的属性 清空已选数据集合
                this.addColumnRef = []
                this.dialog = false
            },
            addClick() {
                this.addColumnPageCode = this.prodInfo[this.activeName].text
                //获取所有参数定义的json文件（columnInfo.json）增加到待选数据集合
                for(let i in columnInfo){
                    this.addColumnsRef.push(i+'--'+columnInfo[i].columnDesc)
                }
            },
            getMaxSeqNo(val,pageCode,key) {
                //获取界面元素数组
                let SeqNoArr = []
                let keys = key
                for(let i in val.prodDefines){
                    if(keys === "pageSeqNo" && val.prodDefines[i].pageCode === pageCode && val.prodDefines[i][keys] !== null && val.prodDefines[i][keys] !== '') {
                        SeqNoArr.push(val.prodDefines[i][keys])
                    }else if(keys === "seqNo" && val.prodDefines[i].prodType === this.prodCode){
                        SeqNoArr.push(val.prodDefines[i][keys])
                    }
                }
                //获取seqNoArr数组最大数据
                let maxSeqNo = SeqNoArr[0]
                for(let j=1; j<SeqNoArr.length; j++){
                    if(maxSeqNo < SeqNoArr[j]){
                        maxSeqNo = SeqNoArr[j]
                    }
                }
                return maxSeqNo
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
    .addClass {
        color: white;
        margin-left: 20%;
        font-size: large;
    }
    /*  .prodList {
                  border-top-style: solid;border-top-width: 1px;border-color: rgba(40, 24, 31, 0.21);
                }
                .prodLists {
                  border-bottom-style: solid;border-bottom-width: 3px;border-color: rgba(183, 172, 177, 0.6);
                }*/
</style>