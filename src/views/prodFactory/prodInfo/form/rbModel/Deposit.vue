<template>
  <v-container fluid pr-5 pt-0>
    <v-layout row wrap>
      <v-flex xs12 md12 lg12>
        <div slot="widget-content">
          <v-container fluid pt-1>
            <v-layout row wrap>
             <v-flex xs12 md2 lg2>
                                    <v-subheader class="primary--text subheading">存入控制方式*</v-subheader>
                           </v-flex>
                           <v-flex md4 lg4>
                                    <v-select class="primary--text mx-2" :items="depositControlApproach" v-model="deposit.depositControlApproach" label="存入控制方式" item-text="value" item-value="key" single-line hide-details></v-select>
                           </v-flex>
                           <v-flex xs12 md2 lg2>
                                    <v-subheader class="primary--text subheading">是否允许代办*</v-subheader>
                           </v-flex>
                           <v-flex md4 lg4>
                                    <v-select class="primary--text mx-2" :items="permitCommersionFlag" v-model="deposit.permitCommersionFlag" label="是否允许代办" item-text="value" item-value="key" single-line hide-details></v-select>
                           </v-flex>
                            <v-flex xs12 md2 lg2>
                                    <v-subheader class="primary--text subheading">资金来源方式*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                     <v-select class="primary--text mx-2" :items="cashResource" v-model="deposit.cashResource" label="资金来源方式" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                             <v-flex xs12 md2 lg2>
                                      <v-subheader class="primary--text subheading">账户限制检查*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                      <v-select class="primary--text mx-2" :items="acctReatraintCheck" v-model="deposit.acctReatraintCheck" label="账户限制检查" item-text="value" item-value="key" single-line hide-details></v-select>
                             </v-flex>
                              <v-flex xs12 md2 lg2>
                                       <v-subheader class="primary--text subheading">存入违约类型*</v-subheader>
                             </v-flex>
                             <v-flex md4 lg4>
                                       <v-select class="primary--text mx-2" :items="weiYueType" v-model="deposit.weiYueType" label="存入违约类型" item-text="value" item-value="key" single-line hide-details></v-select>
                             </v-flex>
                              <v-flex xs12 md2 lg2>
                                      <v-subheader class="primary--text subheading">违约处理方式*</v-subheader>
                              </v-flex>
                              <v-flex md4 lg4>
                                      <v-select class="primary--text mx-2" :items="dealingWay" v-model="deposit.dealingWay" label="违约处理方式" item-text="value" item-value="key" single-line hide-details></v-select>
                              </v-flex>
                               <v-flex xs12 md2 lg2>
                                     <v-subheader class="primary--text subheading">起存金额检查*</v-subheader>
                               </v-flex>
                               <v-flex md4 lg4>
                                     <v-select class="primary--text mx-2" :items="startAmtCheck" v-model="deposit.startAmtCheck" label="起存金额检查" item-text="value" item-value="key" single-line hide-details></v-select>
                               </v-flex>
                               <v-flex xs12 md2 lg2>
                                            <v-subheader class="primary--text subheading">最小起存金额*</v-subheader>
                               </v-flex>
                               <v-flex md4 lg4>
                                             <v-text-field class="primary--text mx-1" label="最小起存金额" name="zuiXiaoQiCun" v-model="zuiXiaoQiCun" single-line hide-details></v-text-field>
                               </v-flex>
                                <v-flex xs12 md2 lg2>
                                        <v-subheader class="primary--text subheading">最大起存金额*</v-subheader>
                                </v-flex>
                                <v-flex md4 lg4>
                                        <v-text-field class="primary--text mx-1" label="最大起存金额" name="zuiDaQiCun" v-model="zuiDaQiCun" single-line hide-details></v-text-field>
                                </v-flex>
                                <v-flex xs12 md2 lg2>
                                                      <v-subheader class="primary--text subheading">单次存入金额检查*</v-subheader>
                                </v-flex>
                                <v-flex md4 lg4>
                                                 <v-select class="primary--text mx-2" :items="danciDepositCheck" v-model="deposit.danciDepositCheck" label="单次存入金额检查" item-text="value" item-value="key" single-line hide-details></v-select>
                                </v-flex>
                                <v-flex xs12 md2 lg2>
                                           <v-subheader class="primary--text subheading">最小存入余额*</v-subheader>
                                </v-flex>
                                <v-flex md4 lg4>
                                                 <v-text-field class="primary--text mx-1" label="最小存入金额" name="zuiXiaoCunRu" v-model="zuiXiaoCunRu" single-line hide-details></v-text-field>
                                </v-flex>
                                <v-flex xs12 md2 lg2>
                                             <v-subheader class="primary--text subheading">最大存入余额*</v-subheader>
                                </v-flex>
                                <v-flex md4 lg4>
                                         <v-text-field class="primary--text mx-1" label="最大存入金额" name="zuiDaCunRu" v-model="zuiDaCunRu" single-line hide-details></v-text-field>
                                </v-flex>

            </v-layout>
          </v-container>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getInitData } from "@/api/prod";
import { getProdData } from "@/api/prod";
export default {
      props: ["prodData"],
      data: () => ({
        title: null,
       depositControlApproach: [
                   {
                       key: "",
                       value: ""
                   }
               ],
           permitCommersionFlag: [
                   {
                       key: "",
                       value: ""
                   }
               ],
            cashResource: [
                    {
                        key: "",
                        value: ""
                    }
                ],
            acctReatraintCheck: [
                    {
                        key: "",
                        value: ""
                    }
                ],
              weiYueType: [
                         {
                             key: "",
                             value: ""
                         }
                     ],
              dealingWay: [
                         {
                             key: "",
                             value: ""
                         }
                     ],
              startAmtCheck: [
                         {
                              key: "",
                              value: ""
                         }
                     ],
              danciDepositCheck: [
                          {
                                key: "N",
                                value: "N-否"
                          }
                                     ],
           deposit: {
                       depositControlApproach: '',
                       permitCommersionFlag: '',
                       cashResource: '',
                       acctReatraintCheck: '',
                       weiYueType: '',
                       dealingWay: '',
                       startAmtCheck: '',
                       danciDepositCheck: ''
                   },
      }),
      computed: {
        progress() {
          return Math.min(100, this.value.length * 10);
        }
      },
      watch: {
        prodData(val) {
          this.selectByProd(val)
        }
       },
      mounted() {
        this.initRefDate();
      },
      methods: {
        selectByProd(val) {
          this.eventForm = {}
      this.deposit.depositControlApproach = val.deposit.depositControlApproach
      this.deposit.permitCommersionFlag = val.deposit.permitCommersionFlag
      this.deposit.cashResource = val.deposit.cashResource
      this.deposit.acctReatraintCheck = val.deposit.acctReatraintCheck
      this.deposit.weiYueType = val.deposit.weiYueType
      this.deposit.dealingWay = val.deposit.dealingWay
      this.deposit.startAmtCheck = val.deposit.startAmtCheck
      this.deposit.danciDepositCheck = val.deposit.danciDepositCheck
        },
        initRefDate() {
            getInitData().then(response => {
                console.log(response);
        this.depositControlApproach = response.data.paraDataRb.depositControlApproach;
        this.permitCommersionFlag = response.data.paraDataRb.permitCommersionFlag;
        this.cashResource = response.data.paraDataRb.cashResource;
        this.acctReatraintCheck = response.data.paraDataRb.acctReatraintCheck;
        this.weiYueType = response.data.paraDataRb.weiYueType;
        this.dealingWay = response.data.paraDataRb.dealingWay;
        this.startAmtCheck = response.data.paraDataRb.startAmtCheck;
        this.danciDepositCheck = response.data.paraDataRb.danciDepositCheck;
            });
        }
    }
  }
</script>
