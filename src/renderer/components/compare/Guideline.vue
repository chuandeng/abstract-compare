<template>
  <div class="guide-line" :style="{top: value.y +'px'}">
    <div class="action" tabindex="0"
         @mouseleave="ignoreMouse"
         @mouseenter="useMouse"
         @keydown="$emit('keydown', $event, index)">
     <div class="move" @mousedown="onMousedown" content="Move guideline"  v-tippy> <MoveIcon  size="1x" ></MoveIcon></div>
      <div class="remove" @click="$emit('remove',index)" content="Remove guideline"  v-tippy><XIcon  size="1x" ></XIcon></div>
    </div>
    <div class="position" v-if="move">
      {{ value.y }}px
    </div>
  </div>
</template>

<script>
  import { XIcon, MoveIcon } from 'vue-feather-icons'
  import { ignoreMouse, useMouse } from '../../mouseHelper'

  export default {
    name: 'Guideline',
    components: {XIcon, MoveIcon},
    props: {
      value: Object,
      index: Number
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
        this.start = e.clientY
        const moveFn = (e) => {
          this.move = true
          let end = e.clientY
          let index = this.index
          let {type, y} = this.value
          y = y + (end - this.start)
          this.$emit('update', {
            index, type, y
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
  margin-left: 200px;
  border-radius: 5px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 12px;
  position: absolute;
  margin-top: -22px;
  padding: 3px;
}
.guide-line{
  width: 100%;
  position: absolute;
  border-top: 1px solid #000;
}
.action{
  pointer-events: all;
  border-radius: 5px;
  background-color: rgba(0,0,0,0.6);
  width: 56px;
  height: 25px;
  margin-top: -13px;
  margin-left: 60px;
  color: #fff;
  display: flex;
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
