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
                                <dc-multiselect v-model="prodData.prodDefines.CLIENT_TYPE.attrValue" :options="clientType" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">境内外标识*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect v-model="prodData.prodDefines.INLAND_OFFSHORE.attrValue" :options="inlandOffshore" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">客户子类型*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect v-model="prodData.prodDefines.CLIENT_GENERAL_TYPE.attrValue" :options="clientSubType" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">客户等级*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect v-model="prodData.prodDefines.CLIENT_IND.attrValue" :options="clientInd" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">年龄区间*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect v-model="prodData.prodDefines.AGE_PART.attrValue" :options="ageSection" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">职业*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect v-model="prodData.prodDefines.PROFESSION.attrValue" :options="occupation" class="dcMulti"></dc-multiselect>                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">适用区域*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="applyArea" v-model="prodData.prodDefines.ADUPTER_AREA.attrValue" label="适用区域" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">区域选择*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect v-model="prodData.prodDefines.AREA_TYPE.attrValue" :options="areaChoose" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">适用机构*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="prodBranch" v-model="prodData.prodDefines.APPLY_BRANCH.attrValue" label="适用机构" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex md6 lg6>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">机构选择*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">渠道选择*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                            </v-flex>
                            <v-flex md6 lg6>
                                <v-flex md11 ml-5 class="branchCard auto">
                                    <dc-tree-select v-model="prodData.prodDefines.PROD_BRANCH.attrValue" :multiple="true" :options="branchChoice"></dc-tree-select>
                                </v-flex>
                            </v-flex>
                            <v-flex md6 lg6>
                                <v-flex md11 ml-5 class="branchCard auto">
                                    <dc-tree-select v-model="prodData.prodDefines.CHANNEL_CHOOSE.attrValue" :options="channelChoose" ></dc-tree-select>
                                </v-flex>
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
    import DcTreeSelect from "@/components/widgets/DcTreeSelect";
    import { getInitData } from "@/mock/init";
    import { getProdData } from "@/api/prod";
    export default {
        components: { DcSwitch, DcMultiselect,DcTreeSelect },
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
<style scoped>
    .branchCard {
        height: 350px;
    }
    .auto {
        margin-left: auto;
        margin-right: auto;
    }
    .dcMulti {
        margin-top: 10px;
    }

</style>