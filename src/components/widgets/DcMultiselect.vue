<template>

    <div>
        <v-layout row wrap>
            <v-flex md9 lg9>
                <multiselect v-model="value" :isMultiSelect="isMultiSelect" name="key" open-direction="bottom" placeholder="请选择..." selectLabel=""
                             :searchable="false" :close-on-select="false" label="value" :hide-selected="true" track-by="value" :options="options" :multiple="isMulti" class="dcMulti" :perShow="perShow">
                </multiselect>
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
    import Multiselect from "vue-multiselect";
    export default {
        components: { Multiselect },
        model: {
            prop: "msg",
            event: "getVue"
        },
        props: ["options", "msg","isMultiSelect","perShow"],
        data() {
            return {
                value: [],
                options: [],
                personShow: 1,
                isMulti: true,
                peopleColor: "grey lighten-1",
                peopleDesc: "产品生效"
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
                //判断是否多选
                if(this._props.isMultiSelect === undefined || this._props.isMultiSelect === null){
                    //是否多选标志未定义时，默认为多选
                    this.isMulti = true
                }else{
                    this.isMulti = this._props.isMultiSelect;
                }
                //判断是否显示分户生效标识
                if(this._props.perShow === false){
                    this.personShow = 0
                }
                if(msg !== null && msg !== undefined) {
                    let data = msg.split(",");
                    let options = this._props.options;
                    let values = [];
                    for (const num in data) {
                        let value = {};
                        value.key = data[num];
                        for (const index in options) {
                            const option = options[index];
                            if (option.key == value.key) {
                                value.value = option.value;
                            }
                        }
                        values.push(value);
                    }
                    this.value = values;
                }
            },
//      multFlagDeal(val) {
//          this.flag = val
//      },
            reback(newValue) {
                let value = "";
                if(this.isMulti === true) {
                    //多选数据组装
                    for (const index in newValue) {
                        if (index == 0) {
                            value = newValue[index].key;
                        } else {
                            value = value + "," + newValue[index].key;
                        }
                    }
                }
                if(this.isMulti === false){
                    //单选数据组装
                    value = newValue.key
                }
                if (value) {
                    this.$emit("getVue", value);
                }
            },
            addTag(newTag) {
                const tag = {
                    name: newTag,
                    code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
                };
                this.options.push(tag);
                this.value.push(tag);
            }
        }
    };
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
<style scoped>
    .dcMulti {
        margin-top: 10px;
    }
    .dcMulti1 {
        margin-top: 15px;
    }
</style>