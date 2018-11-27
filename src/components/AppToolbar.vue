<template>

    <v-toolbar color="primary" fixed dark app>
        <img v-bind:src="computeLogo" height="36" alt="产品工厂">
        <v-toolbar-title class="ml-0 pl-1">
            <span class="hidden-sm-and-down">{{titleName}}</span>
            <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
        </v-toolbar-title>
        <!--<v-text-field-->
        <!--flat-->
        <!--solo-inverted-->
        <!--prepend-icon="search"-->
        <!--label="Search"-->
        <!--class="hidden-sm-and-down"-->
        <!--:items="prodList"-->
        <!--v-model="country"-->
        <!--&gt;-->
        <!--</v-text-field>-->
        <v-autocomplete :rules=null :items="prodList" placeholder="请输入要查询的产品类型或描述" class="primary--text mx-3 pt-2"
                        @change="prodListClick" clearable flat solo-inverted></v-autocomplete>
        <v-spacer></v-spacer>
        <v-switch v-model="dcSwitch" @change="switchChange" label="menu" class="pt-4"></v-switch>
        <v-btn icon @click="handleFullScreen()">
            <v-icon>fullscreen</v-icon>
        </v-btn>
        <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
            <v-btn icon flat slot="activator">
                <v-badge color="red" overlap>
                    <span slot="badge">3</span>
                    <v-icon medium>notifications</v-icon>
                </v-badge>
            </v-btn>
            <notification-list></notification-list>
        </v-menu>
        <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
            <v-btn icon large flat slot="activator">
                <v-avatar size="30px">
                    <img src="/static/avatar/timg.jpg" alt="Michael Wang"/>
                </v-avatar>
            </v-btn>
            <v-list class="pa-0">
                <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null"
                             :href="item.href" @click="item.click" ripple="ripple" :disabled="item.disabled"
                             :target="item.target" rel="noopener" :key="index">
                    <v-list-tile-action v-if="item.icon">
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content style="margin-left: -20px">
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-menu>
    </v-toolbar>
</template>
<script>
    import NotificationList from "@/components/widgets/list/NotificationList";
    import Util from "@/util";
    import {getToken} from "@/utils/auth";
    import {getProdType} from "@/api/prod";
    import {
        getAllProdList
    } from '@/api/url/prodInfo'
    import config from '@/config'
    export default {
        name: "app-toolbar",
        components: {
            NotificationList
        },
        data: () => ({
            sourceProdList: [],
            prodList: [],
            prodCode: "",
            dcSwitch: true,
            titleName: config.name,
            prodClass: "",
            prodListSplit: [],
            items: [
                {
                    icon: "account_circle",
                    href: "#",
                    title: "个人设置",
                    click: e => {
                        window.getApp.$emit("APP_USER_INFO_MANAGEMENT");
                    }
                },
                {
                    icon: "settings",
                    href: "#",
                    title: "系统管理",
                    click: e => {
                        window.getApp.$emit("APP_SYSTEM_MANAGEMENT");
                    }
                },
                {
                    icon: "settings",
                    href: "#",
                    title: "权限管理",
                    click: e => {
                        window.getApp.$emit("APP_PERM_PERMISSIONS");
                    }
                },
                {
                    icon: "fullscreen_exit",
                    href: "#",
                    title: "登出",
                    click: e => {
                        window.getApp.$emit("APP_LOGOUT");
                    }
                }
            ]
        }),

        computed: {
            toolbarColor() {
                return this.$vuetify.options.extra.mainNav;
            },
            computeLogo() {
                return "/static/prod/dcLog1.png";
            },
        },

        mounted() {
            if (getToken()) {
                this.getInitProdList();
            }
        },
        methods: {
            handleDrawerToggle() {
                window.getApp.$emit("APP_DRAWER_TOGGLED");
            },
            prodListClick(val) {
                this.prodListSplit = val.split("-");
                this.prodCode = this.prodListSplit[0];
                for (let i = 0; i < this.sourceProdList.length; i++) {
                    if (this.prodCode === this.sourceProdList[i].prodType) {
                        this.prodClass = this.sourceProdList[i].prodClass
                        break
                    }
                }
                if ("RB100" === this.prodClass) {
                    this.$router.push({
                        name: "prod/rbPrivateProds",
                        params: {
                            prodClassCmp: this.prodClass,
                            prodType: this.prodCode
                        }
                    });
                } else if ("RB400" === this.prodClass) {
                    this.$router.push({
                        name: "prod/rbPrivateProd",
                        params: {
                            prodClassCmp: this.prodClass,
                            prodType: this.prodCode
                        }
                    });
                }
            },
            handleFullScreen() {
                Util.toggleFullScreen();
            },
            switchChange(){
                this.$emit("menuSwitch");
                window.getApp.$emit('APP_DRAWER_TOGGLED');
            },
            getInitProdList() {
                getAllProdList().then(response => {
                    for (let i = 0; i < response.data.data.length; i++) {
                        this.sourceProdList.push(response.data.data[i])
                        this.prodList.push(
                            response.data.data[i].prodType +
                            "-" +
                            response.data.data[i].prodDesc
                        );
                    }
                });
            }
        }
    };
</script>
