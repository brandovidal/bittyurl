// TODO: use Auth store instead
export function isLoggedIn () {
  return !!localStorage.getItem('session')
}