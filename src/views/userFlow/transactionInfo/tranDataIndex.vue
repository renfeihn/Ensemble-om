<template>
  <div>
    <v-card >
      <v-toolbar color="white" >
        <v-icon large color="blue darken-2">chat</v-icon>
        <v-toolbar-title>交易单号:{{code}}</v-toolbar-title>
        <v-spacer></v-spacer>
          <v-btn color="info" @click="print()">导出</v-btn>
          <v-btn color="info">{{optValue}}</v-btn>
      </v-toolbar>
      <tran-check-flow-info v-if="optKey==3" ></tran-check-flow-info>
      <tran-release-flow-info v-if="optKey==4"></tran-release-flow-info>
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

              <prod-diff v-if="i=='产品属性'" :prodData="prodData"></prod-diff>
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
  export default {
        components: {
            prodDiff,
            baseTable,
            tranCheckFlowInfo,
            tranReleaseFlowInfo,
            getColumnDesc_
        },
      data (){
          return {
              code: '',
              optKey: 0,
              optValue: '',
              prodData: {},
              prodCharge: {},
              diffList: ["产品属性","收费定义"]
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
                    //将收费定义的差异组装
                    this.assembleProdCharge();
                });
            },
            assembleProdCharge(){
                const prodInfo=this.prodData.prodInfo.mbProdCharge;
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
                      const dmlType=diff.dmlType;
                      if(dmlType == 'I'){
                          assembleColumns.push(diff)
                      }else if(dmlType == 'U'){
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
                }
                const reColumn = {"headers": heards,"column": assembleColumns}
                this.prodCharge= reColumn;
            }
//            ,
//            addCompare () {
//
//            }
        }
    }
</script>
<style scoped>

</style>