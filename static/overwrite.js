const {ipcRenderer} = require('electron')
let comparedImg

window.abstract = {
  setOpacity (value) {
    comparedImg.style.opacity = value
  },
  updateView (config) {
    console.debug('updateView')
    if (config.action === 'compare') {
      this.setCompare(config.compare)
    }
    if (config.compare) {
      if (config.action === 'opacity' || config.action === 'compare') {
        this.setOpacity(config.opacity)
      }
    }
  },
  setCompare (flag) {
    if (!comparedImg) {
      comparedImg = document.createElement('img')
      comparedImg.classList.add('compared-img')
    }
    let img = document.querySelector('.style__positioner___3uA80 img')
    if (!img) {
      alert('You need open a page first!')
      return
    }
    let scale = img.clientHeight / img.clientWidth
    ipcRenderer.send('setScale', JSON.stringify({
      action: 'scale',
      scale
    }))
    comparedImg.src = img.getAttribute('src')
    document.body.appendChild(comparedImg)
    if (flag) {
      document.body.classList.add('compared-mode')
    } else {
      document.body.classList.remove('compared-mode')
    }
  }
}
window.addEventListener('keyup', (ev) => {
  ipcRenderer.send('updatePosition', JSON.stringify({
    action: 'position',
    keyCode: ev.keyCode
  }))
})
