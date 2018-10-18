<template>
  <div>
    <v-layout row wrap>
    <v-flex xs12 md4 lg4>
      <v-card>
        <v-toolbar color="white">
          <v-icon large color="blue darken-2">info</v-icon>
          <v-toolbar-title>产品基本信息{{info}}</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-layout wrap>
            <v-flex xs12 md2 lg4>
              <v-subheader class="primary--text subheading">组合产品*</v-subheader>
            </v-flex>
            <v-flex md4 lg4>
              <dc-text-field v-model="prodGroup" item-text="value" item-value="key"></dc-text-field>
            </v-flex>
          </v-layout>

          <v-layout wrap>
          <v-flex xs12 md2 lg4>
            <v-subheader class="primary--text subheading">产品分类*</v-subheader>
          </v-flex>
          <v-flex md4 lg4>
            <dc-text-field v-model="prodClass"></dc-text-field>
          </v-flex>
          </v-layout>

          <v-layout wrap>
          <v-flex xs12 md2 lg4>
            <v-subheader class="primary--text subheading">产品描述*</v-subheader>
          </v-flex>
          <v-flex md4 lg4>
            <dc-text-field v-model="prodDesc"></dc-text-field>
          </v-flex>
          </v-layout>

          <v-layout wrap>
          <v-flex xs12 md2 lg4>
            <v-subheader class="primary--text subheading">产品状态*</v-subheader>
          </v-flex>
          <v-flex md4 lg4>
            <dc-text-field v-model="status"></dc-text-field>
          </v-flex>
          </v-layout>

          <v-layout wrap>
          <v-flex xs12 md2 lg4>
            <v-subheader class="primary--text subheading">基础产品*</v-subheader>
          </v-flex>
          <v-flex md4 lg4>
            <dc-text-field v-model="baseProdType"></dc-text-field>
          </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex xs12 md2 lg4>
              <v-subheader class="primary--text subheading">产品范围*</v-subheader>
            </v-flex>
            <v-flex md4 lg4>
              <dc-text-field v-model="prodRange"></dc-text-field>
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex xs12 md2 lg4>
              <v-subheader class="primary--text subheading">产品类型*</v-subheader>
            </v-flex>
            <v-flex md4 lg4>
              <dc-text-field v-model="prodType"></dc-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex md8 lg8>
      <v-card>
        <v-toolbar color="white" >
          <v-icon large color="blue darken-2">chat</v-icon>
          <v-toolbar-title>交易单号:{{code}}</v-toolbar-title>
          <v-spacer></v-spacer>
            <v-btn color="info" @click="print()">导出</v-btn>
            <v-btn color="info">{{optValue}}</v-btn>
        </v-toolbar>
        <tran-check-flow-info v-if="optKey==3"></tran-check-flow-info>
        <tran-release-flow-info v-if="optKey==4"></tran-release-flow-info>
      </v-card>
    </v-flex>
    </v-layout>


    <v-card md20 lg20>
      <v-card-text>
        <v-tabs fixed-tabs>
          <v-tab v-for="n in diffList"
                 :key="n"
          >
             {{n}}
          </v-tab>
          <v-tabs-items v-model="model">
            <v-tab-item
                    v-for="i in diffList"
                    :id="`tab-${i}`"
                    :key="i"
            >

              <prod-diff v-if="i=='产品属性'" :prodData="prodDefineData"></prod-diff>
              <prod-diff v-if="i=='开户定义'" :prodData="prodEventOpen"></prod-diff>
              <prod-diff v-if="i=='销户定义'" :prodData="prodEventClose"></prod-diff>
              <prod-diff v-if="i=='存入定义'" :prodData="prodEventCret"></prod-diff>
              <prod-diff v-if="i=='支取定义'" :prodData="prodEventDebt"></prod-diff>
              <prod-diff v-if="i=='利息信息'" :prodData="prodEventCycle"></prod-diff>
              <base-table v-if="i=='收费定义'" :prodCharge="prodCharge"></base-table>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card-text>
    </v-card>

  </div>
</template>
<script>
  import prodDiff from '@/views/prodFactory/prodDiff/prodDiff'
  import baseTable from '@/views/prodFactory/prodInfo/table/baseTable'
  import tranCheckFlowInfo from './tranCheckFlowInfo'
  import tranReleaseFlowInfo from './tranReleaseFlowInfo'
  import { getDiffList } from "@/api/url/prodInfo";
  import {getColumnDesc_} from '@/utils/columnDesc'
  import DcTextField from '@/components/widgets/DcTextField'
  import { getProdData } from "@/api/prod";
  export default {
        components: {
            prodDiff,
            baseTable,
            tranCheckFlowInfo,
            tranReleaseFlowInfo,
            getColumnDesc_,
            DcTextField
        },
      props: ["prodData"],
      data (){
          return {
              code: '',
              optKey: 0,
              optValue: '',
              prodData: {},
              prodCharge: {},
              prodDefineData: {},
              prodEventOpen: {},
              prodEventClose: {},
              prodEventCret: {},
              prodEventCycle: {},
              prodEventDebt: {},
              diffList: ["产品属性","开户定义","销户定义","存入定义","支取定义","利息信息","收费定义"],
              prodGroup: [{
                  key: 'Y',
                  value: 'Y-是'
              }],
              prodClass: [{
                  key: 'RB100',
                  value: 'RB100-A'
              }],
              prodRange: [{
                  key: '',
                  value: ''
              }],
              status: [{
                  key: '',
                  value: ''
              }],
              baseProdType: [{
                  key: '',
                  value: ''
              }],
              prodType: [{
                  key: '',
                  value: ''
              }]
          }
      },

        created() {
            this.code = this.$route.params.code
            this.optValue = this.$route.params.optValue
            this.setOptKey(this.optValue)
            this.getDiffProdData();

        },
        methods: {
            setOptKey(val) {
                if(val === "复核") {
                    this.optKey = 3
                }
                if(val === "发布") {
                    this.optKey = 4
                }
            },
            print () {
                window.print()
            },
            getDiffProdData(){
                var data={'mainSeqNo': this.code};
                getDiffList(data).then(response => {
                    this.prodData=response.data.data;
                    this.assembleProdDefine();
                    this.assembleEvent();
                    //将收费定义的差异组装
                    this.assembleProdCharge();
                    this.prodGroup = this.prodData.MbProdType.prodGroup
                    this.prodClass = this.prodData.MbProdType.prodClass
                    this.prodDesc = this.prodData.MbProdType.prodDesc
                    this.prodType = this.prodData.MbProdType.prodGroup
                    this.status = this.prodData.MbProdType.status
                    this.baseProdType = this.prodData.MbProdType.baseProdType
                    this.prodRange = this.prodData.MbProdType.prodRange
                    this.prodType = this.prodData.MbProdType.prodType
                });
            },
            assembleProdDefine() {
                const prodDefine=this.prodData.prodDefine;
                const prodDefineDiff=this.prodData.diff.prodDefine;
                const prodType=this.prodData.prodType;
                const prodDefineData={"prodDefines": prodDefine,"diff": prodDefineDiff,"prodType": prodType};
                this.prodDefineData=prodDefineData;
            },
            assembleEvent(){
                const prodEvent=this.prodData.prodEvent;
                const prodEventDiff=this.prodData.diff.mbProdEvent;
                const prodType=this.prodData.prodType;
                //区分差异
                const openDiff={}
                const closeDiff={}
                const cycleDiff={}
                const debtDiff={}
                const cretDiff={}
                for(const diffKey in prodEventDiff){
                    const key=diffKey.substring(diffKey.indexOf('.')+1);
                    if(diffKey.indexOf('OPEN')>=0){
                        openDiff[key]=prodEventDiff[diffKey];
                    }
                    if(diffKey.indexOf('CLOSE')>=0){
                        closeDiff[key]=prodEventDiff[diffKey];
                    }
                    if(diffKey.indexOf('WTD')>=0){
                        cretDiff[key]=prodEventDiff[diffKey];
                    }
                    if(diffKey.indexOf('CYCLE')>=0){
                        cycleDiff[key]=prodEventDiff[diffKey];
                    }
                    if(diffKey.indexOf('DEP')>=0){
                        debtDiff[key]=prodEventDiff[diffKey];
                    }
                }
                 for(const key in prodEvent){
                     const openEvent={"prodDefines": prodEvent[key],"prodType": prodType}
                     if(key.indexOf('OPEN')>=0){
                         openEvent["diff"]=openDiff
                         this.prodEventOpen=openEvent;
                     }else
                     if(key.indexOf('CLOSE')>=0){
                         openEvent["diff"]=closeDiff
                        this.prodEventClose= openEvent
                     }else if(key.indexOf('WTD')>=0){
                         openEvent["diff"]=cretDiff
                         this.prodEventCret= openEvent
                     }else if(key.indexOf('CYCLE')>=0){
                         openEvent["diff"]=cycleDiff
                         this.prodEventCycle= openEvent
                     }else if(key.indexOf('DEP')>=0){
                         openEvent["diff"]=debtDiff
                         this.prodEventDebt= openEvent
                     }
                 }
                 if(JSON.stringify(prodEvent)=='{}'){
                     let diffEvent={"prodType": prodType}
                     diffEvent["diff"]=openDiff
                     this.prodEventOpen=diffEvent;
                     diffEvent["diff"]=closeDiff
                     this.prodEventClose= diffEvent;
                     diffEvent["diff"]=cycleDiff
                     this.prodEventCycle= diffEvent
                     diffEvent["diff"]=cretDiff
                     this.prodEventCret= diffEvent
                     diffEvent["diff"]=debtDiff
                     this.prodEventDebt= diffEvent
                 }
            },
            assembleProdCharge(){
                const prodInfo=this.prodData.mbProdCharge;
                const prodChargeDiff=this.prodData.diff.mbProdCharge;
                let assembleColumns=[];
                let heards=[];
                for(const key in prodInfo[0]){
                    let head={};
                    head["text"]=getColumnDesc_(key);
                    head["value"]=key;
                    heards.push(head);
                }
                for(const prodCharge in prodInfo){
                    const chargeColumn= prodInfo[prodCharge];
                   const keyAndValue="{\"FEE_TYPE\":\""+chargeColumn.feeType+"\",\"PROD_TYPE\":\""+
                       chargeColumn.prodType+"\"}";
                   const diff=prodChargeDiff[keyAndValue];
                  if(diff== undefined){
                     assembleColumns.push(chargeColumn)
                   }else{
                          for(const col in chargeColumn){
                              let chargeCol=chargeColumn[col];
                              let diffCol=diff[col];
                              if(chargeCol!=diffCol){
                                  chargeColumn[col]= chargeCol+'>'+diffCol
                              }
                          }
                          assembleColumns.push(chargeColumn)
                  }
                }
                if(heards.size==0){
                    for(const key in prodChargeDiff[0]){
                        let head={};
                        head["text"]=getColumnDesc_(key);
                        head["value"]=key;
                        heards.push(head);
                    }
                }
                for(const index in prodChargeDiff){
                    const prodCharge= prodChargeDiff[index];
                    const dmlType=prodCharge.dmlType;
                    let diffData={}
                    if(dmlType == 'I'){
                        const keyAndValue=index;
                        for(const num in heards){
                            const value=heards[num].value
                            diffData[value]=prodCharge[value];
                        }

                        assembleColumns.push(diffData)
                    }
                }
                const reColumn = {"headers": heards,"column": assembleColumns}
                this.prodCharge= reColumn;
            },

//            ,
//            addCompare () {
//
//            }
        }
    }
</script>
<style scoped>

</style>