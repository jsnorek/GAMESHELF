import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, jest, afterEach } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';


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

const mockOnSearch = jest.fn();
const mockHandleLoginModalVisible = jest.fn();
const mockSetIsLoggedIn = jest.fn();
const mockSetLoginInfo = jest.fn();

const initialProps = {
    onSearch: mockOnSearch,
    handleLoginModalVisible: mockHandleLoginModalVisible,
    isLoggedIn: false,
    setIsLoggedIn: mockSetIsLoggedIn,
    loginInfo: { username: "", password: "" },
    setLoginInfo: mockSetLoginInfo
};

const init = (props) => {
    return {
        user: userEvent.setup(),
        ...render(<NavBar {...props} />),
    };
};

describe("NavBar", () => {
    // Reset all mocks after each test
  afterEach(() => {
    jest.resetAllMocks(); // Call the function to reset mocks
  });

  it("should render successfully", () => {
    init(initialProps);
    expect(screen.getByTestId("navbar")).toBeTruthy();
  });

  it("calls onSearch when typing in the search input", async () => {
    const { user } = init(initialProps);

    const searchInput = screen.getByPlaceholderText("Search games");
    await user.type(searchInput, "Zelda");

    expect(mockOnSearch).toHaveBeenCalledWith("Zelda");
  });

  it("navigates to home on logo click", async () => {
    const { user } = init(initialProps);

    const logoElement = screen.getByAltText("logo");
    await user.click(logoElement);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

});