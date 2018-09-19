<template>
    <v-container fluid pr-5 pt-0>
        <div slot="widget-content">
            <v-container fluid pt-1>
                <v-layout row wrap>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">支取控制方式*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventAttrs.WITHDRAWAL_TYPE" :perShow="true" :options="drawControlWay" :isMultiSelect="false"></dc-multiselect>
                    </v-flex>
                    <v-flex>
                        <v-subheader class="primary--text subheading">是否允许代办*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-switch v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventAttrs.AGENT_FLAG" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">资金去向方式*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventAttrs.FUND_TRAN_TYPE" :perShow="true" :options="cashResource" :isMultiSelect="false"></dc-multiselect>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">账户限制检查*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-switch v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventAttrs.CHECK_RESTRAINT" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">支取方式检查*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-switch v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventAttrs.CHECK_WDRAWN_TYPE" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">凭证类型检查*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-switch v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventAttrs.CHECK_DOC_TYPE" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">支取违约类型*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventAttrs.DRAW_BREAK_TYPE" :perShow="true" :options="breakType" :isMultiSelect="false"></dc-multiselect>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">违约处理方式*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventAttrs.BREAK_DEAL_WAY" :perShow="true" :options="dealingWay" :isMultiSelect="false"></dc-multiselect>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">单次支取金额检查*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-switch v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventParts.CHECK_SG_AMT_PA.CHECK_SG_AMT" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">最小支取金额*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-text-field v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventParts.CHECK_SG_AMT_PA.SG_MIN_AMT" :perShow="true"></dc-text-field>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">最大支取金额*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-text-field v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventParts.CHECK_SG_AMT_PA.SG_MAX_AMT" :perShow="true"></dc-text-field>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">账户留存余额检查*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-switch v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventParts.CHECK_KEEP_BAL_PA.CHECK_KEEP_BAL" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">最小留存余额*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-text-field v-model="prodData.mbEventInfos['WTD_'+prodData.prodType.prodType].mbEventParts.CHECK_KEEP_BAL_PA.KEEP_MIN_BAL" :perShow="true"></dc-text-field>
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
                this.drawControlWay = this.refData[2].paraDataRb.drawControlWay;
                this.daiBanFlag = this.refData[2].paraDataRb.daiBanFlag;
                this.cashResource = this.refData[2].paraDataRb.cashResource;
                this.attrReatraintCheck = this.refData[2].paraDataRb.attrReatraintCheck;
                this.withDrawlCheck = this.refData[2].paraDataRb.withDrawlCheck;
                this.voucherTypeCheck = this.refData[2].paraDataRb.voucherTypeCheck;
                this.breakType = this.refData[2].paraDataRb.breakType;
                this.dealingWay = this.refData[2].paraDataRb.dealingWay;
                this.singleTimeBalCheck = this.refData[2].paraDataRb.singleTimeBalCheck;
                this.acctBalanceCheck = this.refData[2].paraDataRb.acctBalanceCheck;
                this.sgBalCheck = this.refData[2].paraDataRb.sgBalCheck
            },
            closeDialog() {
                this.$parent.isActive = false;
            }
        }
    };
</script>
