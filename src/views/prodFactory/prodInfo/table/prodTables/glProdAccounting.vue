<template>
    <v-card>
        <v-toolbar card dense color="transparent">
            <a-button type="primary" class="ml-2" @click="onEdit">修改</a-button>
            <v-dialog v-model="dialog" width="900">
                <v-toolbar color="primary lighten-2" style="height: 50px">
                    <v-toolbar-title class="white--text" style="margin-top: -2%">修改信息</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-icon class="mr-2 closeClass" style="color: white" @click="dialog = false">close</v-icon>
                </v-toolbar>
                <v-card>
                    <v-card-text>
                        <v-layout wrap>
                            <v-flex xs12 sm6 m6>
                                <dc-select :isMultiSelect="false" v-model="selected.accountingStatus" :options="ACCOUNTING_STATUS" labelDesc="核算状态"></dc-select>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <dc-text labelDesc="账套" v-model="selected.businessUnit"></dc-text>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <dc-select :isMultiSelect="false" v-model="selected.glCodeL" :options="GL_CODE_L" labelDesc="负债科目代码"></dc-select>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <dc-select :isMultiSelect="false" v-model="selected.glCodeIntE" :options="GL_CODE_INT_E" labelDesc="利息支出科目代码"></dc-select>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <dc-select :isMultiSelect="false" v-model="selected.glCodeIntPay" :options="GL_CODE_INT_PAY" labelDesc="应付利息科目代码"></dc-select>
                            </v-flex>
                        </v-layout>
                        <v-layout wrap>
                            <v-flex xs12 sm6 m6>
                                <v-btn color="info" @click="dialog = false" class="bthStyle" style="margin-left: 20%">取消</v-btn>
                            </v-flex>
                            <v-flex xs12 sm6 m6>
                                <v-btn color="info" @click="submit" class="bthStyle" style="margin-left: 40%">保存</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
            <a-table :customRow="customRow" :columns="columns" :dataSource="accountingInfos" bordered>
            </a-table>
            <v-divider></v-divider>
            <h5 style="margin-top: 2%; color: #64b5f6">需要进行总分核对的科目:</h5>
            <a-table :columns="columnsFixed" :dataSource="accountingFixed" bordered>
            </a-table>
        </v-card-text>
    </v-card>
</template>
<script>
    import {getChargeDefine} from '@/api/table';
    import {getColumnDesc} from '@/utils/columnDesc'
    import toast from '@/utils/toast';
    import { getInitData } from "@/mock/init";
    import {removeByValue} from '@/utils/util'
    import DcSelect from '@/components/widgets/DcMultiselect'
    import DcDate from '@/components/widgets/DcDateTable'
    import DcText from '@/components/widgets/DcTextTable'
    import {getParamTable} from "@/api/url/prodInfo";


    export default {
        components: {DcSelect,DcDate,DcText},
        filters: {
            getDescByKey: function (key) {
                return getColumnDesc(key)
            }
        },
        props: ["prodData"],
        data () {
            return {
                disabledFlag: false,
                valid: true,
                select: {},
                columns: [
//                    {dataIndex: 'prodType', title: '产品类型',scopedSlots: { customRender: 'prodType' }},
                    {dataIndex: 'accountingStatus', title: '核算状态'},
                    {dataIndex: 'businessUnit', title: '账套'},
                    {dataIndex: 'glCodeL', title: '负债科目编码'},
                    {dataIndex: 'glCodeIntE', title: '利息支出科目代码'},
                    {dataIndex: 'glCodeIntPay', title: '应付利息科目代码'},
                ],
                columnsFixed: [
                    {dataIndex: 'status', title: '核算状态'},
                    {dataIndex: 'amtType', title: '金额类型'},
                    {dataIndex: 'glCodeCol', title: '科目映射'},
                ],
                STATUS: [],
                GL_CODE_L: [],
                GL_CODE_INT_E: [],
                GL_CODE_INT_PAY: [],
                ACCOUNTING_STATUS: [],
                dialog: false,
                accountingInfos: [],
                accountingFixed: [],
                selected: {},
                option: '',
                addFlag: false,
                modFlag: false,
                refData: getInitData,
                editedItem: {
                    prodType: '',
                    accountingStatus: '',
                    businessUnit: '',
                    glCodeL: '',
                    glCodeIntE: '',
                    glCodeIntPay: ''
                },
                defaultItem: {
                    prodType: '',
                    accountingStatus: '',
                    businessUnit: '',
                    glCodeL: '',
                    glCodeIntE: '',
                    glCodeIntPay: ''
                },
                projects: [{
                    prodType: '',
                    accountingStatus: '',
                    businessUnit: '',
                    glCodeL: '',
                    glCodeIntE: '',
                    glCodeIntPay: ''
                }],
                prodAccountingInfo: {}
            };
        },
        watch: {
            prodData (val) {
                this.getAccountingInfo(val)
            }
        },
//        mounted: function() {
//            this.getAccountingInfo(this._props.prodData)
//        },
        methods: {
            getAccountingInfo(val) {
                //初始化产品对应的信息
                if(val!=undefined&&val.prodType.prodType!=undefined) {
                    this.accountingInfos = val.glProdAccounting
                    this.prodType = val.prodType.prodType
                    this.accountingFixed = val.glProdCodeMappings
                }
                //初始化备选数据信息
                this.getRfInfo();
            },
            getRfInfo() {
                let that = this
                getParamTable("AC_SUBJECT").then(function (response) {
                    let acSubject = response.data.data.columnInfo;
                    for(let i=0; i<acSubject.length; i++){
                        let temp = {}
                        temp["key"] = acSubject[i].SUBJECT_CODE;
                        temp["value"] = acSubject[i].SUBJECT_DESC;
                        that.GL_CODE_INT_E.push(temp);
                        that.GL_CODE_INT_PAY.push(temp);
                        if(acSubject[i].BSPL_TYPE == "L"){
                            //负债科目
                            that.GL_CODE_L.push(temp);
                        }
                    }
                });
                getParamTable("MB_ACCOUNTING_STATUS").then(function (response) {
                    let accountingStatus = response.data.data.columnInfo;
                    for(let i=0; i<accountingStatus.length; i++){
                        let temp = {}
                        temp["key"] = accountingStatus[i].ACCOUNTING_STATUS;
                        temp["value"] = accountingStatus[i].ACCOUNTING_STATUS_DESC;
                        that.ACCOUNTING_STATUS.push(temp);
                    }
                    let all = {}
                    all["key"] = "ALL";
                    all["value"] = "全部";
                    that.ACCOUNTING_STATUS.push(all);

                });
            },
            submit () {
                if(this.option == 'add'){
                    let dataSource=this.accountingInfos
                    let selected=this.selected;
                    selected.prodType=this.prodType
                    dataSource.push(selected)
                }
                this.dialog=false;
            },
            onDelete () {
                let dataSource=this.accountingInfos
                removeByValue(dataSource,this.selected)
            },
            onAdd () {
                this.option='add';
                this.selected={};
                this.dialog=true;
                this.disabledFlag=true
            },
            onEdit () {
                this.option='edit';
                this.dialog=true;
                this.disabledFlag = true;
            },
            customRow (record) {
                return {
                    on: {
                        click: this.clickRow.bind(this, record)
                    }
                }
            },
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
                this.selected=record;
            },

            editItem (item) {
                this.editedIndex = this.projects.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
                this.close()

            },
            initRefDate() {
                this.accountingStatus = this.refData[2].paraDataRb.accountingStatus;
                //暂时不区分科目代码
                this.glCodeL = this.refData[2].paraDataRb.glCode;
                this.glCodeIntE = this.refData[2].paraDataRb.glCode;
                this.glCodeIntPay = this.refData[2].paraDataRb.glCode;
            },
            deleteItem (item) {
                const index = this.projects.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },
            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
            },
            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.projects[this.editedIndex], this.editedItem)
                } else {
                    let flag = 0
                    for(let i = 0; i<this.prodAccountingInfo.length; i++){
                        if(this.editedItem.accountingStatus === "" || this.editedItem.accountingStatus === undefined){
                            toast.info("主键accountingStatus[核算状态]不能为空!");
                            flag = 1
                            break
                        }else if(this.prodAccountingInfo[i].prodType === this.editedItem.prodType && this.prodAccountingInfo[i].accountingStatus === this.editedItem.accountingStatus){
                            toast.info("主键accountingStatus[核算状态:"+this.editedItem.accountingStatus+"]不能重复!");
                            flag = 1
                            break
                        }
                    }
                    if(flag === 0){
                        this.prodAccountingInfo.push(this.editedItem)
                        this.close()
                    }
                }
            },
            getSelect(value){
                this.editedItem = []
                this.editedItem = value
            },
            addClick() {
                this.initRefDate()
                this.editedItem = []
                //新增产品类型默认&&不允许修改
                this.editedItem.prodType = this.prodType
                this.modFlag = false
                this.addFlag = true
            },
            modClick() {
                this.initRefDate()
                this.addFlag = false
                this.modFlag = true
            },
            saveClick() {
                if(this.addFlag){
                    this.save()
                }else if(this.modFlag){
                    this.editItem()
                }
            }
        }
    };
</script>
<style>
    .bthStyle {
        color: #00b0ff;
        width: 120px;
        margin-top: 30px;
    }
    .closeClass{
        color: white;
        margin-top: -2%;
    }
</style>
