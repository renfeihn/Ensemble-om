<template>
  <div>
    <v-card>
      <v-layout align-center justify-space-between row fill-height>
        <v-flex lg2 sm2 pl-3>
          <img src="/static/user/MyUser.png" class="imgUserIndexFlow">
        </v-flex>
        <v-flex lg7 sm7>
          <span class="userSpan1 text-xs-center">admin,欢迎进入SmartEnsemble-OM</span>
          <br/>
          <span class="userSpan2 text-xs-center">神州数码 | 神州信息 - OM系统管理员</span>
        </v-flex>
        <v-flex lg3 sm3 offset-xs0 offset-lg2>
          <v-layout row wrap>
            <v-flex d-flex>
              <div>
                <span>交易数</span>
                <br/>
                <span class="userP1">210</span>
              </div>
            </v-flex>
            <v-flex d-flex>
              <div>
                <span>我的发布</span>
                <br/>
                <span class="userP1">45</span>
              </div>
            </v-flex>
            <v-flex d-flex>
              <div>
                <span>我的收藏</span>
                <br/>
                <span class="userP1">15</span>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
    <v-layout row>
      <v-flex xs9 sm9 class="userCard1" px-2>
        <v-card>
          <v-toolbar color="indigo lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" flat>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>正在进行中项目</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="py-0">
            <user-work-tags></user-work-tags>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3 sm3 class="userCard1" px-2>
        <v-card>
          <v-toolbar color="indigo lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" flat>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>快捷导航</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text style="text-align: center;">
            <v-list>
              <v-list-tile v-for="item in items" :key="item.title" avatar @click="keyboardClick(item)">
                <v-list-tile-action>
                  <v-icon v-if="item.icon" color="red">star</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile-content>
                <!-- <v-list-tile-action style="min-width: 0; ">
                  <v-chip label color="pink" text-color="white">
                    <v-icon left color="white">start</v-icon>编辑
                  </v-chip>
                </v-list-tile-action> -->
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  import userWorkTags from '@/views/userFlow/userWork/userWorkTags'
  export default {
      components: {
          userWorkTags
      },
      data() {
          return {
              items: [{
                  icon: true,
                  title: '对私存款产品',
                  value: 'rbPrivate',
                  avatar: '/static/prod/prod2.jpg'
              },
                  {
                      icon: true,
                      title: '对公贷款产品',
                      value: 'clPublic',
                      avatar: '/static/prod/prod2.jpg'
                  },
                  {
                      icon: true,
                      title: '参数管理入口',
                      value: 'paramMag',
                      avatar: '/static/prod/prod2.jpg'
                  },
                  {
                      icon: true,
                      title: '产品目录',
                      value: 'prodList',
                      avatar: '/static/prod/prod2.jpg'
                  }
              ]
          }
      },
      methods: {
          keyboardClick (item) {
              var key = item.value
              if(key === 'rbPrivate'){
                  this.$router.push({ name: 'prod/rbPrivateProd', params: {'prodClassCmp':'RB100','prodCodeCmp':'111001'}})
              }
              if(key === 'clPublic'){
                  this.$router.push({ name: 'prod/clPublicProd', params: {'prodClassCmp':'CL100','prodCodeCmp':'220001'}})
              }
//              if(key === 'paramMag'){
//                  this.$router.push({ name: 'prod/rbPrivateProd'})
//              }
              if(key === 'prodList'){
                  this.$router.push({ name: 'prodCmb'})
              }
          }
      }
  }
</script>
<style scoped>
  .imgUserIndexFlow {
    width: 100px;
    display: inline-block;
  }
  .userCard1 {
    padding: 20px;
  }
  .userSpan1 {
    font-size: 26px;
    display: inline-block;
    padding-top: 10px;
  }
  .userSpan2 {
    display: inline-block;
    padding-top: 5px;
  }
  .userDiv1 {
    float: left;
    text-align: center;
    margin-top: 10px;
  }
  .userDiv3 {
    padding: 10px;
  }
  .userDiv2 {
    /* padding-left: 40px; */
  }
  .indexFlowTitle {
    padding: 10px;
  }
  .userP1 {
    font-size: 25px;
    display: inline-block;
  }
</style>