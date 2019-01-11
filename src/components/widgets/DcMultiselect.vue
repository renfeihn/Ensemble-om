<template>
    <div>
        <transition name="slide-fade">
            <v-layout row wrap :class="background" v-if="show">
                <v-flex md4 lg4>
                    <v-layout row wrap right>
                        <v-flex md12 row wrap>
                            <v-subheader class="primary--text subheading pr-1">{{labelText}}</v-subheader>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex md6 lg6>
                    <div>
                        <multiselect v-model="value" :isMultiSelect="isMultiSelect" name="key" open-direction="bottom" placeholder="请选择..." selectLabel="" :class="background" :custom-label="nameWithLang"
                                     :disabled="disabled" labelDesc="labelDesc" :close-on-select="closeSelect" label="value" :hide-selected="true" track-by="value" :options="options" :multiple="isMulti" class="dcMulti" :perShow="perShow">
                       <template slot="option" slot-scope="props"><span>{{props.option.key}}-{{props.option.value}}</span></template>
                       <template slot="afterList" slot-scope="props"><span @click="toMoreTable" v-if="rfTableInfo.isRf">跳转</span></template>
                       <template slot="noResult" slot-scope="props"><span>无返回结果</span></template>
                        </multiselect>
                    </div>
                </v-flex>
                <v-flex md2 lg2>
                    <v-tooltip v-if="personShow==1" right :color="peopleColor">
                        <v-btn flat small :color="peopleColor" icon="people" slot="activator" @click="peopleClick" class="dcMulti1">
                            <v-icon>people</v-icon>
                        </v-btn>
                        <span>{{peopleDesc}}</span>
                    </v-tooltip>
                    <dc-navbar v-if="showEdit == true" v-model="optionPermissions"></dc-navbar>
                    <i v-if="baseAttr=='BASE'" class="material-icons baseIcon small">
                        call_merge
                    </i>
                </v-flex>
            </v-layout>
        </transition>
       <warn-dialog v-model="dialog" :oldOptionPermissions="oldOptionPermissions" v-on:rebackOptionPermissions="rebackOptionPermissions" :diffProdList="diffProdList"></warn-dialog>
    </div>
</template>

<script>
    import Multiselect from "vue-multiselect";
    import DcNavbar from './DcNavbar'
    import {findChildProd} from "@/api/url/prodInfo";
    import {getPkList} from '@/views/prodFactory/prodInfo/pkListColumnInfo'
    import warnDialog from '@/views/prodFactory/prodInfo/baseProd/warnDialog';
    export default {
        components: { Multiselect ,DcNavbar ,warnDialog},
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
            },
            disablePower: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                value: [],
                fab: false,
                personShow: 0,
                isMulti: true,
                show: false,
                baseAttr: "",
                isOpen: 'fas fa-eye',
                optionPermissions: '',
                rfTableInfo: {
                    isRf: false
                },
                disabled: false,
                oldOptionPermissions: '',
                dialog: false,
                background: '',
                closeSelect: false,
                diffProdList: [],
                peopleColor: "grey lighten-1",
                peopleDesc: "产品生效"
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
                deep: true
            },
            value: {
                handler(newValue) {
                    this.reback(newValue);
                }
            },
            optionPermissions: {
                handler(newValue,oldValue) {
                    //查询上收，下收影响的产品列表
                    if((newValue=='E'|| oldValue=='E')&&this.oldOptionPermissions.reback==undefined && oldValue !== "" && oldValue !== null){
                        this.oldOptionPermissions=oldValue;
                        this.findChildProd();
                    }else{
                        this.oldOptionPermissions=''
                        this.dialog=false
                    }
                    this.rebackOption(newValue);
                }
            },
            baseAttr: {
                handler(newValue) {
                    if(newValue === "BASE" || this.$attrs.disabled === true){
                        this.disabled = true
                    }else{
                        this.disabled = false
                    }
                }
            },
            disablePower: {
                handler(newValue) {
                    if(this._props.baseAttr === "BASE" || this.$attrs.disabled === true){
                        this.disabled = true
                    }else{
                        this.disabled= newValue;
                    }
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
            this.dealNewAttr(this._props.msg)
            //判断参数取自基础产品||可售产品
            if(this._props.baseAttr === "BASE" || this.$attrs.disabled === true){
                this.disabled = true
            }else{
                this.disabled= this._props.disablePower;
            }
        },
        mounted: function() {

            this.initProperty();
        },
        methods: {
            toMoreTable (){
                this.$router.push({
                    name: 'tableInfo',
                    params: {
                        'tableName': this.rfTableInfo.tableName
                    }
                })
            },
            nameWithLang ({ key, value }) {
                return `${key}—[${value}]`
            },
            dealNewAttr(val) {
                //新增参数延迟展示
                if(val !== undefined && val.newAttr) {
                    let t;
                    clearTimeout(t)
                    let that = this;
                    t = setTimeout(function () {
                        that.show = true
                    }, 1000);
                }else{
                    this.show = true
                }
            },
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
            findChildProd() {
                if(this._props.msg!= undefined&& this._props.msg.attrKey!= undefined){
                const column ={'prodType': this.$store.getters.prodType,'attrType': this._props.msg.attrKey,'attrValue': this._props.msg.attrValue};
                findChildProd(column).then(response => {
                    const reList = response.data.data
                    //如果存在差异弹出差异列表
                    if(reList!= undefined&&reList.length>0){
                    this.dialog=true;
                    this.diffProdList=reList
                    }
                });
                }
            },
            rebackOptionPermissions (optionPermissions){
                this.optionPermissions=optionPermissions.reback;
                this.oldOptionPermissions=optionPermissions
            },
            init(msg) {
                if(this._props.baseAttr === "BASE" || this.$attrs.disabled === true){
                    this.disabled = true
                }else{
                    this.disabled= this._props.disablePower;
                }
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
                                    value.value = option.value;
                                }
                            }
                            values.push(value);
                        }
                    }
                    if(values.length) {
                        this.value = values;
                    }
                    //选项赋值
                    if(this._props.msg.optionPermissions!==undefined){
                        this.optionPermissions= this._props.msg.optionPermissions
                    }
                }
                if(this._props.options!==undefined&&!(typeof this._props.options === 'object' && !isNaN(this._props.options.length))){
                    this.rfTableInfo=this._props.options
                    this.rfTableInfo['isRf']=true;
                    this._props.options=[];
                    getPkList(this.rfTableInfo,sessionStorage.getItem("mainSeqNo"),response => {
                        this._props.options=response
                    });
                }
                if(typeof this._props.labelDesc !== "undefined") {
                    this.labelText = this._props.labelDesc + ' :';
                }
                //根据产品配置信息，初始化分户生效标志
                if(this._props.msg.perEffect !== undefined && this._props.msg.perEffect === "true"){
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
            rebackOption(newValue){
                if(typeof this._props.msg === "object"){
                    this._props.msg.optionPermissions=newValue
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
                if(typeof this._props.msg === "object" && this._props.msg != null) {
                    this._props.msg.attrValue = value
                }
                if(typeof this._props.msg === "string" || typeof this._props.msg === "undefined" || this._props.msg === null) {
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
    .background {
        transform:rotate(360deg);
        transition:  transform 0.5s 0.2s;
    }
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
</style>