<template>
  <div class="app-container">
    <v-toolbar color="indigo lighten-1" dark tabs>
      <v-tabs
              color="indigo lighten-1"

              v-model="activeName"
              grow
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="n in prodInfo" :key="n">
          {{n}}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="activeName" class="white elevation-1">
      <v-tab-item
              v-for="i in 3"
              :key="i"
              :id="'mobile-tabs-5-' + i"
      >

        <v-card>
          <v-card-text>
             <deposit-cmb></deposit-cmb>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

  </div>
</template>

<script>
  // import queryheader from './components/queryheader'


  import VWidget from '@/components/VWidget';
  import depositCmb from './depositCmb';
  export default {
    name: 'prodCmb',
    components: {
        VWidget,
        depositCmb
    },
    data() {
      return {
        listLoading: true,
        depositProd: {
          prodcode: '100002',
          version: '1.0'
        },
          listValue: '',
        activeName: 'depositCmb',
          eventForm: {
          ccy: []
        },
        acctForm: {},
        prodInfo: ['存款产品','贷款产品','内部帐产品']
      }
    },
    created() {
      this.depositProd = { prodcode: this.$route.params.prodType, version: '1.0' }
    },
    methods: {

        submitForm() {
        },
        draftForm() {
        },
        queryProdInfo() {
            console.log('start query prod info')

        },
        selectByProd() {
            // this.$bus.$emit('prodType', this.depositProd.prodtype)
            // console.log(this.depositProd.prodtype)
        },
        handleClick(value) {
            console.log(value)
            var listValue = value.value
            this.listValue = listValue
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

    },
      mounted: function() {
          window.getApp.$emit('APP_DRAWER_TOGGLED');
      }
  }
</script>

<style scoped>
  .top {
    padding-top: 8px;
  }
  .depositTree {
    height: calc(80vh - 48px);
    }
/*  .prodList {
    border-top-style: solid;border-top-width: 1px;border-color: rgba(40, 24, 31, 0.21);
  }
  .prodLists {
    border-bottom-style: solid;border-bottom-width: 3px;border-color: rgba(183, 172, 177, 0.6);
  }*/
</style>

