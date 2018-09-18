<template>
    <div class="app-container">
        <v-layout row wrap>
            <v-flex md12 lg12>
            <vue-perfect-scrollbar class="depositTree">
                <v-list two-line subheader>
                    <v-subheader class="title">
                        <v-icon left large color="red darken-1" class="pr-3 pt-2">favorite</v-icon>我的产品</v-subheader>
                    <v-list-tile class="prodList" v-for="item in files" :key="item.title">
                        <v-list-tile-avatar>
                            <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title class="subheading">{{ item.value }}</v-list-tile-title>
                            <v-list-tile-sub-title class="subheading">{{ item.label }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn icon ripple>
                                <v-icon color="grey lighten-1">info</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-subheader class="title">
                        <v-icon left large color="green darken-2" class="pr-3 pt-2">call_split</v-icon>{{modelTitle}}</v-subheader>
                    <v-list-tile class="chat-list prodList" avatar v-for="(item) in folders" :key="item.title" @click="handleClick(item)">
                        <v-list-tile-avatar>
                            <v-icon :class="['amber white--text']">{{ 'call_to_action'}}</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title class="subheading">{{ item.prodClass }}</v-list-tile-title>
                            <v-list-tile-sub-title class="subheading">{{ item.prodClassDesc }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn icon ripple>
                                <v-icon color="grey lighten-1">info</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </vue-perfect-scrollbar>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import {
        getProdClassList
    } from '@/api/url/prodInfo'
    export default {
        props: ["sourceModel"],
        data() {
            return {
                    selected: [],
                    items: [],
                    folders: [],
                modelTitle: '啦啦啦啦',
                prodClass: '',
                files: [{
                    icon: 'assignment',
                    iconClass: 'blue white--text',
                    value: '我收藏的产品',
                    lable: '我收藏的产品'
                },
                ],
            };
        },
        created() {
            this.initProdClass(this.sourceModel)
            if(this.sourceModel === "RB"){
                this.modelTitle = "存款产品"
            }else if(this.sourceModel === "CL"){
                this.modelTitle = "贷款产品"
            }else if(this.sourceModel === "GL"){
                this.modelTitle = "内部账产品"
            }

        },

        methods: {
            initProdClass(val) {
                getProdClassList().then(response => {
                    let length = response.data.data.length
                    for(let i = 0; i< length; i++){
                        if(val === response.data.data[i].parentProdClass){
                            this.folders.push(response.data.data[i])
                        }
                    }
                });
            },
            handleClick(val) {
                console.log(val)
                //列表组件获取产品分类prodClass 将prodClass回传给主界面 主界面通过产品分类获取该分类下的所有产品信息 传递给产品列表组件进行显示
                this.prodClass = val.prodClass
                this.$emit('listenToProdClass',{'prodClass': this.prodClass})
            }
        }
    };
</script>
