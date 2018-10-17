/**
* chengliang 20180917
* 日期组件
* 示例 <dc-date v-model="prodData.prodDefines.PROD_END_DATE.attrValue"></dc-date>
* 将其 value 特性绑定到一个名叫 value 的 prop 上
* 在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出
*/
<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex>
                <v-menu transition="scale-transition" offset-y full-width :nudge-bottom="-22" min-width="290px">
                    <v-text-field slot="activator" v-model="dateFormatted" append-icon="event" single-line hide-details></v-text-field>
                    <v-date-picker v-model="dateFormatted" no-title scrollable locale="zh-cn"></v-date-picker>
                </v-menu>
            </v-flex>
            <v-flex md3 lg3 v-if="personShow==1">
                <v-tooltip right :color="peopleColor">
                    <v-btn flat small :color="peopleColor" icon="people" slot="activator" @click="peopleClick">
                        <v-icon>people</v-icon>
                    </v-btn>
                    <span>{{peopleDesc}}</span>
                </v-tooltip>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    export default {
        model: {
            prop: "msg",
            event: "getVue"
        },
        props: ["options", "msg","perShow"],
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
            personShow: 1
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
                if(msg !== null && msg !== undefined){
                    let dates = this._props.msg
                    let time =dates.substring(0,4)+"-"+dates.substring(4,6)+"-"+dates.substring(6)
                    this.dateFormatted = time
                }
            },
            reback(newValue){
                let dateFormatted = "";
                dateFormatted = newValue.subString(0,4)+newValue.subString(5,7)+newValue.subString(8)
                alert(dateFormatted)
                this.$emit("getVue", dateFormatted);
            }
          /*  formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            },
            parseDate (date) {
                if (!date) return null

                //const [month, day, year] = date.split('/')
                return date.subString(0,4)+'-'+date.subString(4,6)+'-'+date.subString(6)
                 // return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            }*/
        }
    }
</script>