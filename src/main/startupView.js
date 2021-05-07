import { BrowserWindow, screen } from 'electron'
import { getUrl } from './common'
let startupView
export function showStartupView () {
  if (!startupView) {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    let viewWidth = 300
    let viewHeight = 300
    let x = (width - viewWidth) / 2
    let y = (height - viewHeight) / 2
    startupView = new BrowserWindow({
      x,
      y,
      width: viewWidth,
      height: viewHeight,
      hasShadow: true,
      enableLargerThanScreen: true,
      resizable: false,
      movable: false,
      frame: false,
      show: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
      }
    })
    startupView.loadURL(getUrl('startup'))
  }
  startupView.setAlwaysOnTop(true)
  startupView.show()
}
export function hideStartupView () {
  startupView.hide()
}
export function closeStartupView () {
  startupView && startupView.destroy()
}
