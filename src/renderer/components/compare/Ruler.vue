<template>
  <div class="ruler-box" >
  <div class="ruler-wrap"
       @mouseenter="showGuideline = true"
       @mouseleave="showGuideline= false"
       @mousemove="updateGuideLine"
       :style="{left: pos.left + 'px', top: pos.top + 'px'}"
       @mousedown="onMousedown"
       @keydown="onKeyDown"
       tabindex="0">
    <div class="ruler" :style="{width: width + 'px'}">
      <div class="mark" v-for="(item,index) in marks" :style="item" :key="'mark' +index">
        <span>{{item.left}}</span>
      </div>
      <div class="mini-mark" v-for="(item,index) in miniMarks" :style="item" :key="'m-mark'+index"></div>
    </div>
    <div class="ruler-control"
         @mouseenter="showGuideline = false"
         @mouseleave="showGuideline = true"
         @mousedown="resizeRuler"
    >
      <div></div>
      <div></div>
    </div>
  </div>
    <div class="guide-line" v-if="showGuideline" :style="{
      left: guidelineLeft+ 'px'
    }">
      <span :style="{
        top: (pos.top - 30) + 'px'
      }"> {{guidelineLeft - pos.left}}px</span>
    </div>
  </div>
</template>

<script>
  import {KeyCode} from '../../common/utils'

  export default {
    name: 'Ruler',
    computed: {
      marks () {
        let count = Math.ceil(this.width / this.step)
        let result = []
        for (let i = 0; i < count; i++) {
          result.push({
            left: i * this.step + 'px'
          })
        }
        return result
      },
      miniMarks () {
        let space = Math.ceil(this.step / 10)
        let result = []
        let isNotDone = true
        let left = 0
        while (isNotDone) {
          result.push({
            left: left + 'px'
          })
          left = left + space
          if (left >= this.width) {
            isNotDone = false
          }
        }
        return result
      }
    },
    data () {
      return {
        width: 500,
        step: 50,
        showGuideline: false,
        guidelineLeft: 0,
        pos: {
          left: 500,
          top: 200
        }
      }
    },
    methods: {
      updateGuideLine (event) {
        let {clientX} = event
        let {left} = this.pos
        if (!this.showGuideline) {
          return
        }
        if (left < clientX && clientX < (left + this.width)) {
          this.guidelineLeft = clientX
        }
      },
      onMousedown (event) {
        let {clientX, clientY} = event
        const moveFn = (moveEvent) => {
          let {left, top} = this.pos
          let {clientX: x, clientY: y} = moveEvent
          let {clientWidth} = document.body
          this.pos.left = Math.min(Math.max(0, left + x - clientX), clientWidth - this.width)
          this.pos.top = Math.max(0, top + y - clientY)
          clientX = x
          clientY = y
        }
        const mouseupFn = () => {
          window.removeEventListener('mousemove', moveFn)
          window.removeEventListener('mouseup', mouseupFn)
        }
        window.addEventListener('mousemove', moveFn)
        window.addEventListener('mouseup', mouseupFn)
      },
      resizeRuler (event) {
        let {clientX} = event
        let {width} = this
        const moveFn = (moveEvent) => {
          let {clientX: x} = moveEvent
          this.width = width + (x - clientX)
        }
        const mouseupFn = () => {
          window.removeEventListener('mousemove', moveFn)
          window.removeEventListener('mouseup', mouseupFn)
        }
        window.addEventListener('mousemove', moveFn)
        window.addEventListener('mouseup', mouseupFn)
        event.stopPropagation()
        event.preventDefault()
        return false
      },
      onKeyDown (event) {
        switch (event.keyCode) {
          case KeyCode.UP:
            this.pos.top--
            break
          case KeyCode.DOWN:
            this.pos.top++
            break
          case KeyCode.LEFT:
            this.pos.left--
            break
          case KeyCode.RIGHT:
            this.pos.left++
            break
        }
      }
    }
  }
</script>

<style scoped>
  .ruler-control{
    width: 20px;
    position: absolute;
    right: 2px;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    top: 0;
    cursor: ew-resize;
  }
  .ruler-control div{
    width: 2px;
    background-color: rgba(0,0,0,0.6);
    margin: 2px;
    height: 25px;
  }
  .ruler-box{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 900;
    pointer-events: none;
  }
  .guide-line {
    position: absolute;
    top: 0;
    bottom: 0;
    border-left: 1px solid #000;
    pointer-events: none;
  }
  .guide-line span{
    color: #fff;
    background-color: red;
    position: absolute;
    border-radius: 3px;
    font-size: 12px;
    margin-left: -12px;
    padding: 2px;
  }
  .ruler-wrap{
    background-color: rgba(0,0,0,0.4);
    top: 200px;
    left: 500px;
    position: absolute;
    pointer-events: all;
  }
  .ruler{
    height: 50px;
    position: relative;
    overflow: hidden;
    border-left: 1px solid #000;
    cursor: move;
  }
  .ruler div{
    width: 1px;
    position: absolute;
  }
  .mini-mark{
    border-left: 1px solid #000;
    margin-left: -1px;
    height: 10px;
  }
  .mark{
    border-left: 1px solid #000;
    height: 20px;
    margin-left: -1px;
  }
  .mark:first-child span{
    margin-left: 0;
  }
  .mark span{
    color: #fff;
    font-size: 12px;
    margin-top: 20px;
    position: absolute;
    margin-left: -12px;
  }
  .ruler-control{

  }
</style>
