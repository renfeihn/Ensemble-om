<template>
  <div>
  <el-tabs :tab-position="tabPosition" >

    <el-tab-pane label="活期产品" >
      <el-collapse-transition>
        <select-prod></select-prod>
      </el-collapse-transition>
    </el-tab-pane>
    <el-tab-pane label="定期产品">定期产品</el-tab-pane>
    <el-tab-pane label="大额存单产品">大额存单产品</el-tab-pane>
    <el-tab-pane label="特色产品">特色产品</el-tab-pane>
  </el-tabs>
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
        tabPosition: 'left'
      }
    }
  }
</script>
<style>
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
