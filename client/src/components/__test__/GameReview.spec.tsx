import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest, afterEach } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import GameReview from "../GameReview";

//to fix css parsing error
const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};

const initialProps = {
    review: {
        rating: 5,
        review_text: "Great game.",
        username: "Gameuser",
        created_at: "2024-10-28T00:00:00Z",
    },
};

const init = (props) => {
    return {
      user: userEvent.setup(),
      ...render(<GameReview {...props} />),
    };
  };

  describe("GameReview", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should render successfully", () => {
        init(initialProps);
        expect(screen.getByTestId("game-review")).toBeTruthy();
    })

    it("should display review details correctly", () => {
        init(initialProps);
        expect(screen.getByText(/Rating:/i)).toBeTruthy();
        expect(screen.getByText(/Review:/i)).toBeTruthy();
        expect(screen.getByText(/Great game./i)).toBeTruthy();
        expect(screen.getByText(/Gameuser/i)).toBeTruthy();
        expect(screen.getByText("10/27/2024")).toBeTruthy();

        // Check if the Rating component rendered
        const ratingElement = screen.getByTestId("review-rating");
        expect(ratingElement).toBeTruthy();
    });

  })

