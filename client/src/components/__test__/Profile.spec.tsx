import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest, afterEach } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import Profile from "../Profile";

//to fix css parsing error
const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};

// Mock react-router-dom's useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate,
}));

const mockSetFullLoggedInUserData = jest.fn();

const initialProps = {
    fullLoggedInUserData: [{
        user_id: 1,
        username: "testUser",
        name: "Test User",
        email: "test@test.com",
        city: "Test",
        reviews: [{ rating: 5, review_text: "Great game!", created_at: "2024-10-29" }]
    }],
    setFullLoggedInUserData: mockSetFullLoggedInUserData,
    loggedInUser: { username: "testUser" },
};

const init = (props) => {
    return {
        user: userEvent.setup(),
        ...render(<Profile {...props} />),
    };
};

describe("Profile", () => {
    // Reset all mocks after each test
    afterEach(() => {
      jest.resetAllMocks(); // Call the function to reset mocks
    });

    it("should render successfully", () => {
        init(initialProps);
        expect(screen.getByTestId("profile")).toBeTruthy();
    });

    it("navigates to MyShelf page on MyShelf button click", async () => {
        const { user } = init(initialProps);
        const myShelfButton = screen.getByText("MyShelf");
        await user.click(myShelfButton);
        expect(mockNavigate).toHaveBeenCalledWith("/myshelf");
      });

      it("opens the edit profile modal on Edit button click", async () => {
        const { user } = init(initialProps);
        const editButton = screen.getByText("Edit");
        await user.click(editButton);
        expect(screen.getByText("Edit Profile")).toBeTruthy();
      });

      it("opens the user's reviews list on My Reviews button click", async () => {
        const { user } = init(initialProps);
        const myReviewsButton = screen.getByText("My Reviews");
        await user.click(myReviewsButton);
        expect(screen.getByText(/Great game!/i)).toBeTruthy();
      });

      it("closes the review list when Back button is clicked", async () => {
        const { user } = init(initialProps);
        const myReviewsButton = screen.getByText("My Reviews");
        await user.click(myReviewsButton);
        const backButton = screen.getByText("Back");
        await user.click(backButton);
        expect(screen.queryByText("Great game!")).not.toBeTruthy();
      });
});
