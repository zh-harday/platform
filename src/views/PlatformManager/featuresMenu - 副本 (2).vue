<template>
    <section>
        <!-- 这是功能菜单 -->
        <div>
            
            <!-- sys menu end -->
            <el-dialog title="新建" :visible.sync="dialogFormVisible1">
                <el-form :model="addMenusFormData" ref="addMenusFormData" label-position="left">
                    <el-row :gutter="20">
                        <el-col :span="12" style="text-align:center;margin-bottom:20px;">
                            <el-radio class="radio" v-model="radio" label="1">菜单</el-radio>
                        </el-col>
                        <el-col :span="12" style="text-align:center;margin-bottom:20px;">
                            <el-radio class="radio" v-model="radio" label="2">按钮</el-radio>
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
      radio: "",
      type: 1,
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
            // console.log(res.data.result);
            res.data.result.forEach(function(item) {
              item.createDate = getDate(item.createDate);
              item.versionRecord = getDate(item.versionRecord);
            }, this);
            this.menus = getNodes(res.data.result);
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
        // this.radioBtn = false;
      }
      if (row.id == null) {
        this.parentId = "0";
        // this.radioBtn = false;
      } else if (row.id != null && num == 1) {
        // alert();
        this.parentId = this.rowMenuID.id;
        // this.radioBtn = true;
      } else if (num == 2) {
        this.parentId = this.rowMenuID.id;
        // this.radioBtn = false;
      }
      this.isEdit = false;
      let new_addFormData = {
        name: "",
        link: "",
        creatDate: "",
        modifyDate: "",
        remarks: "",
        editFlag: false
      };
      if (row == 0) {
        this.parentId = "0";
      }
      this.addFormData = new_addFormData;
      this.dialogFormVisible1 = true;
    },
    editMenu(row, parent, type) {
      //编辑
      console.log(row);
      // alert(888);
      if (type == "parent") {
        this.parentId = "0";
        // alert(666);
      } else if (type == "children") {
        this.parentId = row.parentId;
        // this.parentId = false;
      }
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
      console.log(this.addMenusFormData);
      console.log(this.radio);
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
          parentId: this.parentId
          // icon: '',
          // sort: 1,
          // type: '',
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

      > div {
        // width: 230px;
        height: 51px;
        float: left;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #dfe6ec;
        border-right: none;
      }
      > div:last-child {
        border-right: 1px solid #dfe6ec;
      }
    }
    .menus {
      width: 100%;
      height: 50px;
      overflow: hidden;
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
