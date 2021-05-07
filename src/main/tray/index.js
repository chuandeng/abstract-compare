import { app, Tray } from 'electron'
import path from 'path'
import { showSettingView } from '../settingView'

let appIcon = null
export function initTray () {
  const iconName = process.platform === 'win32' ? 'videoCamera1.png' : 'videoCamera1.png'
  const iconPath = path.join(__dirname, iconName)
  appIcon = new Tray(iconPath)
  appIcon.on('click', (event, bounds, position) => {
    showSettingView(bounds)
  })
  // const contextMenu = Menu.buildFromTemplate([{
  //   label: '退出',
  //   click: () => {
  //     app.quit()
  //   }
  // }])

  // appIcon.setToolTip('在托盘中的 Electron 示例.')
  // appIcon.setContextMenu(contextMenu)
}
app.on('window-all-closed', () => {
  if (appIcon) appIcon.destroy()
})
