<template>
    <v-timeline>
        <div v-for="n in 4" :key="n">
            <v-timeline-item
                    color="cyan lighten-1"
                    fill-dot
                    right
                    v-if="n%2==0"
            >
                <v-card>
                    <v-card-title class="cyan lighten-1">
                        <v-icon
                                dark
                                size="42"
                                class="mr-3"
                        >
                            mdi-magnify
                        </v-icon>
                        <h2 class="display-1 white--text font-weight-light">Title {{n}}</h2>
                    </v-card-title>
                    <v-container>
                        <v-layout>
                            <v-flex xs10>
                                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit.
                            </v-flex>
                            <v-flex xs2>
                                <v-icon size="64">mdi-calendar-text</v-icon>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-timeline-item>
            <v-timeline-item
                    color="cyan lighten-1"
                    fill-dot
                    left
                    v-if="n%2==1"
            >
                <v-card>
                    <v-card-title class="cyan lighten-1">
                        <v-icon
                                dark
                                size="42"
                                class="mr-3"
                        >
                            mdi-magnify
                        </v-icon>
                        <h2 class="display-1 white--text font-weight-light">Title {{n}}</h2>
                    </v-card-title>
                    <v-container>
                        <v-layout>
                            <v-flex xs10>
                                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit.
                            </v-flex>
                            <v-flex xs2>
                                <v-icon size="64">mdi-calendar-text</v-icon>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-timeline-item>
        </div>

    </v-timeline>
</template>

<script>
    export default {
        name: "prodChangeHistory"
    }
</script>

<style scoped>

</style>