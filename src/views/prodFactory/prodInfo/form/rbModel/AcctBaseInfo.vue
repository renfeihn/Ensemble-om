<template>
    <v-container fluid pr-5 pt-0>
        <div slot="widget-content">
            <v-container fluid pt-1>
                <v-layout row wrap>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">产品代码*</v-subheader>
                    </v-flex>
                    <v-flex md3 lg3>
                        <v-text-field class="primary--text mx-1" name="title" v-model="prodData.prodType.prodType" disabled single-line hide-details></v-text-field>
                    </v-flex>
                    <v-flex md1 lg1>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">产品描述*</v-subheader>
                    </v-flex>
                    <v-flex md3 lg3>
                        <v-text-field class="primary--text mx-1" name="title" v-model="prodData.prodType.prodDesc" disabled single-line hide-details></v-text-field>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">业务模块*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.prodDefines.SOURCE_MODULE" :options="sourceModule" :isMultiSelect="false" :perShow="true"></dc-multiselect>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">产品分类*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.prodType.prodClass" :options="prodClass" :isMultiSelect="false"></dc-multiselect>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">产品属性*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.prodType.prodRange" :options="prodAttr" :isMultiSelect="false"></dc-multiselect>
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
                        <dc-multiselect v-model="prodData.prodType.status" :options="prodStatus" :isMultiSelect="false"></dc-multiselect>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">基础产品*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.prodType.baseProdType" :options="baseprodtype" :isMultiSelect="false"></dc-multiselect>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">生效日期*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-date v-model="prodData.prodDefines.PROD_START_DATE" label="生效日期" :perShow="true"></dc-date>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">失效日期*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-date v-model="prodData.prodDefines.PROD_END_DATE" label="失效日期" :perShow="true"></dc-date>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">利润中心*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.prodDefines.PROFIT_CENTRE" :options="profitCentre" :isMultiSelect="false" :perShow="true"></dc-multiselect>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">计息标志*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.prodDefines.ACCT_INT_FLAG" :options="acctIntFlag" :isMultiSelect="false" :perShow="true"></dc-multiselect>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">是否多币种*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-switch v-model="prodData.prodDefines.MULTI_CCY" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">币种*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.prodDefines.CCY" :options="ccy" :perShow="true"></dc-multiselect>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">是否多凭证*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-switch v-model="prodData.prodDefines.DOC_FLAG" :perShow="true"></dc-switch>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">凭证类型*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.prodDefines.DOC_TYPE" :options="docType" :perShow="true"></dc-multiselect>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">账户类型*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.prodDefines.ACCT_TYPE" :options="acctType" :isMultiSelect="false" :perShow="true"></dc-multiselect>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">账户子类型*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.prodDefines.FIXED_CALL" :options="subAcctType" :isMultiSelect="false" :perShow="true"></dc-multiselect>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">账户属性*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.prodDefines.ACCT_NATURE" :options="acctNature" :perShow="true"></dc-multiselect>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">关系属性*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.prodDefines.OWNERSHIP_TYPE" :options="ownerShipType" :perShow="true"></dc-multiselect>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">账户类别*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.prodDefines.ACCT_CLASS" :options="acctClass" :isMultiSelect="false" :perShow="true"></dc-multiselect>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">余额类别*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.prodDefines.BAL_TYPE" :options="balType" :isMultiSelect="false" :perShow="true"></dc-multiselect>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">支取方式*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.prodDefines.WITHDRAWAL_TYPE" :options="withdrawalType" :isMultiSelect="false" :perShow="true"></dc-multiselect>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <v-subheader class="primary--text subheading">折算币种*</v-subheader>
                    </v-flex>
                    <v-flex md4 lg4>
                        <dc-multiselect v-model="prodData.prodDefines.CONVERT_CCY" :options="discountCcy" :isMultiSelect="false" :perShow="true"></dc-multiselect>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </v-container>
</template>

<script>
    import DcSwitch from "@/components/widgets/DcSwitch";
    import DcMultiselect from '@/components/widgets/DcMultiselect'
    import DcTextField from '@/components/widgets/DcTextField'
    import { getInitData } from "@/mock/init";
    import DcDate from '@/components/widgets/DcDate'

    export default {
        components: { DcSwitch, DcMultiselect,DcDate,DcTextField},
        props: ["prodData"],
        data: () => ({
            title: null,
            mult: true,
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