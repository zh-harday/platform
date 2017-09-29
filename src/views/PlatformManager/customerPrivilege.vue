<template>
  <section>
    <!-- 这是客户权限页面 -->
    <div>
      <el-row class="customerMang">
        <el-col :span="6" class="searchIpt_left">
          <div class="grid-content bg-purple-dark">
            <el-button @click="addCustomer" class="searchIpt_left" type="primary">添加</el-button>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>
        <el-col :span="8" class="searchIpt">
          <div class="grid-content bg-purple-dark">
            <el-button class="searchIpt" type="primary">保存</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 新增客户 Dialog Start -->
      <el-dialog title="新增客户" :visible.sync="customerDialogFormVisible">
        <el-row :gutter="20">
          <el-form :model="customerFormData_L" label-position="left" :rules="customerFormData_L" ref="customerFormData_L" label-width="100px" class="demo-ruleForm">
            <el-col :span="12">
              <el-form-item label="类型名称" prop="typeName">
                <el-input v-model="customerFormData_L.typeName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="资费" prop="typePostage">
                <el-input v-model="customerFormData_L.typePostage"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="描述" prop="typeDescribe">
                <el-input v-model="customerFormData_L.typeDescribe"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="限制人数" prop="count">
                <el-input v-model="customerFormData_L.count"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="customerDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="customerDialogFormPushBtn">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 新增客户 Dialog End -->
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-table :data="customerTabData_L" border style="width: 100%" align="center">
              <el-table-column prop="typeName" label="客户类型" width="" align="center">
                <template scope="scope">
                  <span class="cursor" @click="queryObjectBtn(scope.$index,scope.row)" v-if="!scope.row.editFlag">{{ scope.row.typeName }}</span>
                  <span v-if="scope.row.editFlag" class="cell-edit-input">
                    <el-input v-model="scope.row.typeName" placeholder=""></el-input>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="" align="center">
                <template scope="scope">
                  <el-button @click="editBtn(scope.$index,scope.row)" type="primary" size="small">编辑</el-button>
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
                      <el-checkbox-group @change="handleSelectionChange1($event,item)" v-model="checkList">
                        <el-checkbox label="a"></el-checkbox>
                      </el-checkbox-group>
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
          </div>
        </el-col>
        <!-- sys menu end -->
      </el-row>
    </div>
  </section>
</template>

<script>
import { getNodes } from 'common/js/config'
export default {
  computed: {
    user() {
      this.$store.state.login.merchants = JSON.parse(sessionStorage.getItem('merchants')) || {};
      this.$store.state.login.userInfor = JSON.parse(sessionStorage.getItem('userInfor')) || {};
      return {
        merchants: this.$store.state.login.merchants,
        userInfor: this.$store.state.login.userInfor
      }
    }
  },
  created() {
    this.queryList();
  },
  mounted() {
    // this.customerTabData_R.forEach(row => {
    //   this.$refs.customerTabData_R.toggleRowSelection(row);
    // })
  },
  data() {
    return {
      checkList: [],
      selected: 0,
      menus: [], //菜单列表数据
      customerTabData_L: [], //客户类型列表数据
      customerFormData_L: { //添加客户类型表单
        typeName: "", //类型名称
        typePostage: '', //资费
        typeDescribe: '', //描述
        count: 0, //限制人数
      },
      customerFormData_options: [
        {
          value: '免费',
          label: '免费',
          FreeType: "",
          editFlag: false
        },
        {
          value: '年费',
          label: '年费',
          editFlag: false
        },
        {
          value: '永久',
          label: '永久',
          editFlag: false
        }
      ],
      customerTabData_R: [
        { roleName: "菜单管理", check: false },
        { roleName: "角色管理", check: false },
        { roleName: "消息公告", check: false },
        { roleName: "客户管理", check: false },
        { roleName: "客户权限", check: false },
        { roleName: "账号管理", check: false },
      ],
      customerSelectValue: '', //客户类型
      checked: true,
      customerDialogFormVisible: false,
    }
  },
  methods: {
    addCustomer() { //新增客户类型
      let new_customerFormData_L = {
        typeName: "", //类型名称
        typePostage: '', //资费
        typeDescribe: '', //描述
        count: '', //限制人数
      };
      this.customerFormData_L = new_customerFormData_L;
      this.customerDialogFormVisible = true;
    },
    editBtn(index, row) { //编辑按钮
      console.log(row);
      this.customerFormData_L.id = row.id;
      this.customerFormData_L.typeName = row.typeName;
      this.customerFormData_L.typePostage = row.typePostage;
      this.customerFormData_L.typeDescribe = row.typeDescribe;
      this.customerFormData_L.count = row.count;
      this.customerDialogFormVisible = true;
    },
    customerDialogFormPushBtn() { //保存
      this.customerFormData_L.count = Number(this.customerFormData_L.count);
      console.log(this.customerFormData_L);
      this.saveObject();
      this.customerFormData_L = {};
      this.customerDialogFormVisible = false;
    },
    roleEdit(row, column, cell, $event) {
      this.customerTabData_R.forEach(item => {
        item.check = true;
      })
    },
    handleSelectionChange(val) { //选中的数据
      this.multipleSelection = val;
      // console.log(val);
    },
    checkSelectable(row) {
      // alert(1001);
      return row.check != false;
    },
    updateObject(id) { //编辑更新客户类型
      this.$http.post(this.api + '/merchantType/updateObject', this.customerFormData_L)
        .then(res => {
          if (res.status == '200') {
            console.log(res);
            if (res.data.status == '200') {
              console.log(res.data);
              this.queryList();
              this.$Message.success(res.data.message);
            } else if (res.data.status == '403') {
              this.$Message.error(res.data.message);
            }
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
          console.log('请求超时');
        })
    },
    saveObject() { //新增客户类型 api
      this.$http.post(this.api + '/merchantType/saveObject', this.customerFormData_L)
        .then(res => {
          if (res.status == '200') {
            console.log(res.data);
            if (res.data.status == '200') {
              console.log(res.data);
              this.queryList();
              this.$Message.success(res.data.message);
            } else if (res.data.status == '403') {
              this.$Message.error(res.data.message);
            }
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
          console.log('请求超时');
        })
    },
    queryList() { //查询平台客户类型列表数据
      this.$http.post(this.api + '/merchantType/queryList', {})
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              this.findResourceByMid();
              console.log(res.data);
              this.customerTabData_L = res.data.result;
              this.$Message.success(res.data.message);
            }
          } else if (res.data.status == '403') {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
          console.log('请求超时');
        })
    },
    findResourceByMid() { //查询平台客户权限列表
      this.$http.post(this.api + '/user/findResourceByMid', {
        merchantId: this.user.merchants[0].id
      })
        .then(res => {
          if (res.status == '200') {
            this.menus = getNodes(res.data.result);
            console.log('客户总权限列表数据');
            // console.log(this.menus);
            this.menus.forEach(function(ele, index) {
              // alert(111);
              ele.selected = false;
              // this.menusName.push(obj1);
              if (ele.children) {
                ele.children.forEach(function(item, index) {
                  alert(222);
                  item.selected = false;
                  // this.menusName.children.push(obj2);
                }, this);
              }
            }, this);
            console.log(this.menus);
            console.log('/****menusName*****/');
            console.log(this.menusName);
            console.log('/****menus*********/');
            console.log(this.menus);
            this.$Message.success(res.data.message);
          }
        })
        .catch(error => {
          this.$Message.error('请求超时');
        })
    },
    queryObjectBtn(index, row) {
      console.log(row);
      this.queryObject(row.id);
    },
    queryObject(id) { //查询平台客户类型详情
      this.$http.post(this.api + '/merchantType/queryObject', {
        merchantTypeId: id
      })
        .then(res => {
          if (res.status == '200') {
            // console.log(res);
            if (res.data.status == '200') {
              console.log(res.data);
              let id = res.data.result.id;
              this.queryMenuByType(id);
              this.$Message.success(res.data.message);
            } else if (res.data.status == '403') {
              this.$Message.error(res.data.message);
            }
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        })
    },
    queryMenuByType(id) { //客户类型对应菜单
      this.$http.post(this.api + '/merchantType/queryMenuByType', {
        mtid: id
      })
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log(res.data.result);
              this.menus.forEach(function(item, index) {
                res.data.result.forEach(function(ele, index) {
                  console.log(this.menus);
                  // console.log('****************************')
                  // console.log(ele);
                  // console.log('////////////////////////////////');
                  // console.log(item.id);
                  if (item.id === ele) {
                    alert(555);
                    // item.selected = true;
                  }
                }, this);
              }, this);
              this.$Message.success(res.data.message);
            } else if (res.data.status == '403') {
              this.$Message.error(res.data.message);
            }
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        })
    },
    handleSelectionChange1(e, item) {
      console.log(e);
      // console.log(item);
      item.selected = !item.selected;
    },
    handleSelectionChange2(e, item) {
      console.log(item);
    }
  }
}
</script>

<style lang="less" scoped>
section {
  >div {
    background: #ffffff;
    padding: 24px;
    overflow: hidden;
    .searchBox {
      margin-bottom: 10px;
    }
    .customerMang {
      margin-bottom: 10px;
    }
    .searchIpt {
      float: right;
      margin-right: 10%;
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
