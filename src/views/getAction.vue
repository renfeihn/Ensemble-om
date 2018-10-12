<template>
  <v-dialog
          v-model="dialog"
          width="500"
  >
  <v-form v-model="valid">
    <v-text-field
            v-model="feeType"
            :counter="10"
            label="费用类型"
            required
            class="mx-5"
    ></v-text-field>
    <v-text-field
            v-model="chargePeriodFerq"
            label="收费频率"
            class="mx-5"
            required
    ></v-text-field>
    <v-text-field
            v-model="chargeDay"
            label="收费日"
            class="mx-5"
            required
    ></v-text-field>
    <v-text-field
            v-model="nextChargeDate"
            label="下一收费日期"
            class="mx-5"
            required
    ></v-text-field>
    <v-text-field
            v-model="chargeDealMethod"
            label="收费处理方式"
            class="mx-5"
            required
    ></v-text-field>
    <v-text-field
            v-model="conDeductFlag"
            label="持续扣款标示"
            class="mx-5"
            required
    ></v-text-field>
    <v-text-field
            v-model="conDeductTime"
            label="持续扣款次数"
            class="mx-5"
            required
    ></v-text-field>
  </v-form>
    <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
    >
      Disagree
    </v-btn>

    <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
    >
      Agree
    </v-btn>
  </v-dialog>
</template>
<script>
    export default {
        data: () => ({
            valid: false,
            dialog: true
        })
    }
</script>