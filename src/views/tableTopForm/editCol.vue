<template>
  <div class="app-container">
    <el-dialog :visible.sync="show" :title="title" :before-close="beforeClose">
    <el-form label-position="left" label-width="130px" :model="colDate">
      <el-form-item label="产品类型">
        <el-input v-model="colDate.prodType"></el-input>
      </el-form-item>
      <el-form-item label="核算状态">
        <el-input v-model="colDate.accountingStatus"></el-input>
      </el-form-item>
      <el-form-item label="负债科目代码">
        <el-input v-model="colDate.subjectCode"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
            <el-button type="success"  icon="el-icon-check" @click="save">保存</el-button>
            <el-button type="danger" icon="el-icon-close" @click="close">关闭</el-button>
        </span>
    </el-dialog>
  </div>

</template>

<script>
  import irlAccounting from '../prod/components/irlAccounting'
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '对话框'
      },
      irlAccounting: {
        type: Object,
        default: {}
      },
      colDate: {
        type: Object,
        default: {}
      }
    },
    components: {
      irlAccounting
    },
    created() {

    },
    methods: {
      beforeClose() {
        this.close()
      },
      close() {
        this.$emit('close')
      },
      save() {
        this.$emit('save')
      }
    }
  }

</script>
