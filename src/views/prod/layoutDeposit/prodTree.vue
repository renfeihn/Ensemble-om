<template>
  <div>
    <el-input v-model="filterText" placeholder="输入关键字进行过滤"><i class="el-icon-search"></i></el-input>
    <el-tree
      class="filter-tree" :data="depositProdData" :props="defaultProps" default-expand-all highlight-current
      ref="tree2">
    </el-tree>
  </div>
</template>

<script>
  import {
    getDepositProdInfo
  } from '@/api/prod'
  export default {
    data() {
      return {
        filterText: '',
        test2: '',
        depositProdData: [{
          value: 'deposit',
          label: '活期存款',
          children: []
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      }
    },
    methods: {
      handleNodeClick(data) {
        console.log(data)
      },
      filterNode(value, data) {
        if (!value) {
          return true
        }
        return data.label.indexOf(value) !== -1
      },
      queryDespositProdData() {
        getDepositProdInfo().then(response => {
          this.depositProdData = response.data.depositProd
        })
      }
    },
    mounted: function() {
      this.queryDespositProdData()
    }
  }
</script>

<style scoped>
  .tree {
    height: 600px;
    font-family: Helvetica;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .span {
    font-size: 16px;
  }
  .filter-tree {
    height: 373px;
    overflow-x: hidden;
    overflow-y: auto;
  }

</style>
