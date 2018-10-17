<template>
    <v-container fluid pr-5 pt-0>
        <div slot="widget-content">
            <v-container fluid pt-1>
                <v-layout row wrap>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">存入控制方式*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.mbEventInfos['CLOSE_'+prodData.prodType.prodType].mbEventAttrs.DEPOSIT_CONTRAL_WAY.attrValue" :options="systemControlApproach" :isMultiSelect="false"></dc-multiselect>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">是否允许代办*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-switch v-model="prodData.mbEventInfos['CLOSE_'+prodData.prodType.prodType].mbEventAttrs.AGENT_FLAG.attrValue"></dc-switch>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">资金来源方式*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.mbEventInfos['CLOSE_'+prodData.prodType.prodType].mbEventAttrs.CAPITAL_ORIGIN_WAY.attrValue" :options="cashResouce" :isMultiSelect="false"></dc-multiselect>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">账户限制检查*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-switch v-model="prodData.mbEventInfos['CLOSE_'+prodData.prodType.prodType].mbEventAttrs.CHECK_RESTRAINT.attrValue"></dc-switch>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">签约检查*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-switch v-model="prodData.mbEventInfos['CLOSE_'+prodData.prodType.prodType].mbEventAttrs.CHECK_SIGN.attrValue"></dc-switch>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">欠费检查*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-switch v-model="prodData.mbEventInfos['CLOSE_'+prodData.prodType.prodType].mbEventAttrs.CHECK_CLOSE_FEE.attrValue"></dc-switch>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">是否允许销户回退*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-switch v-model="prodData.mbEventInfos['CLOSE_'+prodData.prodType.prodType].mbEventAttrs.CLOSE_BACK_FLAG.attrValue"></dc-switch>
                    </v-flex>
                </v-layout>
            </v-container></div>
    </v-container>
</template>

<script>
    import { getInitData } from "@/mock/init";
    import { getProdData } from "@/api/prod";
    import DcSwitch from "@/components/widgets/DcSwitch";
    import DcMultiselect from '@/components/widgets/DcMultiselect'
    import DcTextField from '@/components/widgets/DcTextField'
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
                this.systemControlApproach = this.refData[2].paraDataRb.systemControlApproach;
                this.permitCommersionFlag = this.refData[2].paraDataRb.permitCommersionFlag;
                this.cashResouce = this.refData[2].paraDataRb.cashResouce;
                this.acctReatraintCheck = this.refData[2].paraDataRb.acctReatraintCheck;
                this.resignCheck = this.refData[2].paraDataRb.resignCheck;
                this.ownCheck = this.refData[2].paraDataRb.ownCheck;
                this.closeAcctRollbackFlag = this.refData[2].paraDataRb.closeAcctRollbackFlag;
            }
        }
    }
</script>
