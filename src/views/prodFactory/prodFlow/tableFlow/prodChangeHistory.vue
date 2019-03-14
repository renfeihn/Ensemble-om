<template>
    <v-timeline align-top>
        <v-timeline-item v-for="(history, i) in data" :key="i" fill-dot>
            <v-card>
                <v-card-title class="title">
                    <v-layout>
                        <v-flex xs6>
                            {{history.mainSeqNo}}
                        </v-flex>
                        <v-flex xs3>
                            {{history.userId}}
                        </v-flex>
                        <v-flex xs2>
                            {{history.tranTime}}
                        </v-flex>
                    </v-layout>
                </v-card-title>
                <v-card-text class="white text--primary">
                    tableName:
                    <div v-for="desc in history.tableNameDesc" :key="desc">
                        {{desc}}
                    </div>
                    <br>
                    <div>
                        pkAndValue:  {{history.pkAndValue}}
                    </div>
                </v-card-text>
            </v-card>
        </v-timeline-item>
    </v-timeline>
</template>

<script>
    import {findProdHistory} from "@/api/url/prodInfo";
    export default {
        data() {
            return {
                tranId: '',
                historys: {},
                data: [],
            }
        },
        mounted: function () {
            this.init()
        },
        methods: {
            init(){
                this.tranId = this.$route.hash
                findProdHistory(this.tranId).then(response => {
                    this.historys = response.data.data
                    let num = this.historys.mainSeqNo.length-1
                    for(let i=0; i<num+1; i++){
                        let No = this.historys.mainSeqNo[num-i]
                        this.data.push(No)
                    }
                })
            },
        }

    }
</script>

<style scoped>

</style>