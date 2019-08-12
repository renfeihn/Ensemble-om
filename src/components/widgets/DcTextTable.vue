<template>
    <div >
        <v-layout row wrap>
            <v-flex md4 lg4>
                <v-layout row wrap right v-if="show">
                    <v-flex md12>
                        <v-subheader class="primary--text subheading pr-1">{{labelText}}</v-subheader>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex md7 lg7>
                <v-text-field class="primary--text mx-1" :disabled="disabled" name="title" v-model="value" single-line hide-details labelDesc="labelDesc"></v-text-field>
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
        props: {
            msg: String,
            labelDesc: String ,
        },
        data() {
            return {
                labelText: "",
                value: [],
                disabled: false,
                show: false
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
            //控件加载处理
            this.dealNewAttr(this._props.msg)
            this.init(this._props.msg);
        },
        methods: {
            rebackOption(newValue){
                if(typeof this._props.msg === "object"){
                    this._props.msg.optionPermissions=newValue
                    this.$emit("getVue", this._props.msg);
                }
            },
            dealNewAttr(val) {
                    this.show = true
            },
            reback(newValue) {
                let value = newValue;
                let reValue=value
                if(reValue != undefined){
                    this.$emit("getVue", reValue);
                }

            },
            init(msg) {
                if(typeof this._props.labelDesc !== "undefined") {
                    this.labelText = this._props.labelDesc + ' :';
                }
                //初始化数据 msg为对象时获取attrValue属性 否则直接赋值
                if(typeof this._props.msg === "object" && this._props.msg != null){
                    this.value = this._props.msg.attrValue
                    this.optionPermissions = this._props.msg.optionPermissions
                }else if(typeof this._props.msg === "string" || this._props.msg === null){
                    this.value = this._props.msg
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