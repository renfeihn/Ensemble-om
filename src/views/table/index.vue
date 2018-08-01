<template>
  <div class="app-container">
    <el-table :data="irlAccounting" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column      prop="prodType"
                            label="产品类型"
                            sortable width="110">
      </el-table-column>
      <el-table-column prop="accountingStatus"
                       label="核算状态"
                       sortable width="110">

      </el-table-column>
      <el-table-column prop="subjectCode"
                       label="负债科目代码"
                       sortable width="150">

      </el-table-column>
      <el-table-column prop="rateCode"
                       label="利息支出科目代码"
                       sortable width="150">

      </el-table-column>
      <el-table-column prop="DSubjectCode"
                       label="应付利息科目代码"
                       sortable width="150">

      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      irlAccounting: null,
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
      getList(this.listQuery).then(response => {
        this.irlAccounting = response.data.irlAccounting
        this.listLoading = false
      })
    }
  }
}
</script>
