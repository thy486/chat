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
  width: 30px;
  height: 20px;
  display: block;
  text-align: center;
  @include canClick;

  .t-button-el {
    display: inline-block;
    height: 20px;
    position: relative;
    vertical-align: center;
  }

  &:hover, &:focus, &:active {
    transform: scale(1.1);
    border-radius: 7.5px;
    background: var(--gray-1);
  }

  @include clearfix;
}
</style>