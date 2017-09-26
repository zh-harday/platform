<template>
  <section>
    <!-- 这是客户管理页面 -->
    <div>
      <el-row class="customerMang">
        <el-col :span="6">
          <div class="grid-content bg-purple-dark">
            <el-input placeholder="" icon="search" v-model="input2" :on-icon-click="handleIconClick">
            </el-input>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>
        <el-col :span="8" class="searchIpt">
          <div class="grid-content bg-purple-dark">
            <el-button @click="addCustomer" class="searchIpt" type="primary">新增客户</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 新增客户信息 Dialog -->
      <el-dialog title="新增客户" :visible.sync="addCustomerDialogFormVisible">
        <el-form label-position="left" class="addCustomerFormData" :model="addCustomerFormData" ref="addCustomerFormData">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <div class="inforBackg">客户信息</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="clientName" label="客户名称(企业名称)" :label-width="formLabelWidth">
                  <el-input v-model="addCustomerFormData.clientName" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="account" label="账号" :label-width="formLabelWidth">
                  <el-input v-model="addCustomerFormData.account" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="openDate" label="开通日期" :label-width="formLabelWidth">
                  <el-input :disabled="1" v-model="addCustomerFormData.openDate" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="expiryDate" label="到期日期" :label-width="formLabelWidth">
                  <el-date-picker @change="getDateValue" v-model="addCustomerFormData.expiryDate" type="datetime" align="right" placeholder="选择日期" width="200px">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="officeAddress" label="办公地址" :label-width="formLabelWidth">
                  <el-input v-model="addCustomerFormData.officeAddress" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="companyEmail" label="公司邮箱" :label-width="formLabelWidth">
                  <el-input v-model="addCustomerFormData.companyEmail" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="contactPerson" label="联系人" :label-width="formLabelWidth">
                  <el-input v-model="addCustomerFormData.contactPerson" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="contactPhone" label="联系电话" :label-width="formLabelWidth">
                  <el-input v-model="addCustomerFormData.contactPhone" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="type" label="类型" :label-width="formLabelWidth">
                  <el-select @change="typeSelect" v-model="type" placeholder="请选择" size="100%">
                    <el-option v-for="item in options" :key="item.id" :label="item.typeName" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="industry" label="行业" :label-width="formLabelWidth">
                  <el-select required @change="getIndustryValue" v-model="addCustomerFormData.industry" placeholder="请选择">
                    <el-option v-for="item in industrys" :key="item.id" :label="item.dicName" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="url" label="相关文档" :label-width="formLabelWidth">
                  <div>
                    <div class="el-upload__text">
                      <span @click="getFile($event)">
                        <Icon type="upload" size=100></Icon>
                      </span>
                      <form>
                        <input type="file" style="display:none" @change="changeImage($event)" ref="avatarInput">
                        <button @click="submitForm($event)" class="cursor">点击上传</button>
                        <span>{{file.name}}</span>
                      </form>
                      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10M</div>
                    </div>
                  </div>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="remarks" label="备注" :label-width="formLabelWidth">
                  <el-input type="textarea" autosize placeholder="请输入内容" v-model="addCustomerFormData.remarks">
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <div class="inforBackg">企业详情</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="uscc" label="*统一社会信用代码" :label-width="formLabelWidth">
                  <el-input v-model="addCustomerFormData.uscc" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="legalRepresen" label="*法人代表" :label-width="formLabelWidth">
                  <el-input v-model="addCustomerFormData.legalRepresen" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="address" label="*详细地址" :label-width="formLabelWidth">
                  <el-input type="textarea" autosize placeholder="请输入内容" v-model="addCustomerFormData.address">
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addCustomerDialogFormVisible = false">关 闭</el-button>
          <el-button type="primary" @click="saveCustomerDialogFormBtn">保 存</el-button>
        </div>
      </el-dialog>
      <!-- 新增客户信息 Dialog End -->
      <el-table stripe :data="addCustomerTabData" :modul="addCustomerTabData" ref="addCustomerTabData" border style="width: 100%">
        <el-table-column prop="merchantName" label="客户名称" align="center">
          <template scope="scope">
            <span class="cursor" v-if="!scope.row.editFlag">{{ scope.row.merchantName }}</span>
            <span v-if="scope.row.editFlag" class="cell-edit-input">
              <el-input v-model="scope.row.merchantName" placeholder=""></el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="开通日期" align="center">
          <template scope="scope">
            <span class="cursor" v-if="!scope.row.editFlag">{{ scope.row.startTime }}</span>
            <span v-if="scope.row.editFlag" class="cell-edit-input">
              <el-input v-model="scope.row.startTime" placeholder=""></el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="到期日期" align="center">
          <template scope="scope">
            <span class="cursor" v-if="!scope.row.editFlag">{{ scope.row.endTime }}</span>
            <span v-if="scope.row.editFlag" class="cell-edit-input">
              <el-input v-model="scope.row.endTime" placeholder=""></el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="merchantType" label="类型" align="center">
          <template scope="scope">
            <span class="cursor" v-if="!scope.row.editFlag">{{ scope.row.merchantType }}</span>
            <span v-if="scope.row.editFlag" class="cell-edit-input">
              <el-input v-model="scope.row.merchantType" placeholder=""></el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="状态" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button v-if="!scope.row.editFlag" :disabled="scope.row.status == '锁定'" @click="Edit(scope.$index,scope.row)" type="primary" size="small">编 辑</el-button>
            <el-button v-if="scope.row.editFlag" @click="Edit(scope.$index,scope.row)" type="primary" size="small">保 存</el-button>
            <el-button @click="locking(scope.$index,scope.row)" type="primary" size="small">锁 定</el-button>
            <el-button @click="Enabled(scope.$index,scope.row)" type="primary" size="small">启 用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
import { getSysDate } from 'common/js/config'
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
    this.queryInfo();
    // this.beforeUpdate(); 
  },
  data() {
    return {
      type: '',
      industrys: [], //行业列表
      address: '', //上传文件地址
      options: [], //客户类型列表数据
      file: {}, //文件列表
      addCustomerTabData: [],
      addCustomerFormData: {
        clientName: '', //客户名称
        account: '', //账号
        openDate: getSysDate(), //开通日期
        industry: '', //行业
        expiryDate: '', //到期日期
        type: '', //类型
        status: '启用', //状态
        url:'', //上传文件地址
        officeAddress: "", //办公地址
        companyEmail: "", //公司邮箱
        contactPerson: "", //联系人
        contactPhone: "", //联系电话
        relatedDoc: "", //相关文档
        remarks: "", //备注
        uscc: "", //*统一社会信用代码
        legalRepresen: "", //法人代表
        lrIDNumber: "", //法人代表身份证号
        address: "", //*详细地址
        editFlag: false, //是否可编辑
      },
      isDisabled: false,
      locked: false,
      addCustomerDialogFormVisible: false,
      formLabelWidth: '120px',
    }
  },
  methods: {
    NewObj() {
    },
    submitForm(event) { //提交上传文件到服务器
      alert(5656);
      event.preventDefault();
      let formData = new FormData();
      // formData.append('file', this.file);
      formData.append('files', this.$refs.avatarInput.files[0]);
      console.log(formData);
      console.log(this.file);
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      this.$http.post(this.api + '/files/upload', formData, config)
        .then(function(res) {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log(res.data.message);
              // let url = res.data.message;
              this.address = res.data.message;
              console.log(this.address);
              this.address = res.data.message;
              this.addCustomerFormData.url = this.url;
              this.$Message.success(res.data.message);
            }
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        })
    },
    getFile(event) { //点击上传文件图像
      this.$refs.avatarInput.click();
    },
    changeImage(e) { //上传文件input
      this.file = event.target.files[0];
      console.log('this file');
      console.log(this.file);
    },
    getDateValue(value) { //获取日期选择输入框的值
      this.addCustomerFormData.expiryDate = value;
      return value;
    },
    typeSelect(value) { //客户类型选择
      this.addCustomerFormData.type = value;
      return value;
    },
    addCustomer() { //Add 新客户

      this.queryList();
      this.industryS();
      // this.addCustomerFormData = new_addCustomerFormData;
      this.addCustomerDialogFormVisible = true;
    },
    saveCustomerDialogForm() { //保存新增客户列表
      this.addCustomerTabData.push(this.addCustomerFormData);
      this.addCustomerFormData = {};
      // this.$refs.addCustomerFormData.resetFields();
      this.addCustomerDialogFormVisible = false;
    },
    Edit(index, row) { //编辑  
      row.editFlag = !row.editFlag;
    },
    locking(index, row) { //锁定
      row.status = "锁定";
    },
    Enabled(index, row) { //启用
      row.status = '启用';
    },
    saveCustomerDialogFormBtn() { //新增客户按钮
      console.log(this.addCustomerFormData);
    },
    getIndustryValue(value) { //获取行业数据
    console.log(value);
      this.addCustomerFormData.industry = value;
    },
    queryInfo() { //查询客户列表数据 api
      this.$http.post(this.api + '/merchant/queryInfo', {})
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log(res.data);
              res.data.result.list.forEach(function(item, index) {
                if (item.type == '0') {
                  item.type = '审核中';
                } else if (item.type == '1') {
                  item.type = '审核通过';
                } else if (item.type == '2') {
                  item.type = '审核失败';
                } else if (item.type == '3') {
                  item.type = '注册';
                }
              }, this);
              this.addCustomerTabData = res.data.result.list;
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
    queryList() { //查询客户类型列表
      this.$http.post(this.api + '/merchantType/queryList', {})
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log(res.data);
              this.options = res.data.result;
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
    industryS() { //获取行业数据列表
      this.$http.post(this.api + '/dictionaryController/select2Menu', { //数据字典=>行业
        "dicParent": 1
      })
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log(res.data.result);
              this.industrys = res.data.result;
              this.$Message.success(res.data.message);
            }
          }
        })
        .catch(error => {
          this.$Message.error(res.data.message);
        });
    },
    editMerchant() { //新增客户 api
      this.$http.post(this.api + '/merchant/editMerchant', {
        "merchantName": "平台开户测试", //客户名称
        "startTime": "2017-09-06",  //开通i时间
        "endTime": "2018-09-06", //到期时间
        "industry": "11", //行业id
        "contactUser": "hehe", //联系人
        "contactPhone": "18792406090", //电话
        "merchantTypeId": "2", //企业开通类型
        "merchantFlie": "http://baidu.com", //文件
        "info": "平台开户测试info", //备注
        "socialCode": "444-555-6666", //社会编码
        "representative": "平台开户测试法人", //法人代表
        "address": "平台开户测试详细地址" //详细地址
      })
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log(res.data);
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
  }
}
</script>

<style lang="less" scoped>
section {
  >div {
    background: #ffffff;
    padding: 24px;
    overflow: hidden;
    .customerMang {
      margin-bottom: 10px;
    }
    .searchIpt_left {
      float: left;
    }
    .searchIpt {
      float: right;
    }
    .addCustomerFormData {
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
