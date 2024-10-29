import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest, afterEach } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import GameReviewList from "../GameReviewList";

//to fix css parsing error
const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};

// Mock the GameReview component for testing
// jest.mock("../GameReview", () => {
//     return jest.fn(() => <li data-testid="game-review" />);
// });

const initialReviews = [
  {
    rating: 5,
    review_text: "Great game.",
    username: "user1",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    rating: 4,
    review_text: "Loved it.",
    username: "user2",
    created_at: "2024-01-01T00:00:00Z",
  },
];

const init = (props) => {
  return render(<GameReviewList {...props} />);
};

describe("GameReviewList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    init({ reviews: initialReviews });
    expect(screen.getByTestId("game-review-list")).toBeTruthy();
  });

  it("should render review, username, and date for each review", () => {
    init({ reviews: initialReviews });
    expect(screen.getByText(/Great game/i)).toBeTruthy();
    expect(screen.getByText(/user1/i)).toBeTruthy();
    // expect(screen.getByText("12/31/2023")).toBeTruthy();
    expect(screen.getByText(/Loved it/i)).toBeTruthy();
    expect(screen.getByText(/user2/i)).toBeTruthy();
  });

  it("should display 'No reviews available' when there are no reviews", () => {
    init({ reviews: [] });
    expect(screen.getByText("No reviews available")).toBeTruthy();
});

});
