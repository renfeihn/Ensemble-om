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
                                    <v-select :items="acctAttrs" v-model="attrData" label="账户属性" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
                                </v-flex>
                                <v-flex xs12 md2 lg2>
                                    <v-subheader class="primary--text subheading">账户类别 *</v-subheader>
                                </v-flex>
                                <v-flex xs12 md4 lg4>
                                    <!-- <span class="primary--text mx-3 pt-4 subheading">账户类别 *</span> -->
                                    <v-select :items="acctClasses" v-model="classData" label="账户类别" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
                                </v-flex>
                                <!-- </v-layout>
                                        <v-layout row wrap> -->
                                <v-flex xs12 md2 lg2>
                                    <v-subheader class="primary--text subheading">多币种 *</v-subheader>
                                </v-flex>
                                <v-flex xs12 md4 lg4>
                                    <!-- <span class="primary--text mx-4 pt-4 subheading">多币种 *</span> -->
                                    <!-- <v-select class="primary--text mx-1" :items="muticcyflag" v-model="muticcyflagData" label="是否多币种" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select> -->
                                    <v-switch :label="`${muticcyflagData==='Y'?'是':'否'}`" v-model="muticcyflagData" value="Y" color="success" hide-details></v-switch>
                                </v-flex>
                                <v-flex xs12 md2 lg2>
                                    <v-subheader class="primary--text subheading">产品币种 *</v-subheader>
                                </v-flex>
                                <v-flex xs12 md4 lg4>
                                    <!-- <span class="primary--text mx-3 pt-4 subheading">产品币种*</span> -->
                                    <v-select class="primary--text mx-1" :items="ccytype" v-model="ccytypeData" label="币种" item-text="prodDesc" item-value="prodCode" small-chips single-line hide-details multiple></v-select>
                                </v-flex>
                                <!-- </v-layout>
                                        <v-layout row wrap> -->
                                <v-flex xs12 md2 lg2>
                                    <v-subheader class="primary--text subheading">金额类型 *</v-subheader>
                                </v-flex>
                                <v-flex xs12 md4 lg4>
                                    <!-- <span class="primary--text mx-3 pt-4 subheading">金额类型 *</span> -->
                                    <v-select :items="amttype" v-model="amttypeData" label="金额类型" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
                                </v-flex>
                                <v-flex xs12 md2 lg2>
                                    <v-subheader class="primary--text subheading">余额类型 *</v-subheader>
                                </v-flex>
                                <v-flex xs12 md4 lg4>
                                    <!-- <span class="primary--text mx-3 pt-4 subheading">余额类型 *</span> -->
                                    <v-select :items="baltype" v-model="baltypeData" label="余额类型" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
                                </v-flex>
                                <!-- </v-layout>
                                        <v-layout row wrap> -->
                                <v-flex xs12 md2 lg2>
                                    <v-subheader class="primary--text subheading">账户用途 *</v-subheader>
                                </v-flex>
                                <v-flex xs12 md4 lg4>
                                    <!-- <span class="primary--text mx-3 pt-4 subheading">账户用途 *</span> -->
                                    <v-select :items="acctusefor" v-model="acctuseforData" label="账户用途" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
                                </v-flex>
                                <v-flex xs12 md2 lg2>
                                    <v-subheader class="primary--text subheading">介质类型 *</v-subheader>
                                </v-flex>
                                <v-flex xs12 md4 lg4>
                                    <!-- <span class="primary--text mx-3 pt-4 subheading">介质类型 *</span> -->
                                    <v-select :items="mediumtype" v-model="mediumtypeData" label="介质类型" item-text="prodDesc" item-value="prodCode" single-line hide-details></v-select>
                                </v-flex>
                                <v-flex xs12 md2 lg2>
                                    <v-subheader class="primary--text subheading">起始日期 *</v-subheader>
                                </v-flex>
                                <v-flex xs12 md4 lg4>
                                    <v-menu ref="statDateMenu" lazy :close-on-content-click="false" v-model="startDateMenu" transition="scale-transition" offset-y full-width :nudge-bottom="-22" min-width="290px" :return-value.sync="startDate">
                                        <v-text-field slot="activator" label="起始日期" v-model="startDate" append-icon="event" single-line hide-details></v-text-field>
                                        <v-date-picker v-model="startDate" @input="$refs.statDateMenu.save(startDate)" no-title scrollable locale="zh-cn">
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <!-- <v-flex lg2/> -->
                                <v-flex xs12 md2 lg2>
                                    <v-subheader class="primary--text subheading">终止日期 *</v-subheader>
                                </v-flex>
                                <v-flex xs12 md4 lg4>
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
  props: ["listValue"],
  data: () => ({
    listValue: "",
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
    attrData: "",
    classData: "",
    muticcyflagData: "",
    ccytypeData: [],
    amttypeData: "",
    baltypeData: "",
    reducedccyData: "",
    acctuseforData: "",
    mediumtypeData: "",
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
    listValue(val, oldval) {
      if (val !== oldval) {
        this.selectByProd();
      }
    }
  },
  mounted() {
    this.initRefDate();
  },
  methods: {
    selectByProd() {
      getProdData(this.listValue).then(response => {
        this.attrData = response.data.acctFrom.attr;
        this.classData = response.data.acctFrom.class;
        this.muticcyflagData = response.data.acctFrom.muticcyflag;
        this.ccytypeData = response.data.acctFrom.ccytype;
        this.amttypeData = response.data.acctFrom.amttype;
        this.baltypeData = response.data.acctFrom.baltype;
        this.reducedccyData = response.data.acctFrom.reducedccy;
        this.acctuseforData = response.data.acctFrom.acctusefor;
        this.mediumtypeData = response.data.acctFrom.mediumtype;
      });
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
