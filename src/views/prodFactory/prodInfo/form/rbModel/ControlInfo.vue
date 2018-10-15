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
                            <v-flex md3 lg3>
                                <v-select class="primary--text mx-2" :items="draRange" v-model="prodData.prodDefines.AUTOMATIC_RANGE.attrValue" label="通存范围" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex md1 lg1>
                                <v-tooltip right :color="colorFalg">
                                        <v-btn flat small :color="colorFalg" icon="people" slot="activator" class="left" @click="colorClick">
                                        <v-icon>people</v-icon>
                                    </v-btn>
                                    <span>{{flag}}</span>
                                </v-tooltip>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">通兑范围*</v-subheader>
                            </v-flex>
                            <v-flex md3 lg3>
                                <v-select class="primary--text mx-2" :items="depRange" v-model="prodData.prodDefines.CIR_EXCHANGE_RANGE.attrValue" label="通兑范围" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex md1 lg1>
                                <v-tooltip right :color="colorFalg1">
                                    <v-btn flat small :color="colorFalg1" icon="people" slot="activator" class="left" @click="colorClick1">
                                        <v-icon>people</v-icon>
                                    </v-btn>
                                    <span>{{flag1}}</span>
                                </v-tooltip>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">转账通兑标识*</v-subheader>
                            </v-flex>
                            <v-flex md3 lg3>
                                <dc-switch v-model="prodData.prodDefines.TRAN_CIR_EXCG_FLAG.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex md1 lg1>
                                <v-tooltip right :color="colorFalg2">
                                    <v-btn flat small :color="colorFalg2" icon="people" slot="activator" class="left" @click="colorClick2">
                                        <v-icon>people</v-icon>
                                    </v-btn>
                                    <span>{{flag2}}</span>
                                </v-tooltip>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">现金通兑标识*</v-subheader>
                            </v-flex>
                            <v-flex md3 lg3>
                                <dc-switch v-model="prodData.prodDefines.CASH_CIR_EXCG_FLAG.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex md1 lg1>
                                <v-tooltip right :color="colorFalg3">
                                    <v-btn flat small :color="colorFalg3" icon="people" slot="activator" class="left" @click="colorClick3">
                                        <v-icon>people</v-icon>
                                    </v-btn>
                                    <span>{{flag3}}</span>
                                </v-tooltip>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">客户控制标识*</v-subheader>
                            </v-flex>
                            <v-flex md3 lg3>
                                <dc-switch v-model="prodData.prodDefines.CLIENT_CONTRAL_FLAG.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex md1 lg1>
                                <v-tooltip right :color="colorFalg4">
                                    <v-btn flat small :color="colorFalg4" icon="people" slot="activator" class="left" @click="colorClick4">
                                        <v-icon>people</v-icon>
                                    </v-btn>
                                    <span>{{flag4}}</span>
                                </v-tooltip>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">渠道控制标识*</v-subheader>
                            </v-flex>
                            <v-flex md3 lg3>
                                <dc-switch v-model="prodData.prodDefines.CHANNEL_CONT_FLAG.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex md1 lg1>
                                <v-tooltip right :color="colorFalg5">
                                    <v-btn flat small :color="colorFalg5" icon="people" slot="activator" class="left" @click="colorClick5">
                                        <v-icon>people</v-icon>
                                    </v-btn>
                                    <span>{{flag5}}</span>
                                </v-tooltip>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">机构区域控制*</v-subheader>
                            </v-flex>
                            <v-flex md3 lg3>
                                <dc-switch v-model="prodData.prodDefines.BRC_AREA_CONT_FLAG.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex md1 lg1>
                                <v-tooltip right :color="colorFalg6">
                                    <v-btn flat small :color="colorFalg6" icon="people" slot="activator" class="left" @click="colorClick6">
                                        <v-icon>people</v-icon>
                                    </v-btn>
                                    <span>{{flag6}}</span>
                                </v-tooltip>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">收费标识*</v-subheader>
                            </v-flex>
                            <v-flex md3 lg3>
                                <dc-switch v-model="prodData.prodDefines.CHARGE_TYPE.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex md1 lg1>
                                <v-tooltip right :color="colorFalg7">
                                    <v-btn flat small :color="colorFalg7" icon="people" slot="activator" class="left" @click="colorClick7">
                                        <v-icon>people</v-icon>
                                    </v-btn>
                                    <span>{{flag7}}</span>
                                </v-tooltip>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">状态转移标识*</v-subheader>
                            </v-flex>
                            <v-flex md3 lg3>
                                <dc-switch v-model="prodData.prodDefines.STATUS_TRAN_FLAG.attrValue"></dc-switch>
                            </v-flex>
                            <v-flex md1 lg1>
                                <v-tooltip right :color="colorFalg8">
                                    <v-btn flat small :color="colorFalg8" icon="people" slot="activator" class="left" @click="colorClick8">
                                        <v-icon>people</v-icon>
                                    </v-btn>
                                    <span color="pink">{{flag8}}</span>
                                </v-tooltip>
                            </v-flex>
                            <!--<v-flex xs12 md2 lg2>-->
                                <!--<v-subheader class="primary&#45;&#45;text subheading">测试测试*</v-subheader>-->
                            <!--</v-flex>-->
                            <!--<v-flex xs12 md4 lg4>-->
                                <!--<dc-select class="primary&#45;&#45;text mx-2" label="测试测地" item-text="value" item-value="key" single-line hide-details></dc-select>-->
                            <!--</v-flex>-->
                        </v-layout>
                    </v-container>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import DcSwitch from "@/components/widgets/DcSwitch";
    import DcSelect from "@/components/widgets/DcSelect";

    import { getInitData } from "@/mock/init";
    import { getProdData } from "@/api/prod";
    export default {
        components: { DcSwitch, DcSelect },
        props: ["prodData"],
        data: () => ({
            title: null,
            refData: getInitData,
            colorFalg: "grey lighten-1",
            colorFalg1: "grey lighten-1",
            colorFalg2: "grey lighten-1",
            colorFalg3: "grey lighten-1",
            colorFalg4: "grey lighten-1",
            colorFalg5: "grey lighten-1",
            colorFalg6: "grey lighten-1",
            colorFalg7: "grey lighten-1",
            colorFalg8: "grey lighten-1",
            flag1: "产品生效",
            flag2: "产品生效",
            flag3: "产品生效",
            flag4: "产品生效",
            flag5: "产品生效",
            flag6: "产品生效",
            flag7: "产品生效",
            flag8: "产品生效",
            flag: "产品生效"
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
            },
            colorClick() {
                if(this.colorFalg === "grey lighten-1") {
                    this.colorFalg = "red"
                    this.flag = "分户生效"
                }else if (this.colorFalg === "red"){
                    this.colorFalg = "grey lighten-1"
                    this.flag = "产品生效"
                }
            },
            colorClick1() {
                if(this.colorFalg1 === "grey lighten-1") {
                    this.colorFalg1 = "red"
                    this.flag1 = "分户生效"

                }else if (this.colorFalg1 === "red"){
                    this.colorFalg1 = "grey lighten-1"
                    this.flag1 = "产品生效"
                }
            },
            colorClick2() {
                if(this.colorFalg2 === "grey lighten-1") {
                    this.colorFalg2 = "red"
                    this.flag2 = "产品生效"
                }else if (this.colorFalg2 === "red"){
                    this.colorFalg2 = "grey lighten-1"
                    this.flag2 = "分户生效"
                }
            },
            colorClick3() {
                if(this.colorFalg3 === "grey lighten-1") {
                    this.colorFalg3 = "red"
                    this.flag3 = "产品生效"
                }else if (this.colorFalg3 === "red"){
                    this.colorFalg3 = "grey lighten-1"
                    this.flag3 = "分户生效"
                }
            },
            colorClick4() {
                if(this.colorFalg4 === "grey lighten-1") {
                    this.colorFalg4 = "red"
                    this.flag4 = "产品生效"
                }else if (this.colorFalg4 === "red"){
                    this.colorFalg4 = "grey lighten-1"
                    this.flag4 = "分户生效"
                }
            },
            colorClick5() {
                if(this.colorFalg5 === "grey lighten-1") {
                    this.colorFalg5 = "red"
                    this.flag5 = "产品生效"
                }else if (this.colorFalg5 === "red"){
                    this.colorFalg5 = "grey lighten-1"
                    this.flag5 = "分户生效"
                }
            },
            colorClick6() {
                if(this.colorFalg6 === "grey lighten-1") {
                    this.colorFalg6 = "red"
                    this.flag6 = "产品生效"
                }else if (this.colorFalg6 === "red"){
                    this.colorFalg6 = "grey lighten-1"
                    this.flag6 = "分户生效"
                }
            },
            colorClick7() {
                if(this.colorFalg7 === "grey lighten-1") {
                    this.colorFalg7 = "red"
                    this.flag7 = "产品生效"
                }else if (this.colorFalg7 === "red"){
                    this.colorFalg7 = "grey lighten-1"
                    this.flag7 = "分户生效"
                }
            },
            colorClick8() {
                if(this.colorFalg8 === "grey lighten-1") {
                    this.colorFalg8 = "red"
                    this.flag8 = "产品生效"
                }else if (this.colorFalg8 === "red"){
                    this.colorFalg8 = "grey lighten-1"
                    this.flag8 = "分户生效"
                }
            }
        }
    };
</script>
<style scoped>
    .left {
        margin-left: 10px;
        margin-top: 20px;
        margin-right: auto;
    }
</style>