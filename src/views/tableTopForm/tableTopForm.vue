<template>
  <div class="app-container">
    <el-row>
      <el-col :span="2">
        <el-button type="primary" @click="add" icon="el-icon-plus"  plain> 新增</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="edit" icon="el-icon-edit" plain> 修改</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="deleteCol" icon="el-icon-delete" plain> 删除</el-button>
      </el-col>
    </el-row>
    <el-row >
    <el-tabs tab-position="top" v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="核算信息" name="irlAccounting">
        <irlAccounting @select="select"  ></irlAccounting>
      </el-tab-pane>
    </el-tabs>
    </el-row>
    <edit-col :show="editShow" :col-date="tableCol" title="修改" @close="closeEditDialog" @save="saveTodo"></edit-col>
  </div>
</template>

<script>
  import irlAccounting from '../prod/components/irlAccounting'
  import editCol from './editCol'
  export default {
    data() {
      return {
        tableCol: {},
        editShow: false,
        activeName: 'irlAccounting'
      }
    },
    components: {
      irlAccounting,
      editCol
    },
    created() {

    },
    methods: {
      add() {

      },
      edit() {
        this.editShow = true
      },
      deleteCol() {

      },
      select(msg) {
        this.tableCol = msg
      },
      saveTodo() {
        this.closeEditDialog()
      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
      closeEditDialog() {
        this.editShow = false
      }

    }
  }

</script>
