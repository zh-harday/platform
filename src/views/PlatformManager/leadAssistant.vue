<template>
  <section>
    <!-- 这是云项目页面 -->
    <div>
      <el-row class="customerMang">
        <el-col :span="6">
          <div class="grid-content bg-purple-dark">
            <el-input placeholder="请按项目名称进行搜索" select-when-unmatched="true" icon="search" v-model="input2" :on-icon-click="searchHandling">
            </el-input>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>
        <el-col :span="8" class="searchIpt">
          <div class="grid-content bg-purple-dark">
            <el-button @click="addLeaderAssistantForm(1)" class="searchIpt" type="primary">添加</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 添加领头助手 Dialog Start-->
      <el-dialog title="添加项目" :visible.sync="leaderAssistantFormDialog" :close-on-click-modal="false">
        <el-form :model="company" :data="company" :label-position="leaderAssistantFormDialog_align">
          <el-row :gutter="20">
            <el-col :span="24" class="subscriber">基本信息</el-col>
            <el-col :span="8">
              <el-form-item label="项目名称" prop="name" :label-width="formLabelWidth">
                <el-input placeholder="" v-model="company.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="行业" prop="industry" :label-width="formLabelWidth">
                <el-select v-model="company.industry" placeholder="请选择">
                  <el-option v-for="item in industry" :key="item.value" :label="item.dicName" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="轮次" prop="phase" :label-width="formLabelWidth">
                <el-input placeholder="" v-model="company.phase"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="上轮获投" prop="lastCast" :label-width="formLabelWidth">
                <el-input placeholder="" v-model="company.lastCast"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所在地" prop="city" :label-width="formLabelWidth">
                <el-select v-model="company.city" placeholder="请选择">
                  <el-option v-for="item in city" :key="item.value" :label="item.dicName" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="成立时间" prop="startdate" :label-width="formLabelWidth">
                <el-date-picker format="yyyy-MM-dd" @change="getDate1" v-model="company.startdate" align="right" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 项目介绍 Form Start -->
        </el-form>
        <el-form :model="productInfo" ref="productInfo" :label-position="leaderAssistantFormDialog_align">
          <el-row :gutter="20">
            <el-col :span="24" class="subscriber">项目介绍</el-col>
            <el-col :span="24">
              <el-form-item porp="brief" label="概述" :label-width="formLabelWidth">
                <el-input type="textarea" autosize placeholder="请输入内容" v-model="productInfo.brief">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item porp="intro" label="详细介绍" :label-width="formLabelWidth">
                <el-input type="textarea" autosize placeholder="请输入内容" v-model="productInfo.intro">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item porp="productservice" label="产品服务" :label-width="formLabelWidth">
                <el-input type="textarea" autosize placeholder="请输入内容" v-model="productInfo.productservice">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item porp="usermarket" label="用户市场" :label-width="formLabelWidth">
                <el-input type="textarea" autosize placeholder="请输入内容" v-model="productInfo.usermarket">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item porp="businessModel" label="商业模式" :label-width="formLabelWidth">
                <el-input type="textarea" autosize placeholder="请输入内容" v-model="productInfo.businessModel">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item porp="OperationData" label="运营数据" :label-width="formLabelWidth">
                <el-input type="textarea" autosize placeholder="请输入内容" v-model="productInfo.OperationData">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-form-item prop="businessPlan" label="相关文档" :label-width="formLabelWidth">
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
        </el-form>
        <!-- 项目介绍 Form End -->
        <!-- 融资经历 Tab start -->
        <el-row :gutter="20">
          <!-- <el-col :span="24" class="formTitle">基本信息</el-col> -->
          <el-col :span="24" class="subscriber">
            <div>融资经历</div>
            <el-button @click="addLeaderAssistantForm(2)" size="small" type="primary">添加</el-button>
          </el-col>
          <el-col :span="24">
            <el-table align="center" :data="finance" ref="finance" border style="width: 100%">
              <el-table-column prop="date" label="时间" align="center">
              </el-table-column>
              <el-table-column prop="phase" label="轮次" align="center">
              </el-table-column>
              <el-table-column prop="financeamount" label="融资金额" align="center">
              </el-table-column>
              <el-table-column prop="investment" label="投资方" align="center">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!-- 融资经历 Tab End -->
        <!-- 创始团队 Tab Start -->
        <el-row :gutter="20">
          <el-col :span="24" class="subscriber">
            <div>创始团队</div>
            <el-button @click="addLeaderAssistantForm(3)" size="small" type="primary">添加</el-button>
          </el-col>
          <!-- <el-row style="padding:13px;"> -->
          <el-col :span="2">
            <div style="margin-top:5px;">团队优势</div>
          </el-col>
          <el-col :span="22">
            <div>
              <el-input @blur="storyBlur" type="textarea" autosize placeholder="请输入内容" v-model="story">
              </el-input>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="teamMember">
              <div class="fl">团队成员</div>
              <div class="fl" v-for="(item, index) in teamintro" :key="item.name">
                <span>{{item.name}}</span>
              </div>
            </div>
          </el-col>
          <!-- </el-row> -->
          <el-col :span="24">
            <el-table align="center" :data="teamintro" ref="teamListTab" border style="width: 100%">
              <el-table-column prop="name" label="姓名" align="center">
              </el-table-column>
              <el-table-column prop="position" label="职位" align="center">
              </el-table-column>
              <el-table-column prop="intro" label="介绍" align="center">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!-- 创始团队 Tab End -->
        <!-- 工商信息 Form Start -->
        <el-form style="margin-top: 15px;" :model="basicInfo" ref="basicInfo" :label-position="leaderAssistantFormDialog_align">
          <el-row :gutter="20">
            <el-col :span="24" class="subscriber">
              <div>工商信息</div>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司名称" porp="name" :label-width="formLabelWidth">
                <el-input v-model="basicInfo.name" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司类型" porp="conpanyType" :label-width="formLabelWidth">
                <el-input v-model="basicInfo.conpanyType" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="成立日期" porp="startdate" :label-width="formLabelWidth">
                <el-date-picker @change="getDate2" v-model="basicInfo.startdate" align="right" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="注册资本" porp="registcapi" :label-width="formLabelWidth">
                <el-input v-model="basicInfo.registcapi" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法人代表" porp="opername" :label-width="formLabelWidth">
                <el-input v-model="basicInfo.opername" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="经营状态" porp="managementForms" :label-width="formLabelWidth">
                <el-input v-model="basicInfo.managementForms" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登记机关" porp="registrationAuthority" :label-width="formLabelWidth">
                <el-input v-model="basicInfo.registrationAuthority" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="注册地址" porp="registAddress" :label-width="formLabelWidth">
                <el-input v-model="basicInfo.registAddress" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 工商信息 Form End -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="leaderAssistantFormDialog = false">取 消</el-button>
          <el-button type="primary" @click="leaderAssistantFormSaveBtn(1)">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加领头助手 Dialog End-->
      <!-- 添加融资经历 Dialog Start -->
      <el-dialog title="添加" :visible.sync="financingDialogFormVisible">
        <el-form :model="financeF" ref="financeF" :label-position="leaderAssistantFormDialog_align">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="时间" porp="financedate" :label-width="formLabelWidth">
                <el-date-picker @change="getDate3" v-model="financeF.financedate" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="轮次" porp="phase" :label-width="formLabelWidth">
                <el-input v-model="financeF.phase" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="融资金额" porp="financeamount" :label-width="formLabelWidth">
                <el-input v-model="financeF.financeamount" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="投资方" porp="investment" :label-width="formLabelWidth">
                <el-input placeholder='多个投资方请用 "," 隔开' v-model="financeF.investment" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="financingDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="leaderAssistantFormSaveBtn(2)">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加融资经历 Dialog End -->
      <!-- 团队成员 Dialog Start -->
      <el-dialog title="添加" :visible.sync="AddTeamDialogFormVisible">
        <el-form :model="teamintroF" ref="teamintroF" :label-position="leaderAssistantFormDialog_align">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="姓名" porp="name" :label-width="formLabelWidth">
                <el-input v-model="teamintroF.name" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职位" porp="position" :label-width="formLabelWidth">
                <el-input v-model="teamintroF.position" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="介绍" porp="intro" :label-width="formLabelWidth">
                <el-input v-model="teamintroF.intro" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="AddTeamDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="leaderAssistantFormSaveBtn(3)">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 团队成员 Dialig Eng -->

      <el-table :data="leadTabData" border style="width: 100%">
        <el-table-column :fixed="left" prop="name" label="项目名称" width="200" align="center">
        </el-table-column>
        <el-table-column prop="industryName" label="行业" width="200" align="center">
        </el-table-column>
        <el-table-column prop="phaseName" label="轮次" width="200" align="center">
        </el-table-column>
        <el-table-column prop="lastCast" label="上轮获投" width="200" align="center">
        </el-table-column>
        <el-table-column prop="cityStr" label="所在地" width="200" align="center">
        </el-table-column>
        <el-table-column prop="startDate" label="成立时间" width="250" align="center">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="200" align="center">
        </el-table-column>
        <el-table-column :fixed="right" label="操作" width="200" align="center">
          <template scope="scope">
            <el-button :disabled="scope.row.status =='隐藏'" @click="hideRowBtn(scope.$index,scope.row)" type="primary" size="small">隐 藏</el-button>
            <el-button :disabled="scope.row.status =='显示'" @click="showRowBtn(scope.$index,scope.row)" type="primary" size="small">显 示</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChangeBtn" :current-page="page.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
        </el-pagination>
      </div>
    </div>
  </section>
</template>

<script>
import { getDate } from 'common/js/config'
import { getDateStr } from 'common/js/config'
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
    this.selectCompany('', 1, 10);
  },
  data() {
    return {
      date1: '',
      date2: '',
      date3: '',
      story: '', //团队优势
      industry: [], //行业数据
      city: [], //所在地数据
      fileAddress: '',
      file: '', //上传文件url
      leadTabData: [], //Tab
      company: { //基本信息
        name: '', //项目名称
        industry: '', //行业
        phase: '', //轮次
        lastCast: '', //上轮获投
        city: '', //所在地
        startdate: '', //成立时间
      },
      companys: { //基本信息
        name: '', //项目名称
        industry: '', //行业
        phase: '', //轮次
        lastCast: '', //上轮获投
        city: '', //所在地
        startdate: '', //成立时间
      },
      productInfo: { //项目介绍
        brief: "", //概述
        intro: "", //详细介绍
        productservice: "", //产品服务
        usermarket: "", //用户市场
        businessModel: "", //商业模式
        OperationData: "", //运营数据
        businessPlan: "", //商业计划书url
      },
      finance: [], //融资经历 Tab
      financeF: { //融资经历 Form
        financedate: "", //时间
        phase: "", //轮次
        financeamount: "", //融资金额
        investment: "", //投资方
        financeamountunit: 'CNY' //金额类型
      },
      teamintro: [], //团队成员 Tab
      teamintroF: { //团队成员 Form
        name: "", //姓名
        position: "", //职位
        intro: "", //介绍
      },
      basicInfo: { //工商信息 Form
        name: "", //公司名称
        conpanyType: "", //公司类型
        registcapi: "", //注册资本
        startdate: "", //成立日期
        opername: "", //法人代表
        managementForms: "", //经营状态
        registrationAuthority: "", //登记机关
        registAddress: "", //注册地址
      },
      basicInfos: { //工商信息 Form
        name: "", //公司名称
        conpanyType: "", //公司类型
        registcapi: "", //注册资本
        startdate: "", //成立日期
        opername: "", //法人代表
        managementForms: "", //经营状态
        registrationAuthority: "", //登记机关
        registAddress: "", //注册地址
      },
      leaderAssistantFormDialog: false, //添加项目 Dialog
      financingDialogFormVisible: false, //添加融资经历 Dialog
      AddTeamDialogFormVisible: false, //添加团队成员 Dialog
      leaderAssistantFormDialog_align: 'left',
      formLabelWidth: '120px',
      page: {
        pageNum: '', //当前页码
        total: '', //数据总数
        pageSize: '', //每页条数
        navigatepageNums: '', //页数
        current: '', //当前页码
      },
    }
  },
  methods: {
    submitForm(event) { //提交上传文件到服务器
      // alert(5656);
      event.preventDefault();
      let formData = new FormData();
      // formData.append('file', this.file);
      formData.append('files', this.$refs.avatarInput.files[0]);
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      this.$http.post(this.api + '/files/upload', formData, config)
        .then((res) => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              alert(2323);
              console.log(res.data);
              this.productInfo.businessPlan = res.data.filePath;
              console.log(this.productInfo.businessPlan);
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
    getFile(event) { //点击上传文件图像
      this.$refs.avatarInput.click();
    },
    changeImage(e) { //上传文件input
      this.file = event.target.files[0];
      console.log('this file');
      console.log(this.file);
    },
    getDateStr(value) { //时间转换时间戳
      var stringTime = value;
      var timestamp2 = Date.parse(new Date(stringTime));
      timestamp2 = timestamp2 / 1000;
      // console.log(timestamp2);
      return timestamp2;
    },
    getDate1(value) {
      // console.log(value);
      this.company.startdate = value;
      // this.companys.startdate = this.getDateStr(value);
      // console.log(this.companys.startdate);
      // console.log(this.company.startdate);
    },
    getDate2(value) {
      // console.log(value);
      this.basicInfo.startdate = value;
      // this.basicInfos.startdate = this.getDateStr(value);
      // console.log(this.basicInfos.startdate);
    },
    getDate3(value) {
      // console.log(value);
      this.financeF.date = getDateStr(value);
      // console.log(this.financeF.date);
    },
    addLeaderAssistantForm(n) { //添加平台云项目 Addbtn
      // alert(n);
      if (n == 1) {
        this.select2Menu();
        // alert(11);
        this.leaderAssistantFormDialog = !this.leaderAssistantFormDialog;
        let new_company = {
          name: '', //项目名称
          industry: '', //行业
          phase: '', //轮次
          lastCast: '', //上轮获投
          city: '', //所在地
          startdate: '', //成立时间
        };
        let new_productInfo = {
          brief: "", //概述
          intro: "", //详细介绍
          productservice: "", //产品服务
          usermarket: "", //用户市场
          businessModel: "", //商业模式
          OperationData: "", //运营数据
          businessPlan: "", //商业计划书url
        };
        let new_basicInfo = {
          name: "", //公司名称
          conpanyType: "", //公司类型
          registcapi: "", //注册资本
          startdate: "", //成立日期
          opername: "", //法人代表
          managementForms: "", //经营状态
          registrationAuthority: "", //登记机关
          registAddress: "", //注册地址
        };
        this.company = new_company;
        this.productInfo = new_productInfo;
        this.basicInfo = new_basicInfo;
        this.finance = [];
        this.teamintro = [];
        this.story = '';
      } else if (n == 2) {
        // alert(2);
        let new_financeF = {
          financedate: "", //时间
          phase: "", //轮次
          financeamount: "", //融资金额
          investment: "", //投资方
          financeamountunit: 'CNY' //金额类型
        };
        this.financeF = new_financeF;
        this.financingDialogFormVisible = !this.financingDialogFormVisible;
      } else if (n == 3) {
        // alert(3);
        let new_teamintroF = {
          name: "", //姓名
          position: "", //职位
          intro: "", //介绍
        };
        this.teamintroF = new_teamintroF;
        this.AddTeamDialogFormVisible = !this.AddTeamDialogFormVisible;
      }
    },
    leaderAssistantFormSaveBtn(n) { //确定
      if (n == 1) {
        alert(1111);
        console.log('添加团队成员信息');
        console.log(this.company);
        console.log(this.productInfo);
        console.log(this.finance);
        console.log(this.teamintro);
        console.log(this.basicInfo);
        // console.log(this.productservice);
        console.log(this.story);
        this.insertMessage();
        this.leaderAssistantFormDialog = !this.leaderAssistantFormDialog;
      } else if (n == 2) {
        // alert(2);
        this.finance.push(this.financeF);
        this.financingDialogFormVisible = !this.financingDialogFormVisible;
        this.financeF = {};
      } else if (n == 3) {
        // alert(3);
        // this.teamintroF.story = this.story;
        this.teamintro.push(this.teamintroF);
        this.AddTeamDialogFormVisible = !this.AddTeamDialogFormVisible;
        this.teamintroF = {};
      }
    },
    storyBlur() { //获取团队优势数据
      // alert(666);
      // this.teamintroF.story = this.story;
      // console.log(this.teamintroF.story);
    },
    hideRowBtn(index, row) { //隐藏按钮
      this.concealCompany(row.id);
    },
    showRowBtn(index, row) { //显示按钮
      this.showCompany(row.id);
    },
    removeRow(index, rows) { //没有
      // rows.splice(index, 1);
    },
    searchHandling() { //搜索
      this.selectCompany(this.input2, 1, 10);
    },
    select2Menu() { //查询行业and所在地数据
      this.$http.post(this.api + '/dictionaryController/select2Menu', { //数据字典=>行业
        "dicParent": '1'
      })
        .then(res => {
          if (res.status == '200') {
            console.log(res.data);
            this.industry = res.data.result;
            this.$Message.success(res.data.message);
          } else if (res.data.status == '403') {
            this.$Message.error(res.data.message);
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
      this.$http.post(this.api + '/dictionaryController/select2Menu', { //数据字典=>行业
        "dicParent": 501
      })
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log(res.data.result);
              this.$Message.success(res.data.message);
              this.city = res.data.result;
            }
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    },
    showCompany(id) { //显示云项目列表数据
      this.$http.post(this.api + '/CompanyClieController/showCompany', {
        id: id
      })
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log(res.data);
              this.selectCompany();
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
    concealCompany(id) { //隐藏云项目列表数据
      this.$http.post(this.api + '/CompanyClieController/concealCompany', {
        id: id
      })
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log(res.data);
              this.selectCompany();
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
    handleSizeChange(pageSize) {
      console.log(pageSize);
      this.selectCompany('', 1, pageSize);
    },
    handleCurrentChangeBtn(pageNum) { //分页按钮
      // alert(555);
      console.log(pageNum);
      this.selectCompany('', pageNum, 10);
    },
    selectCompany(name, page, pageSize) { //查询平台云项目列表数据
      this.$http.post(this.api + '/CompanyClieController/selectCompany', {
        name: name,
        page: page,
        pageSize: pageSize
      })
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log(res.data);
              res.data.result.list.forEach(item => {
                if (item.status == '2') {
                  item.status = '隐藏';
                } else if (item.status == '1') {
                  item.status = '显示';
                };
                item.startDate = getDate(item.startDate);
              }, this);
              this.leadTabData = res.data.result.list;
              this.page.pageNum = res.data.result.pageNum; //当前页码
              this.page.total = res.data.result.total; //数据总数
              this.page.pageSize = res.data.result.pageSize; //每页条数
              this.page.navigatepageNums = res.data.result.navigatepageNums.length; //页数长度
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
    insertMessage() { //新增平台云项目项目
      this.$http.post(this.api + '/productClieController/insertMessage', {
        company: this.company,
        productInfo: this.productInfo,
        finance: this.finance,
        teamintro: this.teamintro,
        basicInfo: this.basicInfo,
        story: this.story
      })
        .then(res => {
          if (res.status == '200') {
            console.log(res);
            if (res.data.status == '200') {
              console.log(res.data);
              this.selectCompany('', '', '', '');
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
    .subscriber {
      position: relative;
      width: 100%;
      height: 42px;
      line-height: 42px;
      background: #eef1f6;
      margin: 12px 0;
      overflow: hidden;
      >div:nth-child(1) {
        float: left;
      }
      button {
        position: absolute;
        right: 5px;
        margin-top: 7px;
        overflow: hidden;
      }
    }
  }
  .teamMember {
    overflow: hidden;
    margin: 10px 0;
    >div {
      float: left;
    }
    >div:nth-child(1) {
      margin-right: 20px;
    }
    div {
      span {

        margin-right: 10px;
      }
    }
  }
}
</style>
