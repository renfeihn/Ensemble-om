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
          <v-list-tile avatar v-else :key="item.tranName" @click="handleClick">
            <v-list-tile-avatar color='light-green'>
              <v-icon dark>account_circle</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-sub-title v-html="item.tranName"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action class="caption">
              <v-icon class="material-icons">close</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
      <v-divider></v-divider>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn flat @click="clean">清空</v-btn>
      <v-btn color="primary" flat @click="submit">提交</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    import {getCommonList} from "@/api/url/prodInfo";
    import {cleanList} from "@/api/url/prodInfo";
    import {submitCommon} from "@/api/url/prodInfo";
    export default {
        props: {
            taskMenu :Boolean
        },
        data: () => ({
            items: [
                {
                    tranName: '',
                    color: '',
                    icon: '',
                    timeLabel: ''
                }
            ]
        }),
        watch: {
            taskMenu : {
                handler() {
                    this.getTaskList()
                }
            }
        },
        created() {
            let that=this;
            window.addEventListener("taskList", function () {
                 that.getTaskList();
             })
        },
        mounted: function() {
            this.getTaskList()
        },
        methods: {
            handleClick: (e) => {
                console.log(e);
            },

            submit(){
                submitCommon({"userId": sessionStorage.getItem("userId")}).then(response => {

                })
            },
            clean(){
                cleanList({"userId": sessionStorage.getItem("userId")}).then(response => {
                    this.items=[]
                    this.$emit('getTaskList','0')
                })
            },
            showSearchAction() {
                this.$router.push({ name: "tranDataIndex"});
            },
            getTaskList() {
                getCommonList({"userId": sessionStorage.getItem("userId")}).then(response => {
                    this.items= response.data.data;
                    if(response.data.data!=null&&response.data.data!={}){
                        this.$emit('getTaskList',response.data.data.length)
                    }

                });
            }
        },

    };
</script>
