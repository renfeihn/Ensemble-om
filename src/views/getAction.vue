<template>
  <v-container fluid pr-5 pt-0>
      <v-flex xs12 md12 lg12>
        <div slot="widget-content">
          <v-container fluid pt-1>
            <v-layout row wrap>
              <v-flex v-for="keyData in dataSource" :key="index" lg6>
                <v-layout row wrap>
             <v-flex xs12 md4 lg4>
                <v-subheader class="primary--text subheading">{{keyData.columnDesc}}*</v-subheader>
              </v-flex>
                    <v-flex md8 lg4 v-if="keyData.columnType == 'tree'">
             </v-flex>
             <v-flex md12 lg12 v-if="keyData.columnType == 'tree'">
                 <v-flex md11 ml-5 class="auto">
                     <dc-tree-select v-if="keyData.columnType == 'tree'" v-model="keyData.value" :multiple="true" :options="keyData.valueScore"></dc-tree-select>
                 </v-flex>
             </v-flex>
              <v-flex md8 lg8 v-else>
                <v-text-field v-if="keyData.columnType == 'input'" class="primary&#45;&#45;text mx-1" :label="keyData.columnDesc" name="title" v-model="keyData.value" single-line hide-details></v-text-field>
                 <dc-multiselect v-if="keyData.columnType == 'select'" v-model="keyData.value" :options="keyData.valueScore" class="dcMulti"></dc-multiselect>
                  <dc-switch v-if="keyData.columnType == 'switch'" v-model="keyData.value"></dc-switch>
              </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-flex>
  </v-container>
</template>
<script>
  import columnInfo from './columnInfo'
  import DcMultiselect from '@/components/widgets/DcMultiselect'
  import DcSwitch from "@/components/widgets/DcSwitch";
  import DcTreeSelect from "@/components/widgets/DcTreeSelect";
  export default {
        components: {columnInfo , DcMultiselect , DcSwitch, DcTreeSelect},
        data: () => ({
            dataSource: []
        }),
        created (){
          this.dataSource=columnInfo
        }
    }
</script>
<style scoped>
    .dcMulti {
        margin-top: 10px;
    }
    .branchCard {
        height: auto;
    }
    .auto {
        margin-left: auto;
        margin-right: auto;
    }
</style>