<template>
  <el-carousel :interval="4000" type="card" height="100px">
    <el-carousel-item v-for="item in items" :key="item">
      <img :src="item.imgUrl">
    </el-carousel-item>
  </el-carousel>

</template>
<script>
  import test1 from '@/png/Chrysanthemum.jpg'
  import test2 from '@/png/Hydrangeas.jpg'
  import test3 from '@/png/Desert.jpg'
  export default {
    data() {
      return {
        items: [{ index: 1, imgUrl: test1
        }, { index: 2, imgUrl: test2
        }, { index: 3, imgUrl: test3 }
        ]
      }
    }
  }
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
