<template>
  <div class="loading" v-if="loading">
    <div class="loading-body"></div>
    <div class="loading-content">
      T-Chat<span style="font-size: 15px">❤️</span>
    </div>
    <div>正在加载{{ point }}</div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {sys_store} from "../store";
import {storeToRefs} from "pinia";
const sysStore = sys_store()

const {loading} = storeToRefs(sysStore)
const pointNum = ref(0)
onMounted(() => {
  mySetInterval(autoPoint, 800)
})

function mySetInterval(fn: Function, waitTime: number){
  function interval(){
    if (loading.value) {
      setTimeout(interval, waitTime);
      fn();
    }
  }
  setTimeout(interval, waitTime)
}

const point = computed(() => '.'.repeat(pointNum.value))

function autoPoint() {
  pointNum.value = pointNum.value >= 3 ? 0 : pointNum.value + 1
}
</script>

<style scoped lang="scss">
.loading {
  width: 100%;
  height: calc(100vh - 16px);
  overflow: hidden;

  .loading-body {
    position: relative;
    width: 60vw;
    height: 60vw;
    max-width: 300px;
    max-height: 300px;
    //background-color: red;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #000;
    -webkit-animation: spin 5s linear infinite;
    -ms-animation: spin 5s linear infinite;
    -moz-animation: spin 5s linear infinite;
    -o-animation: spin 5s linear infinite;
    animation: spin 5s linear infinite;

    &::before {
      content: "";
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      position: absolute;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #000;
      -webkit-animation: spin2 8s linear infinite;
      -ms-animation: spin2 8s linear infinite;
      -moz-animation: spin2 8s linear infinite;
      -o-animation: spin2 8s linear infinite;
      animation: spin2 8s linear infinite;
      z-index: 10;
    }

    &::after {
      content: "";
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      position: absolute;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #000;
      -webkit-animation: spin 8s linear infinite;
      -ms-animation: spin3 8s linear infinite;
      -moz-animation: spin3 8s linear infinite;
      -o-animation: spin3 8s linear infinite;
      animation: spin3 8s linear infinite;
      z-index: 10;
    }
  }

  &::before {
    content: '';
    height: 80%;
    width: 0;
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }

  & > *:not(:last-child) {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }

  & > :last-child {
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20%;
  }

  .loading-content {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    font-size: 25px;
    font-weight: 500;
    text-shadow: 0 1px 2px rgb(0 0 0 / 60%);
    animation: fade-in-out 5s ease infinite;

    &:hover, &:focus {
      color: mix(white, #409eff);
    }
  }
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes spin2 {
  0% {
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }
  100% {
    -webkit-transform: rotate(450deg);
    -ms-transform: rotate(450deg);
    transform: rotate(450deg);
  }
}

@-webkit-keyframes spin3 {
  0% {
    -webkit-transform: rotate(120deg);
    -ms-transform: rotate(120deg);
    transform: rotate(120deg);
  }
  100% {
    -webkit-transform: rotate(480deg);
    -ms-transform: rotate(480deg);
    transform: rotate(480deg);
  }
}

@-webkit-keyframes fade-in-out { /*设置内容由显示变为隐藏*/
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}

@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin2 {
  0% {
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }
  100% {
    -webkit-transform: rotate(450deg);
    -ms-transform: rotate(450deg);
    transform: rotate(450deg);
  }
}

@keyframes spin3 {
  0% {
    -webkit-transform: rotate(120deg);
    -ms-transform: rotate(120deg);
    transform: rotate(120deg);
  }
  100% {
    -webkit-transform: rotate(480deg);
    -ms-transform: rotate(480deg);
    transform: rotate(480deg);
  }
}

@keyframes fade-in-out { /*设置内容由显示变为隐藏*/
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
</style>