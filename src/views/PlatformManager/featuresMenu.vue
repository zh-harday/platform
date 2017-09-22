<template>
    <section>
        <!-- 这是功能菜单 -->
        <div>
            <el-row class="common sys_menu_head">
                <el-col :span="4">
                    <div>名称</div>
                </el-col>
                <el-col :span="4">
                    <div>链接</div>
                </el-col>
                <el-col :span="4">
                    <div>创建日期</div>
                </el-col>
                <el-col :span="4">
                    <div>修改日期</div>
                </el-col>
                <el-col :span="4">
                    <div>备注</div>
                </el-col>
                <el-col :span="4">
                    <div>操作</div>
                </el-col>
            </el-row>
            <el-row class="common sys_menu_head_2">
                <el-col :span="4">
                    <div>功能菜单</div>
                </el-col>
                <el-col :span="4">
                </el-col>
                <el-col :span="4">
                </el-col>
                <el-col :span="4">
                </el-col>
                <el-col :span="4">
                </el-col>
                <el-col :span="4">
                    <div>
                        <el-button style="color:#5c6b77" type="text" @click="addMenuBtn({id: 0})">
                            <Icon size="20" type="plus-round"></Icon>
                        </el-button>
                    </div>
                </el-col>
            </el-row>
            <!-- sys menu -->
            <el-row>
                <el-col :span="24" v-for="(item,index) in menus" :key="item">
                    <el-row class="common sys_menu_head_2">
                        <el-col :span="4">
                            <div>{{item.menuName}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div>{{item.url}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div>{{item.createDate}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div>{{item.versionRecord}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div>{{item.description}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div>
                                <el-button style="color:#5c6b77" type="text" @click="addMenuBtn(item)">
                                    <Icon size="20" type="plus-round"></Icon>&nbsp;&nbsp;&nbsp;</el-button>
                                <el-button style="color:#5c6b77" type="text" @click="editMenu(item)">
                                    <Icon size="20" type="compose"></Icon>&nbsp;&nbsp;&nbsp;</el-button>
                                <el-button style="color:#5c6b77" type="text" @click="deletMenuA(item)">
                                    <Icon size="20" type="trash-a"></Icon>
                                </el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <el-table stripe :show-header="false" :data="item.children" border style="width: 100%">
                        <el-table-column prop="menuName" label="" align="center">
                        </el-table-column>
                        <el-table-column prop="url" label="" align="center">
                        </el-table-column>
                        <el-table-column prop="createDate" label="" align="center">
                        </el-table-column>
                        <el-table-column prop="versionRecord" label="" align="center">
                        </el-table-column>
                        <el-table-column prop="description" label="" align="center">
                        </el-table-column>
                        <el-table-column prop="operating" label="" align="center">
                            <template scope="scope">
                                <el-button style="color:#5c6b77" type="text" @click="addMenuBtn(scope.row)">
                                    <Icon size="20" type="plus-round"></Icon>&nbsp;&nbsp;&nbsp;</el-button>
                                <el-button style="color:#5c6b77" type="text" @click="editMenu(scope.row)">
                                    <Icon size="20" type="compose"></Icon>&nbsp;&nbsp;&nbsp;</el-button>
                                <el-button style="color:#5c6b77" type="text" @click.native.prevent="deletMenu(scope.$index, item.children)">
                                    <Icon size="20" type="trash-a"></Icon>
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <!-- sys menu end -->
            <el-dialog title="新建" :visible.sync="dialogFormVisible1">
                <el-form :model="addMenusFormData" ref="addMenusFormData" label-position="left">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="名称" prop="menuName" :label-width="addFormLabelWidth">
                                    <el-input v-model="addMenusFormData.menuName" auto-complete="off"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="链接" prop="url" :label-width="addFormLabelWidth">
                                    <el-input v-model="addMenusFormData.url" auto-complete="off"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <!-- <el-row :gutter="20">
                                                    <el-col :span="12">
                                                        <div class="grid-content bg-purple-dark">
                                                            <el-form-item label="创建日期" prop="creatDate" :label-width="addFormLabelWidth">
                                                                <el-date-picker @change="getDate" v-model="addMenusFormData.creatDate" type="datetime" placeholder="选择日期时间" style="width:100%" auto-complete="off">
                                                                </el-date-picker>
                                                            </el-form-item>
                                                        </div>
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <div class="grid-content bg-purple-dark">
                                                            <el-form-item label="修改日期" prop="versionRecord" :label-width="addFormLabelWidth">
                                                                <el-date-picker @change="getDate" v-model="addMenusFormData.versionRecord" type="datetime" placeholder="选择日期时间" style="width:100%" auto-complete="off">
                                                                </el-date-picker>
                                                            </el-form-item>
                                                        </div>
                                                    </el-col>
                                                </el-row> -->
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="备注" prop="description" :label-width="addFormLabelWidth">
                                    <el-input v-model="addMenusFormData.description" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                                    </el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="saveSysMenu">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </section>
</template>

<script>
import { getNodes } from 'common/js/config'
import { getDate } from 'common/js/config'
export default {
    created() {
        this.sysMenuQueryList();//查询功能菜单列表数据
    },
    data() {
        return {
            checked: true,
            menus: [],
            rowMenuID: {}, //添加菜单pid
            featuresTabData: [
                {
                    name: "日常办公",
                    link: "",
                    creatDate: "",
                    modifyDate: "",
                    remarks: "",
                    editFlag: false
                }
            ],
            isItem: true,
            isEdit: false,
            addFormLabelWidth: "120px",
            dialogFormVisible1: false,
            addMenusFormData: { //新建菜单表单
                menuName: "", //菜单名称
                url: "", //链接
                creatDate: "", //创建日期,
                versionRecord: "", //修改日期
                description: "", //备注
                editFlag: false
            }
        }
    },
    methods: {
        sysMenuQueryList() { //查询功能菜单列表数据
            this.$http.post('/api/sysMenu/queryList', {

            })
                .then(res => {
                    if (res.status == '200') {
                        console.log(res.data.result);
                        res.data.result.forEach(function(item) {
                            item.createDate = getDate(item.createDate);
                            item.versionRecord = getDate(item.versionRecord);
                        }, this);
                        this.menus = getNodes(res.data.result);
                        console.log(this.menus);
                        this.$Message.success(res.data.message);
                    } else if (res.status == '403') {
                        alert(res.data.message);
                        this.$Message.error(res.data.message);
                    }
                })
                .catch(error => {
                    this.$Message.error('请求超时');
                })
        },
        addMenuBtn(row) { //添加
            this.rowMenuID = row; //保存当前行菜单信息
            this.isEdit = false;
            console.log(row);
            let new_addFormData = {
                name: "",
                link: "",
                creatDate: "",
                modifyDate: "",
                remarks: "",
                editFlag: false
            };
            this.addFormData = new_addFormData;
            this.dialogFormVisible1 = true;
        },
        editMenu(row) { //编辑
            console.log(row)
            this.rowMenuID = row;
            this.dialogFormVisible1 = true;
            this.isEdit = true;
            this.addMenusFormData.menuName = row.menuName;
            this.addMenusFormData.url = row.url;
            this.addMenusFormData.description = row.description;
            row.editFlag = !row.editFlag;
        },
        deletMenu(index, row) { //删除子菜单
            this.deleteById(row);
            row.splice(index, 1);
        },
        deletMenuA(item) { //删除一级菜单
            console.log(item);
            this.deleteById(item);
            item.menuName = '';
            item.url = '';
            item.createDate = '';
            item.versionRecord = '';
            item.description = '';
            // this.isItem = false;
            // console.log(item);
        },
        saveSysMenu() { //send 添加菜单的信息
            console.log(this.addMenusFormData);
            if (this.isEdit) {
                this.updateMenu();
                return;
            };
            this.$http.post('/api/sysMenu/save', {
                "menuName": this.addMenusFormData.menuName,
                "url": this.addMenusFormData.url,
                "description": this.addMenusFormData.description,
                "icon": this.rowMenuID.icon,
                "sort": 1,
                "parentId": this.rowMenuID.id,
                "type": this.rowMenuID.type,
                "code": 'sys_menu',
            })
                .then(res => {
                    if (res.status == '200') {
                        console.log(res.data);
                        this.$Message.success(res.data.message);
                        this.sysMenuQueryList();
                        this.addMenusFormData = {};
                    } else if (res.status == '403') {
                        this.$Message.error(res.data.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            this.addFormData = {};
            this.dialogFormVisible1 = false;
        },
        updateMenu() { //修改菜单信息
            this.$http.post('/api/sysMenu/update', {
                "menuName": this.addMenusFormData.menuName,
                "url": this.addMenusFormData.url,
                "description": this.addMenusFormData.description,
                "icon": this.rowMenuID.icon,
                "sort": 1,
                "parentId": this.rowMenuID.id,
                "type": this.rowMenuID.type,
                "code": 'sys_menu',
            })
                .then(res => {
                    if (res.status == '200') {
                        this.$Message.success(res.data.message);
                    } else if (res.status == '403') {
                        this.$Message.error(res.data.message);
                    }
                })
                .catch(error => {
                    this.$Message.error(res.data.message);
                })
        },
        deleteById(item) { //删除菜单
            this.$http.post('/api/sysMenu/deleteById', {
                menuId: item.id
            })
                .then(res => {
                    if (res.status == '200') {
                        console.log(res.data);
                        this.$Message.success(res.data.message)
                        this.sysMenuQueryList();
                    } else if (res.status == '403') {
                        this.$Message.error(res.data.message);
                    }
                })
                .catch(error => {
                    this.$Message.error('请求超时');
                })
        },
        getDate(date) { //获取日期
            console.log(date);
            return date;
        },
    },
}
</script>

<style lang="less" scoped>
section {
    >div {
        background: #ffffff;
        padding: 24px;
        overflow: hidden;
        .sys_menu_head {
            width: 100%;
            height: 50px;
            background: #2a3142;
            overflow: hidden;
            line-height: 50px;
            color: #ffffff;
            div {
                text-align: center;
                border: 1px solid #fff;
            }
        }
        .sys_menu_head_2 {
            width: 100%;
            height: 40px;
            overflow: hidden;
            line-height: 40px;
            box-sizing: border-box;
            div {
                text-align: center;
                box-sizing: border-box;
                border: 1px solid #dfe6ec;
            }
        }
        .menus {
            width: 100%;
            height: 50px;
            overflow: hidden;
            line-height: 50px;
            text-align: center;
            >div {
                border: 1px solid #cccccc;
                box-sizing: border-box;
            }
        }
    }
}
</style>
