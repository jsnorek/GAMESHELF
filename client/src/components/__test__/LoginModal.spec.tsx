import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest, afterEach } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import LoginModal from "../LoginModal";
// import axios from "axios";

// Mock console error suppression for CSS parsing error
// const originalConsoleError = console.error;
// const jsDomCssError = "Error: Could not parse CSS stylesheet";
// console.error = (...params) => {
//   if (!params.find((p) => p.toString().includes(jsDomCssError))) {
//     originalConsoleError(...params);
//   }
// };

// Mock functions for LoginModal props
const mockSetLoginModalVisible = jest.fn();
const mockSetLoginInfo = jest.fn();
const mockSetIsLoggedIn = jest.fn();
const mockHandleNewUserModalVisible = jest.fn();
const mockSetLoggedInUser = jest.fn();

// Mock axios
// jest.mock("axios");

const initialProps = {
    setLoginModalVisible: mockSetLoginModalVisible,
    loginInfo: { username: "", password: "" },
    setLoginInfo: mockSetLoginInfo,
    isLoggedIn: false,
    setIsLoggedIn: mockSetIsLoggedIn,
    handleNewUserModalVisible: mockHandleNewUserModalVisible,
    setLoggedInUser: mockSetLoggedInUser,
    baseURL: "http://localhost:8080",
  };

  const init = (props) => {
    return {
      user: userEvent.setup(),
      ...render(<LoginModal {...props} />),
    };
  };
  
  describe("LoginModal", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("renders username and password fields", () => {
      init(initialProps);
      expect(screen.getByPlaceholderText("username")).toBeTruthy();
      expect(screen.getByPlaceholderText("password")).toBeTruthy();
    });

    it("closes the modal on cancel button click", async () => {
        const { user } = init(initialProps);
        const cancelButton = screen.getByText(/cancel/i);

        await user.click(cancelButton);

        expect(mockSetLoginModalVisible).toHaveBeenCalledWith(false);
    });

    // it("calls handleLoginSubmit on login button click", async () => {
    //     axios.post.mockResolvedValueOnce({ data: { success: true } });
        
    //     const { user } = init(initialProps);
    //     const loginButton = screen.getByTestId(/login-button/i);

    //     await user.click(loginButton);

    //     expect(mockSetIsLoggedIn).toHaveBeenCalledWith(true);
    //     expect(mockSetLoginModalVisible).toHaveBeenCalledWith(false);
    // });

    it("opens the registration form on register button click", async () => {
        const { user } = init(initialProps);
        const registerButton = screen.getByText(/register/i);

        await user.click(registerButton);

        expect(mockHandleNewUserModalVisible).toHaveBeenCalled();
    });

  });