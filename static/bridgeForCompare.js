const {
  contextBridge, ipcRenderer
} = require('electron')

contextBridge.exposeInMainWorld('moxo', {
  compareImage (img) {
    console.log(img)
    ipcRenderer.send('compareImage', img)
  }
})
