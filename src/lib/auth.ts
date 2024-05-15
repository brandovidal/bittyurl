// TODO: use Auth store instead
export function isLoggedIn () {
  return window.localStorage.getItem('isAuthenticated')
}

export function setLoggedIn () {
  window.localStorage.setItem('isAuthenticated', 'true')
}

export function setLoggedOut () {
  window.localStorage.removeItem('isAuthenticated')
}