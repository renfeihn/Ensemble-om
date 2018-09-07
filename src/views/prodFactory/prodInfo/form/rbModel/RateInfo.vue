<template>
    <v-card>
        <v-toolbar card dense color="transparent">
            <v-flex xs12 sm2 d-flex>
                <v-subheader class="primary--text subheading justify-start" >是否使用固定利率*</v-subheader>
            </v-flex>
            <v-flex xs12 sm4>
                <v-select class="primary--text mx-2" :items="draRange" v-model="busimodelData" item-text="value" item-value="key" single-line hide-details return-object></v-select>
            </v-flex>
        </v-toolbar>
        <v-card-text class="pa-0">
            <div>
                <v-data-table
                :headers="headers"
                :items="projects"
                class="elevation-1"
                hide-actions
                >
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-center">{{ props.item.eventType | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.intClass | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.intType | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.intTypeDesc | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.intCalcBal | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.rateAmtId | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.intAmtId | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.monthBasis | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.minRate}}</td>
                        <td class="text-xs-center">{{ props.item.maxRate}}</td>
                        <td class="text-xs-center">{{ props.item.intApplType | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.rollFreq | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.rollDay}}</td>
                        <td class="text-xs-center">{{ props.item.intRateInd | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.intDaysType | getColumnDesc}}</td>
                        <td class="text-xs-center">{{ props.item.taxType | getColumnDesc}}</td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>
                </v-data-table>
            </div>
        </v-card-text>
    </v-card>
</template>
<script>
import {getRateInfo} from '@/api/table';
import {getColumnDesc} from '@/utils/columnDesc'

export default {
    filters: {
        getDescByKey: function (key) {
            return getColumnDesc(key)
        }
    },
    props: ["prodData"],
    data () {
        return {
            selected: [],
            headers: [
                {text: '事件类型', value: 'eventType', align: 'center', width: 'xs1'},
                {text: '利息分类', value: 'intClass', align: 'center', width: 'xs1'},
                {text: '利率代码', value: 'intType', align: 'center', width: 'xs1'},
                {text: '利率代码详细', value: 'intTypeDesc', align: 'center', width: 'xs1'},
                {text: '计息方式', value: 'intCalcBal', align: 'center', width: 'xs1'},
                {text: '利率计算金额编码', value: 'rateAmtId', align: 'center', width: 'xs1'},
                {text: '利息计算金额编码', value: 'intAmtId', align: 'center', width: 'xs1'},
                {text: '月基准', value: 'monthBasis', align: 'center', width: 'xs1'},
                {text: '最小利率', value: 'minRate', align: 'center', width: 'xs1'},
                {text: '最大利率', value: 'maxRate', align: 'center', width: 'xs1'},
                {text: '利率启用方式', value: 'intApplType', align: 'center', width: 'xs1'},
                {text: '利率变更周期', value: 'rollFreq', align: 'center', width: 'xs1'},
                {text: '下一利率变更日', value: 'rollDay', align: 'center', width: 'xs1'},
                {text: '靠档标志', value: 'intRateInd', align: 'center', width: 'xs1'},
                {text: '靠档天数计算方式', value: 'intDaysType', align: 'center', width: 'xs1'},
                {text: '税率类型', value: 'taxType', align: 'center', width: 'xs1'}
            ],
            projects: [{
                eventType: '',
                intClass: '',
                intType: '',
                intTypeDesc: '',
                intCalcBal: '',
                rateAmtId: '',
                intAmtId: '',
                monthBasis: '',
                minRate: '',
                maxRate: '',
                intApplType: '',
                rollFreq: '',
                rollDay: '',
                intRateInd: '',
                intDaysType: '',
                taxType: ''
            }]
        };
    },
    watch: {
        prodData (val) {
            this.getChargeDefinesInfo(val)
        }
    },
    mounted: function() {
        this.queryDespositProdData()
    },
    methods: {
        queryDespositProdData() {
            getRateInfo().then(response => {
                this.projects = response.data.rateInfo
            })
        },
        getChargeDefinesInfo(val) {
            //初始化产品对应的信息
            this.projects = val.irlProdInt
        },
    }
};
</script>
