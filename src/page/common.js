import moment from 'moment'
moment.locale('zh-cn')
const formatString = 'YYYY-MM-DD'

export const dateRangeKey = {
  today: 1,
  yesterday: 2,
  passSeven: 3,
  passThirty: 4,
  thisWeek: 5,
  lastWeek: 6,
  thisMonth: 7,
  lastMonth: 8
}

const today = moment().format(formatString)
const yesterday = moment().subtract(1, 'days').format(formatString)
const passSeven = moment().subtract(7, 'days').format(formatString)
const passThirty = moment().subtract(30, 'days').format(formatString)
const thisWeek = moment().startOf('week').format(formatString)
const lastWeek = moment().startOf('week').subtract(1, 'weeks').format(formatString)
const lastWeekEnd = moment().startOf('week').subtract(1, 'days').format(formatString)
const thisMonth = moment().startOf('month').format(formatString)
const lastMonth = moment().startOf('month').subtract(1, 'months').format(formatString)
const lastMonthEnd = moment().startOf('month').subtract(1, 'days').format(formatString)

export const dateRange = {
  [dateRangeKey.today]: [today, today],
  [dateRangeKey.yesterday]: [yesterday, yesterday],
  [dateRangeKey.passSeven]: [passSeven, today],
  [dateRangeKey.passThirty]: [passThirty, today],
  [dateRangeKey.thisWeek]: [thisWeek, today],
  [dateRangeKey.lastWeek]: [lastWeek, lastWeekEnd],
  [dateRangeKey.thisMonth]: [thisMonth, today],
  [dateRangeKey.lastMonth]: [lastMonth, lastMonthEnd]
}

export const dateOptions = [{
  label: '今天',
  value: dateRangeKey.today
}, {
  label: '昨天',
  value: dateRangeKey.yesterday
}, {
  label: '过去七天',
  value: dateRangeKey.passSeven
}, {
  label: '过去 30 天',
  value: dateRangeKey.passThirty
}, {
  label: '本周',
  value: dateRangeKey.thisWeek
}, {
  label: '上周',
  value: dateRangeKey.lastWeek
}, {
  label: '本月',
  value: dateRangeKey.thisMonth
}, {
  label: '上月',
  value: dateRangeKey.lastMonth
}]

export const adIndicators = {
  consumption: {
    label: '消耗',
    key: 'consumption'
  },
  show: {
    label: '展示数',
    key: 'show'
  },
  clickNums: {
    label: '点击数',
    key: 'clickNums'
  },
  clickRate: {
    label: '点击率',
    key: 'clickRate'
  },
  convertNums: {
    label: '转化数',
    key: 'convertNums'
  },
  convertRate: {
    label: '转换率',
    key: 'convertRate'
  }
}
