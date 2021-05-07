import { BrowserWindow, screen } from 'electron'
import { getUrl } from './common'
import { showAbstractView } from './abstractView'
let compareWin
export function showCompareView (imgUrl) {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  let viewWidth = parseInt(width)
  let viewHeight = parseInt(height)
  let x = 0
  let y = 23
  if (!compareWin) {
    compareWin = new BrowserWindow({
      x,
      y,
      width: viewWidth,
      height: viewHeight,
      hasShadow: false,
      enableLargerThanScreen: true,
      resizable: true,
      movable: true,
      frame: false,
      transparent: true,
      show: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
        // nodeIntegrationInWorker: false,
        // nodeIntegrationInSubFrames: false,
        // contextIsolation: true,
        // enableRemoteModule: false
      }
    })
  }
  compareWin.setAlwaysOnTop(true)
  compareWin.__compare = {
    getImageURI () {
      return imgUrl
    },
    close () {
      closeCompareView()
      showAbstractView()
    },
    getMonitorCount () {
      return screen.getAllDisplays().length
    },
    switchMonitor () {
      const { getCursorScreenPoint, getDisplayNearestPoint } = screen
      const currentScreen = getDisplayNearestPoint(getCursorScreenPoint())

      const displays = screen.getAllDisplays()
      const externalDisplay = displays.find((display) => {
        return display.id !== currentScreen.id
      })
      if (externalDisplay) {
        compareWin.setBounds(externalDisplay.workArea)
      }
    },
    igoreMouse () {
      compareWin.setIgnoreMouseEvents(true, {forward: true})
    },
    handleMouse () {
      compareWin.setIgnoreMouseEvents(false)
    }
  }
  compareWin.loadURL(getUrl('compare'))
  compareWin.show()
  compareWin.setIgnoreMouseEvents(false)
  compareWin.on('focus', () => {
    compareWin.setIgnoreMouseEvents(false)
  })
  compareWin.on('blur', () => {
    compareWin.setIgnoreMouseEvents(false)
  })
}
export function hideCompareView () {
  compareWin.hide()
}
export function closeCompareView () {
  compareWin && compareWin.destroy()
  compareWin = null
}
export function getCompareView () {
  return compareWin
}
