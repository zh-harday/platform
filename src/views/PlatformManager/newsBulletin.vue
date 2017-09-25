<template>
  <section>
    <!-- 这是消息公告页面 -->
    <div>
      <el-row class="searchBox">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button @click="newAdd" class="searchIpt" type="primary">新增</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 新增消息 Dialog -->
      <el-dialog title="新增消息" :visible.sync="newsFormVisible" size="">
        <el-form :model="form" :data="newsFormData" ref="newsFormData">
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-form-item label="标题">
                  <el-input v-model="newsFormData.title" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-form-item label="内容">
                  <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="newsFormData.content">
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item label="发布人">
                  <el-input v-model="newsFormData.publisher" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <el-form-item label="发布日期">
                  <el-date-picker @change="getDateValue" v-model="newsFormData.publisherDate" type="date" auto-complete="off" placeholder="选择日期" :picker-options="pickerOptions0">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="newsFormSave">保 存</el-button>
          <el-button type="primary" @click="newsFormRelease">发 布</el-button>
        </div>
      </el-dialog>
      <!-- Dialog end -->
      <el-table :data="newsTabData" ref="newsTabData" border style="width: 100%">
        <el-table-column prop="msgTitle" label="标题" align="center">
          <template scope="scope">
            <span class="cursor" v-if="scope.row.pushType">{{ scope.row.msgTitle }}</span>
            <span v-if="!scope.row.pushType" class="cell-edit-input">
              <el-input v-model="scope.row.msgTitle" placeholder=""></el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="seedUserName" label="发布人" align="center">
          <template scope="scope">
            <span class="cursor" v-if="scope.row.pushType">{{ scope.row.seedUserName }}</span>
            <span v-if="!scope.row.pushType" class="cell-edit-input">
              <el-input v-model="scope.row.seedUserName" placeholder=""></el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="seedMsgDate" label="发布日期" align="center">
          <template scope="scope">
            <span class="cursor" v-if="scope.row.pushType">{{ scope.row.seedMsgDate }}</span>
            <span v-if="!scope.row.pushType" class="cell-edit-input">
              <el-input v-model="scope.row.seedMsgDate" placeholder=""></el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="pushType" label="状态" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button :disabled="scope.row.pushType == '已发布'" @click="checkEdit(scope.$index,scope.row)" type="primary" size="small">{{edit}}</el-button>
            <el-button type="primary" size="small" @click.native.prevent="newsTabData.splice(scope.$index,1)">删 除</el-button>
            <el-button type="primary" size="small" :disabled="scope.row.pushType == '已发布'" @click="pushSysMessageBtn(scope.row)">发 布</el-button>
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
    this.getSelectSysMessageList(1);
    console.log(this.user.userInfor.id);
    console.log(this.user.merchants[0].id);
  },
  data() {
    return {
      isRelease: false,
      newsTabData: [],
      newsFormData: {
        title: '', //标题
        content: "", //内容
        publisher: '', //发布人
        publisherDate: '', //发布日期
        status: "", //状态
        editFlag: false
      },
      page: {
        pageNum: '', //当前页码
        total: '', //数据总数
        pageSize: '', //每页条数
        navigatepageNums: '', //页数
        current: '', //当前页码
      },
      newsFormVisible: false,
      isRelease: false,
      edit: "编辑"
    }
  },
  methods: {
    newAdd() { //Add New Row
      let new_newsFormData = {
        title: '', //标题
        content: "", //内容
        publisher: '', //发布人
        publisherDate: '', //发布日期
        status: "", //状态
        editFlag: false
      };
      this.newsFormData = new_newsFormData;
      this.newsFormVisible = true;
    },
    newsFormSave() { //Save
      this.newsFormData.status = '未发布';
      this.newsTabData.push(this.newsFormData);
      // console.log(this.userListFormData.rolePeople);
      this.newsFormData = {};
      this.newsFormVisible = false;

    },
    newsFormRelease() { //Form Release
      this.newsFormData.status = '已发布';
      this.newsTabData.push(this.newsFormData);
      this.newsFormData = {};
      this.newsFormVisible = false;
    },
    checkEdit(index, row) {
      console.log(row);
      if (this.edit == '编辑') {
        this.edit = '保存';
        row.pushType = !row.pushType;
      } else if (this.edit == '保存') {
        this.edit = '编辑';
        row.pushType = !row.pushType;
      }
      // row.pushType = !row.pushType;
    },
    getDateValue(value) {
      this.newsFormData.publisherDate = value;
    },
    handleCurrentChangeBtn(pages) { //分页按钮
      this.getSelectSysMessageList(pages);
    },
    pushSysMessageBtn(row) { //列表发布按钮
      console.log(row);
      this.pushSysMessage(row.id, row.seedManageId);
    },
    getSelectSysMessageList(pages) { //获取平台端信息列表
      this.$http.post(this.api + '/sysManage/selectSysMessageList', {
        seedManageId: this.user.userInfor.id,
        page: pages,
        pageSize: 10
      })
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log('公告列表数据');
              console.log(res.data.result);
              res.data.result.list.forEach(function(item, index) {
                if (item.pushType == '1') {
                  item.pushType = '已发布';
                } else {
                  item.pushType = '未发布';
                }
              }, this);
              this.newsTabData = res.data.result.list;
              this.page.pageNum = res.data.result.pageNum; //当前页码
              this.page.total = res.data.result.total; //数据总数
              this.page.pageSize = res.data.result.pageSize; //每页条数
              this.page.navigatepageNums = res.data.result.navigatepageNums.length; //页数长度
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
    pushSysMessage(id, sendId) { //发布信息 api
      this.$http.post(this.api + '/sysManage/pushSysMessage', {
        id: id,
        seedManageId: sendId
      })
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              alert(555);
              console.log(res.data);
              this.getSelectSysMessageList(1);
              this.$Message.success(res.data.message);
            } else if (res.data.status == '155') {
              this.$Message.error(res.data.message);
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
    .searchBox {
      margin-bottom: 10px;
    }
    .searchIpt {
      float: right;
    }
  }
}
</style>
