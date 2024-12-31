import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Buttom component", () => {

    it("renders the Buttom with children", () => {
        render(<Button>Click Me</Button>);
        const buttonElement = screen.getByText("Click Me");
        expect(buttonElement).toBeInTheDocument();
    });

    it("applies the default class from styles.module.scss", () => {
        render(<Button>Styled Button</Button>);
        const buttonElement = screen.getByText("Styled Button");
        expect(buttonElement).toHaveClass("btn");
    });

    it("appends additional class names passed via className prop", () => {
        render(<Button className="red">Btn</Button>);
        const buttonElement = screen.getByText("Btn");
        expect(buttonElement).toHaveClass("red");
    });

    it("handles click events", async () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Btn</Button>);
        const buttonElement = screen.getByText("Btn");
        await userEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("forwards other props to the button element", () => {
        render(<Button data-testid="custom-button">Prop Forward Test</Button>);
        const buttonElement = screen.getByTestId("custom-button");
        expect(buttonElement).toBeInTheDocument();
    });
});
