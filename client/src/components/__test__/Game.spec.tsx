import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest, afterEach } from "@jest/globals";
import userEvent from "@testing-library/user-event";
// import "@testing-library/jest-dom/extend-expect";
import Game from "../Game";

const mockHandleGameDetailsModalVisible = jest.fn();
const mockUserFavoritesGame = jest.fn();
const mockUserUnfavoritesGame = jest.fn();
const mockHandleFavoriteClick = jest.fn();

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

// describe("Game", () => {
//   afterEach(jest.resetAllMocks); // resets all including button mocks

    describe("Game", () => {
        // Reset all mocks after each test
        afterEach(() => {
        jest.resetAllMocks(); // Call the function to reset mocks
        });

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
    const favoritesButton = screen.getByLabelText(/favorite/i);
    expect(favoritesButton).toBeDefined();
    // expect(butn).toHaveClass("")
  });

  it("should call userFavoritesGame when favorite button is clicked and game is not favorited", async () => {
    const { user } = init(initialProps);
    const props = { ...initialProps, loggedInUser: true, isFavorited: false };
    init(props);
    
    const favoritesButton = screen.getByLabelText(/favorite/i);
    await user.click(favoritesButton);

    expect(mockUserFavoritesGame).toBeCalledWith(initialProps.game.id);
  });

  it("should call userUnfavoritesGame when favorite button is clicked and game is already favorited", async () => {
    const { user } = init(initialProps);
    const props = { ...initialProps, loggedInUser: true, isFavorited: true };
    init(props);
    
    const favoritesButton = screen.getByLabelText(/favorite/i);
    await user.click(favoritesButton);

    expect(mockUserUnfavoritesGame).toBeCalledWith(initialProps.game.id);
  });

  
});
