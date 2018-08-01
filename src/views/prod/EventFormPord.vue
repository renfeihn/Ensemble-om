<template>
  <dev class="app-container">
  <v-card>
    <v-card-text >
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-layout row wrap>
          <v-flex lg5 sm5>
            <v-text-field label="产品类型" name="title" v-model="prodtypeData">
            </v-text-field>
          </v-flex>
          <v-flex lg1 sm1>
          </v-flex>
          <v-flex lg5 sm5>
            <v-text-field label="产品描述" name="title" v-model="proddescData">
            </v-text-field>
          </v-flex>
          <v-flex xs5>
            <v-select
                    :items="busimodel"
                    v-model="busimodelData"
                    label="业务模块"
                    item-text="prodDesc"
                    item-value="prodCode"
            ></v-select>
          </el-option>


          </v-flex>
          <v-flex lg1 sm1>
          </v-flex>
          <v-flex xs5>
            <v-select
                    :items="prodclass"
                    v-model="prodclassData"
                    label="产品分类"
                    item-text="prodDesc"
                    item-value="prodCode"

            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs5>
            <v-select
                    :items="prodprepice"
                    v-model="prodprepiceData"
                    label="产品属性"
                    item-text="prodDesc"
                    item-value="prodCode"

            ></v-select>
          </v-flex>
          <v-flex lg1 sm1>
          </v-flex>
          <v-flex xs5>
            <v-select
                    :items="prodmuti"
                    v-model="prodmutiData"
                    label="组合产品"
                    item-text="prodDesc"
                    item-value="prodCode"

            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs5>
            <v-select
                    :items="prodstatus"
                    v-model="prodstatusData"
                    label="产品状态"
                    item-text="prodDesc"
                    item-value="prodCode"

            ></v-select>
          </v-flex>
          <v-flex lg1 sm1>
          </v-flex>
          <v-flex xs5>
            <v-select
                    :items="baseprod"
                    v-model="baseprodData"
                    label="基础产品"
                    item-text="prodDesc"
                    item-value="prodCode"

            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs5>
            <v-select
                    :items="accttype"
                    v-model="accttypeData"
                    label="账户类型"
                    item-text="prodDesc"
                    item-value="prodCode"

            ></v-select>
          </v-flex>
          <v-flex lg1 sm1>
          </v-flex>
          <v-flex xs5>
            <v-select
                    :items="acctsontype"
                    v-model="acctsontypeData"
                    label="账户子类型"
                    item-text="prodDesc"
                    item-value="prodCode"

            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs5>
            <v-select
                    :items="acctstruct"
                    v-model="acctstructData"
                    label="账户结构"
                    item-text="prodDesc"
                    item-value="prodCode"

            ></v-select>
          </v-flex>
          <v-flex lg1 sm1>
          </v-flex>
          <v-flex xs5>
            <v-select
                    :items="virtualflag"
                    v-model="virtualflagData"
                    label="虚实标志"
                    item-text="prodDesc"
                    item-value="prodCode"

            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs5>
            <v-select
                    :items="acctintflag"
                    v-model="acctintflagData"
                    label="账户计息标志"
                    item-text="prodDesc"
                    item-value="prodCode"

            ></v-select>
          </v-flex>
          <v-flex lg1 sm1>
          </v-flex>
          <v-flex xs5>
            <v-select
                    :items="amtflag"
                    v-model="amtflagData"
                    label="金额标志"
                    item-text="prodDesc"
                    item-value="prodCode"

            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs5>
            <v-select
                    :items="profitcenter"
                    v-model="profitcenterData"
                    label="利润中心"
                    item-text="prodDesc"
                    item-value="prodCode"

            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex sm5 lg5>
            <v-menu
                    class="pr-2"
                    ref="statDate"
                    lazy
                    :close-on-content-click="false"
                    v-model="startDateMenu"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-bottom="-22"
                    max-width="290px"
                    :return-value.sync="startDate"
            >
              <v-text-field
                      slot="activator"
                      label="生效日期"
                      v-model="startDate"
                      append-icon="event"
                      readonly
              ></v-text-field>
              <v-date-picker v-model="startDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="startDateMenu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.statDate.save(startDate)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex lg1 sm1>
          </v-flex>
          <v-flex sm5 lg5>
            <v-menu
                    ref="endDate"
                    lazy
                    class="pr-2"
                    :close-on-content-click="false"
                    v-model="endDateMenu"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-bottom="-22"
                    min-width="290px"
                    :return-value.sync="endDate"
            >
              <v-text-field
                      slot="activator"
                      label="失效日期"
                      v-model="endDate"
                      append-icon="event"
                      readonly
              ></v-text-field>
              <v-date-picker v-model="endDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="endDateMenu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.endDate.save(endDate)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
  </v-card>
    </dev>
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
            title: null,
            prodtypeData: '',
            proddescData: '',
            busimodelData: '',
            prodclassData: '',
            prodprepiceData: '',
            prodmutiData: '',
            prodstatusData: '',
            baseprodData: '',
            accttypeData: '',
            acctsontypeData: '',
            acctstructData: '',
            virtualflagData: '',
            acctintflagData: '',
            amtflagData: '',
            profitcenterData: '',
            effectdateData: '',
            failuredateData: '',
            valid: true,
            date: null,
            startDateMenu: false,
            startDate: '',
            startTimeMenu: false,
            startTime: null,
            endDateMenu: false,
            endDate: '',
            endTimeMenu: false,
            endTime: null,
            modal: false,
            listValue: '',
            busimodel: [{
                prodCode: '',
                prodDesc: ''
            }],
            prodclass: [{
                prodCode: '',
                prodDesc: ''
            }],
            acctstruct: [{
                prodCode: '',
                prodDesc: ''
            }],
            virtualflag: [{
                prodCode: '',
                prodDesc: ''
            }],
            acctintflag: [{
                prodCode: '',
                prodDesc: ''
            }],
            amtflag: [{
                prodCode: '',
                prodDesc: ''
            }],
            baseprod: [{
                prodCode: '',
                prodDesc: ''
            }],
            prodstatus: [{
                prodCode: '',
                prodDesc: ''
            }],
            prodmuti: [{
                prodCode: '',
                prodDesc: ''
            }],
            prodprepice: [{
                prodCode: '',
                prodDesc: ''
            }],
            acctsontype: [{
                prodCode: '',
                prodDesc: ''
            }],
            accttype: [{
                prodCode: '',
                prodDesc: ''
            }],
            profitcenter: [{
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
                    this.prodtypeData = this.listValue
                    this.proddescData = response.data.prodFrom.proddesc
                    this.busimodelData = response.data.prodFrom.busimodel
                    this.prodclassData = response.data.prodFrom.prodclass
                    this.prodprepiceData = response.data.prodFrom.prodprepice
                    this.prodmutiData = response.data.prodFrom.prodmuti
                    this.prodstatusData = response.data.prodFrom.prodstatus
                    this.baseprodData = response.data.prodFrom.baseprod
                    this.accttypeData = response.data.prodFrom.accttype
                    this.acctsontypeData = response.data.prodFrom.acctsontype
                    this.acctstructData = response.data.prodFrom.acctstruct
                    this.virtualflagData = response.data.prodFrom.virtualflag
                    this.acctintflagData = response.data.prodFrom.acctintflag
                    this.amtflagData = response.data.prodFrom.amtflag
                    this.profitcenterData = response.data.prodFrom.profitcenter
                    this.startDate = response.data.prodFrom.effectdate
                    this.endDate = response.data.prodFrom.failuredate
                })
            },
            initRefDate() {
                getInitData().then(response => {
                    console.log(response)
                    this.busimodel = response.data.paraDataVl.busimodel
                    this.virtualflag = response.data.paraDataVl.virtualflag
                    this.acctintflag = response.data.paraDataVl.acctintflag
                    this.amtflag = response.data.paraDataVl.amtflag
                    this.prodmuti = response.data.paraDataVl.prodmuti
                    this.prodprepice = response.data.paraDataVl.prodprepice
                    this.accttype = response.data.paraDataVl.accttype
                    this.profitcenter = response.data.paraDataRf.profitcenter
                    this.acctsontype = response.data.paraDataRf.acctsontype
                    this.baseprod = response.data.paraDataRf.baseprod
                    this.acctstruct = response.data.paraDataRf.acctstruct
                    this.prodstatus = response.data.paraDataVl.prodstatus
                    this.prodclass = response.data.paraDataRf.prodclass
                })
            },
            closeDialog () {
                this.$parent.isActive = false;
            }
        }
    };
</script>
