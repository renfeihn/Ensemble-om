<template>
  <v-container fluid pr-5 pt-0>
    <v-layout row wrap>
      <v-flex xs12 md12 lg12>
        <div slot="widget-content">
          <v-container fluid pt-1>
            <v-layout row wrap>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">结息周期*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="cycleFreq" v-model="intDetail.cycleFreq" label="结息周期" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">结息日*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-text-field class="primary--text mx-1" label="结息日" name="settleDay" v-model="intDetail.settleDay" single-line hide-details></v-text-field>
              </v-flex>

              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">是否结息到本账户*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
<!--
                <v-select class="primary&#45;&#45;text mx-2" :items="cycleSelfFlag" v-model="intDetail.cycleSelfFlag" label="是否结息到本账户" item-text="value" item-value="key" single-line hide-details></v-select>
-->
                <dc-switch v-model="intDetail.cycleSelfFlag"></dc-switch>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import  DcSwitch from "@/components/widgets/DcSwitch";
    import { getInitData } from "@/mock/init";
    import { getProdData } from "@/api/prod";
    export default {
        components: { DcSwitch },
        props: ["prodData"],
        data: () => ({
            title: null,
            cycleFreq: [
                {
                    key: "",
                    value: ""
                }
            ],
            cycleSelfFlag: [
                {
                    key: "",
                    value: ""
                }
            ],
            refData: getInitData,
            intDetail: {
                cycleFreq: '',
                cycleSelfFlag: '',
                intDay: ''
            }
        }),
        computed: {
            progress() {
                return Math.min(100, this.value.length * 10);
            }
        },
        watch: {
            prodData(val) {
                this.selectByProd(val);
            }
        },
        mounted() {
            this.initRefDate();
        },
        methods: {
            callbackprod() {
                this.$emit("callBackIntDetail",{"intDetail": this.intDetail})
            },
            selectByProd(val) {
                this.intDetail.cycleFreq = val.mbEventInfos["CYCLE_"+val.prodType.prodType].mbEventAttrs.CYCLE_FREQ.attrValue
                this.intDetail.intDay = val.mbEventInfos["CYCLE_"+val.prodType.prodType].mbEventAttrs.INT_DAY.attrValue
                this.intDetail.cycleSelfFlag = ""//是否结息到本帐户
            },
            initRefDate() {
                this.cycleFreq = this.refData[2].paraDataRb.cycleFreq;
                this.cycleSelfFlag = this.refData[2].paraDataRb.cycleSelfFlag;
            },
            closeDialog() {
                this.$parent.isActive = false;
            }
        }
    };
</script>
