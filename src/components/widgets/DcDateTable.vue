/**
* jiajt 20190102
* 日期组件
* 示例
* 将其 value 特性绑定到一个名叫 value 的 prop 上
* 在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出
*/
<template>
    <div>
        <v-layout row wrap class="dcDate" v-if="show">
            <v-flex md4 lg4>
                <v-layout row wrap right>
                    <v-flex md12>
                        <v-subheader class="primary--text subheading pr-1">{{labelText}}</v-subheader>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex md7 lg7>
                <v-menu transition="scale-transition" :nudge-bottom="-22" min-width="290px" :disabled="disabled" labelDesc="labelDesc">
                    <v-text-field slot="activator" v-model="dateFormatted" width="290px" append-icon="event"></v-text-field>
                    <v-date-picker v-model="dateFormatted" no-title scrollable locale="zh-cn"></v-date-picker>
                </v-menu>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    import DcNavbar from './DcNavbar'
    export default {
        components: {
            DcNavbar
        },
        model: {
            prop: "msg",
            event: "getVue"
        },
        props: {
            options: String,
            msg: String,
            perShow: String,
            labelDesc: String,
        },
        data: () => ({
            date: null,
            dateFormatted: null,
            menu1: false,
            menu2: false,
            flag: null,
            show: false,
            disabled: false,
            value: [],
            isOpen: 'lock',
            options: [],
            labelText: ''
        }),

        computed: {
            computedDateFormatted () {
                return this.formatDate(this.date)
            }
        },

        watch: {
            msg: {
                handler(msg) {
                    this.init(msg);
                }
            },
            dateFormatted: {
                handler(newValue) {
                    this.reback(newValue);
                }
            }
        },
        created() {
            this.init(this._props);
            //控件加载处理
            this.dealNewAttr(this._props.msg)
        },
        mounted: function() {
            //判断参数取自基础产品||可售产品
            if(this._props.baseAttr === "BASE"){
                this.disabled = true
            }else{
                this.disabled = false
            }
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
            init(msg){
                if(typeof this._props.labelDesc !== "undefined") {
                    this.labelText = this._props.labelDesc + ' :';
                }
                if(msg !== null && msg !== undefined &&msg.msg!=undefined) {
                    let dates = this._props.msg
                    if (this._props.msg.attrValue != undefined) {
                        dates = this._props.msg.attrValue
                        this.optionPermissions = this._props.msg.optionPermissions
                    }
                    dates=dates.toString()
                    let time = dates.substring(0, 4) + "-" + dates.substring(4, 6) + "-" + dates.substring(6)
                    this.dateFormatted = time
                }
            },
            reback(newValue){
                let dateFormatted = "";
                dateFormatted = newValue.substring(0,4)+newValue.substring(5,7)+newValue.substring(8)
                if(this._props.msg === undefined){
                    this._props.msg = dateFormatted
                }else{
                    this._props.msg.attrValue = dateFormatted
                }
                this.$emit("getVue", this._props.msg);
            }
        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
<style scoped>
    .dcDate {
        margin-top: 10px;
        margin-right: 20px;
        width: 100%;
        height: 40px;
    }
</style>