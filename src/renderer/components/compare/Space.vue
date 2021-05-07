<template>
  <div :style="{top: space.y+ 'px', height: space.value +'px'}" class="space">
    <div class="space-rule space-top"></div>
    <div class="space-inner">
      <div class="space-text">{{space.value}}px</div>
    </div>
    <div class="space-rule space-bottom"></div>
  </div>
</template>

<script>
  export default {
    name: 'Space',
    props: {
      space: Object
    },
    computed: {
      x1 () {
        return 0
      },
      y1 () {
        return this.space.prev.y
      },
      x2 () {
        return 0
      },
      y2 () {
        return this.space.next.y
      }
    }
  }
</script>

<style scoped>
  .space {
    position: absolute;
    border-left: 1px solid rgba(255, 0, 0, 0.6);
    color: #fff;
    margin-top: 1px;
    margin-left: 130px;
    display: block;
    align-items: center;
    justify-content: center;
  }
  .space-inner{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
    justify-items: center;
    align-items: center;
  }
  .space-text {
    background-color: rgba(0,0,0,0.5);
    font-size: 12px;
    padding: 2px;
    border-radius: 3px;
    margin-left: 3px;
  }
  .space-rule{
    width: 6px;
    border-top: 1px solid rgba(255, 0, 0, 0.8);
    margin-left: -3px;
    position: absolute;
    margin-top: -1px;
  }
  .space-bottom{
    bottom: 0;
    margin-bottom: 0px;
  }
</style>
