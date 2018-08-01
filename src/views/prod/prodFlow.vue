<template>
  <div class="app-container ">
    <prod-deom></prod-deom>
    <div class="line">
    <el-row justify="center" class="row-bg">
      <el-col :span="3" >
        <el-tag  size="medium" type="info" > 操作:
        </el-tag>
      </el-col>
      <el-col :span="15" >
      <el-select placeholder="操作类型" v-model="option" @change="selectEvent" >
        <el-option label="查看" value="W"></el-option>
        <el-option label="修改" value="U"></el-option>
        <el-option label="新增" value="C"></el-option>
      </el-select>
      </el-col>
    </el-row>
    <el-row justify="center" class="row-bg">
      <el-col :span="3" >
        <el-tag type="info"  size="medium">
        产品类型:
        </el-tag>
      </el-col>
      <el-col :span="9" >
       <el-cascader
        :options="options"
        v-model="prodType"
        :show-all-levels="false"
       ></el-cascader>
      </el-col>
    </el-row>
    <el-row justify="center" class="row-bg" v-if="addProd">
      <el-col :span="3" >
        <el-tag type="info"  size="medium">
          新增产品:
        </el-tag>
      </el-col>
      <el-col :span="9" >
        <el-input style="margin-bottom:8px; width: 183px">{{newProd}}</el-input>
      </el-col>
    </el-row>
    <el-row justify="center" class="row-bg">
      <el-col :span="10" :offset="3">
        <el-button type="success" @click="next"round>下一步</el-button>
      </el-col>
    </el-row>
  </div>
  </div>
</template>

<script>
  import prodDeom from './prodDeom'
  export default {
    data() {
      return {
        addProd: false,
        option: 'U',
        newProd: '',
        prodType: ['', '', ''],
        options: [{
          value: 'RB',
          label: '存款产品',
          children: [{
            value: 'RB100',
            label: '活期存款',
            children: [{
              value: 'RB10001',
              label: '个人活期'
            }, {
              value: 'RB10002',
              label: '个人外币活期存款'
            }, {
              value: 'RB10010',
              label: '单位活期存款'
            }
            ]
          }, {
            value: 'RB200',
            label: '定期产品',
            children: [{
              value: 'RB10001',
              label: '个人定期'
            }
            ]
          }]
        }, {
          value: 'CL',
          label: '贷款产品',
          children: [{
            value: 'basic',
            label: 'Basic'
          }, {
            value: 'form',
            label: 'Form'
          }, {
            value: 'data',
            label: 'Data'
          }, {
            value: 'others',
            label: 'Others'
          }]
        }, {
          value: 'GL',
          label: '内部帐产品',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
      }
    },
    components: {
      prodDeom
    },
    methods: {
      selectEvent(param) {
        if (param === 'C') {
          this.addProd = true
        } else {
          this.addProd = false
        }
      },
      next() {
        this.$router.push({ name: 'deposit', params: { prodType: this.prodType[2], newProdType: this.newProd }})
      }
    }
  }
</script>
<style scoped>
  .line {
    text-align: left;
    margin-left: 400px;
    padding-top: 50px;
  }
  .el-row {
    margin-bottom: 20px;
  }
</style>
