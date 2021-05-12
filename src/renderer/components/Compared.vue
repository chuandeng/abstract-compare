<template>
  <div>
    <div  class="source-wrap" :style="targetStyle" @mouseenter="useMouse" >
      <div class="toolbar" @mouseenter="useMouse" @mouseleave="ignoreMouse">
        <div class="header">Opacity</div>
        <input type="number" v-model="opacity" size="mini" min="0.1" max="1" step="0.1"></input>
        <div class="header">
          Width</div>
        <input class="width-input" v-model="customWidth" @keydown.enter="updateWidth" @blur="updateWidth" size="mini" ></input>
        <GitCommitIcon content="Horizontal guideline"  v-tippy size="1.5x" @click="addGuideLine"></GitCommitIcon>
        <GitCommitIcon content="Vertical guideline" v-tippy size="1.5x" class="rotate-v" @click="addGuideLineV"></GitCommitIcon>
        <AirplayIcon v-if="isMoreThanOneDisplay" content="Switch monitor" v-tippy size="1.5x"  @click="switchMonitor"></AirplayIcon>
        <ColumnsIcon :class="{'toggle-on':mirror}" content="Guildline mirror" v-tippy size="1.5x"  @click="mirrorGuideline"></ColumnsIcon>
        <RulerIcon :class="{'toggle-on':showRuler}" content="Ruler" v-tippy @click.native="toggleRuler"></RulerIcon>
        <XIcon size="1.5x" content="Quit compare mode" v-tippy @click="quit"></XIcon>
      </div>
      <img tabindex="0"
           @keydown="moveTarget"
           class="source-image"
           @mousedown="mousedownOnImage"
           id="sourceImg" :style="imageStyle"
           ref="image"  :src="imageUrl"
           @load="onImageLoad"
           @mouseleave="ignoreMouse"
           @mouseenter="useMouse"
      />
    </div>

    <div>
      <Ruler v-if="showRuler"></Ruler>
      <div class="guide-line-box" :style="guidelineStyle">
        <Guideline v-for="(item, index) in guidelines"
                   @update="updateGuideline"
                   @remove="removeGuideline"
                   @keydown="moveGuideline"
                   :value="item" :key="item.id"></Guideline>

        <Space v-for="(space, index) in spaces"
               class="space"
               :key="'space'+index"
               :space="space"></Space>
      </div>
      <div class="guide-line-box" :style="guidelineVStyle">
        <GuidelineV v-for="(item, index) in guidelinesV"
                    @update="updateGuidelineV"
                    :index="index"
                    @remove="removeGuidelineV"
                    @keydown="moveGuidelineV"
                    :value="item" :key="item.id"></GuidelineV>
        <SpaceV v-for="(space, index) in spacesV"
                class="space"
                :key="space.id" :space="space"></SpaceV>
      </div>
      <div v-if="mirror" class="guide-line-box mirror-box" :style="mirrorStyle">
        <div class="mirror-header"
             @mousedown="handleMirrorMouseDown"
             @mouseleave="ignoreMouse"
             @mouseenter="useMouse"
             @keydown="handleMirrorKeydown"
             :style="mirrorHeaderStyle"
             tabindex="0"
        ><MoveIcon  size="1x" ></MoveIcon>Guideline Mirror</div>
        <GuidelineV v-for="(item, index) in guidelinesV"
                    :showAction="false"
                    @update="updateGuidelineV"
                    :index="index"
                    @remove="removeGuidelineV"
                    @keydown="moveGuidelineV"
                    :value="item" :key="item.id"></GuidelineV>
        <SpaceV v-for="(space, index) in spacesV"
                class="space"
                :key="space.id" :space="space"></SpaceV>
      </div>

    </div>
  </div>
</template>

<script>
  import { XIcon, GitCommitIcon, CropIcon, MoveIcon, RefreshCcwIcon, CopyIcon, ColumnsIcon, AirplayIcon } from 'vue-feather-icons'
  import { remote } from 'electron'
  import Guideline from './compare/Guideline'
  import GuidelineV from './compare/GuidelineV'
  import Space from './compare/Space'
  import SpaceV from './compare/SpaceV'
  import { ignoreMouse, useMouse } from '../mouseHelper'
  import debounce from 'v-debounce'
  import Ruler from './compare/Ruler'
  import RulerIcon from './compare/RulerIcon'
  import {KeyCode} from '../common/utils'

  export default {
    name: 'Compared',
    directives: {debounce},
    components: {
      RulerIcon,
      Ruler,
      Space,
      Guideline,
      GuidelineV,
      CropIcon,
      RefreshCcwIcon,
      AirplayIcon,
      ColumnsIcon,
      XIcon,
      CopyIcon,
      GitCommitIcon,
      MoveIcon,
      SpaceV},
    computed: {
      imageUrl () {
        return remote.getCurrentWindow().__compare.getImageURI()
      },
      isMoreThanOneDisplay () {
        return remote.getCurrentWindow().__compare.getMonitorCount() > 1
      },
      spaces () {
        let result = []
        let prev = this.guidelines[0]
        if (this.guidelines.length >= 2) {
          for (let i = 1; i < this.guidelines.length; i++) {
            let curr = this.guidelines[i]
            result.push({
              y: prev.y,
              value: Math.abs(curr.y - prev.y),
              prev,
              next: curr
            })
            prev = curr
          }
        }
        return result
      },
      spacesV () {
        let result = []
        let prev = this.guidelinesV[0]
        if (this.guidelinesV.length >= 2) {
          for (let i = 1; i < this.guidelinesV.length; i++) {
            let curr = this.guidelinesV[i]
            result.push({
              x: prev.x,
              value: Math.abs(curr.x - prev.x),
              prev,
              next: curr
            })
            prev = curr
          }
        }
        return result
      },
      targetStyle () {
        return {
          width: this.width + 'px',
          left: this.imageX + 'px',
          top: this.imageY + 'px'
        }
      },
      mirrorStyle () {
        let width = 100
        let items = this.guidelinesV
        // let first = items[0]
        let last = items[items.length - 1]
        width = Math.abs(last.x)
        return {
          left: this.mirrorX + 'px',
          top: this.mirrorY + 'px',
          width: width + 'px'
        }
      },
      mirrorHeaderStyle () {
        let items = this.guidelinesV
        let first = items[0]
        return {
          left: (first.x - 50) + 'px'
        }
      },
      imageStyle () {
        return {
          opacity: this.opacity,
          width: this.width + 'px'
        }
      },
      guidelineStyle () {
        return {
          top: (this.imageY) + 'px'
        }
      },
      guidelineVStyle () {
        return {
          left: (this.imageX) + 'px'
        }
      }
    },
    data () {
      return {
        customWidth: 800,
        width: 800,
        scale: 0,
        opacity: 1,
        orgWidth: 0,
        guidelines: [],
        guidelinesV: [],
        imageX: 0,
        imageY: 0,
        mirror: false,
        mirrorX: 0,
        mirrorY: 0,
        showRuler: false
      }
    },
    mounted () {
      this.$refs.image.focus()
    },
    methods: {
      updateWidth (event) {
        let val = this.customWidth
        if (!val || val < 100) {
          alert('The width needs to be greater than 100')
          this.customWidth = this.width
          return
        }
        let {clientWidth} = document.body

        if (val > clientWidth) {
          alert('The width needs to be less than ' + clientWidth)
          this.customWidth = this.width
          return
        }
        this.width = val
      },
      handleMirrorKeydown (event) {
        switch (event.keyCode) {
          case KeyCode.UP:
          case KeyCode.LEFT:
            this.mirrorX--
            break
          case KeyCode.DOWN:
          case KeyCode.RIGHT:
            this.mirrorX++
            break
        }
      },
      handleMirrorMouseDown (event) {
        let {clientX} = event
        const moveFn = (moveEvent) => {
          let {mirrorX} = this
          let {clientX: x} = moveEvent
          // let {clientWidth} = document.body
          this.mirrorX = Math.max(0, mirrorX + x - clientX)
          clientX = x
        }
        const mouseupFn = () => {
          window.removeEventListener('mousemove', moveFn)
          window.removeEventListener('mouseup', mouseupFn)
        }
        window.addEventListener('mousemove', moveFn)
        window.addEventListener('mouseup', mouseupFn)
      },
      switchMonitor () {
        remote.getCurrentWindow().__compare.switchMonitor()
      },
      mirrorGuideline () {
        let {clientWidth} = document.body
        this.mirrorX = clientWidth / 2
        this.mirror = !this.mirror
      },
      useMouse,
      ignoreMouse,
      onImageLoad () {
        let {width, height} = this.$refs.image
        this.scale = width / height
        this.orgWidth = width
      },
      setWidth (width) {
        this.width = width
      },
      quit () {
        remote.getCurrentWindow().__compare.close()
      },
      addGuideLineV () {
        let total = this.guidelinesV.length
        let x = 100
        if (total > 0) {
          let last = this.guidelinesV[total - 1]
          x = last.x
        }
        x = x + 20
        this.guidelinesV.push({
          id: +Date.now(),
          type: 'v',
          x
        })
      },
      addGuideLine () {
        let total = this.guidelines.length
        let y = 100
        if (total > 0) {
          let last = this.guidelines[total - 1]
          y = last.y
        }
        y = y + 20
        this.guidelines.push({
          id: +Date.now(),
          type: 'h',
          y
        })
      },
      removeGuideline (index) {
        this.guidelines.splice(index, 1)
      },
      removeGuidelineV (index) {
        this.guidelinesV.splice(index, 1)
      },
      updateGuidelineV ({id, x}) {
        let index = this.guidelinesV.findIndex(item => {
          return item.id === id
        })
        let obj = this.guidelinesV[index]
        obj.x = x
        this.guidelinesV = this.guidelinesV.sort((a, b) => {
          if (a.x > b.x) {
            return 1
          } else {
            return -1
          }
        })
      },
      updateGuideline ({y, id}) {
        let index = this.guidelines.findIndex(item => {
          return item.id === id
        })
        let obj = this.guidelines[index]
        obj.y = y
        this.guidelines = this.guidelines.sort((a, b) => {
          if (a.y > b.y) {
            return 1
          } else {
            return -1
          }
        })
      },
      mousedownOnImage (event) {
        let {clientX, clientY} = event
        const moveFn = (moveEvent) => {
          let {imageX, imageY} = this
          let {clientX: x, clientY: y} = moveEvent
          let {clientWidth} = document.body
          this.imageX = Math.min(Math.max(0, imageX + x - clientX), clientWidth - this.width)
          this.imageY = Math.max(0, imageY + y - clientY)
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
      moveTarget (event) {
        console.debug('moveTarget')
        switch (event.keyCode) {
          case KeyCode.UP:
            this.imageY--
            break
          case KeyCode.DOWN:
            this.imageY++
            break
          case KeyCode.LEFT:
            this.imageX--
            break
          case KeyCode.RIGHT:
            this.imageX++
            break
        }
      },
      moveGuideline (event, index) {
        let item = this.guidelines[index]
        switch (event.keyCode) {
          case KeyCode.UP:
          case KeyCode.LEFT:
            item.y--
            break
          case KeyCode.DOWN:
          case KeyCode.RIGHT:
            item.y++
            break
        }
        this.guidelines = this.guidelines.sort((a, b) => {
          if (a.y > b.y) {
            return 1
          } else {
            return -1
          }
        })
      },
      moveGuidelineV (event, index) {
        let item = this.guidelinesV[index]
        switch (event.keyCode) {
          case KeyCode.UP:
          case KeyCode.LEFT:
            item.x--
            break
          case KeyCode.DOWN:
          case KeyCode.RIGHT:
            item.x++
            break
        }
        this.guidelinesV = this.guidelinesV.sort((a, b) => {
          if (a.x > b.x) {
            return 1
          } else {
            return -1
          }
        })
      },
      toggleRuler () {
        this.showRuler = !this.showRuler
      }
    }
  }
</script>

<style >
  .toolbar{
    display: inline-flex;
    flex-direction: row;
    padding: 5px;
    align-items: center;
    background-color: rgba(0,0,0,0.8);
    height: 30px;
    position: absolute;
    pointer-events: all;
    color: #fff;
    z-index: 1000;
    border-radius: 5px;
    top: 2px;
  }
  .icon-group{
    position: relative;
  }
  .source-wrap{
    position: absolute;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .toolbar svg{
    outline: none;
  }
  .toolbar svg:hover {
    background-color: rgba(65, 105, 225, 0.6);
  }
  .toggle-on {
    background-color: rgba(65, 105, 225, 0.6);
  }
  .small{
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .toolbar svg {
    border-radius: 5px;
    padding: 3px;
  }
  .toolbar input {
    background-color: #6a6a6a;
    border: 1px solid gray;
    width: 30px;
    margin-left: 2px;
    margin-right: 5px;
  }
  .guide-line-box{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000;
    pointer-events: none;
  }
  .header, .toolbar input{
    color: #fff;
    font-size: 12px;
    font-weight: 400;
  }
  .toolbar input[type="number"]{
    width: 34px;
  }
  .mirror-header {
    background-color: rgba(65, 105, 225, 0.6);    width: 150px;
    height: 30px;
    border-radius: 5px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    pointer-events: all;
    -webkit-user-drag: none;
    position: absolute;
    z-index: 1;
    user-select: none;
  }
  .mirror-header svg {
    margin-right: 5px;
    color: #dedede;
  }
  .mirror-box{
  }
  .rotate-v{
    transform: rotate(90deg);
  }
  .source-image{
    user-select: none;
    -webkit-user-drag: none;
    cursor: move;
    margin-top: 50px;
  }
 body {
    user-select: none;
    overflow: hidden;
   padding: 0;
   margin: 0;
   font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
 }
 </style>
