<template>
    <div class="eventBox">
        <el-form :model="eventForm" label-width="80px" class="eventForm">
            <el-form-item label="汇报事项">
                <el-select v-model="eventForm.event" placeholder="请选择汇报事项" style="width: 100%;">
                    <el-option label="上市进展情况" value="上市进展情况"></el-option>
                    <el-option label="重大股东会决议" value="重大股东会决议"></el-option>
                    <el-option label="重大董事会决议" value="重大董事会决议"></el-option>
                    <el-option label="重大监事会决议" value="重大监事会决议"></el-option>
                    <el-option label="重大投资事项" value="重大投资事项"></el-option>
                    <el-option label="重大筹融资事项" value="重大筹融资事项"></el-option>
                    <el-option label="对赌执行情况" value="对赌执行情况"></el-option>
                    <el-option label="股权变更" value="股权变更"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="事项日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="eventForm.date" style="width:100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="事项内容">
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="eventForm.content">
                </el-input>
            </el-form-item>
            <el-form-item label="相关文档">
                <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或将文件拖拽到这里上传</p>
                    </div>
                </Upload>
            </el-form-item>
            <el-button type="danger" class="submit-btn" @click="submitRecord">提交</el-button>
        </el-form>
        <div class="recordArea">
            <Timeline>
                <TimelineItem v-for="(item,index) in recordList" :key="item.index" class="recordContent">
                    <b>{{item.year}}</b>
                    <div class="recordText">
                        <p>
                            <span>{{item.userName}}</span>
                            <span>{{item.date}}</span>
                        </p>
                        <p>{{item.recordText}}</p>
                        <p>
                            <el-button type="text" class="delbtn" @click="delRecord(index)">删除</el-button>
                        </p>
                    </div>
                </TimelineItem>
            </Timeline>
        </div>
    </div>
</template>




<script type="text/ecmascript-6">
import tabelHeader from 'components/tabelHeader'
export default {
    data() {
        return {
            value: {
                text: ''
            },
            eventForm: {
                event: '',
                date: '',
                content: ''
            },
            recordList: [
                {
                    userName: '张三',
                    date: '2018-5-9 12:25',
                    recordText: '拜访客户，进行相关数据收集',
                    year: '2017'
                },
                {
                    userName: '张三',
                    date: '2018-5-9 12:25',
                    recordText: '拜访客户，进行相关数据收集',
                    year: '2017'
                },
                {
                    userName: '张三',
                    date: '2018-5-9 12:25',
                    recordText: '拜访客户，进行相关数据收集',
                    year: '2016'
                }
            ]
        }
    },
    methods: {
        submitRecord() {
            console.log(this.value);
            this.recordList.push(this.value);

        },
        delRecord(index) {
            this.recordList.splice(index, 1);
        }

    },
    components: {
        tabelHeader
    }
}

</script>



<style  lang="less" scoped>
.title {
    color: #fff;
}

.eventBox {
    width: 100%;
    height: 100%;
    .eventForm {
        padding: 0 50px;
        margin: 25px 0;
        .submit-btn {
            margin-left: 40%;
            width: 20%;
            color: #fff;
            margin-top: 5px;
        }
    }
    .recordArea {
        padding: 30px 120px;
        .recordContent {
            position: relative;
            b {
                position: absolute;
                top: -10px;
                left: -40px;
            }
            .recordText {
                position: relative;
                width: 95%;
                height: 120px;
                display: inline-block;
                font-size: 14px;
                vertical-align: middle;
                background: #eef0f4;
                margin-left: 30px;
                padding: 18px 50px;
                text-align: left;
                border-radius: 10px;
                &::before {
                    content: '';
                    width: 0;
                    height: 0;
                    position: absolute;
                    top: 40px;
                    left: -19px;
                    border-bottom: 20px solid #eef0f4;
                    border-left: 20px solid transparent;
                }
                p {
                    margin-bottom: 5px;
                    span {
                        margin-right: 20px;
                    }
                    .delbtn {
                        float: right;
                    }
                }
            }
        }
    }
}
</style>
