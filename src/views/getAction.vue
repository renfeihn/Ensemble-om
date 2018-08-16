<template>
  <div>
    {{text}}
  </div>
</template>

<script>
import { getSpringBoot } from "@/api/getAction";
export default {
  data() {
   return { text: "初始数据"}
  },
  mounted: function() {
    this.queryAction();
  },
  methods: {
    handleClick() {
      alert("button click");
    },
    queryAction() {
       this.$http.get('http://localhost:8004').then(response => {
        this.text = response.bodyText;
      });
    }
  }
};
</script>
