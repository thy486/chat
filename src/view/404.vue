<template>
  <div class="page-404">
    <Logo class="logo"></Logo>
    <div class="tip-404">
      <div class="content">
        <h3 @click="exit"> 404 </h3>
        <p>可 能 我 们 真 的 <a href="/" style="text-decoration: none;">走 错 了</a> ！</p>
        <div class="one-say">
          <div class="one-say-content">{{ oneSayData.content }}</div>
          <div class="one-say-origin" v-show="oneSayData.origin">—— {{ oneSayData.origin }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import Logo from "@/components/Logo.vue";

const router = useRouter()
const exit = () => {
  router.push({
    name: "welcome"
  })
}

const oneSayData = reactive({
  content: 'Have a nice day. ✨',
  origin: ''
})

function oneSay() {
  try {
    const xmlHttpRequest = new XMLHttpRequest();
    const url = "https://v1.hitokoto.cn";
    const type = "GET"; //方法
    let result = "";
    xmlHttpRequest.open(type, url, true); //方法，接口，异步
    xmlHttpRequest.send(); //发送请求
    xmlHttpRequest.onreadystatechange = function () {
      if (xmlHttpRequest.status == 200 && xmlHttpRequest.readyState == 4) {
        let data: { hitokoto: string, from?: string, from_who?: string, creator?: string } = JSON.parse(xmlHttpRequest.response); //获取到的json数据
        result = data.hitokoto;
        if (result) oneSayData.content = result
        if (data.from) {
          if (data.from_who) {
            oneSayData.origin = `${data.from_who}《${data.from}》`
          } else if (data.creator && !/^\d$/.test(data.creator) && !/^[a-zA-Z]+$/.test(data.creator) && 'hitokoto' !== data.creator) {
            oneSayData.origin = `${data.creator} - ${data.from}`
          } else {
            oneSayData.origin = `${data.from}`
          }
        }
      }
    }
  } catch (e) {
    console.log(`获取一言失败`)
    console.log(e)
  }
}

onMounted(() => {
  oneSay()
})
</script>

<style scoped lang="scss">
a:hover, a:visited, a:link, a:active {
  color: var(--blue-black-1);
}
</style>
<style scoped lang="sass">
$mobile-font-color: mix(paleturquoise, #409eff)
.logo
  position: fixed
  right: 5px
  top: 5px

.tip-404
  width: 100%
  height: calc(100vh - 16px)
  margin: 0
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif

  .content
    margin-top: 35vh
    text-align: center
    display: inline-block
    vertical-align: middle

    h3
      font-size: 125px
      line-height: 120px
      //color: #fff
      font-weight: 700
      margin: 0 0 20px 0
      text-shadow: 0 1px 2px rgb(0 0 0 / 60%)
      cursor: pointer
      cursor: hand

      &:hover, &:focus
        color: mix(white, #409eff)

    p
      font-size: 20px

      a
        &:hover, &:focus
          color: #f00

    .one-say
      .one-say-origin
        text-align: right
        color: gray

      .one-say-origin
        font-size: small


@media screen and (max-width: 600px)
  .logo
    font-size: 2rem
  .tip-404
    background: url("https://img.xjh.me/img/63790969_p0.jpg") center top no-repeat
    background-size: cover
    color: $mobile-font-color

    p > a
      color: $mobile-font-color

    .one-say-content
      color: #000

</style>