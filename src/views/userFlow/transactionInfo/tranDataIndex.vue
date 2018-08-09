<template>
  <div>
    <v-card >
      <v-layout row wrap>
        <v-card-text>
          操作单号：FB10002
        </v-card-text>
      </v-layout>
    </v-card>
    <v-card >
    <v-layout row>
      <v-card-text>
         <diff-list></diff-list>
      </v-card-text>
    </v-layout>
    </v-card>
    <v-card >
      <v-card-title>
        <span >流程信息：</span>
      </v-card-title>
      <v-layout row>
        <v-card-text>
          <transaction-info></transaction-info>
        </v-card-text>
      </v-layout>
    </v-card>
  </div>
</template>
<script>
  import diffList from '@/views/prodFactory/prodDiff/diffList/diffList'
  import transactionInfo from './transactionInfo'
    export default {
        components :{
            diffList,
            transactionInfo
        }
    }
</script>
<style scoped>

</style>