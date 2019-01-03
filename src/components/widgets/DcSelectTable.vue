<template>
    <div>
        <transition name="slide-fade">
            <v-layout row wrap :class="background">
                <v-flex md4 lg4>
                    <v-layout row wrap right>
                        <v-flex md12 row wrap>
                            <v-subheader class="primary--text subheading pr-1">{{labelText}}</v-subheader>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex md7 lg7>
                    <div>
                        <multiselect v-model="value" :isMultiSelect="isMultiSelect" name="key" open-direction="bottom" placeholder="请选择..." selectLabel="" :class="background"
                                     :disabled="disabled" :searchable="false" labelDesc="labelDesc" :close-on-select="closeSelect" label="value" :hide-selected="true" track-by="value" :options="options" :multiple="isMulti" class="dcMulti">
                        </multiselect>
                    </div>
                </v-flex>
            </v-layout>
        </transition>
    </div>
</template>

<script>
    import Multiselect from "vue-multiselect";
    import {getPkList} from '@/views/prodFactory/prodInfo/pkListColumnInfo'
    import warnDialog from '@/views/prodFactory/prodInfo/baseProd/warnDialog';
    export default {
        components: { Multiselect ,warnDialog},
        model: {
            prop: "msg",
            event: "getVue"
        },
        props: {
            options: String,
            msg: String,
            isMultiSelect: String,
            labelDesc: String,
        },
        data() {
            return {
                value: [],
                fab: false,
                isMulti: true,
                isOpen: 'fas fa-eye',
                disabled: false,
                dialog: false,
                background: '',
                closeSelect: false
            };
        },
        watch: {
            msg: {
                handler(msg) {
                    if(typeof msg !== "undefined"&&msg!== null) {
                        this.init(typeof msg === "object" ? msg.attrValue : msg);
                    }
                }
            },
            options: {
                handler(newValue){
                    if(this._props.msg !== "undefined"&&this._props.msg !== undefined){
                        this.init(typeof this._props.msg === "object" ? this._props.msg.attrValue : this._props.msg)
                    }
                },
            },
            value: {
                handler(newValue) {
                    this.reback(newValue);
                }
            }
        },
        created() {
            if(typeof this._props.msg !== "undefined") {
                this.init(typeof this._props.msg === "object" ? this._props.msg.attrValue : this._props.msg);
            }
            //初始化描述
            if(typeof this._props.labelDesc !== "undefined") {
                this.labelText = this._props.labelDesc + ' :';
            }
        },
        mounted: function() {
            this.initProperty();
        },
        methods: {
            init(msg) {
                if(msg !== null && msg !== undefined) {
                    let data = msg.split(",");
                    let options = this._props.options;
                    let values = [];
                    for (const num in data) {
                        let value = {};
                        if(data[num] !== null && data[num] !== "") {
                            value.key = data[num];
                            for (const index in options) {
                                const option = options[index];
                                if (option.key == value.key) {
                                    value.value = option.key+'-'+option.value;
                                }
                            }
                            values.push(value);
                        }
                    }
                    if(values.length) {
                        this.value = values;
                    }
                }
                if(this._props.options!==undefined&&!(typeof this._props.options === 'object' && !isNaN(this._props.options.length))){
                    this._props.options=[];
                }
                if(typeof this._props.labelDesc !== "undefined") {
                    this.labelText = this._props.labelDesc + ' :';
                }
            },
            initProperty() {
                //判断是否多选
                if(this._props.isMultiSelect === undefined || this._props.isMultiSelect === null || this._props.isMultiSelect === true){
                    //是否多选标志未定义时，默认为多选
                    this.isMulti = true
                }else{
                    this.isMulti = this._props.isMultiSelect;
                    this.closeSelect = true
                }
            },
            rebackOption(newValue){
                if(typeof this._props.msg === "object"){
                    this.$emit("getVue", this._props.msg);
                }
            },
            reback(newValue) {
                let value = "";
                //多选
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
                    //默认单选
                    if(newValue[0] !== undefined){
                        value = newValue[0].key
                    }else {
                        value = newValue.key
                    }
                }
                if(typeof this._props.msg === "object") {
                    this._props.msg.attrValue = value
                }
                if(typeof this._props.msg === "string" || typeof this._props.msg === "undefined") {
                    this._props.msg = value
                }
                if (value) {
                    this.$emit("getVue", this._props.msg);
                }
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
</style>