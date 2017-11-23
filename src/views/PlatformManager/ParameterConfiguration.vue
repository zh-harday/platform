<template>
  <section>
    <!-- 这是用户列表页面 -->
    <div class="ParameterConfiguration">
      <el-row>
        <el-col :span="24">
          <span>配置 OpenOffice 参数</span>
        </el-col>
        <el-col :span="24" class="primaryBtn">
          <el-button type="primary" @click="editParameterConfiguration">编辑</el-button>
          <el-button type="primary">保存</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="type" label="IP" align="center">
        </el-table-column>
        <el-table-column prop="port" label="端口号" align="center">
        </el-table-column>
        <el-table-column prop="filePath" label="安装目录" align="center">
        </el-table-column>
      </el-table>
      <!-- 新增客户 Dialog Start -->
      <el-dialog title="参数配置" :visible.sync="ParameterConfigurationDig">
        <el-row :gutter="20">
          <el-form :model="tableDataForm" :rules="rules" label-position="left" ref="tableDataForm" label-width="100px" class="demo-ruleForm">
            <el-col :span="12">
              <el-form-item label="IP" prop="type">
                <el-input v-model="tableDataForm.type"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="端口号" prop="port">
                <el-input v-model="tableDataForm.port"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="安装目录" prop="filePath">
                <el-input v-model="tableDataForm.filePath"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ParameterConfigurationDig = false">取 消</el-button>
          <el-button type="primary" @click="saveParameterConfiguration('tableDataForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </section>
</template>


<script>
import { mapState } from "vuex";
export default {
  computed: {
    userId(state) {
      // alert(333);
      this.$store.state.login.merchants =
        JSON.parse(sessionStorage.getItem("merchants")) || {};
      this.$store.state.login.userInfor =
        JSON.parse(sessionStorage.getItem("userInfor")) || {};
      return {
        userInfor: this.$store.state.login.userInfor,
        merchants: this.$store.state.login.merchants
      };
    }
  },
  created() {
    this.getAllocationParamer();
  },
  data() {
    return {
      ParameterConfigurationDig: false,
      tableData: [],
      tableDataForm: {
        type: "",
        port: "",
        filePath: ""
      },
      rules: {
        type: [{ required: true, type: 'string', message: "请输入IP", trigger: "blur" }],
        port: [{ required: true, type: 'number', message: "请输入端口号", trigger: "blur" }],
        filePath: [{ required: true, type: 'string', message: "请输入安装目录", trigger: "blur" }]
      }
    };
  },
  methods: {
    editParameterConfiguration() {
      this.tableDataForm.port = Number(this.tableDataForm.port);
      this.ParameterConfigurationDig = !this.ParameterConfigurationDig;
      // let new_tableDataForm = {
      //   type: '',
      //   port: '',
      //   filePath: ''
      // };
      // this.tableDataForm = new_tableDataForm;
      this.tableData.map((item, index) => {
        this.tableDataForm.type = item.type;
        this.tableDataForm.port = item.port;
        this.tableDataForm.filePath = item.filePath;
      });
    },
    saveParameterConfiguration(formName) { //保存配置参数
      this.tableDataForm.port = Number(this.tableDataForm.port);
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          this.addAllocationParamer();
          this.ParameterConfigurationDig = !this.ParameterConfigurationDig;
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    getAllocationParamer() {
      //获取OpenOffice配置
      this.$http
        .post(this.api + "/dictionaryController/getAllocationParamer", {
          id: "2"
        })
        .then(res => {
          if (res.status == "200") {
            if (res.data.status == "200") {
              console.log(res.data);
              this.tableData = [];
              res.data.result.port = Number(res.data.result.port);
              this.tableData.push(res.data.result);
              this.$Message.success(res.data.message);
            } else {
              this.$Message.error(res.data.message);
            }
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
    },
    addAllocationParamer() {
      //保存OpenOffice配置
      this.$http
        .post(this.api + "/dictionaryController/addAllocationParamer", {
          id: "2",
          type: this.tableDataForm.type, //ip
          port: this.tableDataForm.port, //端口
          filePath: this.tableDataForm.filePath //安装目录
        })
        .then(res => {
          if (res.status == "200") {
            if (res.data.status == "200") {
              console.log(res.data);
              this.getAllocationParamer();
              this.$Message.success(res.data.message);
            } else {
              this.$Message.error(res.data.message);
            }
          }
        })
        .catch(error => {
          this.$Message.error("请求超时");
        });
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
    .primaryBtn {
      margin-bottom: 20px;
      button {
        float: right;
        margin: 0 10px;
      }
    }
  }
}
</style>
