<template>
  <div>
    <v-card >
      <v-toolbar color="white" >
        <v-icon large color="blue darken-2">chat</v-icon>
        <v-toolbar-title>交易单号:{{code}}</v-toolbar-title>
        <v-spacer></v-spacer>
          <v-btn color="info" @click="print()">导出</v-btn>
          <v-btn color="info" @click="addCompare">发布</v-btn>
      </v-toolbar>
    <v-layout row>
      <v-card-text>
         <prod-diff></prod-diff>
      </v-card-text>
    </v-layout>
    </v-card>
          <tran-flow-info></tran-flow-info>
  </div>
</template>
<script>
  import prodDiff from '@/views/prodFactory/prodDiff/prodDiff'
  import tranFlowInfo from './tranFlowInfo'
    export default {
        components: {
            prodDiff,
            tranFlowInfo
        },
      data (){
          return {
              code: ''
          }
      },
        created() {
            this.code = this.$route.params.code;
        },
        methods: {
            print () {
                window.print()
            }
        }
    }
</script>
<style scoped>

</style>