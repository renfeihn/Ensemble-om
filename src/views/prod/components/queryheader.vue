<template>
  <div class="app-container line">
    <el-form :inline="true" :model="depositProd" class="demo-form-inline">
      <el-form-item label="产品类型">
        <el-select v-model="depositProd.prodtype" placeholder="产品类型" @change="selectByProd">
          <el-option label="对私活期" value="RB100"></el-option>
          <el-option label="对公活期" value="RB200"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="版本号">
        <el-input v-model="depositProd.version" placeholder="版本号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        depositProd: {
          prodtype: '',
          version: '1.0'
        }
      }
    },
    methods: {
      onSubmit() {
        // this.$message("submit!")
      },
      selectByProd() {
        // this.$bus.$emit('prodType', this.depositProd.prodtype)
        console.log(this.depositProd.prodtype)
      }
    }
  }
</script>
<style scoped>
  .line {
    text-align: center;
  }
</style>