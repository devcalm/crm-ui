import { ValidationResponse } from "@hooks/validation/useValidationState";
import Option from "@ui/forms/groups/select-group/Option";
import { InputActionMeta } from "react-select";

export interface SelectResponse {
    options: Option[],
    handleInputChange: (inputValue: string, meta: InputActionMeta) => void,
    loading: boolean,
    error?: ValidationResponse
}