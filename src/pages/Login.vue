<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="/static/logo.png" alt="SmartEnsemble-om<" width="120" height="120">
                  <h1 class="flex my-4 primary--text">神州数码-产品工厂</h1>
                  <h2 class="flex my-4 primary--text">SmartEnsemble-om</h2>
                </div>
                <v-form ref="model">
                  <v-text-field append-icon="person" name="login" label="用户名" type="text" v-model="model.userId"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="密码" id="password" type="password" v-model="model.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn icon>
                  <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="red">fa fa-google fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">登录</v-btn>
              </v-card-actions>
              <v-alert :value="alert" type="error" transition="scale-transition">
                {{alertMsg}}
              </v-alert>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { getMenu } from "@/api/menu";
import { login } from "@/api/login";
export default {
  data: () => ({
    alert: false,
    alertMsg: "",
    loading: false,
    model: {
      userId: "admin",
      password: "123456"
    }
  }),

  methods: {
    login() {
      login(this.model.userId, this.model.password)
        .then(response => {
          if (response.data.code !== "000000") {
            this.loading = false;
            this.alert = true;
            this.alertMsg = response.data.msg;
            this.model.password = null;
            //confirm(response.data.msg);
          } else {
            //                else if(response.data[0].password !== this.model.password) {
            //                    this.loading = false;
            //                    confirm("用户密码错误！")
            //                }
            this.loading = true;
            sessionStorage.setItem("userId", this.model.userId);
            this.$router.push("/dashboard");
          }
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
