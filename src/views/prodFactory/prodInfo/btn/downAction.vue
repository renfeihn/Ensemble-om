<template>
  <div>
    <v-layout row wrap v-if="edit == 'false'">
      <v-flex md4 lg4>
          <v-btn color="success" depressed="" @click="temp"><v-icon >assignment_turned_in</v-icon>暂存</v-btn>
      </v-flex>
      <v-flex md4 lg4>
          <v-btn color="success" depressed="" @click='showCopy=!showCopy'><v-icon >history</v-icon>复制</v-btn>
      </v-flex>
      <v-flex md4 lg4>
          <v-btn color="success" depressed="" @click="save"><v-icon >history</v-icon>保存</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="edit == 'true'">
      <v-flex md6 lg6>
        <v-btn color="success" depressed="" @click="temp" style="width: 80%"><v-icon >assignment_turned_in</v-icon>暂存</v-btn>
      </v-flex>
      <v-flex md6 lg6>
        <v-btn color="success" depressed="" @click="save" style="width: 80%;margin-left: 20%"><v-icon >history</v-icon>保存</v-btn>
      </v-flex>
    </v-layout>
    <div v-show="showCopy">
    <v-layout row wrap v-if="edit == 'false'">
      <v-flex md4 lg4>
        <v-subheader class="primary--text pt-3 subheading">产品类型</v-subheader>
      </v-flex>
      <v-flex md8 lg8>
        <v-text-field class="primary--text" label="产品类型" name="title" v-model="prodType" single-line hide-details>
        </v-text-field>
      </v-flex>
      <v-flex md4 lg4>
        <v-subheader class="primary--text pt-3 subheading">产品描述</v-subheader>
      </v-flex>
      <v-flex md8 lg8>
        <v-text-field class="primary--text" label="产品描述" name="title" v-model="prodDesc" single-line hide-details/>
      </v-flex>
    </v-layout>

      <div class="text-xs-center" v-if="edit == 'false'">
          <v-btn color="cyan" @click="copyOn" dark>
              <v-icon>done</v-icon>
            确认
          </v-btn>
      </div>
    </div>
  </div>
</template>
<style>
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
</style>

<script>
export default {
    props: ["editShow"],
    data() {
    return {
      showCopy: false,
        prodType: '',
        prodDesc: '',
        edit: "false"
    };
  },
    watch: {
        editShow (val) {
            this.editShowDeal(val)
        }
    },
  methods: {
      editShowDeal(val) {
         if(val){
             this.edit = "true"
         }else{
             this.edit = "false"
         }
      },
    handleClick() {
      alert("button click");
    },
      copyOn() {
          this.showCopy = false
          this.$emit('listenToCopy',{'prodType': this.prodType,'prodDesc': this.prodDesc,'showCopy': this.showCopy})
      },
      save(){
          this.$emit('saveProd')
      },
      temp(){
          this.$emit('tempProd')
      }
  }
};
</script>
