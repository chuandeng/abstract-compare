export function setCompareImg (uri) {
  document.getElementById('sourceImg').setAttribute('src', uri)
}
window.addEventListener('mousedown', () => {
  window.__compare.igoreMouse()
  console.debug('mousedown')
})
window.addEventListener('mouseup', () => {
  console.debug('mouse mouseup')
  window.__compare.handleMouse()
})
console.debug('inject done')
