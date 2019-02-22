<template>
    <div class="pt-5 pl-4">
        <v-layout>
            <v-flex md6 lg6 class="pl-4 pb-4 pr-1">
                <dragTreeTable :data="treeData" :onDrag="onTreeDataChange"></dragTreeTable>
                <v-card>
                    <v-card-text style="height: 500px; overflow-y: scroll">
                        <vue-drag-tree
                                :data='treeTwo'
                                :allowDrag='allowDrag'
                                :allowDrop='allowDrop'
                                :defaultText='"New Node"'
                                @current-clicked='curNodeClicked'
                                @drag="dragHandler"
                                @drag-enter="dragEnterHandler"
                                @drag-leave="dragLeaveHandler"
                                @drag-over="dragOverHandler"
                                @drag-end="dragEndHandler"
                                @drop="dropHandler">
                        </vue-drag-tree>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex md1 lg1></v-flex>
            <v-flex md5 lg5>
                <v-card>
                    <dragTreeTable :data="treeData2" :onDrag="onTreeDataChange2"></dragTreeTable>
                    <v-treeview :items="treeTwo"></v-treeview>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>


    import {getSysTable} from "@/api/url/prodInfo";
    import {getPkList} from '@/views/prodFactory/prodInfo/pkListColumnInfo'
    import {filterTableChangeData} from "@/server/filterTableChangeData";
    import {saveSysTable} from "@/api/url/prodInfo";
    import {getSysInfoByUser} from "@/api/url/prodInfo";

    export default {
        name: "roleMenuAuthorzation",

        data: () => ({
            treeData: {
                lists: [
                    {
                        "id": 40,
                        "parent_id": 0,
                        "order": 0,
                        "name": "动物类",
                        "open": true,
                        "lists": []
                    },{
                        "id": 5,
                        "parent_id": 0,
                        "order": 1,
                        "name": "昆虫类",
                        "open": true,
                        "lists": [
                            {
                                "id": 12,
                                "parent_id": 5,
                                "open": true,
                                "order": 0,
                                "name": "蚂蚁",
                                "lists": []
                            }
                        ]
                    },
                    {
                        "id": 19,
                        "parent_id": 0,
                        "order": 2,
                        "name": "植物类",
                        "open": true,
                        "lists": []
                    }
                ],
                columns: [
                    {
                        type: 'selection',
                        title: '名称',
                        field: 'name',
                        width: 200,
                        align: 'center',
                        formatter: (item) => {
                            return '<a>'+item.name+'</a>'
                        }
                    },
                    {
                        title: '操作',
                        type: 'action',
                        width: 350,
                        align: 'center',
                        actions: [
                            {
                                text: '查看角色',
                                onclick: this.onDetail,
                                formatter: (item) => {
                                    return '<i>查看角色</i>'
                                }
                            },
                            {
                                text: '编辑',
                                onclick: this.onEdit,
                                formatter: (item) => {
                                    return '<i>编辑</i>'
                                }
                            }
                        ]
                    },
                ]
            },
            treeData2: {
                lists: [
                    {
                        "id": 40,
                        "parent_id": 0,
                        "order": 0,
                        "name": "动物类",
                        "open": true,
                        "lists": []
                    },{
                        "id": 5,
                        "parent_id": 0,
                        "order": 1,
                        "name": "昆虫类",
                        "open": true,
                        "lists": [
                            {
                                "id": 12,
                                "parent_id": 5,
                                "open": true,
                                "order": 0,
                                "name": "蚂蚁",
                                "lists": []
                            }
                        ]
                    },
                    {
                        "id": 19,
                        "parent_id": 0,
                        "order": 2,
                        "name": "植物类",
                        "open": true,
                        "lists": []
                    }
                ],
                columns: [
                    {
                        type: 'selection',
                        title: '名称',
                        field: 'name',
                        width: 200,
                        align: 'center',
                        formatter: (item) => {
                            return '<a>'+item.name+'</a>'
                        }
                    },
                    {
                        title: '操作',
                        type: 'action',
                        width: 350,
                        align: 'center',
                        actions: [
                            {
                                text: '查看角色',
                                onclick: this.onDetail,
                                formatter: (item) => {
                                    return '<i>查看角色</i>'
                                }
                            },
                            {
                                text: '编辑',
                                onclick: this.onEdit,
                                formatter: (item) => {
                                    return '<i>编辑</i>'
                                }
                            }
                        ]
                    },
                ]
            },
            items: [
                {
                    id: 1,
                    name: 'Applications :',
                    children: [
                        { id: 2, name: 'Calendar : app' },
                        { id: 3, name: 'Chrome : app' },
                        { id: 4, name: 'Webstorm : app' }
                    ]
                },
                {
                    id: 5,
                    name: 'Documents :',
                    children: [
                        {
                            id: 6,
                            name: 'vuetify :',
                            children: [
                                {
                                    id: 7,
                                    name: 'src :',
                                    children: [
                                        { id: 8, name: 'index : ts' },
                                        { id: 9, name: 'bootstrap : ts' }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 10,
                            name: 'material2 :',
                            children: [
                                {
                                    id: 11,
                                    name: 'src :',
                                    children: [
                                        { id: 12, name: 'v-btn : ts' },
                                        { id: 13, name: 'v-card : ts' },
                                        { id: 14, name: 'v-window : ts' }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 15,
                    name: 'Downloads :',
                    children: [
                        { id: 16, name: 'October : pdf' },
                        { id: 17, name: 'November : pdf' },
                        { id: 18, name: 'Tutorial : html' }
                    ]
                },
                {
                    id: 19,
                    name: 'Videos :',
                    children: [
                        {
                            id: 20,
                            name: 'Tutorials :',
                            children: [
                                { id: 21, name: 'Basic layouts : mp4' },
                                { id: 22, name: 'Advanced techniques : mp4' },
                                { id: 23, name: 'All about app : dir' }
                            ]
                        },
                        { id: 24, name: 'Intro : mov' },
                        { id: 25, name: 'Conference introduction : avi' }
                    ]
                }
            ],
            menu: [],
            menuTwo: [],
            item: [],
            menuTree: [],
            tree: [],
            treeTwo: [],
        }),
        created() {
            this.initialize()
        },
        methods: {
            onTreeDataChange(lists) {
                this.treeData.lists = lists
            },
            onTreeDataChange2(lists) {
                this.treeData2.lists = lists
            },
            initialize () {
                let that = this
                that.item = this.$route.hash
                let userId = sessionStorage.getItem("userId")
                let userLevel = sessionStorage.getItem("userLevel")
                //获取角色信息
                getSysInfoByUser(userId).then(function (response) {
                    that.menu = response.data.data.columnInfo;
                    that.menuRole = response.data.data.menuRoleInfo
                    that.getRoleMenu(that.item)
                    that.getTree(that.menu)
                    that.tree = that.menuTree
                });
            },
            getRoleMenu(item) {
                this.menuTwo = []
                for(let i=0; i<this.menuRole.length; i++){
                    if(this.menuRole[i].roleId == item.roleId){
                        for(let j=0; j<this.menu.length; j++){
                            if(this.menu[j].menuId == this.menuRole[i].menuId){
                                this.menuTwo.push(this.menu[j])
                            }
                        }
                    }
                }
                this.getTree(this.menuTwo)
                this.treeTwo = this.menuTree
            },
            getTree(menu) {
                this.menuTree = []
                let num = 0
                for(let i=0; i<menu.length; i++){
                    if(menu[i].menuParentId == null || menu[i].menuParentId == ""){
                        let treeParent = {}
                        treeParent.id=parseInt(menu[i].menuId)
                        treeParent.code=menu[i].menuId
                        treeParent.name=menu[i].menuTitle
                        treeParent.children = []
                        this.creatTree(treeParent,menu)
                        this.menuTree[num] = treeParent
                        num++
                    }
                }
            },
            creatTree(parent,menu) {
                for(let i=0; i<menu.length; i++){
                    if(menu[i].menuParentId == parent.code){
                        let tree = {}
                        tree.id=parseInt(menu[i].menuId)
                        tree.code=menu[i].menuId
                        tree.name=menu[i].menuTitle
                        tree.children = []
                        this.creatTree(tree,menu)
                        parent.children.push(tree)
                    }
                }
            },

            allowDrag(model, component) {
                //if (model.name === 'Node 0-1') {
                    // can't be dragged
                  //  return false;
                //}
                // can be dragged
                return true;
            },
            allowDrop(model, component) {
                //if (model.name === 'Node 2-2') {
                    // can't be placed
                   // return false;
               // }
                // can be placed
                return true;
            },
            curNodeClicked(model, component) {
                // console.log('curNodeClicked', model, component);
            },
            dragHandler(model, component, e) {
                // console.log('dragHandler: ', model, component, e);
            },
            dragEnterHandler(model, component, e) {
                // console.log('dragEnterHandler: ', model, component, e);
            },
            dragLeaveHandler(model, component, e) {
                // console.log('dragLeaveHandler: ', model, component, e);
            },
            dragOverHandler(model, component, e) {
                // console.log('dragOverHandler: ', model, component, e);
            },
            dragEndHandler(model, component, e) {
                this.tree = this.menuTree
                // console.log('dragEndHandler: ', model, component, e);
            },
            dropHandler(model, component, e) {
                // console.log('dropHandler: ', model, component, e);
            }
        }
    }

</script>

<style scoped>

</style>