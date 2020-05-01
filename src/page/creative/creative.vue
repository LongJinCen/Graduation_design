<template>
  <Layout>
    <div class="creative">
      <div class="creative-common creative-baseinfo">
        <div class="creative-common-title">
          基本信息
        </div>
        <div class="creative-baseinfo-form">
          <el-form
            ref="form1"
            label-width="100px"
            :model="detail"
            :rules="rules"
          >
            <el-form-item
              label="创意名称"
              prop="name"
            >
              <el-input v-model="detail.name" />
            </el-form-item>
            <el-form-item
              label="创意预算"
              prop="budget"
            >
              <el-input v-model="detail.budget" />
            </el-form-item>
            <el-form-item
              label="出价"
              prop="price"
            >
              <el-input v-model="detail.price" />
            </el-form-item>
            <el-form-item
              label="转化目标"
              prop="convertTarget"
            >
              <el-select
                v-model="detail.convertTarget"
                placeholder="请选择"
              >
                <el-option
                  v-for="(value, name) in convertTargetKey"
                  :key="name"
                  :label="convertTarget[value]"
                  :value="value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="落地页连接"
              prop="landPageUrl"
            >
              <el-input v-model="detail.landPageUrl" />
            </el-form-item>
            <el-form-item
              label="投放时间"
              prop="putTime"
            >
              <el-date-picker
                v-model="detail.putTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="creative-common creative-upload">
        <div class="creative-common-title">
          文件上传
        </div>
        <div class="creative-upload-detail">
          <el-form
            ref="form2"
            label-width="100px"
            :model="detail.creative"
            :rules="rules"
          >
            <el-form-item
              label="广告封面"
            >
              <el-upload
                ref="upload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :limit="1"
                action="#"
              >
                <i class="el-icon-plus" />
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img
                  width="100%"
                  :src="dialogImageUrl"
                >
              </el-dialog>
            </el-form-item>
            <el-form-item
              label="创意标题"
              prop="title"
            >
              <el-input v-model="detail.creative.title" />
            </el-form-item>
            <el-form-item
              label="创意描述"
              prop="description"
            >
              <el-input v-model="detail.creative.description" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="creative-common creative-footer relative clear-float">
        <el-button
          type="primary"
          class="creative-footer-submit"
          @click="submit"
        >
          创建创意
        </el-button>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/component/layout/layout.vue'
import * as tool from '@/util/tool.js'
import { convertTargetKey, convertTarget } from '@/page/common.js'
export default {
  name: 'Creative',
  components: {
    Layout
  },
  data () {
    return {
      query: {},
      detail: {
        name: '名称',
        budget: 0,
        price: 0.00,
        convertTarget: '',
        landPageUrl: '',
        putTime: '',
        creative: {
          title: '',
          description: ''
        }
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        budget: [{ required: true, message: '请输入预算', trigger: 'blur' }],
        price: [{ required: true, message: '请输入出价', trigger: 'blur' }],
        convertTarget: [{ required: true, message: '请选着转换目标', trigger: 'blur' }],
        landPageUrl: [{ required: true, message: '请填写落地页链接', trigger: 'blur' }],
        putTime: [{ required: true, message: '请选着投放时段', trigger: 'blur' }],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' }]
      },
      convertTargetKey,
      convertTarget,
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  mounted () {
    this.getQuery()
  },
  methods: {
    getQuery () {
      this.query = tool.getQuery(location.search)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove (file, fileList) {
    },
    handleSuccess (response, file, fileList) {

    }
  }
}
</script>

<style lang="less" scoped>
@import '../../style/variable.less';

.creative {
  &-common {
    position: relative;
    padding: 40px;
    background-color: @bg-color1;
    margin-bottom: 20px;
    border-radius: 4px;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.05);

    &-title {
      position: absolute;
      left: 10px;
      top: 10px;
      font-size: 18px;
      font-weight: 500;
      color: @font-black;
    }
  }

  &-baseinfo {
    &-form {
      width: 500px;

      .el-select {
        width: 400px;
      }
    }
  }

  &-upload {
    &-detail {
      width: 500px;
    }
  }

  &-footer {
    padding: 10px;

    &-submit {
      float: right;
    }
  }
}
</style>