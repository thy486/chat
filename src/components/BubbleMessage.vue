<template>
  <div :class="{'bubble-message': true, special: props.isSelf}">
    <Avatar class="bubble-message-avatar" :size="40" :url="props.avatar"/>
    <div class="bubble-message-body">
      <div class="bubble-message-body-name" v-if="props.nickname">
        {{ props.nickname }}
      </div>
      <div class="bubble-message-body-bubble">
        <div class="bubble-message-body-inner-content">
          <img v-if="props.message?.text === undefined && props.message?.image?.length === 1"
               :src="props.message.image[0].href"
               alt=""
               style="max-width: 12rem; border-radius:  1.2rem;"/>
          <Bubble class="bubble-message-body-inner-content-bubble" :size="bubbleSize" :class="{special: props.isSelf}"
                  v-else>
            <div class="bubble-message-body-inner-content-bubble-text">
              {{ props?.message?.text ?? `1` }}
            </div>
            <div v-for="img in (props.message?.image || [])" class="bubble-message-body-inner-content-bubble-image">
              <img alt="" :src="img.href" style="max-width: 8rem; border-radius:  1rem; margin-top: .5rem;"/>
            </div>
            <div class="bubble-message-body-inner-content-lastDate">
              {{ props.sendDate ?? formatDate(new Date(props.timestamp || Date.now()), 'hh:mm') ?? '09:15' }}
            </div>
          </Bubble>
        </div>
        <div class="bubble-message-body-status"> 我</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessageMap, MessageStatus} from "../type/Message";
import Avatar from "./Avatar.vue";
import Bubble from "./Bubble.vue";
import { ref} from "vue";
import {formatDate} from "../util/myUtil";

const bubbleSize = ref(15)
const props = defineProps<{
  // 这里只需要用户的头像和昵称
  avatar: string,
  nickname?: string,

  // 是不是自己
  isSelf: boolean,

  // 发送时间
  sendDate?: string,
  // 发送时间的时间戳
  timestamp: number,
  message: MessageMap,

  status: MessageStatus,
}>()
</script>

<style scoped lang="scss">
$bubbleSize: v-bind("`${bubbleSize}px`");
.bubble-message {
  @include flex;
  @include default-padding-t-b;
  //justify-content: flex-start;
  max-width: 70%;
  align-items: flex-start;
  margin-top: $default-pad;

  .bubble-message-avatar {
    padding-top: v-bind("`${props.nickname ? '5px' : '10px'}`");
    width: 40px;
    margin: 0 $default-pad 0 0;
  }

  .bubble-message-body {
    flex: 1;
    text-align: left;
    margin: 0 0 0 $default-pad;
    flex-wrap: wrap;

    .bubble-message-body-name {
      font-size: 12px;
      color: $grat-1;
      margin: 0 0 0 v-bind("`${bubbleSize / 2}px`");
      //@include default-padding-t-b;
    }

    .bubble-message-body-bubble {
      @include flex;

      .bubble-message-body-inner-content {
        //border-radius: $default-pad * 2;
        //background-color: white;
        font-size: 16px;

        .bubble-message-body-inner-content-bubble {
          .bubble-message-body-inner-content-bubble-text {
            white-space: pre-wrap;
          }

          .bubble-message-body-inner-content-lastDate {
            //width: 1rem;
            @include noSelect;
            margin-left: 15px;
            height: 10px;
            font-size: 8px;
            color: $gray-desc;
            text-align: right;
          }
        }
      }

      .bubble-message-body-status {
        max-width: 20px;
        align-self: flex-end;
        margin: 0 0 $bubbleSize $default-pad;
      }
    }
  }
}

.special {
  //align-items: flex-end;
  flex-direction: row-reverse;
  //justify-content: flex-end;
  .bubble-message-avatar {
    margin: 0 0 0 $default-pad !important;
  }

  .bubble-message-body {
    //text-align: right !important;
    margin: 0 $default-pad 0 0 !important;

    .bubble-message-body-name {
      text-align: right;
      margin: 0 v-bind("`${bubbleSize / 2}px`") 0 0;
    }

    .bubble-message-body-bubble {
      flex-direction: row-reverse;

      .bubble-message-body-status {
        margin: 0 $default-pad $bubbleSize 0;
      }
    }
  }
}
</style>