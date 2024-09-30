import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import CustomTextInput from "./CustomTextInput";

describe("CustomTextInput Component", () => {
  const setCustomTextMock = jest.fn();

  beforeEach(() => {
    setCustomTextMock.mockClear();
  });

  test("renders the input with the correct initial value", () => {
    render(<CustomTextInput customText="Hello" setCustomText={setCustomTextMock} />);

    const inputElement = screen.getByPlaceholderText("Add your custom text");
    expect(inputElement).toHaveValue("Hello");
  });

  test("calls setCustomText when text is within the character limit", () => {
    render(<CustomTextInput customText="Hello" setCustomText={setCustomTextMock} />);

    const inputElement = screen.getByPlaceholderText("Add your custom text");
    fireEvent.change(inputElement, { target: { value: "New Text" } });

    expect(setCustomTextMock).toHaveBeenCalledWith("New Text");
  });

  test("does not call setCustomText when text exceeds 16 characters", () => {
    render(<CustomTextInput customText="Hello" setCustomText={setCustomTextMock} />);

    const inputElement = screen.getByPlaceholderText("Add your custom text");
    fireEvent.change(inputElement, { target: { value: "This is more than sixteen characters" } });

    expect(setCustomTextMock).not.toHaveBeenCalled();
  });
});
