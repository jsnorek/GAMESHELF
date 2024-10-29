import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest, afterEach } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import EditProfile from "../EditProfile";

//to fix css parsing error
const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};

// Mock the functions passed as props to EditProfile
const mockSetEditProfileVisible = jest.fn();
const mockUpdateUserProfile = jest.fn();
const mockCloseEditProfile = jest.fn();

const initialProps = {
  fullLoggedInUserData: [
    {
      name: "mockName",
      username: "mockUsername",
      email: "test@test.com",
      city: "Seattle",
    },
  ],
  setEditProfileVisible: mockSetEditProfileVisible,
  updateUserProfile: mockUpdateUserProfile,
  loggedInUser: { user_id: 1 },
  closeEditProfile: mockCloseEditProfile,
};

const init = (props) => {
  return {
    user: userEvent.setup(),
    ...render(<EditProfile {...props} />),
  };
};

describe("EditProfile", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders form fields with correct initial values", () => {
    init(initialProps);
    expect(screen.getByTestId("name-input").value).toBe("mockName");
  });

  it("handles input change", async () => {
    const { user } = init(initialProps);
    const nameInput = screen.getByTestId("name-input");

    await user.clear(nameInput);
    await user.type(nameInput, "New Name");
    expect(nameInput.value).toBe("New Name");
  });

  it("calls updateUserProfile on form submit", async () => {
    const { user } = init(initialProps);
    const nameInput = screen.getByTestId("name-input");
    const submitButton = screen.getByText(/submit/i);

    await user.clear(nameInput);
    await user.type(nameInput, "New Name");
    await user.click(submitButton);

    expect(mockUpdateUserProfile).toHaveBeenCalledWith(1, {
        name: "New Name",
        username: "mockUsername",
        email: "test@test.com",
        city: "Seattle",
    });
    expect(mockSetEditProfileVisible).toHaveBeenCalledWith(false);
    });

    it("calls closeEditProfile on cancel button click", async () => {
        const { user } = init(initialProps);
        const cancelButton = screen.getByText(/cancel/i);
    
        await user.click(cancelButton);
    
        expect(mockCloseEditProfile).toHaveBeenCalled();
      });
});
