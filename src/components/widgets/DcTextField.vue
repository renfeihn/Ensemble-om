<template>
 <div >
  <v-layout row wrap>
   <v-flex md9 lg9>
    <v-text-field class="primary--text mx-1" name="title" v-model="value" single-line hide-details :perShow="perShow"></v-text-field>
   </v-flex>
   <v-flex md3 lg3 v-if="personShow==1">
    <v-tooltip right :color="peopleColor">
    <v-btn flat small :color="peopleColor" icon="people" slot="activator" @click="peopleClick" class="dcMulti1">
     <v-icon>people</v-icon>
    </v-btn>
    <span>{{peopleDesc}}</span>
   </v-tooltip>
   </v-flex>
  </v-layout>
 </div>
</template>

<script>
    export default {
        model: {
            prop: "msg",
            event: "getVue"
        },
        props: ["msg","perShow"],
        data() {
            return {
                value: [],
                peopleColor: "grey lighten-1",
                peopleDesc: "产品生效",
                personShow: 1

            };
        },
        watch: {
            msg: {
                handler(msg) {
                    this.init(msg);
                }
            }
        },
        created() {
            this.init(this._props.msg);
        },
        methods: {
            peopleClick() {
                if(this.peopleColor === "grey lighten-1") {
                    this.peopleColor = "red"
                    this.peopleDesc = "分户生效"
                }else if (this.peopleColor === "red"){
                    this.peopleColor = "grey lighten-1"
                    this.peopleDesc = "产品生效"
                }
            },
            init(msg) {
                this.value = msg
                //判断是否显示分户生效标识
                if(this._props.perShow === false){
                    this.personShow = 0
                }
            }
        }
    };
</script>
<style scoped>
 .dcMulti1 {
  margin-top: 18px;
 }
</style>