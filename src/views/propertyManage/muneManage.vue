<template>
    <v-card>
        <v-toolbar color="indigo lighten-2" dark scroll-off-screen scroll-target="#scrolling-techniques" flat>
            <v-toolbar-title>菜单管理</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn small color="blue" dark fab>
                <v-icon dark>remove</v-icon>
            </v-btn>
            <v-btn color="red" fab small dark>
                <v-icon>edit</v-icon>
            </v-btn>
            <v-btn small color="blue" dark fab>
                <v-icon dark>add</v-icon>
            </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-data-table :headers="headers" :items="desserts" :rows-per-page-items="[10,25,50,{text:'All','value':-1}]" class="elevation-1 px-0" item-key="code" select-all light v-model="selected">
            <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
                    <td>
                        <v-checkbox
                                primary
                                hide-details
                                v-model="props.selected"
                        ></v-checkbox>
                    </td>
                    <td>{{ props.item.prodType }}</td>
                    <td class="text-xs-left">{{ props.item.accountingStatus }}</td>
                    <td class="text-xs-left">{{ props.item.subjectCode }}</td>
                    <td class="text-xs-left">{{ props.item.rateCode }}</td>
                    <td class="text-xs-left">{{ props.item.DSubjectCode }}</td>
                </tr>
            </template>
            <!--<template slot="items" slot-scope="props">-->
                 <!--<td>{{ props.item.prodType }}</td>-->
                 <!--<td class="text-xs-left">{{ props.item.accountingStatus }}</td>-->
                 <!--<td class="text-xs-left">{{ props.item.subjectCode }}</td>-->
                 <!--<td class="text-xs-left">{{ props.item.rateCode }}</td>-->
                 <!--<td class="text-xs-left">{{ props.item.DSubjectCode }}</td>-->
             <!--</template>-->
        </v-data-table>
    </v-card>
</template>
<script>
    import {getList} from '@/api/table';
    export default {
        data () {
            return {
                headers: [
                    {
                        text: '序号',
                        align: 'left',
                        value: 'seqNo'
                    },
                    {text: '菜单编号', value: 'menuId'},
                    {text: '菜单名称', value: 'menuName'},
                    {text: '上级菜单编号', value: 'parentMenuId' },
                    {text: '菜单URL', value: 'menuUrl'},
                    {text: '菜单状态', value: 'muneStatus'}
                ],
                projects: [
                    {
                        prodType: '',
                        accountingStatus: '',
                        subjectCode: '',
                        rateCode: '',
                        DSubjectCode: ''
                    }
                ]
            };
        },
        mounted: function() {
            this.queryDespositProdData()
        },
        methods: {
            queryDespositProdData() {
                getList().then(response => {
                    this.projects = response.data.irlAccounting
                })
            }
        }
    };
</script>
