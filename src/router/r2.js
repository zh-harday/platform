const r2 = [
    {
        path: '/homeContent', //home/首页
        name: 'homeContent',
        component: resolve => require(['../views/home/homeContent.vue'], resolve)
    }, 
    {
        path: 'featuresMenu', //home/平台管理/功能菜单
        name: 'featuresMenu',
        component: resolve => require(['../views/PlatformManager/featuresMenu.vue'], resolve)
    },
    {
        path: 'roleManger', //home/平台管理/角色管理
        name: 'roleManger',
        component: resolve => require(['../views/PlatformManager/roleManger.vue'], resolve)
    },
    {
        path: 'userList', //home/平台管理/用户列表
        name: 'userList',
        component: resolve => require(['../views/PlatformManager/userList.vue'], resolve)
    },
    {
        path: 'newsBulletin', //home/平台管理/消息公告
        name: 'newsBulletin',
        component: resolve => require(['../views/PlatformManager/newsBulletin.vue'], resolve)
    },
    {
        path: 'customerManagement', //home/平台管理/客户管理
        name: 'customerManagement',
        component: resolve => require(['../views/PlatformManager/customerManagement.vue'], resolve)
    },
    {
        path: 'customerPrivilege', //home/平台管理/客户权限
        name: 'customerPrivilege',
        component: resolve => require(['../views/PlatformManager/customerPrivilege.vue'], resolve)
    },
    {
        path: 'leadAssistant', //home/平台管理/客户权限
        name: 'leadAssistant',
        component: resolve => require(['../views/PlatformManager/leadAssistant.vue'], resolve)
    },
    {
        path: 'memberManagement', //home/平台管理/客户权限
        name: 'memberManagement',
        component: resolve => require(['../views/PlatformManager/memberManagement.vue'], resolve)
    },
    {
        path: 'ParameterConfiguration', //home/平台管理/客户权限
        name: 'ParameterConfiguration',
        component: resolve => require(['../views/PlatformManager/ParameterConfiguration.vue'], resolve)
    },
]
export default r2
