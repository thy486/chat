<template>
  <div class="message-frame">
    <div class="message-frame-header"></div>
    <MessageContent class="message-frame-body">
    </MessageContent>
    <div class="message-frame-footer"></div>
  </div>
</template>

<script lang="ts" setup>
import MessageContent from "./MessageFrame/MessageContent.vue";
</script>

<style scoped lang="scss">
.message-frame {
  @include flex;
  flex-direction: column;
  @include beautifyScroll;

  .message-frame-header, .message-frame-footer {
    background: $gray-blue-2;
  }
  .message-frame-header {
    height: 50px;
  }
  .message-frame-footer {
    height: 80px;
    @include default-padding-t-b;
    margin-top: 1rem;

    border-radius: 0 0 10px 0;
  }
  .message-frame-body {
    padding-top: 1rem;
    flex: 1;
  }
}
</style>