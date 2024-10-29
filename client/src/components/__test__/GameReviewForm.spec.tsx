import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest, afterEach } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import GameReviewForm from "../GameReviewForm";

//to fix css parsing error
const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};

const mockSetGameReviewFormVisible = jest.fn();
const mockSetNewReviewSubmitted = jest.fn();

const initialProps = {
    setGameReviewFormVisible: mockSetGameReviewFormVisible,
    gameDetails: { id: 1, name: "Test Game" },
    loggedInUser: { user_id: 1 },
    setNewReviewSubmitted: mockSetNewReviewSubmitted,
};

const init = (props) => {
    return {
        user: userEvent.setup(),
        ...render(<GameReviewForm {...props} />),
    };
};

describe('GameReviewForm', () => { 
    // Reset all mocks after each test
    afterEach(() => {
        jest.resetAllMocks(); // Call the function to reset mocks
    });

    it("should render successfully", () => {
        init(initialProps);
        expect(screen.getByTestId("game-review-form")).toBeTruthy();
    });

    it("should render initial props", () => {
        init(initialProps);
        expect(screen.getByText(/Write a Review for Test Game/i)).toBeTruthy();
        expect(screen.getByPlaceholderText("Rating")).toBeTruthy();
        expect(screen.getByPlaceholderText("Review Text")).toBeTruthy();
    });

    it("should handle rating input change", async () => {
        const { user } = init(initialProps);
        const ratingInput = screen.getByPlaceholderText("Rating");

        await user.type(ratingInput, "5");
        expect(ratingInput.value).toBe("5");
    });

    it("should handle review text input change", async () => {
        const { user } = init(initialProps);
        const reviewInput = screen.getByPlaceholderText("Review Text");

        await user.type(reviewInput, "Great game!");
        expect(reviewInput.value).toBe("Great game!");
    });

    it("should call setGameReviewFormVisible on cancel", async () => {
        const { user } = init(initialProps);
        const cancelButton = screen.getByText("Cancel");

        await user.click(cancelButton);
        expect(mockSetGameReviewFormVisible).toHaveBeenCalledWith(false);
    });
 })