<template>
  <div class="block">
    <span class="demonstration">  <i class="el-icon-search"></i></span>
    <el-select v-model="value7" filterable  class="select" placeholder="请选择">
      <el-option-group
        v-for="group in options3"
        :key="group.label"
        :label="group.label">
        <el-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-option-group>
    </el-select>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        options3: [{
          value: 'RB100',
          label: '活期存款',
          options: [{
            value: 'RB10001',
            label: '个人活期'
          }, {
            value: 'RB10002',
            label: '个人定期'
          }]
        },
        {
          value: 'RB200',
          label: '定期产品',
          options: [{
            value: 'RB10003',
            label: '个人定期'
          }]
        }],
        value7: ''
      }
    }
  }
</script>
<style scoped>
  .select {
    width: 483px;
  }
</style>
