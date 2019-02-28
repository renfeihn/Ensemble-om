<template>
    <div id="app">
        <div class="row">
            <div class="col-3">
                <div class="mb-2">
                    <button class="btn btn-primary" @click="collapseAll">collapse all</button>
                    <button class="btn btn-primary ml-1" @click="expandAll">expand all</button>
                </div>
                <Tree :data="tree1data" draggable="draggable" cross-tree="cross-tree">
                    <div slot-scope="{data, store}">
                        <template v-if="!data.isDragPlaceHolder"><b v-if="data.children &amp;&amp; data.children.length" @click="store.toggleOpen(data)">{{data.open ? '-' : '+'}}&nbsp;</b><span>{{data.text}}</span></template>
                    </div>
                </Tree>
            </div>
            <div class="col-3">
                <Tree :data="tree2data" draggable="draggable" cross-tree="cross-tree">
                    <div slot-scope="{data, store}">
                        <template v-if="!data.isDragPlaceHolder"><b v-if="data.children &amp;&amp; data.children.length" @click="store.toggleOpen(data)">{{data.open ? '-' : '+'}}&nbsp;</b><span>{{data.text}}</span></template>
                    </div>
                </Tree>
                <div class="mt-2">
                    <button class="btn btn-primary" @click="addChild">Add child</button>
                </div>
            </div>
            <div class="col-3">
                <Tree class="tree3" :data="tree3data" draggable="draggable" cross-tree="cross-tree">
                    <div slot-scope="{data, store}">
                        <template v-if="!data.isDragPlaceHolder"><b v-if="data.children &amp;&amp; data.children.length" @click="store.toggleOpen(data)">{{data.open ? '-' : '+'}}&nbsp;</b><span>{{data.text}}</span></template>
                    </div>
                </Tree>
            </div>
            <div class="col-3">
                <Tree class="tree4" :data="tree4data" draggable="draggable" cross-tree="cross-tree" :indent="30" :space="0">
                    <div slot-scope="{data, store}">
                        <template v-if="!data.isDragPlaceHolder"><b v-if="data.children &amp;&amp; data.children.length" @click="store.toggleOpen(data)">{{data.open ? '-' : '+'}}&nbsp;</b><span>{{data.text}}</span></template>
                    </div>
                </Tree>
            </div>
        </div>
    </div>
</template>

<script>

    import {DraggableTree} from 'vue-draggable-nested-tree'
    import {getSysTable} from "@/api/url/prodInfo";
    import {getPkList} from '@/views/prodFactory/prodInfo/pkListColumnInfo'
    import {filterTableChangeData} from "@/server/filterTableChangeData";
    import {saveSysTable} from "@/api/url/prodInfo";
    import {getSysInfoByUser} from "@/api/url/prodInfo";

    export default {

            el: '#app',
            components: {Tree: vueDraggableNestedTree.DraggableTree},

        data: {
            tree1data: [
                {text: 'node 1'},
                {text: 'node 2'},
                {text: 'node 3 undraggable', draggable: false},
                {text: 'node 4'},
                {text: 'node 4 undroppable', droppable: false},
                {
                    text: 'node 5', children: [
                        {text: 'node 1'},
                        {
                            text: 'node 2', children: [
                                {text: 'node 3'},
                                {text: 'node 4'},
                            ]
                        },
                        {
                            text: 'node 2 undroppable', droppable: false, children: [
                                {text: 'node 3'},
                                {text: 'node 4'},
                            ]
                        },
                        {
                            text: 'node 2', children: [
                                {text: 'node 3'},
                                {text: 'node 4 undroppable', droppable: false},
                            ]
                        },
                        {text: 'node 3'},
                        {text: 'node 4'},
                        {text: 'node 3'},
                        {text: 'node 4'},
                        {text: 'node 3'},
                        {text: 'node 4'},
                        {text: 'node 3'},
                        {text: 'node 4'},
                    ]
                },
            ],
            tree2data: [
                {text: 'node 1'},
                {text: 'node 2'},
                {text: 'node 3'},
                {text: 'node 4'},
            ],
            tree3data: [
                {text: 'node 1'},
                {text: 'node 2'},
                {text: 'node 3 undraggable', draggable: false},
                {text: 'node 4'},
                {text: 'node 4 undroppable', droppable: false},
                {
                    text: 'node 5', children: [
                        {text: 'node 1'},
                        {
                            text: 'node 2', children: [
                                {text: 'node 3'},
                                {text: 'node 4'},
                            ]
                        },
                        {
                            text: 'node 2 undroppable', droppable: false, children: [
                                {text: 'node 3'},
                                {text: 'node 4'},
                            ]
                        },
                        {
                            text: 'node 2', children: [
                                {text: 'node 3'},
                                {text: 'node 4 undroppable', droppable: false},
                            ]
                        },
                        {text: 'node 3'},
                        {text: 'node 4'},
                        {text: 'node 3'},
                        {text: 'node 4'},
                        {text: 'node 3'},
                        {text: 'node 4'},
                        {text: 'node 3'},
                        {text: 'node 4'},
                    ]
                },
            ],
            tree4data: [
                {text: 'node 1'},
                {text: 'node 2'},
                {text: 'node 3 undraggable', draggable: false},
                {text: 'node 4'},
                {text: 'node 4 undroppable', droppable: false},
                {
                    text: 'node 5', children: [
                        {text: 'node 1'},
                        {
                            text: 'node 2', children: [
                                {text: 'node 3'},
                                {text: 'node 4'},
                            ]
                        },
                        {
                            text: 'node 2 undroppable', droppable: false, children: [
                                {text: 'node 3'},
                                {text: 'node 4'},
                            ]
                        },
                        {
                            text: 'node 2', children: [
                                {text: 'node 3'},
                                {text: 'node 4 undroppable', droppable: false},
                            ]
                        },
                        {text: 'node 3'},
                        {text: 'node 4'},
                        {text: 'node 3'},
                        {text: 'node 4'},
                        {text: 'node 3'},
                        {text: 'node 4'},
                        {text: 'node 3'},
                        {text: 'node 4'},
                    ]
                },
            ],
        },
        methods: {

            },

    }

</script>

<style scoped>
    #app {
        padding: 50px;
    }

    .he-tree {
        border: 1px solid #ccc;
        padding: 20px;
    }

    .tree-node-inner {
        padding: 5px;
        border: 1px solid #ccc;
        cursor: pointer;
    }

    .draggable-placeholder-inner {
        border: 1px dashed #0088F8;
        box-sizing: border-box;
        background: rgba(0, 136, 249, 0.09);
        color: #0088f9;
        text-align: center;
        padding: 0;
        display: flex;
        align-items: center;
    }

    .tree3 .tree-node-inner {
        border: none;
        padding: 0px;
    }
    .tree3 .tree-node-inner-back:hover {
        background: #ddd;
    }

    .tree4 .tree-node-inner {
        border: none;
        border-bottom: 1px solid #ccc;
        padding: 5px 10px;
        backgroud: #ccc;
    }
    .tree4 .draggable-placeholder-inner {
        background-color: orangered;
    }

</style>