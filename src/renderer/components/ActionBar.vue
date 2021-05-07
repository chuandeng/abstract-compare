<template>
  <div class="action-bar">
    <IconButton>
      <RecordIcon></RecordIcon>
    </IconButton>
    <IconButton :active="true">

      <el-dropdown trigger="click">
        <span>
      <CustomIcon></CustomIcon>
      <ArrowIcon></ArrowIcon>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item disabled>Action 4</el-dropdown-item>
          <el-dropdown-item divided>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </IconButton>
    <IconButton @click="exitCropper">
      <CloseIcon ></CloseIcon>
    </IconButton>
  </div>
</template>

<script>
  import IconButton from './IconButton'
  import RecordIcon from './icons/RecordIcon'
  import CustomIcon from './icons/CustomIcon'
  import CloseIcon from './icons/CloseIcon'
  import ArrowIcon from './icons/ArrowIcon'
  import {ipcRenderer} from 'electron'
  export default {
    name: 'ActionBar',
    components: { ArrowIcon, CloseIcon, CustomIcon, RecordIcon, IconButton },
    methods: {
      exitCropper () {
        ipcRenderer.send('closeCropper')
      }
    }
  }
</script>

<style scoped>

</style>
