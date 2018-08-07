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
      <v-dialog v-model="dialog" class="prodDiffButton"  max-width="1000px">
      <v-btn fab dark small color="cyan" slot="activator"  @click="addTd">
        <v-icon dark>add</v-icon>
      </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">添加对比</span>
          </v-card-title>
          <v-card-text>
            <search-list-smart v-on:listenToSearch="showSearch"></search-list-smart>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-layout row wrap>
        <div v-for="(prodList, index1) in prodDiffData" class="diffList">
      <v-list dense>
      <template v-for="(item, index) in prodList.items"  >
        <v-btn class="diffIdButton"  color="red" v-if="index==0&&index1!=0"  dark @click="deleteTd(prodList.prodType)">
          <v-icon dark >block</v-icon>{{prodList.prodType}}
        </v-btn>
        <div class="diffEg" v-if="index==0&&index1==0"  dark >

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
    import {getDiffProd} from '@/api/prod';
    import searchListSmart from '@/views/prodFactory/prodFlow/searchFlow/searchListSmart';
    export default {
        components: {searchListSmart},
        data () {
            return {
                dialog: false,
                prodCodeList :[],
                prodDiffData:[{
                    prodType:'',
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
                getDiffProd(this.prodCodeList).then(response => {
                    this.prodDiffData = response.data.prodCompare
                })
            },
            showSearch (prodType){
          /*      for(const item in this.prodCodeList){
                    for(const itemCode in prodType){
                    if(this.prodCodeList[item]==prodType[itemCode]){
                        return
                    }
                    }
                }*/
                this.prodCodeList=this.concatArr(this.prodCodeList,prodType)
                this.queryDespositProdData()
                this.dialog=false
            },
            deleteTd (prodType) {
                var newIndex=0
                for (var i = 1; i < this.prodDiffData.length; i++) {
                    if( this.prodDiffData[i].prodType==prodType){
                        newIndex=i
                    }
                }
                this.prodDiffData.splice(newIndex,1);
                this.prodCodeList.splice(newIndex-1,1);
            },
            unique1(arr){
                var hash=[];
                for (var i = 0; i < arr.length; i++) {
                    if(hash.indexOf(arr[i])==-1){
                        hash.push(arr[i]);
                    }
                }
                return hash;
            },
            concatArr(arr1, arr2){
                var arr = arr1.concat(arr2);
                arr = this.unique1(arr);//再引用上面的任意一个去重方法
                return arr;
            },
        },

        mounted: function() {
          this.prodCodeList=  this.$route.params.prodCodeList;
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
    height:48px;
  }
  </style>