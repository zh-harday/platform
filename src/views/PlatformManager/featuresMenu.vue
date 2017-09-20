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
                                <el-button style="color:#5c6b77" type="text" @click="addMenu(item)">
                                    <Icon size="20" type="plus-round"></Icon>
                                </el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <el-table :show-header="false" :data="item.children" border style="width: 100%">
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
                                <el-button style="color:#5c6b77" type="text" @click="addMenu(scope.row)">
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
                <el-form :model="addFormData" ref="addFormData">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="名称" prop="name" :label-width="addFormLabelWidth">
                                    <el-input v-model="addFormData.name" auto-complete="off"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="链接" prop="link" :label-width="addFormLabelWidth">
                                    <el-input v-model="addFormData.link" auto-complete="off"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="创建日期" prop="creatDate" :label-width="addFormLabelWidth">
                                    <el-input v-model="addFormData.creatDate" auto-complete="off"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="修改日期" prop="modifyDate" :label-width="addFormLabelWidth">
                                    <el-input v-model="addFormData.modifyDate" auto-complete="off"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <div class="grid-content bg-purple-dark">
                                <el-form-item label="备注" prop="remarks" :label-width="addFormLabelWidth">
                                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="addFormData.remarks">
                                    </el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="determin">确 定</el-button>
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
            MenutableData1: [],
            MenutableData2: [],
            menus: [],
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
            addFormLabelWidth: "",
            dialogFormVisible1: false,
            addFormData: {
                name: "",
                link: "",
                creatDate: "",
                modifyDate: "",
                remarks: "",
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
                        },this);
                        this.menus = getNodes(res.data.result);
                        console.log(this.menus);
                        // console.log(this.menus);
                    } else if (res.status == '403') {
                        alert(res.data.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        addMenu(row) { //添加
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
            // console.log(row)
            row.editFlag = !row.editFlag;
        },
        deletMenu(index, row) { //删除
            row.splice(index, 1);
        },
        determin() { //确定
            this.featuresTabData.push(this.addFormData);
            this.addFormData = {};
            this.dialogFormVisible1 = false;
            // this.$refs.addFormData.resetFields();
            // this.$refs['addFormData'].resetFields();
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
