<template>
    <v-card>
        <v-toolbar card color="grey lighten-3">
            <v-toolbar-title class="primary--text subheading" style="font-size: large">产品参数增加</v-toolbar-title>
        </v-toolbar>
        <v-layout>
            <v-flex xs12 md6>
                <v-card-text>
                    <v-treeview
                            v-model="tree"
                            :items="items"
                            selected-color="green"
                            open-on-click
                            selectable
                            :options="options"
                            expand-icon="mdi-assignment_turned_in-down"
                    >
                    </v-treeview>
                </v-card-text>
            </v-flex>
            <v-divider vertical></v-divider>
            <v-flex xs12 md6>
                <v-card-text>
                    <div v-if="selections.length === 0" key="title" class="title font-weight-light grey--text pa-3 text-xs-center">
                        请选择需要增加的产品信息...
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
            <v-btn flat @click="resetClick">Reset</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="white--text" color="green darken-1" @click="saveClick" depressed>Save</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: { Treeselect },
  model: {
    prop: "msg",
    event: "getVue"
  },
  props: ["options", "msg"],
  data() {
    return {
        items: [],
        brewerie: [],
        tree: ["9901"],
        types: [],
        options: []
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
  mounted() {
    this.init();
  },
  methods: {
      saveClick() {
          console.log("ghjkl")
      },
      resetClick() {
          this.tree = []
      },
      init() {
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
          for(let k=0; k<options.length; k++){
              let brewerieTemps = {}
              brewerieTemps.id = this.brewerie.length+1
              brewerieTemps.name = options[k].columnDesc
              this.brewerie.push(brewerieTemps)
              for(let n=0; n<parent.length; n++){
                  if(options[k].parentCode !== undefined && options[k].parentCode === parent[n].code){
                      let temps = {}
                      temps.id = this.brewerie.length+1
                      temps.name = options[k].columnDesc
                      parent[n].children.push(temps)
                  }
              }
          }
          this.items = parent
      }
    }
};
</script>