<template>
  <section>
    <!-- 这是会员管理页面 -->
    <div>
      <el-row class="customerMang">
        <el-col :span="6">
          <div class="grid-content bg-purple-dark">
            <el-input placeholder="" icon="search" v-model="input2" :on-icon-click="searchHandling">
            </el-input>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>
      </el-row>
      <el-table :data="memberMTabData" border style="width: 100%">
        <el-table-column :fixed="left" prop="phone" label="手机号" align="center" width="">
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center" width="">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" align="center" width="">
        </el-table-column>
        <!-- <el-table-column prop="inBusiness" label="所在企业" align="center" width="185">
                            </el-table-column> -->
        <el-table-column prop="emil" label="邮箱" align="center" width="">
        </el-table-column>
        <el-table-column prop="createTime" label="注册日期" align="center" width="">
        </el-table-column>
        <el-table-column prop="disables" label="状态" align="center" width="">
        </el-table-column>
        <!-- <el-table-column prop="remarks" label="备注" align="center" width="185">
                            </el-table-column> -->
        <el-table-column :fixed="right" label="操作" align="center" width="">
          <template scope="scope">
            <el-button :disabled="scope.row.disables == '锁定'" @click="locking(scope.$index,scope.row,0)" type="primary" size="small">锁 定</el-button>
            <el-button :disabled="scope.row.disables == '启用'" @click="locking(scope.$index,scope.row,1)" type="primary" size="small">启 用</el-button>
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
    this.customerMangList('', 1, 10);
  },
  data() {
    return {
      memberMTabData: [], //会员管理列表数据
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
    searchHandling() {
      this.customerMangList(this.input2, 1, 10);
    },
    locking(index, row, type) { //锁定
      // row.status = '锁定';
      if (type == '0') {
        this.resetPass(row.id, 0);
      } else if (type == '1') {
        this.resetPass(row.id, 1);
      }
    },
    resetPass(id, type) { //锁定/启用 平台会员 api
      this.$http.post(this.api + '/user/resetPass', {
        id: id,
        disables: type
      })
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log(res.data);
              this.customerMangList();
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
      this.customerMangList('',1,pageSize);
    },
    handleCurrentChangeBtn(pageNum) { //分页按钮
      // alert(555);
      console.log(pageNum);
      this.customerMangList('',pageNum, 10);
    },
    customerMangList(name, page, pageSize) { //查询平台会员列表数据
      this.$http.post(this.api + '/user/queryUserInfo', {
        "name": name,
        "page": page,
        "pageSize": pageSize
        // "disables": 1,
      })
        .then(res => {
          if (res.status == '200') {
            if (res.data.status == '200') {
              console.log(res.data);
              res.data.result.list.forEach(function(item) {
                // alert(item.disables);
                if (item.disables == '0') {
                  item.disables = '锁定';
                } else if (item.disables == '1') {
                  item.disables = '启用';
                }
                item.createTime = getDate(item.createTime);
              }, this);
              this.memberMTabData = res.data.result.list;
              this.page.pageNum = res.data.result.pageNum; //当前页码
              this.page.total = res.data.result.total; //数据总数
              this.page.pageSize = res.data.result.pageSize; //每页条数
              this.page.navigatepageNums = res.data.result.navigatepageNums.length; //页数长度
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
  }
}
</style>

