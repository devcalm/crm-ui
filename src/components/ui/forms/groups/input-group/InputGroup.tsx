import React, { forwardRef } from "react";
import Input from "@ui/forms/input/Input";
import Label, { printHumanReadableLabel } from "@ui/forms/label/Label";
import ErrorMessage from "@ui/forms/error-message/ErrorMessage";
import useValidationState, { ValidationState } from "@hooks/validation/useValidationState";

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
    validationState?: ValidationState;
    label?: string
}

const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
    ({ name, label, validationState = {}, ...props }, ref) => {

        const validation = useValidationState(validationState);

        return (
            <div className="col mt-2">
                <Label htmlFor={name}>
                    {printHumanReadableLabel(name, label)}
                </Label>
                <Input
                    ref={ref}
                    id={name}
                    name={name}
                    data-validation={validation.type}
                    {...props}
                />
                <ErrorMessage error={validation.errorMessage} />
            </div>
        );
    }
);

InputGroup.displayName = "InputGroup";

export default InputGroup;
