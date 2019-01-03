<template>
    <div class="vCard" v-show="show">
        <v-layout row wrap>
            <v-dialog v-model="RB" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card ref="print">
                        <v-toolbar dark color="primary">
                            <v-btn icon dark @click="closeDialog">
                                <v-icon>close</v-icon>
                            </v-btn>
                            <v-toolbar-title>修改差异展示</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card-text>
                            <v-tabs fixed-tabs>
                                <v-tab v-for="n in diffList" :key="n" class="diffTitle">{{n}}</v-tab>
                                <v-tabs-items v-model="model">
                                    <v-tab-item v-for="i in diffList" :key="i">
                                        <prod-diff v-if="i=='产品属性'" :prodData="prodDefineData"></prod-diff>
                                        <prod-diff v-if="i=='开户定义'" :prodData="prodEventOpen"></prod-diff>
                                        <prod-diff v-if="i=='销户定义'" :prodData="prodEventClose"></prod-diff>
                                        <prod-diff v-if="i=='存入定义'" :prodData="prodEventCret"></prod-diff>
                                        <prod-diff v-if="i=='支取定义'" :prodData="prodEventDebt"></prod-diff>
                                        <!--<prod-diff v-if="i=='利息信息'" :prodData="prodEventCycle"></prod-diff>-->
                                        <base-table v-if="i=='收费定义'" :prodCharge="prodCharge"></base-table>
                                    </v-tab-item>
                                </v-tabs-items>
                            </v-tabs>
                            <!--</v-card-text>-->
                            <!--<v-card-text >-->
                        </v-card-text>
                    </v-card>
            </v-dialog>
            <v-dialog v-model="CL" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card md20 lg20 ref="print">
                    <v-toolbar dark color="primary">
                        <v-btn icon dark @click="closeDialog">
                            <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title>修改差异展示</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <!--</v-card-text>-->
                        <!--<v-card-text >-->
                        <v-tabs fixed-tabs>
                            <v-tab v-for="m in diffList2" :key="m" class="diffTitle">{{m}}</v-tab>
                            <v-tabs-items v-model="model">
                                <v-tab-item v-for="j in diffList2" :key="j">
                                    <prod-diff v-if="j=='产品属性'" :prodData="prodDefineData"></prod-diff>
                                    <!--<prod-diff v-if="j=='利息信息'" :prodData="prodEventCycle"></prod-diff>-->
                                    <prod-diff v-if="j=='开户定义'" :prodData="prodEventOpen"></prod-diff>
                                    <prod-diff v-if="j=='放款定义'" :prodData="prodEventDrw"></prod-diff>
                                    <prod-diff v-if="j=='还款定义'" :prodData="prodEventRec"></prod-diff>
                                    <prod-diff v-if="j=='到期信息'" :prodData="prodEventDue"></prod-diff>
                                    <base-table v-if="j=='核算信息'" :prodCharge="prodAccounting"></base-table>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-tabs>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-layout>
        <v-card flat tile>
            <div class="vToolbar">
                <v-toolbar flat dense color="primary lighten-2" dark class="pa-0">
                    <v-toolbar-title>操作列表</v-toolbar-title>
                </v-toolbar>
            </div>
            <div class="vList">
                <v-list three-line class="pa-0">
                    <template v-for="(item, index) in items">
                        <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
                        <v-divider v-else-if="item.divider" :key="index"></v-divider>
                        <v-list-tile avatar v-else :key="item.tranName" @click="handleClick" class="vlTile">
                            <div style="width: 20%;height: 60%;padding-left: 1%">
                                <img src="../../../static/prod/prod7.jpg" height=100% width=70%>
                            </div>
                            <div style="width: 60%">
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.tranId }}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{ item.tranName }}</v-list-tile-sub-title>
                                    <v-list-tile-sub-title>{{ item.recSeqNo }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </div>
                            <div style="width: 20%">
                                <div style="width: 40%;float: left">
                                    <v-icon style="font-size: 30px" class="material-icons" @click="different(item)">
                                        visibility
                                    </v-icon>
                                </div>
                                <div style="width: 40%;float: right">
                                    <v-icon style="font-size: 30px" class="material-icons" @click="deleteTask(item)">
                                        close
                                    </v-icon>
                                </div>
                            </div>
                        </v-list-tile>
                        <v-divider></v-divider>
                    </template>
                </v-list>
            </div>
            <div class="button">
                <div style="width: 10%;height: 100%;float: left"></div>
                <div class="clear">
                    <v-btn block color="primary lighten-2" dark @click="clean()">清空</v-btn>
                </div>
                <div style="width: 20%;height: 100%;float: left"></div>
                <div class="submit">
                    <v-btn block color="primary lighten-2" dark @click="submit()">提交</v-btn>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
    import prodDiff from '@/views/prodFactory/prodDiff/prodDiff'
    import baseTable from '@/views/prodFactory/prodInfo/table/baseTable'
    import {getCommonList} from "@/api/url/prodInfo";
    import {cleanList} from "@/api/url/prodInfo";
    import {deleteTask} from "@/api/url/prodInfo";
    import {submitCommon} from "@/api/url/prodInfo";
    import {getDiffList} from "@/api/url/prodInfo";
    import {getDiffTable} from "@/api/url/prodInfo";
    import {PrintInfo} from '@/utils/print/print'
    import {getColumnDesc_} from '@/utils/columnDesc'
    import {getColumnDesc} from '@/utils/columnDesc'
    import { getModuleByFlowCode } from "@/api/url/prodInfo";
    import DcTextField from '@/components/widgets/DcTextField'
    import TaskListFlex from '@/views/propertyManage/taskListFlex'
    import TaskListMenu from '@/views/propertyManage/taskListMenu'
    import {getProdData} from "@/api/prod";
    import download2 from '@/utils/download2';
    import toast from '@/utils/toast';
    import {
        tranFlowInfo
    } from '@/api/url/prodInfo';
    import {
        tranFlowRelease
    } from '@/api/url/prodInfo';

    export default {
        components: {
            prodDiff,
            baseTable,
            TaskListFlex,
            TaskListMenu,
        },
        props: {
            taskMenu: Boolean
        },
        data: () => ({
            RB: false,
            CL: false,
            show: '',
            items: [
                {
                    tranName: '',
                    color: '',
                    icon: '',
                    timeLabel: ''
                }
            ],
            sourceModule: [],
            seqNo: '',
            dialog: false,
            code: '',
            prodData: {},
            prodCharge: {},
            prodDefineData: {},
            prodEventOpen: {},
            prodEventClose: {},
            prodEventCret: {},
            prodEventCycle: {},
            prodEventDebt: {},
            prodEventDrw: {},
            prodEventRec: {},
            prodEventDur: {},
            prodAccounting: {},
            diffList: ["产品属性", "开户定义", "销户定义", "存入定义", "支取定义", "收费定义"],
            diffList2: ["产品属性", "开户定义", "放款定义", "还款定义", "到期信息", "核算信息"],
        }),
        watch: {
            taskMenu: {
                handler() {
                    this.getTaskList()
                }
            }
        },
        created() {
            let that = this;
            window.addEventListener("taskList", function () {
                that.getTaskList();
            })
        },
        mounted: function () {
            this.getTaskList()
        },
        methods: {
            handleClick: (e) => {
                console.log(e);
            },
            closeDialog() {
                this.RB = false
                this.CL = false
                this.prodData = {}
                //parent.location.reload();
            },
            different(item) {
                this.code = item.mainSeqNo
                if (item.tranType == '0') {
                    this.getDiffProdData(item.tranId);
                } else {
                    this.getDiffTableData(item.tranId);
                }
            },
            getDiffTableData() {
                //通过交易主单号 获取单表差异信息
                var data = {'mainSeqNo': this.code};
                getDiffTable(data).then(response => {
                    console.log(response);
                    this.diffTitles = response.data.data.mainFlow.tranId + "-" + response.data.data.mainFlow.tranDesc
                    let tableDiffInfo = response.data.data.tableInfo
                    //获取单表列描述
                    let heards = [];
                    let assembleColumns = [];
                    if (tableDiffInfo[0] !== undefined) {
                        let column = {}
                        if (tableDiffInfo[0].dmlType == 'I') {
                            column = tableDiffInfo[0].newData
                        } else {
                            column = tableDiffInfo[0].oldData
                        }
                        for (const keys in column) {
                            let head = {};
                            head["text"] = getColumnDesc(keys);
                            head["value"] = keys;
                            heards.push(head);
                        }
                        //区分数据操作类型
                        let opt = {};
                        opt["text"] = "操作类型";
                        opt["value"] = tableDiffInfo[0].dmlType
                        heards.push(opt);
                    }
                    //组装差异数据
                    for (let i in tableDiffInfo) {
                        //新增参数
                        let optTypeDesc = ""
                        if (tableDiffInfo[i].dmlType === "I") {
                            optTypeDesc = "新增"
                        }
                        if (tableDiffInfo[i].dmlType === "D") {
                            optTypeDesc = "删除"
                        }
                        if (tableDiffInfo[i].dmlType === "U") {
                            optTypeDesc = "修改"
                        }
                        if (tableDiffInfo[i].dmlType == 'I') {
                            tableDiffInfo[i].newData["dmlType"] = optTypeDesc
                            assembleColumns.push(tableDiffInfo[i].newData)
                        } else if (tableDiffInfo[i].dmlType == 'D') {
                            //删除数据
                            tableDiffInfo[i].oldData["dmlType"] = optTypeDesc
                            assembleColumns.push(tableDiffInfo[i].oldData)
                        } else if (tableDiffInfo[i].dmlType == 'U') {
                            //修改数据
                            for (let col in tableDiffInfo[i].newData) {
                                let newCol = tableDiffInfo[i].newData[col]
                                let oldCol = tableDiffInfo[i].oldData[col]
                                if (newCol !== oldCol) {
                                    tableDiffInfo[i].newData[col] = oldCol + ">" + newCol
                                }
                            }
                            tableDiffInfo[i].newData["dmlType"] = optTypeDesc
                            assembleColumns.push(tableDiffInfo[i].newData)
                        }
                    }

                    const column = {
                        "headers": heards,
                        "column": assembleColumns
                    }
                    this.prodCharge = column;
                });
            },
            getDiffProdData(tranId) {
                //通过交易主单号 获取产品差异信息
                let data = {
                    'mainSeqNo': this.code,
                    'tranId': tranId
                };
                getModuleByFlowCode(this.code).then(response => {
                    this.sourceModule = response.data.data.SOURCE_MODULE
                    getDiffList(data).then(response => {
                        this.prodData = response.data.data;
                        if (this.sourceModule == "RB") {
                            this.RB = true
                            this.CL = false
                            this.assembleProdDefine();
                            this.assembleEvent();
                            //将收费定义的差异组装
                            this.assembleProdCharge();
                        }
                        if (this.sourceModule == "CL") {
                            this.CL = true
                            this.RB = false
                            this.assembleProdDefine();
                            this.assembleCLEvent();
                            //将收费定义的差异组装
                            this.assembleAccounting();
                        }
                        this.prodGroup = this.prodData.mbProdType.prodGroup
                        this.prodClass = this.prodData.mbProdType.prodClass
                        this.prodDesc = this.prodData.mbProdType.prodDesc
                        this.prodType = this.prodData.mbProdType.prodGroup
                        this.status = this.prodData.mbProdType.status
                        this.baseProdType = this.prodData.mbProdType.baseProdType
                        this.prodRange = this.prodData.mbProdType.prodRange
                        this.prodType = this.prodData.mbProdType.prodType
                    });
                });
            },
            assembleProdDefine() {
                const prodDefine = this.prodData.prodDefine;
                const prodDefineDiff = this.prodData.diff.prodDefine;
                const prodType = this.prodData.prodType;
                const baseEffectProd = this.prodData.baseEffectProd;
                const prodDefineData = {
                    "prodDefines": prodDefine,
                    "diff": prodDefineDiff,
                    "prodType": prodType,
                    "baseEffectProd": baseEffectProd
                };
                this.prodDefineData = prodDefineData;
            },
            assembleEvent() {
                const prodEvent = this.prodData.prodEvent;
                const prodEventDiff = this.prodData.diff.mbProdEvent;
                const prodType = this.prodData.prodType;
                const baseEffectProd = this.prodData.baseEffectProd;
                //区分差异
                const openDiff = {}
                const closeDiff = {}
                const cycleDiff = {}
                const debtDiff = {}
                const cretDiff = {}
                for (const diffKey in prodEventDiff) {
                    const key = diffKey.substring(diffKey.indexOf('.') + 1);
                    if (diffKey.indexOf('OPEN') >= 0) {
                        openDiff[key] = prodEventDiff[diffKey];
                    }
                    if (diffKey.indexOf('CLOSE') >= 0) {
                        closeDiff[key] = prodEventDiff[diffKey];
                    }
                    if (diffKey.indexOf('CRET') >= 0) {
                        cretDiff[key] = prodEventDiff[diffKey];
                    }
//                    if(diffKey.indexOf('CYCLE')>=0){
//                        cycleDiff[key]=prodEventDiff[diffKey];
//                    }
                    if (diffKey.indexOf('DEBT') >= 0) {
                        debtDiff[key] = prodEventDiff[diffKey];
                    }
                }
                for (const keyD in prodEvent) {
                    const openEvent = {
                        "prodDefines": prodEvent[keyD],
                        "prodType": prodType
                    }
                    if (keyD.indexOf('OPEN') >= 0) {
                        openEvent["diff"] = openDiff
                        openEvent["baseEffectProd"] = baseEffectProd
                        this.prodEventOpen = openEvent;
                    } else if (keyD.indexOf('CLOSE') >= 0) {
                        openEvent["diff"] = closeDiff
                        openEvent["baseEffectProd"] = baseEffectProd
                        this.prodEventClose = openEvent
                    } else if (keyD.indexOf('CRET') >= 0) {
                        openEvent["diff"] = cretDiff
                        openEvent["baseEffectProd"] = baseEffectProd
                        this.prodEventCret = openEvent
                    }
//                    else if(keyD.indexOf('CYCLE')>=0){
//                        openEvent["diff"]=cycleDiff
//                        openEvent["baseEffectProd"]=baseEffectProd
//                        this.prodEventCycle= openEvent
//                    }
                    else if (keyD.indexOf('DEBT') >= 0) {
                        openEvent["diff"] = debtDiff
                        openEvent["baseEffectProd"] = baseEffectProd
                        this.prodEventDebt = openEvent
                    }
                }
                if (JSON.stringify(prodEvent) == '{}' || JSON.stringify(prodEvent) == undefined) {
                    let diffEvent = {"prodType": prodType}
                    let diffEventClose = {"prodType": prodType}
//                    let diffEventCycle={"prodType": prodType}
                    let diffEventCret = {"prodType": prodType}
                    let diffEventDebt = {"prodType": prodType}
                    diffEvent["diff"] = openDiff
                    this.prodEventOpen = diffEvent;
                    diffEventClose["diff"] = closeDiff
                    this.prodEventClose = diffEventClose;
//                    diffEventCycle["diff"]=cycleDiff
//                    this.prodEventCycle= diffEventCycle
                    diffEventCret["diff"] = cretDiff
                    this.prodEventCret = diffEventCret;
                    diffEventDebt["diff"] = debtDiff
                    this.prodEventDebt = diffEventDebt;
                }
            },
            assembleProdCharge() {
                const prodInfo = this.prodData.mbProdCharge;
                const prodChargeDiff = this.prodData.diff.mbProdCharge;
                let assembleColumns = [];
                let heards = [];
                for (const key in prodInfo[0]) {
                    let head = {};
                    head["text"] = getColumnDesc_(key);
                    head["value"] = key;
                    heards.push(head);
                }
                for (const prodCharge in prodInfo) {
                    const chargeColumn = prodInfo[prodCharge];
                    const keyAndValue = "{\"FEE_TYPE\":\"" + chargeColumn.feeType + "\",\"PROD_TYPE\":\"" +
                        chargeColumn.prodType + "\"}";
                    const diff = prodChargeDiff[keyAndValue];
                    if (diff == undefined) {
                        assembleColumns.push(chargeColumn)
                    } else {
                        for (const col in chargeColumn) {
                            let chargeCol = chargeColumn[col];
                            let diffCol = diff[col];
                            if (chargeCol != diffCol) {
                                chargeColumn[col] = chargeCol + '>' + diffCol
                            }
                        }
                        assembleColumns.push(chargeColumn)
                    }
                }
                if (heards.size == 0) {
                    for (const key in prodChargeDiff[0]) {
                        let head = {};
                        head["text"] = getColumnDesc_(key);
                        head["value"] = key;
                        heards.push(head);
                    }
                }
                for (const index in prodChargeDiff) {
                    const prodCharge = prodChargeDiff[index];
                    const dmlType = prodCharge.dmlType;
                    let diffData = {}
                    if (dmlType == 'I') {
                        const keyAndValue = index;
                        for (const num in heards) {
                            const value = heards[num].value
                            diffData[value] = prodCharge[value];
                        }
                        assembleColumns.push(diffData)
                    }
                }
                const reColumn = {
                    "headers": heards,
                    "column": assembleColumns
                }
                this.prodCharge = reColumn;
            },

            assembleCLEvent() {
                const prodEvent = this.prodData.prodEvent;
                const prodEventDiff = this.prodData.diff.mbProdEvent;
                const prodType = this.prodData.prodType;
                const baseEffectProd = this.prodData.baseEffectProd;
                //区分差异
                const cycleDiff = {}
                const openDiff = {}
                const drwDiff = {}
                const recDiff = {}
                const dueDiff = {}
                for (const diffKey in prodEventDiff) {
                    const key = diffKey.substring(diffKey.indexOf('.') + 1);
//                    if(diffKey.indexOf('CYCLE')>=0){
//                        cycleDiff[key]=prodEventDiff[diffKey];
//                    }
                    if (diffKey.indexOf('OPEN') >= 0) {
                        openDiff[key] = prodEventDiff[diffKey];
                    }
                    if (diffKey.indexOf('DRW') >= 0) {
                        drwDiff[key] = prodEventDiff[diffKey];
                    }
                    if (diffKey.indexOf('REC') >= 0) {
                        recDiff[key] = prodEventDiff[diffKey];
                    }
                    if (diffKey.indexOf('DUE') >= 0) {
                        dueDiff[key] = prodEventDiff[diffKey];
                    }
                }
                for (const key in prodEvent) {
                    const openEvent = {
                        "prodDefines": prodEvent[key],
                        "prodType": prodType
                    }
                    if (key.indexOf('OPEN') >= 0) {
                        openEvent["diff"] = openDiff
                        openEvent["baseEffectProd"] = baseEffectProd
                        this.prodEventOpen = openEvent;
                    }
//                    else if(key.indexOf('CYCLE')>=0){
//                        openEvent["diff"]=cycleDiff
//                        openEvent["baseEffectProd"]=baseEffectProd
//                        this.prodEventCycle= openEvent
//                    }
                    else if (key.indexOf('DRW') >= 0) {
                        openEvent["diff"] = drwDiff
                        openEvent["baseEffectProd"] = baseEffectProd
                        this.prodEventDrw = openEvent
                    } else if (key.indexOf('REC') >= 0) {
                        openEvent["diff"] = recDiff
                        openEvent["baseEffectProd"] = baseEffectProd
                        this.prodEventRec = openEvent
                    } else if (key.indexOf('DUE') >= 0) {
                        openEvent["diff"] = dueDiff
                        openEvent["baseEffectProd"] = baseEffectProd
                        this.prodEventDue = openEvent
                    }
                }
                if (JSON.stringify(prodEvent) == '{}' || JSON.stringify(prodEvent) == undefined) {
                    let diffEvent = {"prodType": prodType}
//                    let diffEventCycle={"prodType": prodType}
                    let diffEventDrw = {"prodType": prodType}
                    let diffEventRec = {"prodType": prodType}
                    let diffEventDue = {"prodType": prodType}
                    diffEvent["diff"] = openDiff
                    this.prodEventOpen = diffEvent;
//                    diffEventCycle["diff"]=cycleDiff
//                    this.prodEventCycle= diffEventCycle;
                    diffEventDrw["diff"] = drwDiff
                    this.prodEventDrw = diffEventDrw
                    diffEventRec["diff"] = recDiff
                    this.prodEventRec = diffEventRec
                    diffEventDue["diff"] = dueDiff
                    this.prodEventDue = diffEventDue
                }
            },
            assembleAccounting() {
                const prodInfo = this.prodData.mbProdCharge;
                const prodChargeDiff = this.prodData.diff.mbProdCharge;
                let assembleColumns = [];
                let heards = [];
                for (const key in prodInfo[0]) {
                    let head = {};
                    head["text"] = getColumnDesc_(key);
                    head["value"] = key;
                    heards.push(head);
                }
                for (const prodCharge in prodInfo) {
                    const chargeColumn = prodInfo[prodCharge];
                    const keyAndValue = "{\"FEE_TYPE\":\"" + chargeColumn.feeType + "\",\"PROD_TYPE\":\"" +
                        chargeColumn.prodType + "\"}";
                    const diff = prodChargeDiff[keyAndValue];
                    if (diff == undefined) {
                        assembleColumns.push(chargeColumn)
                    } else {
                        for (const col in chargeColumn) {
                            let chargeCol = chargeColumn[col];
                            let diffCol = diff[col];
                            if (chargeCol != diffCol) {
                                chargeColumn[col] = chargeCol + '>' + diffCol
                            }
                        }
                        assembleColumns.push(chargeColumn)
                    }
                }
                if (heards.size == 0) {
                    for (const key in prodChargeDiff[0]) {
                        let head = {};
                        head["text"] = getColumnDesc_(key);
                        head["value"] = key;
                        heards.push(head);
                    }
                }
                for (const index in prodChargeDiff) {
                    const prodCharge = prodChargeDiff[index];
                    const dmlType = prodCharge.dmlType;
                    let diffData = {}
                    if (dmlType == 'I') {
                        const keyAndValue = index;
                        for (const num in heards) {
                            const value = heards[num].value
                            diffData[value] = prodCharge[value];
                        }
                        assembleColumns.push(diffData)
                    }
                }
                const reColumn = {
                    "headers": heards,
                    "column": assembleColumns
                }
                this.prodCharge = reColumn;
            },

            submit() {
                let that = this
                that.show = false
                submitCommon({"userId": sessionStorage.getItem("userId")}).then(response => {
                    that.items = []
                    this.$emit('getTaskList', '0')
                })
            },
            clean() {
                let that = this
                that.show = false
                cleanList({"seqNo": this.seqNo}).then(response => {
                    that.items = []
                    this.$emit('getTaskList', '0')
                })
            },
            deleteTask(item) {
                let that = this;
                that.show = false
                deleteTask({
                    "tranId": item.tranId,
                    "seqNo": this.seqNo
                }).then(response => {
                    if (that.items.length == 1) {
                        that.items = []
                    } else {
                        for (const [i, v] of that.items.entries()) {
                            if (v === item) {
                                that.items.splice(i, 1)
                            }
                        }
                    }
                    that.$emit('getTaskList', that.items.length)
                })
            },
            showSearchAction() {
                this.$router.push({name: "tranDataIndex"});
            },
            getTaskList() {
                getCommonList({"userId": sessionStorage.getItem("userId")}).then(response => {
                    this.items = response.data.data;
                    if (this.items[0] != null) {
                        this.seqNo = this.items[0].mainSeqNo
                    }

                    if (response.data.data != null && response.data.data != {}) {
                        this.$emit('getTaskList', response.data.data.length)
                    }
                    this.show = true
                    if (this.items.length == 0) {
                        this.show = false
                    }

                });
            }
        },

    };
</script>
<style lang="stylus" scoped>
    .vCard {
        background-color white
        margin auto
        width 100%
        height 100%
    }

    .vToolbar {
        height 10%
    }

    .vList {
        width 100%
        height 70%
    }

    .vlTile {
        width 100%
        margin 0
    }

    .button {
        background-color white
        width 100%
        height 48px
    }

    .clear {
        float left
        width 30%
        height 100%
    }

    .submit {
        float left
        width 30%
        height 100%
    }
</style>