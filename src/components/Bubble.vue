<template>
  <div class="bubble-message">
    <div class="bubble-inner-text">
      <slot></slot>
    </div>
  </div>
  <!--  <div class="bubble-message-footer"></div>-->
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, toRef} from "vue";
import {getPngSize, isPngSize} from "../util/myUtil";
import ImageUtil from "../util/imageUtil";
import {sys_store, user_diy_store} from "../store";
import {storeToRefs} from "pinia";
import {Bubble as BubbleType} from "../type/Diy";

const diyStore = user_diy_store(), sysStore = sys_store()

const props = defineProps<{
  size: number,
  bubble: BubbleType
}>()

const bubble = toRef(props, 'bubble')

const borderWidth = ref(560 * 5 / 14)
const zoom = 0.1 * props.size / 30
// console.log(borderWidth)
onMounted(async () => {
  // console.log(borderWidth)
})
</script>

<style scoped lang="scss">
.bubble-reverse {
  left: v-bind("`${borderWidth * zoom}px`");

  &::after {
    transform: scaleX(-1);
  }
}

.bubble-message {
  position: relative;
  display: block;
  width: fit-content;
  min-width: 1em;
  min-height: 1em;
  top: v-bind("`${borderWidth * zoom}px`");
  right: v-bind("`${borderWidth * zoom}px`");

  &:before {
    content: "";
  }

  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    height: 100%;
    width: 100%;
    zoom: v-bind(zoom);
    // 火狐不正常zoom
    -moz-transform: scale(0%);
    //-moz-transform-origin:bottom right;

    top: v-bind("`-${borderWidth}px`");
    left: v-bind("`-${borderWidth}px`");;
    border-style: solid;
    border-width: v-bind("`${borderWidth}px`");
    border-image-slice: v-bind(borderWidth) v-bind(borderWidth) v-bind(borderWidth) v-bind(borderWidth) fill;
    border-image-repeat: repeat;
    border-image-source: v-bind("`url('${bubble.url}')`");
    word-break: break-word;
    //transform: scaleX(-1);
  }

  .bubble-inner-text {
    position: relative;
    z-index: 99;
    //text-align: center;
  }
}
</style>