/**
 * chengliang 20180917
 * 开关组件
 * 示例 <dc-switch v-model="isMultiCcy"></dc-switch>
 * 将其 value 特性绑定到一个名叫 value 的 prop 上
 * 在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出
 */
<template>
  <v-switch :label="desc" color="success" v-model="dcSwitch" @change="switchChange" hide-details></v-switch>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: "是,否"
    },
    value: String
  },
  data() {
    return {
      currentValue: "",
      desc: "",
      dcSwitch: false
    };
  },
  watch: {
    value: {
      handler(val) {
        this.dcSwitch = val === "Y" ? true : false;
        this.switchChange()
      },
      // watch 的一个特点是，最初绑定的时候是不会执行的，要等到 value 改变时才执行监听计算
      // 代表在wacth里声明了value这个方法之后立即先去执行handler方法
      immediate: true
    }
    // value(val) {
    //   this.dcSwitch = val === "Y" ? true : false;
    // },
    // dcSwitch(val) {
    //   this.$emit("input", this.currentValue);
    // }
  },
  mounted() {
    this.switchChange();
  },
  methods: {
    switchChange() {
      if (this.dcSwitch) {
        this.currentValue = "Y";
        this.value = "Y";
        this.desc = this.label.split(",")[0];
      } else {
        this.currentValue = "N";
        this.value = "N";
        this.desc = this.label.split(",")[1];
      }
      //在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出
      this.$emit("input", this.currentValue);
    }
  }
};
</script>
