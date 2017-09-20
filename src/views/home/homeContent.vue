<template>
    <section v-loading.body="loading">
        <!-- 这是首页内容 -->
        <div>
            <el-row :gutter="20" style="margin:0;">
                <el-col :span="24" style="padding:0;">
                    <div>您好, 欢迎访问领投者平台管理系统</div>
                </el-col>
                <el-col :span="24" style="padding:0;">
                    <div>今日登陆次数:
                        <span>10</span>
                    </div>
                </el-col>
                <el-col :span="24" style="padding:0;">
                    <div>本次登陆IP:
                        <span>192.168.0.111</span>
                    </div>
                </el-col>
                <el-col :span="24" style="padding:0;">
                    <div>上次登陆IP:
                        <span>192.168.0.111</span>
                    </div>
                </el-col>
                <el-col :span="24" style="padding:0;">
                    <div>本次登陆时间:
                        <span>2017-07-17 11:11:11</span>
                    </div>
                </el-col>
            </el-row>
        </div>

    </section>
</template>

<style lang="less" scoped>
section{
    height: 95%;
    overflow: hidden;
    >div{
        min-height: 100%;
        background: #fff;
        position: relative;
        padding: 24px;
        div{
            margin: 10px;
        }
    }
}
</style>
<script>
import datatime from './datetmp.vue';
export default {
    components: { datatime },
    data() {
        return {
            loading: false,

        }
    },
    methods: {
        changePages(pageIndex) {
            this.$http.post('/url', { //此处ajax
                pageIndex: pageIndex
            })
                .then(function(response) {

                })
                .catch(function(error) {

                });

        },
        changetime(data) {
            console.log(data)
        },
        readyfun(arr, data) {
            var arr = arr;
            //先根据接口返回数据 修改arr 
            //然后再把arr赋值给monthdate
            arr.forEach(function(item) {
                return item.yd = item.day && item.day % 3 == 1 ? true : false;
            });
            this.monthDate = arr;
        }
    }
}

</script>


