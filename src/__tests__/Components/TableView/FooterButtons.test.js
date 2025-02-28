import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FooterButton from "../../../Components/TablesView/FooterButtons";

describe("FooterButton Component", () => {
    test("renders button with correct image", () => {
        render(<FooterButton url="test.png" type="Edit" activeButton="None" setActiveButton={jest.fn()} />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    test("clicking button toggles active state", async () => {
        const setActiveButtonMock = jest.fn();
        render(<FooterButton url="test.png" type="Edit" activeButton="None" setActiveButton={setActiveButtonMock} />);
        
        const button = screen.getByRole("button");
        await userEvent.click(button);
        
        expect(setActiveButtonMock).toHaveBeenCalledWith("Edit");
    });
});
