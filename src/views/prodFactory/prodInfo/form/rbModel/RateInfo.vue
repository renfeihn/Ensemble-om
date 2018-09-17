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
                        <td class="text-xs-center">{{ props.item.eventType }}</td>
                        <td class="text-xs-center">{{ props.item.intClass }}</td>
                        <td class="text-xs-center">{{ props.item.rateCode }}</td>
                        <td class="text-xs-center">{{ props.item.rateCodeDetail }}</td>
                        <td class="text-xs-center">{{ props.item.intWay }}</td>
                        <td class="text-xs-center">{{ props.item.rateAmtCode }}</td>
                        <td class="text-xs-center">{{ props.item.intAmtCode }}</td>
                        <td class="text-xs-center">{{ props.item.monthBasic }}</td>
                        <td class="text-xs-center">{{ props.item.minRate }}</td>
                        <td class="text-xs-center">{{ props.item.maxRate }}</td>
                        <td class="text-xs-center">{{ props.item.rateStartMethod }}</td>
                        <td class="text-xs-center">{{ props.item.rateChangePeriod }}</td>
                        <td class="text-xs-center">{{ props.item.nextRateDay }}</td>
                        <td class="text-xs-center">{{ props.item.calDayFlag }}</td>
                        <td class="text-xs-center">{{ props.item.calDayMethod }}</td>
                        <td class="text-xs-center">{{ props.item.taxType }}</td>
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
export default {
    data () {
        return {
            selected: [],
            headers: [
                {text: '事件类型', value: 'eventType', align: 'center', width: 'xs1'},
                {text: '利息分类', value: 'intClass', align: 'center', width: 'xs1'},
                {text: '利率代码', value: 'rateCode', align: 'center', width: 'xs1'},
                {text: '利率代码详细', value: 'rateCodeDetail', align: 'center', width: 'xs1'},
                {text: '计息方式', value: 'intWay', align: 'center', width: 'xs1'},
                {text: '利率计算金额编码', value: 'rateAmtCode', align: 'center', width: 'xs1'},
                {text: '利息计算金额编码', value: 'intAmtCode', align: 'center', width: 'xs1'},
                {text: '月基准', value: 'monthBasic', align: 'center', width: 'xs1'},
                {text: '最小利率', value: 'minRate', align: 'center', width: 'xs1'},
                {text: '最大利率', value: 'maxRate', align: 'center', width: 'xs1'},
                {text: '利率启用方式', value: 'rateStartMethod', align: 'center', width: 'xs1'},
                {text: '利率变更周期', value: 'rateChangePeriod', align: 'center', width: 'xs1'},
                {text: '下一利率变更日', value: 'nextRateDay', align: 'center', width: 'xs1'},
                {text: '靠档标志', value: 'calDayFlag', align: 'center', width: 'xs1'},
                {text: '靠档天数计算方式', value: 'calDayMethod', align: 'center', width: 'xs1'},
                {text: '税率类型', value: 'taxType', align: 'center', width: 'xs1'}
            ],
            projects: [{
                eventType: '',
                intClass: '',
                rateCode: '',
                rateCodeDetail: '',
                intWay: '',
                rateAmtCode: '',
                intAmtCode: '',
                monthBasic: '',
                minRate: '',
                maxRate: '',
                rateStartMethod: '',
                rateChangePeriod: '',
                nextRateDay: '',
                calDayFlag: '',
                calDayMethod: '',
                taxType: ''
            }]
        };
    },
    mounted: function() {
        this.queryDespositProdData()
    },
    methods: {
        queryDespositProdData() {
            getRateInfo().then(response => {
                this.projects = response.data.rateInfo
            })
        }
    }
};
</script>
