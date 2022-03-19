<template>
  <t-transfer class="message-frame t-transfer-column-reverse">
    <template v-slot:header>
      <div v-if="select" class="message-header">
        哈哈哈
      </div>
      <div v-else></div>
    </template>
    <template v-slot:default>
      <div v-if="select" class="message-body" @scroll="test">
        <div class="message-body-hidden-bottom" :size="20"></div>
        <BubbleMessage :class="autoBubbleClass(b.reverse)" v-for="b in BubbleMessageList" :reverse="b.reverse" :avatar="b.avatar">
          {{ "哈".repeat(b.n) }}
<!--          <img src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" style="max-width: 100%;"/>-->
<!--          <br>-->
        </BubbleMessage>
<!--        <BubbleMessage :class="autoBubbleClass(false)" :reverse="false"></BubbleMessage>-->
        <!--        <Bubble class="message-body-bubble" :size="20">哈哈哈</Bubble>
                <Bubble class="bubble-reverse message-body-bubble" :size="20">哈哈哈</Bubble>
                <Bubble class="bubble-reverse message-body-bubble" :size="20"></Bubble>
                <Bubble class="bubble-reverse message-body-bubble" :size="20">1</Bubble>
                <Bubble class="bubble-reverse message-body-bubble" :size="20">
                  <img src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" style="max-width: 100%;"/>
                  <br>
                  哈刷卡广大考生的公司肯定哈刷卡广大考生的公司肯定哈刷卡广大考生的公司肯定哈刷卡广大考生的公司肯定哈刷卡广大考生的公司肯定
                  哈刷卡广大考生的公司肯定哈刷卡广大考生的公司肯定哈刷卡广大考生的公司肯定哈刷卡广大考生的公司肯定哈刷卡广大考生的公司肯定
                  哈刷卡广大考生的公司肯定哈刷卡广大考生的公司肯定哈刷卡广大考生的公司肯定哈刷卡广大考生的公司肯定哈刷卡广大考生的公司肯定
                  哈刷卡广大考生的公司肯定哈刷卡广大考生的公司肯定哈刷卡广大考生的公司肯定哈刷卡广大考生的公司肯定哈刷卡广大考生的公司肯定
                </Bubble>-->
        <div class="message-body-hidden-top"></div>
      </div>
      <div v-else class="message-body-empty">
        <span>
          请选择一个对话开始聊天
        </span></div>
    </template>
    <template v-slot:footer>
      <div v-if="select" class="message-footer">
      </div>
      <div v-else></div>
    </template>
  </t-transfer>
</template>

<script lang="ts" setup>
import TTransfer from '../../components/TTransfer.vue'
import {reactive, ref, Ref} from "vue";
import {Friend, Group, Channel, UserStatus} from "../../type/User";
import Bubble from "../../components/Bubble.vue";
import BubbleMessage from "../../components/BubbleMessage.vue";
import {generatorAvatar} from "../../util/myUtil";

const select: Ref<Friend | Group | Channel | null> = ref({
  userid: 0,
  username: '',
  nickname: 'string',
  avatar: 'string',
  status: UserStatus.Stealth,
})
const test = (e: any) => {
  console.log(e)
}
const BubbleMessageList = reactive([...Array(Math.random() * 10 | 0 + 125).keys()].map((x) => ({
  reverse: x % 2 === 0,
  avatar: generatorAvatar(Math.random().toString(36).slice(-1).toUpperCase()) || "",
  n: x
}))
)

const autoBubbleClass = (reverse: boolean) => reverse ? 'message-body-bubble bubble-reverse' : 'message-body-bubble'
</script>

<style scoped lang="scss">
.message-frame {
  $bg-color: $tab-color;
  $op-color: lighten($message-bg-color, .5);
  $padding-l-r: .8rem;
  $width: calc(100% - $padding-l-r - $padding-l-r);
  background: $bg-color;
  position: relative;

  @mixin pad {
    padding: 0 $padding-l-r 0 $padding-l-r;
  }

  .message-header {
    width: $width;
    background: $bg-color;
    height: 50px;
    @include verticalMiddle(100%);
    text-align: center;
    color: var(--blue-black-1);
    @include pad;
  }

  .message-body {
    @include flex;
    width: $width;
    bottom: 0;
    //min-height: calc(100% - 50px);
    //background: $op-color;
    flex-direction: column-reverse;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    align-items: flex-end;
    @include pad;


    .message-body-hidden-bottom {
      width: 100%;
      height: 30px;
    }

    .message-body-hidden-top {
      width: 100%;
      height: 70px;
    }

    .message-body-bubble {
      color: $black;
      //background: $white;
      //display: inline-block;
      min-height: 15px;
      min-width: 7 / 8 rem;
      max-width: 61.8%;
      padding: .2rem;
      margin: .5rem 0 1.5rem 0;
      border-radius: .6rem;
      text-align: left;
      font-size: 15px;
    }

    .bubble-reverse {
      align-self: flex-start;
      //text-align: left;
    }
  }

  .message-body-empty {
    height: 100%;
    @include box;
    width: 100%;

    span {
      color: white;
      background: lighten(mix(gray, $gray-blue-1), 0.6);
      padding: 5px 20px 5px 20px;
      border-radius: 20px;
    }
  }

  .message-footer {
    width: $width;
    height: 30px;
    //background: $bg-color;
    background: yellow;
    @include pad;
  }
}

</style>
