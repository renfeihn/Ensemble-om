<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">提交信息</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">复核信息</v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step step="3">发布信息</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-5" height="200px">
          <v-form>
            <v-layout wrap>
              <v-flex xs12 md1 lg1>
                <v-subheader class="primary--text subheading">提交人:</v-subheader>
              </v-flex>
              <v-flex md11 lg11>
                <v-text-field class="primary--text mx-1" label="" disabled="false" name="title" v-model="flowInfo.flowCommitInfo.userId" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs12 md1 lg1>
                <v-subheader class="primary--text subheading">提交时间:</v-subheader>
              </v-flex>
              <v-flex md11 lg11>
                <v-text-field class="primary--text mx-1" label="" disabled="false" name="title" v-model="flowInfo.flowCommitInfo.tranTime" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>

            <v-layout row wrap>
              <v-flex xs12 md1 lg1>
                <v-subheader class="primary--text subheading">提交原因:</v-subheader>
              </v-flex>
              <v-flex md11 lg11>
                <v-text-field class="primary--text mx-1" label="" disabled="false" name="title" v-model="flowInfo.flowCommitInfo.remark" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-form>
        </v-card>

        <v-btn
                color="primary"
                @click="e1 = 2"
        >
          复核信息
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card height="200px" class="mb-5">
          <v-form>
            <v-layout wrap>
              <v-flex xs12 md1 lg1>
                <v-subheader class="primary--text subheading">复核人:</v-subheader>
              </v-flex>
              <v-flex md11 lg11>
                <v-text-field class="primary--text mx-1" label="" disabled="false" v-model="flowInfo.flowCheckInfo.userId" name="title" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs12 md1 lg1>
                <v-subheader class="primary--text subheading">复核时间:</v-subheader>
              </v-flex>
              <v-flex md11 lg11>
                <v-text-field class="primary--text mx-1" label="" disabled="false" v-model="flowInfo.flowCheckInfo.tranTime" name="title" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs12 md1 lg1>
                <v-subheader class="primary--text subheading">复核状态:</v-subheader>
              </v-flex>
              <v-flex md11 lg11>
                <v-switch color="success" hide-details value=true disabled="false" v-model="flowInfo.flowCheckInfo.isApproved" :label="`${flowInfo.flowCheckInfo.isApproved==='Y'?'复核通过':'驳回'}`" ></v-switch>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs12 md1 lg1>
                <v-subheader class="primary--text subheading">复核意见:</v-subheader>
              </v-flex>
              <v-flex md11 lg11>
                <v-text-field class="primary--text mx-1" disabled="false" label="" name="title" v-model="flowInfo.flowCheckInfo.remark" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card>

        <v-btn
                color="primary"
                @click="e1 = 3"
        >
          发布信息
        </v-btn>

      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card height="200px" class="mb-5">
          <v-form>
            <v-layout wrap>
              <v-flex xs12 md1 lg1>
                <v-subheader class="primary--text subheading">发布人:</v-subheader>
              </v-flex>
              <v-flex md11 lg11>
                <v-text-field class="primary--text mx-1" label="" disabled="false" name="title" v-model="releaseInfo.userId" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs12 md1 lg1>
                <v-subheader class="primary--text subheading">发布时间:</v-subheader>
              </v-flex>
              <v-flex md11 lg11>
                <v-text-field class="primary--text mx-1" label="" disabled="false" name="title" v-model="releaseInfo.date" value="2018/09/07" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs12 md1 lg1>
                <v-subheader class="primary--text subheading">发布状态:</v-subheader>
              </v-flex>
              <v-flex md11 lg11>
                <v-switch color="success" hide-details value="Y" :label="`${releaseInfo.isApproved==='Y'?'复核通过':'驳回'}`" v-model="releaseInfo.isApproved"></v-switch>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs12 md1 lg1>
                <v-subheader class="primary--text subheading">发布意见:</v-subheader>
              </v-flex>
              <v-flex md11 lg11>
                <v-text-field class="primary--text mx-1" label="" name="title" v-model="releaseInfo.remark" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card>

        <v-btn
                color="primary"
                @click="e1 = 1"
        >
          提交信息
        </v-btn>
        <v-btn color="primary" @click="releaseConfirm">确   认</v-btn>

      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
    import {
        tranFlowInfo
    } from '@/api/url/prodInfo';
    export default {
        data (){
            return {
                e1: 0,
                flowInfo: [],
                temp: [],
                releaseInfo: {
                    mainSeqNo: '',
                    date: '',
                    isApproved: '',
                    userId: 'admin',
                    remark: '',
                    optType: '4'//发布
                }
            }
        },
        mounted() {
            this.code = this.$route.params.code;
            this.getDate()
            this.releaseInfo.mainSeqNo = this.$route.params.code;
            this.initFlowInfo(this.$route.params.flowInfo)

        },
        methods: {
            initFlowInfo(val) {
                for(let i=0; i<val.length; i++) {
                    if(val[i].flowManage.mainSeqNo === this.releaseInfo.mainSeqNo){
                        this.flowInfo =this.$route.params.flowInfo[i]
                    }
                }
            },
            getDate() {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth()+1;//js中是从0开始所以要加1
                var day = date.getDate();
                this.releaseInfo.date = year+'/'+month+'/'+day;
            },
            releaseConfirm() {
                console.log(this.releaseInfo)
                if(this.releaseInfo.isApproved !== "Y"){
                    this.releaseInfo.isApproved = "N"
                }
                tranFlowInfo(this.releaseInfo).then(response => {
                    if(response.status === 200 && this.releaseInfo.isApproved === "Y") {
                        alert("发布成功！")
                    }
                    if(response.status === 200 && this.releaseInfo.isApproved === "N") {
                        alert("驳回成功！")
                    }
                })
            }
        }
    }
</script>
<style scoped>

</style>