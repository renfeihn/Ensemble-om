<template>
  <div class="app-container">
    <el-table :data="irlAccounting" @row-click="select" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column      prop="prodType"
                            label="产品类型"
                            sortable    >
      </el-table-column>
      <el-table-column prop="accountingStatus"
                       label="核算状态"
                       sortable       >

      </el-table-column>
      <el-table-column prop="subjectCode"
                       label="负债科目代码"
                    sortable   >

      </el-table-column>
      <el-table-column prop="rateCode"
                       label="利息支出科目代码"
                       sortable    >

      </el-table-column>
      <el-table-column prop="DSubjectCode"
                       label="应付利息科目代码"
                       sortable       >

      </el-table-column>
    </el-table>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        irlAccounting: [],
        listLoading: true
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true

      },
      select(msg) {
        this.$emit('select', msg)
      }
    }
  }
</script>
