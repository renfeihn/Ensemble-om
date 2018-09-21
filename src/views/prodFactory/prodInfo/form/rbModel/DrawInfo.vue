<template>
    <v-container fluid pr-5 pt-0>
        <v-layout row wrap>
            <v-flex xs12 md12 lg12>
                <div slot="widget-content">
                    <v-container fluid pt-1>
                        <v-layout row wrap>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">支取控制方式*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="drawControlWay" v-model="drawInfo.drawControlWay" label="支取控制方式" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">是否允许代办*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <!--
                                                            <v-select class="primary&#45;&#45;text mx-2" :items="daiBanFlag" v-model="drawInfo.daiBanFlag" label="是否允许代办" item-text="value" item-value="key" single-line hide-details></v-select>
                                -->
                                <dc-switch v-model="drawInfo.checkAgent"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">资金去向方式*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="cashResource" v-model="drawInfo.cashResource" label="资金去向方式" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">账户限制检查*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <!--
                                                            <v-select class="primary&#45;&#45;text mx-2" :items="attrReatraintCheck" v-model="drawInfo.attrReatraintCheck" label="账户限制检查" item-text="value" item-value="key" single-line hide-details></v-select>
                                -->
                                <dc-switch v-model="drawInfo.attrReatraintCheck"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">支取方式检查*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <!--
                                                            <v-select class="primary&#45;&#45;text mx-2" :items="withDrawlCheck" v-model="drawInfo.withDrawlCheck" label="支取方式检查" item-text="value" item-value="key" single-line hide-details></v-select>
                                -->
                                <dc-switch v-model="drawInfo.withDrawlCheck"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">凭证类型检查*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <!--
                                                            <v-select class="primary&#45;&#45;text mx-2" :items="voucherTypeCheck" v-model="drawInfo.voucherTypeCheck" label="凭证类型检查" item-text="value" item-value="key" single-line hide-details></v-select>
                                -->
                                <dc-switch v-model="drawInfo.voucherTypeCheck"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">支取违约类型*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="breakType" v-model="drawInfo.breakType" label="支取违约类型" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">违约处理方式*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="dealingWay" v-model="drawInfo.dealingWay" label="违约处理方式" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">单次支取金额检查*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <!--
                                                            <v-select class="primary&#45;&#45;text mx-2" :items="sgBalCheck" v-model="drawInfo.sgBalCheck" label="单次支取金额检查" item-text="value" item-value="key" single-line hide-details></v-select>
                                -->
                                <dc-switch v-model="drawInfo.sgBalCheck"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">最小支取金额*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-text-field class="primary--text mx-1" label="最小支取金额" name="sgMinAmt" v-model="drawInfo.sgMinAmt" single-line hide-details></v-text-field>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">最大支取金额*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-text-field class="primary--text mx-1" label="最大支取金额" name="sgMaxAmt" v-model="drawInfo.sgMaxAmt" single-line hide-details></v-text-field>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">账户留存余额检查*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <!--
                                                            <v-select class="primary&#45;&#45;text mx-2" :items="acctBalanceCheck" v-model="drawInfo.acctBalanceCheck" label="账户留存余额检查" item-text="value" item-value="key" single-line hide-details></v-select>
                                -->
                                <dc-switch v-model="drawInfo.acctBalanceCheck"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">最小留存余额*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-text-field class="primary--text mx-1" label="最小留存余额" name="keepMinBal" v-model="drawInfo.keepMinBal" single-line hide-details></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { getInitData } from "@/mock/init";
    import { getProdData } from "@/api/prod";
    import DcSwitch from "@/components/widgets/DcSwitch";
    export default {
        components: {DcSwitch},
        props: ["prodData"],
        data: () => ({
            title: null,
            drawControlWay: [{
                key: "",
                value: ""
            }],
            daiBanFlag: [{
                key: "N",
                value: "N-否"
            }],
            cashResource: [{
                key: "",
                value: ""
            }],
            attrReatraintCheck: [{
                key: "",
                value: ""
            }],
            withDrawlCheck: [{
                key: "",
                value: ""
            }],
            voucherTypeCheck: [{
                key: "",
                value: ""
            }],
            breakType: [{
                key: "",
                value: ""
            }],
            dealingWay: [{
                key: "",
                value: ""
            }],
            singleTimeBalCheck: [{
                key: "",
                value: ""
            }],
            acctBalanceCheck: [{
                key: "",
                value: ""
            }],
            refData: getInitData,
            drawInfo: {
                drawControlWay: '',
                checkAgent: '',
               // daiBanFlag: '',
                cashResource: '',
                attrReatraintCheck: '',
                withDrawlCheck: '',
                voucherTypeCheck: '',
                breakType: '',
                dealingWay: '',
                sgBalCheck: '',
                acctBalanceCheck: '',
                sgMinAmt: '',
                sgMaxAmt: '',
                keepMinBal: ''
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
                this.$emit("callBackDrawInfo",{"drawInfo": this.drawInfo})
            },
            selectByProd(val) {
                this.drawInfo = {}
                this.drawInfo.drawControlWay = val.mbEventInfos["WTD_"+val.prodType.prodType].mbEventAttrs.WITHDRAWAL_TYPE.attrValue
                this.drawInfo.checkAgent = val.mbEventInfos["WTD_"+val.prodType.prodType].mbEventAttrs.AGENT_FLAG.attrValue
                this.drawInfo.cashResource = val.mbEventInfos["WTD_"+val.prodType.prodType].mbEventAttrs.FUND_TRAN_TYPE.attrValue
                this.drawInfo.dealingWay = val.drawInfo.dealingWay;
                this.drawInfo.breakType = val.drawInfo.breakType;
                this.drawInfo.attrReatraintCheck = val.mbEventInfos["WTD_"+val.prodType.prodType].mbEventAttrs.CHECK_RESTRAINT.attrValue
                this.drawInfo.withDrawlCheck = val.mbEventInfos["WTD_"+val.prodType.prodType].mbEventAttrs.CHECK_WDRAWN_TYPE.attrValue
                this.drawInfo.voucherTypeCheck = val.drawInfo.voucherTypeCheck;
                this.drawInfo.sgMinAmt = val.mbEventInfos["WTD_"+val.prodType.prodType].mbEventAttrs.SG_MIN_AMT.attrValue
                this.drawInfo.sgBalCheck = val.drawInfo.sgBalCheck;
                this.drawInfo.acctBalanceCheck = val.mbEventInfos["WTD_"+val.prodType.prodType].mbEventAttrs.CHECK_KEEP_BAL.attrValue
                this.drawInfo.sgMaxAmt = val.mbEventInfos["WTD_"+val.prodType.prodType].mbEventAttrs.SG_MAX_AMT.attrValue
                this.drawInfo.keepMinBal = val.mbEventInfos["WTD_"+val.prodType.prodType].mbEventAttrs.KEEP_MIN_BAL.attrValue
            },
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
