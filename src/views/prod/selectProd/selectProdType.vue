<template>
  <div class="block">
    <span class="demonstration">  <i class="el-icon-search"></i></span>
    <el-cascader
      class="select"
      placeholder="产品类型"
      :options="options"
      filterable
    ></el-cascader>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        options: [{
          value: 'RB',
          label: '存款产品',
          children: [{
            value: 'RB100',
            label: '活期存款',
            children: [{
              value: 'RB10001',
              label: '个人活期'
            }, {
              value: 'RB10002',
              label: '个人外币活期存款'
            }, {
              value: 'RB10010',
              label: '单位活期存款'
            }
            ]
          }, {
            value: 'RB200',
            label: '定期产品',
            children: [{
              value: 'RB10001',
              label: '个人定期'
            }
            ]
          }]
        }, {
          value: 'CL',
          label: '贷款产品',
          children: [{
            value: 'basic',
            label: 'Basic'
          }, {
            value: 'form',
            label: 'Form'
          }, {
            value: 'data',
            label: 'Data'
          }, {
            value: 'others',
            label: 'Others'
          }]
        }, {
          value: 'GL',
          label: '内部帐产品',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        value8: ''
      }
    }
  }
</script>
<style scoped>
  .select {
    width:483px;
  }
</style>
