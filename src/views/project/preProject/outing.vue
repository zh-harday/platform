<template>
    <section class="outing">
        <el-form :model="outingData1" label-width="110px">
            <el-row>
                <el-col>
                    <el-form-item label="标题">
                        <el-input v-model="outingData1.title" auto-complete="off" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="退出类型">
                        <el-select v-model="outingData1.outingSort" placeholder="请选择退出类型" style="width:100%;">
                            <el-option label="类型一" value="类型一"></el-option>
                            <el-option label="类型二" value="类型二"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="退出金额（元）">
                        <el-input v-model="outingData1.outingMoney" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="相关附件">
                        <!-- action 上传的地址，必填 -->
                        <Upload multiple type="drag" :before-upload="handleUpload" v-model="outingData1.relativedAppendix" action="//jsonplaceholder.typicode.com/posts/">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="经办人">
                        <el-input v-model="outingData1.operator" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="经办日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="outingData1.handlingDate" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-table :data="outingData2" border>
            <el-table-column label="基金名称" prop="foundName" align="center">
            </el-table-column>
            <el-table-column label="投资金额（元）" prop="investment" align="center">
            </el-table-column>
            <el-table-column label="股权占比（%）" prop="percent" align="center">
            </el-table-column>
            <el-table-column label="回款金额（元）" prop="outingMoney" align="center">
                <template scope="scope">
                    <span v-if="!scope.row.editFlag">{{ scope.row.outingMoney }}</span>
                    <span v-if="scope.row.editFlag" class="cell-edit-input">
                        <el-input v-model="scope.row.outingMoney" placeholder=""></el-input>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template scope="scope">
                    <el-button v-if="!scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">编辑</el-button>
                    <el-button v-if="scope.row.editFlag" type="text" size="small" @click="checkEdit(scope.$index,scope.row)">保存</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row>
            <el-col style="margin-top:10px;">
                <el-button>保存</el-button>
                <el-button>取消</el-button>
            </el-col>
        </el-row>
    </section>
</template>


<script type="text/ecmascript-6">
export default {
    data() {
        return {
            outingData1: {
                title: 'AAA项目',
                outingSort: '',
                outingMoney: '',
                relativedAppendix: '',
                operator: '',
                handlingDate: '',

            },
            outingData2: [
                {
                    foundName: 'AA基金',
                    investment: '500,000',
                    percent: '10',
                    outingMoney: '10',
                    editFlag: false
                }
            ]
        }
    },
    methods: {
        checkEdit(index, row) {
            // console.log(row)
            row.editFlag = !row.editFlag;
        }
    }
}
</script>


<style lang="less" scoped>
.outing {
    width: 60%;
    margin: 0 auto;
    padding: 20px 10px;
    border: 2px solid #dfe6ec;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
