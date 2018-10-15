/**
* chengliang 20180917
* 开关组件
* 示例 <dc-switch v-model="isMultiCcy"></dc-switch>
* 将其 value 特性绑定到一个名叫 value 的 prop 上
* 在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出
*/
<template>
 <div >
  <v-layout row wrap>
   <v-flex md9 lg9>
    <v-switch :label="desc" color="success" v-model="dcSwitch" @change="switchChange" hide-details :perShow="perShow"></v-switch>
   </v-flex>
   <v-flex md3 lg3 v-if="personShow==1">
    <v-tooltip right :color="peopleColor">
     <v-btn flat small :color="peopleColor" icon="people" slot="activator" class="left" @click="peopleClick">
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
        props: {
            label: {
                type: String,
                default: "是,否"
            },
            value: String,
            perShow: String
        },
        data() {
            return {
                peopleColor: "grey lighten-1",
                peopleDesc: "产品生效",
                currentValue: "",
                desc: "",
                dcSwitch: false,
                personShow: 1

            };
        },
        watch: {
            value: {
                handler(val) {
                    this.dcSwitch = val === "Y" ? true : false;
                    this.switchChange()
                },
                // watch 的一个特点是，最初绑定的时候是不会执行的，要等到 value 改变时才执行监听计算
                // 代表在wacth里声明了value这个方法之后立即先去执行handler方法
                immediate: true
            }
            // value(val) {
            //   this.dcSwitch = val === "Y" ? true : false;
            // },
            // dcSwitch(val) {
            //   this.$emit("input", this.currentValue);
            // }
        },
        mounted() {
            this.switchChange();
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
            switchChange() {
                //判断是否显示分户生效标识
                if(this._props.perShow === false){
                    this.personShow = 0
                }
                if (this.dcSwitch) {
                    this.currentValue = "Y";
                    this.value = "Y";
                    this.desc = this.label.split(",")[0];
                } else {
                    this.currentValue = "N";
                    this.value = "N";
                    this.desc = this.label.split(",")[1];
                }
                //在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出
                this.$emit("input", this.currentValue);
            }
        }
    };
</script>
<style scoped>
 .left {
  margin-left: 8px;
  margin-top: 20px;
  margin-right: auto;
 }
</style>
