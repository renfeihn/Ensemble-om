<template>
  <v-container fluid grid-list-md pt-2>
    <v-layout row wrap>
      <v-flex md12 lg22>
        <div slot="widget-content">
          <v-container fluid>
            <v-layout row wrap>
              <v-flex md2 lg2>
                <v-subheader class="primary--text pt-3 subheading">产品类型*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">产品类型*</span> -->
                <v-text-field class="primary--text mx-1" label="产品类型" name="title" v-model="prodtypeData" single-line hide-details>
                </v-text-field>
              </v-flex>
              <v-flex md2 lg2>
                <v-subheader class="primary--text pt-3 subheading">产品描述*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">产品描述</span> -->
                <v-text-field class="primary--text mx-2" label="产品描述" name="title" v-model="proddescData" single-line hide-details/>
              </v-flex>
              <v-flex md2 lg2>
                <v-subheader class="primary--text pt-3 subheading">业务模块*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">业务模块</span> -->
                <v-select class="primary--text mx-2" :items="busimodel" v-model="busimodelData" label="业务模块" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex md2 lg2>
                <v-subheader class="primary--text pt-3 subheading">产品分类*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">产品分类</span> -->
                <v-select class="primary--text mx-2" :items="prodclass" v-model="prodclassData" label="产品分类" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex md2 lg2>
                <v-subheader class="primary--text pt-3 subheading">产品属性*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">产品属性</span> -->
                <v-select class="primary--text mx-2" :items="prodprepice" v-model="prodprepiceData" label="产品属性" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex md2 lg2>
                <v-subheader class="primary--text pt-3 subheading">组合产品*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">组合产品</span> -->
                <!-- <v-select class="primary--text mx-2" :items="prodmuti" v-model="prodmutiData" label="组合产品" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select> -->
                <v-switch :label="`${prodmutiData==='Y'?'是':'否'}`" v-model="prodmutiData" value="Y" color="success" hide-details></v-switch>
              </v-flex>
              <v-flex md2 lg2>
                <v-subheader class="primary--text pt-3 subheading">产品状态*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">产品状态</span> -->
                <v-select class="primary--text mx-2" :items="prodstatus" v-model="prodstatusData" label="产品状态" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex md2 lg2>
                <v-subheader class="primary--text pt-3 subheading">基础产品*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">基础产品*</span> -->
                <v-select class="primary--text mx-1" :items="baseprod" v-model="baseprodData" label="基础产品" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex md2 lg2>
                <v-subheader class="primary--text pt-3 subheading">账户类型*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">账户类型</span> -->
                <v-select class="primary--text mx-2" :items="accttype" v-model="accttypeData" label="账户类型" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex md2 lg2>
                <v-subheader class="primary--text pt-3 subheading">账户子类型*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">账户子类型</span> -->
                <v-select :items="acctsontype" v-model="acctsontypeData" label="账户子类型" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex md2 lg2>
                <v-subheader class="primary--text pt-3 subheading">账户结构*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">账户结构</span> -->
                <v-select class="primary--text mx-2" :items="acctstruct" v-model="acctstructData" label="账户结构" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex md2 lg2>
                <v-subheader class="primary--text pt-3 subheading">虚实标志*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">虚实标志</span> -->
                <v-select class="primary--text mx-2" :items="virtualflag" v-model="virtualflagData" label="虚实标志" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex md2 lg2>
                <v-subheader class="primary--text pt-3 subheading">计息标志*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">计息标志</span> -->
                <v-select class="primary--text mx-2" :items="acctintflag" v-model="acctintflagData" label="计息标志" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex md2 lg2>
                <v-subheader class="primary--text pt-3 subheading">金额标志*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">金额标志</span> -->
                <v-select class="primary--text mx-2" :items="amtflag" v-model="amtflagData" label="金额标志" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex md2 lg2>
                <v-subheader class="primary--text pt-3 subheading">利润中心*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">利润中心</span> -->
                <v-select class="primary--text mx-1" :items="profitcenter" v-model="profitcenterData" label="利润中心" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex md2 lg2>
                <v-subheader class="primary--text pt-3 subheading">密码类型*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">利润中心</span> -->
                <v-select class="primary--text mx-1" :items="profitcenter" v-model="profitcenterData" label="密码类型" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
              </v-flex>
              <v-flex md2 lg2>
                <v-subheader class="primary--text pt-3 subheading">起始日期*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-menu ref="statDateMenu" lazy :close-on-content-click="false" v-model="startDateMenu" transition="scale-transition" offset-y full-width :nudge-bottom="-22" min-width="290px" :return-value.sync="startDate">
                  <v-text-field slot="activator" label="起始日期" v-model="startDate" append-icon="event" single-line hide-details></v-text-field>
                  <v-date-picker v-model="startDate" @input="$refs.statDateMenu.save(startDate)" no-title scrollable locale="zh-cn">
                    <!-- <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="startDateMenu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.statDate.save(startDate)">OK</v-btn> -->
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex md2 lg2>
                <v-subheader class="primary--text pt-3 subheading">终止日期*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-menu ref="endDateMenu" lazy :close-on-content-click="false" v-model="endDateMenu" transition="scale-transition" offset-y full-width :nudge-bottom="-22" min-width="290px" :return-value.sync="endDate">
                  <v-text-field slot="activator" label="终止日期" v-model="endDate" append-icon="event" single-line hide-details></v-text-field>
                  <v-date-picker v-model="endDate" @input="$refs.endDateMenu.save(endDate)" no-title scrollable locale="zh-cn">
                    <!-- <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="endDateMenu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.endDate.save(endDate)">OK</v-btn> -->
                  </v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
        <!-- </v-widget> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getInitData } from "@/api/prod";
import { getProdData } from "@/api/prod";
export default {
  props: ["listValue"],
  data: () => ({
    title: null,
    prodtypeData: "",
    proddescData: "",
    busimodelData: "",
    prodclassData: "",
    prodprepiceData: "",
    prodmutiData: "",
    prodstatusData: "",
    baseprodData: "",
    accttypeData: "",
    acctsontypeData: "",
    acctstructData: "",
    virtualflagData: "",
    acctintflagData: "",
    amtflagData: "",
    profitcenterData: "",
    effectdateData: "",
    failuredateData: "",
    valid: true,
    date: null,
    startDateMenu: false,
    startDate: "",
    startTimeMenu: false,
    startTime: null,
    endDateMenu: false,
    endDate: "",
    endTimeMenu: false,
    endTime: null,
    modal: false,
    listValue: "",
    busimodel: [
      {
        prodCode: "",
        prodDesc: ""
      }
    ],
    prodclass: [
      {
        prodCode: "",
        prodDesc: ""
      }
    ],
    acctstruct: [
      {
        prodCode: "",
        prodDesc: ""
      }
    ],
    virtualflag: [
      {
        prodCode: "",
        prodDesc: ""
      }
    ],
    acctintflag: [
      {
        prodCode: "",
        prodDesc: ""
      }
    ],
    amtflag: [
      {
        prodCode: "",
        prodDesc: ""
      }
    ],
    baseprod: [
      {
        prodCode: "",
        prodDesc: ""
      }
    ],
    prodstatus: [
      {
        prodCode: "",
        prodDesc: ""
      }
    ],
    prodmuti: [
      {
        prodCode: "",
        prodDesc: ""
      }
    ],
    prodprepice: [
      {
        prodCode: "",
        prodDesc: ""
      }
    ],
    acctsontype: [
      {
        prodCode: "",
        prodDesc: ""
      }
    ],
    accttype: [
      {
        prodCode: "",
        prodDesc: ""
      }
    ],
    profitcenter: [
      {
        prodCode: "",
        prodDesc: ""
      }
    ]
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
    }
  },
  mounted() {
    this.initRefDate();
  },
  methods: {
    selectByProd() {
      getProdData(this.listValue).then(response => {
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
        this.busimodel = response.data.paraDataVl.busimodel;
        this.virtualflag = response.data.paraDataVl.virtualflag;
        this.acctintflag = response.data.paraDataVl.acctintflag;
        this.amtflag = response.data.paraDataVl.amtflag;
        this.prodmuti = response.data.paraDataVl.prodmuti;
        this.prodprepice = response.data.paraDataVl.prodprepice;
        this.accttype = response.data.paraDataVl.accttype;
        this.profitcenter = response.data.paraDataRf.profitcenter;
        this.acctsontype = response.data.paraDataRf.acctsontype;
        this.baseprod = response.data.paraDataRf.baseprod;
        this.acctstruct = response.data.paraDataRf.acctstruct;
        this.prodstatus = response.data.paraDataVl.prodstatus;
        this.prodclass = response.data.paraDataRf.prodclass;
      });
    },
    closeDialog() {
      this.$parent.isActive = false;
    }
  }
};
</script>
