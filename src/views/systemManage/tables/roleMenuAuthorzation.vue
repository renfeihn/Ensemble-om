<template>
    <div>
        <br>
        <v-layout row warp>
            <v-flex xs5 style="overflow-y: scroll">
                <v-card style="height: 400px;">
                    <v-card-title>
                        <div class="headline">菜单列表</div>
                    </v-card-title>
                    <div style="padding-right: 5px;padding-left: 5px">
                        <vue-drag-tree :data='menuTree' disableDBClick :allowDrag='allowDrag' :allowDrop='allowDrop' @current-node-clicked='curNodeClicked' @drag="dragHandler" @drag-enter="dragEnterHandler" @drag-leave="dragLeaveHandler" @drag-over="dragOverHandler" @drag-end="dragEndHandler" @drop="dropHandler">
                        </vue-drag-tree>
                    </div>
                </v-card>
            </v-flex>
            <v-flex xs1>
                <!--<div style="height: 400px;width: 1px; background-color: black"></div>-->
            </v-flex>
            <v-flex xs6 style="overflow-y: scroll">
                <v-card style="height: 400px;">
                    <v-card-title>
                        <v-flex xs6>
                            <div class="headline">角色菜单授权</div>
                        </v-flex>
                        <v-flex xs3>
                        </v-flex>
                        <v-flex xs3>
                            <v-btn depressed color="primary" @click="save">保存</v-btn>
                        </v-flex>
                    </v-card-title>
                    <div style="padding-right: 5px;padding-left: 5px">
                        <vue-drag-tree :data='menuRoleTree' disableDBClick :allowDrag='allowDrag' :allowDrop='allowDrop' @current-node-clicked='curNodeClicked' @drag="dragHandler" @drag-enter="dragEnterHandler" @drag-leave="dragLeaveHandler" @drag-over="dragOverHandler" @drag-end="dragEndHandler" @drop="dropHandler">
                        </vue-drag-tree>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    import {getSysTable} from "@/api/url/prodInfo";
    import vueDragTree from '../../tree/VueDragTree';
    import Dialog from "ant-design-vue/es/vc-dialog/Dialog";
    import {getSysInfoByUser} from "@/api/url/prodInfo";
    import {saveRoleMenuTable} from "@/api/url/prodInfo";

    export default{
        components: {
            Dialog,
            vueDragTree,
        },
        data(){
            return{
                roleTree: [{
                    name: 'Apps',
                    id: 1,
                    children: [{
                        name: '首页',
                        id: 10,
                        children: []
                    }]
                }],
                nodata: [],
                menuInfo: [],
                menuTree: [],
                menuRoleTree: [],
                roleId: "",
                menuRoleData: [],
                menuRole: [],
                menuRoleCopy: [],
            }
        },
        watch: {
            menuTree: {
                handler(newValue) {
                    console.log(newValue);
                },
                deep: true
            }
        },
        created () {
            this.initialize()
            this.getMenuRole()
        },
        methods: {
            //menu的数据
            initialize () {
                let that = this
                getSysTable("OM_MENU").then(function (response) {
                    that.menuInfo = response.data.data.columnInfo;
                    that.menuTree = that.getTree(that.menuInfo)
                });
            },
            //menuRole的数据
            getMenuRole(){
                let that = this
                that.roleId = that.$route.hash.roleId
                that.menuRole = []
                let userId = sessionStorage.getItem("userId")
                getSysInfoByUser(userId).then(function (response) {
                    let menuRoleInfo = response.data.data.menuRoleInfo;
                    for(let i=0; i<menuRoleInfo.length; i++){
                        if(menuRoleInfo[i].roleId == that.roleId){
                            that.menuRole.push(menuRoleInfo[i])
                        }
                    }
                    that.menuRoleCopy = that.copy(that.menuRole,that.menuRoleCopy)
                    if(that.menuRole.length == 0){
                        that.menuRoleTree = that.roleTree
                    }else{
                        that.makeDate(that.menuRole)
                    }
                });
            },
            //组装数据
            makeDate(menuRole){
                for(let i=0; i<menuRole.length; i++){
                    for(let j=0; j<this.menuInfo.length; j++){
                        if(menuRole[i].menuId == this.menuInfo[j].menuId){
                            menuRole[i].menuTitle = this.menuInfo[j].menuTitle
                        }
                    }
                }
                this.menuRoleTree = this.getTree(menuRole)
            },
            //树的数据类型组装
            getTree(menu) {
                let tree = []
                let num = 0
                for(let i=0; i<menu.length; i++){
                    if(menu[i].menuParentId == null || menu[i].menuParentId == ""){
                        let treeParent = {}
                        treeParent.id=parseInt(menu[i].menuId)
                        treeParent.name=menu[i].menuTitle
                        treeParent.children = []
                        this.creatTree(treeParent,menu)
                        tree[num] = treeParent
                        num++
                    }
                }
                return tree
            },
            //树迭代子节点
            creatTree(parent,menu) {
                for(let i=0; i<menu.length; i++){
                    if(parseInt(menu[i].menuParentId) == parent.id){
                        let tree = {}
                        tree.id=parseInt(menu[i].menuId)
                        tree.name=menu[i].menuTitle
                        tree.children = []
                        this.creatTree(tree,menu)
                        parent.children.push(tree)
                    }
                }
            },
            //保存方法
            save(){
                let that = this
                that.$swal({
                    title: 'Are you sure?',
                    text: "Are you sure you want to save menuRole?",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, save!'
                }).then((result) => {
                    if(result.value){
                        //保存的时候把树转换成数据
                        that.menuRoleData = []
                        for(let i=0; i<that.menuRoleTree.length; i++){
                            let role = {}
                            role.roleId = that.roleId
                            role.menuId = that.menuRoleTree[i].id.toString()
                            role.menuParentId = ""
                            that.menuRoleData.push(role)
                            that.getChildrenData(that.menuRoleTree[i].children,parseInt(that.menuRoleTree[i].id))
                        }
                        let map = {}
                        map["add"] = that.menuRoleData
                        map["delete"] = that.menuRoleCopy
                        saveRoleMenuTable(map).then(response => {
                            if (response.status === 200) {
                                this.$router.push({ name: "systemManageIndex"});
                                this.sweetAlert('success', "提交成功!")
                            }
                        });
                    }
                })
            },
            //树的孩子节点转换数据
            getChildrenData(child,n){
                for(let i=0; i<child.length; i++) {
                    let role = {}
                    role.roleId = this.roleId
                    role.menuId = child[i].id.toString()
                    role.menuParentId = n.toString()
                    this.menuRoleData.push(role)
                    this.getChildrenData(child[i].children,parseInt(child[i].id))
                }
            },

            allowDrag(model, component) {
                // can be dragged
                return true;
            },
            allowDrop(model, component) {
                // can be placed
                return true;
            },
            curNodeClicked(model, component) {
                //console.log('curNodeClicked', model, component);
            },
            dragHandler(model, component, e) {
                //console.log('dragHandler: ', model, component, e);
            },
            dragEnterHandler(model, component, e) {
                //console.log('dragEnterHandler: ', model, component, e);
            },
            dragLeaveHandler(model, component, e) {
                //console.log('dragLeaveHandler: ', model, component, e);
            },
            dragOverHandler(model, component, e) {
                //console.log('dragOverHandler: ', model, component, e);
            },
            dragEndHandler(model, component, e) {
                //console.log('dragEndHandler: ', model, component, e);
            },
            dropHandler(model, component, e) {
                //this.menuTree2 = this.menuTree
                //console.log('dropHandler: ', model, component, e);
            },
            //对象浅复制
            copy(obj1,obj2) {
                var obj = obj2||{};
                for(let name in obj1){
                    if(typeof obj1[name] === "object" && obj1[name]!== null){
                        obj[name]= (obj1[name].constructor===Array)?[]:{};
                        this.copy(obj1[name],obj[name]);
                    }else{
                        obj[name]=obj1[name];
                    }
                }
                return obj;
            },
        }
    }
</script>