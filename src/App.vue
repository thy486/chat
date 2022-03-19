<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import {onMounted, ref} from "vue";
import {sys_store} from "./store";
import {storeToRefs} from "pinia";
import Loading from "@/components/Loading.vue";

const sysStore = sys_store()
const {loading} = storeToRefs(sysStore)
// loading.value = true
onMounted(() => {
  sysStore.listener(window.screen.width)

  window.onresize = (e) => {
    sysStore.listener(window.screen.width)
  }
})
</script>

<template>
<!--  <Loading></Loading>-->
  <Loading v-show="loading"/>
  <router-view v-show="!loading"/>
</template>

<style lang="scss">
//*, *::before, *::after {
//  box-sizing: content-box;
//}
*, *::before, *::after {
  -webkit-box-sizing: content-box !important;
  -moz-box-sizing: content-box !important;
  box-sizing: content-box !important;
}

:root {
  --main-gray-default: #e7e7e7;
  --main-decript-gray: #adadad;
  --main-logo-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;

  --white-1: #ffffff;
  --red-1: #ff0000;
  --yellow-1: #ffff00;

  --gray-blue-1: #bfe1f1;
  --blue-1: #409eff;
  --blue-gray-1: #8898aa;
  --blue-black-1: #2c3e50;

  --gray-1: #e7e7e7;
  --gray-2: #adadad;
  --black-1:#000000;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--blue-black-1);
  padding: 8px;
}

@font-face {
  font-family: 'argon';
  src: url('./assets/font/argon.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

</style>
