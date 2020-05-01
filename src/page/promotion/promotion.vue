<template>
  <Layout>
    <navigator />
    <div class="promotion">
      <div class="promotion-header flex flex-vertical-center">
        <span class="text">
          今日消耗 &nbsp;<span class="number">{{ account.consumption }}</span>
        </span>
        <span class="text">
          帐户日预算 &nbsp;<span class="number">{{ account.budget }}</span>
        </span>
        <span class="text">
          帐户余额 &nbsp;<span class="number">{{ account.balance }}</span>
        </span>
      </div>
      <div class="promotion-table">
        <div class="promotion-table-operation clear-float">
          <el-button
            type="primary"
            class="float-left"
            size="small"
            @click="newCreative"
          >
            <i class="el-icon-plus" />
            新建创意
          </el-button>
          <el-date-picker
            v-model="filters.daterange"
            size="small"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            class="float-right"
            @change="dateChange"
          />
        </div>
        <el-table
          :data="tableData"
          stripe
          border
          @sort-change="sortChange"
        >
          <el-table-column
            prop="id"
            label="ID"
          />
          <el-table-column
            prop="createDate"
            label="创建日期"
            sortable="custom"
          />
          <el-table-column
            prop="status"
            label="广告创意状态"
          >
            <template slot-scope="scope">
              <span :class="stautsClass[scope.row.status]">{{ adStatus[scope.row.status] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <span
                class="link link-blue-text"
                @click="edit(scope.row)"
              >编辑</span>
              <span
                class="link link-blue-text"
                @click="del(scope.row)"
              >删除</span>
            </template>
          </el-table-column>
          <el-table-column
            :prop="adIndicators.consumption.key"
            :label="adIndicators.consumption.label"
            sortable="custom"
          />
          <el-table-column
            :prop="adIndicators.show.key"
            :label="adIndicators.show.label"
            sortable="custom"
          />
          <el-table-column
            :prop="adIndicators.clickNums.key"
            :label="adIndicators.clickNums.label"
            sortable="custom"
          />
          <el-table-column
            :prop="adIndicators.clickRate.key"
            :label="adIndicators.clickRate.label"
            sortable="custom"
          />
          <el-table-column
            :prop="adIndicators.convertNums.key"
            :label="adIndicators.convertNums.label"
            sortable="custom"
          />
          <el-table-column
            :prop="adIndicators.convertRate.key"
            :label="adIndicators.convertRate.label"
            sortable="custom"
          />
        </el-table>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/component/layout/layout.vue'
import Navigator from '@/component/navigator/navigator.vue'
import { dateRange, dateLabel, dateRangeKey, adIndicators, adStatus, adStatusKey } from '@/page/common.js'
export default {
  name: 'Promotion',
  components: {
    Layout,
    Navigator
  },
  data () {
    return {
      account: {
        balance: 2000,
        consumption: 100,
        budget: 500
      },
      filters: {
        daterange: []
      },
      pickerOptions: {
        shortcuts: [{
          text: dateLabel[dateRangeKey.today],
          onClick (picker) {
            picker.$emit('pick', dateRange[dateRangeKey.today])
          }
        }, {
          text: dateLabel[dateRangeKey.yesterday],
          onClick (picker) {
            picker.$emit('pick', dateRange[dateRangeKey.yesterday])
          }
        }, {
          text: dateLabel[dateRangeKey.passSeven],
          onClick (picker) {
            picker.$emit('pick', dateRange[dateRangeKey.passSeven])
          }
        }, {
          text: dateLabel[dateRangeKey.passThirty],
          onClick (picker) {
            picker.$emit('pick', dateRange[dateRangeKey.passThirty])
          }
        }, {
          text: dateLabel[dateRangeKey.thisWeek],
          onClick (picker) {
            picker.$emit('pick', dateRange[dateRangeKey.thisWeek])
          }
        }, {
          text: dateLabel[dateRangeKey.lastWeek],
          onClick (picker) {
            picker.$emit('pick', dateRange[dateRangeKey.lastWeek])
          }
        }, {
          text: dateLabel[dateRangeKey.thisMonth],
          onClick (picker) {
            picker.$emit('pick', dateRange[dateRangeKey.thisMonth])
          }
        }, {
          text: dateLabel[dateRangeKey.lastMonth],
          onClick (picker) {
            picker.$emit('pick', dateRange[dateRangeKey.lastMonth])
          }
        }]
      },
      tableData: [{
        id: '234567',
        createDate: '2018-09-10',
        status: 1,
        consumption: 100,
        show: 2000000,
        clickNums: 20000,
        clickRate: '20%',
        convertNums: 1000,
        convertRate: '1%'
      }, {
        id: '234567',
        createDate: '2018-09-10',
        status: 2,
        consumption: 100,
        show: 2000000,
        clickNums: 20000,
        clickRate: '20%',
        convertNums: 1000,
        convertRate: '1%'
      }, {
        id: '234567',
        createDate: '2018-09-10',
        status: 3,
        consumption: 100,
        show: 2000000,
        clickNums: 20000,
        clickRate: '20%',
        convertNums: 1000,
        convertRate: '1%'
      }],
      adIndicators,
      adStatus,
      stautsClass: {
        [adStatusKey.auditing]: [''],
        [adStatusKey.audited]: ['green'],
        [adStatusKey.reject]: ['red']
      }
    }
  },
  mounted () {
    this.getAccountData()
    this.getTableData()
  },
  methods: {
    dateChange () {
      this.getTableData()
    },
    newCreative () {
      window.open('/ad/creative.html?mode=create')
    },
    getAccountData () {
      // TODO: 发送接口获取帐户信息
    },
    getTableData () {
      // TODO: 获取 tabledata
    },
    sortChange (prop, sort) {
      console.log(prop, sort)
      this.getTableData()
    },
    edit (row) {
      window.open(`/ad/creative.html?mode=edit&id=${row.id}`)
    },
    del (row) {
      this.$confirm('确认删除？')
        .then(() => {
          // TODO:调用删除接口
        })
        .catch(() => {

        })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../style/variable.less";

.promotion {
  &-header {
    margin-top: 20px;
    background-color: @bg-color1;
    height: 48px;
    padding: 0 24px;

    .text {
      font-size: 12px;
      font-weight: 500;
      color: #666;
      margin-right: 40px;
    }

    .number {
      font-size: 14px;
      font-weight: 600;
      color: #333;
    }
  }

  &-table {
    margin-top: 20px;
    background-color: @bg-color1;
    padding-bottom: 50px;

    &-operation {
      padding: 10px 16px;
    }
  }

  .red {
    color: red;
  }

  .green {
    color: @font-green;
  }
}
</style>
