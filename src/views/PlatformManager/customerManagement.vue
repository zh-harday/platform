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
        <el-table-column prop="disables" label="状态" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button :disabled="scope.row.disables =='锁定'" @click="EditBtn(scope.$index,scope.row)" type="primary" size="small">编 辑</el-button>
            <el-button :disabled="scope.row.disables =='锁定'" @click="locking(scope.$index,scope.row,0)" type="primary" size="small">锁 定</el-button>
            <el-button :disabled="scope.row.disables =='启用'" @click="locking(scope.$index,scope.row,1)" type="primary" size="small">启 用</el-button>
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
      a: 1,
      type: '',
      industrys: [], //行业列表
      fileAddress: '', //上传文件地址
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
        url: '', //上传文件地址
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
      // alert(5656);
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
              alert(2323);
              console.log(res.data.message);
              // let url = res.data.message;
              this.fileAddress = res.data.message;
              // this.address = url;
              // console.log(url);
              console.log(this.a);
              console.log(this.fileAddress);
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
      this.addCustomerFormData = {};
      // this.$refs.addCustomerFormData.resetFields();
      this.addCustomerDialogFormVisible = false;
    },
    EditBtn(index, row) { //编辑  
      console.log(row);
      this.queryList();
      this.industryS();
      this.queryObject(row.id);
      this.addCustomerDialogFormVisible = true;
    },
    locking(index, row,num) { //锁定
      row.status = "锁定";
      if(num == '0'){ //锁定
        this.enableOrLock(row.id,num);
      } else { //启用
        this.enableOrLock(row.id,num);
      }
    },
    saveCustomerDialogFormBtn() { //新增客户按钮
      console.log(this.addCustomerFormData);
      this.editMerchant();
      this.addCustomerDialogFormVisible = false;
    },
    getIndustryValue(value) { //获取行业数据
      console.log(value);
      this.addCustomerFormData.industry = value;
    },
    enableOrLock(id,type) { //锁定/启用 客户
      this.$http.post(this.api + '/merchant/enableOrLock', {
        "id": id,
        "disables": type
      })
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log(res.data);
              this.queryInfo();
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
    queryObject(id) { //查询客户详情 api
      this.$http.post(this.api + '/merchant/queryObject', {
        merchantId: id
      })
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log(res.data);
              this.addCustomerFormData.clientName = res.data.result.merchantName; //公司名称
              this.addCustomerFormData.account = res.data.result.contactPhone; //账号
              this.addCustomerFormData.openDate = res.data.result.startTime; //开通时间
              this.addCustomerFormData.expiryDate = res.data.result.endTime; //结束时间
              this.file.name = res.data.result.merchantFlie; //结束时间

              this.addCustomerFormData.officeAddress = res.data.result.officeAddress; //办公地址
              this.addCustomerFormData.companyEmail = res.data.result.email; //公司邮箱

              this.addCustomerFormData.contactPerson = res.data.result.contactUser; //联系人
              this.addCustomerFormData.contactPhone = res.data.result.contactPhone; //联系电话
              // this.type = res.data.result.merchantTypeId; //类型
              // this.addCustomerFormData.industry = res.data.result.industry; //行业
              this.addCustomerFormData.remarks = res.data.result.info; //备注
              this.addCustomerFormData.uscc = res.data.result.socialCode; //统一社会信用代码
              this.addCustomerFormData.legalRepresen = res.data.result.representative; //法人代表
              this.addCustomerFormData.address = res.data.result.address; //详细地址
              this.$Message.success(res.data.message);
            }
          } else if (res.data.status == '403') {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        })
    },
    queryInfo() { //查询客户列表数据 api
      this.$http.post(this.api + '/merchant/queryInfo', {})
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log(res.data);
              res.data.result.list.forEach(function(item, index) {
                if (item.disables == '0') {
                  item.disables = '锁定';
                } else if (item.disables == '1') {
                  item.disables = '启用';
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
        "merchantName": this.addCustomerFormData.clientName,
        "startTime": this.addCustomerFormData.openDate,
        "endTime": this.addCustomerFormData.expiryDate,
        "industry": this.addCustomerFormData.industry,
        "contactUser": this.addCustomerFormData.contactPerson,
        "contactPhone": this.addCustomerFormData.contactPhone,
        "merchantTypeId": this.addCustomerFormData.type,
        "merchantFlie": 'http://47.90.120.190:8086/group1/M00/00/02/rB9VtFnLB_SARAm5ABA0syEEsfE400.png',
        "info": this.addCustomerFormData.remarks,
        "socialCode": this.addCustomerFormData.uscc,
        "representative": this.addCustomerFormData.legalRepresen,
        "address": this.addCustomerFormData.address,
      })
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log(res.data);
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
