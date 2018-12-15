<template>
    <v-data-table :headers="complex.headers" :search="search" :items="items" :rows-per-page-items="[10,25,50,{text:'All','value':-1}]" class="elevation-1" item-key="value" v-model="complex.selected">
        <template slot="items" slot-scope="props" >
            <tr :active="props.selected" @click="props.selected = !props.selected">
                <td>
                    <v-checkbox v-model="selected" value="A"></v-checkbox>
                </td>
                <td>{{ props.item.prodType }}</td>
                <td>{{ props.item.prodDesc }}</td>
                <td>{{ props.item.prodRange === "B"?"基础产品":"可售产品" }}</td>
                <td>{{ props.item.baseProdType }}</td>
                <td>{{ props.item.status === "A"?"有效":"封存"}}</td>
                <td>
                    <v-btn depressed outline icon fab dark color="primary" small @click="handleClick(props.item)">
                        <v-icon>edit</v-icon>
                    </v-btn>
                </td>
            </tr>
        </template>
    </v-data-table>
</template>

<script>
    import {
        getProdType
    } from '@/api/prod';
    import {
        getDepositDtl
    } from '@/api/prod';
    export default {
        props: {
            items: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                //items: [],
                prodclass: '',
                search: '',
                complex: {
                    selected: [],
                    items: [],
                    headers: [
                         {
                             text: '选择',
                             value: 'check'
                         },
                        {
                            text: '产品代码',
                            value: 'prodType'
                        },
                        {
                            text: '产品描述',
                            value: 'prodDesc'
                        },
                        {
                            text: '产品属性',
                            value: 'prodGroup'
                        },
                        {
                            text: '基础产品',
                            value: 'baseProdType'
                        },
                        {
                            text: '产品状态',
                            value: 'status'
                        },
                        {
                            text: 'Action',
                            value: ''
                        },
                    ]
                }
            };
        },
        methods: {
            addCompare() {
                let selected = [];
                for (const item in this.complex.selected) {
                    selected.push(this.complex.selected[item].value)
                }
                this.$router.push({
                    name: 'diffList',
                    params: {
                        'prodCodeList': selected
                    }
                })
            },
            handleClick(val) {
                if(val.prodClass === "RB400") {
                    this.$router.push({
                        name: 'prod/rbPrivateProd',
                        params: {'prodClassCmp': val.prodClass, 'prodType': val.prodType}
                    })
                }else if(val.prodClass === "RB100") {
                    this.$router.push({
                        name: 'prod/rbPrivateProds',
                        params: {'prodClassCmp': val.prodClass, 'prodType': val.prodType}
                    })
                }
            }
        }
    };
</script>
