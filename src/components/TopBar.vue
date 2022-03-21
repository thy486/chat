<template>
  <div class="top-bar">
    <Logo class="top-bar-logo"></Logo>
    <div class="top-bar-button-group">
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
</template>

<script setup lang="ts">
import router from "../router";
import Logo from "./Logo.vue";

const exit = () => {
  router.push({
    name: "login"
  })
}
</script>

<style scoped lang="scss">
.top-bar {
  width: 100%;
  height: 20px;
  background: $gray-blue-2;

  .top-bar-logo {
    margin-left: 15px;
    font-size: 20px;
    @include verticalMiddleByLine(20px);
    float: left;
  }

  .top-bar-button-group {
    float: right;

    & > * {
      margin-right: 5px;
    }
  }

  @include clearfix;
}
</style>