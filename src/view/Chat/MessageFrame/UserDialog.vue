<template>
  <div class="user-dialog" ref="userDialog" @ontouchstart="test" :style="{paddingTop: `${refreshHeight}px`}">
    <HiddenRefresh :class="{'user-dialog-hidden': true, special, 'hidden-special': special}" :height="50"/>
    <Search :class="{'user-dialog-search': true, special, 'search-special': special}"/>
    <Dialog class="user-dialog-normal user-dialog-special" v-for="mock in mocksSpecial" :avatar="mock.avatar"
             :name="mock.name"
             :summary="mock.name"></Dialog>
    <Dialog class="user-dialog-normal" v-for="mock in mocks" :avatar="mock.avatar" :name="mock.name"
             :summary="mock.name"></Dialog>
  </div>
</template>

<script lang="ts" setup>
import Dialog from "../../../components/Dialog.vue";
import {computed, onMounted, reactive, ref} from "vue";
import {generatorAvatar} from "../../../util/myUtil";
import HiddenRefresh from "../../../components/HiddenRefresh.vue";
import {BetterScroll} from "../../../util/domUtil";

const mocksSpecial = reactive([...Array(Math.random() * 10 | 0).keys()].map((x) => ({
      name: "A".repeat(x),
      avatar: generatorAvatar(Math.random().toString(36).slice(-1).toUpperCase()) || "",
      n: x
    }))
)

const special = computed(() => mocksSpecial.length !== 0)

const mocks = reactive([...Array(Math.random() * 10 | 0 + 37).keys()].map((x) => ({
      name: "A".repeat(x),
      avatar: generatorAvatar(Math.random().toString(36).slice(-1).toUpperCase()) || "",
      n: x
    }))
)
const userDialog = ref()

const refreshHeight = ref(0)
const isTop = ref(false)

const test = (e: any) => {
  // console.log(e)
}

const sleep = (e: number) => new Promise(resolve => {
  setTimeout(resolve, e)
})

onMounted(() => {
  new BetterScroll(userDialog.value, {
    handelStart: (startX) => {
      isTop.value = userDialog.value.scrollTop === 0
    },
    handelMove: (x, y) => {
      if (isTop.value) {
        refreshHeight.value = Math.min(50, refreshHeight.value + y);
        if (refreshHeight.value > 40) {
          return false
        }
      }
    },
    handelEnd: async () => {
      if (isTop.value) {
        await sleep(2000)
        refreshHeight.value = 0
        isTop.value = false
      }
    },
    CompatibleMouse: true
  })
})
</script>

<style scoped lang="scss">
.user-dialog {
  @include flex;
  height: 100%;
  flex-direction: column;
  @include autoHiddenScrollY;
  @include noSelect;

  & > * {
    //@include default-padding-l-r;
  }

  .user-dialog-hidden {
    background: $white;
    height: 0;
  }

  .user-dialog-search {
    background: $white;
    @include default-padding-r-l;
    flex-shrink: 0;
  }

  .search-special, hidden-special {
    background: $gray-light !important;
  }

  .user-dialog-normal {
    background: $white;
    @include default-padding-r-l;
    @include default-padding-t-b;
    flex-shrink: 0;

    &:hover {
      background: $gray-light;
    }
  }

  .user-dialog-special {
    background: $gray-light !important;

    &:hover {
      background: $white !important;
    }
  }
}
</style>