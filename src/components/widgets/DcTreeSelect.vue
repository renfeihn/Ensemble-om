<template>
    <div :style="{height: heightSize+'px'}">
        <v-layout row wrap>
            <v-flex md10 lg10>
                <treeselect v-model="value" :multiple="true" openDirection="below" :options="thisOptions" :perShow="perShow" :always-open="true" :limit="10" :sort-value-by="INDEX"/>
            </v-flex>
            <v-flex md2 lg2 v-if="personShow==1">
                <v-tooltip right :color="peopleColor">
                    <v-btn flat small :color="peopleColor" icon="people" slot="activator" @click="peopleClick" class="dcMulti1">
                        <v-icon>people</v-icon>
                    </v-btn>
                    <span>{{peopleDesc}}</span>
                </v-tooltip>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
import Treeselect from "@riophae/vue-treeselect";
export default {
  components: { Treeselect },
  model: {
    prop: "msg",
    event: "getVue"
  },
  props: ["options", "msg","perShow"],
  data() {
    return {
      value: [],
      thisOptions: [],
      heightSize: 0,
      personShow: 1,
      peopleColor: "grey lighten-1",
      peopleDesc: "产品生效"
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
  mounted() {
    this.init(this._props.msg);
  },
  methods: {
      peopleClick() {
          if(this.peopleColor === "grey lighten-1") {
              this.peopleColor = "red"
              this.peopleDesc = "分户生效"
          }else if (this.peopleColor === "red"){
              this.peopleColor = "grey lighten-1"
              this.peopleDesc = "产品生效"
          }
      },
    init(msg) {
      //通过数据个数动态修改树结构hight  每条数据hight=36px  计算最大个数为11 当数据个数>11时 树形界面右侧实现滚动条拖拽
      if(this._props.options.length > 11){
        this.heightSize = 335
      }else{
        this.heightSize = this.getHeigthSize(this._props.options.length)
      }
      //判断是否显示分户生效标识
      if(this._props.perShow === false){
          this.personShow = 0
      }
      let PropOptions = this._props.options;
      let options = [];
      for (const index in PropOptions) {
        const propOption = PropOptions[index];
        let option = {};
        option.id = propOption.key;
        option.label = propOption.value;
        option.isDefaultExpanded = true;
        options.push(option);
      }
      this.thisOptions = options;
      if (msg != undefined) {
        let data = msg.split(",");
        let values = [];
        for (const num in data) {
          values.push(data[num]);
        }
        this.value = values;
      }
    },
    reback(newValue) {
      let value = "";
      for (const index in newValue) {
        if (index == 0) {
          value = newValue[index];
        } else {
          value = value + "," + newValue[index];
        }
      }
      if (value) {
        this.$emit("getVue", value);
      }
    },
    getHeigthSize(val) {
        var enumArray = [68,68,94,120,144,170,192,217,248,270,300,319]
        return enumArray[val]
    }
  }
};
</script>