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
                <v-menu ref="endDateMenu" lazy :close-on-content-click="false" transition="scale-transition" offset-y full-width :nudge-bottom="-22" min-width="290px">
                    <v-text-field slot="activator" v-model="value" append-icon="event" single-line hide-details></v-text-field>
                    <v-date-picker v-model="value" @input="$refs.endDateMenu.save(dateFormatted)" no-title scrollable locale="zh-cn"></v-date-picker>
            </v-menu>
        </v-layout>
    </v-container>
</template>
<script>
    export default {
        model: {
            prop: "msg",
            event: "getVue"
        },
        props: ["options", "msg"],
        data: () => ({
            date: null,
            dateFormatted: null,
            menu1: false,
            menu2: false,
            value: [],
            options: []
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
            value: {
                handler(newValue) {
                    this.reback(newValue);
                }
            }
        },
        created() {
            this.init(this._props);
        },
        methods: {
            init(msg){
                if(msg !== null && msg !== undefined){
                    let dates = this._props.msg
                    let time =dates.substring(0,4)+"年"+dates.substring(4,6)+"月"+dates.substring(6)+"日"
                    this.value = time
                }
            },
            reback(newValue){
                let value = "";
                value = newValue.subString(0,4)+newValue.subString(5,7)+newValue.subString(8,10)
                this.$emit("getVue", value);
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