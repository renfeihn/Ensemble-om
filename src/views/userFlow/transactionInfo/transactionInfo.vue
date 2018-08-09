<template>
    <v-container fluid grid-list-md>
        <v-card ref="form">
            <v-card-text>
                <!-- <v-form v-model="valid" ref="form" lazy-validation> -->
                <v-layout row wrap>
                    <v-flex xs6 class="field-single-line">
                        <span class="primary--text mx-3 pt-4 subheading float: right" >交易发起人：</span>
                        <span class="primary--text mx-3 pt-4 subheading float: right" >PARA</span>
                    </v-flex>
                    <v-flex xs6 class="field-single-line">
                        <span class="primary--text mx-3 pt-4 subheading">交易发起时间</span>
                        <v-menu ref="commitDate" lazy class="pr-1" :close-on-content-click="false" v-model="commitDate" transition="scale-transition" offset-y full-width :nudge-bottom="-22" min-width="290px" :return-value.sync="endDate">
                            <v-text-field slot="activator" label="交易发起时间" v-model="commitDate" append-icon="event" single-line></v-text-field>
                            <v-date-picker v-model="commitDate" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="endDateMenu = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.endDate.save(commitDate)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs6 class="field-single-line">
                        <span class="primary--text mx-4 pt-4">服务复核人：</span>
                        <span class="primary--text mx-3 pt-4 subheading float: right" >PARA</span>
                    </v-flex>
                    <v-flex xs6 class="field-single-line">
                        <span class="primary--text mx-3 pt-4 subheading">复核日期</span>
                        <v-menu ref="checkDate" lazy class="pr-1" :close-on-content-click="false" v-model="checkDate" transition="scale-transition" offset-y full-width :nudge-bottom="-22" min-width="290px" :return-value.sync="endDate">
                            <v-text-field slot="activator" label="复核日期" v-model="checkDate" append-icon="event" single-line></v-text-field>
                            <v-date-picker v-model="checkDate" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="endDateMenu = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.endDate.save(checkDate)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                </v-layout>

                <!-- </v-form> -->
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import {
        getInitData
    } from '@/api/prod'
    import {
        getProdData
    } from '@/api/prod'
    export default {
        props: ['listValue'],
        data: () => ({
            listValue: '',
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
            attrData: '',
            classData: '',
            muticcyflagData: '',
            ccytypeData: '',
            amttypeData: '',
            baltypeData: '',
            reducedccyData: '',
            acctuseforData: '',
            mediumtypeData: '',
            acctAttrs: [{
                prodCode: '',
                prodDesc: ''
            }],
            acctClasses: [{
                prodCode: '',
                prodDesc: ''
            }],
            muticcyflag: [{
                prodCode: '',
                prodDesc: ''
            }],
            ccytype: [{
                prodCode: '',
                prodDesc: ''
            }],
            amttype: [{
                prodCode: '',
                prodDesc: ''
            }],
            baltype: [{
                prodCode: '',
                prodDesc: ''
            }],
            reducedccy: [{
                prodCode: '',
                prodDesc: ''
            }],
            acctusefor: [{
                prodCode: '',
                prodDesc: ''
            }],
            mediumtype: [{
                prodCode: '',
                prodDesc: ''
            }]
        }),
        mounted() {
            this.initRefDate()
        },
        watch: {
            listValue(val, oldval) {
                if (val !== oldval) {
                    this.selectByProd()
                }
            }
        },
        methods: {
            selectByProd() {
                getProdData(this.listValue).then(response => {
                    this.attrData = response.data.acctFrom.attr
                    this.classData = response.data.acctFrom.class
                    this.muticcyflagData = response.data.acctFrom.muticcyflag
                    this.ccytypeData = response.data.acctFrom.ccytype
                    this.amttypeData = response.data.acctFrom.amttype
                    this.baltypeData = response.data.acctFrom.baltype
                    this.reducedccyData = response.data.acctFrom.reducedccy
                    this.acctuseforData = response.data.acctFrom.acctusefor
                    this.mediumtypeData = response.data.acctFrom.mediumtype
                })
            },
            closeDialog() {
                this.$parent.isActive = false;
            },
            initRefDate() {
                getInitData().then(response => {
                    console.log(response)
                    this.acctAttrs = response.data.paraDataRf.acctAttrs
                    this.acctClasses = response.data.paraDataVl.acctClasses
                    this.muticcyflag = response.data.paraDataVl.muticcyflag
                    this.ccytype = response.data.paraDataRf.ccytype
                    this.amttype = response.data.paraDataVl.amttype
                    this.baltype = response.data.paraDataVl.baltype
                    this.reducedccy = response.data.paraDataRf.reducedccy
                    this.acctusefor = response.data.paraDataRf.acctusefor
                    this.mediumtype = response.data.paraDataRf.mediumtype
                })
            }
        }
    };
</script>
