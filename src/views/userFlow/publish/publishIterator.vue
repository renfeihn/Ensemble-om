<template>
  <v-container fluid grid-list-md>
     <v-flex xs12 class="text-xs-right">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
     </v-flex>
    <v-data-iterator
      :items="desserts"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      hide-actions
      row
      wrap
    >
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm6
        md4
        lg4
      >
        <v-card>
                    <v-toolbar height=100px card prominent>
                <v-list dense>
                     <v-btn color="info" small >{{props.item.OPERATE_TYPE | operateType}}</v-btn>
                         <v-list-tile v-for="keyData in props.item.key" :key="index">
             <v-icon color="red">star</v-icon>
               {{ keyData | keyColumn}}
                         </v-list-tile>
                </v-list>
              </v-toolbar>
          <v-divider></v-divider>
          <v-list dense >
            <v-list-tile v-for="(columnData ,index) in props.item.dataDui" :key="index">
                         <v-layout row>
                            <v-flex xs6 order-lg2>
              <v-list-tile-content class="text-lg-left">{{index}} : </v-list-tile-content>
                          </v-flex>
                                <v-flex xs6 order-lg2>
                                  
              <v-list-tile-content class="align-end">
                  <v-tooltip v-if="props.item.OPERATE_TYPE=='U'" bottom>
                <span slot="activator" :class="columnData | columnDiffClass( index, props.item.olddataUpd)">
                  {{columnData}}
                  </span>
                     <span> {{columnData | columnDiff( index, props.item.olddataUpd)}}</span>
                </v-tooltip>
                 <span slot="activator" v-else>
                  {{columnData}}
                 </span>
                </v-list-tile-content>
                              </v-flex>
                        </v-layout>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-container>

</template>
<script>
export default {
  filters: {
    column: function(data) {
      const columnValue = data;
      let keys = [];
      for (let p in columnValue) {
        keys.push({ text: p });
      }
      return keys;
    },
    keyColumn: function(data) {
      const key = Object.keys(data);
      const value = data[key];
      return key + ":" + value;
    },
    operateType: function(data) {
      let desc = "修改";
      if (data == "I") {
        desc = "新增";
      } else if (data == "D") {
        desc = "删除";
      }
      return desc;
    },
    columnDiff: function(data, index, oldDataList) {
      let span = "";
      if (oldDataList != null) {
        if (data != oldDataList[index]) {
          span = '原始值：'+ oldDataList[index];
        }
      }
      return span;
    },
    columnDiffClass: function(data, index, oldDataList) {
      let span = "";
      if (oldDataList != null) {
        if (data != oldDataList[index]) {
          span = "SpanFont";
        }
      }

      return span;
    }
  },
  data: () => ({
    rowsPerPageItems: [],
    pagination: {
      rowsPerPage: 3
    },
    desserts: [
      {
        OPERATE_TYPE: "U",
        key: [
          {
            FEE_TYPE: "L01"
          }
        ],
        dataDui: {
          AMORTIZE_DAY: "",
          AMORTIZE_MONTH: "",
          AMORTIZE_PERIOD_FREQ: "",
          AMORTIZE_TIME: "",
          BOUNDARY_AMT_ID: "3",
          BOUNDARY_DESC: "按承兑期限全额累进收费",
          BO_IND: "O",
          CCY_FLAG: "S",
          COMPANY: "",
          CONVERT_FLAG: "B",
          DIS_TYPE: "01",
          FEE_AMT_ID: "",
          FEE_DESC: "承兑承诺费",
          FEE_ITEM: "",
          FEE_MODE: "T",
          MB_CCY_TYPE: "CNY",
          OPEN_BRANCH_PERCENT: "",
          PROD_GRP: "ALL",
          PROFIT_ALLOT_FLAG: "N",
          PROFIT_AMORTIZE_FLAG: "N",
          TAX_TYPE: "",
          TRAN_BRANCH_PERCENT: ""
        },
        olddataUpd: {
          BOUNDARY_AMT_ID: "3",
          BOUNDARY_DESC: "按承兑期限全额累进收费",
          BO_IND: "I",
          CCY_FLAG: "S",
          COLUMN_STATUS: "Y",
          CONVERT_FLAG: "B",
          DIS_TYPE: "01",
          FEE_DESC: "承兑承诺费",
          FEE_MODE: "T",
          FEE_TYPE: "L01",
          MB_CCY_TYPE: "CNY",
          PROD_GRP: "ALL",
          PROFIT_ALLOT_FLAG: "N",
          PROFIT_AMORTIZE_FLAG: "Y"
        }
      },
      {
        OPERATE_TYPE: "I",
        key: [
          {
             FEE_TYPE: "L02"
          }
        ],
        dataDui: {
          AMORTIZE_DAY: "",
          AMORTIZE_MONTH: "",
          AMORTIZE_PERIOD_FREQ: "",
          AMORTIZE_TIME: "",
          BOUNDARY_AMT_ID: "3",
          BOUNDARY_DESC: "按承兑期限全额累进收费",
          BO_IND: "O",
          CCY_FLAG: "S",
          COMPANY: "",
          CONVERT_FLAG: "B",
          DIS_TYPE: "01",
          FEE_AMT_ID: "",
          FEE_DESC: "承兑承诺费",
          FEE_ITEM: "",
          FEE_MODE: "T",
          MB_CCY_TYPE: "CNY",
          OPEN_BRANCH_PERCENT: "",
          PROD_GRP: "ALL",
          PROFIT_ALLOT_FLAG: "N",
          PROFIT_AMORTIZE_FLAG: "N",
          TAX_TYPE: "",
          TRAN_BRANCH_PERCENT: ""
        }
      },
            {
        OPERATE_TYPE: "I",
        key: [
          {
             FEE_TYPE: "L02"
          }
        ],
        dataDui: {
          AMORTIZE_DAY: "",
          AMORTIZE_MONTH: "",
          AMORTIZE_PERIOD_FREQ: "",
          AMORTIZE_TIME: "",
          BOUNDARY_AMT_ID: "3",
          BOUNDARY_DESC: "按承兑期限全额累进收费",
          BO_IND: "O",
          CCY_FLAG: "S",
          COMPANY: "",
          CONVERT_FLAG: "B",
          DIS_TYPE: "01",
          FEE_AMT_ID: "",
          FEE_DESC: "承兑承诺费",
          FEE_ITEM: "",
          FEE_MODE: "T",
          MB_CCY_TYPE: "CNY",
          OPEN_BRANCH_PERCENT: "",
          PROD_GRP: "ALL",
          PROFIT_ALLOT_FLAG: "N",
          PROFIT_AMORTIZE_FLAG: "N",
          TAX_TYPE: "",
          TRAN_BRANCH_PERCENT: ""
        }
      },
            {
        OPERATE_TYPE: "I",
        key: [
          {
             FEE_TYPE: "L02"
          }
        ],
        dataDui: {
          AMORTIZE_DAY: "",
          AMORTIZE_MONTH: "",
          AMORTIZE_PERIOD_FREQ: "",
          AMORTIZE_TIME: "",
          BOUNDARY_AMT_ID: "3",
          BOUNDARY_DESC: "按承兑期限全额累进收费",
          BO_IND: "O",
          CCY_FLAG: "S",
          COMPANY: "",
          CONVERT_FLAG: "B",
          DIS_TYPE: "01",
          FEE_AMT_ID: "",
          FEE_DESC: "承兑承诺费",
          FEE_ITEM: "",
          FEE_MODE: "T",
          MB_CCY_TYPE: "CNY",
          OPEN_BRANCH_PERCENT: "",
          PROD_GRP: "ALL",
          PROFIT_ALLOT_FLAG: "N",
          PROFIT_AMORTIZE_FLAG: "N",
          TAX_TYPE: "",
          TRAN_BRANCH_PERCENT: ""
        }
      },
            {
        OPERATE_TYPE: "I",
        key: [
          {
             FEE_TYPE: "L02"
          }
        ],
        dataDui: {
          AMORTIZE_DAY: "",
          AMORTIZE_MONTH: "",
          AMORTIZE_PERIOD_FREQ: "",
          AMORTIZE_TIME: "",
          BOUNDARY_AMT_ID: "3",
          BOUNDARY_DESC: "按承兑期限全额累进收费",
          BO_IND: "O",
          CCY_FLAG: "S",
          COMPANY: "",
          CONVERT_FLAG: "B",
          DIS_TYPE: "01",
          FEE_AMT_ID: "",
          FEE_DESC: "承兑承诺费",
          FEE_ITEM: "",
          FEE_MODE: "T",
          MB_CCY_TYPE: "CNY",
          OPEN_BRANCH_PERCENT: "",
          PROD_GRP: "ALL",
          PROFIT_ALLOT_FLAG: "N",
          PROFIT_AMORTIZE_FLAG: "N",
          TAX_TYPE: "",
          TRAN_BRANCH_PERCENT: ""
        }
      },
            {
        OPERATE_TYPE: "I",
        key: [
          {
             FEE_TYPE: "L02"
          }
        ],
        dataDui: {
          AMORTIZE_DAY: "",
          AMORTIZE_MONTH: "",
          AMORTIZE_PERIOD_FREQ: "",
          AMORTIZE_TIME: "",
          BOUNDARY_AMT_ID: "3",
          BOUNDARY_DESC: "按承兑期限全额累进收费",
          BO_IND: "O",
          CCY_FLAG: "S",
          COMPANY: "",
          CONVERT_FLAG: "B",
          DIS_TYPE: "01",
          FEE_AMT_ID: "",
          FEE_DESC: "承兑承诺费",
          FEE_ITEM: "",
          FEE_MODE: "T",
          MB_CCY_TYPE: "CNY",
          OPEN_BRANCH_PERCENT: "",
          PROD_GRP: "ALL",
          PROFIT_ALLOT_FLAG: "N",
          PROFIT_AMORTIZE_FLAG: "N",
          TAX_TYPE: "",
          TRAN_BRANCH_PERCENT: ""
        }
      },
            {
        OPERATE_TYPE: "I",
        key: [
          {
             FEE_TYPE: "L02"
          }
        ],
        dataDui: {
          AMORTIZE_DAY: "",
          AMORTIZE_MONTH: "",
          AMORTIZE_PERIOD_FREQ: "",
          AMORTIZE_TIME: "",
          BOUNDARY_AMT_ID: "3",
          BOUNDARY_DESC: "按承兑期限全额累进收费",
          BO_IND: "O",
          CCY_FLAG: "S",
          COMPANY: "",
          CONVERT_FLAG: "B",
          DIS_TYPE: "01",
          FEE_AMT_ID: "",
          FEE_DESC: "承兑承诺费",
          FEE_ITEM: "",
          FEE_MODE: "T",
          MB_CCY_TYPE: "CNY",
          OPEN_BRANCH_PERCENT: "",
          PROD_GRP: "ALL",
          PROFIT_ALLOT_FLAG: "N",
          PROFIT_AMORTIZE_FLAG: "N",
          TAX_TYPE: "",
          TRAN_BRANCH_PERCENT: ""
        }
      },
            {
        OPERATE_TYPE: "I",
        key: [
          {
             FEE_TYPE: "L02"
          }
        ],
        dataDui: {
          AMORTIZE_DAY: "",
          AMORTIZE_MONTH: "",
          AMORTIZE_PERIOD_FREQ: "",
          AMORTIZE_TIME: "",
          BOUNDARY_AMT_ID: "3",
          BOUNDARY_DESC: "按承兑期限全额累进收费",
          BO_IND: "O",
          CCY_FLAG: "S",
          COMPANY: "",
          CONVERT_FLAG: "B",
          DIS_TYPE: "01",
          FEE_AMT_ID: "",
          FEE_DESC: "承兑承诺费",
          FEE_ITEM: "",
          FEE_MODE: "T",
          MB_CCY_TYPE: "CNY",
          OPEN_BRANCH_PERCENT: "",
          PROD_GRP: "ALL",
          PROFIT_ALLOT_FLAG: "N",
          PROFIT_AMORTIZE_FLAG: "N",
          TAX_TYPE: "",
          TRAN_BRANCH_PERCENT: ""
        }
      },
            {
        OPERATE_TYPE: "I",
        key: [
          {
             FEE_TYPE: "L02"
          }
        ],
        dataDui: {
          AMORTIZE_DAY: "",
          AMORTIZE_MONTH: "",
          AMORTIZE_PERIOD_FREQ: "",
          AMORTIZE_TIME: "",
          BOUNDARY_AMT_ID: "3",
          BOUNDARY_DESC: "按承兑期限全额累进收费",
          BO_IND: "O",
          CCY_FLAG: "S",
          COMPANY: "",
          CONVERT_FLAG: "B",
          DIS_TYPE: "01",
          FEE_AMT_ID: "",
          FEE_DESC: "承兑承诺费",
          FEE_ITEM: "",
          FEE_MODE: "T",
          MB_CCY_TYPE: "CNY",
          OPEN_BRANCH_PERCENT: "",
          PROD_GRP: "ALL",
          PROFIT_ALLOT_FLAG: "N",
          PROFIT_AMORTIZE_FLAG: "N",
          TAX_TYPE: "",
          TRAN_BRANCH_PERCENT: ""
        }
      },
            {
        OPERATE_TYPE: "I",
        key: [
          {
             FEE_TYPE: "L02"
          }
        ],
        dataDui: {
          AMORTIZE_DAY: "",
          AMORTIZE_MONTH: "",
          AMORTIZE_PERIOD_FREQ: "",
          AMORTIZE_TIME: "",
          BOUNDARY_AMT_ID: "3",
          BOUNDARY_DESC: "按承兑期限全额累进收费",
          BO_IND: "O",
          CCY_FLAG: "S",
          COMPANY: "",
          CONVERT_FLAG: "B",
          DIS_TYPE: "01",
          FEE_AMT_ID: "",
          FEE_DESC: "承兑承诺费",
          FEE_ITEM: "",
          FEE_MODE: "T",
          MB_CCY_TYPE: "CNY",
          OPEN_BRANCH_PERCENT: "",
          PROD_GRP: "ALL",
          PROFIT_ALLOT_FLAG: "N",
          PROFIT_AMORTIZE_FLAG: "N",
          TAX_TYPE: "",
          TRAN_BRANCH_PERCENT: ""
        }
      },
            {
        OPERATE_TYPE: "I",
        key: [
          {
             FEE_TYPE: "L02"
          }
        ],
        dataDui: {
          AMORTIZE_DAY: "",
          AMORTIZE_MONTH: "",
          AMORTIZE_PERIOD_FREQ: "",
          AMORTIZE_TIME: "",
          BOUNDARY_AMT_ID: "3",
          BOUNDARY_DESC: "按承兑期限全额累进收费",
          BO_IND: "O",
          CCY_FLAG: "S",
          COMPANY: "",
          CONVERT_FLAG: "B",
          DIS_TYPE: "01",
          FEE_AMT_ID: "",
          FEE_DESC: "承兑承诺费",
          FEE_ITEM: "",
          FEE_MODE: "T",
          MB_CCY_TYPE: "CNY",
          OPEN_BRANCH_PERCENT: "",
          PROD_GRP: "ALL",
          PROFIT_ALLOT_FLAG: "N",
          PROFIT_AMORTIZE_FLAG: "N",
          TAX_TYPE: "",
          TRAN_BRANCH_PERCENT: ""
        }
      },
            {
        OPERATE_TYPE: "I",
        key: [
          {
             FEE_TYPE: "L02"
          }
        ],
        dataDui: {
          AMORTIZE_DAY: "",
          AMORTIZE_MONTH: "",
          AMORTIZE_PERIOD_FREQ: "",
          AMORTIZE_TIME: "",
          BOUNDARY_AMT_ID: "3",
          BOUNDARY_DESC: "按承兑期限全额累进收费",
          BO_IND: "O",
          CCY_FLAG: "S",
          COMPANY: "",
          CONVERT_FLAG: "B",
          DIS_TYPE: "01",
          FEE_AMT_ID: "",
          FEE_DESC: "承兑承诺费",
          FEE_ITEM: "",
          FEE_MODE: "T",
          MB_CCY_TYPE: "CNY",
          OPEN_BRANCH_PERCENT: "",
          PROD_GRP: "ALL",
          PROFIT_ALLOT_FLAG: "N",
          PROFIT_AMORTIZE_FLAG: "N",
          TAX_TYPE: "",
          TRAN_BRANCH_PERCENT: ""
        }
      },
      {
        OPERATE_TYPE: "D",
        key: [
          {
           FEE_TYPE: "L04"
          }
        ],
        dataDui: {
          AMORTIZE_DAY: "",
          AMORTIZE_MONTH: "",
          AMORTIZE_PERIOD_FREQ: "",
          AMORTIZE_TIME: "",
          BOUNDARY_AMT_ID: "3",
          BOUNDARY_DESC: "按承兑期限全额累进收费",
          BO_IND: "O",
          CCY_FLAG: "S",
          COMPANY: "",
          CONVERT_FLAG: "B",
          DIS_TYPE: "01",
          FEE_AMT_ID: "",
          FEE_DESC: "承兑承诺费",
          FEE_ITEM: "",
          FEE_MODE: "T",
          MB_CCY_TYPE: "CNY",
          OPEN_BRANCH_PERCENT: "",
          PROD_GRP: "ALL",
          PROFIT_ALLOT_FLAG: "N",
          PROFIT_AMORTIZE_FLAG: "N",
          TAX_TYPE: "",
          TRAN_BRANCH_PERCENT: ""
        }
      }
    ],
    items: [
      {
        value: false,
        name: "ATTR_KEY：CD_APPLY_MAX_NUM",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: "14%",
        iron: "1%"
      },
      {
        value: false,
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        sodium: 129,
        calcium: "8%",
        iron: "1%"
      },
      {
        value: false,
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        sodium: 337,
        calcium: "6%",
        iron: "7%"
      },
      {
        value: false,
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        sodium: 413,
        calcium: "3%",
        iron: "8%"
      },
      {
        value: false,
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        sodium: 327,
        calcium: "7%",
        iron: "16%"
      },
      {
        value: false,
        name: "Jelly bean",
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        sodium: 50,
        calcium: "0%",
        iron: "0%"
      },
      {
        value: false,
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        sodium: 38,
        calcium: "0%",
        iron: "2%"
      },
      {
        value: false,
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        sodium: 562,
        calcium: "0%",
        iron: "45%"
      },
      {
        value: false,
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        sodium: 326,
        calcium: "2%",
        iron: "22%"
      },
      {
        value: false,
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        sodium: 54,
        calcium: "12%",
        iron: "6%"
      }
    ]
  }),
      computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    }
};
</script>
<style scoped>
.pulishToolbar {
  height: 100px;
}
.pulishToolbar .v-toolbar__content {
  height: 100px;
}
.SpanFont {
  color: #b2ebf2;
  font-weight: bold;
  font-size: 18px
}
</style>