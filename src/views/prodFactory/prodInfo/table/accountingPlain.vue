<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-btn color="success" depressed="">新增</v-btn>
      <v-btn color="success" depressed="">修改</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-data-table
          :headers="headers"
          :items="projects"
          hide-actions
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.prodType }}</td>
            <td class="text-xs-left">{{ props.item.accountingStatus }}</td>
            <td class="text-xs-left">{{ props.item.subjectCode }}</td>
            <td class="text-xs-left">{{ props.item.rateCode }}</td>
            <td class="text-xs-left">{{ props.item.DSubjectCode }}</td>
          </template>
        </v-data-table>
      </template>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>
<script>
import {getList} from '@/api/table';
export default {
  data () {
    return {
        headers: [

            {
                text: '产品类型',
                align: 'left',
                value: 'prodType'
            },
            {text: '核算状态', value: 'accountingStatus'},
            {text: '负债科目代码', value: 'subjectCode'},
            {text: '利息支出科目代码', value: 'rateCode' },
            {text: '应付利息科目代码', value: 'DSubjectCode'}

        ],
      projects: [     { prodType: '',
          accountingStatus: '',
          subjectCode: '',
          rateCode: '',
          DSubjectCode: ''}]
    };
  },
  methods: {
      queryDespositProdData() {
          getList().then(response => {
              this.projects = response.data.irlAccounting
          })
      }
  },
    mounted: function() {
        this.queryDespositProdData()
    }
};
</script>
