<template>
    <v-card>
        <v-card-text>
            <v-form v-model="valid" v-for="(keyData ,key ,index) in editSelected" v-bind:key="key">
                <v-layout row wrap>
                    <v-flex md12 lg12>
                        <dc-text-field-table
                                v-if="keyData.columnType=='input'"
                                v-model="keyData.value"
                                :counter="10"
                                :isKey="keyData.key"
                                :lengths="keyData.lengths"
                                :dataIndex="keyData.dataIndex"
                                :childPd="childPd"
                                :isNotNull="keyData.isNull"
                                :label="keyData.columnDesc"
                                :labelDesc="keyData.columnDesc"
                                required
                                v-on:changeNum="changeNumChild"
                        ></dc-text-field-table>
                        <dc-text-field-table
                                v-if="keyData.columnType == 'select' && keyData.valueScore.tableName == tableName"
                                v-model="keyData.value"
                                :counter="10"
                                :isKey="keyData.key"
                                :lengths="keyData.lengths"
                                :dataIndex="keyData.dataIndex"
                                :childPd="childPd"
                                :isNotNull="keyData.isNull"
                                :label="keyData.columnDesc"
                                :labelDesc="keyData.columnDesc"
                                required
                                v-on:changeNum="changeNumChild"
                        ></dc-text-field-table>
                        <dc-multiselect-table
                                v-if="keyData.columnType == 'select' && keyData.valueScore.tableName != tableName"
                                v-on:changeNum="changeNumChild"
                                :isKey="keyData.key"
                                :childPd="childPd"
                                :isNotNull="keyData.isNull"
                                :labelDesc="keyData.columnDesc"
                                v-model="keyData.value"
                                :options="keyData.valueScore"
                                class="dcMulti"
                                :isMultiSelect=false
                        ></dc-multiselect-table>
                        <dc-switch v-if="keyData.columnType == 'switch'" :labelDesc="keyData.columnDesc"
                                   v-model="keyData.value"></dc-switch>
                        <dc-date class="dcDate" :showEdit="showEdit" v-if="keyData.columnType == 'date'"
                                 :disablePower="disablePower" :labelDesc="keyData.columnDesc" v-model="keyData.value"></dc-date>

                    </v-flex>
                </v-layout>
            </v-form>
            <v-spacer></v-spacer>
            <v-flex mx-5>
                <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="submit"
                >
                    确认
                </v-btn>
                <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="close"
                >
                    取消
                </v-btn>
            </v-flex>
        </v-card-text>
    </v-card>
</template>
<script>
    import columnInfo from '@/views/prodFactory/prodInfo/columnInfo'
    import {getPkList} from '@/views/prodFactory/prodInfo/pkListColumnInfo'
    import DcMultiselectTable from '@/components/widgets/DcMultiselectTable'
    import DcSwitch from "@/components/widgets/DcSwitch";
    import DcTreeSelect from "@/components/widgets/DcTreeSelect";
    import DcTextFieldTable from "@/components/widgets/DcTextFieldTable";
    import DcDate from '@/components/widgets/DcDate'
    export default {
        components: {DcMultiselectTable, DcSwitch, DcTreeSelect,DcDate,DcTextFieldTable},
        props: {
            childPd: String,
            selected: Object,
            columns: Object,
            tableName: String
        },
        data() {
            return {
                num: "",
                inputIsNull: false,
                inputNotNull: false,
                editSelected: {},
                tableName: ""
            }
        },
        watch: {
            selected: {
                handler(selected) {
                    this.selectedAction();
                }
            },
            num: {
                handler(newData) {
                    this.changeNumFather()
                }
            }
        },
        mounted: function() {
            this.selectedAction()

        },
        methods: {
            changeNumChild(num) {
                this.num = num
            },
            changeNumFather(){
                this.$emit('changeNum',this.num,this.editSelected)
            },
            selectedAction() {
                const selected=this._props.selected;
                const columns=this._props.columns;
                this.tableName = this._props.tableName;
                let locSelected={}
                if(columns!= undefined){
                    for(const index in columns){
                        const key=columns[index].code
                        let value=selected[key]
                        if(value==undefined){
                            value=''
                        }
                        const dataSource = columnInfo;
                        let column = dataSource[key];
                        if (column != undefined && column != 'undefined'){
                            column['value']=value
                            column['key']=columns[index].key
                            column['isNull']=columns[index].isNull
                            column['lengths']=columns[index].lengths
                            column['dataIndex']=columns[index].dataIndex
                            locSelected[key]=column;
                        }
                    }
                    this.editSelected=locSelected;
                }
            },
            submit() {
                this.$emit("editAction",'submit',this.editSelected)
            },
            close() {
                this.$emit("editAction",'close')
            }
        }
    }
</script>