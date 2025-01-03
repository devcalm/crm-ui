import { forwardRef } from "react";
import Select, { Props as SelectProps } from "react-select";
import useValidationState, { ValidationState } from "@hooks/validation/useValidationState";
import Label, { printHumanReadableLabel } from "@ui/forms/label/Label";
import ErrorMessage from "@ui/forms/error-message/ErrorMessage";
import customStyles from "./selectStyles";

interface SelectGroupProps extends SelectProps {
    validationState?: ValidationState;
    label?: string;
};

const BasicSelectGroup = forwardRef<any, SelectGroupProps>(
    ({ name, label, options, validationState = {}, ...props }, ref) => {

        const clientValidation = useValidationState(validationState);
        const errorMessage = clientValidation.errorMessage;

        return (
            <div className="col mt-2">
                <Label htmlFor={name}>
                    {printHumanReadableLabel(name, label)}
                </Label>
                <Select
                    ref={ref}
                    inputId={name}
                    name={name}
                    options={options}
                    styles={customStyles(clientValidation)}
                    {...props}
                />
                <ErrorMessage error={errorMessage} />
            </div>
        );
    }
);

BasicSelectGroup.displayName = "BasicSelectGroup";

export default BasicSelectGroup;