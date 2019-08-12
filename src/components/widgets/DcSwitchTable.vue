/**
* jiajt 20190102
* 开关组件
* 示例 <dc-switch v-model="isMultiCcy"></dc-switch>
* 将其 value 特性绑定到一个名叫 value 的 prop 上
* 在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出
*/
<template>
    <div >
        <transition name="slide-fade">
            <v-layout row wrap class="switch" v-if="show">
                <v-flex md4 lg4>
                    <v-layout row wrap right>
                        <v-flex md12>
                            <v-subheader class="primary--text subheading pr-1">{{labelText}}</v-subheader>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex md7 lg7>
                    <v-switch :label="desc" color="success" :disabled="disabled" v-model="dcSwitch" @change="switchChange" hide-details :perShow="perShow" labelDesc="labelDesc"></v-switch>
                </v-flex>
            </v-layout>
        </transition>
    </div>

</template>

<script>
    import DcNavbar from './DcNavbar'
    export default {
        components: {
            DcNavbar
        },
        model: {
            prop: "value",
            event: "getVue"
        },
        props: {
            label: {
                type: String,
                default: "是,否"
            },
            value: {},
            labelDesc: String
        },
        data() {
            return {
                currentValue: "",
                desc: "",
                show: false,
                disabled: false,
                isOpen: 'lock',
                dcSwitch: false,
                labelText: ''
            };
        },
        watch: {
            value: {
                handler(val) {
                    if(typeof val === "object"){
                        this.dcSwitch = val.attrValue=== "Y" ? true : false
                        this.optionPermissions = val.optionPermissions
                    }
                    else if(typeof val === "string"){
                        this.dcSwitch = val === "Y" ? true : false
                    }
                    if(typeof val !== "undefined") {
                        this.switchChange()
                        this.initPerson()
                    }
                },
                // watch 的一个特点是，最初绑定的时候是不会执行的，要等到 value 改变时才执行监听计算
                // 代表在wacth里声明了value这个方法之后立即先去执行handler方法
                immediate: true
            }
        },
        created() {
            this.dealNewAttr(this._props.value)
        },
        mounted() {
            this.switchChange();
        },
        methods: {
            rebackOption(newValue){
                if(typeof this._props.value === "object"){
                    this._props.value.optionPermissions=newValue
                    this.$emit("input", this._props.value);
                }
            },
            dealNewAttr(val) {
                    this.show = true
            },
            switchChange() {
                if(typeof this._props.labelDesc !== "undefined") {
                    this.labelText = this._props.labelDesc + ' :';
                }
                if(this._props.value !== undefined){
                    if (this.dcSwitch) {
                        if(this._props.value.attrValue !== undefined) {
                            this._props.value.attrValue = "Y";
                        }
                        this.desc = this.label.split(",")[0];
                    } else {
                        if(this._props.value.attrValue !== undefined) {
                            this._props.value.attrValue = "N";
                        }
                        this.desc = this.label.split(",")[1];
                    }
                    //在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出（对象）
                    this.$emit("input", this._props.value);
                }
            }
        }
    };
</script>
<style scoped>
    .switch {
        padding-top: 10px;
    }
</style>
