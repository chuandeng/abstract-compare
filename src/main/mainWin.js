import { BrowserWindow, screen } from 'electron'
import { getUrl } from './common'
let mainWin
const settingViewSize = {
  x: 800,
  y: 25,
  width: 484,
  height: 60
}
export function showMainView () {
  if (!mainWin) {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    let viewWidth = 300
    let viewHeight = 300
    let x = (width - viewWidth) / 2
    let y = (height - viewHeight) / 2
    mainWin = new BrowserWindow({
      x,
      y,
      width: viewWidth,
      height: viewHeight,
      frame: false
    })
    mainWin.setAlwaysOnTop(true)
    mainWin.loadURL(getUrl('startup'))
  }
  mainWin.show()
}
export function hideMainView () {
  mainWin.hide()
}
export function showSettingView () {
  mainWin.setBounds(settingViewSize)
  mainWin.loadURL(getUrl('setting'))
}
export function closeMainView () {
  mainWin.destroy()
}
