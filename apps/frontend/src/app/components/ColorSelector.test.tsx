import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import ColorSelector from "./ColorSelector";

describe("ColorSelector Component", () => {
  const setColorMock = jest.fn();

  beforeEach(() => {
    setColorMock.mockClear();
  });

  test("renders the correct colors for t-shirt product type", () => {
    render(<ColorSelector productType="t-shirt" color="black" setColor={setColorMock} />);

    const options = screen.getAllByRole("option");
    const optionValues = options.map((option) => option.textContent);

    expect(optionValues).toEqual(["Black", "White", "Green", "Red"]);
  });

  test("renders the correct colors for sweater product type", () => {
    render(<ColorSelector productType="sweater" color="black" setColor={setColorMock} />);

    const options = screen.getAllByRole("option");
    const optionValues = options.map((option) => option.textContent);

    expect(optionValues).toEqual(["Black", "White", "Pink", "Yellow"]);
  });

  test("sets the selected color based on the color prop", () => {
    render(<ColorSelector productType="t-shirt" color="green" setColor={setColorMock} />);

    const selectElement = screen.getByLabelText("Color:");
    expect(selectElement).toHaveValue("green");

  });

  test("calls setColor when a new color is selected", () => {
    render(<ColorSelector productType="t-shirt" color="black" setColor={setColorMock} />);

    const selectElement = screen.getByLabelText("Color:");
    fireEvent.change(selectElement, { target: { value: "red" } });

    expect(setColorMock).toHaveBeenCalledWith("red");
  });
});
