<template>
  <div class="search">
    <div class="search-bar">
      <SearchOutlined/>
      搜索
    </div>
  </div>
</template>

<script lang="ts" setup>
import {SearchOutlined} from '@ant-design/icons-vue'
</script>

<style scoped lang="scss">
.search {
  @include flex;
  height: 50px;
  align-items: center;

  .search-bar {
    flex: 1;
    font-size: 15px;
    padding: 7.5px 0 7.5px 0;
    border-radius: 25px;
    color: $gray-desc;
    background-color: $gray-light;
    cursor: pointer;
    @include noSelect;
  }
}

.special {
  .search-bar {
    background-color: $white !important;
  }
}
</style>