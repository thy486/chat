<template>
  <div class="chat">
    <div class="top-bar">
      <div class="logo">
        <Logo></Logo>
      </div>
      <div class="button-group">
        <t-button @click="exit">
          <svg t="1647471483277" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="2194" width="20" height="20">
            <path
                d="M548.992 503.744L885.44 167.328a31.968 31.968 0 1 0-45.248-45.248L503.744 458.496 167.328 122.08a31.968 31.968 0 1 0-45.248 45.248l336.416 336.416L122.08 840.16a31.968 31.968 0 1 0 45.248 45.248l336.416-336.416L840.16 885.44a31.968 31.968 0 1 0 45.248-45.248L548.992 503.744z"
                p-id="2195"></path>
          </svg>
        </t-button>
      </div>
    </div>
    <div class="chat-body">
      <template v-if="isMobile">
        <UserFrame class="user-mobile"/>
<!--        <div class="message-mobile">-->
<!--          消息页面-->
<!--        </div>-->
      </template>
      <template v-else>
        <UserFrame class="user-desktop"/>
        <MessageFrame class="message-desktop">
        </MessageFrame>
        <div class="vertical" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import TButton from '@/components/TButton.vue'
import router from "../router";
import {storeToRefs} from "pinia";
import {sys_store} from "../store";
import Logo from "../components/Logo.vue";
import UserFrame from "./Chat/UserFrame.vue";
import MessageFrame from "./Chat/MessageFrame.vue";
import {onMounted} from "vue";

const sysStore = sys_store()
const { isMobile } = storeToRefs(sysStore)
const exit = () => {
  router.push({
    name: "login"
  })
}
onMounted(()=>{
})
</script>

<style scoped lang="scss">
.chat {
  $top-bar-height: 20px;
  $body-height: calc(100vh - 36px);
  .top-bar {
    $bg-color: $gray-blue-2;
    width: 100%;
    height: $top-bar-height;
    background: $bg-color;
    border-radius: 10px 10px 0 0;

    .logo {
      left: .5rem;
      display: inline-block;
      width: 5rem;
      position: absolute;
      height: $top-bar-height;
      font-size: $top-bar-height;
      line-height: $top-bar-height;
    }

    .button-group {
      max-width: 50%;
      display: block;
      float: right;
      margin-right: 1rem;

      & > *:not(:last-child) {
        margin-right: .2rem;
      }
      & > * {
        &:focus, &:hover, &:active {
          background: mix($bg-color, $gray-light)
        }
      }
    }
    @include clearfix;
  }

  .chat-body {
    height: $body-height;
    $user-width: min(30%, 400px);
    $vertical-width: 0px;
    $message-width: calc(100% - $user-width - $vertical-width);
    text-align: center;
    color: $gray-desc;
    & > * {

    }

    .vertical {
      clear: both;
      display: inline-block;
      width: $vertical-width;
      height: $body-height;
      background-color: mix($tab-color, white);
      min-height: 600px;
    }
    .user-desktop {
      width: $user-width;
      float: left;
      height: $body-height;
      //background: #409eff;
      border-radius: 0 0 10px 0;
    }
    .message-desktop {
      float: right;
      //display: inline-block;
      width: $message-width;
      height: $body-height;
    }

    .user-mobile {
      width: 100%;
      height: $body-height;
      border-radius: 0 0 10px 10px;
    }

    @include clearfix;
  }
}

</style>
<style scoped lang="scss">
@mixin bottom-radius {
  & > :nth-last-child(2) {
    border-radius: 0 0 11px 11px;
  }
  & > :last-child {
    border-radius: 0 0 10px 10px;
  }
}
.user-desktop {
  & > :nth-last-child(2) {
    border-radius: 0 0 0 11px;
  }
  & > :last-child {
    border-radius: 0 0 0 10px;
  }
}
.message-desktop {
  & > :nth-last-child(2) {
    border-radius: 0 0 11px 0;
  }
  & > :last-child {
    border-radius: 0 0 10px 0;
  }
}
.user-mobile {
  @include bottom-radius;
}
.message-mobile {
  @include bottom-radius;
}
</style>