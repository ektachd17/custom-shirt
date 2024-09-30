import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'; 
import SaveAsImageButton from "./SaveAsImageButton";

// Mock the html2canvas library
jest.mock("html2canvas", () => jest.fn());

describe("SaveAsImageButton", () => {
  test("renders correctly", () => {
    const canvasRef = { current: document.createElement("div") };

    render(<SaveAsImageButton canvasRef={canvasRef as React.RefObject<HTMLDivElement>} />);
    expect(screen.getByText("Save T-shirt as Image")).toBeInTheDocument();
  });
  
});
