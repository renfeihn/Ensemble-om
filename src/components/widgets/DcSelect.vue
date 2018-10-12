
<template>
    <div >
        <v-layout row wrap>
        <v-flex md9 lg9>
            <v-select class="primary--text mx-2" :label="lableVal" item-text="value" item-value="key" single-line hide-details></v-select>
        </v-flex>
        <v-flex md3 lg3>
            <v-tooltip right :color="peopleColor">
                <v-btn flat small :color="peopleColor" icon="people" slot="activator" class="left" @click="peopleClick">
                    <v-icon>people</v-icon>
                </v-btn>
                <span>{{desc}}</span>
            </v-tooltip>
        </v-flex>
        </v-layout>
    </div>
</template>
<script>
    export default {
        data: () => ({
            peopleColor: "grey lighten-1",
            desc: "产品生效"
        }),
        methods: {
            peopleClick() {
                if(this.peopleColor === "grey lighten-1") {
                    this.peopleColor = "red"
                    this.desc = "分户生效"
                }else if (this.peopleColor === "red"){
                    this.peopleColor = "grey lighten-1"
                    this.desc = "产品生效"
                }
            },
        }
    }
</script>
<style scoped>
    .left {
        margin-left: 10px;
        margin-top: 20px;
        margin-right: auto;
    }
</style>