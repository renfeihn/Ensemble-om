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
                                  <v-list-tile-title>{{item.label }}</v-list-tile-title>
                              </v-list-tile-content>
                          </v-list-tile>
                      <v-list-tile avatar v-for="subItem in item.children" :key="subItem.label" href="#">
                          <v-list-tile-action>
                              <v-icon color="pink">star</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                              <v-list-tile-title >{{subItem.label}}</v-list-tile-title>
                          </v-list-tile-content>
                          <v-list-tile-avatar>
                              <img :src="item.avatar">
                          </v-list-tile-avatar>
                      </v-list-tile>
                      </v-list-group>
                  </v-list>
          </vue-perfect-scrollbar>
      </v-flex>
  </div>
</template>
<script>


</script>
<script>
  import {
    getDepositProdList
  } from '@/api/prod'
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  export default {
    data() {
      return {
        data: [{
          label: 'RB100-个人活期',
            action: 'local_activity',
          children: [{label: 'RB100-个人活期'},{label: 'RB100-个人活期'},{label: 'RB100-个人活期'}]
        }, {
          label: 'RB101-单位活期',
            action: 'restaurant',
          children: [{label: 'RB100-个人活期'},{label: 'RB100-个人活期'},{label: 'RB100-个人活期'}]
        }, {
          label: 'RB102-个人定期',
            action: 'school',
          children: [{label: 'RB100-个人活期'},{label: 'RB100-个人活期'},{label: 'RB100-个人活期'}]
        }, {
          label: 'RB103-单位定期',
            action: 'directions_run',
          children: [{label: 'RB100-个人活期'},{label: 'RB100-个人活期'},{label: 'RB100-个人活期'}]
        }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    components: {
        VuePerfectScrollbar
    },
    methods: {
      handleNodeClick(data) {
        console.log(data)
      },
      queryDespositProdData() {
        getDepositProdList().then(response => {
          this.data = response.data.prodList
        })
      }
    },
    mounted: function() {
      this.queryDespositProdData()
    }
  }
</script>
<style>
    .prodListTree {
        height: calc(50vh - 48px);
    }
</style>
