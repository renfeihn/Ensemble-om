<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app id="inspire" class="app backPower">
        <app-drawer class="app--drawer elevation-2 dcMenu" :showMenuLog="showMenuLog"></app-drawer>
        <app-toolbar class="app--toolbar elevation-2 pl-0" v-on:menuSwitch="menuSwitch" ></app-toolbar>
        <v-content>
          <!-- Page Header -->
       <!--   <page-header v-if="$route.meta.breadcrumb"></page-header>-->
          <tags-view></tags-view>
          <div class="px-4">
            <router-view></router-view>
          </div>
           <!-- App Footer -->
          <v-footer height="auto" class="white pa-3 app--footer elevation-2 dcFooter">
            <span class="caption">SmartEnsemble-om &copy; {{ new Date().getFullYear() }}</span>
            <v-spacer></v-spacer>
            <span class="caption mr-1"> ensemble-om </span> <v-icon color="pink" small>favorite</v-icon>
          </v-footer>
        </v-content>
        <!-- Go to top -->
        <app-fab></app-fab>
        <!-- theme setting -->
        <v-btn small fab dark falt fixed top="top" right="right" class="setting-fab" color="red" @click="openThemeSettings">
          <v-icon>settings</v-icon>
        </v-btn>
        <v-navigation-drawer
          class="setting-drawer"
          temporary
          right
          v-model="rightDrawer"
          hide-overlay
          fixed
          >
          <theme-settings></theme-settings>
        </v-navigation-drawer>        
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </template>
    <v-snackbar
      :timeout="3000"
      bottom
      right
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon> 
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>    
  </div>
</template>
<script>
import AppDrawer from "@/components/AppDrawer";
import AppToolbar from "@/components/AppToolbar";
import AppFab from "@/components/AppFab";
import PageHeader from "@/components/PageHeader";
import menu from "@/api/menu";
import ThemeSettings from "@/components/ThemeSettings";
import AppEvents from "./event";
import TagsView from "@/views/layout/components/TagsView";
export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader,
    ThemeSettings,
    TagsView
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    dashboard: true,
    showMenuLog: false,
    snackbar: {
      show: false,
      text: "",
      color: ""
    }
  }),
  computed: {},
  created() {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
  },
  methods: {
    openThemeSettings() {
      this.$vuetify.goTo(0);
      this.rightDrawer = !this.rightDrawer;
    },
    menuSwitch() {
        this.showMenuLog=!this.showMenuLog;
    }
  }
};
</script>


<style lang="stylus" scoped>
  .dcMenu {
    margin-top 66px!important
  }
.setting-fab {
  top: 50% !important;
  right: 0;
  border-radius: 0;
}

.page-wrapper {
  min-height: calc(100vh - 64px - 50px - 81px);
}
  .dcFooter{
    position:relative
    bottom: 0px
    width: 100%
  }
</style>
