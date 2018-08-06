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

      <v-layout row wrap>
        <div v-for="(prodList, index1) in prodDiffData" class="diffList">
      <v-list dense>
      <template v-for="(item, index) in prodList.items"  >
        <v-btn class="diffIdButton" fab color="red" v-if="index==0&&index1!=0"  dark @click="deleteTd(props)">
          <v-icon dark >block</v-icon>
        </v-btn>
        <div class="diffEg" v-if="index==0&&index1==0"  dark @click="deleteTd(props)" >

        </div>
        <v-divider
                v-if="item.divider"
                :inset="item.inset"
                :key="index"
        ></v-divider>
        <v-list-tile
                :key="item.title"
                avatar
                @click=""
                v-else

        >
            <v-list-tile-content >
               <v-list-tile-title v-html="item.title"></v-list-tile-title>
             </v-list-tile-content>
          </v-list-tile>
          </template>
         </v-list>
        </div>
      </v-layout>
    </v-card-text>

  </v-card>

</div>
</template>

<script>
    import {getDiffList} from '@/api/prod';
    import searchList from '@/views/prodFactory/prodFlow/searchFlow/SearchList';
    export default {
        components: {searchList},
        data () {
            return {
                prodDiffData:[{
                    items: [
                        {
                            title: '产品代码'
                        },
                        {divider: true, inset: true},
                        {
                            title: '产品名称'
                        },
                        {divider: true, inset: true},
                        {
                            title: '产品状态'
                        },
                        {divider: true, inset: true},
                        {
                            title: '产品类别'
                        },
                        {divider: true, inset: true},
                        {
                            title: '产品结构'
                        },
                        {divider: true, inset: true},
                        {
                            title: '余额类型'
                        }
                    ]
                    }
                ]
            };
        },
        computed: {
            randomColor () {
                let item = Math.floor(Math.random() * this.colors.length);
                return this.colors[item];
            },
        },
        methods: {
            queryDespositProdData() {
                getDiffList().then(response => {
                    this.prodDiffData = response.data.prodDiffData
                })
            }
        },
        mounted: function() {
            this.queryDespositProdData()
        }
    };
</script>
<style scoped>

  .diffList{
    width:20%;
    border-right-style: solid;border-right-width: 1px;border-color: rgba(40, 24, 31, 0.21);
    text-align:center;
  }

  .diffList .v-divider--inset:not(.v-divider--vertical){
    margin-left:0px;
    max-width:888px;
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
  .diffEg{
    height:68px;
  }
  </style>