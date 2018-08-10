<template>
  <div class="collapseTree">
      <v-flex >
          <vue-perfect-scrollbar class="prodListTree">
                  <v-list>
                      <v-list-group
                              v-model="item.active"
                              v-for="item in data"
                              :key="item.label"
                              :prepend-icon="item.action"
                              no-action
                      >
                          <v-list-tile slot="activator">
                              <v-list-tile-content>
                                  <v-list-tile-title>{{item.prodClass}}-{{item.prodClassDesc}}</v-list-tile-title>
                              </v-list-tile-content>
                          </v-list-tile>
                       <plain-table-order3 v-bind="item.prodClass"></plain-table-order3>
                      </v-list-group>
                  </v-list>
          </vue-perfect-scrollbar>
      </v-flex>
  </div>
</template>

<script>
  import {
    getDepositProdList
  } from '@/api/prod'
  import {
      getUserCollectProds
  } from '@/api/prod'
  import PlainTableOrder3 from './PlainTableOrder3'
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  export default {
      components: {
          VuePerfectScrollbar,
          PlainTableOrder3
      },
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
      mounted: function() {
          this.getUserCollectProds()
      },
    methods: {
      handleNodeClick(data) {
        console.log(data)
      },
        getUserCollectProds() {
            getUserCollectProds().then(response => {
                let length =  response.data.collectProdsForm.length
                for(let i=0; i<length; i++){
                    if (response.data.collectProdsForm[i].prodModel === 'CL'){
                        let flag = 0
                        for(let j=0; j<i; j++){
                            if(response.data.collectProdsForm[j].prodClass === response.data.collectProdsForm[i].prodClass){
                                flag = 1
                                continue
                            }
                        }
                        if(flag === 0){
                            this.data.push(response.data.collectProdsForm[i])
                        }
                    }
                }
            })
        }
    }
  }
</script>
<style>
    .prodListTree {
        height: calc(60vh - 48px);
    }
</style>
