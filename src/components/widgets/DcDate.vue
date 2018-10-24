/**
* chengliang 20180917
* 日期组件
* 示例 <dc-date v-model="prodData.prodDefines.PROD_END_DATE.attrValue"></dc-date>
* 将其 value 特性绑定到一个名叫 value 的 prop 上
* 在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出
*/
<template>
    <div style="margin-top: 30px">
        <v-layout row wrap>
            <v-flex md4 lg4>
                <v-subheader class="primary--text subheading labelDesc">{{labelText}}</v-subheader>
            </v-flex>
            <v-flex md6 lg6>
                <v-menu transition="scale-transition" :nudge-bottom="-22" min-width="290px" class="dcDate" labelDesc="labelDesc">
                    <v-text-field slot="activator" v-model="dateFormatted" append-icon="event"></v-text-field>
                    <v-date-picker v-model="dateFormatted" no-title scrollable locale="zh-cn"></v-date-picker>
                </v-menu>
            </v-flex>
            <v-flex md2 lg2 v-if="personShow==1">
                <v-tooltip right :color="peopleColor">
                    <v-btn flat small :color="peopleColor" icon="people" slot="activator" @click="peopleClick" class="dcDate1">
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
        props: ["options", "msg","perShow","labelDesc"],
        data: () => ({
            date: null,
            dateFormatted: null,
            menu1: false,
            menu2: false,
            flag: null,
            value: [],
            options: [],
            peopleColor: "grey lighten-1",
            peopleDesc: "产品生效",
            personShow: 0,
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
            init(msg){
                if(typeof this._props.labelDesc !== "undefined") {
                    this.labelText = this._props.labelDesc + ' :';
                }
                if(msg !== null && msg !== undefined){
                    let dates = this._props.msg.attrValue
                    let time =dates.substring(0,4)+"-"+dates.substring(4,6)+"-"+dates.substring(6)
                    this.dateFormatted = time
                }
            },
            reback(newValue){
                let dateFormatted = "";
                dateFormatted = newValue.substring(0,4)+newValue.substring(5,7)+newValue.substring(8)
                this._props.msg.attrValue = dateFormatted
                this.$emit("getVue", this._props.msg);
            }
        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
<style scoped>
    .dcDate {
        margin-top: -40px;
        margin-right: 20px;
        width: 100%;
        height: 40px;
    }
    .dcDate1 {
        margin-top: -10px;
        margin-left: 8px;
    }
    .labelDesc {
        margin-top: -25px;
    }
</style>