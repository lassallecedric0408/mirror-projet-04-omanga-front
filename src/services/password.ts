const API_URL = process.env.REACT_APP_API_URL;
import { refreshToken } from "./refreshToken";

const resetPassword = async (
  email: string | undefined,
  password: string,
): Promise<{
  data: any;
}> => {
  const token = await refreshToken(email);
  const resetPasswordRequest = {
    token: token.data,
    password,
  }
  const response = await fetch(`${API_URL}/reset-password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data}`,
    },
    body: JSON.stringify(resetPasswordRequest),
    mode: "cors",
  });
  const data: any = await response.json();
  return { data };
};

export { resetPassword }; 