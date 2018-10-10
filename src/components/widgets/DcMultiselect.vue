
<template>
    <div >
        <multiselect v-model="value" name="key" open-direction="bottom" placeholder="请选择..." selectLabel=""
         :searchable="false" label="value" track-by="value" :options="options" :multiple="true"></multiselect>
    </div>
</template>
<script>
import Multiselect from "vue-multiselect";
export default {
  components: { Multiselect },
  model: {
    prop: "msg",
    event: "getVue"
  },
  props: ["options", "msg"],
  data() {
    return {
      value: [],
      options: []
    };
  },
  watch: {
    msg: {
      handler(msg) {
        this.init(msg);
      }
    },
    value: {
      handler(newValue) {
        this.reback(newValue);
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init(msg) {
      let data = msg.split(",");
      let options = this._props.options;
      let values = [];
      for (const num in data) {
        let value = {};
        value.key = data[num];
        for (const index in options) {
          const option = options[index];
          if (option.key == value.key) {
            value.value = option.value;
          }
        }
        values.push(value);
      }
      this.value = values;
    },
    reback(newValue) {
      let value = "";
      for (const index in newValue) {
        if (index == 0) {
          value = newValue[index].key;
        } else {
          value = value + "," + newValue[index].key;
        }
      }
      if (value) {
        this.$emit("getVue", value);
      }
    },
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
      };
      this.options.push(tag);
      this.value.push(tag);
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>