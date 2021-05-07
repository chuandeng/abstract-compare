'use strict'

import { app, ipcMain } from 'electron'
import path from 'path'
import { closeMainView } from './mainWin'
import { showAbstractView } from './abstractView'
import { showStartupView } from './startupView'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// app.commandLine.appendSwitch('--enable-features', 'OverlayScrollbar')

if (process.platform === 'darwin') {
  app.dock.setIcon(path.join(__static, 'ab-testing.png'))
}
app.on('ready', () => {
  // app.dock.hide()
  showStartupView()
  showAbstractView()
})

ipcMain.addListener('quitSystem', () => {
  // closeAbstractView()
  closeMainView()
})

app.on('window-all-closed', event => {
  // app.dock.hide()
  event.preventDefault()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('closed', () => app.quit())

app.on('activate', () => {
  showAbstractView()
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
