<template>
  <div class="navigator absolute">
    <span class="navigator-title">
      广告投放平台
    </span>
    <div class="navigator-menu">
      <span
        :class="indexClass"
        @click="redirect('index')"
      >首页</span>
      <span
        :class="promotionClass"
        @click="redirect('promotion')"
      >推广</span>
    </div>
    <div class="navigator-user">
      <el-dropdown @command="accountOperation">
        <div class="navigator-userinfo">
          <img :src="userIcon">
          <div class="navigator-userinfo-detail">
            <span class="one-line-overflow">{{ account.name }}</span>
            <span class="one-line-overflow">ID：{{ account.id }}</span>
          </div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginOut">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import userIcon from '../../../assets/userIcon1.svg'
import axios from 'axios'
import apis from '@/const/api.js'

export default {
  name: 'Navigator',
  data () {
    return {
      activeIndex: 1,
      account: {
        name: 'longjincen',
        id: 1234
      },
      userIcon
    }
  },
  computed: {
    indexClass () {
      return ['menu-item', this.activeIndex === 1 ? 'menu-active' : '']
    },
    promotionClass () {
      return ['menu-item', this.activeIndex === 2 ? 'menu-active' : '']
    }
  },
  mounted () {
    this.confirmPage()
    this.getAccountData()
  },
  methods: {
    getAccountData() {
      axios.get(apis.user.account).then((data) => {
        data = data.data
        this.account.name = data.accountName
        this.account.id = data._id
      })
    },
    redirect (type) {
      console.log(type, 'type')
      switch (type) {
        case 'index':
          this.activeIndex = 1
          location.href = '/ad/index.html'
          break
        case 'promotion':
        case 'creative':
          this.activeIndex = 2
          location.href = '/ad/promotion.html'
          break
        case 'login':
          location.href = '/ad/login.html'
          break
        default:
          break
      }
    },
    confirmPage () {
      const page = location.href.match(/.*\/(\w+)\.html.*/)[1]
      switch (page) {
        case 'index':
          this.activeIndex = 1
          break
        case 'promotion':
        case 'creative':
          this.activeIndex = 2
          break
        default:
          break
      }
    },
    accountOperation (command) {
      switch (command) {
        case 'loginOut':
          axios.post(apis.user.loginOut).then((data) => {
            if (data.data.code === 0) {
              this.redirect('login')
            } else {
              this.$message(data.data.message)
            }
          })
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navigator {
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background-color: #0a2140;

  &-title {
    font-size: 17px;
    font-weight: 400;
    color: #fff;
    margin-left: 40px;
    line-height: 64px;
  }

  &-menu {
    margin-left: 50px;
    display: inline-block;
    color: #999;
  }

  .menu-item {
    margin-right: 30px;
    cursor: pointer;
    position: relative;
  }

  .menu-active {
    color: #fff;

    &::after {
      position: absolute;
      content: ' ';
      height: 4px;
      width: 25px;
      border-radius: 4px;
      background-color: #2f88ff;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      bottom: -10px;
    }
  }

  &-user {
    position: absolute;
    top: 0;
    right: 80px;
  }

  &-userinfo {
    height: 64px;
    display: flex;
    align-items: center;

    img {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid #d6d6d6;
      margin-right: 10px;
      background-color: rgb(35, 50, 74);
    }

    &-detail {
      display: flex;
      flex-direction: column;
      justify-content: center;

      span {
        display: inline-block;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        color: rgba(255, 255, 255, 0.75);
      }
    }
  }
}
</style>
