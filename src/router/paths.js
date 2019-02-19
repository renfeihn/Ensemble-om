export default [

  {
    path: '*',
    meta: {
      public: false,
    },
    redirect: {
      path: '/404'
    }
  },
  {
    path: '/404',
    meta: {
      public: false,
    },
    name: 'NotFound',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/NotFound.vue'],resolve)
  },
  {
    path: '/403',
    meta: {
      public: false,
    },
    name: 'AccessDenied',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/Deny.vue'],resolve
      )
  },
  {
    path: '/500',
    meta: {
      public: false,
    },
    name: 'ServerError',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/Error.vue'],resolve
      )
  },
  {
    path: '/login',
    meta: {
      public: true,
    },
    name: 'Login',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
          require(['@/pages/Login.vue'],resolve)
  },
  {
    path: '/',
    meta: {
      public: true
    },
    name: 'Root',
    redirect: {
      name: 'Login'
    }
  },
  {
    path: '/dashboard',
    meta: {
      public: false,
      breadcrumb: true,
      title: '首页',
    },
    name: 'Dashboard',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/Dashboard.vue'],resolve)
  },

  {
    path: '/media',
    meta: {},
    name: 'Media',
    props: (route) => ({
      type: route.query.type
    }),
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/Media.vue'],resolve
      )
  },
  {
    path: '/chat',
    meta: {
      public: false,
    },
    name: 'Chat',
    component: () =>
        (resolve) =>
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy-once" */
            require(['@/components/chat/ChatLayout.vue'],resolve
      ),
    redirect: {
      path: '/chat/messaging'
    },
    children: [{
        path: '/chat/messaging/:uuid?',
        meta: {
          public: false,
        },
        name: 'ChatMessaging',
        props: true,
        components: {
          default: (resolve) =>
              /* webpackChunkName: "routes" */
              /* webpackMode: "lazy-once" */
              require(['@/components/chat/ChatMessaging.vue'],resolve
            ),
        }
      },
      {
        path: '/chat/contact/:uuid?',
        meta: {
          public: false,
        },
        name: 'ChatContact',
        components: {
          default: (resolve) =>
              /* webpackChunkName: "routes" */
              /* webpackMode: "lazy-once" */
              require(['@/components/chat/ChatContact.vue'],resolve
            ),

        }
      }
    ]
  },
  {
    path: '/mail',
    meta: {
      public: false,
    },
    name: 'Mail',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/components/email/Layout.vue'],resolve
      ),
    redirect: {
      path: '/mail/all'
    },
    children: [{
        path: '/mail/:mailType',
        meta: {
          public: false,
        },
        name: 'MailIndex',
        component: (resolve) =>
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy-once" */
            require(['@/components/email/List.vue'],resolve
          ),
      },
      {
        path: '/mail/0/:uuid',
        meta: {
          public: false,
        },
        name: 'MailDetail',
        component: (resolve) =>
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy-once" */
            require(['@/components/email/Reply.vue'],resolve
          ),
      }
    ]
  },
  {
    path: '/components/alert',
    meta: {
      breadcrumb: true
    },
    name: 'components/alerts',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/ui/Alert.vue'],resolve
      )
  },
  {
    path: '/components/avatar',
    meta: {
      breadcrumb: true
    },
    name: 'components/avatars',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/ui/Avatar.vue'],resolve
      )
  },
  {
    path: '/components/badge',
    meta: {
      breadcrumb: true
    },
    name: 'components/badges',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/ui/Badge.vue'],resolve
      )
  },
  {
    path: '/components/button',
    meta: {
      breadcrumb: true
    },
    name: 'components/buttons',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/ui/Button.vue'],resolve
      )
  },
  {
    path: '/components/parallax',
    meta: {
      breadcrumb: true
    },
    name: 'components/parallax',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/ui/Parallax.vue'],resolve
      )
  },
  {
    path: '/components/snackbar',
    meta: {
      breadcrumb: true
    },
    name: 'components/snackbar',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/ui/Snackbar.vue'],resolve
      )
  },
  {
    path: '/components/chip',
    meta: {
      breadcrumb: true
    },
    name: 'components/chips',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/ui/Chip.vue'],resolve
      )
  },
  {
    path: '/components/card',
    meta: {
      breadcrumb: true
    },
    name: 'components/cards',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/ui/Cards.vue'],resolve
      )
  },
  {
    path: '/components/table',
    meta: {
      breadcrumb: true
    },
    name: 'components/tables',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/ui/Tables.vue'],resolve
      )
  },
  {
    path: '/components/carousel',
    meta: {
      breadcrumb: true
    },
    name: 'components/carousels',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/ui/Carousels.vue'],resolve
      )
  },
  {
    path: '/components/dialog',
    meta: {
      breadcrumb: true
    },
    name: 'components/dialogs',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/ui/Dialogs.vue'],resolve
      )
  },
  {
    path: '/components/icon',
    meta: {
      breadcrumb: true
    },
    name: 'components/icons',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/ui/Icon.vue'],resolve
      )
  },
  {
    path: '/components/progress',
    meta: {
      breadcrumb: true
    },
    name: 'components/progress',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/ui/Progress.vue'],resolve
      )
  },
  {
    path: '/components/slider',
    meta: {
      breadcrumb: true
    },
    name: 'components/sliders',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/ui/Slider.vue'],resolve
      )
  },
  {
    path: '/components/tooltip',
    meta: {
      breadcrumb: true
    },
    name: 'components/tooltips',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/ui/Tooltip.vue'],resolve
      )
  },
  {
    path: '/components/pagination',
    meta: {
      breadcrumb: true
    },
    name: 'components/paginations',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/ui/Pagination.vue'],resolve
      )
  },
  {
    path: '/pickers/datepicker',
    meta: {
      breadcrumb: true
    },
    name: 'pickers/datepicker',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/ui/Datepicker.vue'],resolve
      )
  },
  {
    path: '/components/typography',
    meta: {
      breadcrumb: true
    },
    name: 'components/typography',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/ui/Typography.vue'],resolve
      )
  },
  {
    path: '/components/color',
    meta: {
      breadcrumb: true
    },
    name: 'components/color',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/ui/Colors.vue'],resolve
      )
  },
  {
    path: '/pickers/timepicker',
    meta: {
      breadcrumb: true
    },
    name: 'pickers/timepicker',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/ui/Timepicker.vue'],resolve
      )
  },
  {
    path: '/layout/bottomsheets',
    meta: {
      breadcrumb: true
    },
    name: 'components/bottom-sheets',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/layout/BottomSheets.vue'],resolve
      )
  },
  {
    path: '/layout/expansion-panel',
    meta: {
      breadcrumb: true
    },
    name: 'components/expansion-panels',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/layout/ExpansionPanels.vue'],resolve
      )
  },
  {
    path: '/layout/footer',
    meta: {
      breadcrumb: true
    },
    name: 'components/footer',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/layout/Footers.vue'],resolve
      )
  },
  {
    path: '/layout/timeline',
    meta: {
      breadcrumb: true
    },
    name: 'components/timeline',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/layout/Timeline.vue'],resolve
      )
  },
  {
    path: '/layout/list',
    meta: {
      breadcrumb: true
    },
    name: 'components/lists',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/layout/Lists.vue'],resolve
      )
  },
  {
    path: '/layout/toolbar',
    meta: {
      breadcrumb: true
    },
    name: 'components/toolbar',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/layout/Toolbar.vue'],resolve
      )
  },
  {
    path: '/layout/jumbotron',
    meta: {
      breadcrumb: true
    },
    name: 'components/jumbotrons',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/layout/Jumbotrons.vue'],resolve
      )
  },
  {
    path: '/layout/menu',
    meta: {
      breadcrumb: true
    },
    name: 'components/menus',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/layout/Menus.vue'],resolve
      )
  },
  {
    path: '/layout/navigation-drawer',
    meta: {
      breadcrumb: true
    },
    name: 'components/navigation-drawers',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/layout/NavigationDrawers.vue'],resolve
      )
  },
  {
    path: '/layout/tabs',
    meta: {
      breadcrumb: true
    },
    name: 'components/tabs',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/layout/Tabs.vue'],resolve
      )
  },
  {
    path: '/forms/basic',
    meta: {
      breadcrumb: true
    },
    name: 'components/basic-forms',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/form/BasicForms.vue'],resolve
      )
  },
  {
    path: '/forms/selects',
    meta: {
      breadcrumb: true
    },
    name: 'components/selects',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/form/Selects.vue'],resolve
      )
  },
  {
    path: '/forms/editor',
    meta: {
      breadcrumb: true
    },
    name: 'components/editors',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/form/Editors.vue'],resolve
      )
  },
  {
    path: '/forms/selection-controls',
    meta: {
      breadcrumb: true
    },
    name: 'components/selection-controls',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/form/SelectionControls.vue'],resolve
      )
  },
  {
    path: '/forms/text-fields',
    meta: {
      breadcrumb: true
    },
    name: 'components/text-fields',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/form/TextFields.vue'],resolve
      )
  },
  {
    path: '/forms/steppers',
    meta: {
      breadcrumb: true
    },
    name: 'components/steppers',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/form/Steppers.vue'],resolve
      )
  },
  {
    path: '/widgets/social',
    meta: {
      breadcrumb: true
    },
    name: 'components/social',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/widgets/Social.vue'],resolve
      )
  },
  {
    path: '/widgets/post',
    meta: {
      breadcrumb: true
    },
    name: 'components/widget-post',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/widgets/Post.vue'],resolve
      )
  },
  {
    path: '/widgets/statistic',
    meta: {
      breadcrumb: true
    },
    name: 'components/statistic',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/widgets/Statistic.vue'],resolve
      )
  },
  {
    path: '/widgets/chart',
    meta: {
      breadcrumb: true
    },
    name: 'components/chart',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/widgets/Chart.vue'],resolve
      )
  },
  {
    path: '/widgets/list',
    meta: {
      breadcrumb: true
    },
    name: 'components/widget-list',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/pages/widgets/List.vue'],resolve
      )
  },
  {
    path: '/prod/SerchList',
    meta: {
      breadcrumb: true,
      title: '产品流程4'
    },
    name: 'prod/SerchList',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodFlow/searchFlow/SearchList.vue'],resolve
      )
  },
  {
    path: '/prod/myWork',
    meta: {
      breadcrumb: true,
      title: '我的工作台'
    },
    name: 'MyWork',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodFlow/cardFlow/cardPatenProd.vue'],resolve
      )
  },
  {
    path: '/prod/myfavorite',
    meta: {
      breadcrumb: true,
      title: '我收藏的产品'
    },
    name: 'MyProd',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodFlow/cardFlow/cardPatenProd3.vue'],resolve
      )
  },
  {
    path: '/prod/cardPatenProd3',
    meta: {
      breadcrumb: true,
      title: '产品流程2'
    },
    name: 'prod/cardPatenProd3',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodFlow/cardFlow/cardPatenProd3.vue'],resolve
      )
  },
  {
    path: '/prod/deposit2',
    meta: {
      breadcrumb: true,
      title: '产品展现2'
    },
    name: 'prod/deposit2',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodInfo/tags/deposit2.vue'],resolve
      )
  },
  {
    path: '/prod/rbPrivateProd',
    meta: {
      breadcrumb: true,
      title: '个人存款组'
    },
    name: 'prod/rbPrivateProd',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require([`@/views/prodFactory/prodInfo/tags/rbPrivateProd.vue`],resolve
      )
  },
{
    path: '/prod/rbPrivateProds',
        meta: {
    breadcrumb: true,
        title: '活期产品组'
},
    name: 'prod/rbPrivateProds',
        component: (resolve) =>
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy-once" */
            require([`@/views/prodFactory/prodInfo/tags/rbPrivateProds.vue`],resolve
)
},
  {
    path: '/prod/rbPublicProd',
    meta: {
      breadcrumb: true,
      title: '对公存款组'
    },
    name: 'prod/rbPublicProd',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodInfo/tags/rbPublicProd.vue'],resolve
      )
  },
  {
    path: '/prod/rbHorizontalProd',
    meta: {
      breadcrumb: true,
      title: '同业存款组'
    },
    name: 'prod/rbHorizontalProd',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodInfo/tags/rbHorizontalProd.vue'],resolve
      )
  },
  {
    path: '/propertyManage/muneManage',
    meta: {
      breadcrumb: true,
      title: '菜单管理'
    },
    name: 'propertyManage/muneManage',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/propertyManage/muneManage.vue'],resolve
      )
  },
  {
    path: '/prod/rbBaseProd',
    meta: {
      breadcrumb: true,
      title: '存款基础产品组'
    },
    name: 'rbBaseProd',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodInfo/tags/rbBaseProd.vue'],resolve
      )
  },
  {
    path: '/prod/clPrivateProd',
    meta: {
      breadcrumb: true,
      title: '对私贷款组'
    },
    name: 'prod/clPrivateProd',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodInfo/tags/clPrivateProd.vue'],resolve
      )
  },
  {
    path: '/prod/clPublicProd',
    meta: {
      breadcrumb: true,
      title: '对公贷款组'
    },
    name: 'prod/clPublicProd',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodInfo/tags/clPublicProd.vue'],resolve
      )
  },
  {
    path: '/prod/clDiscountProd',
    meta: {
      breadcrumb: true,
      title: '贴现组'
    },
    name: 'prod/clDiscountProd',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodInfo/tags/clDiscountProd.vue'],resolve
      )
  },
  {
    path: '/prod/clAdvancesProd',
    meta: {
      breadcrumb: true,
      title: '垫款组'
    },
    name: 'prod/clAdvancesProd',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodInfo/tags/clAdvancesProd.vue'],resolve
      )
  },
  {
    path: '/prod/clEntrustedProd',
    meta: {
      breadcrumb: true,
      title: '委托贷款组'
    },
    name: 'prod/clEntrustedProd',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodInfo/tags/clEntrustedProd.vue'],resolve
      )
  },
  {
    path: '/prod/clSyndicatedProd',
    meta: {
      breadcrumb: true,
      title: '银团贷款组'
    },
    name: 'prod/clSyndicatedProd',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodInfo/tags/clSyndicatedProd.vue'],resolve
      )
  },
  {
    path: '/prod/clBaseProd',
    meta: {
      breadcrumb: true,
      title: '贷款基础产品组'
    },
    name: 'prod/clBaseProd',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodInfo/tags/clBaseProd.vue'],resolve
      )
  },
  {
    path: '/prod/glInternalProd',
    meta: {
      breadcrumb: true,
      title: '内部账组'
    },
    name: 'prod/glInternalProd',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodInfo/tags/glInternalProd.vue'],resolve
      )
  },
  {
    path: '/prod/glToHorizontalProd',
    meta: {
      breadcrumb: true,
      title: '存放同业组'
    },
    name: 'prod/glToHorizontalProd',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodInfo/tags/glToHorizontalProd.vue'],resolve
      )
  },
  {
    path: '/prod/glPromHorizontalProd',
    meta: {
      breadcrumb: true,
      title: '同业存放组'
    },
    name: 'prod/glPromHorizontalProd',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodInfo/tags/glPromHorizontalProd.vue'],resolve
      )
  },
  {
    path: '/prod/glBaseProd',
    meta: {
      breadcrumb: true,
      title: '内部账基础产品组'
    },
    name: 'prod/glBaseProd',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodInfo/tags/glBaseProd.vue'],resolve
      )
  },
  {
    path: '/diff/prodDiff',
    meta: {
      breadcrumb: true,
      title: '差异对比'
    },
    name: 'diff/prodDiff',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodDiff/prodDiff.vue'],resolve
      )
  },
  {
    path: '/diff/prodDiff',
    meta: {
      breadcrumb: true,
      title: '差异对比2'
    },
    name: 'diffList',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodDiff/diffList/diffList.vue'],resolve
      )
  },
  {
    path: '/cmbchina/prodCmb',
    meta: {
      breadcrumb: true,
      title: '产品目录'
    },
    name: 'prodCmb',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodFlow/tableFlow/prodCmb.vue'],resolve
      )
  },

  {
    path: '/prod/deposit',
    meta: {
      breadcrumb: true,
      title: '产品信息'
    },
    name: 'prod/deposit',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodInfo/tags/deposit.vue'],resolve
      )
  },
  {
    path: '/userWork/userWorkTags',
    meta: {
      breadcrumb: true,
      title: '我的工作台'
    },
    name: 'userWorkTags',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/userFlow/userWork/userWorkTags.vue'],resolve
      )
  },
  {
    path: '/userWork/indexFlow',
    meta: {
      breadcrumb: true,
      title: '我的工作台'
    },
    name: 'userIndexFlow',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/userFlow/indexFlow/indexFlow2.vue'],resolve
      )
  },
  {
    path: '/userFlow/tranDataIndex',
    meta: {
      breadcrumb: true,
      title: '交易详细信息'
    },
    name: 'tranDataIndex',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/userFlow/transactionInfo/tranDataIndex.vue'],resolve)
  },

    {
        path: '/userFlow/tranDataClIndex',
        meta: {
            breadcrumb: true,
            title: '交易详细信息'
        },
        name: 'tranDataClIndex',
        component: (resolve) =>
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy-once" */
            require(['@/views/userFlow/transactionInfo/tranDataClIndex.vue'],resolve)
    },

  {
    path: '/publish/publishForm',
    meta: {
      breadcrumb: true,
      title: '参数变动记录'
    },
    name: 'publishForm',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/userFlow/publish/publishDate.vue'],resolve
      )
  },
  {
    path: '/partner/partnerMain',
    meta: {
      breadcrumb: true,
      title: '合作方签约'
    },
    name: 'partner/partnerMain',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/nlManage/partnerManage/partnerMain.vue'],resolve
        )
  },
  {
    path: '/RbBaseProds',
    meta: {
      breadcrumb: true,
      title: '存款基础产品'
    },
    name: 'RbBaseProds',
    component: (resolve) =>
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        require(['@/views/prodFactory/prodInfo/RbBaseProds.vue'],resolve
      )
  },

    {
        path: 'GlBaseProds',
        meta: {
            breadcrumb: true,
            title: '内部账基础产品'
        },
        name: 'GlBaseProds',
        component: (resolve) =>
            require(['@/views/prodFactory/prodInfo/GlBaseProds.vue'],resolve
            )
    },

    {
        path: '/GlSoldProds',
        meta: {
            breadcrumb: true,
            title: '内部账可售产品'
        },
        name: 'GlSoldProds',
        component: (resolve) =>
            require(['@/views/prodFactory/prodInfo/GlSoldProds.vue'],resolve
            )
    },

{
    path: '/RbSoldProds',
        meta: {
    breadcrumb: true,
        title: '存款可售产品'
},
    name: 'RbSoldProds',
        component: (resolve) =>
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy-once" */
            require(['@/views/prodFactory/prodInfo/RbSoldProds.vue'],resolve)
},
    {
        path: '/ClBaseProds',
        meta: {
            breadcrumb: true,
            title: '贷款基础产品'
        },
        name: 'ClBaseProds',
        component: (resolve) =>
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy-once" */
            require(['@/views/prodFactory/prodInfo/ClBaseProds.vue'],resolve
            )
    },
    {
        path: '/ClSoldProds',
        meta: {
            breadcrumb: true,
            title: '贷款可售产品'
        },
        name: 'ClSoldProds',
        component: (resolve) =>
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy-once" */
            require(['@/views/prodFactory/prodInfo/ClSoldProds.vue'],resolve)
    },
  {
    path: '/paramManage',
    meta: {
      breadcrumb: true,
      title: '参数管理'
    },
    name: 'paramManage',
    component: (resolve) =>
    /* webpackChunkName: "routes" */
    /* webpackMode: "lazy-once" */
    require(['@/views/baseTable/paramManage.vue'],resolve)
  },
{
    path: '/transManage',
        meta: {
    breadcrumb: true,
        title: '交易管理'
},
    name: 'transManage',
        component: (resolve) =>
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy-once" */
            require(['@/views/baseTable/transManage.vue'],resolve
)
},

{
    path: '/prodCmbs',
        meta: {
    breadcrumb: true,
        title: '产品目录'
},
    name: 'prodCmbs',
        component: (resolve) =>
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy-once" */
            require(['@/views/prodFactory/prodFlow/windowsFlow/prodCmbs.vue'],resolve)
},
    {
        path: '/prodCompareTitle',
        meta: {
            breadcrumb: true,
            title: '产品对比'
        },
        name: 'prodCompareTitle',
        component: (resolve) =>
            require(['@/views/prodFactory/prodDiff/prodCompareTitle.vue'],resolve)
    },

    {
        path: '/prodWindow',
        meta: {
            breadcrumb: true,
            title: '产品展示'
        },
        name: 'prodWindow',
        component: (resolve) =>
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy-once" */
            require(['@/views/prodFactory/prodFlow/windowsFlow/prodWindow.vue'],resolve)
    },


{
    path: '/tableInfo',
    meta: {
    breadcrumb: true,
    title: '参数信息'
    },
    name: 'tableInfo',
       component: (resolve) =>
    /* webpackChunkName: "routes" */
    /* webpackMode: "lazy-once" */
    require(['@/views/baseTable/tables/tableInfo.vue'],resolve)
},
{
    path: '/systemManageIndex',
        meta: {
    breadcrumb: true,
        title: '系统管理'
},
    name: 'systemManageIndex',
        component: (resolve) =>
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy-once" */
            require(['@/views/systemManage/systemManageIndex.vue'],resolve
)
},
{
    path: '/permManageIndex',
        meta: {
    breadcrumb: true,
        title: '权限管理'
},
    name: 'permManageIndex',
        component: (resolve) =>
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy-once" */
            require(['@/views/permManage/permManageIndex.vue'],resolve)
},
    {
        path: '/userInfoIndex',
        meta: {
            breadcrumb: true,
            title: '用户信息管理'
        },
        name: 'userInfoIndex',
        component: (resolve) =>
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy-once" */
            require(['@/views/userFlow/userManagement/userInfoIndex.vue'],resolve)
    },
    {
        path: '/upload',
        meta: {
            breadcrumb: true,
            title: '上传测试'
        },
        name: 'upload',
        component: (resolve) =>
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy-once" */
            require(['@/views/systemManage/upload/upload.vue'],resolve)
    },
];