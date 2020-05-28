const setAuthUserInLocalStorage = authUser =>
  localStorage.setItem(process.env.REACT_APP_AUTH_USER_LOCAL_STORAGE, authUser)
const getAuthUserFromLocalStorage = () =>
  localStorage.getItem(process.env.REACT_APP_AUTH_USER_LOCAL_STORAGE)

export { setAuthUserInLocalStorage, getAuthUserFromLocalStorage }
