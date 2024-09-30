import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import MaterialSelector from "./MaterialSelector";

describe("MaterialSelector Component", () => {
  const setMaterialMock = jest.fn();

  beforeEach(() => {
    setMaterialMock.mockClear();
  });

  test("renders the material options correctly", () => {
    render(<MaterialSelector material="light" setMaterial={setMaterialMock} />);

    const options = screen.getAllByRole("option");
    const optionValues = options.map((option) => option.textContent);

    expect(optionValues).toEqual(["Light Cotton", "Heavy Cotton (+$3)"]);
  });

  test("sets the selected material based on the material prop", () => {
    render(<MaterialSelector material="heavy" setMaterial={setMaterialMock} />);

    const selectElement = screen.getByLabelText("Material:");
    expect(selectElement).toHaveValue("heavy");
  });

  test("calls setMaterial when a new material is selected", () => {
    render(<MaterialSelector material="light" setMaterial={setMaterialMock} />);

    const selectElement = screen.getByLabelText("Material:");
    fireEvent.change(selectElement, { target: { value: "heavy" } });

    expect(setMaterialMock).toHaveBeenCalledWith("heavy");
  });
});
