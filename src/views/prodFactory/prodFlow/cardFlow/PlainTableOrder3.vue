<template>
    <v-data-table
            :headers="headers"
            :items="items"
            hide-actions
            class="elevation-0 table-striped"
    >
        <template slot="items" slot-scope="props">
            <td class="text-xs-left" @click="prodAction(props.item.value)">{{ props.item.prodCode }}</td>
            <td class="text-xs-left">{{ props.item.prodDesc }}</td>
        </template>
    </v-data-table>
</template>

<script>
    import {
        getUserCollectProds
    } from '@/api/prod'
    export default {
        props: ['prodClass'],
        data () {
            return {
                prodClass: '',
                headers: [

                    { text: '产品代码', value: 'deadline' },
                    { text: '产品名称', value: 'progress' }
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
        mounted: function() {
            this.getUserCollectProds()
            console.log(this.prodClass)
        },
        methods: {
            getColorByStatus (status) {
                return this.colors['processing'];
            },
            getUserCollectProds() {
                getUserCollectProds().then(response => {
                    this.items = response.data.collectProdsForm
                })
            },
            prodAction (prodType) {
                this.$router.push({ name: 'prod/SerchList', params: {'prodType': prodType}})
            }
        }
    };
</script>