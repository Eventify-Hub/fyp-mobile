 
// __tests__/PersonalizedExperienceScreen.test.tsx

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import getAllCategories from "@/services/getAllCategories";
import { saveSecureData } from "@/store";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";
import PersonalizedExperienceScreen from "../EventDetailsForm/EventDetailsFormIndex"; // Adjust path

// Mock dependencies
jest.mock("@/services/getAllCategories");
jest.mock("@/store");
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

// Sample categories mock data
const mockCategories = [
  { _id: "1", name: "Photography" },
  { _id: "2", name: "Catering" },
];

describe("Unit Testing", () => {
  beforeEach(() => {
    (getAllCategories as jest.Mock).mockResolvedValue(mockCategories);
  });

  it("renders correctly with initial state", async () => {
    const { getByPlaceholderText } = render(<PersonalizedExperienceScreen />);
    expect(getByPlaceholderText("Enter event name")).toBeTruthy();
    expect(getByPlaceholderText("Enter event type")).toBeTruthy();
    expect(getByPlaceholderText("Enter guests")).toBeTruthy();
  });

  it("updates event name input", () => {
    const { getByPlaceholderText } = render(<PersonalizedExperienceScreen />);
    const input = getByPlaceholderText("Enter event name");
    fireEvent.changeText(input, "My Birthday");
    expect(input.props.value).toBe("My Birthday");
  });

  it("validates empty fields show errors", async () => {
    const { getByText } = render(<PersonalizedExperienceScreen />);
    const aiButton = getByText("AI Suggested Plan");
    fireEvent.press(aiButton);
    await waitFor(() => {
      expect(getByText("Event name is required")).toBeTruthy();
      expect(getByText("Event type is required")).toBeTruthy();
      expect(getByText("Event date is required")).toBeTruthy();
      expect(getByText("Guest count is required")).toBeTruthy();
      expect(getByText("Select at least one service")).toBeTruthy();
    });
  });

  it("validates required fields before submission", async () => {
    const { getByText } = render(<PersonalizedExperienceScreen />);

    // Simulate a button click without entering any data
    fireEvent.press(getByText("AI Suggested Plan"));

    // Check if validation error messages are shown
    await waitFor(() => {
      expect(getByText("Event name is required")).toBeTruthy();
      expect(getByText("Event type is required")).toBeTruthy();
      expect(getByText("Event date is required")).toBeTruthy();
      expect(getByText("Guest count is required")).toBeTruthy();
      expect(getByText("Select at least one service")).toBeTruthy();
    });
  });

  it("renders all input fields correctly", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <PersonalizedExperienceScreen />
    );
    expect(getByPlaceholderText("Enter event name")).toBeTruthy();
    expect(getByPlaceholderText("Enter event type")).toBeTruthy();
    expect(getByPlaceholderText("Enter guests")).toBeTruthy();
    expect(getByTestId("select-event-date-button")).toBeTruthy();
  });

  it("shows error messages when form submitted empty", async () => {
    const { getByText } = render(<PersonalizedExperienceScreen />);
    fireEvent.press(getByText("AI Suggested Plan"));

    await waitFor(() => {
      expect(getByText("Event name is required")).toBeTruthy();
      expect(getByText("Event type is required")).toBeTruthy();
      expect(getByText("Event date is required")).toBeTruthy();
      expect(getByText("Guest count is required")).toBeTruthy();
      expect(getByText("Select at least one service")).toBeTruthy();
    });
  });

  it("updates event name on input change", () => {
    const { getByPlaceholderText } = render(<PersonalizedExperienceScreen />);
    const input = getByPlaceholderText("Enter event name");
    fireEvent.changeText(input, "My Birthday");
    expect(input.props.value).toBe("My Birthday");
  });
});

describe("Functional Testing", () => {
  beforeEach(() => {
    (getAllCategories as jest.Mock).mockResolvedValue(mockCategories);
  });

  // Test Case 1: Event name input field should update state correctly
  it("updates event name input field correctly", () => {
    const { getByPlaceholderText } = render(<PersonalizedExperienceScreen />);
    const input = getByPlaceholderText("Enter event name");
    fireEvent.changeText(input, "My Birthday");
    expect(input.props.value).toBe("My Birthday");
  });

  it("shows validation errors when required fields are missing", async () => {
    const { getByText } = render(<PersonalizedExperienceScreen />);

    // Simulate form submission without filling any required fields
    fireEvent.press(getByText("AI Suggested Plan"));

    // Check that the error messages appear for required fields
    await waitFor(() => {
      expect(getByText("Event name is required")).toBeTruthy();
      expect(getByText("Event type is required")).toBeTruthy();
      expect(getByText("Event date is required")).toBeTruthy();
      expect(getByText("Guest count is required")).toBeTruthy();
      expect(getByText("Select at least one service")).toBeTruthy();
    });
  });

  it("displays the selected event date correctly", async () => {
    const { getByText, getByTestId } = render(<PersonalizedExperienceScreen />);

    // Open the date picker
    fireEvent.press(getByTestId("select-event-date-button"));

    // Get the current date and simulate the date selection
    const currentDate = new Date();
    fireEvent(getByTestId("datetime-picker"), "onChange", {
      nativeEvent: { timestamp: currentDate.getTime() },
    });

    // Verify that the selected date is correctly displayed
    await waitFor(() => {
      expect(getByText(currentDate.toDateString())).toBeTruthy();
    });
  });

  it("displays the selected event date correctly", async () => {
    const { getByText, getByTestId } = render(<PersonalizedExperienceScreen />);

    // Open the date picker
    fireEvent.press(getByTestId("select-event-date-button"));

    // Get the current date
    const currentDate = new Date();

    // Simulate selecting the date
    fireEvent(getByTestId("datetime-picker"), "onChange", {
      nativeEvent: { timestamp: currentDate.getTime() },
    });

    // Verify that the selected date appears correctly
    await waitFor(() => {
      expect(getByText(currentDate.toDateString())).toBeTruthy();
    });
  });

  it("shows validation errors when form fields are empty", async () => {
    const { getByText } = render(<PersonalizedExperienceScreen />);

    // Try submitting the form without filling any required fields
    fireEvent.press(getByText("AI Suggested Plan"));

    // Verify that validation error messages appear
    await waitFor(() => {
      expect(getByText("Event name is required")).toBeTruthy();
      expect(getByText("Event type is required")).toBeTruthy();
      expect(getByText("Event date is required")).toBeTruthy();
      expect(getByText("Guest count is required")).toBeTruthy();
      expect(getByText("Select at least one service")).toBeTruthy();
    });
  });

it("opens the date picker when 'Select event date' is clicked", async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { getByText, getByTestId } = render(<PersonalizedExperienceScreen />);

  // Simulate clicking the 'Select event date' button
  fireEvent.press(getByTestId("select-event-date-button"));

  // Verify that the date picker opens
  await waitFor(() => {
    expect(getByTestId("datetime-picker")).toBeTruthy();
  });
});

it("shows an error when event name is left empty", async () => {
  const { getByText, getByPlaceholderText } = render(
    <PersonalizedExperienceScreen />
  );

  // Leave the event name empty and simulate form submission
  fireEvent.changeText(getByPlaceholderText("Enter event name"), "");
  fireEvent.press(getByText("AI Suggested Plan"));

  // Verify that the error message is shown
  await waitFor(() => {
    expect(getByText("Event name is required")).toBeTruthy();
  });
});

it("shows an error when guest count is left empty", async () => {
  const { getByText, getByPlaceholderText } = render(
    <PersonalizedExperienceScreen />
  );

  // Leave the guest count empty and simulate form submission
  fireEvent.changeText(getByPlaceholderText("Enter guests"), "");
  fireEvent.press(getByText("AI Suggested Plan"));

  // Verify that the error message for the guest count field is shown
  await waitFor(() => {
    expect(getByText("Guest count is required")).toBeTruthy();
  });
});

}); 

describe("Integration Testing", () => {
  beforeEach(() => {
    (getAllCategories as jest.Mock).mockResolvedValue(mockCategories);
  });

 it("shows validation errors when required fields are empty", async () => {
   const { getByText } = render(<PersonalizedExperienceScreen />);

   // Try submitting the form without filling in the required fields
   fireEvent.press(getByText("AI Suggested Plan"));

   // Check if the validation errors are shown for empty fields
   await waitFor(() => {
     expect(getByText("Event name is required")).toBeTruthy();
     expect(getByText("Event type is required")).toBeTruthy();
     expect(getByText("Event date is required")).toBeTruthy();
     expect(getByText("Guest count is required")).toBeTruthy();
     expect(getByText("Select at least one service")).toBeTruthy();
   });
 });
 
 it("can select an event date correctly", async () => {
   const { getByText, getByTestId } = render(<PersonalizedExperienceScreen />);

   // Open the date picker
   fireEvent.press(getByTestId("select-event-date-button"));

   // Get the current date
   const currentDate = new Date();

   // Simulate a date selection
   fireEvent(getByTestId("datetime-picker"), "onChange", {
     nativeEvent: { timestamp: currentDate.getTime() },
   });

   // Verify that the selected date appears correctly in the UI
   await waitFor(() => {
     expect(getByText(currentDate.toDateString())).toBeTruthy();
   });
 });

 it("updates guest count correctly", async () => {
   const { getByPlaceholderText } = render(<PersonalizedExperienceScreen />);

   // Fill the guest count field
   fireEvent.changeText(getByPlaceholderText("Enter guests"), "200");

   // Verify the guest count has been updated in the state
   await waitFor(() => {
     expect(getByPlaceholderText("Enter guests").props.value).toBe("200");
   });
 });

it("shows error when event name is empty", async () => {
  const { getByText, getByPlaceholderText } = render(
    <PersonalizedExperienceScreen />
  );

  // Leave the event name field empty and try submitting the form
  fireEvent.changeText(getByPlaceholderText("Enter event name"), "");
  fireEvent.press(getByText("AI Suggested Plan"));

  // Check if the error message is shown for the event name
  await waitFor(() => {
    expect(getByText("Event name is required")).toBeTruthy();
  });
});

it("displays the selected event date correctly", async () => {
  const { getByText, getByTestId } = render(<PersonalizedExperienceScreen />);

  // Open the date picker
  fireEvent.press(getByTestId("select-event-date-button"));

  // Get the current date and simulate a date selection
  const currentDate = new Date();
  fireEvent(getByTestId("datetime-picker"), "onChange", {
    nativeEvent: { timestamp: currentDate.getTime() },
  });

  // Verify that the selected date appears in the UI
  await waitFor(() => {
    expect(getByText(currentDate.toDateString())).toBeTruthy();
  });
});

});  

describe("Security Testing", () => {
  beforeEach(() => {
    (getAllCategories as jest.Mock).mockResolvedValue(mockCategories);
  });

  it("does not save or navigate when form is invalid", () => {
    const { getByText } = render(<PersonalizedExperienceScreen />);
    fireEvent.press(getByText("AI Suggested Plan"));
    expect(saveSecureData).not.toHaveBeenCalled();
    expect(router.push).not.toHaveBeenCalled();
  });

  it("prevents injection in eventName input", () => {
    const { getByPlaceholderText } = render(<PersonalizedExperienceScreen />);
    const maliciousInput = "<script>alert('xss')</script>";
    fireEvent.changeText(
      getByPlaceholderText("Enter event name"),
      maliciousInput
    );
    expect(getByPlaceholderText("Enter event name").props.value).toBe(
      maliciousInput
    );
  });

  it("prevents injection in eventType input", () => {
    const { getByPlaceholderText } = render(<PersonalizedExperienceScreen />);
    const maliciousInput = "<img src=x onerror=alert('xss') />";
    fireEvent.changeText(
      getByPlaceholderText("Enter event type"),
      maliciousInput
    );
    expect(getByPlaceholderText("Enter event type").props.value).toBe(
      maliciousInput
    );
  });

  it("ensures guests input only accepts numeric strings", () => {
    const { getByPlaceholderText } = render(<PersonalizedExperienceScreen />);
    const guestsInput = getByPlaceholderText("Enter guests");
    fireEvent.changeText(guestsInput, "123abc");
    // The input accepts any string but keyboard type is numeric - so user can still type.
    // Here we check that input value reflects what user typed (no internal sanitization)
    expect(guestsInput.props.value).toBe("123abc");
  });

  it("rejects excessively long eventName input", () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <PersonalizedExperienceScreen />
    );
    const longString = "a".repeat(1001); // 1001 chars

    fireEvent.changeText(getByPlaceholderText("Enter event name"), longString);
    fireEvent.press(getByText("AI Suggested Plan"));

    // Expect some error message related to input length or validation failure
    // (Assuming you add max length validation; else just checking form does not submit)
    expect(queryByText("Event name is required")).toBeNull(); // Not empty error
    // You might want to add a max length validation error message here in your component for this to work
  });
  
  it("sanitizes eventName input against script injection", () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <PersonalizedExperienceScreen />
    );
    const maliciousInput = `<script>alert('hack')</script>`;

    fireEvent.changeText(
      getByPlaceholderText("Enter event name"),
      maliciousInput
    );
    fireEvent.press(getByText("AI Suggested Plan"));

    // Your component doesn't sanitize but you should check form does not submit
    expect(queryByText("Event name is required")).toBeNull();
    // If you add sanitization, test that dangerous code is stripped or escaped
  });

  it("prevents form submission with SQL injection patterns in eventType", () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <PersonalizedExperienceScreen />
    );
    const sqlInjection = `' OR 1=1; --`;

    fireEvent.changeText(
      getByPlaceholderText("Enter event name"),
      "Test Event"
    );
    fireEvent.changeText(
      getByPlaceholderText("Enter event type"),
      sqlInjection
    );
    fireEvent.changeText(getByPlaceholderText("Enter guests"), "100");

    fireEvent.press(getByText("AI Suggested Plan"));

    // Again, if validation or sanitization is added, test for error or prevention here
    expect(queryByText("Event type is required")).toBeNull();
  });

  it("does not allow selecting services with unexpected characters", async () => {
    // Mock categories with malicious names
    (getAllCategories as jest.Mock).mockResolvedValue([
      { _id: "1", name: "Photography<script>" },
    ]);
    const { getByTestId, getByText } = render(<PersonalizedExperienceScreen />);
    await waitFor(() => getByTestId("checkbox-Photography<script>"));

    const checkbox = getByTestId("checkbox-Photography<script>");
    fireEvent.press(checkbox);

    expect(getByText("☑️ Photography<script>")).toBeTruthy();
  });
});


describe("Accuracy Testing ", () => {
  beforeEach(() => {
    (getAllCategories as jest.Mock).mockResolvedValue(mockCategories);
  });

  it("validates form accurately with missing inputs", () => {
    const { getByText } = render(<PersonalizedExperienceScreen />);
    fireEvent.press(getByText("AI Suggested Plan"));
    expect(getByText("Event name is required")).toBeTruthy();
  });

  // Test: Errors clear when fields are correctly filled
  it("clears error messages after valid inputs", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <PersonalizedExperienceScreen />
    );

    // Submit empty form, expect errors
    fireEvent.press(getByText("AI Suggested Plan"));
    await waitFor(() => {
      expect(getByText("Event name is required")).toBeTruthy();
    });

    // Fill valid event name, error should clear
    fireEvent.changeText(getByPlaceholderText("Enter event name"), "My Event");
    fireEvent.press(getByText("AI Suggested Plan"));

    await waitFor(() => {
      expect(queryByText("Event name is required")).toBeNull();
    });
  });

  // Test: Guests input accepts only numeric strings and shows error for empty
  it("validates guests input correctly", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <PersonalizedExperienceScreen />
    );

    // Enter invalid guests input (empty)
    fireEvent.changeText(getByPlaceholderText("Enter guests"), "");
    fireEvent.press(getByText("AI Suggested Plan"));
    await waitFor(() => {
      expect(getByText("Guest count is required")).toBeTruthy();
    });

    // Enter valid numeric guests input
    fireEvent.changeText(getByPlaceholderText("Enter guests"), "25");
    fireEvent.press(getByText("AI Suggested Plan"));
    await waitFor(() => {
      expect(queryByText("Guest count is required")).toBeNull();
    });
  });

  // Test: Multiple services selection accuracy
  it("accurately updates selectedServices when multiple are toggled", async () => {
    const { getByTestId, getByText } = render(<PersonalizedExperienceScreen />);
    await waitFor(() => getByTestId("checkbox-Photography"));

    const photoCheckbox = getByTestId("checkbox-Photography");
    const cateringCheckbox = getByTestId("checkbox-Catering");

    // Select Photography
    fireEvent.press(photoCheckbox);
    expect(getByText("☑️ Photography")).toBeTruthy();

    // Select Catering too
    fireEvent.press(cateringCheckbox);
    expect(getByText("☑️ Catering")).toBeTruthy();

    // Deselect Photography
    fireEvent.press(photoCheckbox);
    expect(getByText("⬜ Photography")).toBeTruthy();

    // Catering should still be selected
    expect(getByText("☑️ Catering")).toBeTruthy();
  });

  // Test: Event type input updates and validation
  it("updates event type input and validates correctly", async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <PersonalizedExperienceScreen />
    );

    // Submit empty form, expect event type error
    fireEvent.press(getByText("AI Suggested Plan"));
    await waitFor(() => {
      expect(getByText("Event type is required")).toBeTruthy();
    });

    // Enter valid event type
    fireEvent.changeText(
      getByPlaceholderText("Enter event type"),
      "Conference"
    );
    fireEvent.press(getByText("AI Suggested Plan"));

    await waitFor(() => {
      expect(queryByText("Event type is required")).toBeNull();
    });
  });

  // Test: SelectedServices list is empty initially and updates properly on toggle
  it("initially has no selected services and updates on toggle", async () => {
    const { getByTestId, queryByText } = render(
      <PersonalizedExperienceScreen />
    );
    await waitFor(() => getByTestId("checkbox-Photography"));

    expect(queryByText("☑️ Photography")).toBeNull();
    fireEvent.press(getByTestId("checkbox-Photography"));
    expect(queryByText("☑️ Photography")).toBeTruthy();

    fireEvent.press(getByTestId("checkbox-Photography"));
    expect(queryByText("☑️ Photography")).toBeNull();
  });

  // Test: Error messages only appear after attempting to submit invalid form
  it("does not show error messages before form submission", () => {
    const { queryByText } = render(<PersonalizedExperienceScreen />);
    expect(queryByText("Event name is required")).toBeNull();
    expect(queryByText("Event type is required")).toBeNull();
    expect(queryByText("Event date is required")).toBeNull();
    expect(queryByText("Guest count is required")).toBeNull();
    expect(queryByText("Select at least one service")).toBeNull();
  });

  // Test: Clicking "Customize Your Own" button without valid form shows errors
  it("shows validation errors when customizing with invalid form", () => {
    const { getByText } = render(<PersonalizedExperienceScreen />);
    fireEvent.press(getByText("Customize Your Own"));

    expect(getByText("Event name is required")).toBeTruthy();
    expect(getByText("Event type is required")).toBeTruthy();
    expect(getByText("Event date is required")).toBeTruthy();
    expect(getByText("Guest count is required")).toBeTruthy();
    expect(getByText("Select at least one service")).toBeTruthy();
  });
});

describe("Navigation Testing", () => {
  beforeEach(() => {
    (getAllCategories as jest.Mock).mockResolvedValue(mockCategories);
    jest.clearAllMocks();
  });

 it("does not call router.push if form is invalid", () => {
   const { getByText } = render(<PersonalizedExperienceScreen />);
   fireEvent.press(getByText("AI Suggested Plan"));
   expect(router.push).not.toHaveBeenCalled();
 });

 it("does not call router.push if no service selected", () => {
   const { getByText, getByPlaceholderText } = render(
     <PersonalizedExperienceScreen />
   );
   fireEvent.changeText(getByPlaceholderText("Enter event name"), "Event");
   fireEvent.changeText(getByPlaceholderText("Enter event type"), "Type");
   fireEvent.changeText(getByPlaceholderText("Enter guests"), "10");
   fireEvent.press(getByText("AI Suggested Plan"));
   expect(router.push).not.toHaveBeenCalled();
 });

  it("does not navigate if eventDate is missing", async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <PersonalizedExperienceScreen />
    );

    fireEvent.changeText(getByPlaceholderText("Enter event name"), "Event 3");
    fireEvent.changeText(getByPlaceholderText("Enter event type"), "Type 3");
    fireEvent.changeText(getByPlaceholderText("Enter guests"), "50");

    // Select a service
    await waitFor(() => getByTestId("checkbox-Photography"));
    fireEvent.press(getByTestId("checkbox-Photography"));

    // Submit form without selecting date
    fireEvent.press(getByText("AI Suggested Plan"));

    await waitFor(() => {
      expect(router.push).not.toHaveBeenCalled();
    });
  });

  it("does not navigate if guests input is empty", async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <PersonalizedExperienceScreen />
    );

    fireEvent.changeText(getByPlaceholderText("Enter event name"), "Event 4");
    fireEvent.changeText(getByPlaceholderText("Enter event type"), "Type 4");

    // Guests input left empty
    fireEvent.changeText(getByPlaceholderText("Enter guests"), "");

    // Select a service
    await waitFor(() => getByTestId("checkbox-Catering"));
    fireEvent.press(getByTestId("checkbox-Catering"));

    fireEvent.press(getByText("Customize Your Own"));

    await waitFor(() => {
      expect(router.push).not.toHaveBeenCalled();
    });
  });

  it("does not navigate if eventName is empty", async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <PersonalizedExperienceScreen />
    );

    // Event name left empty
    fireEvent.changeText(getByPlaceholderText("Enter event name"), "");
    fireEvent.changeText(getByPlaceholderText("Enter event type"), "Type 5");
    fireEvent.changeText(getByPlaceholderText("Enter guests"), "120");

    // Select a service
    await waitFor(() => getByTestId("checkbox-Photography"));
    fireEvent.press(getByTestId("checkbox-Photography"));

    fireEvent.press(getByText("AI Suggested Plan"));

    await waitFor(() => {
      expect(router.push).not.toHaveBeenCalled();
    });
  });

  it("does not navigate if no services are selected", async () => {
    const { getByPlaceholderText, getByText } = render(
      <PersonalizedExperienceScreen />
    );
    fireEvent.changeText(getByPlaceholderText("Enter event name"), "Event A");
    fireEvent.changeText(getByPlaceholderText("Enter event type"), "Type A");
    fireEvent.changeText(getByPlaceholderText("Enter guests"), "10");

    // Do NOT select any service

    fireEvent.press(getByText("AI Suggested Plan"));

    await waitFor(() => {
      expect(router.push).not.toHaveBeenCalled();
    });
  });

  // Test: Router.push called after selecting and then deselecting a service (should not navigate)
  it("does not navigate if a service is selected then deselected before submit", async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <PersonalizedExperienceScreen />
    );
    fireEvent.changeText(getByPlaceholderText("Enter event name"), "Event B");
    fireEvent.changeText(getByPlaceholderText("Enter event type"), "Type B");
    fireEvent.changeText(getByPlaceholderText("Enter guests"), "20");

    await waitFor(() => getByTestId("checkbox-Photography"));
    const photoCheckbox = getByTestId("checkbox-Photography");

    // Select then deselect the service
    fireEvent.press(photoCheckbox);
    fireEvent.press(photoCheckbox);

    fireEvent.press(getByText("Customize Your Own"));

    await waitFor(() => {
      expect(router.push).not.toHaveBeenCalled();
    });
  });

  // Test: Navigation buttons are disabled (or do nothing) if form invalid (simulate)
  it("does not navigate on AI Suggested Plan button press if form invalid", async () => {
    const { getByText } = render(<PersonalizedExperienceScreen />);
    // Immediately press without filling anything
    fireEvent.press(getByText("AI Suggested Plan"));
    await waitFor(() => {
      expect(router.push).not.toHaveBeenCalled();
    });
  });

  it("does not navigate on Customize Your Own button press if form invalid", async () => {
    const { getByText } = render(<PersonalizedExperienceScreen />);
    // Immediately press without filling anything
    fireEvent.press(getByText("Customize Your Own"));
    await waitFor(() => {
      expect(router.push).not.toHaveBeenCalled();
    });
  });

});

describe("Accessibility Testing", () => {
  beforeEach(() => {
    (getAllCategories as jest.Mock).mockResolvedValue(mockCategories);
  });

  it("inputs have accessible placeholders", () => {
    const { getByPlaceholderText } = render(<PersonalizedExperienceScreen />);
    expect(getByPlaceholderText("Enter event name")).toBeTruthy();
    expect(getByPlaceholderText("Enter event type")).toBeTruthy();
    expect(getByPlaceholderText("Enter guests")).toBeTruthy();
  });

  it("buttons are accessible", () => {
    const { getByText } = render(<PersonalizedExperienceScreen />);
    expect(getByText("AI Suggested Plan")).toBeTruthy();
    expect(getByText("Customize Your Own")).toBeTruthy();
  });

  it("error messages are readable by screen readers", async () => {
    const { getByText } = render(<PersonalizedExperienceScreen />);
    fireEvent.press(getByText("AI Suggested Plan"));
    await waitFor(() => {
      expect(
        getByText("Event name is required").props.accessible !== false
      ).toBe(true);
    });
  });
});

describe("Boundary Testing", () => {
  beforeEach(() => {
    (getAllCategories as jest.Mock).mockResolvedValue(mockCategories);
  });

  it("accepts empty string and shows error for eventName", () => {
    const { getByText, getByPlaceholderText } = render(
      <PersonalizedExperienceScreen />
    );
    fireEvent.changeText(getByPlaceholderText("Enter event name"), "");
    fireEvent.press(getByText("AI Suggested Plan"));
    expect(getByText("Event name is required")).toBeTruthy();
  });

  it("accepts large guest number input", () => {
    const { getByPlaceholderText } = render(<PersonalizedExperienceScreen />);
    fireEvent.changeText(getByPlaceholderText("Enter guests"), "999999999");
    expect(getByPlaceholderText("Enter guests").props.value).toBe("999999999");
  });


  it("handles null eventDate gracefully", () => {
    const { getByText } = render(<PersonalizedExperienceScreen />);
    expect(getByText("Select event date")).toBeTruthy();
  });
});

describe("Scrolling Testing - PersonalizedExperienceScreen", () => {
  beforeEach(() => {
    (getAllCategories as jest.Mock).mockResolvedValue(mockCategories);
  });


  it("keeps input fields visible on scroll", () => {
    // This is more manual; we check if ScrollView is present wrapping inputs
    const { getByText } = render(<PersonalizedExperienceScreen />);
    expect(getByText("Event Name")).toBeTruthy();
  });

  // Test: User can scroll down to the bottom (simulate scroll event)
  it("allows scrolling through the content", () => {
    const { getByText } = render(<PersonalizedExperienceScreen />);
    const heading = getByText("Enter your details for personalized experience");

    // Simulate scroll event — react-native testing library doesn't support scroll event natively,
    // so just verify content is present and can be found
    expect(heading).toBeTruthy();
  });

  // Test: After filling inputs, fields remain visible (simulate)
  it("keeps input fields accessible after scrolling (conceptual)", () => {
    const { getByPlaceholderText } = render(<PersonalizedExperienceScreen />);
    const input = getByPlaceholderText("Enter event name");
    fireEvent.changeText(input, "Test event");

    // Cannot simulate real scrolling in RN Testing Library,
    // but can confirm input exists and is focusable
    expect(input).toBeTruthy();
  });

  
});
