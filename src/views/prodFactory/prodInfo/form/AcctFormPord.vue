<template>
    <v-container fluid pr-5 pt-0>
        <v-layout row wrap>
            <v-flex xs12 md12 lg12>
                <div slot="widget-content">
                    <v-container fluid pt-1>
                        <v-layout row wrap>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">账户属性</v-subheader>
                            </v-flex>
                            <v-flex xs12 md4 lg4>
                                <!-- <span class="primary--text mx-3 pt-4 subheading float: right">账户属性 *</span> -->
                                <v-select :items="acctAttrs" v-model="acctForm.attr" label="账户属性" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">账户类别 *</v-subheader>
                            </v-flex>
                            <v-flex xs12 md4 lg4>
                                <!-- <span class="primary--text mx-3 pt-4 subheading">账户类别 *</span> -->
                                <v-select :items="acctClasses" v-model="acctForm.class" label="账户类别" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
                            </v-flex>
                            <!-- </v-layout>
                                    <v-layout row wrap> -->
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">多币种 *</v-subheader>
                            </v-flex>
                            <v-flex xs12 md4 lg4>
                                <!-- <span class="primary--text mx-4 pt-4 subheading">多币种 *</span> -->
                                <!-- <v-select class="primary--text mx-1" :items="muticcyflag" v-model="muticcyflagData" label="是否多币种" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select> -->
                                <v-switch :label="`${muticcyflagData==='Y'?'是':'否'}`" v-model="acctForm.muticcyflag" value="Y" color="success" hide-details></v-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">产品币种 *</v-subheader>
                            </v-flex>
                            <v-flex xs12 md4 lg4>
                                <!-- <span class="primary--text mx-3 pt-4 subheading">产品币种*</span> -->
                                <v-select class="primary--text mx-1" :items="ccytype" v-model="acctForm.ccytype" label="币种" item-text="prodDesc" item-value="prodCode" small-chips single-line hide-details multiple></v-select>
                            </v-flex>
                            <!-- </v-layout>
                                    <v-layout row wrap> -->
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">金额类型 *</v-subheader>
                            </v-flex>
                            <v-flex xs12 md4 lg4>
                                <!-- <span class="primary--text mx-3 pt-4 subheading">金额类型 *</span> -->
                                <v-select :items="amttype" v-model="acctForm.amttype" label="金额类型" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">余额类型 *</v-subheader>
                            </v-flex>
                            <v-flex xs12 md4 lg4>
                                <!-- <span class="primary--text mx-3 pt-4 subheading">余额类型 *</span> -->
                                <v-select :items="baltype" v-model="acctForm.baltype" label="余额类型" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
                            </v-flex>
                            <!-- </v-layout>
                                    <v-layout row wrap> -->
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">账户用途 *</v-subheader>
                            </v-flex>
                            <v-flex xs12 md4 lg4>
                                <!-- <span class="primary--text mx-3 pt-4 subheading">账户用途 *</span> -->
                                <v-select :items="acctusefor" v-model="acctForm.acctusefor" label="账户用途" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">介质类型 *</v-subheader>
                            </v-flex>
                            <v-flex xs12 md4 lg4>
                                <!-- <span class="primary--text mx-3 pt-4 subheading">介质类型 *</span> -->
                                <v-select :items="mediumtype" v-model="acctForm.mediumtype" label="介质类型" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">起始日期 *</v-subheader>
                            </v-flex>
                            <v-flex xs12 md4 lg4>
                                <v-menu ref="statDateMenu" lazy :close-on-content-click="false" v-model="startDateMenu" transition="scale-transition" offset-y full-width :nudge-bottom="-22" min-width="290px" :return-value.sync="startDate">
                                    <v-text-field slot="activator" label="起始日期" v-model="acctForm.effectdate" append-icon="event" single-line hide-details></v-text-field>
                                    <v-date-picker v-model="acctForm.effectdate" @input="$refs.statDateMenu.save(acctForm.effectdate)" no-title scrollable locale="zh-cn">
                                    </v-date-picker>
                                </v-menu>
                            </v-flex>
                            <!-- <v-flex lg2/> -->
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">终止日期 *</v-subheader>
                            </v-flex>
                            <v-flex xs12 md4 lg4>
                                <v-menu ref="endDateMenu" lazy :close-on-content-click="false" v-model="endDateMenu" transition="scale-transition" offset-y full-width :nudge-bottom="-22" min-width="290px" :return-value.sync="endDate">
                                    <v-text-field slot="activator" label="终止日期" v-model="acctForm.failuredate" append-icon="event" single-line hide-details></v-text-field>
                                    <v-date-picker v-model="acctForm.failuredate" @input="$refs.endDateMenu.save(acctForm.failuredate)" no-title scrollable locale="zh-cn">
                                        <!-- <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="endDateMenu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.endDate.save(endDate)">OK</v-btn> -->
                                    </v-date-picker>
                                </v-menu>
                            </v-flex>
                        </v-layout>
                        <!-- </v-form> -->
                        <!-- </v-card-text>
                            </v-card> -->
                    </v-container>
                </div>
                <!-- </v-widget> -->
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import VWidget from "@/components/VWidget";
    import { getInitData } from "@/api/prod";
    import { getProdData } from "@/api/prod";
    export default {
        components: {
            VWidget
        },
        props: ["prodData"],
        data: () => ({
            title: null,
            valid: true,
            date: null,
            startDateMenu: false,
            startDate: null,
            startTimeMenu: false,
            startTime: null,
            endDateMenu: false,
            endDate: null,
            endTimeMenu: false,
            endTime: null,
            modal: false,
            acctForm: {
                attr: '',
                class: '',
                muticcyflag: '',
                ccytype: '',
                amttype: '',
                baltype: '',
                reducedccy: '',
                acctusefor: '',
                mediumtype: '',
                effectdate: '',
                failuredate: '',
                muticcyflagData: ''
            },
            acctAttrs: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ],
            acctClasses: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ],
            muticcyflag: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ],
            ccytype: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ],
            amttype: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ],
            baltype: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ],
            reducedccy: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ],
            acctusefor: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ],
            mediumtype: [
                {
                    prodCode: "",
                    prodDesc: ""
                }
            ]
        }),
        watch: {
            prodData(val) {
                this.initProdData(val)
            }
        },
        mounted() {
            this.initRefDate();
        },
        methods: {
            initProdData(val) {
                this.acctForm = val.acctForm
            },
            closeDialog() {
                this.$parent.isActive = false;
            },
            initRefDate() {
                getInitData().then(response => {
                    console.log(response);
                    this.acctAttrs = response.data.paraDataRf.acctAttrs;
                    this.acctClasses = response.data.paraDataVl.acctClasses;
                    this.muticcyflag = response.data.paraDataVl.muticcyflag;
                    this.ccytype = response.data.paraDataRf.ccytype;
                    this.amttype = response.data.paraDataVl.amttype;
                    this.baltype = response.data.paraDataVl.baltype;
                    this.reducedccy = response.data.paraDataRf.reducedccy;
                    this.acctusefor = response.data.paraDataRf.acctusefor;
                    this.mediumtype = response.data.paraDataRf.mediumtype;
                });
            }
        }
    };
</script>
