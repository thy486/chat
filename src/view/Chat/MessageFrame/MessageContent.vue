<template>
  <div class="message-content">
    <BubbleMessage :is-self="true" :avatar="avatar" nickname="hhh" :message="{
      image: [{
        href: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      }],
      text: 'hhh'
    }"></BubbleMessage>
    <BubbleMessage :avatar="avatar" nickname="hhh"></BubbleMessage>

    <BubbleMessage :avatar="avatar"></BubbleMessage>

    <BubbleMessage :avatar="avatar"></BubbleMessage>
    <BubbleMessage :avatar="avatar"></BubbleMessage>
    <BubbleMessage :avatar="avatar"></BubbleMessage>
    <BubbleMessage :avatar="avatar"></BubbleMessage>
    <BubbleMessage :avatar="avatar"></BubbleMessage>
    <BubbleMessage :avatar="avatar"></BubbleMessage>
    <BubbleMessage :avatar="avatar"></BubbleMessage>
    <BubbleMessage :avatar="avatar"></BubbleMessage>

  </div>
</template>

<script lang="ts" setup>

import BubbleMessage from "../../../components/BubbleMessage.vue";
import {generatorAvatar} from "../../../util/myUtil";

const avatar = generatorAvatar()
</script>

<style scoped lang="scss">
.message-content {
  @include flex;
  height: 100%;
  flex-direction: column-reverse;
  overflow: auto;
  @include default-padding-r-l;
  @include autoHiddenScrollY;

  .message-content-bubble-message {
  }

  .special {
    align-self: flex-end;
  }
}
</style>