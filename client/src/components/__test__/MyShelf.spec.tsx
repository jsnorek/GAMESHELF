import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest, afterEach } from "@jest/globals";
import MyShelf from "../MyShelf";
import userEvent from "@testing-library/user-event";
import exp from "constants";

//to fix css parsing error
const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};

// Mock the Game component
jest.mock("../Game", () => ({ 
    game, handleGameDetailsModalVisible, loggedInUser, isFavorited, userUnfavoritesGame 
  }) => (
    <div data-testid="mock-game">
      <h3>{game.name}</h3>
      <button
        aria-label="favorite"
        onClick={() => isFavorited ? userUnfavoritesGame(game.id) : jest.fn()}
        style={{ backgroundColor: isFavorited ? "#f744c4" : "lightgray", color: isFavorited ? "white" : "black" }}
      >
        {isFavorited ? "Unfavorite" : "Favorite"}
      </button>
    </div>
  ));

const mockHandleGameDetailsModalVisible = jest.fn();
const mockUserUnfavoritesGame = jest.fn();

const initialProps = {
    fullLoggedInUserData: {},
    handleGameDetailsModalVisible: mockHandleGameDetailsModalVisible,
    userUnfavoritesGame: mockUserUnfavoritesGame,
    // loggedInUser: { id: 1, name: "testName"},
    loggedInUser: true,
    favoritedGames: [
        {
            id: 1,
            background_image: "",
            name: "Game 1",
            metacritic: "100",
            isFavorited: true,
        },
        {
        id: 2,
            background_image: "",
            name: "Game 2",
            metacritic: "90",
            isFavorited: true,
        },
    ],
};

const init = (props) => {
    return {
        user: userEvent.setup(),
        ...render(<MyShelf {...props} />),
    };
};

describe("MyShelf", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should render successfully", () => {
        init(initialProps);
        expect(screen.getByTestId("myshelf")).toBeTruthy();
    });

    it("renders the list of favorited games", () => {
        const { container } = init(initialProps);
        expect(container.querySelector(".user-favorites-list")).toBeTruthy();
        expect(screen.getByText("Game 1")).toBeTruthy();
        expect(screen.getByText("Game 2")).toBeTruthy();
    });

    it("renders a message when there are no favorites", () => {
        const props = { ...initialProps, favoritedGames: [] };
        init(props);
        expect(screen.getByText("No favorites available")).toBeTruthy();
    }); 

    it("calls userUnfavoritesGame when the unfavorite button is clicked", async () => {
        const { user } = init(initialProps);
        const unfavoriteButton = screen.getAllByLabelText("favorite")[0]; // Game 1
        await user.click(unfavoriteButton);
        expect(mockUserUnfavoritesGame).toBeCalledWith(1);
    })
})