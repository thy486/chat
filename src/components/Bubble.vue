<template>
  <div class="bubble">
    <div class="bubble-text">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Bubble as BubbleType} from "../type/Diy";
import {computed, ref, toRef} from "vue";

const props = defineProps<{
  size: number,
  // bubble: BubbleType
}>()

const _height = toRef(props, 'size')
const height = ref(_height.value)
const width = computed(() => height.value / 7 * 8)
</script>

<style scoped lang="scss">
$width: v-bind("`${width}px`");
$height: v-bind("`${height}px`");
.bubble {
  width: fit-content;
  position: relative;
  display: inline-block;
  margin: $width $height $width $height;

  .bubble-text {
    position: relative;
    display: inline-block;
    min-width: v-bind("`${width * 0.5}px`");
    min-height: $height;
    z-index: 99;

    &::before {
      content: "";
      position: absolute;
      border-style: solid;
      width: 100%;
      height: 100%;
      top: v-bind("`${-height * 1.25}px`");
      left: v-bind("`${-width * 0.8}px`");
      //传入640 * 560的图片
      border-image-source: url(https://avatar-img.wuhan716.com/dress/%E7%94%9C%E7%94%9C%E5%85%94%E7%86%8A%E6%81%8B.png);
      border-image-slice: 200 200 200 200 fill;
      border-image-width: $width $height $width $height;
      border-width: $width $height $width $height;
      z-index: -1;
      transform: scaleX(-1);
    }
  }

  .bubble-box {

  }
}
.special {
  .bubble-text {
    &::before {
      left: v-bind("`${-width}px`");
      transform: scaleX(1);
    }
  }
}
</style>