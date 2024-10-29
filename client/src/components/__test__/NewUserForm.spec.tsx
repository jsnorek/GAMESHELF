import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, jest, afterEach } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import NewUserForm from "../NewUserForm";

//to fix css parsing error
const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};

const mockSetLoginModalVisible = jest.fn();
const mockSetNewUserModalVisible = jest.fn();
const mockSetNewUserInfo = jest.fn();

const initialProps = {
    newUserInfo: { username: "", email: "", password: "", name: "", city: "" },
    setLoginModalVisible: mockSetLoginModalVisible,
    setNewUserModalVisible: mockSetNewUserModalVisible,
    setNewUserInfo: mockSetNewUserInfo,
};

const init = (props) => {
    return {
        user: userEvent.setup(),
        ...render(<NewUserForm {...props} />),
    };
};

describe("NewUserForm", () => {
    // Reset all mocks after each test
    afterEach(() => {
      jest.resetAllMocks(); // Call the function to reset mocks
    });

    it("should render successfully", () => {
        init(initialProps);
        expect(screen.getByTestId("new-user-form")).toBeTruthy();
    });

    it("calls setLoginModalVisible and closes new user modal when 'Sign In' is clicked", async () => {
        const { user } = init(initialProps);

        const signInButton = screen.getByText("Sign In");
        await user.click(signInButton);

        expect(mockSetLoginModalVisible).toHaveBeenCalledWith(true);
        expect(mockSetNewUserModalVisible).toHaveBeenCalledWith(false);
    });

    it("closes new user modal when 'Cancel' is clicked", async () => {
        const { user } = init(initialProps);

        const cancelButton = screen.getByText("Cancel");
        await user.click(cancelButton);

        expect(mockSetNewUserModalVisible).toHaveBeenCalledWith(false);
    });

});
