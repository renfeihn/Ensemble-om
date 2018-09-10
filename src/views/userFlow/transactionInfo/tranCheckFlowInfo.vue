<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 1" step="1">提交信息</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">复核信息</v-stepper-step>
      <v-divider></v-divider>
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
                <v-text-field class="primary--text mx-1" label="" disabled="false" name="title" v-model="flowInfo[0].flowInfo.userId" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs12 md1 lg1>
                <v-subheader class="primary--text subheading">提交时间:</v-subheader>
              </v-flex>
              <v-flex md11 lg11>
                <v-text-field class="primary--text mx-1" label="" disabled="false" name="title" v-model="flowInfo[0].flowInfo.tranTime" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>

            <v-layout row wrap>
              <v-flex xs12 md1 lg1>
                <v-subheader class="primary--text subheading">提交原因:</v-subheader>
              </v-flex>
              <v-flex md11 lg11>
                <v-text-field class="primary--text mx-1" label="" disabled="false" name="title" v-model="flowInfo[0].flowInfo.remark" single-line hide-details>
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-form>
        </v-card>
        <v-btn color="primary" @click="e1 = 2">复核信息</v-btn>

      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card height="200px" class="mb-5">
          <v-form>
          <v-layout wrap>
          <v-flex xs12 md1 lg1>
            <v-subheader class="primary--text subheading">复核人:</v-subheader>
          </v-flex>
          <v-flex md11 lg11>
            <v-text-field class="primary--text mx-1" label="" disabled="false" name="title" v-model="checkInfo.userId" single-line hide-details>
            </v-text-field>
          </v-flex>
        </v-layout>
            <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12 md1 lg1>
            <v-subheader class="primary--text subheading">复核时间:</v-subheader>
          </v-flex>
          <v-flex md11 lg11>
            <v-text-field class="primary--text mx-1" label="" disabled="false" name="title" v-model="checkInfo.date" value="2018/09/07" single-line hide-details>
            </v-text-field>
          </v-flex>
        </v-layout>
            <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12 md1 lg1>
            <v-subheader class="primary--text subheading">复核状态:</v-subheader>
          </v-flex>
          <v-flex md11 lg11>
            <v-switch color="success" hide-details value="Y" :label="`${checkInfo.isApproved==='Y'?'复核通过':'驳回'}`" v-model="checkInfo.isApproved"></v-switch>
          </v-flex>
        </v-layout>
            <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12 md1 lg1>
            <v-subheader class="primary--text subheading">复核意见:</v-subheader>
          </v-flex>
          <v-flex md11 lg11>
            <v-text-field class="primary--text mx-1" label="" name="title" v-model="checkInfo.remark" single-line hide-details>
            </v-text-field>
          </v-flex>
        </v-layout>
          </v-form>
        </v-card>
        <v-btn color="primary" @click="e1 = 1">提交信息</v-btn>
        <v-btn color="primary" @click="checkConfirm">确认复核</v-btn>
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
              checkInfo: {
                  mainSeqNo: '',
                  date: '',
                  isApproved: '',
                  userId: 'admin',
                  remark: '',
                  optType: '3' //复核
              }
          }
      },
        created() {
            this.checkInfo.mainSeqNo = this.$route.params.code;
            this.flowInfo = this.$route.params.flowInfo
            this.getDate()
        },
        methods: {
          getDate() {
              var date = new Date();
              var year = date.getFullYear();
              var month = date.getMonth()+1;//js中是从0开始所以要加1
              var day = date.getDate();
              this.checkInfo.date = year+'/'+month+'/'+day;
          },
            checkConfirm() {
                console.log(this.checkInfo)
                tranFlowInfo(this.checkInfo).then(response => {
                    if(response.status === 200) {
                        //复核成功
                        alert("复核成功！")
                    }
                })
            }
        }
    }
</script>
<style scoped>

</style>