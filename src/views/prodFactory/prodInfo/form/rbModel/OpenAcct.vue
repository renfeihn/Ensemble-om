<template>
    <v-container fluid pr-5 pt-0>
        <v-layout row wrap>
            <v-flex xs12 md12 lg12>
                <div slot="widget-content">
                    <v-container fluid pt-1>
                        <v-layout row wrap>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">账号生成规则*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="structureType" v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.STRUCTURE_TYPE.attrValue" label="账号生成规则" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">账号前缀*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-text-field class="primary--text mx-1" label="账号前缀" name="prefix" v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.ACCT_PREFIX.attrValue" single-line hide-details>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">支取方式处理*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                 <v-select class="primary--text mx-2" :items="checkWdrawnType" v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.WITHDRAWAL_TYPE.attrValue" label="支取方式处理" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">账户限制处理*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.CHECK_RESTRAINT.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">凭证类型处理*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.DOC_TYPE_DEAL.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">是否允许代办*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.AGENT_FLAG.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">同客户数量检查标识*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.CHECK_CLIENT_NUM_FLAG.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">同客户允许最大数量*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-text-field class="primary--text mx-1" label="同客户允许最大数量" name="numOfClient" v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.NUM_OF_CLIENT.attrValue" single-line hide-details></v-text-field>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">起息日处理标识*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.START_INT_DATE_FALG.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">最大倒起息天数*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-text-field class="primary--text mx-1" label="最大倒起息天数" name="maxBackDateDays" v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.MAX_BACK_DATE_DAYS.attrValue" single-line hide-details></v-text-field>

                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">最大起息天数*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-text-field class="primary--text mx-1" label="最大起息天数" name="maxDay" v-model="prodData.mbEventInfos['OPEN_'+prodData.prodType.prodType].mbEventAttrs.MAX_RATE_DAYS.attrValue" single-line hide-details></v-text-field>
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
        components: {DcSwitch},
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
                this.structureType = this.refData[2].paraDataRb.structureType;
                this.checkWdrawnType = this.refData[2].paraDataRb.checkWdrawnType;
                this.restraintFlag = this.refData[2].paraDataRb.restraintFlag;
                this.withdrawTypeHandeling = this.refData[2].paraDataRb.withdrawTypeHandeling;
                this.checkAgent = this.refData[2].paraDataRb.checkAgent;
                this.clientAmtCheckFlag = this.refData[2].paraDataRb.clientAmtCheckFlag;
                this.startDepositAmt = this.refData[2].paraDataRb.startDepositAmt;
            },
            closeDialog() {
                this.$parent.isActive = false;
            }
        }
    };
</script>
