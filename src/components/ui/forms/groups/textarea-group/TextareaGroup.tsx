import React, { forwardRef } from "react";
import Label, { printHumanReadableLabel } from "@ui/forms/label/Label";
import ErrorMessage from "@ui/forms/error-message/ErrorMessage";
import useValidationState, { ValidationState } from "@hooks/validation/useValidationState";
import Textarea from "@ui/forms/textarea/Textarea";

interface TextareaGroupProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    validationState?: ValidationState;
    label?: string;
}

const TextareaGroup = forwardRef<HTMLTextAreaElement, TextareaGroupProps>(
    ({ name, label, validationState = {}, ...props }, ref) => {

        const validation = useValidationState(validationState);

        return (
            <div className="col mt-2">
                <Label htmlFor={name}>
                    {printHumanReadableLabel(name, label)}
                </Label>
                <Textarea
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

TextareaGroup.displayName = "TextareaGroup";

export default TextareaGroup;
