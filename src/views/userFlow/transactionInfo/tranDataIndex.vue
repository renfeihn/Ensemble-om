<template>
  <div>
    <v-card >
      <v-toolbar color="white" >
        <v-icon large color="blue darken-2">chat</v-icon>
        <v-toolbar-title>交易单号:{{code}}</v-toolbar-title>
        <v-spacer></v-spacer>
          <v-btn color="info" @click="print()">导出</v-btn>
          <v-btn color="info">{{optValue}}</v-btn>
      </v-toolbar>
    <v-layout row>
      <v-card-text>
         <prod-diff :mainSeqNo="code"></prod-diff>
      </v-card-text>
    </v-layout>
    </v-card>
          <tran-check-flow-info v-if="optKey==3" ></tran-check-flow-info>
    <tran-release-flow-info v-if="optKey==4"></tran-release-flow-info>
  </div>
</template>
<script>
  import prodDiff from '@/views/prodFactory/prodDiff/prodDiff'
  import tranCheckFlowInfo from './tranCheckFlowInfo'
  import tranReleaseFlowInfo from './tranReleaseFlowInfo'

  export default {
        components: {
            prodDiff,
            tranCheckFlowInfo,
            tranReleaseFlowInfo
        },
      data (){
          return {
              code: '',
              optKey: 0,
              optValue: ''
          }
      },
        created() {
            this.code = this.$route.params.code
            this.optValue = this.$route.params.optValue
            this.setOptKey(this.optValue)
        },
        methods: {
            setOptKey(val) {
                if(val === "复核") {
                    this.optKey = 3
                }
                if(val === "发布") {
                    this.optKey = 4
                }
            },
            print () {
                window.print()
            }
//            ,
//            addCompare () {
//
//            }
        }
    }
</script>
<style scoped>

</style>