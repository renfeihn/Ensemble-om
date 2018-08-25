<template>
 <v-data-table
    :headers="desserts | column"
    :items="desserts"
    hide-actions
    item-key="OPERATE_TYPE"
    class="elevation-1 px-0"
    :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
  >
    <template slot="items" slot-scope="props">
     <tr :class='props.item.OPERATE_TYPE'>
      <td class="text-xs-right">{{props.item.OPERATE_TYPE}}</td>
      <td v-for='(i , index) in props.item.dataDui' class="text-xs-right">
         <v-tooltip bottom>
        <span slot="activator" :class="i | columnDiff( index, props.item.olddataUpd)">{{i}}
        </span>
           <span>变更前数据</span>
         </v-tooltip>
        </td>
     </tr>
    </template>
  </v-data-table>
</template>
<script>
export default {
  filters: {
    column: function(data) {
      const columnValue = data[0].dataDui;
      let keys = [{text: 'OPERATE_TYPE'}];
      for (let p in columnValue) {
        keys.push({ text: p });
      }
      return keys;
    },
    columnDiff: function(data, index, oldDataList) {
       let span=''
       if(oldDataList != null){
        if(data != oldDataList[index]){
         span="SpanFont"
        }
       }

      return span;
    }
  },
  data() {
    return {
      headers: [
        {
          OPERATE_TYPE: "",
          ATTR_CLASS: "MEDIA",
          ATTR_DESC: "制卡申请允许最大数量",
          ATTR_TYPE: "STRING",
          COMPANY: "",
          SET_VALUE_FLAG: "",
          STATUS: "A",
          USE_METHOD: "EVAL",
          VALUE_METHOD: "VL"
        }
      ],
      columnV: [],
      desserts: [
        {
          OPERATE_TYPE: "U",
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
          olddataUpd: 
            {
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
      ]
    };
  }
};
</script>
<style>
.I {
  background-color: #B2EBF2;
}
.D {
  background-color: #FFCDD2;
}
.SpanFont {
  color: #B2EBF2;
  font-weight:bold
}
</style>