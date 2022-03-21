<template>
  <div class="user-frame">
    <div class="user-frame-header"></div>
    <UserDialog class="user-frame-body" @scroll="test"></UserDialog>
    <div class="user-frame-footer"></div>
  </div>
</template>

<script lang="ts" setup>

import UserDialog from "./MessageFrame/UserDialog.vue";
import {onBeforeUnmount, onMounted} from "vue";

const test = (e: any) => {
  // console.log(e)
}

function preventDefault(e: Event) {
  e.preventDefault();
}

onMounted(() => {
  // document.body.addEventListener('touchmove', preventDefault)
})

onBeforeUnmount(() => {
  // document.body.removeEventListener('touchmove', preventDefault)
})
</script>

<style scoped lang="scss">
.user-frame {
  @include beautifyScroll;
  @include flex;
  flex-direction: column;

  .user-frame-header, .user-frame-footer {
    background: rgba($gray-blue-2, 1);
    height: 50px;
  }

  .user-frame-body {
    flex: 1;
    background: $white;
  }

  .user-frame-footer {
    //background: rgba($gray-blue-2, .9);
    border-radius: 0 0 0 10px;
  }
}

</style>