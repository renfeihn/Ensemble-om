<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
  >
    <el-table-column
      prop="prodType"
      label="产品类型"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="prodDesc"
      label="产品描述"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="prodStatus"
      label="产品状态"
      >
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <down-action></down-action>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import downAction from './downAction'
  export default {
    components: {
      downAction
    },
    data() {
      return {
        tableData: [{
          prodType: 'RB10001',
          prodDesc: '个人活期存款',
          prodStatus: '启用'
        }, {
          prodType: 'RB10002',
          prodDesc: '个人外币活期存款',
          prodStatus: '启用'
        }, {
          prodType: 'RB10003',
          prodDesc: '单位活期',
          prodStatus: '启用'
        }, {
          prodType: 'RB10003',
          prodDesc: '单位活期多币种',
          prodStatus: '启用'
        }]
      }
    },
    methods: {
      handleEdit(row, column) {
        this.$router.push({ name: 'deposit', params: {}})
      }
    }
  }
</script>
