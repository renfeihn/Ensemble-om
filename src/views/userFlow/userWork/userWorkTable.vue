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
                                        <td class="text-xs-left">{{ props.item.flowManage.tranId }}</td>
                                        <td class="text-xs-left">{{ props.item.flowManage.date }}</td>
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
  data() {
    let value = "accountingStatus";
    return {
      selected: [],
      desserts: [
        {
          flowManage: {
          reqNo: "pf3009",
          transactionId: "产品工厂",
          date: "2018/07/02",
          currentStatus: "待复核"
          },
          flowInfo: {
          operatorId: "admin"
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
  mounted: function() {
    this.queryDespositProdData();
  },
  methods: {
    prodAction() {
      this.$router.push({
        name: "userWorkTags"
      });
    },
    queryDespositProdData() {
      getFlowList().then(response => {
        this.desserts = response.data;
      });
    },

    getDataInfo(code) {
      this.$router.push({ name: "tranDataIndex", params: { code: code } });
    }
  }
};
</script>
