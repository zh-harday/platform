<template>
  <section>
    <!-- 这是用户列表页面 -->
    <div>
      <el-row class="searchBox">
        <el-col :span="4" class="searchIpt">
          <div class="grid-content bg-purple-dark">
            <el-input placeholder="" icon="search" v-model="input2" :on-icon-click="handleIconClick">
            </el-input>
          </div>
        </el-col>
      </el-row>
      <div class="roleMang_tab">
        <el-row>
          <el-col :span="6" class="roleMang_tab_boder">
            <div class="grid-content bg-purple-dark">
              <el-button @click="addTabBtn" type="primary" size="small" class="addBtn">添加</el-button>
            </div>
          </el-col>
          <el-col :span="6" class="roleMang_tab_boder">
            <div class="grid-content bg-purple-dark">
            </div>
          </el-col>
          <el-col :span="6" class="roleMang_tab_boder">
            <div class="grid-content bg-purple-dark">
              <span>状态: {{types}}</span>
            </div>
          </el-col>
          <el-col :span="6" class="roleMang_tab_boder">
            <div class="grid-content bg-purple-dark">
              <el-select @change="selectValue" v-model="status" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- Add userListFormData Diglog  -->
      <el-dialog title="添加人员" :visible.sync="userListDialogFormVisible">
        <el-form label-position="left" :model="userListFormData" ref="userListFormData" class="userListFormData">
          <div class="inforBackg">基本信息</div>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="number" label="账号" :label-width="formLabelWidth">
                  <el-input v-model="userListFormData.number" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="name" label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="userListFormData.name" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="roleName" label="角色" :label-width="formLabelWidth">
                  <el-select value-key="id" @change="getRoleName" multiple v-model="userListFormData.roleName" placeholder="请选择" size="120%">
                    <el-option v-for="item in roleList" :key="item.value" :label="item.roleName" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <div class="inforBackg">个人信息</div>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="six" label="性别" :label-width="formLabelWidth">
                  <el-select v-model="userListFormData.six" placeholder="请选择" size="100%">
                    <el-option v-for="item in six" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="birthday" label="生日" :label-width="formLabelWidth">
                  <el-date-picker @change="getDateValue" v-model="userListFormData.birthday" auto-complete="off" type="date" placeholder="选择日期" size="large">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="phone" label="手机" :label-width="formLabelWidth">
                  <el-input v-model="userListFormData.phone" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="emil" label="邮箱" :label-width="formLabelWidth">
                  <el-input v-model="userListFormData.emil" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="userListDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSaveUserListBtn">确 定</el-button>
        </div>
      </el-dialog>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>
      </el-row>
      <el-table border id="userListTabData" :data="userListTabData" style="width: 100%" ref="userListTabData">
        <el-table-column prop="userName" label="姓名" align="center">
          <template scope="scope">
            <span class="cursor" v-if="!scope.row.editFlag">{{ scope.row.userName }}</span>
            <span v-if="scope.row.editFlag" class="cell-edit-input">
              <el-input v-model="scope.row.userName" placeholder=""></el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="账号" align="center">
          <template scope="scope">
            <span class="cursor" v-if="!scope.row.editFlag">{{ scope.row.number }}</span>
            <span v-if="scope.row.editFlag" class="cell-edit-input">
              <el-input v-model="scope.row.number" placeholder=""></el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="emil" label="邮箱" align="center">
          <template scope="scope">
            <span class="cursor" v-if="!scope.row.editFlag">{{ scope.row.emil }}</span>
            <span v-if="scope.row.editFlag" class="cell-edit-input">
              <el-input v-model="scope.row.emil" placeholder=""></el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button :disabled="locked" v-if="!lockValue" @click="editUserListTabData(scope.$index,scope.row)" type="primary" size="small">编 辑</el-button>
            <el-button v-if="lockValue" @click="editUserListTabData(scope.$index,scope.row)" type="primary" size="small">保 存</el-button>
            <el-button :disabled="locked" @click="checkLocking(scope.$index,scope.row)" type="primary" size="small">锁 定</el-button>
            <el-button :disabled="!locked" @click="checkLocking(scope.$index,scope.row)" type="primary" size="small">启 用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>


<script>
import { mapState } from 'vuex'
export default {
  computed: {
    userId(state) {
      // alert(333);
      this.$store.state.login.merchants = JSON.parse(sessionStorage.getItem('merchants')) || {};
      this.$store.state.login.userInfor = JSON.parse(sessionStorage.getItem('userInfor')) || {};
      return {
        userInfor: this.$store.state.login.userInfor,
        merchants: this.$store.state.login.merchants
      }
    },
  },
  created() {
    console.log(this.userId.merchants[0].id);
    console.log(this.userId.userInfor.name);
    this.queryRoleListByUM('');
    if (this.status == '所有' || this.status == '') {
      this.locked == false;
    };
  },
  data() {
    return {
      add: false,
      roleList: [],
      userInfor: {}, //用户信息
      merchantId: '', //企业id
      locked: false, //是否锁定
      isDisabled: false, //是否禁用按钮
      status: '所有',
      types: '所有',
      options: [{
        value: '',
        label: '所有'
      }, {
        value: '1',
        label: '启用'
      }, {
        value: '0',
        label: '锁定'
      }],
      userListTabData: [], //用户信息列表
      userListFormData: { //添加用户信息 form list
        name: "", //姓名
        number: "", //账号
        emil: "", //邮箱
        six: "", //性别
        birthday: "", //生日
        phone: "", //手机
        roleIds: '',
        roleName: [], //角色id
        id: '', //用户 id
        umId: '', //用户商户中间表id
        pass: '123456', //用户密码
      },
      userListDialogFormVisible: false, //Diglog
      roleSelect: [{ //角色 selectList
        value: '黄金糕',
        label: '黄金糕'
      }, {
        value: '双皮奶',
        label: '双皮奶'
      }, {
        value: '蚵仔煎',
        label: '蚵仔煎'
      }, {
        value: '龙须面',
        label: '龙须面'
      }, {
        value: '北京烤鸭',
        label: '北京烤鸭'
      }],
      role: '',
      gender: '',
      six: [ //性别
        {
          value: '1',
          label: '男'
        },
        {
          value: '0',
          label: '女'
        },
      ],
      formLabelWidth: '120px',
      formSelectLabelWidth: 200,
    }
  },
  methods: {
    handleIconClick() {
      this.queryRoleListByUM('', this.input2);
    },
    selectValue(value) {
      console.log(value);
      this.queryRoleListByUM(value);
      if (value == '') {
        this.types = '所有';
        this.locked == false;
      } else if (value == '1') {
        this.types = '启用';
        this.locked == false;
      } else if (value == '0') {
        this.types = '锁定';
        this.locked == true;
      }
    },
    addTabBtn() { //添加
      // alert(1);
      this.add = true;
      let new_userListFormData = {
        name: "", //姓名
        number: "", //账号
        emil: "", //邮箱
        six: "", //性别
        birthday: "", //生日
        phone: "", //手机
        roleIds: '',
        id: '', //用户 id
        umId: '', //用户商户中间表id
        pass: '123456', //用户密码
        roleName: [] //角色名称
      };
      this.roleList = [];
      this.userListFormData = new_userListFormData;
      this.queryUserListByUM(1, ''); //查询企业角色列表
      this.userListDialogFormVisible = true;
    },
    editSaveUserListBtn() { //确定
      if (this.add) {
        this.userListFormData.roleName = this.userListFormData.roleName.join(',');
        console.log(this.userListFormData);
        this.saveUser();
      } else {
        // alert('bj');

        for (let item in this.userListFormData) {
          if (this.userListFormData.six == '女') {
            this.userListFormData.six = '0';
          } else {
            this.userListFormData.six = '1';
          }
        };
        this.userListFormData.roleName = this.userListFormData.roleName.join(",");
        // console.log(this.userListFormData.roleName);
        this.updateUser();
        console.log(this.userListFormData);
      };
      // this.updateUser();
      // this.userListFormData = {};
      this.userListDialogFormVisible = false;
    },
    getRoleName(value) {
      // console.log(value);
      // this.userListFormData.roleName = value;
    },
    getDateValue(value) {
      this.userListFormData.birthday = value;
    },
    editUserListTabData(index, row) { //编辑
      console.log(row);
      this.add = false;
      this.userListDialogFormVisible = true;
      this.queryUser(row.userId); //用户详情
      this.queryUserListByUM(row.userId, row.umId); //查询企业角色列表
    },
    // saveUserListTabData(index, row) { //保存
    //   row.editFlag = false;
    // },
    checkLocking(index, row) { //锁定
      this.locked = !this.locked;
      console.log(this.locked);
      if (this.locked) { //锁定
        this.lockUnlock(0);
      } else { //启用
        this.lockUnlock(1);
      }
    },
    lockUnlock(num) { //启用/锁定用户
      this.$http.post(this.api + '/user/lockUnlock', {
        "umid": this.userId.merchants[0].um_id,
        "lockValue": num
      })
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log(res.data);
              this.queryUserListByUM();
              this.$Message.success(res.data.message);
            }

          } else if (res.status == '403') {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
          // console.log('请求超时');
        })
    },
    queryUserListByUM(id, umid) { //查询企业角色列表 api
      if (id == '1') {
        id = this.userId.merchants[0].id;
      };
      this.$http.post(this.api + '/role/queryRoleList', {
        // merchantId: id
        merchantId: this.userId.merchants[0].id
      })
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              this.roleList = res.data.result;
              if (umid) {
                // alert('umid');
                this.queryUserRoleList(umid); //查询用户拥有角色列表
              };
              console.log('企业角色列表');
              console.log(res.data);
              this.$Message.success(res.data.message);
            }
          } else if (res.data.status == '403') {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          this.$Message.error('请求超时');
        })
    },
    queryUserRoleList(umid) { //查询用户拥有角色列表 api
      this.$http.post(this.api + '/role/queryRoleListByUM', {
        umid: umid //企业用户中间表id
      })
        .then(res => {
          if (res.status == '200') {
            console.log('用户角色列表');
            console.log(res.data.result);
            for (let userRoleList in res.data.result) {
              this.roleList.push(res.data.result[userRoleList]);
              console.log(userRoleList);
            };
            console.log('合并后数组');
            console.log(this.roleList);
            this.$Message.success(res.data.message);
          } else if (res.status == '403') {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          this.$Message.error('请求超时');
        })
    },
    queryRoleListByUM(num, name) { //查询平台所有用户列表 api
      this.$http.post(this.api + '/user/queryUserByMid', {
        "merchantId": this.userId.merchants[0].id,
        "userName": name,
        "lockValue": num,
      })
        .then(res => {
          if (res.status == '200') {
            console.log(res.data);
            this.userListTabData = res.data.result;
            this.$Message.success(res.data.message);
          } else if (res.data.status == '403') {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          this.$Message.error('请求超时');
        })
    },
    queryUser(id) { //查询用户详情列表数据 api
      this.$http.post(this.api + '/user/queryUser', {
        "userId": id,
        "merchantId": this.userId.merchants[0].id
      })
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log('用户详情');
              console.log(res.data);
              this.userListFormData.roleName = [];
              res.data.result.roleList.forEach(item => {
                if (item.roleName) {
                  // alert(555);
                  // console.log(item.roleName);
                  this.userListFormData.roleName.push(item.roleName);
                  console.log(this.userListFormData.roleName);
                }
              });

              for (let item in res.data.result) {
                if (res.data.result.six == '0') {
                  res.data.result.six = '女';
                } else {
                  res.data.result.six = '男';
                }
                // this.userListFormData.pass = this.md5(res.data.result.pass, 32);
              };
              // this.roleList = res.data.result.roleList;
              this.userListFormData.id = res.data.result.id;
              this.userListFormData.umId = res.data.result.umId;
              this.userListFormData.name = res.data.result.name;
              this.userListFormData.number = res.data.result.number;
              this.userListFormData.pass = res.data.result.pass;
              this.userListFormData.birthday = res.data.result.birthday;
              this.userListFormData.six = res.data.result.six;
              this.userListFormData.phone = res.data.result.phone;
              this.userListFormData.emil = res.data.result.emil;
              this.$Message.success(res.data.message);
            }

          } else if (res.status == '403') {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
          console.log('请求超时');
        })
    },
    updateUser() { //编辑保存用户信息
      this.$http.post(this.api + '/user/updateUser', {
        "id": this.userListFormData.id,
        "umId": this.userListFormData.umId,
        "name": this.userListFormData.name,
        "number": this.userListFormData.number,
        "pass": '123456',
        "birthday": this.userListFormData.birthday,
        "six": this.userListFormData.six,
        "phone": this.userListFormData.phone,
        "emil": this.userListFormData.emil,
        "roleIds": this.userListFormData.roleName
      })
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log(res.data);
              this.queryRoleListByUM('');
              this.$Message.success(res.data.message);
            }
          } else if (res.status == '403') {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        })
    },
    saveUser() { //保存新增用户信息
      this.$http.post(this.api + '/user/saveUser', {
        "mId": this.userId.merchants[0].id,
        "name": this.userListFormData.name,
        "number": this.userListFormData.number,
        "pass": "123456",
        "birthday": this.userListFormData.birthday,
        "six": this.userListFormData.six,
        "phone": this.userListFormData.phone,
        "emil": this.userListFormData.emil,
        "roleIds": this.userListFormData.roleName
        // "roleIds": "1d1a3965cd4b499881bede7f4ea94a25,3655c5a1b2bf4f6cac7b31119e74dcac,5b491d3a1a4d4ea6ae6c853b13796d55"
      })
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              // alert(666);
              console.log(res.data);
              this.queryRoleListByUM('');
              this.$Message.success(res.data.message);
            }

          } else if (res.status == '403') {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        })
    },
  }
}
</script>

<style lang="less" scoped>
section {
  >div {
    padding: 24px;
    background: #ffffff;
    overflow: hidden;
    .searchBox {
      margin-bottom: 10px;
    }
    .searchIpt {
      float: right;
    }
    .roleMang_tab {
      .roleMang_tab_boder {
        // border: 1px solid #cccccc;
        margin-bottom: 10px;
        height: 40px;
        line-height: 40px;
      }
    }
    .userListFormData {
      .inforBackg {
        height: 40px;
        line-height: 40px;
        background: #eff2f7;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
