<template>
  <div class="welcome">
    <header>
      <Logo class="logo" @click="enter"/>
    </header>
    <p style="font-size: larger;">Easily Communicate.</p>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {sys_store} from "../store";
import {onMounted} from "vue";
import Logo from "@/components/Logo.vue";

const sysStore = sys_store()
sysStore.loadingBegin()
const router = useRouter()
const enter = () => {
  const user = null
  if (!user) {
    router.push({
      name: "login"
    })
    return
  }
}
onMounted(() => {
  sysStore.loadingEnd()
})
</script>

<style scoped lang="scss" src="@/style/view/Welcome.scss">


</style>