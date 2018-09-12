<template>
    <v-card>
        <v-toolbar card dense color="transparent">
            <v-btn color="success" depressed="">新增</v-btn>
            <v-btn color="success" depressed="">修改</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>more_vert</v-icon>
            </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
            <template>
                <v-data-table :headers="headers" :items="projects" hide-actions class="elevation-0">
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-left">{{ props.item.chargeType }}</td>
                        <td class="text-xs-left">{{ props.item.chargeFreq }}</td>
                        <td class="text-xs-left">{{ props.item.chargeDate }}</td>
                        <td class="text-xs-left">{{ props.item.chargeDealMethod }}</td>
                        <td class="text-xs-left">{{ props.item.conDedFlag }}</td>
                        <td class="text-xs-left">{{ props.item.conDedNum }}</td>
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
    data () {
        return {
            headers: [
                {text: '批量收费类型', align: 'left', value: 'chargeType'},
                {text: '收费频率', value: 'chargeFreq'},
                {text: '收费日期', value: 'chargeDate'},
                {text: '收费处理方式', value: 'chargeDealMethod' },
                {text: '持续扣款标识', value: 'conDedFlag'},
                {text: '持续扣款次数', value: 'conDedNum'}
            ],
            projects: [{
                chargeType: '',
                chargeFreq: '',
                chargeDate: '',
                chargeDealMethod: '',
                conDedFlag: '',
                conDedNum: ''
            }]
        };
    },
    computed: {
        pages () {
            if (this.pagination.rowsPerPage == null ||
                this.pagination.totalItems == null
            ) return 0
            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        }
    },
    mounted: function() {
        this.queryDespositProdData()
    },
    methods: {
        queryDespositProdData() {
            getChargeDefine().then(response => {
                this.projects = response.data.chargeDefine
            })
        }
    }
};
</script>
