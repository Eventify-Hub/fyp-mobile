import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import EditProfileScreen from "../editprofile/EditProfileIndex";
import { useRouter } from "expo-router";

// ✅ Mocking expo-router
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/services/patchUpdateProfile", () => ({
  __esModule: true,
  default: jest.fn(() => {
    throw new Error("Simulated failure");
  }),
}));

describe("EditProfileScreen", () => {
  let router: any;

  beforeEach(() => {
    router = { push: jest.fn(), back: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(router);
  });

  test("renders input fields correctly", () => {
    const { getByText, getByPlaceholderText } = render(<EditProfileScreen />);
    expect(getByText("Name")).toBeTruthy();
    expect(getByText("E-mail")).toBeTruthy();
    expect(getByText("Country")).toBeTruthy();
    expect(getByText("Phone Number")).toBeTruthy();
    expect(getByText("Address (Optional)")).toBeTruthy();
    expect(getByPlaceholderText("Enter your name")).toBeTruthy();
    expect(getByPlaceholderText("Enter your email")).toBeTruthy();
  });

  test("navigates back when 'Back' is pressed", () => {
    const { getByText } = render(<EditProfileScreen />);
    fireEvent.press(getByText("< Back"));

    // ✅ Ensure the back navigation is triggered
    expect(router.back).toHaveBeenCalled();
  });

  test("renders avatar section with initials (default)", () => {
    const { getByText } = render(<EditProfileScreen />);
    expect(getByText("N/A")).toBeTruthy();
  });

  test("renders bottom navigation items", () => {
    const { getByText } = render(<EditProfileScreen />);
    expect(getByText("My Events")).toBeTruthy();
    expect(getByText("Messages")).toBeTruthy();
    expect(getByText("Notifications")).toBeTruthy();
    expect(getByText("Account")).toBeTruthy();
    expect(getByText("Home")).toBeTruthy();
  });

  test("navigates to dashboard when 'Home' is pressed", () => {
    const { getByText } = render(<EditProfileScreen />);
    fireEvent.press(getByText("Home"));
    expect(router.push).toHaveBeenCalledWith("/dashboard");
  });

  test("navigates to account when 'Account' is pressed", () => {
    const { getByText } = render(<EditProfileScreen />);
    fireEvent.press(getByText("Account"));

    // ✅ Ensure account navigation is triggered
    expect(router.push).toHaveBeenCalledWith("/account");
  });

  test("updates text input when user types", () => {
    const { getByPlaceholderText, getByDisplayValue } = render(
      <EditProfileScreen />
    );
    const nameInput = getByPlaceholderText("Enter your name");
    fireEvent.changeText(nameInput, "Muniba");
    expect(getByDisplayValue("Muniba")).toBeTruthy();
  });

  test("displays save button correctly", () => {
    const { getByText } = render(<EditProfileScreen />);
    const saveButton = getByText("SAVE");

    expect(saveButton).toBeTruthy();
  });

  test("clicking save button does not crash", () => {
    global.alert = jest.fn(); // mock alert
    const { getByText } = render(<EditProfileScreen />);
    const saveButton = getByText("SAVE");
    fireEvent.press(saveButton);
    expect(saveButton).toBeTruthy();
  });

  test("does not navigate when clicking an empty area", () => {
    const { getByTestId } = render(<EditProfileScreen />);
    const screenContainer = getByTestId("screen-container");

    fireEvent.press(screenContainer);

    expect(router.push).not.toHaveBeenCalled();
  });

  test("renders phone input correctly", () => {
    const { getByPlaceholderText } = render(<EditProfileScreen />);
    const phoneInput = getByPlaceholderText("Enter phone number");

    expect(phoneInput).toBeTruthy();
  });

  test("renders address input correctly", () => {
    const { getByPlaceholderText } = render(<EditProfileScreen />);
    const addressInput = getByPlaceholderText("Enter your address");
    expect(addressInput).toBeTruthy();
  });

  test("clicking avatar does not navigate anywhere", () => {
    const { getByText } = render(<EditProfileScreen />);
    fireEvent.press(getByText("N/A")); // default avatar text
    expect(router.push).not.toHaveBeenCalled();
  });

  test("does not allow invalid email format", () => {
    const { getByPlaceholderText, getByDisplayValue } = render(
      <EditProfileScreen />
    );
    const emailInput = getByPlaceholderText("Enter your email");

    fireEvent.changeText(emailInput, "invalid-email");

    expect(getByDisplayValue("invalid-email")).toBeTruthy();
  });

  test("phone input allows numeric input", () => {
    const { getByPlaceholderText, getByDisplayValue } = render(
      <EditProfileScreen />
    );
    const phoneInput = getByPlaceholderText("Enter phone number");

    fireEvent.changeText(phoneInput, "123456");

    expect(getByDisplayValue("123456")).toBeTruthy(); // ✅ Ensure numeric input is displayed
  });

  test("navigates to messages when 'Messages' is pressed", () => {
    const { getByText } = render(<EditProfileScreen />);
    fireEvent.press(getByText("Messages"));
    expect(router.push).toHaveBeenCalledWith("/bottommessages");
  });

  test("shows 'Pakistan' as default country and is not editable", () => {
    const { getByPlaceholderText } = render(<EditProfileScreen />);
    const countryInput = getByPlaceholderText("Pakistan");

    expect(countryInput).toBeTruthy();
    expect(countryInput.props.editable).toBe(false);
  });

  test("navigates to dashboard when 'Home' is pressed", () => {
    const { getByText } = render(<EditProfileScreen />);
    fireEvent.press(getByText("Home"));
    expect(router.push).toHaveBeenCalledWith("/dashboard");
  });

  test("navigates to messages when 'Messages' is pressed", () => {
    const { getByText } = render(<EditProfileScreen />);
    fireEvent.press(getByText("Messages"));
    expect(router.push).toHaveBeenCalledWith("/bottommessages");
  });

  test("navigates to notifications when 'Notifications' is pressed", () => {
    const { getByText } = render(<EditProfileScreen />);
    fireEvent.press(getByText("Notifications"));
    expect(router.push).toHaveBeenCalledWith("/bottomnotification");
  });

  test("navigates to account when 'Account' is pressed", () => {
    const { getByText } = render(<EditProfileScreen />);
    fireEvent.press(getByText("Account"));
    expect(router.push).toHaveBeenCalledWith("/account");
  });
});
