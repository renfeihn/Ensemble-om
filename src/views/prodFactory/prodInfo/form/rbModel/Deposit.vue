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
                                <v-select class="primary--text mx-2" :items="depositControlApproach" v-model="prodData.mbEventInfos['DEP_'+prodData.prodType.prodType].mbEventAttrs.DEPOSIT_CONTRAL_WAY.attrValue" label="存入控制方式" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">是否允许代办*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="prodData.mbEventInfos['DEP_'+prodData.prodType.prodType].mbEventAttrs.AGENT_FLAG.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">资金来源方式*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="cashResource" v-model="prodData.mbEventInfos['DEP_'+prodData.prodType.prodType].mbEventAttrs.CAPITAL_ORIGIN_WAY.attrValue" label="资金来源方式" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">账户限制检查*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="prodData.mbEventInfos['DEP_'+prodData.prodType.prodType].mbEventAttrs.CHECK_RESTRAINT.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">存入违约类型*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="breakType" v-model="prodData.mbEventInfos['DEP_'+prodData.prodType.prodType].mbEventAttrs.DEPOSIT_BREAK_TYPE.attrValue" label="存入违约类型" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">违约处理方式*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="dealingWay" v-model="prodData.mbEventInfos['DEP_'+prodData.prodType.prodType].mbEventAttrs.BREAK_DEAL_WAY.attrValue" label="违约处理方式" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">起存金额检查*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="prodData.mbEventInfos['DEP_'+prodData.prodType.prodType].mbEventAttrs.CHECK_INIT_AMT.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">最小起存金额*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-text-field class="primary--text mx-1" label="最小起存金额" name="sgDepMinAmt" v-model="prodData.mbEventInfos['DEP_'+prodData.prodType.prodType].mbEventAttrs.SG_DEP_MIN_AMT.attrValue" single-line hide-details></v-text-field>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">最大起存金额*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-text-field class="primary--text mx-1" label="最大起存金额" name="sgDepMaxAmt" v-model="prodData.mbEventInfos['DEP_'+prodData.prodType.prodType].mbEventAttrs.SG_DEP_MAX_AMT.attrValue" single-line hide-details></v-text-field>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">单次存入金额检查*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="prodData.mbEventInfos['DEP_'+prodData.prodType.prodType].mbEventAttrs.CHECK_INIT_AMT.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">最小存入余额*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-text-field class="primary--text mx-1" label="最小存入金额" name="keepMinBal" v-model="prodData.mbEventInfos['DEP_'+prodData.prodType.prodType].mbEventAttrs.KEEP_MIN_BAL.attrValue" single-line hide-details></v-text-field>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">最大存入余额*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-text-field class="primary--text mx-1" label="最大存入金额" name="keepMaxBal" v-model="prodData.mbEventInfos['DEP_'+prodData.prodType.prodType].mbEventAttrs.KEEP_MAX_BAL.attrValue" single-line hide-details></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import DcSwitch from "@/components/widgets/DcSwitch";
    import { getInitData } from "@/mock/init";
    import { getProdData } from "@/api/prod";
    export default {
        components: { DcSwitch },
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
                this.depositControlApproach = this.refData[2].paraDataRb.depositControlApproach;
                this.permitCommersionFlag = this.refData[2].paraDataRb.permitCommersionFlag;
                this.cashResource = this.refData[2].paraDataRb.cashResource;
                this.acctReatraintCheck = this.refData[2].paraDataRb.acctReatraintCheck;
                this.breakType = this.refData[2].paraDataRb.breakType;
                this.dealingWay = this.refData[2].paraDataRb.dealingWay;
                this.startAmtCheck = this.refData[2].paraDataRb.startAmtCheck;
                this.danciDepositCheck = this.refData[2].paraDataRb.danciDepositCheck;
            }
        }
    }
</script>
