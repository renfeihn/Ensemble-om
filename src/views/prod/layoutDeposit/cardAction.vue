<template>
  <div class="app-container">
    <el-row :span="15">
      <el-col :span="6">
        <el-tag size="medium" type="info"> 操作:
        </el-tag>
      </el-col>
      <el-col :span="16">
        <el-select placeholder="操作类型" v-model="option" @change="selectEvent">
          <el-option label="查看" value="W"></el-option>
          <el-option label="修改" value="U"></el-option>
          <el-option label="新增" value="C"></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {}
</script>


