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
                personShow: 0
            };
        },
        watch: {
            msg: {
                handler(msg) {
                    this.init(msg);
                }
            },
            value: {
                handler(newValue) {
                    this.reback(newValue);
                }
            }
        },
        created() {
            this.init(this._props.msg);
        },
        methods: {
            reback(newValue) {
                let value = newValue;
                if(typeof this._props.msg === "object") {
                    this._props.msg.attrValue = value
                }else{
                    this._props.msg = value
                }
                this.$emit("getVue", this._props.msg);
            },
            peopleClick() {
                //预留 未处理v-model为String类型时 分户生效标识处理 (如果传入为String时 分户生效标识不显示 )
                if(this.peopleColor === "grey lighten-1") {
                    this.peopleColor = "red"
                    this.peopleDesc = "分户生效"
                    this._props.msg.perEffect = "true"
                }else if (this.peopleColor === "red"){
                    this.peopleColor = "grey lighten-1"
                    this.peopleDesc = "产品生效"
                    this._props.msg.perEffect = "false"
                }
            },
            init(msg) {
                //初始化数据 msg为对象时获取attrValue属性 否则直接赋值
                this.value = typeof msg === "object"?this._props.msg.attrValue:this._props.msg
                //判断是否显示分户生效标识
                if(this._props.perShow === true){
                    this.personShow = 1
                }
                //分户生效标识回显 如果传入msg为对象 则进入if判断  如果为String 则this._props.msg.perEffect === undefined 不执行以下操作
                if(this._props.msg.perEffect !== undefined && this._props.msg.perEffect !== null){
                    if(this._props.msg.perEffect === "true"){
                        this.peopleColor = "red"
                        this.peopleDesc = "分户生效"
                    }else{
                        this.peopleColor = "grey lighten-1"
                        this.peopleDesc = "产品生效"
                    }
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