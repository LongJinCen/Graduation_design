<template>
    <div class="layout">
        <slot/>
    </div>
</template>
<script>
export default {
    name: 'Layout'
}
</script>
<style lang="less">
    .layout {
        background-color: #F9F9F9;
        position: relative;
        height: 100vh;
    }
</style>