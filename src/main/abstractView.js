import {BrowserWindow, ipcMain, screen} from 'electron'
import fs from 'fs'
import path from 'path'
import { closeCompareView, showCompareView } from './compareView'
import { closeStartupView } from './startupView'

let abstractView
export function showAbstractView () {
  if (!abstractView) {
    const { width } = screen.getPrimaryDisplay().workAreaSize
    let viewWidth = 1024
    let viewHeight = 768
    let x = (width - viewWidth) / 2
    let y = 100

    const contextBridge = path.join(__static, 'bridgeForAbstract.js')

    abstractView = new BrowserWindow({
      x,
      y,
      width: viewWidth,
      height: viewHeight,
      hasShadow: true,
      enableLargerThanScreen: true,
      resizable: true,
      movable: true,
      frame: true,
      webPreferences: {
        preload: contextBridge,
        allowRunningInsecureContent: false,
        contextIsolation: true,
        enableRemoteModule: false,
        nodeIntegration: false,
        sandbox: true
      }
    })
    abstractView.hide()

    abstractView.webContents.on('did-finish-load', function () {
      abstractView.show()
      console.log('loaded')
      const cssPath = path.join(__static, 'overwrite.css')
      fs.readFile(cssPath, 'utf-8', function (error, data) {
        if (!error) {
          abstractView.webContents.insertCSS(data)
        }
      })
      const jsPath = path.join(__static, 'abstractInject.js')
      fs.readFile(jsPath, 'utf-8', function (error, data) {
        if (!error) {
          abstractView.webContents.executeJavaScript(data)
        }
      })
      closeStartupView()
    })
    abstractView.loadURL('https://app.abstract.com/signin')
    abstractView.on('close', () => {
      closeCompareView()
      abstractView = null
    })
  } else {
    abstractView.show()
  }
};
ipcMain.addListener('compareImage', (event, imgUrl) => {
  showCompareView(imgUrl)
  abstractView.hide()
})
ipcMain.addListener('setScale', (event, config) => {
  let { scale } = JSON.parse(config)
  if (!scale) {
    return
  }
  let bounds = abstractView.getBounds()
  let height = parseInt(bounds.width * parseFloat(scale)) + 2
  abstractView.setSize(parseInt(bounds.width), parseInt(height))
})
const KeyCode = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
}
ipcMain.addListener('updatePosition', (event, config) => {
  let { keyCode } = JSON.parse(config)
  let {x, y} = abstractView.getBounds()
  switch (keyCode) {
    case KeyCode.UP:
      y--
      break
    case KeyCode.DOWN:
      y++
      break
    case KeyCode.LEFT:
      x--
      break
    case KeyCode.RIGHT:
      x++
      break
  }
  abstractView.setPosition(parseInt(x), parseInt(y))
})
ipcMain.addListener('updateView', (event, config) => {
  try {
    let { width, height, action, compare } = JSON.parse(config)
    if (action === 'size' || action === 'compare') {
      if (action === 'compare' && !compare) {
        width = 1024
        height = 768
        abstractView.setAlwaysOnTop(false)
      } else {
        abstractView.setAlwaysOnTop(true)
      }
      abstractView.setSize(parseInt(width), parseInt(height))
    }
    abstractView.webContents.executeJavaScript(`abstract.updateView(${config})`)
  } catch (e) {
    console.log(e)
  }
})
export function closeAbstractView () {
  abstractView.destroy()
}
