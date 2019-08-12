# Ensemble-om
[TOC]

##功能列表
- [ ] 产品参数导入、导出
- [ ] 操作记录打印
- [X] 各个业务流程之间的事件驱动，单页面的按钮事件
- [X] 挡板数据取现有真实产品
- [X] 产品信息展示界面页签
- [X] 差异对比遗留问题：差异数据高亮，事件控制只显示差异列，对比产品移除和添加对比的实现
- [X] 用户权限问题：用户针对菜单权限、参数流程控制的权限
- [ ] 参数管理页面的展示（暂只留菜单显示，功能待实现）
- [X] 输入框控件、日历控件问题、下拉列表模糊搜索
- [ ] 浏览器兼容性问题


## 参考案例
> 打印功能
- https://vue-app-demo.harryho.org/

##技术支撑
> **技术语言：vue.js**
> 选择原因：轻巧、高性能、可组件化的MVVM库，同时拥有非常容易上手的API；是一个构建数据驱动的 web 界面的渐进式框架。Vue.js 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。核心是一个响应的数据绑定系统。
> **UI：Vuetify.js 基于 Google’s Material Design**
> 选择原因：Material Design 是Google在2014年开发者大会上首次提出的设计语言（风格）。UI拥有强大的后台支撑，清楚详细的API
> Material Design包含以下几个元素：
> > 鲜活的色彩
> > 空间的层级
> > 流畅的动画
> > 多样的组件

## Mock
- 样例：http://mockjs.com/examples.html

## URL 加密
- https://my.oschina.net/Lady/blog/1814825


办公网： 10.7.94.150  wet	123| root root 数据库root root123

nohup java -jar ensemble-om-.jar
forever restart www