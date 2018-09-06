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
                                <v-select class="primary--text mx-2" :items="clientType" v-model="productObject.clientType" label="客户类型" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">境内外标识*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="inlandOffshore" v-model="productObject.inLandOffshore" label="境内外标识" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">客户子类型*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="clientSubType" v-model="productObject.clientSubType" label="客户子类型" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">客户等级*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="clientLevel" v-model="productObject.clientInd" label="客户等级" item-text="value" item-value="key" single-line hide-details ></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">年龄区间*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="ageSection" v-model="productObject.ageSection" label="年龄区间" item-text="value" item-value="key" single-line hide-details ></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">职业*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="profession" v-model="productObject.occupation" label="职业" item-text="value" item-value="key" single-line hide-details ></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">渠道选择*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="channelChoose" v-model="productObject.channelChoose" label="渠道选择" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
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
                                <v-select class="primary--text mx-2" :items="areaChoose" v-model="productObject.areaChoose" label="区域选择" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">适用机构*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="prodBranch" v-model="productObject.prodBranch" label="适用机构" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>

                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">机构选择*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="branchChoice" v-model="productObject.prodBranch" label="机构选择" item-text="value" item-value="key" single-line hide-details></v-select>
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
            clientType: [{
                key: "",
                value: ""
            }],
            inlandOffshore: [{
                key: "",
                value: ""
            }],
            clientSubType: [{
                key: "",
                value: ""
            }],
            clientLevel: [{
                key: "",
                value: ""
            }],
            ageSection: [{
                key: "",
                value: ""
            }],
            profession: [{
                key: "",
                value: ""
            }],
            applyArea: [{
                key: "",
                value: ""
            }],
            areaChoose: [{
                key: "",
                value: ""
            }],
            prodBranch: [{
                key: "",
                value: ""
            }],
            refData: getInitData,
            productObject: {
                clientType: '',
                inLandOffshore: '',
                clientSubType: '',
                clientLevel: '',
                ageSection: '',
                occupation: '',
                channelChoose: '',
                applyBranch: '',
                branchChoice: '',
                applyArea: '',
                areaChoose: '',
                fixedCall: '',
                clientInd: '',
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
                this.productObject.inLandOffshore = val.prodDefines.INLAND_OFFSHORE.attrValue
                this.productObject.prodBranch = val.prodDefines.APPLY_BRANCH.attrValue//适用机构
                this.productObject.clientInd = val.prodDefines.CLIENT_IND.attrValue
                this.productObject.clientSubType = val.prodDefines.CLIENT_GENERAL_TYPE.attrValue//客户子类型
                this.productObject.channelChoose = ""//渠道选择
                this.productObject.ageSection = val.prodDefines.AGE_PART.attrValue//年龄区间
                this.productObject.occupation = val.prodDefines.PROFESSION.attrValue//职业
                this.productObject.prodBranch = val.prodDefines.PROD_BRANCH.attrValue//机构选择
                this.productObject.applyArea = val.prodDefines.ADUPTER_AREA.attrValue//适用区域
                this.productObject.areaChoose = val.prodDefines.AREA_TYPE.attrValue//区域选择
            },
            initRefDate() {
                this.clientType = this.refData[2].paraDataRb.clientType;
                this.inlandOffshore = this.refData[2].paraDataRb.inlandOffshore;
                this.clientSubType = this.refData[2].paraDataRb.clientSubType;
                this.clientLevel = this.refData[2].paraDataRb.clientLevel;
                this.ageSection = this.refData[2].paraDataRb.ageSection;
                this.profession = this.refData[2].paraDataRb.occupation;
                this.channelChoose = this.refData[2].paraDataRb.channelChoose;
                this.prodBranch = this.refData[2].paraDataRb.applyBranch;
                this.branchChoice = this.refData[2].paraDataRb.branchChoice;
                this.applyArea = this.refData[2].paraDataRb.applyArea;
                this.areaChoose = this.refData[2].paraDataRb.areaChoose;
            }
        }
    }
</script>
