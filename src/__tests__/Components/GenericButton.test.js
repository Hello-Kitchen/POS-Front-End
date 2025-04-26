import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GenericButton from "../../Components/Buttons/GenericButton";

describe("GenericButton Component", () => {
    it("renders with default props", () => {
        render(<GenericButton onClick={() => {}} />);
        const buttonElement = screen.getByText("Button");
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass("bg-kitchen-blue");
        expect(buttonElement).toHaveClass("text-white");
    });

    it("renders with custom props", () => {
        render(
            <GenericButton
                title="Click Me"
                color="red"
                textColor="black"
                onClick={() => {}}
            />
        );
        const buttonElement = screen.getByText("Click Me");
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass("bg-red");
        expect(buttonElement).toHaveClass("text-black");
    });

    it("calls onClick when clicked", () => {
        const handleClick = jest.fn();
        render(<GenericButton title="Click Me" onClick={handleClick} />);
        const buttonElement = screen.getByText("Click Me");
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});