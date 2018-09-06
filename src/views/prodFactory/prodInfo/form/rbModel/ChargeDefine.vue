<template>
    <v-card>
        <v-toolbar card dense color="transparent">
            <v-dialog v-model="dialog" max-width="900px">
                <v-btn slot="activator" color="success" dark class="mb-2" @click="addClick">新增</v-btn>
                <v-btn slot="activator" color="success" dark class="mb-2" @click="modClick">修改</v-btn>
                <v-card>
                    <!--<v-card-title><span class="headline">收费定义</span></v-card-title>-->
                    <v-card-text>
                        <v-flex xs12 md12 lg12>
                             <div slot="widget-content">
                                 <v-container fluid pt-1>
                                     <v-layout row wrap>
                                         <v-flex>
                                             <v-subheader class="primary--text subheading">批量收费类型*</v-subheader>
                                         </v-flex>
                                         <v-flex md4 lg4>
                                             <v-text-field class="primary--text mx-1" label="批量收费类型" name="title" v-model="editedItem.feeType" single-line hide-details>
                                             </v-text-field>
                                         </v-flex>
                                         <v-flex xs12 md2 lg2>
                                             <v-subheader class="primary--text subheading">收费频率*</v-subheader>
                                         </v-flex>
                                         <v-flex md4 lg4>
                                             <v-text-field class="primary--text mx-2" label="收费频率" name="title" v-model="editedItem.chargePeriodFreq" single-line hide-details/>
                                         </v-flex>
                                     </v-layout>
                                     <v-layout row wrap>
                                         <v-flex xs12 md2 lg2>
                                             <v-subheader class="primary--text subheading">收费日期*</v-subheader>
                                         </v-flex>
                                         <v-flex md4 lg4>
                                             <v-text-field class="primary--text mx-1" label="收费日期" name="title" v-model="editedItem.chargeDay" single-line hide-details>
                                             </v-text-field>
                                         </v-flex>
                                         <v-flex xs12 md2 lg2>
                                             <v-subheader class="primary--text subheading">收费处理方式*</v-subheader>
                                         </v-flex>
                                         <v-flex md4 lg4>
                                             <v-text-field class="primary--text mx-2" label="收费处理方式" name="title" v-model="editedItem.chargeDealMethod" single-line hide-details/>
                                         </v-flex>
                                     </v-layout>
                                     <v-layout row wrap>
                                         <v-flex xs12 md2 lg2>
                                             <v-subheader class="primary--text subheading">持续扣款标识*</v-subheader>
                                         </v-flex>
                                         <v-flex md4 lg4>
                                             <v-text-field class="primary--text mx-1" label="持续扣款标识" name="title" v-model="editedItem.conDeductFlag" single-line hide-details>
                                             </v-text-field>
                                         </v-flex>
                                         <v-flex xs12 md2 lg2>
                                             <v-subheader class="primary--text subheading">持续扣款次数*</v-subheader>
                                         </v-flex>
                                         <v-flex md4 lg4>
                                             <v-text-field class="primary--text mx-2" label="持续扣款次数" name="title" v-model="editedItem.conDeductTimes" single-line hide-details/>
                                         </v-flex>
                                     </v-layout>
                                 </v-container>
                             </div>
                         </v-flex>
                        <v-layout row wrap>
                            <v-flex xs12 md2 lg2>
                            </v-flex>
                            <v-btn color="success" depressed="" @click="close"><v-icon >assignment_turned_in</v-icon>取消</v-btn>
                            <v-flex xs12 md3 lg3>
                            </v-flex>
                            <v-btn color="success" depressed="" @click="saveClick"><v-icon >assignment_turned_in</v-icon>保存</v-btn>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
            <template>
                <v-data-table :headers="headers" :items="chargeDefinesInfo" hide-actions class="elevation-0">
                    <template slot="items" slot-scope="props">
                        <tr @click="getChargeDefine(props.item)" highlight-row>
                        <td class="text-xs-left">{{ props.item.feeType }}</td>
                        <td class="text-xs-left">{{ props.item.chargePeriodFreq }}</td>
                        <td class="text-xs-left">{{ props.item.chargeDay }}</td>
                        <td class="text-xs-left">{{ props.item.chargeDealMethod }}</td>
                        <td class="text-xs-left">{{ props.item.conDeductFlag }}</td>
                        <td class="text-xs-left">{{ props.item.conDeductTimes }}</td>
                        </tr>
                    </template>
                </v-data-table>
            </template>
            <v-divider></v-divider>
        </v-card-text>
    </v-card>
</template>
<script>
import {getChargeDefine} from '@/api/table';
export default {
    props: ["prodData"],
    data () {
        return {
            dialog: false,
            addFlag: false,
            modFlag: false,
            prodType: '',
            headers: [
                {text: '批量收费类型', align: 'left', value: 'feeType'},
                {text: '收费频率', value: 'chargePeriodFreq'},
                {text: '收费日期', value: 'chargeDay'},
                {text: '收费处理方式', value: 'chargeDealMethod' },
                {text: '持续扣款标识', value: 'conDeductFlag'},
                {text: '持续扣款次数', value: 'conDeductTimes'}
            ],
            editedItem: {
                prodType: '',
                feeType: '',
                chargePeriodFreq: '',
                chargeDay: '',
                chargeDealMethod: '',
                conDeductFlag: '',
                conDeductTimes: ''
            },
            defaultItem: {
                feeType: '',
                chargePeriodFreq: '',
                chargeDay: '',
                chargeDealMethod: '',
                conDeductFlag: '',
                conDeductTimes: ''
            },
            projects: [{
                feeType: '',
                chargePeriodFreq: '',
                chargeDay: '',
                chargeDealMethod: '',
                conDeductFlag: '',
                conDeductTimes: ''
            }],
            chargeDefinesInfo: []
        };
    },
    computed: {

    },
    watch: {
        prodData (val) {
            this.getChargeDefinesInfo(val)
        }
    },
    mounted: function() {
        this.queryDespositProdData(this.prodData)
    },
    methods: {
        getChargeDefinesInfo(val) {
            //初始化产品对应的信息
            this.chargeDefinesInfo = []
//            for(let i=0; i<val.mbProdCharge.length; i++){
//
//                this.chargeDefinesInfo.push(val.mbProdCharge[i])
//            }
            this.chargeDefinesInfo = val.mbProdCharge
            this.prodType = val.prodType.prodType
        },
        editItem (item) {
            this.editedIndex = this.projects.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
            this.close()

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
                //新增数据，产品类型默认
                this.editedItem.prodType = this.prodType
                this.chargeDefinesInfo.push(this.editedItem)
            }
            this.close()
        },
        getChargeDefine(value){
            this.editedItem = []
            this.editedItem = value
        },
        addClick() {
            this.modFlag = false
            this.addFlag = true
        },
        modClick() {
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
