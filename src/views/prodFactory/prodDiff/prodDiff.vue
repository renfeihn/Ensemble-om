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
      <v-dialog v-model="dialog" class="prodDiffButton" persistent max-width="1000px">
      <v-btn fab dark small color="cyan" slot="activator"  @click="addTd">
        <v-icon dark>add</v-icon>
      </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">添加对比</span>
          </v-card-title>
          <v-card-text>
            <search-list></search-list>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      <td class="diffTd text-xs-left" >{{ props.item.diffType }}</td>
      <td class="diffTd" v-if="props.item.prod1!=''">{{ props.item.prod1 }}</td>
      <td class="diffTd" v-if="props.item.prod2!=''">{{ props.item.prod2 }}</td>
      <td class="diffTd" v-if="props.item.prod3!=''">{{ props.item.prod3 }}</td>
      <td class="diffTd" v-if="props.item.prod4!=''">{{ props.item.prod4 }}</td>
      <td class="diffTd" v-if="props.item.prod5!=''">{{ props.item.prod5 }}</td>
    </template>
  </v-data-table>
</div>
</template>

<script>
    import {getDiffProd} from '@/api/prod';
    import searchList from '@/views/prodFactory/prodFlow/searchFlow/SearchList';
    export default {
        components: {searchList},
        data () {
            return {
                headers: [
                    { text: '', value: 'diffType' },
                    { text: '移除', value: 'prod1',   index:1,         sortable: false, },
                    { text: '移除', value: 'prod2' , index:2,           sortable: false,},
                    { text: '移除', value: 'prod3' , index:3,           sortable: false,},
                    { text: '移除', value: 'prod4' , index:4,           sortable: false,},
                    { text: '移除', value: 'prod5' , index:5,           sortable: false,},

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
                },
                dialog: false
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
                var arrayHeader=props.header;
                var newIndex=0
                for (var i = 1; i < this.headers.length; i++) {
                  if( this.headers[i].index==index){
                      newIndex=i
                  }
                }
                this.headers.splice(newIndex,1);
                var array=this.items;
                for(var item in array ){
                    switch(index){
                        case 1:
                        array[item].prod1=''
                        break
                        case 2:
                            array[item].prod2=''
                            break
                        case 3:
                            array[item].prod3=''
                            break
                        case 4:
                            array[item].prod4=''
                            break
                        case 5:
                            array[item].prod5=''
                            break
                    }
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
                    this.items = response.data.prodDiff
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