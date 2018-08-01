<template>
  <div class="app-container">
    <div class="menu">
  <el-card shadow="hover" clase="box-card">
    <div slot="header" class="clearfix">
      <span>产品目录</span>
    </div>
    <div class="item">
      <el-row :span="2"><div class="text bg-purple">活期产品</div></el-row>
      <el-row :span="2"><div class="text">定期产品</div></el-row>
      <el-row :span="2"><div class="text">大额存单产品</div></el-row>
      <el-row :span="2"><div class="text">特色产品</div></el-row>
    </div>
  </el-card>
    </div>
    <div class="prod">
      <select-prod ></select-prod>
    </div>
  </div>
</template>
<script>
  import selectProd from '../tableProd/selectProd'
  export default {
    components: {
      selectProd
    },
    data() {
      return {
        show3: true
      }
    }
  }
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    display:inline;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .menu, .prod {
    display: inline-block;
  }
</style>
