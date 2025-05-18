// Import necessary tools and types
import React from "react";
import { render, fireEvent, RenderResult, act} from "@testing-library/react-native";
import NotificationsAccIndex from "../notificationacc/NotificationAccIndex";

import { useRouter } from "expo-router";

// Mock useRouter before any imports that might use it
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("NotificationsAccIndex Component", () => {
  let component: RenderResult;

  // Declare mock functions with explicit types
  let mockPush: jest.Mock;
  let mockBack: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    mockBack = jest.fn();

    // Mock implementation setup
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
      back: mockBack,
    }));

    // Render the component before each test
    component = render(<NotificationsAccIndex />);
  });

  it("ensures multiple 'Notifications' text elements are present correctly", () => {
    const { getAllByText } = component;
    const notificationsElements = getAllByText("Notifications");
    expect(notificationsElements.length).toBeGreaterThan(1);
  });

  it("renders the RSVP notification text element correctly", () => {
    const { getByText } = component;
    expect(
      getByText("Receive notification when guests RSVP to the event")
    ).toBeTruthy();
  });

  it("renders the activity notification text element correctly", () => {
    const { getByText } = component;
    expect(
      getByText("Receive notification for activity that involves me")
    ).toBeTruthy();
  });

  it("renders the deadline notification text element correctly", () => {
    const { getByText } = component;
    expect(
      getByText("Receive notification about approaching deadlines for tasks")
    ).toBeTruthy();
  });

  it("renders switches with initial values", () => {
    const { getByTestId } = component;
    const rsvpSwitch = getByTestId("rsvp-switch");
    const activitySwitch = getByTestId("activity-switch");
    const deadlineSwitch = getByTestId("deadline-switch");

    expect(rsvpSwitch.props.value).toBeTruthy();
    expect(activitySwitch.props.value).toBeFalsy();
    expect(deadlineSwitch.props.value).toBeTruthy();
  });

  it("changes the switch values when toggled", () => {
    const { getByTestId } = component;
    const rsvpSwitch = getByTestId("rsvp-switch");

    fireEvent(rsvpSwitch, "onValueChange", false);
    expect(rsvpSwitch.props.value).toBeFalsy();
  });

  it("navigates to Dashboard when Home button is pressed", () => {
    const { getByText } = component;
    fireEvent.press(getByText("Home")); // ✅ was "Dashboard"
    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });

  it("navigates to Account when Account button is pressed", () => {
    const { getByText } = component;
    fireEvent.press(getByText("Account"));
    expect(mockPush).toHaveBeenCalledWith("/account");
  });

  it("calls the back function when Back button is pressed", () => {
    const { getByText } = component;
    fireEvent.press(getByText("< Back"));
    expect(mockBack).toHaveBeenCalled();
  });

  it("verifies that all navigation buttons are present", () => {
    const { getByText } = component;
    expect(getByText("Home")).toBeTruthy(); // ✅ was "Dashboard"
    expect(getByText("Account")).toBeTruthy();
  });

  it("handles navigation failure gracefully", () => {
    mockPush.mockImplementation(() => {
      throw new Error("Navigation failed");
    });

    const { getByText } = component;

    expect(() => {
      fireEvent.press(getByText("Home")); // ✅ was "Dashboard"
    }).toThrow("Navigation failed");
  });


 it("maintains toggle state after re-render", () => {
   const { getByTestId, rerender } = component;
   const rsvpSwitch = getByTestId("rsvp-switch");

   // Toggle the switch
   fireEvent(rsvpSwitch, "onValueChange", !rsvpSwitch.props.value);
   expect(rsvpSwitch.props.value).toBe(false); // Check if the value has changed

   // Re-render the component with the same props
   rerender(<NotificationsAccIndex />);

   // Check if the state is maintained
   expect(rsvpSwitch.props.value).toBe(false);
 });

it("toggles the RSVP switch and updates the state correctly", async () => {
  const { getByTestId, rerender } = render(<NotificationsAccIndex />);
  const rsvpSwitch = getByTestId("rsvp-switch");

  // Initial state check
  expect(rsvpSwitch.props.value).toBe(true);

  // Toggle the switch
  await act(async () => {
    fireEvent(rsvpSwitch, "onValueChange", false);
  });

  // Re-render the component to reflect the state change
  rerender(<NotificationsAccIndex />);

  // Re-query the switch after re-render
  const updatedRsvpSwitch = getByTestId("rsvp-switch");

  // After act and re-render, the updates should be reflected
  expect(updatedRsvpSwitch.props.value).toBe(false);
});
it("displays all notification option texts correctly", () => {
  const { getByText } = component;
  expect(
    getByText("Receive notification when guests RSVP to the event")
  ).toBeTruthy();
  expect(
    getByText("Receive notification for activity that involves me")
  ).toBeTruthy();
  expect(
    getByText("Receive notification about approaching deadlines for tasks")
  ).toBeTruthy();
});
it("toggles each switch and updates their states correctly", async () => {
  const { getByTestId, rerender } = component;
  const activitySwitch = getByTestId("activity-switch");
  const deadlineSwitch = getByTestId("deadline-switch");

  // Activity Switch
  await act(async () => {
    fireEvent(activitySwitch, "onValueChange", true);
  });
  rerender(<NotificationsAccIndex />);
  expect(activitySwitch.props.value).toBe(true);

  // Deadline Switch
  await act(async () => {
    fireEvent(deadlineSwitch, "onValueChange", false);
  });
  rerender(<NotificationsAccIndex />);
  expect(deadlineSwitch.props.value).toBe(false);
});

});
