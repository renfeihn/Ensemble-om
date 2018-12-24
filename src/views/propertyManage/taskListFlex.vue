<template>
  <v-card class="elevation-2 mt-4 ml-2">
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>任务列表</h4></v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list two-line class="pa-0">
        <template v-for="(item, index) in items">
          <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
          <v-divider v-else-if="item.divider" :key="index"></v-divider>
          <v-list-tile avatar v-else :key="item.tranName" @click="handleClick(item)">
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
  </v-card>
</template>

<script>
    import {getTaskListBySeqNo} from "@/api/url/prodInfo";
    import {submitCommon} from "@/api/url/prodInfo";
    export default {
        props: {
            seqNo: String
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
            seqNo: {
                handler(msg) {
                    if(msg!='' && msg!= undefined){
                    this.getTaskList()
                    }
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
            handleClick(item) {
                this.$emit('changeTranId',item.tranId,item.tranType);
            },
            submit(){
                let that=this
                submitCommon({"userId": sessionStorage.getItem("userId")}).then(response => {
                    that.items=[]
                })
            },

            getTaskList() {
                const parentSeqNo=this._props.seqNo;
                getTaskListBySeqNo({"seqNo": parentSeqNo}).then(response => {
                    this.items= response.data.data;
                });
            }
        },

    };
</script>
