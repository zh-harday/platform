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
                    <div>类型</div>
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
                        <el-button style="color:#5c6b77" type="text" @click="addMenuBtn(0,0)">
                            <Icon size="20" type="plus-round"></Icon>
                        </el-button>
                    </div>
                </el-col>
            </el-row>
            <!-- sys menu -->
            <!-- 一级菜单 start -->
            <el-row>
                <el-col :span="24" v-for="(item,index) in menus" :key="item">
                    <el-row class="common sys_menu_head_2">
                        <el-col :span="4" class="menusBgc">
                            <div>{{item.menuName}}</div>
                        </el-col>
                        <el-col :span="4" class="menusBgc">
                            <div>{{item.url}}</div>
                        </el-col>
                        <el-col :span="4" class="menusBgc">
                            <div>{{item.createDate}}</div>
                        </el-col>
                        <el-col :span="4" class="menusBgc">
                            <div>{{item.versionRecord}}</div>
                        </el-col>
                        <el-col :span="4" class="menusBgc">
                            <div>{{item.description}}</div>
                        </el-col>
                        <el-col :span="4" class="menusBgc">
                            <div>
                                <el-button style="color:#5c6b77" type="text" @click="addMenuBtn(item,1)">
                                    <Icon size="20" type="plus-round"></Icon>&nbsp;&nbsp;&nbsp;</el-button>
                                <el-button style="color:#5c6b77" type="text" @click="editMenu(item,parent,'parent')">
                                    <Icon size="20" type="compose"></Icon>&nbsp;&nbsp;&nbsp;</el-button>
                                <el-button style="color:#5c6b77" type="text" @click="deletMenuA(item)">
                                    <Icon size="20" type="trash-a"></Icon>
                                </el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <!-- 一级菜单 end -->
                    <!-- 二级菜单 start -->
                    <el-row class="common sys_menu_head_2">
                        <el-col v-for="list in item.children" :key="list.id" :span="24">
                            <el-row>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>{{list.menuName}}</div>
                                </el-col>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>{{list.url}}</div>
                                </el-col>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>{{list.createDate}}</div>
                                </el-col>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>{{list.versionRecord}}</div>
                                </el-col>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>{{list.description}}</div>
                                </el-col>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>
                                        <el-button style="color:#5c6b77" type="text" @click="addMenuBtn(list,2)">
                                            <Icon size="20" type="plus-round"></Icon>&nbsp;&nbsp;&nbsp;</el-button>
                                        <el-button style="color:#5c6b77" type="text" @click="editMenu(list,parent,'children')">
                                            <Icon size="20" type="compose"></Icon>&nbsp;&nbsp;&nbsp;</el-button>
                                        <el-button style="color:#5c6b77" type="text" @click="deletMenuA(list)">
                                            <Icon size="20" type="trash-a"></Icon>
                                        </el-button>
                                    </div>
                                </el-col>
                            </el-row>
                            <!-- 二级菜单 end -->
                            <!-- 三级菜单 start -->
                            <el-row v-for="ele in list.children" :key="ele.id" class="common sys_menu_head_2">
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>{{ele.menuName}}</div>
                                </el-col>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>{{ele.url}}</div>
                                </el-col>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>{{ele.createDate}}</div>
                                </el-col>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>{{ele.versionRecord}}</div>
                                </el-col>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>{{ele.description}}</div>
                                </el-col>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>
                                        <el-button style="color:#5c6b77" type="text" @click="addMenuBtn(ele,3)">
                                            <Icon size="20" type="plus-round"></Icon>&nbsp;&nbsp;&nbsp;</el-button>
                                        <el-button style="color:#5c6b77" type="text" @click="editMenu(ele,parent,'children')">
                                            <Icon size="20" type="compose"></Icon>&nbsp;&nbsp;&nbsp;</el-button>
                                        <el-button style="color:#5c6b77" type="text" @click="deletMenuA(ele)">
                                            <Icon size="20" type="trash-a"></Icon>
                                        </el-button>
                                    </div>
                                </el-col>
                            </el-row>
                            <!-- 三级菜单 end -->
                            <!-- 三级按钮 start-->
                                <el-row v-for="ele in list.buttons" :key="ele.id" class="common sys_menu_head_2">
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>{{ele.menuName}}</div>
                                </el-col>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>{{ele.url}}</div>
                                </el-col>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>{{ele.createDate}}</div>
                                </el-col>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>{{ele.versionRecord}}</div>
                                </el-col>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>{{ele.description}}</div>
                                </el-col>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>
                                        <el-button style="color:#5c6b77" type="text" @click="addMenuBtn(ele,3)">
                                            <!-- <Icon size="20" type="plus-round"></Icon>&nbsp;&nbsp;&nbsp; -->
                                        </el-button>
                                        <el-button style="color:#5c6b77" type="text" @click="editMenu(ele,parent,'children')">
                                            <Icon size="20" type="compose"></Icon>&nbsp;&nbsp;&nbsp;
                                        </el-button>
                                        <el-button style="color:#5c6b77" type="text" @click="deletMenuA(ele)">
                                            <Icon size="20" type="trash-a"></Icon>
                                        </el-button>
                                    </div>
                                </el-col>
                            </el-row>
                            <!-- 三级按钮 end -->
                        </el-col>
                    </el-row>
                    <!-- 二级 Buttons -->
                    <el-row class="common sys_menu_head_2">
                        <el-col v-for="list in item.buttons" :key="list.id" :span="24">
                            <el-row>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>{{list.menuName}}</div>
                                </el-col>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>{{list.url}}</div>
                                </el-col>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>{{list.createDate}}</div>
                                </el-col>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>{{list.versionRecord}}</div>
                                </el-col>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>{{list.description}}</div>
                                </el-col>
                                <el-col :span="4" style="border-right: 1px solid #dfe6ec;">
                                    <div>
                                        <el-button style="color:#5c6b77" type="text" @click="addMenuBtn(list,2)">
                                            <Icon size="20" type="plus-round"></Icon>&nbsp;&nbsp;&nbsp;</el-button>
                                        <el-button style="color:#5c6b77" type="text" @click="editMenu(list,parent,'children')">
                                            <Icon size="20" type="compose"></Icon>&nbsp;&nbsp;&nbsp;</el-button>
                                        <el-button style="color:#5c6b77" type="text" @click="deletMenuA(list)">
                                            <Icon size="20" type="trash-a"></Icon>
                                        </el-button>
                                    </div>
                                </el-col>
                            </el-row>
                            <!-- 二级按钮 end -->
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <!-- sys menu end -->
            <el-dialog title="新建" :visible.sync="dialogFormVisible1">
                <el-form :model="addMenusFormData" ref="addMenusFormData" label-position="left">
                    <el-row :gutter="20">
                        <el-col :span="12" style="text-align:center;margin-bottom:20px;">
                            <el-radio :disabled="isDisableMenu" class="radio" v-model="type" label=0>菜单</el-radio>
                        </el-col>
                        <el-col :span="12" style="text-align:center;margin-bottom:20px;">
                            <el-radio :disabled="isDisableBtn" class="radio" v-model="type" label=1>按钮</el-radio>
                        </el-col>
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
import { getNodes } from "common/js/config";
import { getDate } from "common/js/config";
export default {
  created() {
    this.sysMenuQueryList(); //查询功能菜单列表数据
  },
  data() {
    return {
      isDisableMenu: false,
      isDisableBtn: false,
      radio: 0,
      type: 0,
      radioBtn: false,
      checked: true,
      menus: [],
      rowMenuID: {}, //添加菜单pid
      parentId: "0",
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
      addMenusFormData: {
        //新建菜单表单
        menuName: "", //菜单名称
        url: "", //链接
        creatDate: "", //创建日期,
        versionRecord: "", //修改日期
        description: "", //备注
        editFlag: false
      }
    };
  },
  methods: {
    sysMenuQueryList() {
      //查询功能菜单列表数据
      this.$http
        .post(this.api + "/sysMenu/queryList", {})
        .then(res => {
          if (res.status == "200") {
            console.log(res.data.result);
            res.data.result.forEach(item => {
              item.createDate = getDate(item.createDate);
              item.versionRecord = getDate(item.versionRecord);
              if (item.children) {
                item.children.forEach(list => {
                  list.createDate = getDate(list.createDate);
                  list.versionRecord = getDate(list.versionRecord);
                  if (list.children) {
                    list.children.forEach(ele => {
                      ele.createDate = getDate(ele.createDate);
                      ele.versionRecord = getDate(ele.versionRecord);
                    });
                  }
                });
              }
            });
            res.data.result.forEach(item => {
              if (item.buttons) {
                //一级按钮
                item.buttons.map(a => {
                  a.createDate = getDate(a.createDate);
                  a.versionRecord = getDate(a.versionRecord);
                });
                if (item.children) {
                  //二级菜单
                  item.children.map(b => {
                    if (b.buttons) {
                      //二级按钮
                      b.buttons.map(c => {
                        c.createDate = getDate(c.createDate);
                        c.versionRecord = getDate(c.versionRecord);
                      });
                    }
                    if (b.children) {
                      //三级菜单
                      b.children.map(d => {
                        if (d.buttons) {
                          //三级按钮
                          d.buttons.map(e => {
                            e.createDate = getDate(e.createDate);
                            e.versionRecord = getDate(e.versionRecord);
                          });
                        }
                      });
                    }
                  });
                }
              }
            });
            // this.menus = getNodes(res.data.result);
            this.menus = res.data.result;
            // this.menus.forEach();
            console.log(this.menus);
            this.$Message.success(res.data.message);
          } else if (res.status == "403") {
            alert(res.data.message);
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    },
    addMenuBtn(row, num) {
      //添加
      console.log(row);
      this.rowMenuID = row; //保存当前行菜单信息
      if (num == 0) {
        //添加一级
        this.isDisableMenu = false;
        this.isDisableBtn = true;
        this.parentId = "0";
      } else if (num == 1) {
        //添加二级
        this.isDisableMenu = false;
        this.isDisableBtn = false;
        // alert(111);
      } else if (num == 2) {
        //添加三级
        this.isDisableMenu = true;
        this.isDisableBtn = false;
        // alert(111);
      } else if (num == 3) {
        //添加四级(不允许)
        this.isDisableMenu = true;
        this.isDisableBtn = true;
        return;
      }
      if (row == 0) {
        this.parentId = "0";
      } else {
        this.parentId = this.rowMenuID.id;
      }
      this.isEdit = false;
      let new_addMenusFormData = {
        name: "",
        link: "",
        creatDate: "",
        modifyDate: "",
        remarks: "",
        editFlag: false
      };
      this.addMenusFormData = new_addMenusFormData;
      this.dialogFormVisible1 = true;
    },
    editMenu(row, parent, type) {
      //编辑
      this.isEdit = true;
      console.log(row);
      // alert(888);
      if (type == "parent") {
        this.parentId = "0";
        // alert(666);
      } else if (type == "children") {
        this.parentId = row.parentId;
        // this.parentId = false;
      }
      this.isDisableMenu = true;
      this.isDisableBtn = true;
      this.rowMenuID = row;
      this.dialogFormVisible1 = true;
      this.isEdit = true;
      this.addMenusFormData.menuName = row.menuName;
      this.addMenusFormData.url = row.url;
      this.addMenusFormData.description = row.description;
      row.editFlag = !row.editFlag;
    },
    deletMenu(item) {
      //删除子菜单
      console.log("子菜单");
      console.log(item);
      this.deleteById(item);
      // item.splice(index, 1);
      item.menuName = "";
      item.url = "";
      item.createDate = "";
      item.versionRecord = "";
      item.description = "";
    },
    checkType() {
      //检查新增的是菜单还是按钮
      if (this.type == 0) {
        this.addMenusFormData.description = "菜单";
      } else {
        this.addMenusFormData.description = "按钮";
      }
      return this.addMenusFormData.description;
    },
    deletMenuA(item) {
      //删除一级菜单
      console.log(item);
      this.deleteById(item);
      item.menuName = "";
      item.url = "";
      item.createDate = "";
      item.versionRecord = "";
      item.description = "";
      // this.isItem = false;
      // console.log(item);
    },
    saveSysMenu() {
      //send 添加菜单的信息
      //   console.log(this.addMenusFormData);
      //   console.log(this.type);
      console.log(this.isEdit);
      this.addMenusFormData.description = this.checkType();
      this.type = Number(this.type);
      if (this.isEdit) {
        this.updateMenu();
        this.dialogFormVisible1 = false;
        return;
      }
      this.$http
        .post(this.api + "/sysMenu/save", {
          menuName: this.addMenusFormData.menuName,
          url: this.addMenusFormData.url,
          description: this.addMenusFormData.description,
          parentId: this.parentId,
          type: this.type
          // "icon": this.rowMenuID.icon,
          // "sort": 1,
          // "code": 'sys_menu',
        })
        .then(res => {
          if (res.status == "200") {
            console.log(res.data);
            this.$Message.success(res.data.message);
            this.sysMenuQueryList();
            this.addMenusFormData = {};
          } else if (res.status == "403") {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.addFormData = {};
      this.dialogFormVisible1 = false;
    },
    updateMenu() {
      //修改菜单信息
      console.log(this.rowMenuID.id);
      this.$http
        .post(this.api + "/sysMenu/update", {
          id: this.rowMenuID.id,
          menuName: this.addMenusFormData.menuName,
          url: this.addMenusFormData.url,
          description: this.addMenusFormData.description,
          parentId: this.parentId,
          type: this.type
          // icon: '',
          // sort: 1,
          // code: '',
        })
        .then(res => {
          if (res.status == "200") {
            this.sysMenuQueryList();
            this.$Message.success(res.data.message);
          } else if (res.status == "403") {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          this.$Message.error(res.data.message);
        });
    },
    deleteById(item) {
      //删除菜单
      this.$http
        .post(this.api + "/sysMenu/deleteById", {
          menuId: item.id
        })
        .then(res => {
          if (res.status == "200") {
            console.log(res.data);
            this.$Message.success(res.data.message);
            this.sysMenuQueryList();
          } else if (res.status == "403") {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    },
    getDate(date) {
      //获取日期
      console.log(date);
      return date;
    }
  }
};
</script>

<style lang="less" scoped>
section {
  > backg {
    background: red;
  }
  > div {
    background: #ffffff;
    padding: 24px;
    // overflow: hidden;
    .sys_menu_head {
      width: 100%;
      height: 50px;
      background: #2a3142;
      //   overflow: hidden;
      line-height: 50px;
      color: #ffffff;
      div {
        text-align: center;
        border: 1px solid #fff;
      }
    }
    .sys_menu_head_2 {
      width: 100%;
      //   height: 40px;
      //   overflow: hidden;
      line-height: 40px;
      box-sizing: border-box;
      border-bottom: 1px solid #dfe6ec;
      > div {
        // width: 230px;
        // height: 51px;
        float: left;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #dfe6ec;
        // border-right: none;
        border-bottom: none;
      }
      > div:last-child {
        border-right: 1px solid #dfe6ec;
      }
      .menusBgc{
          background: #cccccc;
      }
    }
    .menus {
      width: 100%;
      height: 50px;
      //   overflow: hidden;
      line-height: 50px;
      text-align: center;
      > div {
        border: 1px solid #cccccc;
        box-sizing: border-box;
      }
    }
  }
}
</style>
