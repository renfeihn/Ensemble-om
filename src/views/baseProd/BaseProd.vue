<template>
    <v-container fluid pr-5 pt-0>
        <v-flex xs12 md12 lg12>
            <div slot="widget-content">
                <v-container fluid pt-1>
                    <v-layout row wrap>
                        <v-layout row wrap v-if="prodType!= undefined ">
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">产品代码*</v-subheader>
                            </v-flex>
                            <v-flex md3 lg3>
                                <v-text-field class="primary--text mx-1" label="产品代码" name="title" v-model="prodType.prodType" single-line hide-details disabled></v-text-field>
                            </v-flex>
                            <v-flex md1 lg1>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">产品描述*</v-subheader>
                            </v-flex>
                            <v-flex md3 lg3>
                                <v-text-field class="primary--text " label="产品描述" name="title" v-model="prodType.prodDesc" single-line hide-details disabled/>
                            </v-flex>
                            <v-flex md1 lg1>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">业务模块*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect :options="sourceModuleOption" :isMultiSelect="false" v-model="prodDefines.SOURCE_MODULE.attrValue" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">产品分类*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect :options="prodClassOption" :isMultiSelect="false" v-model="prodType.prodClass" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">产品属性*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect :options="prodRangeOption" :isMultiSelect="false" v-model="prodType.prodRange" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">组合产品*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-switch v-model="prodType.prodGroup"></dc-switch>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">产品状态*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect :options="statusOption" :isMultiSelect="false" v-model="prodType.status" class="dcMulti"></dc-multiselect>
                            </v-flex>
                            <v-flex xs12 md2 lg2>
                                <v-subheader class="primary--text subheading">基础产品*</v-subheader>
                            </v-flex>
                            <v-flex md4 lg4>
                                <dc-multiselect :options="baseProdTypeOption" :isMultiSelect="false" v-model="prodType.baseProdType" class="dcMulti"></dc-multiselect>
                            </v-flex>
                        </v-layout>
                        <v-flex v-for="(keyData ,key ,index) in dataSource" v-bind:key="key" lg6>
                            <v-layout row wrap>
                                <v-flex xs12 md4 lg4 v-if="keyData.columnDesc != undefined">
                                    <v-subheader class="primary--text subheading">{{keyData.columnDesc}}*</v-subheader>
                                </v-flex>
                                <v-flex md8 lg4 v-if="keyData.columnType == 'tree'">
                                </v-flex>
                                <v-flex md12 lg12 v-if="keyData.columnType == 'tree'">
                                    <v-flex md11 ml-5 class="auto">
                                        <dc-tree-select v-if="keyData.columnType == 'tree'" v-model="prodDefines[keyData.key].attrValue"
                                                        :multiple="true" :options="keyData.valueScore"></dc-tree-select>
                                    </v-flex>
                                </v-flex>
                                <v-flex md8 lg8 v-else>
                                    <v-text-field v-if="keyData.columnType == 'input'"
                                                  class="primary&#45;&#45;text mx-1" :label="keyData.columnDesc"
                                                  name="title" v-model="prodDefines[keyData.key].attrValue" single-line
                                                  hide-details></v-text-field>
                                    <dc-multiselect v-if="keyData.columnType == 'select'" v-model="prodDefines[keyData.key].attrValue"
                                                    :options="keyData.valueScore" class="dcMulti" :isMultiSelect=keyData.isMultiSelect></dc-multiselect>
                                    <dc-switch v-if="keyData.columnType == 'switch'"
                                               v-model="prodDefines[keyData.key].attrValue"></dc-switch>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-container>
            </div>
        </v-flex>
    </v-container>
</template>
<script>
    import columnInfo from './columnInfo'
    import DcMultiselect from '@/components/widgets/DcMultiselect'
    import DcSwitch from "@/components/widgets/DcSwitch";
    import DcTreeSelect from "@/components/widgets/DcTreeSelect";
    export default {
        components: {columnInfo, DcMultiselect, DcSwitch, DcTreeSelect},
        props: ["prodType","prodDefines","tags"],
        data: () => ({
            dataSource: {},
            valueData: [],
            sourceModuleOption: [
                {
                    "key": "RB",
                    "value": "RB-存款类"
                },
                {
                    "key": "CL",
                    "value": "CL-贷款类"
                }
            ],
            prodClassOption: [
                {
                    "key": "RB",
                    "value": "RB-存款类"
                },
                {
                    "key": "RB100",
                    "value": "RB100-个人存款组"
                },
                {
                    "key": "RB200",
                    "value": "RB200-对公存款组"
                },
                {
                    "key": "RB300",
                    "value": "RB300-同业存款组"
                },
                {
                    "key": "RBBASE",
                    "value": "RBBASE-存款基础产品组"
                }
            ],
            prodRangeOption: [
                {
                    "key": "S",
                    "value": "S-可售产品"
                },
                {
                    "key": "B",
                    "value": "B-基础产品"
                }
            ],
            statusOption: [
                {
                    "key": "A",
                    "value": "A-启用"
                },
                {
                    "key": "C",
                    "value": "C-废弃"
                }
            ],
            baseProdTypeOption: [
                {
                    "key": "RBA01",
                    "value": "RBA01-AIO基础产品"
                },
                {
                    "key": "RBDQ1",
                    "value": "RBDQ1-普通定期基础产品"
                },
                {
                    "key": "RBDQ2",
                    "value": "RBDQ2-定期一本通产品"
                },
                {
                    "key": "RBDQ3",
                    "value": "RBDQ3-定期联名产品"
                },
                {
                    "key": "RBHQ1",
                    "value": "RBHQ1-普通活期基础产品"
                }
            ]
        }),
        watch: {
            prodDefines: {
                handler(prodType) {
                    this.init(prodType);
                }
            }
        },
        methods: {
            init(prodData) {
                let columnList=[]
                //通过后台的产品有关信息查数据字典
                for(const index in prodData){
                    const dataSource=columnInfo;
                   let column=dataSource[index];
                   if(column!=undefined&&column!='undefined'&&this._props.tags==prodData[index].pageCode){
                       column['key']=index
                   columnList.push(column)
                   }
                }
                this.dataSource = columnList
            }
        }
    }
</script>
<style scoped>
    .dcMulti {
        margin-top: 10px;
    }

    .auto {
        margin-left: auto;
        margin-right: auto;
    }
</style>