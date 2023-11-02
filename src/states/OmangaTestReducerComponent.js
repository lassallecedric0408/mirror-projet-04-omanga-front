import React from "react";
import { useOmangaContex } from "../context/OmangaContext";

const OmangaTestReducerComponent = () => {
  const { dispatch, OmangaState } = useOmangaContex();
  const { user } = OmangaState;
  const handleClick = () => {
    dispatch({
      type: "SET_LOGGED_USER",
      id: 1,
      firstname: "John",
      lastname: "Doe",
      email: "test@example.com",
      image_url: "image.jpg",
      role: "ADMIN",
      city: "Sample City",
      zip_code: "12345",
      isLogged: true,
      isAdmin: false,
    });
  };
  return (
    <>
      <h1>User Presentation</h1>
      <p>Firstname: {user?.user.firstname}</p>
      <p>Lastname: {user?.user.lastname}</p>
      <p>Email: {user?.user.email}</p>
      <p>Image: {user?.user.image_url}</p>
      <p>Role: {user?.user.role}</p>
      <p>City: {user?.user.city}</p>
      <p>Zip Code: {user?.user.zip_code}</p>
      <button onClick={handleClick}>confirm</button>
    </>
  );
};

export { OmangaTestReducerComponent };
