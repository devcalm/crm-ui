import React, { forwardRef } from "react";
import Input from "@ui/forms/input/Input";
import Label from "@ui/forms/label/Label";
import ErrorMessage from "@ui/forms/error-message/ErrorMessage";
import { snakeToHumanReadable } from "@utils/formatter";

interface ValidationState {
    error?: string;
    wasValidating?: boolean;
}

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
    validationState?: ValidationState;
}

const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
    ({ name, validationState = {}, ...props }, ref) => {
        const { error, wasValidating } = validationState;

        const dataValidation = wasValidating
            ? error
                ? "error"
                : "success"
            : undefined;

        return (
            <div className="col mt-2">
                <Label htmlFor={name}>
                    {name && snakeToHumanReadable(name)}
                </Label>
                <Input
                    ref={ref}
                    id={name}
                    name={name}
                    data-validation={dataValidation}
                    {...props}
                />
                <ErrorMessage error={error} />
            </div>
        );
    }
);

InputGroup.displayName = "InputGroup";

export default InputGroup;
