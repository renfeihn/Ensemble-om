<template>
  <div class="form-container">

  </div>
</template>

<script>
  export default {
    props: {
      accounting: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {}
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

