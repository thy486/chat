<template>
  <div class="avatar-box">
    <img :src="props.url" alt="fail"/>
  </div>
</template>

<script setup lang="ts">
import {toRef} from "vue";

const props = defineProps<{
  url: string,
  size: number
}>()

const size = toRef(props, 'size')
</script>

<style scoped lang="scss">
.avatar-box {
  @include box;
  width: v-bind("`${size}px`");
  img {
    @include noSelect;
    border-radius: 50%;
    pointer-events: none;
    width: v-bind("`${size}px`");
    height: v-bind("`${size}px`");
  }
}
</style>