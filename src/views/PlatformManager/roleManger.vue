<template>
  <section>
    <!-- 这是角色管理 -->
    <div id="roleManger">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" class="addBtn" @click="addBtn">添加</el-button>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-dark saveRoleManger">
            <div>角色权限
              <span v-show="rowName != ''">({{ rowName }})</span>
            </div>
            <el-button type="primary" class="addBtn" @click="authorizationBtn">新增权限</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 角色管理 Dialog -->
      <el-dialog title="添加角色" :visible.sync="rolFormDialog">
        <el-form :model="rolFormData_L" ref="rolFormData_L" label-position="left">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="rolFormData_L.roleName" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="rolFormDialog = false">取 消</el-button>
          <el-button type="primary" @click="pushRolTabData_L">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 新增客户 Dialog End -->
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-table :data="rolTabData_L" border style="width: 100%" align="center">
              <el-table-column prop="roleName" label="角色名称" width="" align="center">
                <template scope="scope">
                  <span class="cursor" @click="findByRid(scope.row)">{{ scope.row.roleName }}</span>
                  <span v-if="scope.row.editFlag" class="cell-edit-input">
                    <el-input v-model="scope.row.roleName" placeholder=""></el-input>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="" align="center" min-width="100px">
                <template scope="scope">
                  <el-button v-if="!scope.row.isAdmin" @click="editSelecttionTab(scope.$index,scope.row)" type="primary" size="small">编辑</el-button>
                  <el-button v-if="!scope.row.isAdmin" @click="remove(scope.index,scope.row,rolTabData_L)" type="primary" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <el-row :gutter="0" class="roleName">
              <el-col :span="15" class="roleName_spanBoder">
                <div class="grid-content bg-purple-dark">
                  权限名称
                </div>
              </el-col>
              <el-col :span="9" class="roleName_spanBoder">
                <div class="grid-content bg-purple-dark">
                  操作
                </div>
              </el-col>
            </el-row>
            <!-- 权限列表 Start -->
            <!-- 权限列表 End -->
            <!-- sys menu -->
            <el-row v-if="menus_list" style="text-align: center;margin-top: 20px;">
              <el-col>暂无数据</el-col>
            </el-row>
            <el-row>
              <el-col :span="24" v-for="(item,index) in menus" :key="item">
                <el-row class="common sys_menu_head_2">
                  <el-col :span="15">
                    <div class="menuName">{{item.menuName}}</div>
                  </el-col>
                  <el-col :span='9'>
                    <div class="checkbox">
                      <el-checkbox :disabled="isAdmin" @change="handleSelectionChange1()" v-model="item.selected"></el-checkbox>
                    </div>
                  </el-col>
                </el-row>

                <el-row class="common sys_menu_head_2">
                  <el-col v-for="list in item.children" :key="list.id" :span="24">
                      <el-row style="border-bottom: 1px solid #dfe6ec;">
                        <el-col :span="15">
                          <div class="menuName">{{list.menuName}}</div>
                        </el-col>
                        <el-col :span='9'>
                          <div class="checkbox">
                            <el-checkbox :disabled="isAdmin" @change="handleSelectionChange2()" v-model="item.selected"></el-checkbox>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row v-for="ele in list.children" :key="ele.id" class="common sys_menu_head_2">
                        <!-- {{ele}} -->
                        <el-col :span="15">
                          <div class="menuName">{{ele.menuName}}</div>
                        </el-col>
                        <el-col :span='9'>
                          <div class="checkbox">
                            <el-checkbox :disabled="isAdmin" @change="handleSelectionChange3()" v-model="item.selected"></el-checkbox>
                          </div>
                        </el-col>
                      </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- sys menu end -->
          </div>
        </el-col>

        <!-- sys menu end -->
      </el-row>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { getNodes } from "common/js/config";
export default {
  computed: {
    userId(state) {
      alert(111);
      this.$store.state.login.merchants =
        JSON.parse(sessionStorage.getItem("merchants")) || {};
      this.$store.state.login.userInfor =
        JSON.parse(sessionStorage.getItem("userInfor")) || {};
      console.log(this.$store.state.login.merchants[0].um_id);
      return this.$store.state.login.userInfor.id;
    }
  },
  created() {
    this.$store.state.login.merchants =
      JSON.parse(sessionStorage.getItem("merchants")) || {};
    this.$store.state.login.userInfor =
      JSON.parse(sessionStorage.getItem("userInfor")) || {};
    this.userInfor = this.$store.state.login.userInfor;
    this.merchants = this.$store.state.login.merchants;
    // console.log(this.userInfor);
    // console.log(this.merchants);
    // console.log(this.$store.state.login.merchants);
    this.findResourceByMid();
  },
  mounted() {
    this.rolTabData_R.forEach(row => {
      // this.$refs.multipleTable.toggleRowSelection(row);
    });
  },
  data() {
    return {
      isAdmin: false,
      menuIds: "", //保存角色权限
      rowName: "请选择角色进行操作",
      ResourceArr: [], //保存角色权限的数组
      checked: 0,
      menusName: [],
      menus: [], //所有权限
      merchants: [], //企业信息
      userInfor: {}, //用户信息
      merchantId: "", //企业id
      rolTabData_L: [], //角色列表
      rolFormDialog: false,
      roleId: "", //角色id
      rolFormData_L: { roleName: "", editFlag: false },
      rolTabData_R: [
        { roleName: "菜单管理", check: false },
        { roleName: "角色管理", check: false },
        { roleName: "消息公告", check: false },
        { roleName: "客户管理", check: false },
        { roleName: "客户权限", check: false },
        { roleName: "账号管理", check: false }
      ],
      editRole: false,
      multipleSelection: []
    };
  },
  methods: {
    forEachArr(id) {
      for (let i in this.ResourceArr) {
        if (this.ResourceArr[i] == id) {
          return i;
        }
      }
    },
    handleSelectionChange1(id) {
      var arr = [];
      this.menus.map((item, index) => {
        arr[index] = item;
      });
      this.menus = arr;
    },
    handleSelectionChange2(id) {
      var arr = [];
      this.menus.map((item, index) => {
        arr[index] = item;
      });
      this.menus = arr;
    },
    queryRoleListByUM() {
      //查询用户角色列表
      // this.$http.post(this.api+'/role/queryRoleListByUM', {
      this.$http
        .post(this.api + "/role/queryRoleList", {
          // umid: this.merchants[0].um_id
          merchantId: this.merchants[0].id
        })
        .then(res => {
          if (res.status == "200") {
            console.log(res.data.result);
            this.rolTabData_L = res.data.result;
            this.$Message.success(res.data.message);
            // this.findResourceByMid(); //查询企业权限列表
          } else if (res.status == "403") {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    },
    findResourceByMid() {
      //查询企业权限列表
      this.$http
        .post(this.api + "/user/findResourceByMid", {
          merchantId: this.merchants[0].id
        })
        .then(res => {
          if (res.status == "200") {
            // alert(555);
            this.queryRoleListByUM();
            this.menus = getNodes(res.data.result);
            // this.menus = res.data.result;
            if (this.menus == "") {
              this.menus_list = true;
              this.$Message.warning("无菜单列表数据");
            }
            this.menus.forEach(function(ele, index) {
              ele.selected = false;
              if (ele.children) {
                ele.children.forEach(function(item, index) {
                  item.selected = false;
                  if (item.children) {
                    item.children.forEach(list => {
                      list.selected = false;
                    });
                  }
                });
              }
            });
          }
          console.log(res.data.result);
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    },
    saveRole() {
      //新增角色
      this.$http
        .post(this.api + "/role/saveRole", {
          merchantId: this.merchants[0].id,
          roleName: this.rolFormData_L.roleName
        })
        .then(res => {
          if (res.status == "200") {
            console.log(res.data.result);
            this.queryRoleListByUM();
            this.$Message.success(res.data.message);
          } else if (res.status == "403") {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          // this.$Message.error(res.data.message);
          console.log("请求超时");
        });
    },
    deleteRole(id) {
      //删除角色
      this.$http
        .post(this.api + "/role/deleteRole", {
          roleId: id
        })
        .then(res => {
          if (res.status == "200") {
            console.log(res.data.result);
            this.queryRoleListByUM();
            this.$Message.success(res.data.message);
          } else if (res.status == "403") {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          // this.$Message.error(res.data.message);
          console.log("请求超时");
        });
    },
    updateRole() {
      //编辑保存角色
      this.$http
        .post(this.api + "/role/updateRole", {
          id: this.roleId,
          roleName: this.rolFormData_L.roleName,
          merchantId: this.merchants[0].id
        })
        .then(res => {
          if (res.status == "200") {
            if (res.data.status == "200") {
              console.log(res.data);
              this.queryRoleListByUM();
              this.$Message.success(res.data.message);
            }
          } else if (res.status == "403") {
            this.$Message.error(res.data.message);
            return;
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    },
    settingQx(arr) {
      var arrs = [];
      for (let i = 0; i < this.menus.length; i++) {
        this.menus[i].selected = false;
        for (let j = 0; j < arr.length; j++) {
          if (this.menus[i].id === arr[j].id) {
            this.menus[i].selected = true;
          }
        }
        arrs[i] = this.menus[i];
      }
      this.menus.map(item => {
        if (item.children) {
          item.children.map(list => {
            arr.map(ele => {
              if (list.id == ele.id) {
                list.selected = true;
              }
            });
          });
        }
      });
      this.menus.map(item => {
        //遍历三级菜单
        if (item.children) {
          item.children.map(list => {
            if (list.children) {
              list.children.map(chl => {
                arr.map(ele => {
                  if (chl.id == ele) {
                    chl.selected = true;
                  }
                });
              });
            }
          });
        }
      });
      this.menus = arrs;
    },
    findResourceByRid(id) {
      //查询角色对应权限
      this.$http
        .post(this.api + "/role/findResourceByRid", {
          r_id: id
        })
        .then(res => {
          if (res.status == "200") {
            console.log(res.data);
            this.menus.forEach(function(ele, index) {
              ele.selected = false;
              if (ele.children) {
                ele.children.forEach(function(item, index) {
                  item.selected = false;
                  if (item.children) {
                    item.children.forEach(list => {
                      list.selected = false;
                    });
                  }
                });
              }
            });
            this.settingQx(res.data.result);
          } else if (res.status == "403") {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    },
    findByRid(row) {
      //查询角色
      if (row.isAdmin) {
        // alert(222);
        this.roleId = row.id;
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
        this.rowName = row.roleName;
        this.roleId = row.id; //保存角色id
        this.findResourceByRid(this.roleId);
      }
    },
    authorizationBtn() {
      if (this.roleId == "" || this.menus == "") {
        this.$Message.warning("请先选择一个角色并分配权限后再试");
        return;
      }
      this.authorization();
    },
    authorization() {
      //角色授权 api
      if (this.isAdmin) {
        this.$Message.warning("超级管理员不能进行操作");
        return;
      }
      var arr = [];
      this.menus.map(item => {
        if (item.selected) {
          arr.push(item.id);
        }
        if (item.children) {
          item.children.map(list => {
            if (list.selected) {
              arr.push(list.id);
            }
            if (list.children) {
              list.children.map(ele => {
                if (ele.selected) {
                  arr.push(ele.id);
                }
              });
            }
          });
        }
      });

      var menuIds = arr.join(",");

      this.$http
        .post(this.api + "/role/authorization", {
          roleId: this.roleId,
          menuIds: menuIds,
          mid: this.merchants[0].id
        })
        .then(res => {
          if (res.status == "200") {
            this.$Message.success(res.data.message);
          } else if (res.status == "403") {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    },
    pushRolTabData_L() {
      //确定
      if (this.editRole) {
        this.updateRole();
        this.rolFormDialog = false;
        return;
      }
      this.saveRole();
      this.rolFormData_L = {};
      this.rolFormDialog = false;
    },
    addBtn() {
      //添加
      // alert(111);
      let new_rolFormData_L = { roleName: "", editFlag: false };
      this.rolFormData_L = new_rolFormData_L;
      this.rolFormDialog = true;
    },
    remove(index, row, data) {
      //删除
      console.log(row);
      data.splice(index, 1);
      this.deleteRole(row.id);
    },
    editSelecttionTab(index, row) {
      //编辑
      // alert(1002);
      this.editRole = true;
      this.rolFormDialog = true;
      this.rolFormData_L.roleName = row.roleName;
      this.roleId = row.id;
      // row.isAdmin = !row.isAdmin;
    },
    handleSelectionChange(val) {
      //选中的数据
      this.multipleSelection = val;
      // console.log(val);
    },
    checkSelectable(row) {
      // alert(1001);
      return row.check != false;
    }
  }
};
</script>

<style lang="less" scoped>
section {
  > div {
    background: #ffffff;
    padding: 24px;
    overflow: hidden;
    .addBtn {
      margin-bottom: 10px;
      cursor: pointer;
    }
    .roleName {
      height: 40px;
      background: #eef1f6;
      line-height: 40px;
      border: 1px solid #dfe6ec;
      box-sizing: border-box;
      border-bottom: none;
      color: #1f2d3d;
    }
    .roleName_spanBoder {
      text-align: center;
    }
    .sys_menu_head_2 {
      width: 100%;
      height: 41px;
      overflow: hidden;
      line-height: 41px;
      box-sizing: border-box;
      border-bottom: 1px solid #dfe6ec;
      > div {
        text-align: center;
        box-sizing: border-box;
        border-left: 1px solid #dfe6ec;
      }
      .checkbox {
        border-right: 1px solid #dfe6ec;
      }
    }
    .saveRoleManger {
      overflow: hidden;
      > div:nth-child(1) {
        float: left;
      }
      > button {
        float: right;
      }
    }
  }
}
</style>
