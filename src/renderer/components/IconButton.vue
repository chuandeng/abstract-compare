<template>
  <div :class="['button-item',{
    'is-active':active
  }]">
    <div class="button" @click="$emit('click')">
    <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'IconButton',
    props: ['active']
  }
</script>

<style scoped lang="scss">
  .button-item{
    padding: 10px;
  }
.button{
  display: inline-flex;
  padding: 5px;
  border-radius: 5px;
  min-width: 28px;
  min-height: 28px;
  align-items: center;
  justify-content: center;
}
  .button:hover, .is-active{
    background-color: rgba(0,0,0,0.1);
  }
</style>
