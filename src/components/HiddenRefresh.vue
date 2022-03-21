<template>
  <div class="hidden-refresh">
    <div class="hidden-refresh-body">
      <div class="hidden-refresh-body-icon">
        <LoadingOutlined style="margin-right: 1rem;" />刷新中
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LoadingOutlined } from '@ant-design/icons-vue'
const props = defineProps<{
  height: number
}>()
</script>

<style scoped lang="scss">
.hidden-refresh {
  position: relative;
  width: 100%;

  .hidden-refresh-body {
    position: absolute;
    width: 100%;
    //top: -40px;
    bottom: 0;
    height: v-bind("`${props.height}px`");
    padding-top: $default-pad * 2;

    .hidden-refresh-body-icon {
      height: 100%;
      @include box;
    }
  }
}
.special {
  .hidden-refresh-body {
    background: $gray-light !important;
  }

}
</style>