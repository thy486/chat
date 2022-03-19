<template>
  <t-transfer class="user-frame">
    <template #header>
      <div class="user-frame-header">

      </div>
    </template>
    <template #default>
      <div class="user-frame-body" @scroll="test">
        <div class="user-frame-body-item-hidden">我是隐藏的刷新</div>
        <div class="user-frame-body-item-search"><span>搜索</span></div>
        <Dialog class="user-frame-body-item user-frame-body-item-special" :avatar="a"></Dialog>
        <Dialog class="user-frame-body-item" :avatar="a"></Dialog>
        <Dialog class="user-frame-body-item" :avatar="a"></Dialog>
        <Dialog class="user-frame-body-item" :avatar="a"></Dialog>
        <Dialog class="user-frame-body-item" :avatar="a"></Dialog>
        <Dialog class="user-frame-body-item" :avatar="a"></Dialog>
        <Dialog class="user-frame-body-item" :avatar="a"></Dialog>
        <Dialog class="user-frame-body-item" :avatar="a"></Dialog>
        <Dialog class="user-frame-body-item" :avatar="a"></Dialog>
        <Dialog class="user-frame-body-item" :avatar="a"></Dialog>
        <Dialog class="user-frame-body-item" :avatar="a"></Dialog>
        <Dialog class="user-frame-body-item" :avatar="a"></Dialog>
        <Dialog class="user-frame-body-item" :avatar="a"></Dialog>
        <Dialog class="user-frame-body-item" :avatar="a"></Dialog>
        <Dialog class="user-frame-body-item" :avatar="a"></Dialog>
        <Dialog class="user-frame-body-item" :avatar="a"></Dialog>

      </div>
    </template>
    <template #footer>
      <div class="user-frame-footer">

      </div>
    </template>
  </t-transfer>
</template>

<script setup lang="ts">
import TTransfer from '../../components/TTransfer.vue'
import Dialog from "../../components/Dialog.vue";
import {generatorAvatar} from "../../util/myUtil";
import {onMounted, ref, onBeforeUnmount} from "vue";

const a = ref(generatorAvatar(Math.random().toString(36).slice(-1).toUpperCase()) || "")

onMounted(() => {
  // scrollView.value.onm
})
const test = (e: any) => {
  console.log(e)
}
onBeforeUnmount(() => {
})
</script>

<style scoped lang="scss">
.user-frame {
  $bg-color: $tab-color;
  $msg-bg-color: lighten($message-bg-color, .5);
  $body-bg-color: white;

  .user-frame-header {
    width: 100%;
    height: 50px;
    background: $bg-color;
  }

  .user-frame-body {
    background: $body-bg-color;
    @include autoHiddenScrollY;

    .user-frame-body-item-hidden {
      padding-top: 20px;
      width: 100%;
      @include verticalMiddleByLine(30px);
    }

    .user-frame-body-item-search {
      background: $msg-bg-color;
      @include box;

      span {
        @include verticalMiddleByLine(30px);
        margin: 5px 0 5px 0;
        display: block;
        width: 94.3%;
        font-size: 14px;
        //padding: 5px 20px 5px 20px;
        border-radius: 20px;
        background: $body-bg-color;
        //@include bubble($white);
      }
    }

    .user-frame-body-item {
      height: 48px;
      background: $body-bg-color;

      &:hover {
        background: $msg-bg-color;
      }
    }

    .user-frame-body-item-special {
      background: $msg-bg-color;

      &:hover {
        background: $body-bg-color;
      }
    }

  }

  .user-frame-footer {
    width: 100%;
    height: 50px;
    background: rgba($bg-color, .9);
  }
}
</style>