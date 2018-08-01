<template>
  <div class="app-container">
    <prod-deom></prod-deom>
    <el-tabs type="border-card">
      <el-button icon="el-icon-search"  @click='dialogVisible = true' circle>检索</el-button>
      <el-dialog
        title="产品类型"
        :visible.sync="dialogVisible"
        width="38%"
        :before-close="handleClose">
        <span>
        <select-prod-type></select-prod-type>
        </span>
        <span slot="footer" class="dialog-footer">
       </span>
      </el-dialog>
      <el-button icon="el-icon-search"  @click='dialogVisible2 = true' circle>检索2</el-button>
      <el-dialog
        title="产品类型"
        :visible.sync="dialogVisible2"
        width="38%"
        :before-close="handleClose">
        <span>
        <select-prod-type2></select-prod-type2>
        </span>
        <span slot="footer" class="dialog-footer">
       </span>
      </el-dialog>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 存款产品</span>
        <tabs-tree-prod></tabs-tree-prod>
      </el-tab-pane>
      <el-tab-pane label="贷款产品">贷款产品</el-tab-pane>
      <el-tab-pane label="内部帐产品">内部帐产品</el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>
  import tabsTreeProd from './tabsTreeProd'
  import prodDeom from '../prodDeom'
  import selectProdType from '../selectProd/selectProdType'
  import selectProdType2 from '../selectProd/selectProdType2.vue'
  export default {
    data() {
      return {
        dialogVisible: false,
        dialogVisible2: false
      }
    },
    components: {
      tabsTreeProd,
      prodDeom,
      selectProdType,
      selectProdType2
    },
    methods: {
      handleClose(done) {
        this.dialogVisible = false
        this.dialogVisible2 = false
      }
    }
  }
</script>


