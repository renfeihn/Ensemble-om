<template>
  <v-container fluid pr-5 pt-0>
    <v-layout row wrap>
      <v-flex xs12 md12 lg12>
        <div slot="widget-content">
          <v-container fluid pt-1>
            <v-layout row wrap>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">产品类型*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">产品类型*</span> -->
                <v-text-field class="primary--text mx-1" label="产品类型" name="title" v-model="eventForm.prodcode" @change="callbackProd" single-line hide-details>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">产品描述*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading datatest.prodType.prodDesc">产品描述</span> -->
                <v-text-field class="primary--text mx-2" label="产品描述" name="title" v-model="eventForm.proddesc" single-line hide-details/>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">业务模块*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">业务模块</span> -->
                <v-select class="primary--text mx-2" :items="busimodel" v-model="eventForm.busimodel" label="业务模块" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">产品分类*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">产品分类</span> -->
                <v-select class="primary--text mx-2" :items="prodclass" v-model="eventForm.prodclass" label="产品分类" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">产品属性*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">产品属性</span> -->
                <v-select class="primary--text mx-2" :items="prodprepice" v-model="eventForm.prodprepice" label="产品属性" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">组合产品*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">组合产品</span> -->
                <!-- <v-select class="primary--text mx-2" :items="prodmuti" v-model="prodmutiData" label="组合产品" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select> -->
                <v-switch :label="`${prodmutiData==='Y'?'是':'否'}`" v-model="eventForm.prodmuti" value="Y" color="success" hide-details></v-switch>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">产品状态*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">产品状态</span> -->
                <v-select class="primary--text mx-2" :items="prodstatus" v-model="eventForm.prodstatus" label="产品状态" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">基础产品*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">基础产品*</span> -->
                <v-select class="primary--text mx-1" :items="baseprod" v-model="eventForm.baseprod" label="基础产品" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">账户类型*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">账户类型</span> -->
                <v-select class="primary--text mx-2" :items="accttype" v-model="eventForm.accttype" label="账户类型" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">账户子类型*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">账户子类型</span> -->
                <v-select :items="acctsontype" v-model="eventForm.acctsontype" label="账户子类型" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">账户结构*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">账户结构</span> -->
                <v-select class="primary--text mx-2" :items="acctstruct" v-model="eventForm.acctstruct" label="账户结构" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">虚实标志*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">虚实标志</span> -->
                <v-select class="primary--text mx-2" :items="virtualflag" v-model="eventForm.virtualflag" label="虚实标志" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">计息标志*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">计息标志</span> -->
                <v-select class="primary--text mx-2" :items="acctintflag" v-model="eventForm.acctintflag" label="计息标志" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">金额标志*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">金额标志</span> -->
                <v-select class="primary--text mx-2" :items="amtflag" v-model="eventForm.amtflag" label="金额标志" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">利润中心*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">利润中心</span> -->
                <v-select class="primary--text mx-1" :items="profitcenter" v-model="eventForm.profitcenter" label="利润中心" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">密码类型*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">利润中心</span> -->
                <v-select class="primary--text mx-1" :items="profitcenter" v-model="eventForm.profitcenter" label="密码类型" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">起始日期*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-menu ref="statDateMenu" lazy :close-on-content-click="false" v-model="startDateMenu" transition="scale-transition" offset-y full-width :nudge-bottom="-22" min-width="290px" :return-value.sync="startDate">
                  <v-text-field slot="activator" label="起始日期" v-model="eventForm.effectdate" append-icon="event" single-line hide-details></v-text-field>
                  <v-date-picker v-model="eventForm.effectdate" @input="$refs.statDateMenu.save(eventForm.effectdate)" no-title scrollable locale="zh-cn">
                    <!-- <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="startDateMenu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.statDate.save(startDate)">OK</v-btn> -->
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">终止日期*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-menu ref="endDateMenu" lazy :close-on-content-click="false" v-model="endDateMenu" transition="scale-transition" offset-y full-width :nudge-bottom="-22" min-width="290px" :return-value.sync="endDate">
                  <v-text-field slot="activator" label="终止日期" v-model="eventForm.failuredate" append-icon="event" single-line hide-details></v-text-field>
                  <v-date-picker v-model="eventForm.failuredate" @input="$refs.endDateMenu.save(eventForm.failuredate)" no-title scrollable locale="zh-cn">
                    <!-- <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="endDateMenu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.endDate.save(endDate)">OK</v-btn> -->
                  </v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
        <!-- </v-widget> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import { getInitData } from "@/api/prod";
    import { getProdData } from "@/api/prod";

    export default {
        props: ["prodData","options"],
        data: () => ({
            title: null,
            failuredateData: "",
            valid: true,
            date: null,
            startDate: "",
            options: "",
            startTimeMenu: false,
            startTime: null,
            endDateMenu: false,
            endDate: "",
            endTimeMenu: false,
            endTime: null,
            modal: false,
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
            busimodel: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ],
            prodclass: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ],
            acctstruct: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ],
            virtualflag: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ],
            acctintflag: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ],
            amtflag: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ],
            baseprod: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ],
            prodstatus: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ],
            prodmuti: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ],
            prodprepice: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ],
            acctsontype: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ],
            accttype: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ],
            profitcenter: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ]
        }),
        computed: {
            progress() {
                return Math.min(100, this.value.length * 10);
            }
        },
        watch: {
            prodData(val) {
                this.initProdData(val)
            },
            options(val) {
                if(val !== ""){
                    this.callbackprod(this.eventForm)
                }
            }
        },
        mounted() {
            this.initRefDate();
        },
        methods: {
            initProdData(val) {
                //prodType
                this.eventForm.prodcode = val.prodType.prodType
                this.eventForm.proddesc = val.prodType.prodDesc
                this.eventForm.prodprepice = val.prodType.prodRange
                this.eventForm.busimodel = "RB"
                this.eventForm.prodclass = val.prodType.prodClass
                this.eventForm.prodmuti = val.prodType.prodGroup
                this.eventForm.prodstatus = val.prodType.status
                //prodDefines
                this.eventForm.acctstruct = val.prodDefines.ACCT_STRUCT_FLAG.attrValue
                this.eventForm.accttype = val.prodDefines.ACCT_TYPE.attrValue
                this.eventForm.virtualflag = val.prodDefines.ACCT_REAL_FLAG.attrValue
                this.eventForm.acctintflag = val.prodDefines.ACCT_INT_FLAG.attrValue
                this.eventForm.amtflag = val.prodDefines.ACCT_BAL_FLAG.attrValue
                this.eventForm.profitcenter = val.prodDefines.PROFIT_CENTRE.attrValue
                this.eventForm.effectdate = val.prodDefines.PROD_START_DATE.attrValue
                this.eventForm.failuredate = val.prodDefines.PROD_END_DATE.attrValue

                //mbEventInfos
                this.eventForm.baseprod = val.mbEventInfos.CLOSE_RB101.mbEventAttrs.CHECK_AGENT.attrValue

            },
            callbackprod() {
                this.$emit("getNewProdData",{"eventForm": this.eventForm})
            },
            initRefDate() {
                getInitData().then(response => {
                    console.log(response);
                    this.busimodel = response.data.paraDataVl.busimodel;
                    this.virtualflag = response.data.paraDataVl.virtualflag;
                    this.acctintflag = response.data.paraDataVl.acctintflag;
                    this.amtflag = response.data.paraDataVl.amtflag;
                    this.prodmuti = response.data.paraDataVl.prodmuti;
                    this.prodprepice = response.data.paraDataVl.prodprepice;
                    this.accttype = response.data.paraDataVl.accttype;
                    this.profitcenter = response.data.paraDataRf.profitcenter;
                    this.acctsontype = response.data.paraDataRf.acctsontype;
                    this.baseprod = response.data.paraDataRf.baseprod;
                    this.acctstruct = response.data.paraDataRf.acctstruct;
                    this.prodstatus = response.data.paraDataVl.prodstatus;
                    this.prodclass = response.data.paraDataRf.prodclass;
                });
            },
            closeDialog() {
                this.$parent.isActive = false;
            }
        }
    };
</script>
