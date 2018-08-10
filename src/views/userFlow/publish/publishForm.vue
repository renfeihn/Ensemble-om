
<script>
    export default {
      data (){
          return {
              e1: 0
          }
      },
        created() {
            this.code = this.$route.params.code;
        }
    }
</script>
<style scoped>

</style>