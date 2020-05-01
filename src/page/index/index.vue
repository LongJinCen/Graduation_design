<template>
  <Layout>
    <navigator />
    <div class="index">
      <div class="index-part1 index-common flex flex-vertical-center">
        <div class="index-part1-info relative clear-float">
          <img
            :src="userIcon"
            class="img absolute-vertical-center"
          >
          <div class="account absolute-vertical-center">
            <div class="one-line-overflow">
              {{ account.username }}
            </div>
            <div class="one-line-overflow">
              ID：{{ account.userId }}
            </div>
          </div>
        </div>
        <div class="index-part1-balance relative clear-float">
          <img
            src="https://s1.pstatp.com/bytecom/platform_web/static/image/balance.svg?7dc45da98d3acdbde20b3f2b4e6eb791"
            class="absolute-vertical-center"
          >
          <div class="position absolute-vertical-center">
            <div class="title">
              帐户余额
            </div>
            <div class="content on-line-overflow">
              {{ account.balance }}
            </div>
          </div>
        </div>
        <div class="index-part1-consumption relative clear-float">
          <img
            src="https://s1.pstatp.com/bytecom/platform_web/static/image/consume.svg?9bd7b70a409309e862b0174f252b7470"
            class="absolute-vertical-center"
          >
          <div class="position absolute-vertical-center">
            <div class="title">
              今日消耗
            </div>
            <div class="content on-line-overflow">
              {{ account.consumption }}
            </div>
          </div>
        </div>
        <div class="index-part1-budget relative clear-float">
          <img
            src="https://s1.pstatp.com/bytecom/platform_web/static/image/budget.svg?f55db195e1bd18d103ec65eb329e5699"
            class="absolute-vertical-center"
          >
          <div class="position absolute-vertical-center">
            <div class="title">
              账户日预算
            </div>
            <div class="content on-line-overflow">
              {{ account.budget }}
            </div>
          </div>
        </div>
        <el-button
          type="primary"
          class="index-part1-new absolute-vertical-center"
          @click="newAd"
        >
          <i class="el-icon-plus" />
          新建广告
        </el-button>
      </div>
      <div class="index-common index-part2 flex">
        <div class="index-part2-card-common">
          <div class="inline-block horizontal-center position">
            <div class="text-center blue number">
              {{ account.putIntPlains }}
            </div>
            <div class="title">
              投放创意 <i class="el-icon-arrow-right" />
            </div>
          </div>
        </div>
        <div class="index-part2-card-common position">
          <div class="inline-block horizontal-center">
            <div class="text-center red number">
              {{ account.auditRejectPlains }}
            </div>
            <div class="title">
              审核不通过创意 <i class="el-icon-arrow-right" />
            </div>
          </div>
        </div>
        <div class="index-part2-card-common position">
          <div class="inline-block horizontal-center">
            <div class="text-center number">
              {{ account.budgetShortPlains }}
            </div>
            <div class="title">
              预算不足创意 <i class="el-icon-arrow-right" />
            </div>
          </div>
        </div>
        <div class="index-part2-card-common position">
          <div class="inline-block horizontal-center">
            <div class="text-center number">
              {{ account.problemPlains }}
            </div>
            <div class="title">
              问题创意 <i class="el-icon-arrow-right" />
            </div>
          </div>
        </div>
      </div>
      <div class="index-common index-part3">
        <div class="index-part3-head flex flex-horizontal-between">
          <span class="index-part3-head-title">
            广告数据
          </span>
          <el-select
            v-model="adDataDate"
            size="mini"
            @change="getAdIndicators"
          >
            <el-option
              v-for="item in dateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="index-part3-body flex flex-horizontal-between">
          <div
            v-for="item in adIndicators"
            :key="item.key"
            class="data"
          >
            <div class="data-title">
              {{ item.label }}
            </div>
            <div class="content">
              {{ adIndicatorsValue[item.key] }}
            </div>
            <div class="data-other">
              --
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
<script>
import Layout from '@/component/layout/layout.vue'
import Navigator from '@/component/navigator/navigator.vue'
import { dateRangeKey, dateOptions, adIndicators } from '@/page/common.js'
import userIcon from '../../../assets/userIcon.svg'
export default {
  name: 'Login',
  components: {
    Layout,
    Navigator
  },
  data () {
    return {
      account: {
        username: '隆金岑',
        userId: '1234567878',
        balance: 2000,
        consumption: 100,
        budget: 500,
        putIntPlains: 0,
        auditRejectPlains: 0,
        budgetShortPlains: 0,
        problemPlains: 0
      },
      adDataDate: dateRangeKey.today,
      dateOptions,
      adIndicators,
      adIndicatorsValue: {
        consumption: 0,
        show: 0,
        clickNums: 0,
        clickRate: 0,
        convertNums: 0,
        convertRate: 0
      },
      userIcon
    }
  },
  mounted () {
    this.getAccountData()
    this.getAdIndicators()
  },
  methods: {
    getAccountData () {
      // TODO: 发送接口获取帐户信息
    },
    getAdIndicators (value) {
      // TODO: 获取广告各项指标
    },
    newAd () {
      location.href = '/ad/promotion.html'
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../style/variable.less";

.index {
  width: 1152px;
  margin: 0 auto;
  margin-top: 20px;

  &-common {
    padding: 16px 24px;
    border-radius: 4px;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.05);
    position: relative;
    margin-bottom: 16px;

    .content {
      font-weight: 500;
      font-size: 20px;
      line-height: 32px;
      color: @font-black;
    }
  }

  &-part1 {
    background-color: @bg-color1;

    & > div {
      height: 72px;
      width: 220px;
    }

    &-info {
      .img {
        display: inline-block;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        border: 1px solid;
        overflow: hidden;
      }

      .account {
        display: inline-block;
        left: 55px;

        & > div:first-of-type {
          margin-bottom: 5px;
          font-weight: 600;
          font-size: 14px;
        }

        & > div:last-of-type {
          color: #666;
          font-size: 12px;
        }
      }
    }

    &-balance,
    &-consumption,
    &-budget {
      .position {
        left: 40px;
      }

      .title {
        color: #999;
        font-size: 12px;
        line-height: 20px;
      }
    }

    &-new {
      right: 40px;
    }
  }

  &-part2 {
    justify-content: space-between;
    padding: 0;

    &-card-common {
      display: inline-block;
      width: 230px;
      height: 57px;
      padding: 16px 24px;
      background: @bg-color1;
      border-radius: 4px;
      box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.05);

      .title {
        font-size: 12px;
        line-height: 20px;
        cursor: pointer;
      }

      &:hover {
        box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);

        .title {
          color: @font-bule;
        }
      }

      .position {
        height: 72px;
      }

      .number {
        margin-bottom: 5px;
        font-size: 24px;
        line-height: 32px;
        cursor: pointer;
      }

      .blue {
        color: @font-bule;
      }

      .red {
        color: #f45858;
      }
    }
  }

  &-part3 {
    background-color: @bg-color1;

    &-head {
      &-title {
        font-weight: 600;
        font-size: 16px;
      }
    }

    &-body {
      padding: 0 30px;
      margin-top: 20px;

      .data {
        width: 16%;
        height: 76px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        &-title {
          font-size: 12px;
          line-height: 20px;
          color: @font-black;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
