<template>
  <v-container fluid pr-5 pt-0>
    <v-layout row wrap>
      <v-flex xs12 md12 lg12>
        <div slot="widget-content">
          <v-container fluid pt-1>
            <v-layout row wrap>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">对账日期*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-text-field class="primary--text mx-1" label="对账日期" name="title" v-model="eventForm.partnerCode" single-line hide-details>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">对账日*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-text-field class="primary--text mx-2" label="对账日" name="title" v-model="eventForm.partnerName" single-line hide-details/>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">对账频率*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-text-field class="primary--text mx-2" label="对账频率" name="title" v-model="eventForm.clientNo" single-line hide-details/>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <!--<v-subheader class="primary&#45;&#45;text subheading">对账频率*</v-subheader>-->
              </v-flex>
              <v-flex md4 lg4>
                <!--<v-text-field class="primary&#45;&#45;text mx-2" label="对账频率" name="title" v-model="eventForm.clientNo" single-line hide-details/>-->
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">发放是否对账*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-text-field class="primary--text mx-2" label="发放是否对账" name="title" v-model="eventForm.clientNo" single-line hide-details/>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">发放对账代码*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-text-field class="primary--text mx-2" label="发放对账代码" name="title" v-model="eventForm.clientNo" single-line hide-details/>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">回收是否对账*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-text-field class="primary--text mx-2" label="回收是否对账" name="title" v-model="eventForm.clientNo" single-line hide-details/>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">回收对账代码*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-text-field class="primary--text mx-2" label="回收对账代码" name="title" v-model="eventForm.clientNo" single-line hide-details/>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">还款计划是否对账*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-text-field class="primary--text mx-2" label="还款计划是否对账" name="title" v-model="eventForm.clientNo" single-line hide-details/>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">还款计划对账代码*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-text-field class="primary--text mx-2" label="还款计划对账代码" name="title" v-model="eventForm.clientNo" single-line hide-details/>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">结算账户是否对账*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-text-field class="primary--text mx-2" label="结算账户是否对账" name="title" v-model="eventForm.clientNo" single-line hide-details/>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">结算账户对账代码*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-text-field class="primary--text mx-2" label="结算账户对账代码" name="title" v-model="eventForm.clientNo" single-line hide-details/>
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
                partnerCode: '',
                partnerName: '',
                clientNo: '',
                partnerType: '',
                drwdownType: '',
                contributiveType: '',
                joinType: '',
                rateLimitFlag: '',
                rateRatio: '',
                limitCheckFlag: '',
                limitCycle: '',
                ccy: '',
                partnerLimit: ''
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
            }
        },
        mounted() {
            this.initRefDate();
        },
    };
</script>
