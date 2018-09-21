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
                               <v-select class="primary--text mx-2" :items="systemControlApproach" v-model="closeAcct.systemControlApproach" label="存入控制方式" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                               <v-subheader class="primary--text subheading">是否允许代办*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
<!--
                               <v-select class="primary&#45;&#45;text mx-2" :items="permitCommersionFlag" v-model="closeAcct.permitCommersionFlag" label="是否允许代办" item-text="value" item-value="key" single-line hide-details></v-select>
-->
                                <dc-switch v-model="closeAcct.permitCommersionFlag"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                 <v-subheader class="primary--text subheading">资金来源方式*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="cashResouce" v-model="closeAcct.cashResouce" label="资金来源方式" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">账户限制检查*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
<!--
                                 <v-select class="primary&#45;&#45;text mx-2" :items="acctReatraintCheck" v-model="closeAcct.acctReatraintCheck" label="账户限制检查" item-text="value" item-value="key" single-line hide-details></v-select>
-->
                                <dc-switch v-model="closeAcct.acctReatraintCheck"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                 <v-subheader class="primary--text subheading">签约检查*</v-subheader>
                            </v-flex>
                             <v-flex md4 lg4>
<!--
                                 <v-select class="primary&#45;&#45;text mx-2" :items="resignCheck" v-model="closeAcct.resignCheck" label="签约检查" item-text="value" item-value="key" single-line hide-details></v-select>
-->
                                 <dc-switch v-model="closeAcct.resignCheck"></dc-switch>
                             </v-flex>
                            <v-flex xs12 md2 lg2>
                                   <v-subheader class="primary--text subheading">欠费检查*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
<!--
                                   <v-select class="primary&#45;&#45;text mx-2" :items="ownCheck" v-model="closeAcct.ownCheck" label="欠费检查" item-text="value" item-value="key" single-line hide-details></v-select>
-->
                                <dc-switch v-model="closeAcct.ownCheck"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                   <v-subheader class="primary--text subheading">是否允许销户回退*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
<!--
                                   <v-select class="primary&#45;&#45;text mx-2" :items="closeAcctRollbackFlag" v-model="closeAcct.closeAcctRollbackFlag" label="是否允许销户回退" item-text="value" item-value="key" single-line hide-details></v-select>
-->
                                <dc-switch v-model="closeAcct.closeAcctRollbackFlag"></dc-switch>
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
        components: { DcSwitch },
        props: ["prodData"],
        data: () => ({
            title: null,
            systemControlApproach: [{
                key: "",
                value: ""
            }],
            permitCommersionFlag: [{
                key: "",
                value: ""
            }],
            cashResouce: [{
                key: "",
                value: ""
            }],
            acctReatraintCheck: [{
                key: "",
                value: ""
            }],
            resignCheck: [{
                key: "",
                value: ""
            }],
            ownCheck: [{
                key: "",
                value: ""
            }],
            huiTuiFlag: [{
                key: "",
                value: ""
            }],
            refData: getInitData,
            closeAcct: {
                systemControlApproach: '',
                permitCommersionFlag: '',
                cashResouce: '',
                acctReatraintCheck: '',
                resignCheck: '',
                ownCheck: '',
                closeAcctRollbackFlag: ''
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
                this.$emit("callBackCloseAcct",{"closeAcct": this.closeAcct})
            },
            selectByProd(val) {
                this.closeAcct = {}
                  this.closeAcct.systemControlApproach = ""//存入控制
                  this.closeAcct.permitCommersionFlag = val.mbEventInfos["CLOSE_"+val.prodType.prodType].mbEventAttrs.AGENT_FLAG.attrValue
                  this.closeAcct.cashResouce = ""//资金来源方式
                  this.closeAcct.acctReatraintCheck = val.mbEventInfos["CLOSE_"+val.prodType.prodType].mbEventAttrs.CHECK_RESTRAINT.attrValue
                  this.closeAcct.resignCheck = val.mbEventAttrs["CLOSE_"+val.prodType.prodType].mbEventAttrs.CHECK_SIGN.attrValue
                  this.closeAcct.ownCheck = val.mbEventInfos["CLOSE_"+val.prodType.prodType].mbEventAttrs.CHECK_CLOSE_FEE.attrValue
                  this.closeAcct.closeAcctRollbackFlag = ""//是否允许西销户回退
            },
            initRefDate() {
                this.systemControlApproach = this.refData[2].paraDataRb.systemControlApproach;
                this.permitCommersionFlag = this.refData[2].paraDataRb.permitCommersionFlag;
                this.cashResouce = this.refData[2].paraDataRb.cashResouce;
                this.acctReatraintCheck = this.refData[2].paraDataRb.acctReatraintCheck;
                this.resignCheck = this.refData[2].paraDataRb.resignCheck;
                this.ownCheck = this.refData[2].paraDataRb.ownCheck;
                this.huiTuiFlag = this.refData[2].paraDataRb.huiTuiFlag;
            }
        }
    }
</script>
