const {
  contextBridge, ipcRenderer
} = require('electron')

contextBridge.exposeInMainWorld('abstract', {
  compareImage (img) {
    console.log(img)
    ipcRenderer.send('compareImage', img)
  }
})
