import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import userEvent from "@testing-library/user-event";
// import "@testing-library/jest-dom/extend-expect";
import Game from "../Game";

const mockHandleGameDetailsModalVisible = jest.fn();
const mockUserFavoritesGame = jest.fn();
const mockUserUnfavoritesGame = jest.fn();

const initialProps = {
  game: {
    id: 1,
    background_image: "",
    name: "test name",
    metacritic: "100",
  },
  loggedInUser: false,
  isFavorited: false,
  handleGameDetailsModalVisible: mockHandleGameDetailsModalVisible,
  userFavoritesGame: mockUserFavoritesGame,
  userUnfavoritesGame: mockUserUnfavoritesGame,
};

const init = (props) => {
  return {
    user: userEvent.setup(),
    ...render(<Game {...props} />),
  };
};

describe("Game", () => {
  afterEach(jest.resetAllMocks); // resets all including button mocks

  it("should render successfully", () => {
    init(initialProps);
    expect(screen.getByTestId("game")).toBeTruthy();
  });

  it("should display name and rating", () => {
    init(initialProps);

    // expect(screen.getByRole("heading")).toBe(initialProps.game.name);
    expect(screen.getByRole("heading").textContent).toBe(initialProps.game.name);
    expect(screen.getByText("Metacritic Rating: 100")).toBeTruthy();
  });

  it("should handle click details", async () => {
    const { user } = init(initialProps);
    const detailsButton = screen.getByRole("button", { name: "details" });

    await user.click(detailsButton);
    expect(mockHandleGameDetailsModalVisible).toBeCalledWith(
      initialProps.game.id
    );
  });

  it("should display favorite button when user is logged in", async () => {
    const props = { ...initialProps, loggedInUser: true };
    init(props);
    // test button is there
    // expect(butn).toHaveClass("")
  });
});
