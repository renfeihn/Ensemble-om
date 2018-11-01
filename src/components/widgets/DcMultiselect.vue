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
                    <!--<v-flex md2 v-if="baseAttr==true">-->
                        <!--<i class="material-icons baseIcon small">-->
                            <!--call_merge-->
                        <!--</i>-->
                    <!--</v-flex>-->
                    <!--<v-flex md2 v-else>-->
                        <!--<i class="material-icons baseIconDis small">-->
                            <!--call_merge-->
                        <!--</i>-->
                    <!--</v-flex>-->
                    <!--<v-flex md10>-->
                        <!--<v-subheader class="primary&#45;&#45;text subheading pr-1">-->
                            <!--{{labelText}}</v-subheader>-->
                    <v-flex md12 row wrap>
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
               <dc-navbar v-if="showEdit == true"></dc-navbar>
                <i v-if="baseAttr=='BASE'" class="material-icons baseIcon small">
                    call_merge
                </i>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import Multiselect from "vue-multiselect";
    import DcNavbar from './DcNavbar'
    export default {
        components: { Multiselect ,DcNavbar },
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
                default: "SOLD"
            },
            showEdit: {
                type: String,
                default: false
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
    .baseIconDis {
        padding-top: 15px;
        color: #fffdfe;
    }
    .lock {
        color: #ff8511;
        padding-top: 20px;
    }

</style>