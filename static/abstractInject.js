// import {ipcRenderer} from 'electron'

let iconEl

function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.onload = function() {
    var reader = new FileReader()
    reader.onloadend = function() {
      callback(reader.result)
    }
    reader.readAsDataURL(xhr.response)
  }
  xhr.open('GET', url)
  xhr.responseType = 'blob'
  xhr.send()
}

function getIconEl () {
  if (!iconEl) {
    iconEl = document.createElement('div')
    iconEl.classList.add('compare-icon')
    document.body.appendChild(iconEl)
    iconEl.addEventListener('click', (e) =>{
      let icon = getIconEl()
      toDataURL(icon.dataset.img, function(dataUrl) {
        window.moxo.compareImage(dataUrl)
      })
    })
  }
  return iconEl
}
function showIcon(event, src){
  let {x, y, width} = event.target.getBoundingClientRect()
  let icon = getIconEl()
  icon.style.left = (x + width - 50) + 'px'
  icon.style.top = (y + 20) + 'px'
  icon.dataset.img = src
}
document.addEventListener('mouseover', function (event) {
  let el = event.target
  if (el.tagName === 'IMG' && el.parentElement.classList.contains('style__positioner___3uA80')) {
    showIcon(event, el.getAttribute('src'))
  }
})
getIconEl()
