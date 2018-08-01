<template>
  <div class="prod2-app-container">
    <v-layout row wrap>
    <v-flex lg4 sm12  class="prodCol">
        <v-card  >
          <v-card-media src="/static/bg/18.jpg" height="80px">
          <v-card-title class="pb-0">
            <h4>存款产品</h4>
          </v-card-title>
          </v-card-media>
          <v-card-text>
            <prod-collapse3></prod-collapse3>
          </v-card-text>
        </v-card>
    </v-flex>
    <v-flex lg4 sm12 class="prodCol">
        <v-card  >
          <v-card-media src="/static/bg/33.jpg" height="80px">
          <v-card-title class="pb-0">
            <h4> 贷款产品</h4>
          </v-card-title>
          </v-card-media>
          <v-card-text>
            <prod-collapse3></prod-collapse3>
          </v-card-text>
        </v-card>
      </v-flex>
    <v-flex lg4 sm12 class="prodCol">
        <v-card  >
          <v-card-media src="/static/bg/20.jpg" height="80px">
          <v-card-title class="pb-0">
            <h4>内部帐产品</h4>
          </v-card-title>
          </v-card-media>
          <v-card-text>
          <prod-collapse3></prod-collapse3>
          </v-card-text>
        </v-card>
    </v-flex>
    </v-layout>
  </div>
</template>
<script>
  import prodCollapse3 from './prodCollapse3'
  export default {
    components: {
      prodCollapse3
    }
  }
</script>
<style scoped>
  .iconSelect {
    float:right;
  }
  .prod2-app-container{
    height: 700px;
    background-color: #fafafa;
    /*background-color: rgb(238, 238, 238);*/
  }
  .prodCol {
     padding: 20px;
  }

</style>


