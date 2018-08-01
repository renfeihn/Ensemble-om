<template>
  <div class="app-container">
    <el-row>
<!--      <el-col :span=4>
        <el-button type="primary" >这是el-col内的button</el-button>
      </el-col>-->
      <el-col :span=22>
        <div class="line">
            <el-tag
              :key="产品类型"
              type="info">
              产品类型:RB10001
            </el-tag>
            <el-tag
              :key="版本号"
              type="info">
              版本号:v0.1
            </el-tag>
        </div>
        <el-tabs tab-position="top" v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="prodDiff">
            <prod-basic-diff ></prod-basic-diff>
          </el-tab-pane>
          <el-tab-pane label="账户信息" name="acct">
            <prod-basic-diff> </prod-basic-diff>
          </el-tab-pane>
          <el-tab-pane label="核算信息" name="irlAccounting">
            <table-top-form ></table-top-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // import queryheader from './components/queryheader'
  import basic from '../components/basic'
  import acct from '../components/acct'
  import tableTopForm from '../../tableTopForm/tableTopForm'
  import Sticky from '@/components/Sticky' // 粘性header组件
  import prodBasicDiff from './prodBasicDiff'
  import {
    getProdInfo
  } from '@/api/prod'
  export default {
    name: 'deposit',
    components: {
      basic,
      acct,
      Sticky,
      tableTopForm,
      prodBasicDiff
    },
    data() {
      return {
        listLoading: true,
        depositProd: {
          prodcode: '100002',
          version: '1.0'
        },
        activeName: 'prodDiff',
        prodFrom: {
          ccy: []
        },
        acctFrom: {}
      }
    },
    created() {
      this.depositProd = { prodcode: this.$route.params.prodType, version: '1.0' }
    },
    methods: {
      queryProdInfo() {
        console.log('start query prod info')
        getProdInfo().then(response => {
          console.log(response)
          this.depositProd = response.data.depositProd
          this.prodFrom = response.data.prodFrom
          this.acctFrom = response.data.acctFrom
        })
      },
      selectByProd() {
        // this.$bus.$emit('prodType', this.depositProd.prodtype)
        // console.log(this.depositProd.prodtype)
      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
      onSubmit() {
        this.$message('submit!')
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      }
    }
  }
</script>

<style scoped>
  .line {
    text-align: left;
    margin: 1px;
    padding: 1px;
    width:1500px;
  }
</style>

