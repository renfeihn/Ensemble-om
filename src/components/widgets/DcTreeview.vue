<template>
    <v-card>
        <v-toolbar card color="grey lighten-3">
            <v-toolbar-title style="font-size: large">{{labelText}}</v-toolbar-title>
        </v-toolbar>
        <v-layout>
            <v-flex xs12 md6>
                <v-card-text>
                    <v-treeview v-model="tree" :items="items" selected-color="green" open-on-click selectable :options="options" expand-icon="mdi-assignment_turned_in-down" labelDesc="labelDesc"></v-treeview>
                </v-card-text>
            </v-flex>
            <v-divider vertical></v-divider>
            <v-flex xs12 md6>
                <v-card-text>
                    <div v-if="selections.length === 0" key="title" class="title font-weight-light grey--text pa-3 text-xs-center">
                        请选择需要增加的信息...
                    </div>
                    <v-scroll-x-transition group hide-on-leave>
                        <v-chip v-for="(selection, i) in selections" :key="i" color="green" dark smaller>
                            <v-icon left small>mdi-beer</v-icon>
                            {{ selection.name }}
                        </v-chip>
                    </v-scroll-x-transition>
                </v-card-text>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn class="white--text" color="green darken-1" @click="sheet = false" depressed>取消</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="white--text" color="green darken-1" @click="saveClick" depressed>保存</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
  model: {
    prop: "msg",
    event: "getVue"
  },
  props: ["options", "msg","labelDesc"],
  data() {
    return {
        items: [],
        brewerie: [],
        tree: [],
        options: [],
        labelText: "",
        backValue: []
    };
  },
    computed: {
        selections () {
            const selections = []
            for (const leaf of this.tree) {
                const brewery = this.brewerie.find(brewery => brewery.id === leaf)
                if (!brewery) continue
                selections.push(brewery)
            }
            return selections
        }
    },
  watch: {
    msg: {
      handler(msg) {
        this.init(msg);
      }
    },
    options: {
       handler(msg){
          this.init(msg);
       }
     }
  },
  created() {
      this.init();
  },
  mounted() {
    this.init();
  },
  methods: {
      saveClick() {
          this.backValue = []
          for(let y=0; y<this.tree.length; y++){
              for(let x=0; x<this.brewerie.length; x++){
                  if(this.brewerie[x].id === this.tree[y]){
                      this.backValue.push(this.brewerie[x].key+"--"+this.brewerie[x].name)
                  }
              }
          }
          this.$emit("getVue", this.backValue);
      },
      resetClick() {
          this.tree = []
      },
      init() {
          if(typeof this._props.labelDesc !== "undefined") {
              this.labelText = this._props.labelDesc;
          }
          //加工树形结构数据
          let options = this._props.options
          let parent = []
          for(let i=0; i<options.length; i++){
              if(i === 0){
                  let temp = {}
                  temp.id = parent.length+1
                  temp.code = options[i].parentCode;
                  temp.name = options[i].parentDesc;
                  temp.children = []
                  parent[0] = temp
              }
              let flag = 0
              for(let j=0; j<parent.length; j++){
                  if(parent[j].code !== undefined && options[i].parentCode === parent[j].code){
                      flag = 1;
                      break
                  }
              }
              if(flag === 0){
                  let temp = {}
                  temp.id = parent.length+1
                  temp.code = options[i].parentCode;
                  temp.name = options[i].parentDesc;
                  temp.children = []
                  parent[parent.length] = temp
              }
          }
          let index = parent.length+1
          for(let k=0; k<options.length; k++){
              let brewerieTemps = {}
              brewerieTemps.id = index
              brewerieTemps.name = options[k].columnDesc
              brewerieTemps.key = options[k].key
              this.brewerie.push(brewerieTemps)
              for(let n=0; n<parent.length; n++){
                  if(options[k].parentCode !== undefined && options[k].parentCode === parent[n].code){
                      let temps = {}
                      temps.id = index
                      temps.name = options[k].columnDesc
                      parent[n].children.push(temps)
                  }
              }
              index++
          }
          this.items = parent
          //根据v-model绑定数据初始化树形结构
          if(this._props.msg !== undefined){
              this.tree.push()
              for(let m=0; m<this.brewerie.length; m++){
                  for(let p=0; p<this._props.msg.length; p++){
                      if(this._props.msg[p] === this.brewerie[m].key){
                          this.tree.push(this.brewerie[m].id)
                      }
                  }
              }
          }
      }
    }
};
</script>