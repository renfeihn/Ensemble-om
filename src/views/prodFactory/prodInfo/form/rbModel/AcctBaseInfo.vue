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
                                <v-text-field class="primary--text mx-1" label="产品代码" name="title" v-model="acctBaseInfo.prodType" single-line hide-details disabled></v-text-field>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">产品描述*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-text-field class="primary--text " label="产品描述" name="title" v-model="acctBaseInfo.prodDesc" single-line hide-details disabled/>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">业务模块*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " @change="isSelectCcy" :items="sourceModule" v-model="acctBaseInfo.sourceModule" label="业务模块" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">产品分类*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="prodClass" v-model="acctBaseInfo.prodClass" label="产品分类" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">产品属性*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="prodAttr" v-model="acctBaseInfo.prodRange" label="产品属性" item-text="value" item-value="key" value="'S'" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">组合产品*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <!--
                                                                <v-select class="primary&#45;&#45;text " :items="isGroup" v-model="acctBaseInfo.prodGroup" label="组合产品" item-text="value" item-value="key" single-line hide-details></v-select>
                                -->
                                <dc-switch v-model="acctBaseInfo.prodGroup"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">产品状态*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="prodStatus" v-model="acctBaseInfo.status" label="产品状态" item-text="value" item-value="key" value="A" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">基础产品*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="baseprodtype" v-model="acctBaseInfo.baseProdType" label="基础产品" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">生效日期*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-menu ref="startDateMenu" lazy :close-on-content-click="false" v-model="startDateMenu" transition="scale-transition" offset-y full-width :nudge-bottom="-22" min-width="290px" :return-value.sync="startDate">
                                    <v-text-field slot="activator" label="生效日期" v-model="acctBaseInfo.prodStartDate" append-icon="event" single-line hide-details></v-text-field>
                                    <v-date-picker v-model="acctBaseInfo.prodStartDate" @input="$refs.startDateMenu.save(prodStartDate)" no-title scrollable locale="zh-cn"></v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">失效日期*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-menu ref="endDateMenu" lazy :close-on-content-click="false" v-model="endDateMenu" transition="scale-transition" offset-y full-width :nudge-bottom="-22" min-width="290px" :return-value.sync="endDate">
                                    <v-text-field slot="activator" label="失效日期" v-model="acctBaseInfo.prodEndDate" append-icon="event" single-line hide-details></v-text-field>
                                    <v-date-picker v-model="acctBaseInfo.prodEndDate" @input="$refs.endDateMenu.save(prodEndDate)" no-title scrollable locale="zh-cn"></v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">利润中心*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="profitCentre" v-model="acctBaseInfo.profitCenter" label="利润中心" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">计息标志*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="acctIntFlag" v-model="acctBaseInfo.acctIntFlag" label="计息标志" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>

                            <!--<v-flex xs12>-->
                            <!--</v-flex>-->
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">是否多币种*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="acctBaseInfo.multiCcy"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">币种*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect v-model="acctBaseInfo.ccy" :options="ccy"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">是否多凭证*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="acctBaseInfo.docFlag"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">凭证类型*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="voucherType" v-model="acctBaseInfo.docType" label="" item-text="value" item-value="key" multiple chips FAsingle-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">账户类型*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="acctType" v-model="acctBaseInfo.acctType" label="账户类型" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">账户子类型*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="subAcctType" v-model="acctBaseInfo.fixedCall" label="账户子类型" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">账户属性*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="acctNature" v-model="acctBaseInfo.acctNature" label="" item-text="value" item-value="key" multiple chips FAsingle-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">关系属性*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="ownershipType" v-model="acctBaseInfo.ownerShipType" label="" item-text="value" item-value="key" multiple chips FAsingle-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">账户类别*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="acctClass" v-model="acctBaseInfo.acctClass" label="账户类别" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">余额类别*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select :items="balType" v-model="acctBaseInfo.balType" label="余额类别" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">支取方式*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text " :items="withdrawalType" v-model="acctBaseInfo.withdrawalType" label="支取方式" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">折算币种*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select :items="discountCcy" v-model="acctBaseInfo.discountCcy" label="折算币种" item-text="value" item-value="key" single-line hide-details></v-select>
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
            prodtypeData: "",
            startDateMenu: false,
            endDate: null,
            endDateMenu: false,
            startDate: null,
            proddescData: "",
            ccy: [{
                key: '',
                value: ''
            }],
            refData: getInitData,
            acctBaseInfo: {
                prodType: '',
                prodDesc: '',
                prodClass: '',
                prodGroup: '',
                prodRange: '',
                baseProdType: '',
                status: '',
                prodStartDate: '',
                prodEndDate: '',
                intDay: '',
                sourceModule: '',
                profitCenter: '',
                multiCcy: '',
                docType: '',
                acctType: '',
                fixedCall: '',
                acctNature: '',
                ownerShipType: '',
                acctClass: '',
                balType: '',
                withdrawalType: '',
                defaultCcy: '',
                discountCcy: '',
                dodcFlag: '',
                withDrawaType: '',
                acctIntFlag: '',
                docFlag: ''
            }
        }),
        computed: {
            progress() {
                return Math.min(100, this.value.length * 10);
            }
        },
        watch: {
            prodData(val) {
                this.updateBaseInfo(val)
            }
        },
        mounted() {
            this.initRefDate();
        },
        methods: {
            callbackprod() {
                this.$emit("callBackAcctBaseInfo",{"acctBaseInfo": this.acctBaseInfo})
            },
            isSelectCcy(){
                console.log(this.acctBaseInfo.isMultiCcy);
                if(this.acctBaseInfo.isMultiCcy === 'Y'){
                    this.$refs.ccy.multiple='true'
                }else{
                    this.$refs.ccy.multiple='false'
                }
            },
            updateBaseInfo(val) {
                this.acctBaseInfo = {}
                this.acctBaseInfo.prodType = val.prodType.prodType
                this.acctBaseInfo.prodDesc = val.prodType.prodDesc
                this.acctBaseInfo.prodClass = val.prodType.prodClass
                this.acctBaseInfo.prodGroup = val.prodType.prodGroup
                this.acctBaseInfo.prodRange = val.prodType.prodRange
                this.acctBaseInfo.status = val.prodType.status
                this.acctBaseInfo.baseProdType = val.prodType.baseProdType
                this.acctBaseInfo.sourceModule = val.prodDefines.SOURCE_MODULE.attrValue
                var str = val.prodDefines.PROD_START_DATE.attrValue
                this.acctBaseInfo.prodStartDate = str.substr(0,4)+"-"+str.substr(4,2)+"-"+str.substr(6,2)
                this.acctBaseInfo.profitCenter = val.prodDefines.PROFIT_CENTRE.attrValue
                this.acctBaseInfo.multiCcy = val.prodDefines.MULTI_CCY.attrValue
                var str1 = val.prodDefines.PROD_END_DATE.attrValue
                this.acctBaseInfo.prodEndDate = str1.substr(0,4)+"-"+str1.substr(4,2)+"-"+str1.substr(6,2)
                this.acctBaseInfo.acctIntFlag = val.prodDefines.ACCT_INT_FLAG.attrValue
                let docType=val.prodDefines.DOC_TYPE.attrValue;
                if(docType!=undefined){
                this.acctBaseInfo.docType =docType.split(',');
                }
                this.acctBaseInfo.acctType = val.prodDefines.ACCT_TYPE.attrValue
                //  this.acctBaseInfo.fixedCall = val.prodDefines.FIXED_CALL.attrValue
                this.acctBaseInfo.fixedCall = val.prodDefines.FIXED_CALL.attrValue
                let acctNature=val.prodDefines.ACCT_NATURE.attrValue
                if(acctNature!=undefined) {
                    this.acctBaseInfo.acctNature = acctNature.split(',');
                }
                let ownerShipType= val.prodDefines.OWNERSHIP_TYPE.attrValue
                if(ownerShipType!=undefined) {
                    this.acctBaseInfo.ownerShipType = ownerShipType.split(',')
                }
                this.acctBaseInfo.acctClass = val.prodDefines.ACCT_CLASS.attrValue
                this.acctBaseInfo.balType = val.prodDefines.BAL_TYPE.attrValue
                this.acctBaseInfo.withdrawalType = val.prodDefines.WITHDRAWAL_TYPE.attrValue

                    this.acctBaseInfo.ccy = val.prodDefines.CCY.attrValue;
                this.acctBaseInfo.docFlag = val.prodDefines.DOC_FLAG.attrValue

                this.acctBaseInfo.discountCcy = val.prodDefines.CONVERT_CCY.attrValue
            },
            selectByProd() {
                getProdData(this.listValue).then(response => {
                    this.prodtypeData = this.listValue;
                    this.proddescData = response.data.prodFrom.proddesc;
                    this.sourceModule = response.data.prodFrom.sourceModule;
                    this.prodClass = response.data.prodFrom.prodClass;
                    this.prodAttr = response.data.prodFrom.prodAttr;
                    this.isGroup = response.data.prodFrom.isGroup;
                    this.prodStatus = response.data.prodFrom.prodStatus;
                    this.baseprodtype = response.data.prodFrom.baseprodtype;
                    this.acctType = response.data.prodFrom.acctType;
                    this.subAcctType = response.data.prodFrom.subAcctType;
                    this.isMultiCcy = response.data.prodFrom.isMultiCcy;
                    this.ccy = response.data.prodFrom.ccy;
                    this.acctIntFlag = response.data.prodFrom.acctIntFlag;
                    this.profitCentre = response.data.prodFrom.profitCentre;
                    this.withdrawalType = response.data.prodFrom.withdrawalType;
                });
            },
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
                this.ownershipType = this.refData[2].paraDataRb.ownershipType;
                this.acctClass = this.refData[2].paraDataRb.acctClass;
                this.balType = this.refData[2].paraDataRb.balType;
                this.withdrawalType = this.refData[2].paraDataRb.withdrawalType;
                this.discountCcy = this.refData[2].paraDataRb.discountCcy;
                this.acctClass = this.refData[2].paraDataRb.acctClass;
                this.fixedCall = this.refData[2].paraDataRb.fixedCall;
                this.multiCcy = this.refData[2].paraDataRb.multiCcy;
                this.docFlag = this.refData[2].paraDataRb.docFlag;
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
</style>
