<template>
  <v-container fluid pr-5 pt-0>
    <v-layout row wrap>
      <v-flex xs12 md12 lg12>
        <div slot="widget-content">
          <v-container fluid pt-1>
            <v-layout row wrap>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">合作方编码*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">产品类型*</span> -->
                <v-text-field class="primary--text mx-1" label="合作方编码" name="title" v-model="eventForm.partnerCode" single-line hide-details>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">合作方名称*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-text-field class="primary--text mx-2" label="合作方名称" name="title" v-model="eventForm.partnerName" single-line hide-details/>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">客户号*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading datatest.prodType.prodDesc">产品描述</span> -->
                <v-text-field class="primary--text mx-2" label="客户号" name="title" v-model="eventForm.clientNo" single-line hide-details/>
              </v-flex>
                <v-flex xs12 md2 lg2>
                  <v-subheader class="primary--text subheading">合作方类型*</v-subheader>
                </v-flex>
                <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="partnerType" v-model="eventForm.partnerType" label="合作方类型" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">放款模式*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="drwdownType" v-model="eventForm.drwdownType" label="放款模式" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">出资方式*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="contributiveType" v-model="eventForm.contributiveType" label="出资方式" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">核算方式*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="joinType" v-model="eventForm.joinType" label="核算方式" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">利率是否分层*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="rateLimitFlag" v-model="eventForm.rateLimitFlag" label="利率是否分层" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">合作方利率分层比例（%）*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-text-field class="primary--text mx-2" label="合作方利率分层比例（%）" name="title" v-model="eventForm.rateRatio" single-line hide-details/>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">是否校验额度*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="limitCheckFlag" v-model="eventForm.limitCheckFlag" label="是否校验额度" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">额度是否循环*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="limitCycle" v-model="eventForm.limitCycle" label="额度是否循环" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>

              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">币种*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="ccy" v-model="eventForm.ccy" label="币种" item-text="label" item-value="value" single-line hide-details></v-select>
              </v-flex>

              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">合作方额度*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">产品类型*</span> -->
                <v-text-field class="primary--text mx-1" label="合作方额度" name="title" v-model="eventForm.partnerLimit" single-line hide-details>
                </v-text-field>
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
    import { getInitData } from "@/api/nLoan";
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
            partnerType: [
                {
                    label: "",
                    value: ""
                }
            ],
            drwdownType: [
                {
                    label: "",
                    value: ""
                }
            ],
            contributiveType: [
                {
                    label: "",
                    value: ""
                }
            ],
            joinType: [
                {
                    label: "",
                    value: ""
                }
            ],
            rateLimitFlag: [
                {
                    label: "",
                    value: ""
                }
            ],
            rateRatio: [
                {
                    label: "",
                    value: ""
                }
            ],
            limitCheckFlag: [
                {
                    label: "",
                    value: ""
                }
            ],
            limitCycle: [
                {
                    label: "",
                    value: ""
                }
            ],
            ccy: [
                {
                    label: "",
                    value: ""
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
                this.getInitData(val)
            }
        },
        mounted() {
            this.initRefDate();
        },
        methods: {
            initProdData(val) {
                this.eventForm = {}
            },
            initRefDate() {
                getInitData().then(response => {
                    console.log(response);
                    this.partnerType = response.data.paranLoan.partnerType
                    this.drwdownType = response.data.paranLoan.drwdownType
                    this.contributiveType = response.data.paranLoan.contributiveType
                    this.joinType = response.data.paranLoan.joinType
                    this.rateLimitFlag = response.data.paranLoan.rateLimitFlag
                    this.rateRatio = response.data.paranLoan.rateRatio
                    this.limitCheckFlag = response.data.paranLoan.limitCheckFlag
                    this.limitCycle = response.data.paranLoan.limitCycle
                    this.partnerLimit = response.data.paranLoan.partnerLimit
                    this.ccy = response.data.paranLoan.ccy


                });
            },
            callbackprod() {
                this.$emit("getNewProdData",{"eventForm": this.eventForm})
            },
            closeDialog() {
                this.$parent.isActive = false;
            }
        }
    };
</script>
