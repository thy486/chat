<template>
  <div class="dialog">
    <div class="dialog-avatar">
      <img :src="avatar" alt="头像加载失败"/>
    </div>
    <div class="dialog-body">
      <div class="dialog-body-name">
        good. mor
      </div>
      <div class="dialog-body-detail">
        描述东西描述东西描述东西描述东西描述东西描述东西描述东西描述东西
      </div>
    </div>
    <div class="dialog-tail">
      <div class="dialog-tail-lastDate">
        02-26
      </div>
      <div class="dialog-tail-unread"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {toRef} from "vue";

defineProps<{
  avatar: string
}>()

</script>

<style scoped lang="scss">
$main-height: 48px;
.dialog {
  width: 100%;
  height: $main-height;
  @include noSelect;

  .dialog-avatar {
    margin: 0 5px 0 5px;
    float: left;
    //height: 50px;
    height: 100%;
    @include box;
    width: 40px;

    img {
      @include noSelect;
      pointer-events: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    border-radius: 50%;
  }

  .dialog-body {
    $height: 40px;
    $padding-left: 8px;
    $width: calc(100% - 40px - 10px - 13px - 2.1rem - $padding-left - 5px);
    width: $width;
    height: $height;
    float: left;

    @include flex;
    text-align: left;
    flex-direction: column;
    justify-content: flex-start;
    font-family: argon Avenir, Helvetica, Arial, sans-serif;
    //justify-content: flex-start;
    padding: 4px 0 4px $padding-left;

    & > * {
      min-width: 0;
      @include hiddenOutText;
      letter-spacing: 1px;
    }

    .dialog-body-name {
      font-size: 15px;
      color: $black;
      font-weight: 500;
      height: calc($height / 2);
      padding-bottom: 2px;
    }

    .dialog-body-detail {
      padding-top: 2px;
      font-size: 10px;
      color: $gray-desc;
      height: calc($height / 2);
    }
  }

  .dialog-tail {
    height: 100%;
    margin: 0 10px 0 8px;
    float: right;
    color: $gray-desc;
    @include box;
    flex-wrap: wrap;
    width: 2.1rem;
    flex-direction: column;
    justify-content: flex-end;
    text-align: right;

    & > * {
      width: 100%;
      // 就两个元素
      $height: 24px;
      @include verticalMiddleByLine(24px);
    }

    .dialog-tail-lastDate {
      font-size: .8rem;
    }

    .dialog-tail-unread {
    }
  }

  @include clearfix;
}

</style>