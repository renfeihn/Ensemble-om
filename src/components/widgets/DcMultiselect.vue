/**
*labelDesc属性
*例子: 数据为String字符串的时候:  <dc-multiselect label="测试测试"></dc-multiselect>  加载后数据为：测试测试
*      数据为变量的时候:          <dc-multiselect :label="object"></dc-multiselect>  加载后数据为变量object对应数据
*/
<template>
    <div>

        <v-layout row wrap >
            <v-flex md4 lg4>
                <v-layout row wrap right>
                    <v-flex md2>
                        <i v-if="baseAttr==true" class="material-icons baseIcon small">
                            call_merge
                        </i>
                    </v-flex>
                    <v-flex md10>
                        <v-subheader class="primary--text subheading pr-1">{{labelText}}</v-subheader>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex md6 lg6>
                <div :class="background">
                    <multiselect v-model="value" :isMultiSelect="isMultiSelect" name="key" open-direction="bottom" placeholder="请选择..." selectLabel="" :class="background"
                                 :searchable="false" labelDesc="labelDesc" :close-on-select="closeSelect" label="value" :hide-selected="true" track-by="value" :options="options" :multiple="isMulti" class="dcMulti" :perShow="perShow">
                    </multiselect>
                </div>
            </v-flex>
            <v-flex md2 lg2 >
                <v-tooltip v-if="personShow==1" right :color="peopleColor">
                    <v-btn flat small :color="peopleColor" icon="people" slot="activator" @click="peopleClick" class="dcMulti1">
                        <v-icon>people</v-icon>
                    </v-btn>
                    <span>{{peopleDesc}}</span>
                </v-tooltip>
                <div class="navbar">  <v-btn
                        fab
                        dark
                        class="smallButton"
                        color="blue darken-2"
                >
                    <v-icon>add</v-icon>
                </v-btn>
                    <ul class="menu">
                        <li>
                            <v-btn
                                    fab
                                    dark
                                    class="smallButton"
                                    color="green"
                            >
                        <v-icon>close</v-icon>
                    </v-btn>
                        </li>
                        <li>
                    <v-btn
                            fab
                            dark
                            class="smallButton"
                            color="indigo"
                    >
                        <v-icon>edit</v-icon>
                    </v-btn>
                        </li>
                        <li>
                    <v-btn
                            fab
                            dark
                            class="smallButton"
                            color="red"
                    >
                        <v-icon>delete</v-icon>
                    </v-btn>
                        </li>
                    </ul>
                </div>
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
        props: {
            options: String,
            msg: String,
            isMultiSelect: String,
            perShow: String,
            labelDesc: String,
            baseAttr: {
                type: String,
                default: true
            },
            showEdit: {
                type: String,
                default: true
            }
        },
        data() {
            return {
                value: [],
                options: [],
                fab: false,
                personShow: 0,
                isMulti: true,
                isOpen: 'fas fa-eye',
                background: '',
                closeSelect: false,
                peopleColor: "grey lighten-1",
                peopleDesc: "产品生效"
            };
        },
        watch: {
            msg: {
                handler(msg) {
                    if(typeof msg !== "undefined") {
                        this.init(typeof msg === "object" ? msg.attrValue : msg);
                    }
                }
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
        },
        mounted: function() {
            this.initProperty();
        },
        methods: {
            peopleClick() {
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
                if(typeof this._props.labelDesc !== "undefined") {
                    this.labelText = this._props.labelDesc + ' :';
                }
                if(this._props.labelDesc == '币种'){
                    this.background= 'delete'
                }else{
                    this.background= ''
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
                //根据产品配置信息，初始化分户生效标志
                if(this._props.msg.perEffect === "true"){
                    this.peopleColor = "red"
                    this.peopleDesc = "分户生效"
                }else{
                    this.peopleColor = "grey lighten-1"
                    this.peopleDesc = "产品生效"
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
                //判断是否显示分户生效标识
                if(this._props.perShow === true){
                    this.personShow = 1
                }
            },
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
                    value = newValue[0].key
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
    .baseIcon {
        padding-top: 15px;
        color: #ff110e;
    }
    .lock {
        color: #ff8511;
        padding-top: 20px;
    }
    .demo{
        padding: 2em 0;
        transform: translate3d(0, 0, 0);
    }
    .navbar {
        padding-top: 9px;
        border-radius: 50%;
        background: #fff;
        position: relative;
        cursor: pointer;
        text-align: center;
        font-size: 1.75em;
        font-weight: bold;
        color: #99b977;
        transition: 0.24s 0.2s;
    }
    .navbar:hover{
        background: rgba(255, 255, 255, 0.75);
    }
    .navbar .menu{
        list-style: none;
        padding: 0;
        margin: 0;
        position: absolute;


        cursor: default;
        border-radius: 50%;
        transform: scale(0);
        transition: transform 1.4s 0.07s;
        z-index: -1;
    }
    .navbar:hover .menu{
        transition: transform 0.4s 0.08s, z-index   0s  0.5s;
        transform: scale(1);
        z-index: 1;
    }
    .navbar .menu li{
        position: absolute;
        top: -88px;
        left: -50px;
        transform-origin: 70px 70px;
        transition: all 0.5s 0.1s;
    }
    .navbar:hover .menu li{
        transition: all 0.6s;
    }
    .navbar .menu li button{
        width: 30px;
        height: 30px;
        line-height: 45px;
        border-radius: 50%;
        background: #fff;
        position: absolute;
        font-size: 60%;

        transition: 0.6s;
    }
    .navbar:hover .menu li:nth-child(1){
        transition-delay: 0.02s;
        transform: rotate(93deg);
    }
    .navbar:hover .menu li:nth-child(1)  button{
        transition-delay: 0.84s;
        transform: rotate(200deg);
    }
    .navbar:hover .menu li:nth-child(2){
        transition-delay: 0.04s;
        transform: rotate(132deg);
    }
    .navbar:hover .menu li:nth-child(2)  button{
        transition-delay: 0.84s;
        transform: rotate(595deg);
    }
    .navbar:hover .menu li:nth-child(3){
        transition-delay: 0.06s;
        transform: rotate(172deg);
    }
    .navbar:hover .menu li:nth-child(3)  button{
        transition-delay: 0.84s;
        transform: rotate(555deg);
    }
    .navbar:hover .menu li:nth-child(4){
        transition-delay: 0.08s;
        transform: rotate(205deg);
    }
    .navbar:hover .menu li:nth-child(4)  button{
        transition-delay: 0.16s;
        transform: rotate(515deg);
    }
    .navbar:hover .menu li:nth-child(5){
        transition-delay: 0.1s;
        transform: rotate(245deg);
    }
    .navbar:hover .menu li:nth-child(5)  button{
        transition-delay: 0.2s;
        transform: rotate(475deg);
    }
    .navbar:hover .menu li:nth-child(6){
        transition-delay: 0.12s;
        transform: rotate(285deg);
    }
    .navbar:hover .menu li:nth-child(6)  button{
        transition-delay: 0.24s;
        transform: rotate(435deg);
    }
    .navbar:hover .menu li:nth-child(7){
        transition-delay: 0.14s;
        transform: rotate(325deg);
    }
    .navbar:hover .menu li:nth-child(7)  button{
        transition-delay: 0.28s;
        transform: rotate(395deg);
    }
    .navbar:hover .menu li:nth-child(8){
        transition-delay: 0.16s;
        transform: rotate(365deg);
    }
    .navbar:hover .menu li:nth-child(8)  button{
        transition-delay: 0.32s;
        transform: rotate(355deg);
    }
    .navbar:hover .menu li:nth-child(9){
        transition-delay: 0.18s;
        transform: rotate(405deg);
    }
    .navbar:hover .menu li:nth-child(9)  button{
        transition-delay: 0.36s;
        transform: rotate(315deg);
    }
    .smallButton {
        width: 30px;
        height: 30px;
    }
</style>