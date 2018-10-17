<template>
  <v-container fluid pr-5 pt-0>
        <div slot="widget-content">
          <v-container fluid pt-1>
            <v-layout row wrap>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">结息周期*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <dc-multiselect v-model="prodData.mbEventInfos['CYCLE_'+prodData.prodType.prodType].mbEventAttrs.CYCLE_FREQ.attrValue" :options="cycleFreq" :isMultiSelect="false"></dc-multiselect>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">结息日*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <dc-text-field v-model="prodData.mbEventInfos['CYCLE_'+prodData.prodType.prodType].mbEventAttrs.INT_DAY.attrValue"></dc-text-field>
              </v-flex>

              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">是否结息到本账户*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <dc-switch v-model="prodData.mbEventInfos['CYCLE_'+prodData.prodType.prodType].mbEventAttrs.INT_CAP.attrValue"></dc-switch>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
  </v-container>
</template>

<script>
    import  DcSwitch from "@/components/widgets/DcSwitch";
    import { getInitData } from "@/mock/init";
    import DcMultiselect from '@/components/widgets/DcMultiselect'
    import DcTextField from '@/components/widgets/DcTextField'
    import { getProdData } from "@/api/prod";
    export default {
        components: { DcSwitch, DcMultiselect, DcTextField },
        props: ["prodData"],
        data: () => ({
            title: null,
            refData: getInitData,
        }),
        computed: {
            progress() {
                return Math.min(100, this.value.length * 10);
            }
        },
        mounted() {
            this.initRefDate();
        },
        methods: {
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
