<template>
  <v-card>
    <v-toolbar card color="white">
      <v-text-field
              flat
              solo
              prepend-icon="search"
              placeholder="Type something"
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
      ></v-text-field>
      <v-btn color="info" v-on:click="sendProdType">加入对比</v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-data-table
              :headers="complex.headers"
              :search="search"
              :items="items"
              :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
              class="elevation-1"
              item-key="value"
              select-all
              v-model="complex.selected"
      >
        <template slot="items" slot-scope="props">
          <td>
            <v-checkbox
                    primary
                    hide-details
                    v-model="props.selected"
            ></v-checkbox>
          </td>
          <td>{{ props.item.value }}</td>
          <td>{{ props.item.label }}</td>
          <td>{{ props.item.status }}</td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
    import {
        getProdType
    } from '@/api/prod';
    import prodListCmb from '../tableFlow/prodListCmb'
    export default {
        components: {
            prodListCmb
        },
        data: () => ({
            items: [],
            search: '',
            prodListMeta: [
                {value: 'RB10032',label: '大额存单'},
                {value: 'RB10036',label: '个人活期存款'},
                {value: 'RB10035',label: '个人外币活期存款'}
            ],
            prodListHot: [
                {value: 'RB10032',label: '单位活期存款'},
                {value: 'RB10036',label: '单位定期存款'},
                {value: 'RB10035',label: '个人多币种活期存款'},
                {value: 'RB10035',label: '个人定期存款'},
                {value: 'RB10035',label: '大额存单'}
            ],
            users: [
                {
                    jobTitle: 'RB10032',
                    name: '大额存单',
                    avatar: {
                        src: '/static/bg/33.jpg',
                        size: '36'
                    },
                },
                {
                    jobTitle: 'RB10036',
                    name: '个人活期存款',
                    color: 'pink',
                    dark: true,
                    avatar: {
                        src: '/static/bg/33.jpg',
                        size: '36'
                    },
                },
                {
                    jobTitle: 'RB10035',
                    name: '个人多币种活期存款',
                    color: 'teal',
                    dark: true,
                    avatar: {
                        src: '/static/bg/33.jpg',
                        size: '36'
                    },
                },
                {
                    jobTitle: 'RB10038',
                    name: '个人定期存款',
                    dark: true,
                    cardBgImage: '/static/bg/15.jpg',
                    avatar: {
                        src: '/static/bg/33.jpg',
                        size: '36'
                    },
                },

            ],
            complex: {
                selected: [],
                headers: [
                    {
                        text: '产品代码',
                        value: 'value'
                    },
                    {
                        text: '产品类型',
                        value: 'label'
                    },
                    {
                        text: '产品状态',
                        value: 'status'
                    }
                ],
            },
            basic: {
                headers: [
                    {
                        text: 'Dessert (100g serving)',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    { text: 'Calories', value: 'calories' },
                    { text: 'Fat (g)', value: 'fat' },
                    { text: 'Carbs (g)', value: 'carbs' },
                    { text: 'Protein (g)', value: 'protein' },
                    { text: 'Iron (%)', value: 'iron' }
                ],
                items: []
            }
        }),
        mounted: function() {
            this.queryDespositProdData()
        },
        methods: {
            sendProdType(){
                let selected=[];
                for(const item in this.complex.selected){
                    selected.push(this.complex.selected[item].value)
                }
                this.$emit('listenToSearch',selected)
            },
            handleClick: (e) => {
                console.log(e);
            },
            queryDespositProdData() {
                getProdType().then(response => {
                    this.items= response.data.prodTypeForm
                })
            }
        }
    };
</script>
