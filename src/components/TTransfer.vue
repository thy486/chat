<template>
  <div class="t-transfer">
    <div class="t-transfer-header">
      <slot name="header">
        <div style="height: 30px; line-height: 30px;">页头</div>
      </slot>
    </div>
    <div class="t-transfer-body" @scroll="test">
      <slot></slot>
    </div>
    <div class="t-transfer-footer">
      <slot name="footer">
        <div style="height: 30px; line-height: 30px;">页尾</div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const test = (e: any) => {
  // console.log(e)
}
</script>

<style scoped lang="scss">
.t-transfer-column-reverse {
  .t-transfer-body {
    flex-direction: column-reverse;
  }
}
.t-transfer {
  @include beautifyScroll;
  position: relative;
  min-height: 300px;
  max-height: 100%;

  @mixin option-el {
    position: absolute;
    z-index: 99;
    @include box;
    width: 100%;
  }

  .t-transfer-header {
    left: 0;
    top: 0;
    //background-color: #409eff;
    @include option-el;
    flex-flow:row wrap;
    align-items:flex-start;
  }

  .t-transfer-body {
    z-index: 10;
    position: relative;
    display: flex;
    //overflow: auto;
    @include autoHiddenScrollY;
    height: 100%;
  }

  .t-transfer-footer {
    left: 0;
    bottom: 0;
    @include option-el;
    flex-flow:row wrap;
    align-items:flex-start;
  }
}
</style>