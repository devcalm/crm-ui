import { forwardRef } from "react";
import Select, { Props as SelectProps } from "react-select";
import Label, { printHumanReadableLabel } from "../../label/Label";
import ErrorMessage from "../../error-message/ErrorMessage";
import useValidationState, { ValidationState } from "@hooks/validation/useValidationState";
import customStyles from "./selectStyles";
import useProductNameFilter from "@hooks/saga/product/useProductNameFilter";

interface SelectGroupProps extends SelectProps {
    validationState?: ValidationState;
    label?: string;
}

const SelectGroup = forwardRef<any, SelectGroupProps>(
    ({ name, label, validationState = {}, ...props }, ref) => {

        const validation = useValidationState(validationState)
        const { options, loading, handleInputChange } = useProductNameFilter();

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
                    placeholder="Search for a product..."
                    isClearable
                    {...props}
                />
                <ErrorMessage error={validation.errorMessage} />
            </div>
        );
    }
);

SelectGroup.displayName = "SelectGroup";

export default SelectGroup;