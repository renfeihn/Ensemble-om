<template>
    <v-container fluid pr-5 pt-0>
        <v-layout row wrap>
            <v-flex xs12 md12 lg12>
                <div slot="widget-content">
                    <v-container fluid pt-1>
                        <v-layout row wrap>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">产品代码*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-text-field class="primary--text mx-1" label="产品代码" name="title" v-model="prodData.prodType.prodType" single-line hide-details disabled></v-text-field>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">产品描述*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-text-field class="primary--text " label="产品描述" name="title" v-model="prodData.prodType.prodDesc" single-line hide-details disabled/>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">业务模块*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="sourceModule" v-model="prodData.prodDefines.SOURCE_MODULE.attrValue" label="业务模块" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">产品分类*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="prodClass" v-model="prodData.prodType.prodClass" label="产品分类" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">产品属性*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="prodAttr" v-model="prodData.prodType.prodRange" label="产品属性" item-text="value" item-value="key" value="'S'" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">组合产品*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>

                                <dc-switch v-model="prodData.prodType.prodGroup"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">产品状态*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="prodStatus" v-model="prodData.prodType.status" label="产品状态" item-text="value" item-value="key" value="A" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">基础产品*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="baseprodtype" v-model="prodData.prodType.baseProdType" label="基础产品" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">生效日期*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-menu ref="startDateMenu" lazy :close-on-content-click="false" v-model="startDateMenu" transition="scale-transition" offset-y full-width :nudge-bottom="-22" min-width="290px" :return-value.sync="startDate">
                                    <v-text-field slot="activator" label="生效日期" v-model="prodData.prodDefines.PROD_START_DATE.attrValue" append-icon="event" single-line hide-details></v-text-field>
                                    <v-date-picker v-model="prodData.prodDefines.PROD_START_DATE.attrValue" @input="$refs.startDateMenu.save(prodData.prodDefines.PROD_START_DATE.attrValue)" no-title scrollable locale="zh-cn"></v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">失效日期*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-menu ref="endDateMenu" lazy :close-on-content-click="false" v-model="endDateMenu" transition="scale-transition" offset-y full-width :nudge-bottom="-22" min-width="290px" :return-value.sync="endDate">
                                    <v-text-field slot="activator" label="失效日期" v-model="prodData.prodDefines.PROD_END_DATE.attrValue" append-icon="event" single-line hide-details></v-text-field>
                                    <v-date-picker v-model="prodData.prodDefines.PROD_END_DATE.attrValue" @input="$refs.endDateMenu.save(prodData.prodDefines.PROD_END_DATE.attrValue)" no-title scrollable locale="zh-cn"></v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">利润中心*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="profitCentre" v-model="prodData.prodDefines.PROFIT_CENTRE.attrValue" label="利润中心" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">计息标志*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="acctIntFlag" v-model="prodData.prodDefines.ACCT_INT_FLAG.attrValue" label="计息标志" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>

                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">是否多币种*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="prodData.prodDefines.MULTI_CCY.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">币种*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect v-model="prodData.prodDefines.CCY.attrValue" :options="ccy" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">是否多凭证*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="prodData.prodDefines.DOC_FLAG.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">凭证类型*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect v-model="prodData.prodDefines.DOC_TYPE.attrValue" :options="docType" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">账户类型*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="acctType" v-model="prodData.prodDefines.ACCT_TYPE.attrValue" label="账户类型" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">账户子类型*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="subAcctType" v-model="prodData.prodDefines.FIXED_CALL.attrValue" label="账户子类型" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">账户属性*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect v-model="prodData.prodDefines.ACCT_NATURE.attrValue" :options="acctNature" class="dcMulti"></dc-multiselect>

                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">关系属性*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect v-model="prodData.prodDefines.OWNERSHIP_TYPE.attrValue" :options="ownerShipType" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">账户类别*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="acctClass" v-model="prodData.prodDefines.ACCT_CLASS.attrValue" label="账户类别" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">余额类别*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select :items="balType" v-model="prodData.prodDefines.BAL_TYPE.attrValue" label="余额类别" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">支取方式*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="withdrawalType" v-model="prodData.prodDefines.WITHDRAWAL_TYPE.attrValue" label="支取方式" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">折算币种*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select :items="discountCcy" v-model="prodData.prodDefines.CONVERT_CCY.attrValue" label="折算币种" item-text="value" item-value="key" single-line hide-details></v-select>
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
    import DcMultiselect from '@/components/widgets/DcMultiselect'
    import { getProdData } from "@/api/prod";
    export default {
        components: { DcSwitch, DcMultiselect },
        props: ["prodData"],
        data: () => ({
            title: null,
            startDateMenu: false,
            endDate: null,
            endDateMenu: false,
            mult: true,
            startDate: null,
            ccy: [{
                key: '',
                value: ''
            }],
            docType: [{
                key: '',
                value: ''
            }],
            acctNature: [{
                key: '',
                value: ''
            }],
            ownerShipType: [{
                key: '',
                value: ''
            }],
            sourceModule: [{
                key: '',
                value: ''
            }],
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
                this.sourceModule = this.refData[2].paraDataRb.sourceModule;
                this.prodClass = this.refData[2].paraDataRb.prodClass;
                this.prodAttr = this.refData[2].paraDataRb.prodAttr;
                this.isGroup = this.refData[2].paraDataRb.isGroup;
                this.prodStatus = this.refData[2].paraDataRb.prodStatus;
                this.baseprodtype = this.refData[2].paraDataRb.baseprodtype;
                this.subAcctType = this.refData[2].paraDataRb.subAcctType;
                this.isMultiCcy = this.refData[2].paraDataRb.isMultiCcy;
                this.ccy = this.refData[2].paraDataRb.ccy;
                this.acctIntFlag = this.refData[2].paraDataRb.acctIntFlag;
                this.profitCentre = this.refData[2].paraDataRb.profitCentre;
                this.voucherType = this.refData[2].paraDataRb.voucherType;
                this.acctType = this.refData[2].paraDataRb.acctType;
                this.acctSubType = this.refData[2].paraDataRb.acctSubType;
                this.acctNature = this.refData[2].paraDataRb.acctNature;
                this.ownerShipType = this.refData[2].paraDataRb.ownershipType;
                this.acctClass = this.refData[2].paraDataRb.acctClass;
                this.balType = this.refData[2].paraDataRb.balType;
                this.withdrawalType = this.refData[2].paraDataRb.withdrawalType;
                this.discountCcy = this.refData[2].paraDataRb.discountCcy;
                this.acctClass = this.refData[2].paraDataRb.acctClass;
                this.fixedCall = this.refData[2].paraDataRb.fixedCall;
                this.multiCcy = this.refData[2].paraDataRb.multiCcy;
                this.docFlag = this.refData[2].paraDataRb.docFlag;
                this.docType = this.refData[2].paraDataRb.docType;
            },
            closeDialog() {
                this.$parent.isActive = false;
            }
        }
    };
</script>
<style scoped>
    .top {
        padding-top: 8px;
    }
    .depositTree {
        height: calc(90vh - 48px);
    }
    .line_02{
        height: 3px;
        border-top: 2px solid #ddd;
        text-align: center;
    }
    .dcMulti {
        margin-top: 10px;
    }

</style>
