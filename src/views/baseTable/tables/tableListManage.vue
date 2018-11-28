<template>
    <v-layout align-center pt-4>
        <v-item-group v-model="window" class="shrink mr-4" mandatory tag="v-flex">
            <v-item v-for="n in system" :key="n">
                <div slot-scope="{ active, toggle }">
                        <v-chip color="primary lighten-2" text-color="white" @click="toggle">
                            {{n}}
                            <v-icon right>star</v-icon>
                        </v-chip>
                </div>
            </v-item>
        </v-item-group>

        <v-flex>
            <v-window v-model="window" class="elevation-2" vertical>
                <v-window-item v-for="n in system" :key="n">
                    <v-card flat>
                        <v-card-text>
                            <v-layout align-center mb-3>
                                <strong class="title">{{ n }}</strong>
                                <v-spacer></v-spacer>
                                <v-btn icon>
                                    <v-icon>mdi-account</v-icon>
                                </v-btn>
                            </v-layout>
                           <table-list></table-list>
                        </v-card-text>
                    </v-card>
                </v-window-item>
            </v-window>
        </v-flex>
    </v-layout>
</template>
<script>
//    import TableList from './tables/tableList'
    export default {
//        components: {
//            TableList
//        },
        data: () => ({
            system: ['Ensemble','Accounting','Price'],
            window: 0
        })
    }
</script>
