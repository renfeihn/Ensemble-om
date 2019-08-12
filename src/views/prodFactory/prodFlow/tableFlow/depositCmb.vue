 <template>
  <div class="app-container">
    <v-layout row wrap>
      <v-flex lg3 sm3 class="v-card">
          <prod-class-cmb v-bind:sourceModel="sourceModel" v-on:listenToProdClass="listenToProdClass"></prod-class-cmb>
      </v-flex>
      <v-flex lg9 sm9 class="v-card">
        <prod-list-cmb :items="prodListDtl"></prod-list-cmb>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
//  getDepositProdListTow
//  import {
//    getDepositProdListTow
//  } from '@/api/prod';
//  getDepositDtl
//  import {
//    getDepositDtl
//  } from '@/api/prod';

  import {
      getProdType
  } from '@/api/url/prodInfo'
  import VWidget from '@/components/VWidget';
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  import prodListCmb from './prodListCmb';
  import prodClassCmb from './prodClassCmb';

  export default {
    name: 'depositCmb',
    components: {
      VWidget,
      VuePerfectScrollbar,
      prodListCmb,
        prodClassCmb
    },
    data() {
      return {
        listLoading: true,
        prodListDtl: [],
          sourceModel: 'RB',
        files: [{
            icon: 'assignment',
            iconClass: 'blue white--text',
            value: '我收藏的产品',
            lable: '我收藏的产品'
          },
        ],
        folders: [],
          header: {
              prodClass: 'RB100'
          }
      }
    },
    created() {
        this.sourceModel = 'RB'
        this.listenToProdClass(this.header)
    },
    methods: {
//      onSubmit() {
//        this.$message('submit!')
//      },
//      onCancel() {
//        this.$message({
//          message: 'cancel!',
//          type: 'warning'
//        })
//      },
//      queryDespositProdData() {
//        getDepositProdListTow().then(response => {
//          this.folders = response.data.prodListTwo
//          this.queryDespositDtl(this.folders[0].value, this.folders[0].label)
//        })
//      },
//      queryDespositDtl(prodCode, prodType) {
//        getDepositDtl({
//          'prodCode': prodCode,
//          'prodType': prodType
//        }).then(response => {
//          this.prodListDtl = response.data
//        })
//      },
        //通过点击菜单目录，显示产品分类下的所有产品信息
        listenToProdClass(val) {
            this.prodListDtl = []
            getProdType(val.prodClass).then(response => {
                let length = response.data.data.length
                for (let i = 0; i < length; i++) {
                    if(response.data.data[i].status === "A"){
                        response.data.data[i].status = "可售"
                    }else if(response.data.data[i].status === "F"){
                        response.data.data[i].status = "停售"
                    }
                    if(response.data.data[i].prodGroup === "Y"){
                        response.data.data[i].prodGroup = "组合产品"
                    }else if(response.data.data[i].prodGroup === "N"){
                        response.data.data[i].prodGroup = "单一产品"
                    }
                    this.prodListDtl.push(response.data.data[i])
                }
            })
        }
    }
  }
</script>

<style scoped>
  .top {
    padding-top: 8px;
  }
  .depositTree {
    height: calc(100vh - 48px);
  }
  /*  .prodList {
                    border-top-style: solid;border-top-width: 1px;border-color: rgba(40, 24, 31, 0.21);
                  }
                  .prodLists {
                    border-bottom-style: solid;border-bottom-width: 3px;border-color: rgba(183, 172, 177, 0.6);
                  }*/
</style>

