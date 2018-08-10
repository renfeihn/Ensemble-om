<template>
  <div>

    <v-btn color="success" depressed=""><v-icon >assignment_turned_in</v-icon>暂存</v-btn>
    <v-btn color="success" depressed=""><v-icon >history</v-icon>复制</v-btn>
    <v-btn color="success" depressed=""><v-icon >history</v-icon>保存</v-btn>
  </div>
</template>
<style>

  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }

</style>

<script>
  export default {
    methods: {
      handleClick() {
        alert('button click')
      }
    }
  }
</script>
