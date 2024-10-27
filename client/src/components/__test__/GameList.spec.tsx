import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest, afterEach } from "@jest/globals";
import userEvent from "@testing-library/user-event";
// import "@testing-library/jest-dom/extend-expect";
import GameList from "../GameList";

const mockHandleGameDetailsModalVisible = jest.fn();
const mockUserFavoritesGame = jest.fn();
const mockUserUnfavoritesGame = jest.fn();

// A set of props to pass to the GameList component for testing purposes.
const initialProps = {
    gameData: [
        {
            id: 1,
            background_image: "",
            name: "Game 1",
            metacritic: "100",
        },
        {
            id: 2, 
            background_image: "",
            name: "Game 2",
            metacritic: "90",
        },
        ],
    isLoading: false,
    handleGameDetailsModalVisible: mockHandleGameDetailsModalVisible,
    loggedInUser: true,
    newFavoriteAdded: false,
    favoritedGames: [
        {
            id: 1,
            background_image: "",
            name: "Game 1",
            metacritic: "100",
        },
    ],
    userFavoritesGame: mockUserFavoritesGame,
    userUnfavoritesGame: mockUserUnfavoritesGame,
};

// A helper to initialize and render the GameList component with the given props.
const init = (props) => {
    return {
        // Creates an instance of user actions that you can use to simulate user interactions.
        user: userEvent.setup(),
        // Renders the GameList component with the provided props.
        ...render(<GameList {...props} />),
    };
};

describe("GameList", () => {
    // Reset all mocks after each test
    afterEach(() => {
    jest.resetAllMocks();
    });

    it("should render loading message when isLoading is true", () => {
        const props = { ...initialProps, isLoading: true };
        init(props);

        expect(screen.getByText("Loading games...")).toBeTruthy();
    });

    it("should render game list when isLoading is false", () => {
        const { container } = init(initialProps);

        // Asserts that the loading message is not present.
        expect(screen.queryByText("Loading games...")).toBeNull();
        // Confirms that the .game-list container is rendered.
        expect(container.querySelector(".game-list")).toBeTruthy();
        expect(screen.getByText("Highest Rated Games")).toBeTruthy();
        // Verifies that specific game titles are displayed.
        expect(screen.getByText("Game 1")).toBeTruthy();
        expect(screen.getByText("Game 2")).toBeTruthy();
    });

});
