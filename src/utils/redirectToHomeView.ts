import { redirect } from "react-router-dom";

export const redirectToHomePage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  redirect("/");
};
