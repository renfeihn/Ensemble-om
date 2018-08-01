<template>
  <el-collapse accordion >
    <el-collapse-item >
      <template slot="title">
      产品变动 ProdDiff<i class="header-icon el-icon-info"></i>
      </template>
    <div>
      <basic-diff ></basic-diff>
    </div>
  </el-collapse-item>
  <el-collapse-item>
  <template slot="title">
    产品原始信息 ProdInfo<i class="header-icon el-icon-info"></i>
  </template>
   <basic></basic>
  </el-collapse-item>
</el-collapse>
</template>
<script>
  import basicDiff from './basicDiff'
  import basic from '../components/basic'
  export default {
    components: {
      basicDiff,
      basic
    },
    data() {
      return {
        activeName: '1'
      }
    }
  }
</script>

