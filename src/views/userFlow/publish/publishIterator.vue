<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      :items="desserts"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
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
          <v-card-title>
                <v-list dense >
                         <v-list-tile v-for="keyData in props.item.key" :key="index">
             <v-icon color="red">star</v-icon>
               {{ keyData | keyColumn}}
                         </v-list-tile>
                </v-list>
            </v-card-title>
          <v-divider></v-divider>
          <v-list dense >
            <v-list-tile v-for="(columnData ,index) in props.item.dataDui" :key="index">
                         <v-layout row>
                            <v-flex xs6 order-lg2>
              <v-list-tile-content class="text-lg-left">{{index}} : </v-list-tile-content>
                          </v-flex>
                                <v-flex xs6 order-lg2>
              <v-list-tile-content class="align-end">{{ columnData }}</v-list-tile-content>
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
      const key=Object.keys(data);
      const value=data[key]
      return key+':'+value
    } 
  },
  data: () => ({
    rowsPerPageItems: [3, 6, 9],
    pagination: {
      rowsPerPage: 3
    },
    desserts: [
      {
        OPERATE_TYPE: "U",
        key: [
          {
            ATTR_KEY: "CD_APPLY_MAX_NUM"
          }
        ],
        dataDui: {
          ATTR_CLASS: "MEDIA",
          ATTR_DESC: "制卡申请允许最大数量",
          ATTR_TYPE: "STRING",
          COMPANY: "",
          SET_VALUE_FLAG: "",
          STATUS: "A",
          USE_METHOD: "EVAL",
          VALUE_METHOD: "VL"
        },
        olddataUpd: {
          DiffData: "原始数据",
          ATTR_CLASS: "MEDIA2",
          ATTR_DESC: "制卡申请允许最大数量2",
          ATTR_TYPE: "LONG",
          COMPANY: "",
          SET_VALUE_FLAG: "",
          STATUS: "A",
          USE_METHOD: "EVAL",
          VALUE_METHOD: "VL"
        }
      },
      {
        OPERATE_TYPE: "I",
        dataDui: {
          ATTR_CLASS: "MEDIA",
          ATTR_DESC: "制卡申请允许最大数量",
          ATTR_TYPE: "STRING",
          COMPANY: "",
          SET_VALUE_FLAG: "",
          STATUS: "A",
          USE_METHOD: "EVAL",
          VALUE_METHOD: "VL"
        }
      },
      {
        OPERATE_TYPE: "D",
        dataDui: {
          ATTR_CLASS: "MEDIA",
          ATTR_DESC: "制卡申请允许最大数量",
          ATTR_TYPE: "STRING",
          COMPANY: "",
          SET_VALUE_FLAG: "",
          STATUS: "A",
          USE_METHOD: "EVAL",
          VALUE_METHOD: "VL"
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
  })
};
</script>