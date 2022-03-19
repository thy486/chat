<template>
  <div class="login-page">
    <Logo/>
    <a-form layout="vertical" class="login-form"
            :model="form"
    >
      <p>登录</p>
      <a-form-item name="username" label="用户名">
        <a-input v-model:value="form.username" :autofocus="!form.username" @keydown.enter="autoFocusInput">
          <template #prefix>
            <UserOutlined/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password" label="密码" style="margin-bottom: 8px">
        <a-input-password v-model:value="form.password" :autofocus="!!form.username" @keydown.enter="autoFocusInput">
          <template #prefix>
            <LockOutlined/>
          </template>
        </a-input-password>
      </a-form-item>
      <div class="login-form-middle-option">
        <a-checkbox tabindex="-1"
                    class="remember-me"
                    v-model:checked="form.remembered"
                    @keydown.enter="changeRemembered"
        >记住我
        </a-checkbox>
        <a-button type="text" @click="forgetPsw" tabindex="-1">忘记密码?</a-button>
      </div>
      <a-button :block="true" type="primary" shape="round" @click="login">登录</a-button>
    </a-form>
    <div>
      <a-button type="text" @click="register" tabindex="-1">立即注册</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "@/components/Logo.vue";
import {UserOutlined, LockOutlined} from "@ant-design/icons-vue";
import {useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import {sys_store} from "../store";
import {autoFocusInput} from "../util/domUtil";

const router = useRouter(), sysStore = sys_store()
sysStore.loadingBegin()
const form = reactive({
  username: '123',
  password: '',
  remembered: false,
})
const login = () => {
  console.log(form)
  router.push({
    name: "chat"
  })
}
const register = () => {
  router.push({
    path: "/register"
  })
}
const forgetPsw = () => {
  router.push({
    path: "forgetPsw"
  })
}
const changeRemembered = (e: any) => {
  console.log(e)
  form.remembered = !form.remembered
}
onMounted(() => {
  sysStore.loadingEnd()
})
</script>

<style scoped lang="scss">
.login-page {
  //margin-top: 30%;
  padding-top: 15vh;
  overflow: hidden;
  font-family: var(--main-logo-font-family);

  .login-form {
    width: 87.3%;
    max-width: 400px;
    margin: auto;
    padding: 10px 15px 30px 15px;
    border-radius: 20px;

    p {
      @include noSelect;
      font-size: 25px;
      font-weight: 400;
      letter-spacing: 8px;
      text-shadow: 0 1px 2px var(--blue-gray-1);
    }

    .login-form-middle-option {
      height: 32px;
      margin-bottom: 24px;
      @include clearfix;

      .remember-me {
        @include noSelect;
      }

      & > * {
        height: 100%;
        display: inline-block;
      }

      & > *:not(:last-child) {
        line-height: 32px;
      }

      & > :first-child {
        float: left;
      }

      & > :last-child {
        float: right;
      }
    }
  }
}


</style>