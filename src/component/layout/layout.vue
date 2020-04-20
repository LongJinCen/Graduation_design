<template>
  <div class="layout">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'Layout'
}
</script>
<style lang="less">
@import "../../style/variable.less";

.layout {
  background-color: @bg-color;
  position: relative;
  height: 100vh;
  padding: 50px;
}
</style>
