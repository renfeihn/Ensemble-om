<template>
  <v-card >
    <v-layout row wrap>
    <v-flex lg3 sm3 class="v-card">
    <v-navigation-drawer
            v-model="drawer"
            permanent
            absolute
    >
      <v-toolbar flat >
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile
                v-for="item in items"
                :key="item.title"

        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    </v-flex>
    <v-flex lg9 sm9 class="v-card">
      <user-work-table class="myNav"></user-work-table>
    </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
    import userWorkTable from './userWorkTable'
    export default {
        components: {
            userWorkTable
        },
        data () {
            return {
                drawer: true,
                items: [
                    {title: '待发布', icon: 'dashboard'},
                    {title: '待复核', icon: 'dashboard'}
                ],
                right: null
            }
        }
    };
</script>
<style scoped>
  .myNav{
    margin-left: -10px;
  }
  </style>