const API_URL = process.env.REACT_APP_API_URL;

interface refreshTokenUserReturn {
  message: string;
  accessToken: string;
  refreshToken: string;
}

const refreshToken = async (
  email: string | undefined,
): Promise<{
  data: string;
}> => {
  const refreshToken = await localStorage.getItem(`refreshToken/${email}`);
  const refreshTokenBody = {
    refreshToken,
  };
  const refreshUserToken = await fetch(`${API_URL}/refreshToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(refreshTokenBody),
  });

  const dataRefreshToken: refreshTokenUserReturn =
    await refreshUserToken.json();

  await localStorage.setItem(`accessToken/${email}`, dataRefreshToken.accessToken);
  await localStorage.setItem(`refreshToken/${email}`, dataRefreshToken.refreshToken);
  return { data: dataRefreshToken.accessToken };
};

const refreshAccessToken = async (
  refreshToken: string | undefined,
): Promise<{
  data: refreshTokenUserReturn;
}> => {
  const refreshTokenBody = {
    refreshToken,
  };
  const refreshUserToken = await fetch(`${API_URL}/refreshToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(refreshTokenBody),
  });

  const dataRefreshToken: refreshTokenUserReturn =
    await refreshUserToken.json();

  return { data: dataRefreshToken };
};


export { refreshToken, refreshAccessToken };
