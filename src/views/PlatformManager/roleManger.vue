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
            <div>角色权限</div>
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
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-table :data="rolTabData_L" border style="width: 100%" align="center">
              <el-table-column prop="roleName" label="角色名称" width="" align="center">
                <template scope="scope">
                  <span class="cursor" @click="findByRid(scope.$index,scope.row)" v-if="!scope.row.isAdmin">{{ scope.row.roleName }}</span>
                  <span v-if="scope.row.isAdmin" class="cell-edit-input">
                    <el-input v-model="scope.row.roleName" placeholder=""></el-input>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="" align="center">
                <template scope="scope">
                  <el-button v-if="!scope.row.isAdmin" @click="editSelecttionTab(scope.$index,scope.row)" type="primary" size="small">编辑</el-button>
                  <el-button v-if="scope.row.isAdmin" @click="saveSelecttionTab(scope.$index,scope.row)" type="primary" size="small">保存</el-button>
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
            <el-row>
              <el-col :span="24" v-for="(item,index) in menus" :key="item">
                <el-row class="common sys_menu_head_2">
                  <el-col :span="15">
                    <div class="menuName">{{item.menuName}}</div>
                  </el-col>
                  <el-col :span='9'>
                    <div class="checkbox">
                      <el-checkbox @change="handleSelectionChange1($event,item)" :v-model="item.selected"></el-checkbox>
                    </div>
                  </el-col>
                </el-row>
                <el-table @selection-change="handleSelectionChange2(selection)" stripe :show-header="false" :data="item.children" border style="width: 100%">
                  <el-table-column prop="menuName" label="" align="center" width="">
                  </el-table-column>
                  <el-table-column width="398px" align="center">
                    <template scope="scope">
                      <el-checkbox @change="handleSelectionChange2($event,scope.row)" v-model="item.selected"></el-checkbox>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <!-- sys menu end -->
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>


<script>
import { mapState } from 'vuex'
import { getNodes } from 'common/js/config'
export default {
  computed: {
    userId(state) {
      alert(111);
      this.$store.state.login.merchants = JSON.parse(sessionStorage.getItem('merchants')) || {};
      this.$store.state.login.userInfor = JSON.parse(sessionStorage.getItem('userInfor')) || {};
      console.log(this.$store.state.login.merchants[0].um_id);
      return this.$store.state.login.userInfor.id;
    },
  },
  created() {
    this.$store.state.login.merchants = JSON.parse(sessionStorage.getItem('merchants')) || {};
    this.$store.state.login.userInfor = JSON.parse(sessionStorage.getItem('userInfor')) || {};
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
    // console.log(this.userInfor);
    // console.log(this.merchants[0].um_id);
  },
  data() {
    return {
      menuIds: '', //保存角色权限
      ResourceArr: [], //保存角色权限的数组
      checked: 0,
      menusName: [],
      menus: [],
      merchants: [], //企业信息
      userInfor: {}, //用户信息
      merchantId: '', //企业id
      rolTabData_L: [], //角色列表
      rolFormDialog: false,
      roleId: '', //角色id
      rolFormData_L: { roleName: "", editFlag: false },
      rolTabData_R: [
        { roleName: "菜单管理", check: false },
        { roleName: "角色管理", check: false },
        { roleName: "消息公告", check: false },
        { roleName: "客户管理", check: false },
        { roleName: "客户权限", check: false },
        { roleName: "账号管理", check: false },
      ],
      multipleSelection: [],
    }
  },
  methods: {
    forEachArr(id) {
      for (let i in this.ResourceArr) {
        if (this.ResourceArr[i] == id) {
          return i;
        }
      }
    },
    handleSelectionChange1(event, item) {
      //alert(111);
      this.multipleSelection = item;
      console.log(event.target.checked);
      console.log(this.multipleSelection);
      if (event.target.checked) {
        this.ResourceArr.push(item.id);
      } else {
        let index = this.forEachArr(item.id);
        this.ResourceArr.splice(index, 1);
        console.log(this.ResourceArr)
      }
      console.log('111111111111111111111111');
      console.log(this.ResourceArr);
    },
    handleSelectionChange2(event, row) {
      //alert(222);
      this.multipleSelection = row;
      console.log(event.target.checked);
      console.log(this.multipleSelection);
      if (event.target.checked) {
        this.ResourceArr.push(row.id);
      } else {
        let index = this.forEachArr(row.id)
        this.ResourceArr.splice(index, 1);
      };
      console.log('22222222222222222222222222222');
      console.log(this.ResourceArr);
    },
    queryRoleListByUM() { //查询用户角色列表
      // this.$http.post(this.api+'/role/queryRoleListByUM', {
      this.$http.post(this.api+'/role/queryRoleList', {
        // umid: this.merchants[0].um_id
        merchantId: this.merchants[0].id
      })
        .then(res => {
          if (res.status == '200') {
            console.log(res.data.result);
            this.rolTabData_L = res.data.result;
            this.$Message.success(res.data.message);
            // this.findResourceByMid(); //查询企业权限列表
          } else if (res.status == '403') {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          // this.$Message.error('请求超时');
          console.log('请求超时');
        })
    },
    findResourceByMid() { //查询企业权限列表
      this.$http.post(this.api+'/user/findResourceByMid', {
        merchantId: this.merchants[0].id
      })
        .then(res => {
          if (res.status == '200') {
            this.queryRoleListByUM()
            console.log(res.data.result);
            this.menus = getNodes(res.data.result);
            console.log('***********************');
            console.log(this.menus);
            // this.menus.forEach(function(ele, index) {
            //   // alert(111);
            //   let obj1 = {};
            //   obj1.menuName = ele.menuName;
            //   obj1.selected = false;
            //   this.menusName.push(obj1);
            //   if (item.children) {
            //     ele.children.forEach(function(item, index) {
            //       alert(222);
            //       let obj2 = {};
            //       obj2.menuName = item.menuName;
            //       obj2.selected = false;
            //       this.menusName.children.push(obj2);
            //     }, this);
            //   }
            // }, this);
            console.log('/****menusName*****/');
            console.log(this.menusName);
            console.log('/****menus*********/');
            console.log(this.menus);
            this.$Message.success(res.data.message);
          }
        })
        .catch(error => {
          // this.$Message.error('请求超时');
          console.log('请求超时');
        })
    },
    saveRole() { //新增角色
      this.$http.post(this.api+'/role/saveRole', {
        "merchantId": this.merchants[0].id,
        "roleName": this.rolFormData_L.roleName,
      })
        .then(res => {
          if (res.status == '200') {
            console.log(res.data.result);
            this.queryRoleListByUM();
            this.$Message.success(res.data.message);
          } else if (res.status == '403') {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          // this.$Message.error(res.data.message);
          console.log('请求超时');
        })
    },
    deleteRole(id) { //删除角色
      this.$http.post(this.api+'/role/deleteRole', {
        "roleId": id,
      })
        .then(res => {
          if (res.status == '200') {
            console.log(res.data.result);
            this.queryRoleListByUM();
            this.$Message.success(res.data.message);
          } else if (res.status == '403') {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          // this.$Message.error(res.data.message);
          console.log('请求超时');
        })
    },
    updateRole(roleName) { //编辑保存角色
      this.$http.post(this.api+'/role/updateRole', {
        "roleName": roleName,
        "merchantId": this.merchants[0].id
      })
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log(res.data);
              this.queryRoleListByUM();
              this.$Message.success(res.data.message);
            }
          } else if (res.status == '403') {
            this.$Message.error(res.data.message);
            return;
          }
        })
        .catch(error => {
          alert(888);
          // this.$Message.error('请求超时');
          console.log('请求超时');
        })
    },
    findResourceByRid(id) { //查询角色对应权限
      this.$http.post(this.api+'/role/findResourceByRid', {
        "r_id": id
      })
        .then(res => {
          if (res.status == '200') {
            console.log(res.data.result);
            // this.queryRoleListByUM();
            alert(555);
            for (let m = 0; m < this.menusName.length; m++) {
              this.menusName[m].selected = 0;
              if (this.menusName.children != '') {
                for (let n = 0; n < this.menusName.children.length; n++) {
                  alert(1);
                  this.menusName.children[n].selected = 0;
                };
              };
            };
            for (let i = 0; i < res.data.result.length; i++) {
              for (let k = 0; k < this.menusName.length; k++) {
                if (res.data.result[i].menuName == this.menusName[k].menuName) {
                  this.menusName[k].selected = 1;
                  // this.menus = this.menusName;
                  alert(2);
                }
              }
            };
            alert(3);
            console.log('//////////////////////////////////');
            console.log(this.menus);
            console.log(this.menusName);
            this.$Message.success(res.data.message);
          } else if (res.status == '403') {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          // this.$Message.error('请求超时');
          console.log('请求超时');
        })
    },
    findByRid(index, row) { //查询角色
      // alert(2320);
      console.log(row);
      this.roleId = row.id; //保存角色id
      this.findResourceByRid(row.id);
      // this.rolTabData_R.forEach(item => {
      //   item.check = true;
      // });
    },
    authorizationBtn() {
      this.menuIds = this.ResourceArr.join(",");
      if (this.menuIds == '' || this.roleId == '') {
        this.$Message.warning('请先选择一个角色并分配权限后再试');
        return;
      };
      this.authorization(this.menuIds);
    },
    authorization(menuIds) { //角色授权 api
      this.$http.post(this.api+'/role/authorization', {
        roleId: this.roleId,
        menuIds: menuIds,
        mid: this.merchants[0].id
      })
        .then(res => {
          if (res.status == '200') {
            console.log(res.data);
            this.findResourceByMid();
            this.$Message.success(res.data.message);
          } else if (res.status == '403') {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          // this.$Message.error("请求超时");
          console.log('请求超时');
        })
    },
    pushRolTabData_L() { //确定
      this.rolTabData_L.push(this.rolFormData_L);
      this.rolFormData_L = {};
      this.rolFormDialog = false;
    },
    addBtn() { //添加
      // alert(111);
      let new_rolFormData_L = { roleName: "", editFlag: false };
      this.rolFormData_L = new_rolFormData_L;
      this.rolFormDialog = true;
    },
    remove(index, row, data) { //删除
      console.log(row);
      data.splice(index, 1);
      this.deleteRole(row.id);
    },
    saveSelecttionTab(index, row) { //编辑保存角色
      this.updateRole(row.roleName);
    },
    editSelecttionTab(index, row) { //编辑
      // alert(1002);
      row.isAdmin = !row.isAdmin;
    },
    handleSelectionChange(val) { //选中的数据
      this.multipleSelection = val;
      // console.log(val);
    },
    checkSelectable(row) {
      // alert(1001);
      return row.check != false;
    }
  },
}
</script>

<style lang="less" scoped>
section {
  >div {
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
      height: 40px;
      overflow: hidden;
      line-height: 40px;
      box-sizing: border-box;
      div {
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
      >div:nth-child(1) {
        float: left;
      }
      >button {
        float: right;
      }
    }
  }
}
</style>
