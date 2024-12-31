import { render, screen } from "@testing-library/react";
import Label, { printHumanReadableLabel } from "./Label";

describe("Label component", () => {

    it("renders the Label with children", () => {
        render(<Label>My Label</Label>);
        const LabelElement = screen.getByText("My Label");
        expect(LabelElement).toBeInTheDocument();
    });

    it("applies margin bottom & custom css", () => {
        render(<Label className="fixed">My Label</Label>);
        const LabelElement = screen.getByText("My Label");
        expect(LabelElement).toHaveClass("mb-2", "fixed");
    });



});

describe("printHumanReadableLabel function", () => {

    it('should return the human-readable label when both name and label are provided', () => {
        const result = printHumanReadableLabel('some_name', 'custom_label');
        expect(result).toBe('Custom Label'); 
    });

    it('should return the human-readable label when only label is provided', () => {
        const result = printHumanReadableLabel(undefined, 'custom_label');
        expect(result).toBe('Custom Label');
    });

    it('should return the human-readable name when only name is provided', () => {
        const result = printHumanReadableLabel('some_name');
        expect(result).toBe('Some Name');
    });

    it('should return an empty string when neither name nor label is provided', () => {
        const result = printHumanReadableLabel();
        expect(result).toBe('');
    });

    it('should handle snake_case names and labels correctly', () => {
        const result = printHumanReadableLabel('some_long_snake_case_name');
        expect(result).toBe('Some Long Snake Case Name');
    });
});