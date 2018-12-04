<template>
  <v-card class="elevation-0">
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>操作列表</h4></v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list two-line class="pa-0">
        <template v-for="(item, index) in items">
          <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
          <v-divider v-else-if="item.divider" :key="index"></v-divider>
          <v-list-tile avatar v-else :key="item.title" @click="handleClick">
            <v-list-tile-avatar :color="item.color">
              <v-icon dark>{{item.icon}}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-sub-title v-html="item.title"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action class="caption">
              <v-icon @click="showSearchAction" class="material-icons">search</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
      <v-divider></v-divider>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn flat>清空</v-btn>
      <v-btn color="primary" flat @click="closeMenu">提交</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import notes from '@/api/notification';
export default {
  data: () => ({
    items: notes
  }),
  methods: {
    handleClick: (e) => {
      console.log(e);
    },
      closeMenu() {
         this.$emit('closeMenu')
      },
      showSearchAction() {
          this.$router.push({ name: "tranDataIndex"});
      }
  },

};
</script>
