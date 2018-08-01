<template>
<div class="table">
  <el-button type="primary" >发布</el-button>
  <el-button type="primary" >驳回</el-button>
  <el-table
    :data="tableData5"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    tooltip-effect="dark"
    ref="multipleTable"
  >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="交易名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="交易状态">
            <span>{{ props.row.status }}</span>
          </el-form-item>
          <el-form-item label="录入人员">
            <span>{{ props.row.role1 }}</span>
          </el-form-item>
          <el-form-item label="录入时间">
            <i class="el-icon-time"></i>
            <span>{{ props.row.date1 }}</span>
          </el-form-item>
          <el-form-item label="复核人员">
            <span>{{ props.row.role2 }}</span>
          </el-form-item>
          <el-form-item label="复核时间">
            <i class="el-icon-time"></i>
            <span>{{ props.row.date2 }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="操作时间"
      prop="date1">
    </el-table-column>
    <el-table-column
      label="交易名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="交易状态"
      prop="status">
    </el-table-column>
    <el-table-column
      label="记录"
     >
      <template slot-scope="scope">
        <el-button type="primary" plain>查看操作记录</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  export default {
    data() {
      return {
        tableData5: [{
          name: '产品工厂',
          role1: 'admin',
          status: '复核',
          date1: '2018-10-2',
          role2: 'param',
          date2: '2018-10-3'
        }, {
          name: '基准利率变更',
          role1: 'admin',
          status: '复核',
          date1: '2018-10-2',
          role2: 'param',
          date2: '2018-10-3'
        }, {
          name: '行内利率维护',
          role1: 'admin',
          status: '复核',
          date1: '2018-10-2',
          role2: 'param',
          date2: '2018-10-3'
        }, {
          name: '费用信息',
          role1: 'admin',
          status: '复核',
          date1: '2018-10-2',
          role2: 'param',
          date2: '2018-10-3'
        }]
      }
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      }
    }
  }
</script>
<style scoped>
  .table {
    margin: 10px;
    padding: 10px;
  }
</style>
