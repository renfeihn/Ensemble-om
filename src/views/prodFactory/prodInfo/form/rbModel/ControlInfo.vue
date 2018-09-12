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
                                <v-select class="primary--text mx-2" :items="draRange" v-model="controlInfo.draRange" label="通存范围" item-text="value" item-value="key" single-line hide-details return-object></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">通兑范围*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="depRange" v-model="controlInfo.depRange" label="通兑范围" item-text="value" item-value="key" single-line hide-details return-object></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">转账通兑标识*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="tDepFlag" v-model="controlInfo.tDepFlag" label="转账通兑标识" item-text="value" item-value="key" hide-details single-line return-object ></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">现金通兑标识*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="cashDepFlag" v-model="controlInfo.cashDepFlag" label="现金通兑标识" item-text="value" item-value="key" hide-details single-line return-object></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">客户控制标识*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="isJudge" v-model="controlInfo.clientFlag" label="客户控制标识" item-text="value" item-value="key" single-line hide-details return-object></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">渠道控制标识*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="isJudge" v-model="controlInfo.channelFlag" label="渠道控制标识" item-text="value" item-value="key" single-line hide-details return-object ></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">机构区域控制标识*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="isJudge" v-model="controlInfo.branchControlFlag" label="机构区域控制标识" item-text="value" item-value="key" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">收费标识*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="isJudge" v-model="controlInfo.chargeFlag" label="收费标识" item-text="value" item-value="key" single-line hide-details return-object ></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">状态转移标识*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <v-select class="primary--text mx-2" :items="isJudge" v-model="controlInfo.moveFlag" label="状态转移标识" item-text="value" item-value="key" single-line hide-details></v-select>
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
    export default {
        props: ["prodData"],
        data: () => ({
            title: null,
            isJudge: [{
                key: "Y",
                value: "Y-是"
            },
            {
                key: "N",
                value: 'N-否'
            }],
            draRange: [{
                key: "",
                value: ""
            }],
            depRange: [{
                key: "",
                value: ""
            }],
            tDepFlag: [{
                key: "",
                value: ""
            }],
            cashDepFlag: [{
                key: "",
                value: ""
            }],
            refData: getInitData,
            controlInfo: {
                draRange: '',
                depRange: '',
                tDepFlag: '',
                cashDepFlag: '',
                clientFlag: '',
                channelFlag: '',
                branchControlFlag: '',
                chargeFlag: '',
                moveFlag: ''
            }
        }),
        computed: {
            progress() {
                return Math.min(100, this.value.length * 10);
            }
        },
        watch: {
            listValue(val, oldval) {
                if (val !== oldval) {
                    this.selectByProd(val);
                }
            },
            prodData(val) {
                this.updateBaseInfo(val)
            }
        },
        mounted() {
            this.initRefDate();
        },
        methods: {
            updateBaseInfo(val) {
                this.controlInfo = {}
                this.controlInfo.draRange = val.controlInfo.draRange
                this.controlInfo.depRange = val.controlInfo.depRange
                this.controlInfo.tDepFlag = val.controlInfo.tDepFlag
                this.controlInfo.cashDepFlag = val.controlInfo.cashDepFlag
                this.controlInfo.clientFlag = val.controlInfo.clientFlag
                this.controlInfo.channelFlag = val.controlInfo.channelFlag
                this.controlInfo.branchControlFlag = val.controlInfo.branchControlFlag
                this.controlInfo.chargeFlag = val.controlInfo.chargeFlag
                this.controlInfo.moveFlag = val.controlInfo.moveFlag
            },
            selectByProd() {
                getProdData(this.listValue).then(response => {
                    this.acctAttrData = response.data.prodFrom.acctAttr;
                    this.prodtypeData = this.listValue;
                    this.proddescData = response.data.prodFrom.proddesc;
                    this.busimodelData = response.data.prodFrom.busimodel;
                    this.prodclassData = response.data.prodFrom.prodclass;
                    this.prodprepiceData = response.data.prodFrom.prodprepice;
                    this.prodmutiData = response.data.prodFrom.prodmuti;
                    this.prodstatusData = response.data.prodFrom.prodstatus;
                    this.baseprodData = response.data.prodFrom.baseprod;
                    this.accttypeData = response.data.prodFrom.accttype;
                    this.acctsontypeData = response.data.prodFrom.acctsontype;
                    this.acctstructData = response.data.prodFrom.acctstruct;
                    this.virtualflagData = response.data.prodFrom.virtualflag;
                    this.acctintflagData = response.data.prodFrom.acctintflag;
                    this.amtflagData = response.data.prodFrom.amtflag;
                    this.profitcenterData = response.data.prodFrom.profitcenter;
                    this.startDate = response.data.prodFrom.effectdate;
                    this.endDate = response.data.prodFrom.failuredate;
                });
            },
            initRefDate() {
                getInitData().then(response => {
                    console.log(response);
                    this.draRange = this.refData[2].paraDataRb.draRange;
                    this.depRange = this.refData[2].paraDataRb.depRange;
                    this.tDepFlag = this.refData[2].paraDataRb.tDepFlag;
                    this.cashDepFlag = this.refData[2].paraDataRb.cashDepFlag;
                });
            },
            closeDialog() {
                this.$parent.isActive = false;
            }
        }
    };
</script>
