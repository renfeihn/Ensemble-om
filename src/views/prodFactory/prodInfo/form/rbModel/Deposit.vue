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
                                <!--
                                                                <v-select class="primary&#45;&#45;text mx-2" :items="permitCommersionFlag" v-model="deposit.checkAgent" label="是否允许代办" item-text="value" item-value="key" single-line hide-details></v-select>
                                -->
                                <dc-switch v-model="deposit.permitCommersionFlag"></dc-switch>
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
                                <!--
                                                                <v-select class="primary&#45;&#45;text mx-2" :items="acctReatraintCheck" v-model="deposit.checkRestraint" label="账户限制检查" item-text="value" item-value="key" single-line hide-details></v-select>
                                -->
                                <dc-switch v-model="deposit.acctReatraintCheck"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">存入违约类型*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="breakType" v-model="deposit.breakType" label="存入违约类型" item-text="value" item-value="key" single-line hide-details></v-select>
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
                                <!--
                                                                <v-select class="primary&#45;&#45;text mx-2" :items="startAmtCheck" v-model="deposit.startAmtCheck" label="起存金额检查" item-text="value" item-value="key" single-line hide-details></v-select>
                                -->
                                <dc-switch v-model="deposit.startAmtCheck"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">最小起存金额*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-text-field class="primary--text mx-1" label="最小起存金额" name="sgDepMinAmt" v-model="deposit.sgDepMinAmt" single-line hide-details></v-text-field>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">最大起存金额*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-text-field class="primary--text mx-1" label="最大起存金额" name="sgDepMaxAmt" v-model="deposit.sgDepMaxAmt" single-line hide-details></v-text-field>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">单次存入金额检查*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <!--
                                                                <v-select class="primary&#45;&#45;text mx-2" :items="danciDepositCheck" v-model="deposit.danciDepositCheck" label="单次存入金额检查" item-text="value" item-value="key" single-line hide-details></v-select>
                                -->
                                <dc-switch v-model="deposit.checkInitAmt"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">最小存入余额*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-text-field class="primary--text mx-1" label="最小存入金额" name="keepMinBal" v-model="deposit.keepMinBal" single-line hide-details></v-text-field>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">最大存入余额*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-text-field class="primary--text mx-1" label="最大存入金额" name="keepMaxBal" v-model="deposit.keepMaxBal" single-line hide-details></v-text-field>
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
            deposit: {
                depositControlApproach: '',
                permitCommersionFlag: '',
                cashResource: '',
                acctReatraintCheck: '',
                breakType: '',
                dealingWay: '',
                startAmtCheck: '',
                sgDepMinAmt: '',
                sgDepMaxAmt: '',
                checkInitAmt: '',
                keepMinBal: '',
                keepMaxBal: ''
            }
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
            callbackprod() {
                this.$emit("callBackDeposit",{"deposit": this.deposit})
            },
            selectByProd(val) {
                this.deposit = {}
                this.deposit.depositControlApproach = val.mbEventInfos["DEP_"+val.prodType.prodType].mbEventAttrs.DEPOSIT_CONTRAL_WAY.attrValue//存入控制方式
                this.deposit.permitCommersionFlag = val.mbEventInfos["DEP_"+val.prodType.prodType].mbEventAttrs.AGENT_FLAG.attrValue
                this.deposit.acctReatraintCheck = val.mbEventInfos["DEP_"+val.prodType.prodType].mbEventAttrs.CHECK_RESTRAINT.attrValue
                this.deposit.cashResource = val.mbEventInfos["DEP_"+val.prodType.prodType].mbEventAttrs.CAPITAL_ORIGIN_WAY.attrValue;//资金来源方式
                this.deposit.breakType = val.mbEventInfos["DEP_"+val.prodType.prodType].mbEventAttrs.DEPOSIT_BREAK_TYPE.attrValue//存入违约类型
                this.deposit.dealingWay = val.mbEventInfos["DEP_"+val.prodType.prodType].mbEventAttrs.BREAK_DEAL_WAY.attrValue//违约处理方式
                this.deposit.startAmtCheck = val.mbEventInfos["DEP_"+val.prodType.prodType].mbEventAttrs.CHECK_INIT_AMT.attrValue
                this.deposit.sgDepMinAmt = val.mbEventInfos["DEP_"+val.prodType.prodType].mbEventAttrs.SG_DEP_MIN_AMT.attrValue
                this.deposit.sgDepMaxAmt = val.mbEventInfos["DEP_"+val.prodType.prodType].mbEventAttrs.SG_DEP_MAX_AMT.attrValue
                this.deposit.checkInitAmt = val.mbEventInfos["DEP_"+val.prodType.prodType].mbEventAttrs.CHECK_INIT_AMT.attrValue
                this.deposit.keepMinBal = val.mbEventInfos["DEP_"+val.prodType.prodType].mbEventAttrs.KEEP_MIN_BAL.attrValue
                this.deposit.keepMaxBal = val.mbEventInfos["DEP_"+val.prodType.prodType].mbEventAttrs.KEEP_MAX_BAL.attrValue
            },
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
