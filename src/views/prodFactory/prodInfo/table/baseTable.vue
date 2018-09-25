<template>
  <v-data-table
          :items="desserts"
          class="elevation-1"
          hide-actions
          hide-headers
          :headers="headers"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.calories }}</td>
      <td class="text-xs-right">{{ props.item.fat }}</td>
      <td class="text-xs-right">{{ props.item.carbs }}</td>
      <td class="text-xs-right">{{ props.item.protein }}</td>
      <td class="text-xs-right">{{ props.item.iron }}</td>
    </template>
  </v-data-table>
</template>
<script>
    export default {
        props: ["prodData"],
        data () {
            return {
                desserts: [
                    {
                        value: false,
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                        iron: '1%'
                    }
                ],
                headers: []
            }
        },
        watch: {
            prodData (val) {
                this.getChargeDefinesInfo(val)
            }
        },
        mounted: function() {

        },
        methods: {
            getChargeDefinesInfo(val) {
                //初始化产品对应的信息

            }
        }
    }
</script>