<template>
    <v-card>
        <v-toolbar card dense color="transparent">
            <a-button type="primary" @click="onEdit" class="ml-2">修改</a-button>
            <v-dialog v-model="dialog" width="500">
                <v-toolbar color="primary lighten-2" style="height: 50px">
                    <v-toolbar-title class="white--text" style="margin-top: -2%">修改变更产品</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-icon class="mr-2 closeClass" @click="close()">close</v-icon>
                </v-toolbar>
                <v-card v-if="dialog">
                    <v-card-text style="height: 200px">
                        <v-layout wrap>
                            <v-flex xs12 sm12 m12>
                                <dc-multiselect :isMultiSelect="false" v-model="selected.amendProdType" :options="prodType" labelDesc="可变更的产品类型"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <v-btn color="info" @click="console" class="bthStyle" style="margin-left: 5%">取消</v-btn>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <v-btn color="info" @click="submit" class="bthStyle" style="margin-left: 50%">保存</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
            <a-table :customRow="customRow" :columns="columns" :dataSource="amendMaping" bordered>
            </a-table>
        </v-card-text>
    </v-card>

</template>
<script>
    import DcMultiselect from '@/components/widgets/DcSelectTable'
    import DcTextField from "@/components/widgets/DcTextField";
    import {getChargeDefine} from '@/api/table';
    import toast from '@/utils/toast';
    import { getInitData } from "@/mock/init";
    import {getColumnDesc} from '@/utils/columnDesc'
    import {removeByValue} from '@/utils/util'
    import DcDate from '@/components/widgets/DcDate'
    import {getParamTable} from "@/api/url/prodInfo";

    export default {
        components: { DcMultiselect,DcDate,DcTextField},
        props: ["prodData"],
        data () {
            return {
                dialog: false,
                prodType: [],
                amendMaping: [],
                selected: {},
                selectedOld: {},
                columns: [
                    {dataIndex: 'prodType', title: '产品类型',scopedSlots: { customRender: 'prodType' }},
                    {dataIndex: 'amendProdType', title: '可变更的产品类型'}
                ]
            };
        },
        watch: {
            prodData (val) {
                this.initAmendMaping(val)
            }
        },
        mounted: function() {
            this.initAmendMaping(this._props.prodData)
        },

        methods: {
            //获取原始数据
            initAmendMaping(val) {
                //初始化产品对应的信息
                if(val!=undefined&&val.prodType!=undefined){
                    this.amendMaping = val.mbProdAmendMaping
                }
                //加载备选数据
                this.getRfInfo();
            },
            //加载备选数据
            getRfInfo() {
                let that = this
                getParamTable("MB_PROD_TYPE").then(function (response) {
                    let prodType = response.data.data.columnInfo;
                    for(let i=0; i<prodType.length; i++){
                        let temp = {}
                        temp["key"] = prodType[i].PROD_TYPE;
                        temp["value"] = prodType[i].PROD_DESC;
                        that.prodType.push(temp);
                    }
                });
            },
            onEdit () {
                if(this.selected.prodType != '' && this.selected.prodType != undefined) {
                    for(let key in this.selected){
                        if(this.selected[key] == null){
                            this.selected[key] = ""
                        }
                    }
                    this.option = 'edit';
                    this.dialog = true;
                    this.disabledFlag = true;
                }else{
                    toast.info("请选择需要修改的数据!");
                }
            },
            //弹框修改保存事件
            submit () {
                let dataSource=this.amendMaping
                if(this.option =='edit')
                {
                    let prodType = this.selected.prodType
                    for(let index=0; index<dataSource.length; index++){
                        if(dataSource[index].prodType === prodType){
                            this.removeArr(dataSource,this.selectedOld)
                            this.selectedOld = this.selected
                            dataSource.push(this.selected)
                            break;
                        }
                    }
                    this.dialog=false;
                }
            },
            console (){
              this.dialog = false
                this.selectedOld = {}
                this.selected = {}
            },
            //点击某行，无效选中数据
            customRow (record) {
                return {
                    on: {
                        click: this.clickRow.bind(this, record)
                    }
                }
            },
            //删除对象数组指定对象
            removeArr(_arr, _obj) {
                let length = _arr.length;
                for (let i = 0; i < length; i++) {
                    if (_arr[i] == _obj) {
                        if (i == 0) {
                            _arr.shift(); //删除并返回数组的第一个元素
                            return _arr;
                        }
                        else if (i == length - 1) {
                            _arr.pop();  //删除并返回数组的最后一个元素
                            return _arr;
                        }
                        else {
                            _arr.splice(i, 1); //删除下标为i的元素
                            return _arr;
                        }
                    }
                }
            },
            //点击某行 选中数据
            clickRow(record,event){
                var tr=event.currentTarget;
                var tbd=tr.parentNode;
                for (const i in tbd.childNodes) {
                    if (!isNaN(i)) {
                        if (tr == tbd.childNodes[i]) {
                            tbd.childNodes[i].style = 'background-color: #e6f7ff';
                        } else {
                            tbd.childNodes[i].style = '';
                        }
                    }
                }
                this.selectedOld = {}
                this.selected = {}
                this.selectedOld = record
                this.selected=this.copy(record,this.selected);
            },
            close () {
                this.dialog = false
                this.selectedOld = {}
                this.selected = {}
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },
            //对象浅复制
            copy(obj1,obj2) {
                var obj = obj2||{};
                for(let name in obj1){
                    if(typeof obj1[name] === "object" && obj1[name]!== null){
                        obj[name]= (obj1[name].constructor===Array)?[]:{};
                        this.copy(obj1[name],obj[name]);
                    }else{
                        obj[name]=obj1[name];
                    }
                }
                return obj;
            }
        }
    };
</script>

<style scoped>
    .bthStyle {
        color: #00b0ff;
        width: 120px;
        margin-top: 30px;
    }
    .bthStyle {
        color: #00b0ff;
        width: 120px;
        margin-top: 70px;
    }
    .closeClass{
        color: white;
        margin-top: -2%;
    }
</style>