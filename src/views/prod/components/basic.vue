<template>
  <div class="form-container">

    <form ref="form" :model="prodFrom" label-width="150px" size="small">
      <row type="flex" class="row-bg">
        <col :span="10">
          <form-item label="产品类型 :" prop="prodtype">
            <el-input style="margin-bottom:8px; width: 200px"></el-input>
          </form-item>
        </col>

        <col :span="10">
        <form-item label="产品描述 :" prop="proddesc">
          <input style="margin-bottom:8px; width: 200px"></input>
        </form-item>
        </col>
      </row>

      <row type="flex" class="row-bg">
      <col :span="10">
        <form-item label="业务模块 :" porp="busimodel">
          <select v-model="prodFrom.busimodel" placeholder="请选择" style="margin-bottom:8px; width: 200px">
            <option v-for="item in busimodel" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
            </option>
          </select>
        </form-item>
      </col>


      <col :span="10">
        <form-item label="产品分类 :" porp="prodclass">
          <select v-model="prodFrom.prodclass" placeholder="请选择" style="margin-bottom:8px; width: 200px">
            <option v-for="item in prodclass" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
            </option>
          </select>
        </form-item>
      </col>
      </row>

      <el-row type="flex" class="row-bg">
      <col :span="10">
        <form-item label="产品属性 :" porp="prodprepice">
          <select v-model="prodFrom.prodprepice" placeholder="请选择" style="margin-bottom:8px; width: 200px" >
            <option v-for="item in prodprepice" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
            </option>
          </select>
        </form-item>
      </col>

      <col :span="10" >
        <form-item label="组合产品 :" porp="prodmuti">
          <select v-model="prodFrom.prodmuti" placeholder="请选择" style="margin-bottom:8px; width: 200px">
            <option v-for="item in prodmuti" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
            </option>
          </select>
        </form-item>
      </col>
      </el-row>

      <el-row type="flex" class="row-bg">
      <col :span="10">
        <form-item label="产品状态 :" porp="prodstatus">
          <select v-model="prodFrom.prodstatus" placeholder="请选择" style="margin-bottom:8px; width: 200px">
            <option v-for="item in prodstatus" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
            </option>
          </select>
        </form-item>
      </col>

      <col :span="10">
        <form-item label="基础产品 :" porp="baseprod">
          <select v-model="prodFrom.baseprod" placeholder="请选择" style="margin-bottom:8px; width: 200px">
            <option v-for="item in baseprod" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
            </option>
          </select>
        </form-item>
      </col>
      </el-row>

      <el-row type="flex" class="row-bg">
      <col :span="10">
        <form-item label="账户类型 :" porp="accttype">
          <select v-model="prodFrom.accttype" placeholder="请选择" style="margin-bottom:8px; width: 200px">
            <option v-for="item in accttype" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
            </option>
          </select>
        </form-item>
      </col>

      <col :span="10">
        <form-item label="账户子类型 :" porp="acctsontype">
          <select v-model="prodFrom.acctsontype" placeholder="请选择" style="margin-bottom:8px; width: 200px">
            <option v-for="item in acctsontype" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
            </option>
          </select>
        </form-item>
      </col>
      </el-row>

      <el-row type="flex" class="row-bg">
      <col :span="10">
        <form-item label="账户结构 :" porp="acctstruct">
          <select v-model="prodFrom.acctstruct" placeholder="请选择" style="margin-bottom:8px; width: 200px">
            <option v-for="item in acctstruct" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
            </option>
          </select>
        </form-item>
      </col>

      <col :span="10">
        <form-item label="虚实标志 :" porp="virtualflag">
          <select v-model="prodFrom.virtualflag" placeholder="请选择" style="margin-bottom:8px; width: 200px">
            <option v-for="item in virtualflag" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
            </option>
          </select>
        </form-item>
      </col>
      </el-row>

      <el-row type="flex" class="row-bg">
      <col :span="10">
        <form-item label="账户计息标志 :" porp="acctintflag">
          <select v-model="prodFrom.acctintflag" placeholder="请选择" style="margin-bottom:8px; width: 200px">
            <option v-for="item in acctintflag" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
            </option>
          </select>
        </form-item>
      </col>


      <col :span="10">
        <form-item label="金额标志 :" porp="amtflag">
          <select v-model="prodFrom.amtflag" placeholder="请选择" style="margin-bottom:8px; width: 200px">
            <option v-for="item in amtflag" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
            </option>
          </select>
        </form-item>
      </col>
      </el-row>


      <el-row type="flex" class="row-bg">
      <col :span="10">
        <form-item label="利润中心 :" porp="profitcenter">
          <select v-model="prodFrom.profitcenter" placeholder="请选择" style="margin-bottom:8px; width: 200px">
            <option v-for="item in profitcenter" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
            </option>
          </select>
        </form-item>
      </col>
      </el-row>

      <el-row type="flex" class="row-bg">
        <col :span="10">
          <form-item label="生效日期 :" porp="effectdate" >
            <el-date-picker type="date" placeholder="起始日期" v-model="prodFrom.date1" style="margin-bottom:8px; width: 200px"></el-date-picker>
          </form-item>
        </col>
        <col :span="10">
          <form-item label="失效日期 :" porp="failuredate ">
            <el-date-picker type="date" placeholder="终止日期" v-model="prodFrom.date2" style="margin-bottom:8px; width: 200px"></el-date-picker>
          </form-item>
        </col>
      </el-row>



    </form>
  </div>
</template>

<script>
  export default {
    props: {
      prodFrom: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        // prodFrom: {
        //   prodtype: '1234',
        //   prodstatus: true,
        //   region: '',
        //   base: '',
        //   date1: '',
        //   date2: '',
        //   delivery: false,
        //   ccy: [],
        //   resource: '',
        //   desc: ''
        // },
        prodclass: [{
          value: 'RB100',
          label: '个人存款组'
        }, {
          value: 'RB200',
          label: '对公存款组'
        }, {
          value: 'RB300',
          label: '同业存款组'
        }],
        busimodel: [{
          value: 'RB',
          label: '存款'
        }],

        prodprepice: [{
          value: 'S',
          label: '可售产品'
        }, {
          value: 'B',
          label: '基础产品'
        }],

        prodmuti: [{
          value: 'Y',
          label: '是'
        }, {
          value: 'N',
          label: '否'
        }],

        prodstatus: [{
          value: 'A',
          label: '启用'
        }, {
          value: 'C',
          label: '废弃'
        }],

        baseprod: [{
          value: '100001',
          label: '测试基础产品1'
        }, {
          value: '100002',
          label: '测试基础产品2'
        }],

        amtflag: [{
          value: '10',
          label: '主账户记录余额'
        }, {
          value: '01',
          label: '子账户记录余额'
        }, {
          value: '00',
          label: '不记录余额'
        }, {
          value: '10',
          label: '主子都记录余额'
        }],

        acctintflag: [{
          value: '00',
          label: '不计息'
        }, {
          value: '01',
          label: '子账户计息'
        }, {
          value: '10',
          label: '主账户计息'
        }, {
          value: '10',
          label: '主子账户都不计息'
        }],

        virtualflag: [{
          value: '00',
          label: '虚账户'
        }, {
          value: '01',
          label: '子实账户'
        }, {
          value: '10',
          label: '主实账户'
        }, {
          value: '10',
          label: '实账户'
        }],

        acctstruct: [{
          value: '1',
          label: '一层账户'
        }, {
          value: '2',
          label: '二层账户'
        }],

        acctsontype: [{
          value: '1',
          label: '测试1'
        }, {
          value: '2',
          label: '测试2'
        }],

        accttype: [{
          value: 'S',
          label: '储蓄账户'
        }, {
          value: 'C',
          label: '结算账户'
        }],

        profitcenter: [{
          value: '99',
          label: '利润中心'
        }]
      }
    },
    // mounted: function() {
    //   var vm = this
    //   // 用$on事件来接收参数
    //   this.$bus.$on('prodType', (data) => {
    //     console.log(data)
    //     vm.prodFrom.prodtype = data
    //   })
    // },
    methods: {
      onSubmit() {
        this.$message('submit!')
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      }
    }
  }
</script>

<style scoped>
  .line {
    text-align: center;
  }
  .form-container {
    width: 1000px;
  }
</style>

