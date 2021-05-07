import { BrowserWindow, screen } from 'electron'
import { getUrl } from './common'
let cropperView
export function showCropperView () {
  if (!cropperView) {
    const displays = screen.getAllDisplays()
    const activeDisplayId = screen.getDisplayNearestPoint(screen.getCursorScreenPoint()).id
    const display = displays.find(display => display.id === activeDisplayId)
    const {bounds} = display
    const {width, height} = bounds
    cropperView = new BrowserWindow({
      x: 100,
      y: 100,
      width,
      height,
      hasShadow: false,
      enableLargerThanScreen: true,
      resizable: true,
      movable: true,
      frame: false,
      transparent: true,
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    })
    console.log(getUrl('cropper'))
    cropperView.loadURL(getUrl('cropper'))
  }
  cropperView.on('focus', () => {
    console.log('focus')
    // cropperView = null
  })
  cropperView.on('blur', () => {
    console.log('blur')
    // cropperView = null
  })
  cropperView.setAlwaysOnTop(true)
  cropperView.show()
}
export function hideCropperView () {
  cropperView.close()
  cropperView = null
}
