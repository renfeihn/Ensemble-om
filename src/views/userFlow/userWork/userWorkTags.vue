<template>
  <v-container fluid grid-list-md py-0 px-0>
    <v-tabs v-model="active" slider-color="red">
      <v-tab v-for="n in userWork" :key="n" ripple>
        <v-chip label outline color="red">
          <v-avatar text-color="red">5</v-avatar>{{n}}</v-chip>
      </v-tab>
      <v-tab-item v-for="n in 3" :key="n">
        <user-work-table></user-work-table>
        <!-- <v-card>
          <v-container fluid py-0>
            <v-card-text>
              
            </v-card-text>
          </v-container>
        </v-card> -->
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
  import userWorkTable from './userWorkTable'
  export default {
    data() {
      return {
        active: null,
        text: '.',
        userWork: ['待复核', '待发布']
      }
    },
    components: {
      userWorkTable
    },
    methods: {}
  }
</script>