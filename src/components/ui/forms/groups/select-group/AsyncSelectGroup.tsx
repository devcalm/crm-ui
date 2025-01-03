import { forwardRef } from "react";
import Select, { Props as SelectProps } from "react-select";
import Label, { printHumanReadableLabel } from "@ui/forms/label/Label";
import ErrorMessage from "@ui/forms/error-message/ErrorMessage";
import useValidationState, { ValidationState } from "@hooks/validation/useValidationState";
import customStyles from "./selectStyles";
import { SelectResponse } from "@hooks/saga/response/SelectResponse";

interface SelectGroupProps extends SelectProps {
    validationState?: ValidationState;
    label?: string;
    useSelectNameFilter: () => SelectResponse
}

const AsyncSelectGroup = forwardRef<any, SelectGroupProps>(
    ({ name, label, useSelectNameFilter, validationState = {}, ...props }, ref) => {

        const clientValidation = useValidationState(validationState);
        const { options, error: serverValidation, loading, handleInputChange } = useSelectNameFilter();

        const validation = serverValidation || clientValidation;
        const errorMessage = serverValidation?.errorMessage || clientValidation.errorMessage;

        return (
            <div className="col mt-2">
                <Label htmlFor={name}>
                    {printHumanReadableLabel(name, label)}
                </Label>
                <Select
                    ref={ref}
                    inputId={name}
                    name={name}
                    isLoading={loading}
                    options={options}
                    onInputChange={handleInputChange}
                    styles={customStyles(validation)}
                    isClearable
                    {...props}
                />
                <ErrorMessage error={errorMessage} />
            </div>
        );
    }
);

AsyncSelectGroup.displayName = "AsyncSelectGroup";

export default AsyncSelectGroup;