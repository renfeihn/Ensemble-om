<template>
  <v-layout align-center>
    <v-item-group
            v-model="window"
            class="shrink mr-4"
            mandatory
            tag="v-flex"
    >
      <v-item
              v-for="n in length"
              :key="n"
      >
        <div slot-scope="{ active, toggle }">
          <v-btn
                  :input-value="active"
                  icon
                  @click="toggle"
          >
            <v-icon color="orange">home</v-icon>
          </v-btn>
        </div>
      </v-item>
    </v-item-group>

    <v-flex>
      <v-window
              v-model="window"
              class="elevation-1"
              vertical
      >
        <v-window-item
                v-for="n in length"
                :key="n"
        >
          <v-card flat>
            <v-card-text>
              <v-layout align-center mb-3>
                <v-avatar color="grey" class="mr-3"></v-avatar>
                <strong class="title">Title {{ n }}</strong>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-account</v-icon>
                </v-btn>
              </v-layout>

            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-flex>
  </v-layout>
</template>
<script>
    export default {
        data: () => ({
            length: 3,
            window: 0
        })
    }
</script>
