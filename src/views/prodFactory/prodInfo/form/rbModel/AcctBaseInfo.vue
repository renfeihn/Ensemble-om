<template>
  <v-container fluid pr-5 pt-0>
    <v-layout row wrap>
      <v-flex xs12 md12 lg12>
        <div slot="widget-content">
          <v-container fluid pt-1>
            <v-layout row wrap>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">产品代码*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-text-field class="primary--text mx-1" label="产品代码" name="title" v-model="acctBaseInfo.prodcode" single-line hide-details disabled>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">产品描述*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-text-field class="primary--text mx-2" label="产品描述" name="title" v-model="acctBaseInfo.proddesc" single-line hide-details disabled/>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">业务模块*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="sourceModule" v-model="acctBaseInfo.sourceModule" label="业务模块" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">产品分类*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <!-- <span class="primary--text mx-3 pt-4 subheading">产品分类</span> -->
                <v-select class="primary--text mx-2" :items="prodClass" v-model="acctBaseInfo.prodClass" label="产品分类" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">产品属性*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="prodAttr" v-model="acctBaseInfo.prodAttr" label="产品属性" item-text="value" item-value="key" value="'S'" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">组合产品*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="isGroup" v-model="acctBaseInfo.isGroup" label="组合产品" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">产品状态*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="prodStatus" v-model="acctBaseInfo.prodStatus" label="产品状态" item-text="value" item-value="key" value="A" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">基础产品*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-1" :items="baseprodtype" v-model="acctBaseInfo.baseprodtype" label="基础产品" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
              <v-subheader class="primary--text subheading">生效日期*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-menu ref="endDateMenu" lazy :close-on-content-click="false" v-model="startDateMenu" transition="scale-transition" offset-y full-width :nudge-bottom="-22" min-width="290px" :return-value.sync="endDate">
                  <v-text-field slot="activator" label="失效日期" v-model="acctBaseInfo.effectdate" append-icon="event" single-line hide-details></v-text-field>
                  <v-date-picker v-model="acctBaseInfo.effectdate" @input="$refs.startDateMenu.save(acctBaseInfo.effectdate)" no-title scrollable locale="zh-cn"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">失效日期*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-menu ref="endDateMenu" lazy :close-on-content-click="false" v-model="endDateMenu" transition="scale-transition" offset-y full-width :nudge-bottom="-22" min-width="290px" :return-value.sync="endDateMenu">
                  <v-text-field slot="activator" label="失效日期" v-model="acctBaseInfo.failuredate" append-icon="event" single-line hide-details></v-text-field>
                  <v-date-picker v-model="acctBaseInfo.failuredate" @input="$refs.endDateMenu.save(acctBaseInfo.failuredate)" no-title scrollable locale="zh-cn"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">利润中心*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-1" :items="profitCentre" v-model="acctBaseInfo.profitCentre" label="利润中心" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">是否多币种*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="isMultiCcy" @change="isSelectCcy" v-model="acctBaseInfo.isMultiCcy" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">币种*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="ccy" v-model="acctBaseInfo.ccy" label="币种" item-text="value" item-value="key" ref="ccy" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">默认币种*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="ccy" label="币种" v-model="acctBaseInfo.defaultCcy" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">计息标志*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="acctIntFlag" v-model="acctBaseInfo.acctIntFlag" label="计息标志" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">是否多凭证*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="isJudge" v-model="acctBaseInfo.isMutiVoucher" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">凭证类型*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                    <v-select class="primary--text mx-2" :items="voucherType" label="凭证类型" v-model="acctBaseInfo.voucherType" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">账户类型*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="acctType" v-model="acctBaseInfo.acctType" label="账户类型" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">账户子类型*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="subAcctType" v-model="acctBaseInfo.subAcctType" label="账户子类型" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">账户属性*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="acctNature" v-model="acctBaseInfo.acctNature" label="账户属性" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">关系属性*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="ownershipType" v-model="acctBaseInfo.ownershipType" label="关系属性" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">账户类别*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="acctClass" v-model="acctBaseInfo.acctClass" label="账户类别" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">余额类别*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select :items="balType" v-model="acctBaseInfo.balType" label="余额类别" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">支取方式*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="withdrawalType" v-model="acctBaseInfo.withdrawalType" label="支取方式" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">折算币种*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select :items="discountCcy" v-model="acctBaseInfo.discountCcy" label="折算币种" item-text="value" item-value="key" single-line hide-details></v-select>
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
    prodtypeData: "",
    proddescData: "",
    sourceModule: [
      {
        key: "",
        value: ""
      }
    ],
    isJudge: [
        {
            key: "Y",
            value: "Y-是"
        },
        {
            key: "N",
            value: 'N-否'
        }
    ],
    prodClass: [
      {
        key: "",
        value: ""
      }
    ],
    prodAttr: [
      {
        key: "",
        value: ""
      }
    ],
    isGroup: [
      {
        key: "",
        value: ""
      }
    ],
    prodStatus: [
      {
        key: "",
        value: ""
      }
    ],
    baseprodtype: [
      {
        key: "",
        value: ""
      }
    ],
    acctType: [
      {
        key: "",
        value: ""
      }
    ],
    subAcctType: [
      {
        key: "",
        value: ""
      }
    ],
    isMultiCcy: [
      {
        key: "",
        value: ""
      }
    ],
    ccy: [
      {
         key: "",
         value: ""
      }
    ],
    acctIntFlag: [
        {
            key: "",
            value: ""
        }
    ],
    profitCentre: [
        {
            key: "",
            value: ""
        }
    ],
    voucherFlag: [
        {
            key: "",
            value: ""
        }
    ],
    voucherType: [
        {
            key: "",
            value: ""
        }
    ],
    withdrawalType: [
        {
            key: "",
            value: ""
        }
    ],
    balType: [
         {
             key: "",
             value: ""
         }
     ],
    acctNature: [
         {
             key: "",
             value: ""
         }
     ],
    ownershipType: [
        {
            key: "",
            value: ""
        }
    ],
    acctClass: [
        {
            key: "",
            value: ""
        }
    ],
    refData: getInitData,
    acctBaseInfo: {
        prodcode: '',
        proddesc: '',
        sourceModule: '',
        prodClass: '',
        prodAttr: '',
        isGroup: '',
        prodStatus: '',
        baseprodtype: '',
        acctType: '',
        subAcctType: '',
        isMultiCcy: '',
        ccy: '',
        defaultCcy: 'CNY',
        acctIntFlag: '',
        profitCentre: '',
        effectdate: '',
        failuredate: '',
        isMutiVoucher: '',
        voucherType: '',
        acctSubType: '',
        acctNature: '',
        ownershipType: '',
        acctClass: '',
        balType: '',
        withdrawalType: '',
        discountCcy: ''
     },


  }),
  computed: {
    progress() {
      return Math.min(100, this.value.length * 10);
    }
  },
  watch: {
    prodData(val) {
        this.updateBaseInfo(val)
    }
  },
  mounted() {
    this.initRefDate();
  },
  methods: {
      isSelectCcy(){
        console.log(this.acctBaseInfo.isMultiCcy);
        if(this.acctBaseInfo.isMultiCcy === 'Y'){
            this.$refs.ccy.multiple='true'
        }else{
            this.$refs.ccy.multiple='false'
        }
      },
      updateBaseInfo(val) {
               this.acctBaseInfo = {}
               this.acctBaseInfo.prodcode = val.acctBaseInfo.prodcode
               this.acctBaseInfo.proddesc = val.acctBaseInfo.proddesc
               this.acctBaseInfo.sourceModule = val.acctBaseInfo.sourceModule
               this.acctBaseInfo.prodClass = val.acctBaseInfo.prodClass
               this.acctBaseInfo.prodAttr = val.acctBaseInfo.prodAttr
               this.acctBaseInfo.isGroup = val.acctBaseInfo.isGroup
               this.acctBaseInfo.prodStatus = val.acctBaseInfo.prodStatus
               this.acctBaseInfo.baseprodtype = val.acctBaseInfo.baseprodtype
               this.acctBaseInfo.acctType = val.acctBaseInfo.acctType
               this.acctBaseInfo.subAcctType = val.acctBaseInfo.subAcctType
               this.acctBaseInfo.isMultiCcy = val.acctBaseInfo.isMultiCcy
               this.acctBaseInfo.ccy = val.acctBaseInfo.ccy
               this.acctBaseInfo.acctIntFlag = val.acctBaseInfo.acctIntFlag
               this.acctBaseInfo.profitCentre = val.acctBaseInfo.profitCentre
               this.acctBaseInfo.effectdate = val.acctBaseInfo.effectdate
               this.acctBaseInfo.failuredate = val.acctBaseInfo.failuredate
               this.acctBaseInfo.voucherType = val.acctBaseInfo.voucherType;
               this.acctBaseInfo.acctType = val.acctBaseInfo.acctType;
               this.acctBaseInfo.acctSubType = val.acctBaseInfo.acctSubType;
               this.acctBaseInfo.acctNature = val.acctBaseInfo.acctNature;
               this.acctBaseInfo.ownershipType = val.acctBaseInfo.ownershipType;
               this.acctBaseInfo.acctClass = val.acctBaseInfo.acctClass;
               this.acctBaseInfo.balType = val.acctBaseInfo.balType;
               this.acctBaseInfo.withdrawalType = val.acctBaseInfo.withdrawalType;
               this.acctBaseInfo.discountCcy = val.acctBaseInfo.discountCcy;
               this.acctBaseInfo.acctClass = val.acctBaseInfo.acctClass;
               this.acctBaseInfo.isMutiVoucher = val.acctBaseInfo.isMutiVoucher;
               this.acctBaseInfo.defaultCcy = val.acctBaseInfo.defaultCcy;
      },
    selectByProd() {
      getProdData(this.listValue).then(response => {
        this.prodtypeData = this.listValue;
        this.proddescData = response.data.prodFrom.proddesc;

        this.sourceModule = response.data.prodFrom.sourceModule;
        this.prodClass = response.data.prodFrom.prodClass;
        this.prodAttr = response.data.prodFrom.prodAttr;
        this.isGroup = response.data.prodFrom.isGroup;
        this.prodStatus = response.data.prodFrom.prodStatus;
        this.baseprodtype = response.data.prodFrom.baseprodtype;
        this.acctType = response.data.prodFrom.acctType;
        this.subAcctType = response.data.prodFrom.subAcctType;
        this.isMultiCcy = response.data.prodFrom.isMultiCcy;
        this.ccy = response.data.prodFrom.ccy;
        this.acctIntFlag = response.data.prodFrom.acctIntFlag;
        this.profitCentre = response.data.prodFrom.profitCentre;

      });
    },
    initRefDate() {
      getInitData().then(response => {
        console.log(response);

        this.sourceModule = this.refData[2].paraDataRb.sourceModule;
        this.prodClass = this.refData[2].paraDataRb.prodClass;
        this.prodAttr = this.refData[2].paraDataRb.prodAttr;
        this.isGroup = this.refData[2].paraDataRb.isGroup;
        this.prodStatus = this.refData[2].paraDataRb.prodStatus;
        this.baseprodtype = this.refData[2].paraDataRb.baseprodtype;
        this.acctType = this.refData[2].paraDataRb.acctType;
        this.subAcctType = this.refData[2].paraDataRb.subAcctType;
        this.isMultiCcy = this.refData[2].paraDataRb.isMultiCcy;
        this.ccy = this.refData[2].paraDataRb.ccy;
        this.acctIntFlag = this.refData[2].paraDataRb.acctIntFlag;
        this.profitCentre = this.refData[2].paraDataRb.profitCentre;
        this.voucherType = this.refData[2].paraDataRb.voucherType;
        this.acctType = this.refData[2].paraDataRb.acctType;
        this.acctSubType = this.refData[2].paraDataRb.acctSubType;
        this.acctNature = this.refData[2].paraDataRb.acctNature;
        this.ownershipType = this.refData[2].paraDataRb.ownershipType;
        this.acctClass = this.refData[2].paraDataRb.acctClass;
        this.balType = this.refData[2].paraDataRb.balType;
        this.withdrawalType = this.refData[2].paraDataRb.withdrawalType;
        this.discountCcy = this.refData[2].paraDataRb.discountCcy;
        this.acctClass = this.refData[2].paraDataRb.acctClass;
      });
    },
    closeDialog() {
      this.$parent.isActive = false;
    }
  }
};
</script>
<style scoped>
    .top {
        padding-top: 8px;
    }
    .depositTree {
        height: calc(90vh - 48px);
    }
    .line_02{
        height: 3px;
        border-top: 2px solid #ddd;
        text-align: center;
    }
</style