<template>
  <div class="bubble-message">
    <template v-if="reverse">
      <Avatar :size="45" :url="avatar" class="bubble-message-avatar"></Avatar>
      <div class="bubble-message-bubble">
        <Bubble :size="20" :bubble="bubble" class="bubble-reverse">
          <slot></slot>
        </Bubble>
      </div>
    </template>
    <template v-else>
      <div class="bubble-message-bubble">
        <Bubble :size="20" :bubble="bubble">
          <slot></slot>
        </Bubble>
      </div>
      <Avatar :size="45" :url="avatar" class="bubble-message-avatar"></Avatar>
    </template>
  </div>
</template>

<script setup lang="ts">
import {Bubble as BubbleType} from "../type/Diy";

const diyStore = user_diy_store(), sysStore = sys_store()
import Bubble from "./Bubble.vue";
import {sys_store, user_diy_store} from "../store";
import {ref} from "vue";
import {generatorAvatar} from "../util/myUtil";
import Avatar from "./Avatar.vue";

const props = defineProps<{
  reverse: boolean,
  avatar: string
}>()

// const avatar = ref(generatorAvatar(Math.random().toString(36).slice(-1).toUpperCase()))
const bubble = ref(diyStore.bubble)
// const props = defineProps<{
//   bubble: BubbleType
// }>()
</script>

<style scoped lang="scss">
.bubble-message {
  @include flex;

  .bubble-message-avatar {
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0 v-bind("`${reverse ? '8px' : '0'}`") 0 v-bind("`${reverse ? '0' : '8px'}`");
  }
}
</style>