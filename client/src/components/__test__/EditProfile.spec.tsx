// import React from "react";
// import { render, screen } from "@testing-library/react";
// import { describe, it, expect, jest, afterEach } from "@jest/globals";
// import userEvent from "@testing-library/user-event";
// import EditProfile from "../EditProfile";



// // Mock the functions passed as props to EditProfile
// const mockSetEditProfileVisible = jest.fn();
// const mockUpdateUserProfile = jest.fn();
// const mockCloseEditProfile = jest.fn();

// const initialProps = {
//     fullLoggedInUserData: {
//         name: "Test",
//         username: "testuser",
//         email: "test@test.com",
//         city: "Seattle",
//     },
//     setEditProfileVisible: mockSetEditProfileVisible,
//     updateUserProfile: mockUpdateUserProfile,
//     loggedInUser: { user_id: 1 },
//     closeEditProfile: mockCloseEditProfile,
// };

// const init = (props) => {
//     return {
//         user: userEvent.setup(),
//         ...render(<EditProfile {...props} />),
//     };
// };

// describe("EditProfile", () => {
//     afterEach(() => {
//         jest.resetAllMocks();
//     });

//     it("renders form fields with correct initial values", () => {
//         init(initialProps);
//         expect(screen.getByTestId("name-input").value).toBe("Test");
//     });
// });
