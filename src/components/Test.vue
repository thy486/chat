<template>
  <div>
    <canvas id="myCanvas" @mousedown="start" class="my-canvas"/>
  </div>
</template>

<script lang="ts" setup>
import {armyWormFactory} from "../util/canvasExample";
import {computed, onMounted, Ref, ref} from "vue";

const am = armyWormFactory(200, 3)
const flag = ref(false)
const clientY = ref(-1), clientX = ref(-1)
const el: Ref<undefined | HTMLCanvasElement> = ref(void 0)
const rotate = ref(0);
const rotateValue = computed(()=>`${rotate.value}deg`)
const start = (e: MouseEvent) => {
  clientY.value = e.clientY
  clientX.value = e.clientX
  el.value = <HTMLCanvasElement>document.getElementById('myCanvas')
  document.onmousemove = function (t) {
    move(t)
  }
  document.onmouseup = function (t) {
    end(t)
    document.onmousemove = null
    document.onmouseup = null
  }
}
const move = (e: MouseEvent) => {
  let temp = Math.atan2(e.clientY - clientY.value,  e.clientX - clientX.value)
  rotate.value = temp * 180 / Math.PI + 90
  // console.log(rotate.value)
  const v = ((e.clientY - clientY.value) ** 2 + (e.clientX - clientX.value) ** 2) ** 0.5
  el.value && am(v, el.value, temp)
}
const end = (e: MouseEvent) => {
  rotate.value = 0
  el.value && am(0, el.value)
}
const sleep = async (t: number) => {
  return new Promise(resolve => {
    resolve(t)
  })
}
onMounted(async () => {
  while (!document.getElementById('myCanvas')) {
    await sleep(1)
  }
  const myCanvas = <HTMLCanvasElement>document.getElementById('myCanvas')
  const ctx = myCanvas.getContext('2d')
  am(0, myCanvas)
  // let n=0
  // let i = setInterval(()=>{
  //   am(++n, myCanvas)
  //   if (n > 300) {
  //     clearInterval(i)
  //   }
  // }, 100)
})
</script>

<style scoped lang="scss">
.my-canvas {
  transform: rotate(v-bind(rotateValue));
}
</style>