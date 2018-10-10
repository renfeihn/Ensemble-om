<template>
    <v-container fluid pr-5 pt-0>
        <v-layout row wrap>
            <v-flex xs12 md12 lg12>
                <div slot="widget-content">
                    <v-container fluid pt-1>
                        <v-layout row wrap>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">通存范围*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="draRange" v-model="prodData.prodDefines.AUTOMATIC_RANGE.attrValue" label="通存范围" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">通兑范围*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="depRange" v-model="prodData.prodDefines.CIR_EXCHANGE_RANGE.attrValue" label="通兑范围" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">转账通兑标识*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="prodData.prodDefines.TRAN_CIR_EXCG_FLAG.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">现金通兑标识*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="prodData.prodDefines.CASH_CIR_EXCG_FLAG.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">客户控制标识*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                    <dc-switch v-model="prodData.prodDefines.CLIENT_CONTRAL_FLAG.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">渠道控制标识*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="prodData.prodDefines.CHANNEL_CONT_FLAG.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">机构区域控制标识*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="prodData.prodDefines.BRC_AREA_CONT_FLAG.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">收费标识*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="prodData.prodDefines.CHARGE_TYPE.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">状态转移标识*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="prodData.prodDefines.STATUS_TRAN_FLAG.attrValue"></dc-switch>
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
                this.draRange = this.refData[2].paraDataRb.draRange;
                this.depRange = this.refData[2].paraDataRb.depRange;
                this.tDepFlag = this.refData[2].paraDataRb.tDepFlag;
                this.cashDepFlag = this.refData[2].paraDataRb.cashDepFlag;
                this.clientFlag = this.refData[2].paraDataRb.clientFlag;
                this.channelFlag = this.refData[2].paraDataRb.channelFlag;
                this.branchControlFlag = this.refData[2].paraDataRb.branchControlFlag;
                this.chargeFlag = this.refData[2].paraDataRb.chargeFlag;
                this.moveFlag = this.refData[2].paraDataRb.moveFlag;
            },
            closeDialog() {
                this.$parent.isActive = false;
            }
        }
    };
</script>
