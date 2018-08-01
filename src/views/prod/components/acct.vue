<template>
  <div class="form-container">
    <el-form ref="form" :model="acctFrom" label-width="150px" size="small">
      <el-row type="flex" class="row-bg">

        <el-col :span="10">
          <el-form-item label="账户属性" prop="acctattr">
            <el-select v-model="acctFrom.attr" placeholder="请选择" style="margin-bottom:8px; width: 220px">
              <el-option v-for="item in acctAttrs" :key="item.value" :label="item.label" :value="item.value">
                <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="账户类别" prop="acctclass">
            <el-select v-model="acctFrom.class" placeholder="请选择" style="margin-bottom:8px; width: 220px">
              <el-option v-for="item in acctClasses" :key="item.value" :label="item.label" :value="item.value">
                <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg">
        <el-col :span="10">
          <el-form-item label="是否多币种" prop="muticcyflag">
            <el-select v-model="acctFrom.muticcyflag" placeholder="请选择" style="margin-bottom:8px; width: 220px">
              <el-option v-for="item in muticcyflag" :key="item.value" :label="item.label" :value="item.value">
                <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="币种" prop="ccytype">
            <el-select v-model="acctFrom.ccytype" placeholder="请选择" style="margin-bottom:8px; width: 220px">
              <el-option v-for="item in ccytype" :key="item.value" :label="item.label" :value="item.value">
                <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg">
        <el-col :span="10">
          <el-form-item label="金额类型" prop="amttype">
            <el-select v-model="acctFrom.amttype" placeholder="请选择" style="margin-bottom:8px; width: 220px">
              <el-option v-for="item in amttype" :key="item.value" :label="item.label" :value="item.value">
                <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="余额类型" prop="baltype">
            <el-select v-model="acctFrom.baltype" placeholder="请选择" style="margin-bottom:8px; width: 220px">
              <el-option v-for="item in baltype" :key="item.value" :label="item.label" :value="item.value">
                <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg">


        <el-col :span="10">
          <el-form-item label="折算币种" prop="reducedccy">
            <el-select v-model="acctFrom.reducedccy" placeholder="请选择" style="margin-bottom:8px; width: 220px">
              <el-option v-for="item in reducedccy" :key="item.value" :label="item.label" :value="item.value">
                <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg">

        <el-col :span="10">
          <el-form-item label="账户用途" prop="acctusefor">
            <el-select v-model="acctFrom.acctusefor" placeholder="请选择" style="margin-bottom:8px; width: 220px">
              <el-option v-for="item in acctusefor" :key="item.value" :label="item.label" :value="item.value">
                <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>


        <el-col :span="10">
          <el-form-item label="介质类型" prop="mediumtype">
            <el-select v-model="acctFrom.mediumtype" placeholder="请选择" style="margin-bottom:8px; width: 220px">
              <el-option v-for="item in mediumtype" :key="item.value" :label="item.label" :value="item.value">
                <span style="float: left">{{ item.value }} - {{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      acctFrom: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        acctAttrs: [{
          value: '1',
          label: '个人结算户'
        }, {
          value: '2',
          label: '个人储蓄户'
        }],
        acctClasses: [{
          value: '1',
          label: 'I类账户'
        }, {
          value: '2',
          label: 'II类账户'
        }, {
          value: '3',
          label: 'III类账户'
        }],
        muticcyflag: [{
          value: 'Y',
          label: '是'
        }, {
          value: 'N',
          label: '否'
        }],

        ccytype: [{
          value: 'CNY',
          label: '人民币'
        }, {
          value: 'USD',
          label: '美元'
        }],

        amttype: [{
          value: 'BAL',
          label: '余额'
        }],

        baltype: [{
          value: 'CA',
          label: '钞余额'
        }, {
          value: 'TT',
          label: '汇余额'
        }],

        reducedccy: [{
          value: 'CNY',
          label: '人民币'
        }, {
          value: 'USD',
          label: '美元'
        }],

        acctusefor: [{
          value: '100',
          label: '测试1'
        }, {
          value: '200',
          label: '测试2'
        }],
        mediumtype: [{
          value: 'A',
          label: '测试1'
        }, {
          value: 'B',
          label: '测试2'
        }]
      }
    },
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
</style>

