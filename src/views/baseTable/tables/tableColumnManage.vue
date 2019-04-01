<template>
    <div class="elevation-4">
        <v-toolbar color="primary lighten-2" dark>
            <v-toolbar-title>元数据管理</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
                    clearable
                    v-model="search"
                    prepend-icon="search"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
            <v-dialog v-model="dialog" max-width="600px">
                <v-btn slot="activator" flat color="primary lighten-2" @click="addClick">
                    <td style="color: white;margin-left: 100px">添加</td>
                </v-btn>
                <v-card>
                    <v-card-title>
                        <span style="color: #00b0ff;font-size: x-large;margin-left: 5%">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text style="margin-top: -10%">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs6 sm6 md6 v-if="disabled=='true'">
                                    <v-text-field v-model="editedItem.columnId" label="字段ID" disabled></v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6 v-if="disabled=='false'">
                                    <v-text-field v-model="editedItem.columnId" label="字段ID"></v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-text-field v-model="editedItem.columnDesc" label="字段名称"></v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.attrType" label="数据类型" :items="attrType" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.columnType" label="字段属性" :items="columnTypeRf" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.columnClass" label="参数分类" :items="mbAttrClass" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-text-field v-model="editedItem.useMethod" label="使用方式"></v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.valueMethod" label="数据模型" :items="valueMethodRf" item-text="value" item-value="key" @change="change()"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-text-field v-model="editedItem.setValueFlag" label="参数值设置方式"></v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-text-field v-model="editedItem.busiCatagory" label="业务分类"></v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.company" label="法人代码" :items="fmCompany" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="editedItem.valueScore" label="数据来源表" :items="tab" item-text="value" item-value="key"></v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6 v-show="show">
                                    <v-text-field v-model="editedItem.valueScoreColumn" label="数据参数"></v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6 v-show="!show">
                                    <v-select v-model="editedItem.valueScoreColumn" label="数据参数" :items="tab"></v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions style="margin-top: -7%">
                        <v-btn color="info" @click="close" class="bthStyle" style="margin-left: 6%">取消</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="info" @click="save" class="bthStyle" style="margin-right: 6%">保存</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-data-table :headers="headers" :items="desserts" :search="search" class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.columnId }}</td>
                <td>{{ props.item.columnDesc }}</td>
                <!--<td>{{ props.item.valueType }}</td>-->
                <!--<td>{{ props.item.valueLength }}</td>-->
                <td>{{ props.item.attrType }}</td>
                <td>{{ props.item.columnType }}</td>
                <td>{{ props.item.columnClass }}</td>
                <td>{{ props.item.useMethod }}</td>
                <td>{{ props.item.valueMethod }}</td>
                <td>{{ props.item.setValueFlag }}</td>
                <td>{{ props.item.busiCatagory }}</td>
                <td>{{ props.item.company }}</td>
                <td>{{ props.item.valueScore }}</td>
                <td>{{ props.item.valueScoreColumn }}</td>

                <td>
                    <v-tooltip bottom color="blue" style="margin-left: -20px">
                        <v-btn flat icon="edit" slot="activator">
                            <v-icon small class="mr-2" @click="editItem(props.item)" style="color: #0d47a1">edit</v-icon>
                        </v-btn>
                        <span>修改</span>
                    </v-tooltip>
                    <v-tooltip bottom color="red" style="margin-left: -20px">
                        <v-btn flat icon="delete" slot="activator">
                            <v-icon small @click="deleteItem(props.item)" style="color: red">delete</v-icon>
                        </v-btn>
                        <span>删除</span>
                    </v-tooltip>
                </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>
    </div>
</template>
<script>
    import {getSysTable} from "@/api/url/prodInfo";
    import {getPkList} from '@/views/prodFactory/prodInfo/pkListColumnInfo'
    import {filterTableChangeData} from "@/server/filterTableChangeData";
    import {saveSysTable} from "@/api/url/prodInfo";
    import toast from '@/utils/toast';
    import {getSysInfoByUser} from "@/api/url/prodInfo";
    import {getAttrInfo} from '@/api/url/prodInfo'
    import {getTableColumnInfo} from '@/api/url/prodInfo'
    import {saveParam} from '@/api/url/prodInfo'

    export default {
        props: ["title"],
        data: () => ({
            dialog: false,
            disabled: "false",
            tab: [],
            attrType: [
                {
                    key: "STRING",
                    value: "STRING"
                },
                {
                    key: "DATE",
                    value: "DATE"
                },
                {
                    key: "DOUBLE",
                    value: "DOUBLE"
                }
            ],
            valueMethodRf: [
                {
                    key: "RF",
                    value: "数据来源他表"
                },
                {
                    key: "VL",
                    value: "固定备选数据"
                },
                {
                    key: "FD",
                    value: "手动输入"
                },
                {
                    key: "YN",
                    value: "YN"
                }
            ],
            columnTypeRf: [
                {
                    key: "select",
                    value: "下拉选择"
                },
                {
                    key: "input",
                    value: "手动输入"
                },
                {
                    key: "switch",
                    value: "开关"
                },
                {
                    key: "data",
                    value: "日期控件"
                },
                {
                    key: "tree",
                    value: "树形结构"
                }
            ],
            headers: [
                { text: '字段ID',sortable: false,value: 'columnId'},
                { text: '字段名称',sortable: false,value: 'columnDesc'},
//                { text: '数据类型',sortable: false },
//                { text: '数据长度',sortable: false },
                { text: '数据类型',sortable: false,value: 'attrType' },
                { text: '字段属性',sortable: false,value: 'columnType' },
                { text: '参数分类',sortable: false,value: 'columnClass' },
                { text: '使用方式',sortable: false,value: 'useMethod' },
                { text: '数据模型',sortable: false,value: 'valueMethod' },
                { text: '参数值设置方式',sortable: false,value: 'setValueFlag' },
                { text: '业务分类',sortable: false,value: 'busiCatagory' },
                { text: '法人代码',sortable: false,value: 'company' },
                { text: '数据来源表',sortable: false,value: 'valueScore' },
                { text: '数据参数',sortable: false,value: 'valueScoreColumn' },
                { text: 'Action',sortable: false }
            ],
            desserts: [],
            sourceData: [],
            keySet: [
                {
                    key: "true",
                    dataIndex: "tableName"
                }
            ],
            editedIndex: -1,
            title: "",
            editedItem: {
                columnId: '',
                columnDesc: '',
//                valueType: '',
//                valueLength: '',
                columnType: '',
                valueMethod: '',
                valueScore: '',
                valueScoreColumn: ''
            },
            defaultItem: {
                columnId: '',
                columnDesc: '',
//                valueType: '',
//                valueLength: '',
                columnType: '',
                valueMethod: '',
                valueScore: '',
                valueScoreColumn: ''

            },
            backValue: {},
            search: '',
            fmCompany: [],
            mbAttrClass: [],
            show: true,
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新增元数据' : '修改元数据'
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            }
        },

        created () {
            this.initialize()
            this.initRf()
            this.initClassAndFm()
        },

        methods: {
            //数据来源表
            initRf() {
                let that = this
                getSysTable("OM_TABLE_LIST").then(function (response) {
                    for(let i=0; i<response.data.data.columnInfo.length; i++){
                        let temp = {}
                        temp["key"] = response.data.data.columnInfo[i].tableName
                        temp["value"] = response.data.data.columnInfo[i].tableDesc
                        that.tab.push(temp)
                    }
                });
            },
            //法人代码,参数分类
            initClassAndFm() {
                let that = this
                getTableColumnInfo().then(function (response) {
                    let fm = response.data.data.fmCompany
                    let cls = response.data.data.mbAttrClass
                    for(let i=0; i<fm.length; i++){
                        let temp = {}
                        temp["key"] = fm[i].company
                        temp["value"] = fm[i].companyName
                        that.fmCompany.push(temp)
                    }
                    for(let j=0; j<cls.length; j++){
                        let atr = {}
                        atr["key"] = cls[j].attrClass
                        atr["value"] = cls[j].attrClassDesc
                        that.mbAttrClass.push(atr)
                    }
                    let par = {}
                    par["key"] = "PARAM"
                    par["value"] = "参数"
                    that.mbAttrClass.push(par)
                });
            },
            initialize () {
                let that = this
                //读取attr_type和attr_value表
                const dataSource = getAttrInfo();
                for(let i in dataSource){
                    let temp = {}
                    temp["columnId"] = i
                    temp["columnDesc"] = dataSource[i].columnDesc
                    temp["columnType"] = dataSource[i].columnType
                    temp["attrType"] = dataSource[i].attrType
                    temp["columnClass"] = dataSource[i].columnClass
                    temp["useMethod"] = dataSource[i].useMethod
                    temp["setValueFlag"] = dataSource[i].setValueFlag
                    temp["busiCatagory"] = dataSource[i].busiCatagory
                    temp["company"] = dataSource[i].company
                    temp["valueMethod"] = dataSource[i].valueMethod
                    temp["valueScore"] = dataSource[i].valueScore === undefined?"":dataSource[i].valueScore.tableName
                    let valueScoreColumn = " "
                    if(dataSource[i].valueMethod === "RF" && dataSource[i].valueScore !== undefined){
                        valueScoreColumn = dataSource[i].valueScore.columnCode + "," +dataSource[i].valueScore.columnDesc
                    }
                    if(dataSource[i].valueMethod == "VL" && dataSource[i].valueScore !== undefined){
                        for(let j=0; j<dataSource[i].valueScore.length; j++){
                            valueScoreColumn =valueScoreColumn + dataSource[i].valueScore[j].key +"-" + dataSource[i].valueScore[j].value +','
                        }
                        valueScoreColumn = valueScoreColumn.substr(0, valueScoreColumn.length - 1);
                    }
                    temp["valueScoreColumn"] = valueScoreColumn
                    that.desserts.push(temp)
                }
            },
            addClick() {
                this.disabled = "false"
            },
            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
                this.disabled = "true";

            },
            //删除数据落库
            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                let confirms = confirm('Are you sure you want to delete this item?')
                if(confirms == true){
                    this.desserts.splice(index, 1)
                    let map = {}
                    map["operate"] = "delete"
                    map["mbAttrType"] = this.getAttrType(item)
                    //attrValue中刪除的数据
                    map["mbAttrValueDelete"] = this.addAttrValue(item)
                    saveParam(map).then(response => {
                        if (response.status === 200) {
                            this.sweetAlert('success', "提交成功!")
                        }
                    });
                }
            },
            //关闭弹框
            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },
            //保存数据落库
            save () {
                let map = {}
                if (this.editedIndex > -1) {
                    //更新
                    map["operate"] = "update"
                    map["mbAttrValueUpdate"] = this.updateAttrValue(this.editedItem,this.desserts[this.editedIndex])
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    //新增
                    this.desserts.push(this.editedItem)
                    map["operate"] = "add"
                    //attrValue中增加的数据
                    map["mbAttrValueAdd"] = this.addAttrValue(this.editedItem)
                }
                //attrType表中的基础数据
                map["mbAttrType"] = this.getAttrType(this.editedItem)
                saveParam(map).then(response => {
                    if (response.status === 200) {
                        this.sweetAlert('success', "提交成功!")
                    }
                });
                this.close()
            },
            //attrType表中的基础数据
            getAttrType(val) {
                let mbAttrType = {}
                mbAttrType["attrKey"] = val.columnId
                mbAttrType["attrType"] = val.attrType
                mbAttrType["attrDesc"] = val.columnDesc
                mbAttrType["attrClass"] = val.columnClass
                mbAttrType["useMethod"] = val.useMethod
                mbAttrType["valueMethod"] = val.valueMethod
                mbAttrType["setValueFlag"] = val.setValueFlag
                mbAttrType["busiCatagory"] = val.busiCatagory
                mbAttrType["status"] = "A"
                mbAttrType["company"] = val.company
                return mbAttrType
            },
            //增加/刪除 attrValue表中数据，按RF(来源他表)和VL（固定备选数据）分类组装数据
            addAttrValue(val) {
                let mbValue = {}
                let mbAttrValueAdd = []
                //RF
                if(val.valueMethod == "RF"){
                    mbValue["attrKey"] = val.columnId
                    mbValue["attrValue"] = "来源他表"
                    mbValue["valueDesc"] = val.columnDesc
                    mbValue["refTable"] = val.valueScore
                    mbValue["refCondition"] = "1=1"
                    mbValue["refColumns"] = val.valueScoreColumn
                    mbAttrValueAdd.push(mbValue)
                }
                //VL
                if(val.valueMethod == "VL"){
                    let valueScoreColumns = val.valueScoreColumn.split(",")
                    for(let i=0; i<valueScoreColumns.length; i++){
                        let mbValue = {}
                        let valueAndDesc = valueScoreColumns[i].split("-")
                        mbValue["attrKey"] = val.columnId
                        mbValue["attrValue"] = valueAndDesc[0]
                        mbValue["valueDesc"] = valueAndDesc[1]
                        mbAttrValueAdd.push(mbValue)
                    }
                }
                return mbAttrValueAdd
            },
            //更新 attrValue表中数据
            updateAttrValue(newV,oldV) {
                let mbAttrValueAdd = []
                let mbAttrValueUpdate = []
                let mbAttrValueDelete = []
                let map = {}
                //rf的更新数据
                if(newV.valueMethod == "RF"){
                    map["attrKey"] = newV.columnId
                    map["attrValue"] = "来源他表"
                    map["valueDesc"] = newV.columnDesc
                    map["refTable"] = newV.valueScore
                    map["refCondition"] = "1=1"
                    map["refColumns"] = newV.valueScoreColumn
                }
                //vl的更新数据
                if(newV.valueMethod == "VL"){
                    //新数据组装
                    let newValue = []
                    let valueScoreColumns = newV.valueScoreColumn.split(",");
                    for(let i=0; i<valueScoreColumns.length; i++){
                        let mbValue = {}
                        let valueAndDesc = valueScoreColumns[i].split("-")
                        mbValue["attrKey"] = newV.columnId
                        mbValue["attrValue"] = valueAndDesc[0]
                        mbValue["valueDesc"] = valueAndDesc[1]
                        newValue.push(mbValue)
                    }
                    //老数据组装
                    let oldValue = []
                    let valueScoreColumn = oldV.valueScoreColumn.split(",")
                    for(let i=0; i<valueScoreColumn.length; i++){
                        let mbValue = {}
                        let valueAndDesc = valueScoreColumn[i].split("-")
                        mbValue["attrKey"] = oldV.columnId
                        mbValue["attrValue"] = valueAndDesc[0]
                        mbValue["valueDesc"] = valueAndDesc[1]
                        oldValue.push(mbValue)
                    }
                    //新老数据差异对比
                    for(let i=0; i<newValue.length; i++){
                        let n = 0
                        for(let j=0; j<oldValue.length; j++){
                            //更新
                            if(newValue[i].attrKey == oldValue[j].attrKey && newValue[i].attrValue == oldValue[j].attrValue){
                                mbAttrValueUpdate.push(newValue[i])
                            }else{
                                n++
                            }
                        }
                        //删除
                        if(n == oldValue.length){
                            mbAttrValueAdd.push(newValue[i])
                        }
                    }
                    for(let i=0; i<oldValue.length; i++){
                        let n = 0
                        for(let j=0; j<newValue.length; j++){
                            //更新
                            if(oldValue[i].attrKey == newValue[j].attrKey && oldValue[i].attrValue == newValue[j].attrValue){
                                break
                            }else{
                                n++
                            }
                        }
                        //新增
                        if(n == newValue.length){
                            mbAttrValueDelete.push(oldValue[i])
                        }
                    }
                    map["mbAttrValueUpdate"] = mbAttrValueUpdate
                    map["mbAttrValueAdd"] = mbAttrValueAdd
                    map["mbAttrValueDelete"] = mbAttrValueDelete
                }
                return map
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
            },
            //数据模型决定数据参数是输入框还是下拉框，RF是下拉框
            change(){
                if(this.editedItem.valueMethod == "RF"){
                    this.show = false
                }
                if(this.editedItem.valueMethod != "RF"){
                    this.show = true
                }
            }
        }
    }
</script>
<style scoped>
    .ee{
        font-size: medium;
    }
    .bthStyle {
        color: #00b0ff;
        width: 120px;
    }
</style>