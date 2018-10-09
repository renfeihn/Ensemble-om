<template>
    <v-container fluid pr-5 pt-0>
        <v-layout row wrap>
            <v-flex xs12 md12 lg12>
                <div slot="widget-content">
                    <v-container fluid pt-1>
                        <v-layout row wrap>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">客户类型*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect v-model="productObject.clientType" :options="clientType"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">境内外标识*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect v-model="productObject.inlandOffshore" :options="inlandOffshore"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">客户子类型*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect v-model="productObject.clientSubType" :options="clientSubType"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">客户等级*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect v-model="productObject.clientInd" :options="clientInd"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">年龄区间*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect v-model="productObject.ageSection" :options="ageSection"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">职业*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect v-model="productObject.occupation" :options="occupation"></dc-multiselect>                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">渠道选择*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect v-model="productObject.channelChoose" :options="channelChoose"></dc-multiselect>                               </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">适用区域*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="applyArea" v-model="productObject.applyArea" label="适用区域" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">区域选择*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect v-model="productObject.areaChoose" :options="areaChoose"></dc-multiselect>                               </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">适用机构*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="prodBranch" v-model="productObject.applyBranch" label="适用机构" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>

                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">机构选择*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect v-model="productObject.branchChoice" :options="branchChoice"></dc-multiselect>
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
    import DcMultiselect from '@/components/widgets/DcMultiselect'
    import { getInitData } from "@/mock/init";
    import { getProdData } from "@/api/prod";
    export default {
        components: { DcSwitch, DcMultiselect },
        filters: {
            getValues: function (key) {
                let value=[];
                if(key!=undefined){
                    value=key.split(',');
                }
                return value
            }
        },
        props: ["prodData"],
        data: () => ({
            title: null,
            refData: getInitData,
            clientType: [{
                key: '',
                value: ''
            }],
            inlandOffshore: [{
                key: '',
                value: ''
            }],
            clientSubType: [{
                key: '',
                value: ''
            }],
            clientInd: [{
                key: '',
                value: ''
            }],
            ageSection: [{
                key: '',
                value: ''
            }],
            occupation: [{
                key: '',
                value: ''
            }],
            channelChoose: [{
                key: '',
                value: ''
            }],
            applyBranch: '',
            branchChoice: [{
                key: '',
                value: ''
            }],
            applyArea: '',
            areaChoose: [{
                key: '',
                value: ''
            }],
            fixedCall: '',
            prodBranch: '',
            productObject: {
                clientType: '',
                inlandOffshore: '',
                clientSubType: '',
                clientInd: '',
                ageSection: '',
                occupation: '',
                channelChoose: '',
                applyBranch: '',
                branchChoice: '',
                applyArea: '',
                areaChoose: '',
                fixedCall: '',
                prodBranch: ''
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
                this.$emit("callBackProdObject",{"productObject": this.productObject})
            },
            selectByProd(val) {
                this.productObject = {}
                this.productObject.clientType = val.prodDefines.CLIENT_TYPE.attrValue
                this.productObject.applyBranch = val.prodDefines.APPLY_BRANCH.attrValue//适用机构
                this.productObject.inlandOffshore = val.prodDefines.INLAND_OFFSHORE.attrValue
                this.productObject.clientInd = val.prodDefines.CLIENT_IND.attrValue
                this.productObject.clientSubType = val.prodDefines.CLIENT_GENERAL_TYPE.attrValue//客户子类型
                this.productObject.channelChoose = ""//渠道选择
                this.productObject.ageSection = val.prodDefines.AGE_PART.attrValue//年龄区间
                this.productObject.occupation = val.prodDefines.PROFESSION.attrValue//职业
                this.productObject.branchChoice = val.prodDefines.PROD_BRANCH.attrValue//机构选择
                this.productObject.applyArea = val.prodDefines.ADUPTER_AREA.attrValue//适用区域
                this.productObject.areaChoose = val.prodDefines.AREA_TYPE.attrValue//区域选择
            },
            initRefDate() {
                this.clientType = this.refData[2].paraDataRb.clientType;
                this.inlandOffshore = this.refData[2].paraDataRb.inlandOffshore;
                this.clientSubType = this.refData[2].paraDataRb.clientSubType;
                this.clientInd = this.refData[2].paraDataRb.clientLevel;
                this.ageSection = this.refData[2].paraDataRb.ageSection;
                this.occupation = this.refData[2].paraDataRb.occupation;
                this.channelChoose = this.refData[2].paraDataRb.channelChoose;
                this.prodBranch = this.refData[2].paraDataRb.applyBranch;
                this.branchChoice = this.refData[2].paraDataRb.branchChoice;
                this.applyArea = this.refData[2].paraDataRb.applyArea;
                this.areaChoose = this.refData[2].paraDataRb.areaChoose;
            }
        }
    }
</script>
