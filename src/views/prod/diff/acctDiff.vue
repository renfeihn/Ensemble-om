<template>
  <el-table
    :data="tableData3"
    height="250"
    :row-style="rowClass"
    :header-cell-style="headerClass"
    border
    style="width: 100%">
    <el-table-column
      prop="info"
      label="变更信息"
      width="180">
    </el-table-column>
    <el-table-column
      prop="beforeInfo"
      label="变更前内容"
      width="180">
    </el-table-column>
    <el-table-column
      prop="afterInfo"
      label="变更后内容">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData3: [{
          info: '产品状态',
          beforeInfo: '不生效',
          afterInfo: '生效'
        }, {
          info: '账户计息标志',
          beforeInfo: '不计息',
          afterInfo: '计息'
        }, {
          info: '账户类型',
          beforeInfo: '储蓄账户',
          afterInfo: '结算账户'
        }, {
          info: '金额标志',
          beforeInfo: '不记录余额',
          afterInfo: '主子都记录余额'
        }, {
          info: '产品分类',
          beforeInfo: '个人存款组',
          afterInfo: '对公存款组'
        }, {
          info: '利润中心',
          beforeInfo: '9999',
          afterInfo: '1000'
        }, {
          info: '生效日期',
          beforeInfo: '1999-10-2',
          afterInfo: '2019-03-2'
        }]
      }
    },
    methods: {
      rowClass() {
        return { 'background-color': '#f07580' }
      },
      headerClass() {
        return { 'background-color': '#c8f087' }
      }
    }
  }
</script>
