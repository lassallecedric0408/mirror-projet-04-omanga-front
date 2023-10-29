const API_URL = process.env.REACT_APP_API_URL

interface refreshTokenUserReturn {
  message: string
  accessToken: string
  refreshToken: string
}

const refreshToken = async (email: string | undefined): Promise<{
  data: string
}> => {
  const refreshToken = localStorage.getItem(`refreshToken/${email}`)
  const refreshTokenBody = {
    refreshToken
  }
  console.log(refreshTokenBody, 'refreshTokenBody')
  const refreshUserToken = await fetch(`${API_URL}/refreshToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(refreshTokenBody)
  })

  const dataRefreshToken: refreshTokenUserReturn =
    await refreshUserToken.json()
  localStorage.setItem(
    `accessToken/${email}`,
    dataRefreshToken.accessToken
  )
  localStorage.setItem(
    `refreshToken/${email}`,
    dataRefreshToken.refreshToken
  )
  console.log(dataRefreshToken.accessToken, 'dataRefreshToken.accessToken')
  return { data: dataRefreshToken.accessToken }
}

export { refreshToken }
