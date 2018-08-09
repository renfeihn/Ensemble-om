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
        <v-card
                class="mb-5"
                height="200px"
        >
          <v-form>
            <v-text-field
                    label="Subject"
                    value="提交人：PARA"
                    single-line
                    full-width
                    hide-details
            ></v-text-field>
            <v-divider></v-divider>
            <v-text-field
                    label="Subject"
                    value="提交时间：2018/08/19"
                    single-line
                    full-width
                    hide-details
            ></v-text-field>
            <v-divider></v-divider>
            <v-text-field
                    label="Subject"
                    value="提交原因：产品参数修改"
                    single-line
                    full-width
                    hide-details
            ></v-text-field>
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
        <v-card
                class="mb-5"
                color="grey lighten-1"
                height="200px"
        ></v-card>

        <v-btn
                color="primary"
                @click="e1 = 3"
        >
          发布信息
        </v-btn>

        <v-btn flat>提交信息</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
                class="mb-5"
                color="grey lighten-1"
                height="200px"
        ></v-card>

        <v-btn
                color="primary"
                @click="e1 = 1"
        >
          提交信息
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
    export default {
      data (){
          return {
              e1: 0
          }
      },
        created() {
            this.code = this.$route.params.code;
        }
    }
</script>
<style scoped>

</style>