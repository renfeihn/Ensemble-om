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
                <v-text-field class="primary--text mx-1" label="产品类型" name="title" v-model="eventForm.prodType" single-line hide-details>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">产品描述*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading datatest.prodType.prodDesc">产品描述</span> -->
                <v-text-field class="primary--text mx-2" label="产品描述" name="title" v-model="eventForm.prodDesc" single-line hide-details/>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">业务模块*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">业务模块</span> -->
                <v-select class="primary--text mx-2" :items="busimodel" v-model="eventForm.busimodel" label="业务模块" item-text="label" item-value="value" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">产品分类*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">产品分类</span> -->
                <v-select class="primary--text mx-2" :items="prodClass" v-model="eventForm.prodClass" label="产品分类" item-text="label" item-value="value" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">产品属性*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">产品属性</span> -->
                <v-select class="primary--text mx-2" :items="prodRange" v-model="eventForm.prodRange" label="产品属性" item-text="label" item-value="value" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">组合产品*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">组合产品</span> -->
                <!-- <v-select class="primary--text mx-2" :items="prodmuti" v-model="prodmutiData" label="组合产品" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select> -->
                <v-switch :label="`${prodGroup==='Y'?'是':'否'}`" v-model="eventForm.prodGroup" value="Y" color="success" hide-details></v-switch>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">产品状态*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">产品状态</span> -->
                <v-select class="primary--text mx-2" :items="status" v-model="eventForm.status" label="产品状态" item-text="label" item-value="value" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">基础产品*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">基础产品*</span> -->
                <v-select class="primary--text mx-1" :items="baseprod" v-model="eventForm.baseprod" label="基础产品" item-text="label" item-value="value" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">账户类型*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">账户类型</span> -->
                <v-select class="primary--text mx-2" :items="acctType" v-model="eventForm.acctType" label="账户类型" item-text="label" item-value="value" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">账户子类型*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">账户子类型</span> -->
                <v-select :items="acctsontype" v-model="eventForm.acctsontype" label="账户子类型" item-text="label" item-value="value" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">账户结构*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">账户结构</span> -->
                <v-select class="primary--text mx-2" :items="acctStructFlag" v-model="eventForm.acctStructFlag" label="账户结构" item-text="label" item-value="value" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">虚实标志*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">虚实标志</span> -->
                <v-select class="primary--text mx-2" :items="acctRealFlag" v-model="eventForm.acctRealFlag" label="虚实标志" item-text="label" item-value="value" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">计息标志*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">计息标志</span> -->
                <v-select class="primary--text mx-2" :items="acctIntFlag" v-model="eventForm.acctIntFlag" label="计息标志" item-text="label" item-value="value" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">金额标志*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">金额标志</span> -->
                <v-select class="primary--text mx-2" :items="acctBalFlag" v-model="eventForm.acctBalFlag" label="金额标志" item-text="label" item-value="value" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">利润中心*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">利润中心</span> -->
                <v-select class="primary--text mx-1" :items="profitCenter" v-model="eventForm.profitCenter" label="利润中心" item-text="label" item-value="value" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">密码类型*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">利润中心</span> -->
                <v-select class="primary--text mx-1" :items="profitcenter" v-model="eventForm.profitcenter" label="密码类型" item-text="label" item-value="value" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">起始日期*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-menu ref="statDateMenu" lazy :close-on-content-click="false" v-model="startDateMenu" transition="scale-transition" offset-y full-width :nudge-bottom="-22" min-width="290px" :return-value.sync="startDate">
                  <v-text-field slot="activator" label="起始日期" v-model="eventForm.prodStartDate" append-icon="event" single-line hide-details></v-text-field>
                  <v-date-picker v-model="eventForm.prodStartDate" @input="$refs.statDateMenu.save(eventForm.effectdate)" no-title scrollable locale="zh-cn">
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
                  <v-text-field slot="activator" label="终止日期" v-model="eventForm.prodEndDate" append-icon="event" single-line hide-details></v-text-field>
                  <v-date-picker v-model="eventForm.prodEndDate" @input="$refs.endDateMenu.save(eventForm.failuredate)" no-title scrollable locale="zh-cn">
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
        props: ["prodData"],
        data: () => ({
            title: null,
            failuredateData: "",
            valid: true,
            date: null,
            startDate: "",
            startTimeMenu: false,
            startTime: null,
            endDateMenu: false,
            endDate: "",
            endTimeMenu: false,
            endTime: null,
            modal: false,
            eventForm: {
                prodType: '',
                prodDesc: '',
                baseprod: '',
                busimodel: '',
                prodClass: '',
                prodRange: '',
                profitCenter: '',
                status: '',
                prodGroup: '',
                acctType: '',
                acctsontype: '',
                acctStructFlag: '',
                acctRealFlag: '',
                acctIntFlag: '',
                acctBalFlag: '',
                prodStartDate: '',
                prodEndDate: ''
            },
            busimodel: [
                {
                    value: "",
                    label: ""
                }
            ],
            prodClass: [
                {
                    value: "",
                    label: ""
                }
            ],
            acctStructFlag: [
                {
                    value: "",
                    label: ""
                }
            ],
            acctRealFlag: [
                {
                    value: "",
                    label: ""
                }
            ],
            acctIntFlag: [
                {
                    value: "",
                    label: ""
                }
            ],
            acctBalFlag: [
                {
                    value: "",
                    label: ""
                }
            ],
            baseprod: [
                {
                    value: "",
                    label: ""
                }
            ],
            status: [
                {
                    value: "",
                    label: ""
                }
            ],
            prodGroup: [
                {
                    value: "",
                    label: ""
                }
            ],
            prodRange: [
                {
                    value: "",
                    label: ""
                }
            ],
            acctsontype: [
                {
                    value: "",
                    label: ""
                }
            ],
            acctType: [
                {
                    value: "",
                    label: ""
                }
            ],
            profitCenter: [
                {
                    value: "",
                    label: ""
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
            }
        },
        mounted() {
            this.initRefDate();
        },
        methods: {
            initProdData(val) {
                this.eventForm = {}
                //prodType
                this.eventForm.prodType = val.prodType.prodType
                this.eventForm.prodDesc = val.prodType.prodDesc
                this.eventForm.prodRange = val.prodType.prodRange
                this.eventForm.busimodel = "RB"
                this.eventForm.prodClass = val.prodType.prodClass
                this.eventForm.prodGroup = val.prodType.prodGroup
                this.eventForm.status = val.prodType.status
                //prodDefines
                this.eventForm.acctStructFlag = val.prodDefines.ACCT_STRUCT_FLAG.attrValue
                this.eventForm.acctType = val.prodDefines.ACCT_TYPE.attrValue
                this.eventForm.acctRealFlag = val.prodDefines.ACCT_REAL_FLAG.attrValue
                this.eventForm.acctIntFlag = val.prodDefines.ACCT_INT_FLAG.attrValue
                this.eventForm.acctBalFlag = val.prodDefines.ACCT_BAL_FLAG.attrValue
                this.eventForm.profitCenter = val.prodDefines.PROFIT_CENTRE.attrValue
                this.eventForm.prodStartDate = val.prodDefines.PROD_START_DATE.attrValue
                this.eventForm.prodEndDate = val.prodDefines.PROD_END_DATE.attrValue

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
                    this.acctRealFlag = response.data.paraDataVl.acctRealFlag;
                    this.acctIntFlag = response.data.paraDataVl.acctIntFlag;
                    this.acctBalFlag = response.data.paraDataVl.acctBalFlag;
                    this.prodGroup = response.data.paraDataVl.prodGroup;
                    this.prodRange = response.data.paraDataVl.prodRange;
                    this.acctType = response.data.paraDataVl.acctType;
                    this.profitCenter = response.data.paraDataRf.profitCenter;
                    this.acctsontype = response.data.paraDataRf.acctsontype;
                    this.baseprod = response.data.paraDataRf.baseprod;
                    this.acctStructFlag = response.data.paraDataRf.acctStructFlag;
                    this.status = response.data.paraDataVl.status;
                    this.prodClass = response.data.paraDataRf.prodClass;
                });
            },
            closeDialog() {
                this.$parent.isActive = false;
            }
        }
    };
</script>
