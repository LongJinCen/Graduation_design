<template>
  <div class="test1">
    <iframe
      ref="iframe"
      src="https://segmentfault.com/"
    />
    <div
      ref="hidden"
      class="test1-hidden"
    />
    <div
      class="test1-advertising1"
      @click="goAdClick"
    >
      <p class="test1-advertising1-title">
        {{ title }}
      </p>
      <img :src="url">
      <p class="test1-advertising1-description">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apis from '@/const/api.js'
export default {
  name: 'TextSite1',
  data () {
    return {
      url: '',
      title: '驾照',
      description: '轻松拿驾照来龙氏驾校',
      landing: '',
      id: ''
    }
  },
  mounted () {
    this.getAdInfo()
  },
  methods: {
    goAdClick () {
      window.open(this.landing)
      this.updateIndicator('clickNums')
    },
    getAdInfo () {
      axios.get(apis.bidding.getAd).then(data => {
        data = data.data
        if (data.code === 0) {
          this.url = data.data.fileList[0].url
          this.landing = data.data.landPageUrl
          this.title = data.data.creative.title
          this.description = data.data.creative.description
          this.id = data.data._id
          this.updateIndicator('show')
        }
      })
    },
    updateIndicator (target) {
      axios.post(apis.creative.updateIndicator, {
        id: this.id,
        target
      })
    }
  }
}
</script>

<style lang="less" scoped>
  iframe {
    width: 100%;
    height: 100vh;
  }

  .test1 {
    &-advertising1 {
      position: absolute;
      width: 200px;
      height: 50px;
      z-index: 50;
      right: 200px;
      top: 100px;
      cursor: pointer;

      img {
        width: 100%;
      }

      p {
        color: #9e9e9e;
        font-size: 12px;
      }
    }

    &-hidden {
      position: absolute;
      width: 260px;
      height: 1000px;
      z-index: 30;
      background-color: #fff;
      right: 200px;
      top: 80px;
    }
  }
</style>
