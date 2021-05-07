import { remote } from 'electron'
export function ignoreMouse () {
  console.debug('ignoreMouse')
  remote.getCurrentWindow().setIgnoreMouseEvents(true, { forward: true })
}
export function useMouse () {
  console.debug('useMouse')
  remote.getCurrentWindow().setIgnoreMouseEvents(false)
}
