<template>
  <div class="app-container ">
    <el-row :gutter="23">
      <el-col :span="18">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
        <deposit></deposit>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card shadow="hover">

          <down-action></down-action>
        </el-card>
        <el-card shadow="hover" class="foot">
          <div slot="header" class="prodFix">
            <span >产品目录</span>
          </div>
          <prod-tree></prod-tree>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import deposit from '../deposit'
  import prodTree from './prodTree'
  import downAction from '../tableProd/downAction'
  export default {
    components: {
      deposit,
      prodTree,
      downAction
    }
  }
</script>
<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .top {
    padding-left: 50px;
  }
  .foot {
    margin-top: 10px;
  }
  .prodFix {
    color : #fff;
  }
</style>
