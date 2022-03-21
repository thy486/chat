<template>
  <div class="dialog">
    <div class="dialog-avatar">
      <Avatar :url="props.avatar" :size="40" />
    </div>
    <div class="dialog-content">
      <div class="dialog-content-body">
        <div class="dialog-content-body-name">
          <div class="dialog-content-name-inner">
            {{ props.name }}
          </div>
        </div>
        <div class="dialog-content-body-icon">

        </div>
      </div>
      <div class="dialog-content-summary">
        <div class="dialog-content-summary-inner">
          {{ props.summary }}
        </div>
      </div>
    </div>
    <div class="dialog-tail">
      <div class="dialog-tail-last-date">
        11:32
      </div>
      <div class="dialog-tail-unread">

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from "./Avatar.vue";

const props = defineProps<{
  avatar: string,
  name: string,
  summary: string,
}>()
</script>

<style scoped lang="scss">
@mixin flex-column {
  @include flex;
  flex-direction: column;
}
.dialog {
  @include flex;
  height: 50px;

  //overflow: hidden;

  .dialog-avatar {
    @include box;
    width: 50px;
    padding-right: 5px;
  }

  .dialog-content {
    flex: 1;
    @include flex-column;
    //align-items: flex-start;

    // 省略号必要
    overflow: hidden;

    & > * {
      // 必要，固定宽度
      //max-width: 100%;
      text-align: left;
    }

    // 添加 div 否则 flex 会导致省略号不出现
    .dialog-content-summary-inner, .dialog-content-name-inner {
      line-height: 30px;
      @include hiddenOutText;
    }

    .dialog-content-body {
      font-size: 18px;
      height: 25px;
      @include flex;

      .dialog-content-body-name {
        overflow: hidden;
      }
    }
    .dialog-content-summary {
      color: $gray-desc;
      font-size: 12px;
      flex: 1;
    }
  }

  .dialog-tail {
    width: 40px;
    @include flex-column;
    //align-items: center;
    justify-content: center;
    padding-right: 5px;

    .dialog-tail-last-date {
      height: 20px;
      color: $gray-desc;
      font-size: 12px;
      @include verticalMiddleByLine(20px);
    }

    .dialog-tail-unread {
      @include verticalMiddleByLine(20px);
      flex: 1;
    }
  }
}

</style>