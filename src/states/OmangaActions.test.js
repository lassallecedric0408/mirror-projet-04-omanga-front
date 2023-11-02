import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { OmangaTestReducerComponent } from "./OmangaTestReducerComponent";
import { OmangaProvider } from "../context/OmangaContext";
import "@testing-library/jest-dom";

test("renders learn react link", () => {
  render(
    <OmangaProvider>
      <OmangaTestReducerComponent />
    </OmangaProvider>,
  );
  const linkElement = screen.getByText(/User Presentation/i);
  expect(linkElement).toBeInTheDocument();
});

it("shows update user after confirm button is clicked", () => {
  const role = "Role: ADMIN";
  const firstname = "Firstname: John";
  const lastname = "Lastname: Doe";
  const city = "City: Sample City";

  render(
    <OmangaProvider>
      <OmangaTestReducerComponent />
    </OmangaProvider>,
  );

  fireEvent.click(screen.getByText("confirm"));

  expect(screen.getByText(role)).toBeInTheDocument();
  expect(screen.getByText(firstname)).toBeInTheDocument();
  expect(screen.getByText(lastname)).toBeInTheDocument();
  expect(screen.getByText(city)).toBeInTheDocument();
});
