<template>
  <div class="chat-room">
    <TopBar class="chat-room-top-bar"/>
    <div class="chat-room-body">
      <UserFrame2 class="chat-room-user-frame">
      </UserFrame2>
      <MessageFrame2 class="chat-room-content">
      </MessageFrame2>
    </div>
  </div>
</template>

<script setup lang="ts">
import TopBar from "../components/TopBar.vue";
import UserFrame2 from "./Chat/UserFrame.vue";
import MessageFrame2 from "./Chat/MessageFrame.vue";
import {onMounted} from "vue";
import {sys_store} from "../store";

const sysStore = sys_store()
sysStore.loadingBegin()

onMounted(() => {
  sysStore.loadingEnd()
})
</script>


<style scoped lang="scss">

.chat-room {
  @include flex;
  // 垂直布局
  flex-direction: column;
  height: calc(100vh - 16px);

  .chat-room-top-bar {
    height: 20px;
    border-radius: 10px 10px 0 0;
    //flex: 1;
  }

  .chat-room-body {
    @include flex;
    flex: 1;
    height: 0;
    overflow:hidden;
    word-wrap:break-word;
    word-break:break-all;

    .chat-room-user-frame {
      flex: 1;
      min-width: 300px;
      max-width: min(30%, 412px);
      //background: $gray-blue-2;
      border-radius: 0 0 0 10px;
      box-shadow: -.5px 0 $gray-blue-2;
    }

    .chat-room-content {
      flex: 1;
      background: $gray-light;
      border-radius: 0 0 10px 0;
      box-shadow: .5px 0 $gray-blue-2;
    }
  }
}
</style>