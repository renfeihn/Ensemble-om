<template>
    <v-layout class="pt-2">
        <v-flex md2 lg2>
            <v-card class="elevation-2">
                <v-card-media src="/static/bg/18.jpg" height="80px">
                    <v-card-title class="pb-0">
                            <h4 class="title" style="font-size: x-large">{{title}}</h4>
                        <h4 class="title" style="font-size: x-large">{{titleSum}}</h4>

                    </v-card-title>
                </v-card-media>
            </v-card>
            <v-expansion-panel style="color: #0d47a1" class="elevation-2 pt-2">
                <v-expansion-panel-content v-for="(item, i) in 1" :key="i">
                    <div slot="header" style="color: #0d47a1;font-size: large;margin-left: auto;margin-right: 0px">
                        <v-icon style="margin-left: -10px;color: #0d47a1;margin-right: 10px;margin-top: 2px">list</v-icon>
                        {{checkedType}}
                    </div>
                    <v-card>
                        <v-card-text class="grey lighten-3">
                            <v-list-tile class="chat-list prodList" style="height: 40px" avatar v-for="(item) in files" :key="item.title" @click="handleClick(item)">
                                <v-list-tile-avatar>
                                    <v-icon :class="subheading" style="color: #00b0ff">{{ 'call_to_action'}}</v-icon>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-sub-title class="subheading" style="color: black">{{ item.lable }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-item-group v-model="window" class="shrink mr-4" mandatory tag="v-flex" style="margin-top: -5%">
                <v-item v-for="n in checkedClass" :key="n.key">
                    <div slot-scope="{ active, toggle }" @click="chipClick(n)">
                        <v-chip color="blue" text-color="white" @click="toggle" style="width: 100%;height: 40px;font-size: medium;">
                            <v-avatar>
                                <v-icon>label</v-icon>
                            </v-avatar>
                            {{n.lable}}
                        </v-chip>
                    </div>
                </v-item>
            </v-item-group>
        </v-flex>
        <v-flex md10 lg10 class="pl-4">
            <v-window v-model="window" class="elevation-2" vertical>
                <v-window-item v-for="n in length" :key="n">
                    <v-card flat>
                        <v-card-text>
                            <prod-list-cmb :items="prodListDtl"></prod-list-cmb>
                        </v-card-text>
                    </v-card>
                </v-window-item>
            </v-window>
        </v-flex>
    </v-layout>
</template>

<script>
    import prodListCmb from '../tableFlow/prodListCmb';
    import { getAllProdList } from '@/api/url/prodInfo';
    import { getAllDefines } from '@/api/url/prodInfo';
    import { getProdClassList } from '@/api/url/prodInfo';

    import {
        getProdType
    } from '@/api/url/prodInfo'
    export default {
        components: {
            prodListCmb,
        },
        data: () => ({
            length: 5,
            titleSum: "",
            title: "",
            checkedType: "请选择分类",
            checkedTypeKey: "",
            checkedClass: [],
            window: 0,
            panel: [false, true, true],
            items: [],
            prodListDtl: [],
            files: [
                {
                    icon: 'assignment',
                    iconClass: 'blue white--text',
                    value: 'SOURCE_MODULE',
                    lable: '业务模块分类'
                },

                {
                    icon: 'assignment',
                    iconClass: 'blue white--text',
                    value: 'prodRange',
                    lable: '产品属性分类'
                },
                {
                    icon: 'assignment',
                    iconClass: 'blue white--text',
                    value: 'status',
                    lable: '产品状态分类'
                },
                {
                    icon: 'assignment',
                    iconClass: 'blue white--text',
                    value: 'baseProdType',
                    lable: '基础产品分类'
                }
            ],
            prodTypeList: {},
            prodClassList: {},
            prodDefinesList: {},
            prodTemp: []
        }),
        created() {
            //查询所有产品信息
            this.getAllProdInfo()
        },
        methods: {
            //获取所有prod_type prod_define prod_class产品信息
            getAllProdInfo(){
                //获取所有prodType
                getAllProdList().then(response => {
                    this.prodTypeList = response.data.data
                    this.prodListDtl = response.data.data
                    this.title = "产品总数"
                    this.titleSum = response.data.data.length
                });
                //获取所有prodDefines
                getAllDefines().then(response => {
                    this.prodDefinesList = response.data.data
                });
                //获取所有prodClass
                getProdClassList().then(response => {
                    this.prodClassList = response.data.data
                });
            },
            chipClick(val) {
                this.title = val.lable
                this.prodListDtl = []
                this.prodTemp = []
                let key = this.checkedTypeKey
                //加载产品列表
                if(key === "baseProdType" || key === "prodRange" || key === "status"){
                    for(let l=0; l<this.prodTypeList.length; l++){
                        if(this.prodTypeList[l][key] === val.value){
                            this.prodTemp.push(this.prodTypeList[l])
                        }
                    }
                }
                if(key === "SOURCE_MODULE"){
                    for(let m=0; m <this.prodDefinesList.length; m++){
                        if(this.prodDefinesList[m].assembleId === "SOURCE_MODULE" && this.prodDefinesList[m].attrValue === val.value){
                            for(let n=0; n<this.prodTypeList.length; n++){
                                if(this.prodTypeList[n].prodType === this.prodDefinesList[m].prodType){
                                    this.prodTemp.push(this.prodTypeList[n])
                                }
                            }
                        }
                    }
                }
                this.titleSum = this.prodTemp.length+""
                this.prodListDtl = this.prodTemp

            },
            handleClick(val){
                this.checkedType = val.lable
                this.checkedTypeKey = val.value
                this.checkedClass = []
                if(val.value === "SOURCE_MODULE"){
                    //从prodClass中获取所有一级目录
                    for(let i=0; i<this.prodClassList.length; i++){
                        if(this.prodClassList[i].prodClassLevel === "1") {
                            let obj = {}
                            obj["key"] = i
                            obj["value"] = this.prodClassList[i].prodClass
                            obj["lable"] = this.prodClassList[i].prodClassDesc
                            this.checkedClass.push(obj)
                        }
                    }
                }
                if(val.value === "baseProdType"){
                    let key = val.value
                    for(let k=0; k<this.prodTypeList.length; k++){
                        if(this.prodTypeList[k].prodRange === "B" && !this.findIn(this.checkedClass,this.prodTypeList[k][key])){
                            let objBaseType = {}
                            objBaseType["key"] = k
                            objBaseType["value"] = this.prodTypeList[k].prodType
                            objBaseType["lable"] = this.prodTypeList[k].prodDesc
                            this.checkedClass.push(objBaseType)
                        }
                    }
                }
                if(val.value === "prodRange" || val.value === "status"){
                    let key = val.value
                    for(let j=0; j<this.prodTypeList.length; j++){
                        if(!this.findIn(this.checkedClass,this.prodTypeList[j][key])) {
                            let objType = {}
                            objType["key"] = j
                            objType["value"] = this.prodTypeList[j][key]
                            if (this.prodTypeList[j][key] === "B") {
                                objType["lable"] = "基础产品"
                            }
                            if (this.prodTypeList[j][key] === "S") {
                                objType["lable"] = "可售产品"
                            }
                            if (this.prodTypeList[j][key] === "A") {
                                objType["lable"] = "有效产品"
                            }
                            if (this.prodTypeList[j][key] === "C") {
                                objType["lable"] = "封存产品"
                            }
                            this.checkedClass.push(objType)
                        }
                    }
                }
            },
            //判断已存在
            findIn(val,key) {
                for(let m=0; m<val.length; m++){
                    if(key === val[m].value){
                        return true
                    }
                }
                return false
            }
        }
    }
</script>
<style scoped>
    .prodList {
        color: #00b0ff;
        margin-left: -10px;
    }
    .title {
        color: white;margin-left: auto;margin-right: auto;margin-top: 10px;margin-bottom: auto
    }
</style>