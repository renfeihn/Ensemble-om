<template>
    <v-container fluid grid-list-md>
        <v-card height="200px" flat>
            <div class="headline text-xs-center pa-5">

            </div>
            <v-bottom-nav
                    :active.sync="bottomNav"
                    :value="true"
                    absolute
                    color="transparent"
            >
                <v-btn
                        color="teal"
                        flat
                        value="recent"
                >
                    <span>提交信息</span>
                    <v-icon>history</v-icon>
                </v-btn>

                <v-btn
                        color="teal"
                        flat
                        value="favorites"
                >
                    <span>复核信息</span>
                    <v-icon>favorite</v-icon>
                </v-btn>

                <v-btn
                        color="teal"
                        flat
                        value="nearby"
                >
                    <span>发布信息</span>
                    <v-icon>place</v-icon>
                </v-btn>
            </v-bottom-nav>
        </v-card>
    </v-container>
</template>

<script>
    export default {

    };
</script>
