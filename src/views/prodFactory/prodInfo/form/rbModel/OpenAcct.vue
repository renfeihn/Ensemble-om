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
                            <v-select class="primary--text mx-2" :items="structureType" v-model="openAcct.structureType" label="账号生成规则" item-text="value" item-value="key" single-line hide-details></v-select>
                        </v-flex>
                        <v-flex xs12 md2 lg2>
                            <v-subheader class="primary--text subheading">账号前缀*</v-subheader>
                        </v-flex>
                        <v-flex md4 lg4>
                            <v-text-field class="primary--text mx-1" label="账号前缀" name="prefix" v-model="openAcct.prodtypeData" single-line hide-details>
                        </v-text-field>
                        </v-flex>
                        <v-flex xs12 md2 lg2>
                            <v-subheader class="primary--text subheading">支取方式处理*</v-subheader>
                        </v-flex>
                        <v-flex md4 lg4>
                            <v-select class="primary--text mx-2" :items="checkWdrawnType" v-model="openAcct.checkWdrawnType" label="支取方式处理" item-text="value" item-value="key" single-line hide-details></v-select>
                        </v-flex>
                        <v-flex xs12 md2 lg2>
                            <v-subheader class="primary--text subheading">账户限制处理*</v-subheader>
                        </v-flex>
                        <v-flex md4 lg4>
                            <v-select class="primary--text mx-2" :items="restraintFlag" v-model="openAcct.restraintFlag" label="账户限制处理" item-text="value" item-value="key" single-line hide-details></v-select>
                        </v-flex>
                        <v-flex xs12 md2 lg2>
                            <v-subheader class="primary--text subheading">凭证类型处理*</v-subheader>
                        </v-flex>
                        <v-flex md4 lg4>
                            <v-select class="primary--text mx-2" :items="withdrawTypeHandeling" v-model="openAcct.withdrawTypeHandeling" label="凭证类型处理" item-text="value" item-value="key" single-line hide-details></v-select>
                        </v-flex>
                        <v-flex xs12 md2 lg2>
                            <v-subheader class="primary--text subheading">是否允许代办*</v-subheader>
                        </v-flex>
                        <v-flex md4 lg4>
                            <v-select class="primary--text mx-2" :items="daiBanFlag" v-model="openAcct.daiBanFlag" label="是否允许代办" item-text="value" item-value="key" single-line hide-details></v-select>
                        </v-flex>
                        <v-flex xs12 md2 lg2>
                            <v-subheader class="primary--text subheading">同客户数量检查标识*</v-subheader>
                        </v-flex>
                        <v-flex md4 lg4>
                            <v-select class="primary--text mx-2" :items="clientAmtCheckFlag" v-model="openAcct.clientAmtCheckFlag" label="同客户数量检查标识" item-text="value" item-value="key" single-line hide-details></v-select>
                        </v-flex>
                        <v-flex xs12 md2 lg2>
                            <v-subheader class="primary--text subheading">同客户允许最大数量*</v-subheader>
                        </v-flex>
                        <v-flex md4 lg4>
                            <v-text-field class="primary--text mx-1" label="同客户允许最大数量" name="prefix" v-model="prodtypeData" single-line hide-details></v-text-field>
                        </v-flex>
                        <v-flex xs12 md2 lg2>
                            <v-subheader class="primary--text subheading">起息日处理标识*</v-subheader>
                        </v-flex>
                        <v-flex md4 lg4>
                            <v-select class="primary--text mx-2" :items="startDepositAmt" v-model="openAcct.startDepositAmt" label="起息日处理标识" item-text="value" item-value="key" single-line hide-details></v-select>
                        </v-flex>
                        <v-flex xs12 md2 lg2>
                            <v-subheader class="primary--text subheading">最大倒起息天数*</v-subheader>
                        </v-flex>
                        <v-flex md4 lg4>
                            <v-text-field class="primary--text mx-1" label="最大倒起息天数" name="prefix" v-model="prodtypeData" single-line hide-details></v-text-field>
                        </v-flex>
                        <v-flex xs12 md2 lg2>
                            <v-subheader class="primary--text subheading">最大起息天数*</v-subheader>
                        </v-flex>
                        <v-flex md4 lg4>
                            <v-text-field class="primary--text mx-1" label="最大起息天数" name="prefix" v-model="prodtypeData" single-line hide-details></v-text-field>
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
            structureType: [{
                key: "",
                value: ""
            }],
            checkWdrawnType: [{
                key: "",
                value: ""
            }],
            restraintFlag: [{
                key: "",
                value: ""
            }],
            withdrawTypeHandeling: [{
                key: "",
                value: ""
            }],
            daiBanFlag: [{
                key: "",
                value: ""
            }],
            clientAmtCheckFlag: [{
                key: "",
                value: ""
            }],
            startDepositAmt: [{
                key: "",
                value: ""
            }],
            refData: getInitData,
            openAcct: {
                structureType: '',
                checkWdrawnType: '',
                restraintFlag: '',
                withdrawTypeHandeling: '',
                daiBanFlag: '',
                clientAmtCheckFlag: '',
                startDepositAmt: ''
            }
        }),
        computed: {
            progress() {
                return Math.min(100, this.value.length * 10);
            }
        },
        watch: {
            prodData(val) {
                this.selectByProd(val);
            }
        },
        mounted() {
            this.initRefDate();
        },
        methods: {
            selectByProd(val) {
                this.openAcct.structureType = val.openAcct.structureType;
                this.openAcct.checkWdrawnType = val.openAcct.checkWdrawnType;
                this.openAcct.restraintFlag = val.openAcct.restraintFlag;
                this.openAcct.withdrawTypeHandeling = val.openAcct.withdrawTypeHandeling;
                this.openAcct.daiBanFlag = val.openAcct.daiBanFlag;
                this.openAcct.clientAmtCheckFlag = val.openAcct.clientAmtCheckFlag;
                this.openAcct.startDepositAmt = val.openAcct.startDepositAmt
            },
            initRefDate() {
                this.structureType = this.refData[2].paraDataRb.structureType;
                this.checkWdrawnType = this.refData[2].paraDataRb.checkWdrawnType;
                this.restraintFlag = this.refData[2].paraDataRb.restraintFlag;
                this.withdrawTypeHandeling = this.refData[2].paraDataRb.withdrawTypeHandeling;
                this.daiBanFlag = this.refData[2].paraDataRb.daiBanFlag;
                this.clientAmtCheckFlag = this.refData[2].paraDataRb.clientAmtCheckFlag;
                this.startDepositAmt = this.refData[2].paraDataRb.startDepositAmt;
            },
            closeDialog() {
                this.$parent.isActive = false;
            }
        }
    };
</script>
