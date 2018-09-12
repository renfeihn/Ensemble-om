<template>
  <v-container fluid pr-5 pt-0>
    <v-layout row wrap>
      <v-flex xs12 md12 lg12>
        <div slot="widget-content">
          <v-container fluid pt-1>
            <v-layout row wrap>
              <v-flex xs12 md2 lg2>
              <v-subheader class="primary--text subheading">客户类型*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="clientType" v-model="productObject.clientType" label="客户类型" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">境内外标识*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="inlandOffshore" v-model="productObject.inlandOffshore" label="境内外标识" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>

              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">客户子类型*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="clientSubType" v-model="productObject.clientSubType" label="客户子类型" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                 <v-subheader class="primary--text subheading">客户等级*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                  <v-select class="primary--text mx-2" :items="clientLevel" v-model="productObject.clientLevel" label="客户等级" item-text="value" item-value="key" single-line hide-details ></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">年龄区间*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="ageSection" v-model="productObject.ageBetween" label="年龄区间" item-text="value" item-value="key" single-line hide-details ></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">职业*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="profession" v-model="productObject.occupation" label="职业" item-text="value" item-value="key" single-line hide-details ></v-select>
              </v-flex>
              <v-flex xs12 md2 lg2>
               <v-subheader class="primary--text subheading">渠道选择*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="channelChoose" v-model="productObject.channelChoose" label="渠道选择" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>

            <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">适用区域*</v-subheader>
            </v-flex>
            <v-flex md4 lg4>
                <v-select class="primary--text mx-2" :items="applyArea" v-model="productObject.applyArea" label="适用区域" item-text="value" item-value="key" single-line hide-details></v-select>
            </v-flex>

            <v-flex xs12 md2 lg2>
               <v-subheader class="primary--text subheading">区域选择*</v-subheader>
            </v-flex>
            <v-flex md4 lg4>
               <v-select class="primary--text mx-2" :items="areaChoose" v-model="productObject.areaChoose" label="区域选择" item-text="value" item-value="key" single-line hide-details></v-select>
            </v-flex>
              <v-flex xs12 md2 lg2>
                <v-subheader class="primary--text subheading">适用机构*</v-subheader>
                </v-flex>
              <v-flex md4 lg4>
                  <v-select class="primary--text mx-2" :items="applyBranch" v-model="productObject.applyBranch" label="适用机构" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>

              <v-flex xs12 md2 lg2>
                 <v-subheader class="primary--text subheading">机构选择*</v-subheader>
              </v-flex>
              <v-flex md4 lg4>
                 <v-select class="primary--text mx-2" :items="branchChoice" v-model="productObject.branchChoice" label="机构选择" item-text="value" item-value="key" single-line hide-details></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getInitData } from "@/api/prod";
import { getProdData } from "@/api/prod";
export default {
      props: ["prodData"],
      data: () => ({
        title: null,
        clientType: [
            {
                key: "",
                value: ""
            }
        ],
        inlandOffshore: [
            {
                key: "",
                value: ""
            }
        ],
        clientSubType: [
            {
                key: "",
                value: ""
            }
        ],
        clientLevel: [
            {
                key: "",
                value: ""
            }
        ],
        ageSection: [
            {
                key: "",
                value: ""
            }
        ],
        profession: [
            {
                key: "",
                value: ""
            }
        ],
        applyArea: [
            {
                 key: "",
                 value: ""
            }
        ],
        areaChoose: [
             {
                   key: "",
                   value: ""
             }
                        ],
        productObject: {
            clientType: '',
            inlandOffshore: '',
            clientSubType: '',
            clientLevel: '',
            ageBetween: '',
            occupation: '',
            channelChoose: '',
            applyBranch: '',
            branchChoice: '',
            applyArea: '',
            areaChoose: ''
        },
      }),
      computed: {
        progress() {
          return Math.min(100, this.value.length * 10);
        }
      },
      watch: {
        prodData(val) {
          this.selectByProd(val)
        }
       },
      mounted() {
        this.initRefDate();
      },
      methods: {
        selectByProd(val) {
          this.eventForm = {}
          this.productObject.clientType = val.productObject.clientType
          this.productObject.inlandOffshore = val.productObject.inlandOffshore
          this.productObject.clientSubType = val.productObject.clientSubType
          this.productObject.clientLevel = val.productObject.clientLevel
          this.productObject.ageBetween = val.productObject.ageBetween
          this.productObject.occupation = val.productObject.occupation
          this.productObject.channelChoose = val.productObject.channelChoose
          this.productObject.applyBranch = val.productObject.applyBranch
          this.productObject.branchChoice = val.productObject.branchChoice
          this.productObject.applyArea = val.productObject.applyArea
          this.productObject.areaChoose = val.productObject.areaChoose
        },
        initRefDate() {
            getInitData().then(response => {
                console.log(response);
                this.clientType = response.data.paraDataRb.clientType;
                this.inlandOffshore = response.data.paraDataRb.inlandOffshore;
                this.clientSubType = response.data.paraDataRb.clientSubType;
                this.clientLevel = response.data.paraDataRb.clientLevel;
                this.ageSection = response.data.paraDataRb.ageBetween;
                this.profession = response.data.paraDataRb.occupation;
                this.channelChoose = response.data.paraDataRb.channelChoose;
                this.applyBranch = response.data.paraDataRb.applyBranch;
                this.branchChoice = response.data.paraDataRb.branchChoice;
                this.applyArea = response.data.paraDataRb.applyArea;
                this.areaChoose = response.data.paraDataRb.areaChoose;
            });
        }
    }
  }
</script>
