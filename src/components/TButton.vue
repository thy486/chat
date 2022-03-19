<template>
  <div class="t-button">
    <div class="t-button-el">
      <slot>

      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Button"
}
</script>

<style scoped lang="scss">
.t-button {
  width: 20px;
  height: 20px;
  display: block;
  cursor: pointer;
  cursor: hand;

  .t-button-el {
    display: inline-block;
    height: 20px;
    position: relative;
    vertical-align: center;
  }

  &:hover, &:focus, &:active {
    background: var(--gray-1);
  }

  @include clearfix;
}
</style>