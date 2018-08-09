<template>
  <div>
    <v-card>
      <v-toolbar  scroll-off-screen scroll-target="#scrolling-techniques" flat>
        <v-switch
                v-model="ex11"
                label="隐藏相同项"
                color="success"
                value="onlyDiff"
                hide-details
                class="prodDiffSwitch"
        ></v-switch>
      </v-toolbar>
      <v-card-text class="pa-0">

        <v-layout row wrap>
          <div v-for="(prodList, index1) in prodDiffData" class="diffList">
            <v-list dense>
              <template v-for="(item, index) in prodList.items"  >
                <v-btn class="diffIdButton"  color="red" v-if="index==0&&index1!=0"  dark @click="deleteTd(prodList.prodType)">
                  {{prodList.prodType}}
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
                        :class="{'tbColor':item.diff}"
                >
                  <v-list-tile-content  >
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
    export default {
        data () {
            return {
                ex11:'',
                onlyDiff:false,
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
        watch: {
            ex11(val){
                if(val=='onlyDiff'){

                    var prodList=this.prodDiffData;
                    var newListSub=[]
                    for(var item in prodList){
                        var newList=[]
                        for(var items in prodList[item].items){
                            if(prodList[item].items[items].diff==true){
                                newList.push(prodList[item].items[items-1]);
                                newList.push(prodList[item].items[items]);
                            }
                        }
                        if(newList.length>0){
                            var data={'prodType':prodList[item].prodType}
                            data.items=newList;
                            newListSub.push(data)
                        }
                    }
                    this.prodDiffData=newListSub
                }
                else{
                    this.queryDespositProdData()
                }
            }
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
                    this.prodDiffData = response.data.prodDiffTwo
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
    width:33.333333333%;
    border-right-style: solid;border-right-width: 1px;border-color: rgba(40, 24, 31, 0.21);
    text-align:center;
  }
  .tbColor{
    background-color: #E3F2FD;
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