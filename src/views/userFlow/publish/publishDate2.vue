<template>
 <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 == 1" step="1"><span @click="e1 = 1">2017年12月22日-pm7：00</span></v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 == 2" step="2"><span @click="e1 = 2">2018年1月22日-pm7：00</span></v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 == 3" step="3"><span @click="e1 = 3">2018年3月22日-pm7：00</span></v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <publish-iterator></publish-iterator>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card
          class="mb-5"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>

        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-5"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>

        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
import publishIterator from "./publishIterator";
export default {
  components: {
    publishIterator
  },
  data() {
    return { e1: 1 };
  }
};
</script>