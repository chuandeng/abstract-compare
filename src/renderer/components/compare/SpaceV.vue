<template>
  <div :style="{left: space.x+ 'px', width: space.value +'px'}" class="space">
    <div class="space-rule space-left"></div>
    <div class="space-inner">
      <div class="space-text">{{space.value}}px</div>
    </div>
    <div class="space-rule space-right"></div>
  </div>
</template>

<script>
  export default {
    name: 'SpaceV',
    props: {
      space: Object
    },
    computed: {
      x1 () {
        return this.space.prev.x
      },
      y1 () {
        return 0
      },
      x2 () {
        return this.space.next.x
      },
      y2 () {
        return 0
      }
    }
  }
</script>

<style scoped>
  .space {
    position: absolute;
    border-bottom: 1px solid rgba(255, 0, 0, 0.6);
    color: #fff;
    margin-left: 1px;
    margin-top: 90px;
    display: block;
    align-items: center;
    justify-content: center;
  }
  .space-inner{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
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
  .space-left {
    margin-bottom: -4px;
    bottom: 0;
    margin-left: -1px;
  }
  .space-rule{
    height: 7px;
    border-left: 1px solid rgba(255, 0, 0, 0.8);
    position: absolute;
  }
  .space-right{
    right: 0;
    margin-right: 0;
    margin-top: -3px;
  }
  .space-bottom{
    bottom: 0;
    margin-bottom: 0;
  }
</style>
