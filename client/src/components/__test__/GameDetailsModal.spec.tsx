import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest, afterEach } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import GameDetailsModal from "../GameDetailsModal";
import Game from "../Game";

//to fix css parsing error
const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};

const mockSetGameDetailsModalVisible = jest.fn();
const mockSetNewReviewSubmitted = jest.fn();

const initialProps = {
    setGameDetailsModalVisible: mockSetGameDetailsModalVisible,
    gameDetails: {
        name: "Game 1",
        background_image: "",
        description_raw: "game description.",
        platforms: [{ platform: { name: "PC" } }],
        genres: [{ name: "Action" }],
        publishers: [{ name: "Game Publisher" }],
    },
    gameReviews: [
        { review_text: "Great game.", username: "User1", rating: 5, created_at: "2023-10-28"},
    ],
    isLoggedIn: true,
    loggedInUser: { user_id: 1 },
};

const init = (props) => {
    return {
        user: userEvent.setup(),
        ...render(<GameDetailsModal {...props} />),
    };
};

describe("GameDetailsModal", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders loading message when no game details are provided", () => {
        init({
            ...initialProps,
            gameDetails: null,
        });
        expect(screen.getByText(/loading game details/i)).toBeTruthy();
    });

    it("renders game details correctly", () => {
        init(initialProps);
        expect(screen.getByText(/Game 1/i)).toBeTruthy();
        expect(screen.getByText(/game description./i)).toBeTruthy();
        expect(screen.getByText(/Platform\(s\):/i)).toBeTruthy();
        expect(screen.getByText(/PC/i)).toBeTruthy();
        expect(screen.getByText(/Genre:/i)).toBeTruthy();
        expect(screen.getByText(/Action/i)).toBeTruthy();
        expect(screen.getByText(/Publisher\(s\):/i)).toBeTruthy();
        expect(screen.getByText(/Game Publisher/i)).toBeTruthy();
    });

    it("renders write a review button when user is logged in", () => {
        init(initialProps);
        expect(screen.getByRole("button", { name: /write a review/i })).toBeTruthy();
    });

    it("opens the review form when write a review button is clicked", async () => {
        const { user } = init(initialProps);
        await user.click(screen.getByRole("button", { name: /write a review/i }));
        expect(screen.getByText(/write a review for/i)).toBeTruthy();
    });

    it("closes the modal when the back button is clicked", async () => {
        const { user } = init(initialProps);
        await user.click(screen.getByRole("button", { name: /Back/i }));
        expect(mockSetGameDetailsModalVisible).toHaveBeenCalledWith(false);
    });
});
