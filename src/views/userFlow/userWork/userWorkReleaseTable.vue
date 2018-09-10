<template>
    <v-data-table :headers="headers" :items="desserts" :rows-per-page-items="[10,25,50,{text:'All','value':-1}]" class="elevation-1 px-0" item-key="code" select-all light v-model="selected">
        <template slot="items" slot-scope="props">
                                    <tr @click="props.expanded = !props.expanded">
                                  <td>
                                    <v-checkbox
                                            primary
                                            hide-details
                                            v-model="props.selected"
                                    ></v-checkbox>
                                  </td>
                                        <td class="text-xs-left">{{ props.item.flowManage.mainSeqNo }}</td>
                                        <td class="text-xs-left">{{ props.item.flowManage.tranDesc }}</td>
                                        <td class="text-xs-left">{{ props.item.flowInfo.tranTime }}</td>
                                        <td class="text-xs-left">{{ props.item.flowManage.status }}</td>
                                        <td class="text-xs-left">{{ props.item.flowInfo.userId }}</td>
                                        <td class="text-xs-left" @click="getDataInfo(props.item.reqNo)">详细信息</td>
                                    </tr>
      </template>
<template slot="expand" slot-scope="props">
    <v-card flat>
        <v-card-text>录入人信息：para</v-card-text>
    </v-card>
</template>
        </v-data-table>
</template>
<script>
import { getFlowList } from "@/api/url/prodInfo";
export default {
    props: ["userWorkData"],
    data() {
    let value = "accountingStatus";
    return {
      selected: [],
      desserts: [
        {
          flowManage: {
          detSeqNo: "pf3009",
          isTranGroup: "产品工厂",
          mainSeqNo: "",
          status: "待复核",
              tranDesc: "",
              tranId: ""
          },
            flowInfo: {
                tranTime: "",
                userId: ""
            }
        }
      ],
            headers: [
        {
          text: "任务单号",
          align: "left",
          value: "code"
        },
        {
          text: "交易名称",
          align: "left",
          value: "name"
        },
        {
          text: "操作时间",
          value: "date"
        },
        {
          text: "交易状态",
          value: "status"
        },
        {
          text: "操作人 ",
          value: "roleLast"
        },
        {
          text: "详细信息",
          value: "DSubjectCode"
        }
      ],
      projects: [
        {
          prodType: "",
          accountingStatus: "",
          subjectCode: "",
          rateCode: "",
          DSubjectCode: ""
        }
      ]
    };
  },
//  mounted: function() {
//    this.queryDespositProdData();
//  },
    watch: {
        userWorkData(val) {
            this.queryDespositProdData(val)
        }
    },
  methods: {
    prodAction() {
      this.$router.push({
        name: "userWorkTags"
      });
    },
      queryDespositProdData(val) {
          this.desserts = []
          let length = val.length
          for(let j = 0; j<length; j++){
              if(val[j].flowManage.status === "3"){
                  val[j].flowManage.status = "已复核"
                  this.desserts.push(val[j])
              }
          }
      },

    getDataInfo(code) {
      this.$router.push({ name: "tranDataIndex", params: { code: code ,optValue: "发布",flowInfo: this.desserts} });
    }
  }
};
</script>
