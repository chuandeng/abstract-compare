<template>
  <div class="guide-line" :style="{left: value.x +'px'}">
    <div class="action" tabindex="0"
         v-if="showAction"
         @mouseleave="ignoreMouse"
         @mouseenter="useMouse"
         @keydown="$emit('keydown', $event, index)">
      <div class="move" @mousedown="onMousedown" content="Move guideline"  v-tippy> <MoveIcon  size="1x" ></MoveIcon></div>
      <div class="remove" @click="$emit('remove',index)" content="Remove guideline"  v-tippy><XIcon  size="1x" ></XIcon></div>
    </div>
    <div class="position" v-if="move">
      {{ value.x }}px
    </div>
  </div>
</template>

<script>
  import { XIcon, MoveIcon } from 'vue-feather-icons'
  import { ignoreMouse, useMouse } from '../../mouseHelper'

  export default {
    name: 'GuidelineV',
    components: {XIcon, MoveIcon},
    props: {
      value: Object,
      index: Number,
      showAction: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        start: 0,
        move: false,
        moveFn: null
      }
    },
    methods: {
      ignoreMouse,
      useMouse,
      onMousedown (e) {
        this.start = e.clientX
        let {id} = this.value
        const moveFn = (e) => {
          this.move = true
          let end = e.clientX
          let {type, x} = this.value
          x = x + (end - this.start)
          this.$emit('update', {
            id, type, x
          })
          this.start = end
        }
        const mouseUpFn = (e) => {
          window.removeEventListener('mousemove', moveFn)
          window.removeEventListener('mouseup', mouseUpFn)
          this.move = false
        }
        window.addEventListener('mousemove', moveFn)
        window.addEventListener('mouseup', mouseUpFn)
      },
      onMouseup (e) {
        this.start = 0
      }
    }
  }
</script>

<style scoped>
  .position{
    background-color: rgba(0,0,0,0.6);
    color: #fff;
    display: inline;
    margin-left: -20px;
    border-radius: 5px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 12px;
    position: absolute;
    margin-top: 80px;
    padding: 3px;
  }
  .guide-line{
    height: 100%;
    position: absolute;
    border-left: 1px solid #000;
  }
  .action{
    pointer-events: all;
    border-radius: 5px;
    background-color: rgba(0,0,0,0.6);
    width: 25px;
    height: 56px;
    margin-left: -13px;color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .action div{
    padding: 2px;
    border-radius: 5px;
    margin: 2px 5px;
    outline: none;
  }
  .action div:hover{
    background-color: rgba(65, 105, 225, 0.6);

  }
  .move{
    cursor: move;
  }
  .remove{
    cursor: pointer;
  }
</style>
