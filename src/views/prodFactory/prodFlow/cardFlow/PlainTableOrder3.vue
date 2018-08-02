<template>
    <v-data-table
            :headers="headers"
            :items="items"
            hide-actions
            class="elevation-0 table-striped"
    >
        <template slot="items" slot-scope="props">
            <td class="text-xs-left" @click="prodAction(props.item.value)">{{ props.item.value }}</td>
            <td class="text-xs-left">{{ props.item.label }}</td>
        </template>
    </v-data-table>
</template>

<script>
    getDepositProdListTow
    import {
        getDepositProdListTow
    } from '@/api/prod'
    export default {
        data () {
            return {
                headers: [

                    { text: 'Product', value: 'deadline' },
                    { text: 'Decs', value: 'progress' }

                ],
                items: [{
                    value: 'RB100',
                    label: '活期存款',
                    status: 'sent'
                }],
                colors: {
                    processing: 'blue',
                    sent: 'red',
                    delivered: 'green'
                }
            };
        },
        computed: {
            randomColor () {
                let item = Math.floor(Math.random() * this.colors.length);
                return this.colors[item];
            },
        },
        methods: {
            getColorByStatus (status) {
                return this.colors['processing'];
            },
            queryDespositProdData() {
                getDepositProdListTow().then(response => {
                    this.items = response.data.prodListTwo
                })
            },
            prodAction (prodType) {
                this.$router.push({ name: 'prod/SerchList', params: {'prodType':prodType}})
            }
        },
        mounted: function() {
            this.queryDespositProdData()
        }
    };
</script>
