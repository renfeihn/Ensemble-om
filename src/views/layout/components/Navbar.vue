<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-menu-item>处理中心</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台
</template>
    <el-menu-item index="2-1">
      <router-link class="inlineBlock" to="/userPending/userPending">
        <el-dropdown-item>
          <el-badge :value="2" :max="2" class="item">
            待办事项
          </el-badge>
        </el-dropdown-item>
      </router-link>
    </el-menu-item>
    <el-menu-item index="2-2">
      <router-link class="inlineBlock" to="/userPending/userPending">
        <el-dropdown-item>
          <el-badge :value="2" :max="3" class="item">
            待办事项
          </el-badge>
        </el-dropdown-item>
      </router-link>
    </el-menu-item>
    <el-menu-item index="2-3">
      <router-link class="inlineBlock" to="/userPending/userPending">
        <el-dropdown-item>
          <el-badge :value="2" :max="1" class="item">
            待办事项
          </el-badge>
        </el-dropdown-item>
      </router-link>
    </el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="3">消息中心</el-menu-item>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <router-link class="inlineBlock" to="/userPending/userPending">
          <el-dropdown-item>
            <el-badge :value="2" :max="2" class="item">
            待办事项
            </el-badge>
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  export default {
    components: {
      Breadcrumb,
      Hamburger
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .item {
       margin-top: 10px;
       margin-right: 40px;
     }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>

