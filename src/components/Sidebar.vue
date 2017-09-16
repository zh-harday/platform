<template>
    <div class="scllor">
        <div class="sidebar">
            <div class="portrait">
                <div class="portrait-top">
                    <img src="/static/img/默认头像.png">
                </div>
                <div class="user">
                    <div style="margin-top:55px;">
                        <div>你好,{{userName.name}} !</div>
                        <div>Administor</div>
                    </div>
                </div>
            </div>

            <el-menu v-if="!showOrHide.isShowSidebar" :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router @open="handleOpen" @close="handleClose">
                <el-submenu index="9">
                    <template slot="title">
                        <!-- <i class="el-icon-star-on"></i>平台管理 -->
                        <img style="margin-top: 18px;display: block;float: left;margin-right: 7px;" src="/static/img/wangluo.png" />
                        <span>{{title_09}}</span>
                    </template>
                    <el-menu-item index="featuresMenu" @click="addTab(title27, '/home/featuresMenu', 'featuresMenu')">{{title27}}</el-menu-item>
                    <el-menu-item index="roleManger" @click="addTab(title28, '/home/roleManger', 'roleManger')">{{title28}}</el-menu-item>
                    <el-menu-item index="userList" @click="addTab(title29, '/home/userList', 'userList')">{{title29}}</el-menu-item>
                    <el-menu-item index="newsBulletin" @click="addTab(title30, '/home/newsBulletin', 'newsBulletin')">{{title30}}</el-menu-item>
                    <el-menu-item index="customerManagement" @click="addTab(title31, '/home/customerManagement', 'customerManagement')">{{title31}}</el-menu-item>
                    <el-menu-item index="customerPrivilege" @click="addTab(title32, '/home/customerPrivilege', 'customerPrivilege')">{{title32}}</el-menu-item>
                    <el-menu-item index="leadAssistant" @click="addTab(title33, '/home/leadAssistant', 'leadAssistant')">{{title33}}</el-menu-item>
                    <el-menu-item index="memberManagement" @click="addTab(title34, '/home/memberManagement', 'memberManagement')">{{title34}}</el-menu-item>
                </el-submenu>
            </el-menu>
            <!-- <el-row>
                     <el-col :span="24" v-for="(menuItem,index) in theModel" :key="index">
                                                                                                <my-tree :model="menuItem"></my-tree>
                                                                                            </el-col>
                                                                                        </el-row> -->
            <!-- <ul id="zTree" class="ztree"></ul> -->
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import jq from "../../static/js/zTree/jquery-1.4.4.min.js";
// import zTree from "../../static/js/zTree/jquery.ztree.core";
import { getNodes } from 'common/js/config';
import myTree from 'components/treeMenu';
export default {
    components: { myTree },
    beforeCreate() { },
    created() { },
    mounted() { },
    computed: {
        onRoutes(state) {
            // alert(111);
            return this.$route.path.replace('/', '');
        },
        userName(state) {
            // alert(222);
            this.$store.state.login.userInfor = JSON.parse(sessionStorage.getItem('userInfor')) || {};
            return this.$store.state.login.userInfor;
        },
        um_id(state) {
            // alert(333);
            this.$store.state.login.logoSrc = JSON.parse(sessionStorage.getItem('merchants')) || {};
            return this.$store.state.login.merchants;
        },
        showOrHide() {
            if (JSON.parse(sessionStorage.getItem('showOrHide')) == '' || JSON.parse(sessionStorage.getItem('showOrHide')) == 'undefined') {
                this.$store.state.login.showOrHide.isVshowYe = 0;
                this.$store.state.login.showOrHide.isShowSidebar = 1;
                return this.$store.state.login.showOrHide;
            } else {
                this.$store.state.login.showOrHide = JSON.parse(sessionStorage.getItem('showOrHide')) || {};
                return this.$store.state.login.showOrHide;
            }
        }
    },
    data() {
        return {

            theModel: [],
            title_09: '平台管理',
            title27: '功能菜单',
            title28: '角色管理',
            title29: '用户列表',
            title30: '消息公告',
            title31: '客户管理',
            title32: '客户权限',
            title33: '领头助手',
            title34: '会员管理',

        }
    },
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        zTreeBeforeClick(treeId, treeNode, clickFlag) {
            // alert(1);
            // if (treeNode.level == 0) {
            //     var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            //     zTree.expandNode(treeNode);
            //     return false;
            // }
            // return true;
            // if (treeNode.hasOwnProperty('path')) {
            //     // alert(222);
            //     let title = treeNode.name;
            //     let url = treeNode.path;
            //     let name = url.substring(6);
            //     // console.log(title);
            //     // console.log(url);
            //     // console.log(name);
            //     this.addTab(title, url, name);
            // }
            // return (treeNode.id !== 1);
        },
        addTab(th, url, name) {
            this.$router.push({
                name: name
            })
            this.$store.commit({
                type: 'addTab',
                title: th,
                url: url,
                name: name
            })
            // alert(222)
        }
    }
}
</script>

<style lang="less" scoped>
.ztree * {
    font-size: 10pt;
    font-family: "Microsoft Yahei", Verdana, Simsun, "Segoe UI Web Light", "Segoe UI Light", "Segoe UI Web Regular", "Segoe UI", "Segoe UI Symbol", "Helvetica Neue", Arial
}

.ztree li ul {
    margin: 0;
    padding: 0
}

.ztree li {
    line-height: 30px;
}

.ztree li a {
    width: 200px;
    height: 30px;
    padding-top: 0px;
}

.ztree li a:hover {
    text-decoration: none;
    background-color: #E7E7E7;
}

.ztree li a span.button.switch {
    visibility: hidden
}

.ztree.showIcon li a span.button.switch {
    visibility: visible
}

.ztree li a.curSelectedNode {
    background-color: #D4D4D4;
    border: 0;
    height: 30px;
}

.ztree li span {
    line-height: 30px;
}

.ztree li span.button {
    margin-top: -7px;
}

.ztree li span.button.switch {
    width: 16px;
    height: 16px;
}

.ztree li a.level0 span {
    font-size: 150%;
    font-weight: bold;
}

.ztree li span.button.switch.level0 {
    width: 20px;
    height: 20px
}

.ztree li span.button.switch.level1 {
    width: 20px;
    height: 20px
}

.ztree li span.button.noline_open {
    background-position: 0 0;
}

.ztree li span.button.noline_close {
    background-position: -18px 0;
}

.ztree li span.button.noline_open.level0 {
    background-position: 0 -18px;
}

.ztree li span.button.noline_close.level0 {
    background-position: -18px -18px;
}

.div_el-menu-itemel-submenu__title {
    height: 56px;
    line-height: 56px;
    font-size: 14px;
    color: #bfcbd9;
    padding: 0 20px;
    cursor: pointer;
    position: relative;
    transition: border-color .3s, background-color .3s, color .3s;
    box-sizing: border-box;
    white-space: nowrap;
    &:hover {
        background: #48576a;
    }
}

.scllor {
    width: 196px;
    height: 100%;
    overflow: hidden;
    position: fixed;
}

.el-menu-item,
.el-submenu__title {
    height: 50px;
    line-height: 50px;
}

.sidebar {
    display: block;
    position: absolute;
    width: 213px;
    left: 0;
    top: 0;
    bottom: 0;
    background: #2E363F;
    overflow: scroll;
    overflow-x: hidden;
}


.portrait-top {
    width: 82px;
    height: 82px;
    border-radius: 50%;
    background: green;
    /*margin: auto;*/
    position: absolute;
    top: 32px;
    left: 62px;
    z-index: 111;
}

.portrait {
    background: #08122c;
    position: relative;
    height: 200px;
}

.user {
    width: 100%;
    height: 134px;
    /*background: red;*/
    background: #2E363F;
    position: absolute;
    bottom: -3px;
    text-align: center;
    font: 16px;
    color: #f1f3f7;
    /* line-height: 134px; */
}

.el-menu-vertical-demo {
    background: #2E363F;
}
</style>
