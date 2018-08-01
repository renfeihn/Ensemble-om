<template>
  <el-tabs tab-position="top" v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="复核" >
      <pushil :prod-from="prodFrom"></pushil>
    </el-tab-pane>
    <el-tab-pane label="发布" name="pushil">
      <pushil :acct-from="acctFrom"></pushil>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import pushil from './pushil'
  export default {
    data() {
      return {
        activeName: 'pushil'
      }
    },
    components: {
      pushil
    },
    methods: {

    }
  }
</script>
