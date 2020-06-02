const setAuthUserInLocalStorage = authUser => {
  const stringedUser = JSON.stringify(authUser)
  localStorage.setItem(
    process.env.REACT_APP_AUTH_USER_LOCAL_STORAGE,
    stringedUser
  )
}

const getAuthUserFromLocalStorage = () => {
  const stringedUser = localStorage.getItem(
    process.env.REACT_APP_AUTH_USER_LOCAL_STORAGE
  )
  return JSON.parse(stringedUser)
}

export { setAuthUserInLocalStorage, getAuthUserFromLocalStorage }
