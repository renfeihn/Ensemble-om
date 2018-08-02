<template>
<div>
  <v-card>
    <v-card-text class="pa-0">
      <v-switch
              v-model="ex11"
              label="隐藏相同项"
              color="success"
              value="success"
              hide-details
              class="prodDiffSwitch"
      ></v-switch>
      <v-btn fab dark small color="cyan" class="prodDiffButton" @click="addTd">
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-card-text>

  </v-card>
  <v-data-table
          :headers="headers"
          :items="items"
          :key="index"
          hide-actions
          class="elevation-0 table-striped"

  >
    <template slot="headerCell" slot-scope="props">
      <v-btn class="diffIdButton" color="red" v-if="props.header.text!=''"  dark @click="deleteTd(props)">移除
        <v-icon dark right>block</v-icon>
      </v-btn>
    </template>
    <template slot="items"  slot-scope="props" >
      <td class="text-xs-left diffTd" >{{ props.item }}</td>
      <td class="diffTd" v-if="diffProd[1].info.产品名称!=''">{{ diffProd[0].info.产品代码}}</td>
      <td class="diffTd" v-if="diffProd[1].info.产品名称!=''">{{diffProd[1].info.产品名称 }}</td>
    </template>
  </v-data-table>
</div>
</template>

<script>
    import {getDiffProd} from '@/api/prod';
    export default {
        data () {
            return {
                headers: [

                    { text: '', value: 'diffType' },
                    { text: '移除', value: 'prod1',   index:1,         sortable: false, },
                    { text: '移除', value: 'prod2' , index:2,           sortable: false,},

                ],
                items: [{
                    value: 'RB100',
                    label: '活期存款',
                    status: 'sent'
                }],
                diffProd: [{
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
            deleteTd (props){
                const index=props.header.index;
                this.headers.splice(index,1);
                var array=this.items;
                for(var item in array ){
                    array[item].prod1=''
                }
            },
            addTd (e,event) {
                console.log(e)
            },
            getColorByStatus (status) {
                return this.colors['processing'];
            },
            queryDespositProdData() {
                getDiffProd().then(response => {
                    this.items = response.data.diffType
                this.diffProd= response.data.prodDiff
                })
            }
        },
        mounted: function() {
            this.queryDespositProdData()
        }
    };
</script>
<style scoped>
  .diffTd{
    border-right-style: solid;border-right-width: 1px;border-color: rgba(40, 24, 31, 0.21);
    text-align:center;
   }
  .prodDiffSwitch {
    display:inline-block;
  }
  .prodDiffButton {
    float: right;
  }
  .diffIdButton {
    text-align: center;
  }
  </style>