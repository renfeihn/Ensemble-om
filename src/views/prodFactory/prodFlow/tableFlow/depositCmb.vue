 <template>
  <div class="app-container">
    <v-layout row wrap>
      <v-flex lg3 sm3 class="v-card">
        <!--<v-toolbar dense class="chat-history-toolbar prodLists">
                        <v-text-field flat solo full-width clearable prepend-icon="search" class="top" label="Search"></v-text-field>
                      </v-toolbar>-->
        <vue-perfect-scrollbar class="depositTree">
          <v-list two-line subheader>
            <v-subheader class="title">
              <v-icon left large color="red darken-1" class="pr-3 pt-2">favorite</v-icon>我的产品</v-subheader>
            <v-list-tile class="prodList" v-for="item in files" :key="item.title" avatar @click="handleClick">
              <v-list-tile-avatar>
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title class="subheading">{{ item.value }}</v-list-tile-title>
                <v-list-tile-sub-title class="subheading">{{ item.label }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            <v-subheader class="title">
              <v-icon left large color="green darken-2" class="pr-3 pt-2">call_split</v-icon>存款产品</v-subheader>
            <v-list-tile class="chat-list prodList" avatar v-for="(item) in folders" :key="item.title" @click="handleClick(item)">
              <v-list-tile-avatar>
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title class="subheading">{{ item.value }}</v-list-tile-title>
                <v-list-tile-sub-title class="subheading">{{ item.label }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </vue-perfect-scrollbar>
      </v-flex>
      <v-flex lg9 sm9 class="v-card">
        <prod-list-cmb :items="prodListDtl"></prod-list-cmb>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  getDepositProdListTow
  import {
    getDepositProdListTow
  } from '@/api/prod';
  getDepositDtl
  import {
    getDepositDtl
  } from '@/api/prod';
  import {
      getProdClass
  } from '@/api/prod';
  import {
      getProdType
  } from '@/api/prod';
  import VWidget from '@/components/VWidget';
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  import prodListCmb from './prodListCmb';
  export default {
    name: 'depositCmb',
    components: {
      VWidget,
      VuePerfectScrollbar,
      prodListCmb
    },
    data() {
      return {
        listLoading: true,
          prodClass: '',
        prodListDtl: [],
        depositProd: {
          prodcode: '100002',
          version: '1.0'
        },
        listValue: '',
        activeName: 'basic',
        eventForm: {
          ccy: []
        },
        acctForm: {},
        prodInfo: ['基本信息', '账户信息', '核算信息'],
        files: [{
            icon: 'assignment',
            iconClass: 'blue white--text',
            value: '我收藏的产品',
            lable: '我收藏的产品'
          },
          // {
          //   icon: 'assignment',
          //   iconClass: 'blue white--text',
          //   value: '我评论的理财产品',
          //   lable: '我评论的理财产品'
          // }
        ],
        folders: [],
        clFolders: [],
        glFolders: []
      }
    },
    created() {
      this.depositProd = {
        prodcode: this.$route.params.prodType,
        version: '1.0'
      }
    },
    mounted: function() {
//    this.queryDespositProdData()
        this.getProdClassData()
        //界面初始加载，显示所有个人存款产品
        this.prodclass = 'RB100'
        this.getProdType(this.prodclass)
    },
    methods: {
      selectByProd() {
        // this.$bus.$emit('prodType', this.depositProd.prodtype)
        // console.log(this.depositProd.prodtype)
      },
      handleClick(prodList) {
        // console.log(prodList)
//        var prodCode = prodList.value
//        var prodType = prodList.label
//        this.listValue = prodCode
//        this.queryDespositDtl(prodCode,prodType)
          //渲染产品信息列表时，先清空原有产品信息
          this.prodListDtl = []
          this.prodclass = prodList.value
          this.getProdType(this.prodclass)
      },
      onSubmit() {
        this.$message('submit!')
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      },
      queryDespositProdData() {
        getDepositProdListTow().then(response => {
          this.folders = response.data.prodListTwo
          this.queryDespositDtl(this.folders[0].value, this.folders[0].label)
        })
      },
      queryDespositDtl(prodCode, prodType) {
        getDepositDtl({
          'prodCode': prodCode,
          'prodType': prodType
        }).then(response => {
          this.prodListDtl = response.data
        })
      },
        //初始化加载菜单列表
        getProdClassData() {
            getProdClass().then(response => {
                for (let i=0; i<response.data.prodClassForm.length; i++)
                {
                   if('RB'=== response.data.prodClassForm[i].parentProdClass){
                        this.folders.push(response.data.prodClassForm[i])
                    }
                }
            })
        },
        //通过点击菜单目录，显示相关联的所有产品信息
        getProdType(val) {
            getProdType(val).then(response => {
                let length = response.data.prodTypeForm.length
                for (let i = 0; i < length; i++) {
                    if (val === response.data.prodTypeForm[i].prodClass) {
                        this.prodListDtl.push(response.data.prodTypeForm[i])
                    }
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

